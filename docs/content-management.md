# コンテンツ管理

## 概要

ブログ記事は `src/content/blog/` ディレクトリに Markdown ファイルとして管理されます。
**TinaCMS** をヘッドレス CMS として使用しており、Web UI から記事の作成・編集が可能です。

---

## 記事ファイル形式

### ファイルパス

```
src/content/blog/[slug].md
```

ファイル名が記事の `slug` (URL) になります。

### フロントマター (Frontmatter)

```yaml
---
title: 記事タイトル          # 必須 / 最大40文字
slug: article-slug           # 必須 / URL に使用 / 最大40文字
pubDate: 2024-01-01T00:00:00.000Z  # 必須 / 公開日
image: /assets/example.jpg  # 任意 / サムネイル画像パス (public/ 以下)
category:                    # 任意 / 複数指定可
  - astro
  - typescript
description: 記事の説明文    # 必須 / meta description に使用
draft: false                 # 必須 / true にすると一覧ページに表示されない
---

記事本文 (Zenn 記法 Markdown)
```

### フロントマター スキーマ

`src/content/config.ts` で Zod による型バリデーションを実施しています。

| フィールド | 型 | 必須 | バリデーション |
|---|---|---|---|
| `title` | `string` | ✓ | 1〜40 文字 |
| `slug` | `string` | ✓ | 1〜40 文字 |
| `pubDate` | `date` (coerce) | ✓ | ISO 8601 文字列 → Date に変換 |
| `image` | `string` | ✓ | `public/` 以下の画像パス |
| `category` | `string[]` | ✓ | 定義済みカテゴリースラッグの配列 |
| `description` | `string` | ✓ | — |
| `draft` | `boolean` | ✓ | `true` = 非公開 |

---

## カテゴリー

`src/lib/constants.ts` で定義されています。

| カテゴリー名 | スラッグ | URL |
|---|---|---|
| Poem | `poem` | `/blog/category/poem` |
| Python | `python` | `/blog/category/python` |
| JavaScript | `javascript` | `/blog/category/javascript` |
| TypeScript | `typescript` | `/blog/category/typescript` |
| NextJs | `nextjs` | `/blog/category/nextjs` |
| Astro | `astro` | `/blog/category/astro` |
| Web3 | `web3` | `/blog/category/web3` |
| AI | `ai` | `/blog/category/ai` |
| AWS | `aws` | `/blog/category/aws` |

---

## Markdown 記法

記事本文は **Zenn 記法** の Markdown を使用します (`zenn-markdown-html` によるレンダリング)。

Zenn 記法の詳細: https://zenn.dev/zenn/articles/markdown-guide

### 主な対応記法

- 通常の Markdown (見出し、リスト、テーブル、コードブロックなど)
- Zenn 独自記法 (メッセージ、アコーディオン、Zenn 埋め込みなど)
- URL の自動カード化
- コードブロックのシンタックスハイライト

### 画像の最適化

記事内の `<img>` タグは `src/lib/imgToPicture.js` によって自動的に最適化されます:

- `public/` 以下の画像: `<picture>` 要素に変換 (WebP / JPEG、複数サイズ対応)
- 外部 URL の画像: そのまま `<img>` タグを維持

---

## TinaCMS

### 概要

[TinaCMS](https://tina.io/) はヘッドレス CMS で、Git ベースのコンテンツ管理を提供します。
記事ファイルの実体は Git リポジトリ内の Markdown ファイルであり、TinaCMS はその編集 UI を提供します。

### 管理画面アクセス

- **開発環境**: `http://localhost:4321/admin`
- **本番環境**: `https://def90.net/admin`

### スキーマ設定

`tina/config.ts` で TinaCMS のコレクションスキーマを定義しています。

| 設定項目 | 値 |
|---|---|
| コレクション名 | `blog` |
| ラベル | `Blog記事` |
| 記事保存パス | `src/content/blog/` |
| ファイル形式 | `.md` |
| メディア保存先 | `public/assets/` |
| 管理画面出力先 | `public/admin/` |

### 環境変数

TinaCMS の認証に必要な環境変数 (`.env` で管理):

| 変数名 | 説明 |
|---|---|
| `TINA_CLIENT_ID` または `CLIENTID` | tina.io のクライアント ID |
| `TINA_TOKEN` または `TOKEN` | tina.io の認証トークン |
| `TINA_BRANCH` | 使用するブランチ (デフォルト: `main`) |

### ブランチ解決ロジック

```
TINA_BRANCH > HEAD > VERCEL_GIT_COMMIT_REF > 'main'
```

---

## ドラフト機能

フロントマターの `draft: true` を設定すると、記事は一覧ページに表示されません。

```yaml
draft: true  # 非公開 (一覧に表示されない)
draft: false # 公開
```

ドラフト記事は `src/pages/blog/drafts/` のルートからアクセスできます (開発環境確認用)。

---

## サイトメタ情報

`src/lib/constants.ts` でサイト全体の設定値を管理しています。

```typescript
export const siteMeta = {
  siteTitle: 'Calm/LightYears',
  siteDesc: 'calmly for many light years',
  siteUrl: 'https://def90.net',
  siteLocale: 'ja_JP',
  siteType: 'website',
  siteIcon: '/Calm.png',
  siteImg: '/Calm.img',
  twitter: 'https://twitter.com/def90eth',
  github: 'https://github.com/v8def90'
};
```

---

## RSS フィード

`/rss.xml` で RSS フィード を提供しています。

- タイトル: `siteMeta.siteTitle`
- 説明: `siteMeta.siteDesc`
- アイテム: すべてのブログ記事 (draft 含む)
- リンク形式: `/blog/[slug]`
