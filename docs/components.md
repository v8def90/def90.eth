# コンポーネント

`src/components/` に配置されたすべての UI コンポーネントの仕様です。

---

## レイアウト系

### `layout.astro`
**パス**: `src/layouts/layout.astro`

全ページ共通のベースレイアウト。

**Props**

| プロパティ | 型 | デフォルト | 説明 |
|---|---|---|---|
| `pageTitle` | `string` | (なし) | ページタイトル (`<title>` タグに反映) |
| `description` | `string` | `siteMeta.siteDesc` | ページ説明文 (meta description) |
| `pageImg` | `string` | `siteMeta.siteImg` | OGP 画像 URL |

**構造**

```
<html lang="ja">
  <head>
    <Meta />              ← SEO メタタグ
    <Zenn embed script>   ← Zenn 埋め込みイベント
  </head>
  <body>
    <Container>
      <Header />           ← ナビゲーション (React)
      <main>
        <slot />           ← 各ページのコンテンツ
      </main>
      <Footer />           ← SNS リンク
    </Container>
    <dark mode script>    ← ダークモード初期化 (フラッシュ防止)
  </body>
</html>
```

---

### `container.astro`
**パス**: `src/components/container.astro`

コンテンツ幅を制御するラッパーコンポーネント。

**Props**: なし (スロットのみ)

---

## ナビゲーション系

### `header.tsx` (React)
**パス**: `src/components/header.tsx`

サイト全体のナビゲーションヘッダー。React コンポーネントとして実装され、`client:load` でハイドレートされます。

**含まれる要素**
- サイトロゴ + サイトタイトル (`Calm/LightYears`) → `/` へのリンク
- `Home` ナビリンク
- `Blog` ナビリンク
- `ThemeToggleButton`

**使用場所**: `layout.astro` で `<Header client:load />` として使用

---

### `footer.astro`
**パス**: `src/components/footer.astro`

サイトフッター。SNS アイコンリンクを表示します。

**含まれるリンク**
- X (Twitter): `https://x.com/def90eth`
- GitHub: `https://github.com/v8def90`

アイコンは `astro-icon` + `@iconify-json/fa-brands` を使用。

---

### `pagination.astro`
**パス**: `src/components/pagination.astro`

前後のページ / 記事へのナビゲーションリンク。

**Props**

| プロパティ | 型 | デフォルト | 説明 |
|---|---|---|---|
| `prev` | `string \| undefined` | — | 前ページ/記事の URL |
| `next` | `string \| undefined` | — | 次ページ/記事の URL |
| `prevTitle` | `string` | `'前へ'` | 前ページリンクのテキスト |
| `nextTitle` | `string` | `'次へ'` | 次ページリンクのテキスト |

`prev` / `next` が `undefined` の場合は空の `<span>` が表示されます。

**使用場所**
- `src/pages/blog/[...page].astro` (ページネーション)
- `src/pages/blog/[slug].astro` (前後記事ナビゲーション)
- `src/pages/blog/category/[categorySlug]/[...page].astro` (カテゴリーページネーション)

---

## コンテンツ系

### `card.astro`
**パス**: `src/components/card.astro`

ブログ記事一覧で使用するカードコンポーネント。

**Props**

| プロパティ | 型 | 説明 |
|---|---|---|
| `url` | `string` | 記事の URL パス |
| `src` | `string \| object` | サムネイル画像のパス (または画像オブジェクト) |
| `title` | `string` | 記事タイトル |

画像の表示には `custompicture.astro` を内部で使用します。

---

### `custompicture.astro`
**パス**: `src/components/custompicture.astro`

最適化済みの `<picture>` 要素を出力するコンポーネント。

---

### `CategoryButton.astro`
**パス**: `src/components/CategoryButton.astro`

カテゴリーラベルボタン。クリックするとカテゴリー別記事一覧ページに遷移します。

**Props**

| プロパティ | 型 | 説明 |
|---|---|---|
| `categoryName` | `string` | 表示するカテゴリー名 |
| `categorySlug` | `string` | カテゴリー識別子 (URL に使用) |

遷移先: `/blog/category/[categorySlug]`

---

## SEO / メタ系

### `meta.astro`
**パス**: `src/components/meta.astro`

SEO 用のメタタグをまとめて出力するコンポーネント。`layout.astro` の `<head>` 内で使用されます。

**出力するタグ**

| タグ | 説明 |
|---|---|
| `<title>` | `{pageTitle} \| {siteTitle}` または `{siteTitle}` |
| `<meta name="description">` | ページ説明文 |
| `<meta property="og:*">` | OGP タグ (title / description / url / site_name / type / locale / image) |
| `<link rel="canonical">` | 正規 URL |
| `<link rel="icon">` | ファビコン |
| `<meta name="twitter:card">` | `summary_large_image` |

**Props**

| プロパティ | 型 | デフォルト | 説明 |
|---|---|---|---|
| `pageTitle` | `string \| undefined` | — | ページ固有タイトル |
| `description` | `string` | `siteMeta.siteDesc` | ページ説明文 |
| `pageImg` | `string` | `siteMeta.siteImg` | OGP 画像 |

---

## インタラクティブ系 (React)

### `ThemeToggleButton.tsx`
**パス**: `src/components/ThemeToggleButton.tsx`

ダークモード切り替えボタン。React コンポーネントとして実装。

**動作**

1. マウント時に `localStorage.theme` またはシステム設定から現在のテーマを読み取り
2. クリックでテーマを `'light'` ↔ `'dark'` に切り替え
3. `document.documentElement.classList` の `dark` クラスを操作
4. `localStorage` にテーマを保存 (永続化)

**表示**
- ライトモード時: `☾` (月アイコン)
- ダークモード時: `☼` (太陽アイコン)

---

## ユーティリティ

### `imgToPicture.js`
**パス**: `src/lib/imgToPicture.js`

Markdown から変換された HTML 内の `<img>` タグを、最適化された `<picture>` 要素に変換する非同期関数。

**処理フロー**

```
HTML 文字列 (zenn-markdown-html の出力)
  ↓ rehype-parse で HAST に変換
  ↓ unist-util-visit で <img> ノードを抽出
  ↓ 各 <img> に対して:
      ├─ plaiceholder でメタデータ (幅・高さ) 取得
      ├─ Astro getImage() で複数サイズ・フォーマット (WebP, JPEG) を生成
      └─ <picture> ノードに置換
  ↓ rehype-stringify で HTML 文字列に戻す
```

**生成する画像サイズ**
- 幅: 640, 750, 828, 1080, 1200, 1920 px
- フォーマット: WebP, JPEG

**注意**: `/` から始まる `public/` ディレクトリ内の画像のみを処理します。外部 URL はスキップされます。

**使用場所**: `src/pages/blog/[slug].astro` の記事本文レンダリング時
