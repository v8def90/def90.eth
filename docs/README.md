# my-blog ドキュメント

**def90.eth** のパーソナルブログサイトのドキュメントです。

- サイト URL: [https://def90.net](https://def90.net)
- バージョン: 1.1.0

---

## ドキュメント一覧

| ドキュメント | 説明 |
|---|---|
| [アーキテクチャ](./architecture.md) | 技術スタック・ディレクトリ構造・ページルーティング |
| [コンポーネント](./components.md) | UI コンポーネントの一覧と仕様 |
| [コンテンツ管理](./content-management.md) | TinaCMS・記事フォーマット・カテゴリー |
| [開発ガイド](./development.md) | セットアップ・開発コマンド・テスト・デプロイ |

---

## 概要

| 項目 | 内容 |
|---|---|
| フレームワーク | Astro v5 |
| UI ライブラリ | React v19 (一部コンポーネント) |
| スタイリング | Tailwind CSS v4 |
| CMS | TinaCMS v2 |
| 出力モード | Static (SSG) |
| 言語 | TypeScript / Astro |
| パッケージマネージャー | pnpm |
| エラー監視 | Sentry |

## 主な機能

- **ブログ記事一覧** — ページネーション付き (6件/ページ)
- **カテゴリー別フィルタリング** — 9カテゴリー対応
- **記事詳細ページ** — 前後記事ナビゲーション付き
- **ダークモード** — システム設定との連動 + 手動切り替え
- **RSS フィード** — `/rss.xml`
- **サイトマップ** — 自動生成 (`@astrojs/sitemap`)
- **OGP / Twitter Card** — メタタグ自動設定
- **レスポンシブデザイン** — モバイル対応
- **Zenn 形式 Markdown** — `zenn-markdown-html` によるレンダリング
- **画像最適化** — `<picture>` 要素への自動変換 (WebP / JPEG)
- **プリフェッチ** — Astro Prefetch による高速遷移
