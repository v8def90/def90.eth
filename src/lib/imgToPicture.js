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

export default async function imgToPicture(html) {
  // HTMLをhastへ変換
  const hast = unified().use(rehypeParse, { fragment: true }).parse(html);

  // img ノードを抽出
  let imageNodesSet = [];
  visit(hast, 'element', (node, index, parent) => {
    if (node.tagName === 'img') {
      imageNodesSet.push({ node, index, parent });
    }
  });

  // 抽出したimgノードに対する処理
  const promises = imageNodesSet.map(async (nodeSet) => {
    // imgノードから、srcとaltを取得
    const {
      node: {
        properties: { src, alt }
      },
      index,
      parent
    } = nodeSet;

    // 画像のwidth&heightを取得
    const { img } = await getPlaiceholder(src);
    const { width, height } = img;

    // 生成するソースフォーマットの準備
    const sources = [];

    // 各フォーマットで画像を生成
    for (const format of imageDefault.formats) {
      const srcSet = [];

      // 各幅で画像を生成
      for (const width of imageDefault.widths) {
        const imageData = await getImage({
          src: img.src,
          width: width,
          height: Math.round(height * (width / img.width)),
          format: format
        });

        srcSet.push(`${imageData.src} ${width}w`);
      }

      sources.push({
        type: `image/${format}`,
        srcset: srcSet.join(', '),
        sizes: '(min-width: 720px) 720px, 100vw'
      });
    }

    // 標準画像のデータを取得
    const imageData = await getImage({
      src: img.src,
      width: width,
      height: height,
      format: 'jpeg'
    });

    // 置換用のnodeの作成
    const srcNodes = sources.map((source) => {
      const e = h('source', { ...source });
      return e;
    });

    const imgNode = h('img', { src: imageData.src, width, height, alt });

    const pictureNode = h('picture', [...srcNodes, imgNode]);

    // pictureノードに置換
    parent.children.splice(index, 1, pictureNode);
  });

  await Promise.all(promises);

  // hastをhtmlに戻す
  const newhtml = unified().use(rehypeStringify).stringify(hast);

  return newhtml;
}
