import fs from 'node:fs/promises';
import path from 'node:path';
import { getImage } from 'astro:assets';
import { h } from 'hastscript';
import { getPlaiceholder } from 'plaiceholder';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

const imageDefault = {
  widths: [640, 750, 828, 1080, 1200, 1920],
  formats: ['webp', 'jpeg']
};

// publicディレクトリからの画像データを取得する関数
async function getImageBuffer(src) {
  try {
    if (!src || typeof src !== 'string') {
      throw new Error('Invalid source provided');
    }

    // 相対パスを処理（/から始まるパスはpublicフォルダのルートと見なす）
    let imagePath;
    if (src.startsWith('/')) {
      // 先頭の/を削除してpublicディレクトリと結合
      imagePath = path.join('public', src.slice(1));
    } else {
      throw new Error('Image path must start with /');
    }

    // ファイルが存在するか確認
    try {
      await fs.access(imagePath);
    } catch {
      throw new Error(`Image file not found: ${imagePath}`);
    }

    // ファイルをBufferとして読み込む
    const buffer = await fs.readFile(imagePath);
    return buffer;
  } catch (error) {
    globalThis.console.error('Error loading image:', error);
    throw error;
  }
}

export default async function imgToPicture(html) {
  // HTMLをhastへ変換
  const hast = unified().use(rehypeParse, { fragment: true }).parse(html);

  // img ノードを抽出
  const imageNodesSet = [];
  visit(hast, 'element', (node, index, parent) => {
    if (node.tagName === 'img') {
      imageNodesSet.push({ node, index, parent });
    }
  });

  // 抽出したimgノードに対する処理
  const promises = imageNodesSet.map(async (nodeSet) => {
    try {
      // imgノードから、srcとaltを取得
      const {
        node: {
          properties: { src, alt }
        },
        index,
        parent
      } = nodeSet;

      // publicディレクトリ内の画像のみを処理
      if (!src || typeof src !== 'string' || !src.startsWith('/')) {
        globalThis.console.warn(`Skipping non-public image: ${src}`);
        return; // 処理をスキップ
      }

      try {
        // 画像のバッファを取得してからプレースホルダーを生成
        const imageBuffer = await getImageBuffer(src);
        const { metadata } = await getPlaiceholder(imageBuffer);
        const { width, height } = metadata;

        // 生成するソースフォーマットの準備
        const sources = [];

        // 各フォーマットで画像を生成
        for (const format of imageDefault.formats) {
          const srcSet = [];

          // 各幅で画像を生成
          for (const width of imageDefault.widths) {
            try {
              const imageData = await getImage({
                src,
                width: width,
                height: Math.round(height * (width / metadata.width)),
                format: format
              });

              srcSet.push(`${imageData.src} ${width}w`);
            } catch (formatError) {
              globalThis.console.error(
                `Error generating image format ${format} at width ${width}:`,
                formatError
              );
              // この形式・サイズの生成に失敗しても続行
            }
          }

          if (srcSet.length > 0) {
            sources.push({
              type: `image/${format}`,
              srcset: srcSet.join(', '),
              sizes: '(min-width: 720px) 720px, 100vw'
            });
          }
        }

        // ソースが作成できなければ元のimgタグを保持
        if (sources.length === 0) {
          globalThis.console.warn(`No sources generated for image: ${src}`);
          return;
        }

        // 標準画像のデータを取得
        const imageData = await getImage({
          src,
          width,
          height,
          format: 'jpeg'
        });

        // 置換用のnodeの作成
        const srcNodes = sources.map((source) => {
          return h('source', { ...source });
        });

        const imgNode = h('img', { src: imageData.src, width, height, alt });
        const pictureNode = h('picture', [...srcNodes, imgNode]);

        // pictureノードに置換
        parent.children.splice(index, 1, pictureNode);
      } catch (error) {
        globalThis.console.error(`Error processing image ${src}:`, error);
        // エラーが発生した場合は元のimg要素を保持
      }
    } catch (error) {
      globalThis.console.error('Error in image processing:', error);
      // エラーが発生してもプロセスは継続
    }
  });

  try {
    await Promise.all(promises);
  } catch (error) {
    globalThis.console.error('Error processing images:', error);
  }

  // hastをhtmlに戻す
  const newhtml = unified().use(rehypeStringify).stringify(hast);
  return newhtml;
}
