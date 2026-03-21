# アーキテクチャ

## 技術スタック

### コアフレームワーク

| ライブラリ | バージョン | 用途 |
|---|---|---|
| [Astro](https://astro.build/) | ^5.7.10 | メインフレームワーク (SSG) |
| [React](https://react.dev/) | ^19.1.0 | インタラクティブなコンポーネント |
| [TypeScript](https://www.typescriptlang.org/) | ^5.0.0 | 型安全な開発 |

### スタイリング

| ライブラリ | バージョン | 用途 |
|---|---|---|
| [Tailwind CSS](https://tailwindcss.com/) | ^4.1.5 | ユーティリティ CSS |
| [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) | ^0.5.9 | 記事本文のスタイリング |
| [zenn-content-css](https://github.com/zenn-dev/zenn-editor) | ^0.1.159 | Zenn 風コードブロックスタイル |

### コンテンツ管理

| ライブラリ | バージョン | 用途 |
|---|---|---|
| [TinaCMS](https://tina.io/) | ^2.7.5 | ヘッドレス CMS |
| [@tinacms/cli](https://tina.io/docs/cli-overview/) | ^1.9.5 | TinaCMS CLI |
| [zenn-markdown-html](https://github.com/zenn-dev/zenn-editor) | ^0.1.159 | Zenn 記法 Markdown → HTML |

### 画像処理

| ライブラリ | バージョン | 用途 |
|---|---|---|
| [sharp](https://sharp.pixelplumbing.com/) | ^0.34.1 | 画像変換・最適化 |
| [plaiceholder](https://plaiceholder.co/) | ^3.0.0 | ぼかし画像プレースホルダー生成 |

### Astro インテグレーション

| インテグレーション | 用途 |
|---|---|
| `@astrojs/react` | React コンポーネントのサポート |
| `@astrojs/sitemap` | サイトマップ自動生成 |
| `@astrojs/node` | Node.js アダプター (standalone モード) |
| `@astrojs/rss` | RSS フィード生成 |
| `astro-icon` | アイコンコンポーネント (`@iconify-json/fa-brands`) |

### ユーティリティ

| ライブラリ | 用途 |
|---|---|
| `date-fns` / `date-fns-tz` | 日付フォーマット |
| `unified` / `rehype-*` | HTML パース・変換 |
| `hastscript` | HAST ノード生成 |
| `unist-util-visit` | AST トラバーサル |

### 監視・品質

| ツール | 用途 |
|---|---|
| Sentry (`@sentry/browser`, `@sentry/node`) | エラー監視・パフォーマンストラッキング |
| Playwright | E2E テスト |
| ESLint | JavaScript / TypeScript / Astro リント |
| Stylelint | CSS / SCSS / Astro スタイルリント |
| Prettier | コードフォーマット |
| Husky + lint-staged | コミット前の自動リント |

---

## ディレクトリ構造

```
my-blog/
├── src/
│   ├── components/          # UI コンポーネント
│   │   ├── CategoryButton.astro
│   │   ├── ThemeToggleButton.tsx   # React: ダークモード切り替え
│   │   ├── card.astro              # 記事カードコンポーネント
│   │   ├── container.astro         # ページ幅制御コンテナ
│   │   ├── custompicture.astro     # 最適化済み picture 要素
│   │   ├── footer.astro            # フッター (SNS リンク)
│   │   ├── header.astro            # ヘッダー (未使用, .tsx が使用中)
│   │   ├── header.tsx              # React: ナビゲーションヘッダー
│   │   ├── meta.astro              # SEO メタタグ
│   │   └── pagination.astro        # ページネーション
│   ├── content/
│   │   ├── blog/                   # ブログ記事 (Markdown)
│   │   └── config.ts               # Astro Content Collection 定義
│   ├── layouts/
│   │   └── layout.astro            # ベースレイアウト
│   ├── lib/
│   │   ├── constants.ts            # サイトメタ情報・カテゴリー定数
│   │   └── imgToPicture.js         # img → picture 変換ユーティリティ
│   ├── pages/
│   │   ├── index.astro             # トップページ
│   │   ├── 404.astro               # 404 エラーページ
│   │   ├── rss.xml.js              # RSS フィード
│   │   └── blog/
│   │       ├── [...page].astro     # ブログ一覧 (ページネーション)
│   │       ├── [slug].astro        # 記事詳細
│   │       ├── category/
│   │       │   └── [categorySlug]/
│   │       │       └── [...page].astro  # カテゴリー別一覧
│   │       └── drafts/             # ドラフト記事 (開発環境用)
│   ├── styles/
│   │   └── app.css                 # グローバルスタイル
│   ├── types/
│   │   └── index.ts                # 型定義 (Theme 型など)
│   └── env.d.ts                    # 環境変数の型定義
├── content/
│   └── posts/                      # コンテンツストレージ (TinaCMS 管理)
├── public/                         # 静的アセット
│   ├── admin/                      # TinaCMS 管理画面
│   ├── assets/                     # 記事画像
│   ├── Calm.jpg / Calm.png         # サイトロゴ
│   ├── favicon.png / favicon.svg   # ファビコン
│   └── logo.svg
├── tina/
│   ├── config.ts                   # TinaCMS スキーマ定義
│   └── tina-lock.json              # TinaCMS ロックファイル
├── tests/
│   └── index.spec.ts               # Playwright E2E テスト
├── dist/                           # ビルド出力 (gitignore 推奨)
├── astro.config.mjs                # Astro 設定
├── tailwind.config.cjs             # Tailwind CSS 設定
├── playwright.config.ts            # Playwright 設定
├── tsconfig.json                   # TypeScript 設定
├── eslint.config.js                # ESLint 設定
├── stylelint.config.cjs            # Stylelint 設定
├── .prettierrc                     # Prettier 設定
└── package.json
```

---

## ページルーティング

Astro のファイルベースルーティングを採用しています。

| URL パターン | ファイル | 説明 |
|---|---|---|
| `/` | `src/pages/index.astro` | トップページ |
| `/blog` | `src/pages/blog/[...page].astro` | ブログ記事一覧 (p.1) |
| `/blog/2` | `src/pages/blog/[...page].astro` | ブログ記事一覧 (p.2) |
| `/blog/[slug]` | `src/pages/blog/[slug].astro` | 記事詳細 |
| `/blog/category/[slug]` | `src/pages/blog/category/[categorySlug]/[...page].astro` | カテゴリー別一覧 |
| `/rss.xml` | `src/pages/rss.xml.js` | RSS フィード |
| `/sitemap-index.xml` | 自動生成 | サイトマップ |
| `/admin` | `public/admin/index.html` | TinaCMS 管理画面 |
| `/404` | `src/pages/404.astro` | 404 エラーページ |

---

## ビルドフロー

```
pnpm build
  └─ tinacms build      # TinaCMS スキーマをビルド → /public/admin を更新
       └─ astro build   # Astro の SSG ビルド → /dist に出力
            └─ .map ファイルを dist から削除 (本番セキュリティ対策)
```

### 出力モード

Astro の `output: 'static'` を使用した完全な静的サイト生成 (SSG) です。
アダプターは `@astrojs/node` (standalone モード) が設定されていますが、静的ホスティングへのデプロイに対応しています。

---

## ダークモード

クラスベースのダークモード (`darkMode: 'class'` in Tailwind) を採用しています。

1. **初回アクセス時**: `window.matchMedia('prefers-color-scheme: dark')` でシステム設定を検出
2. **手動切り替え**: `ThemeToggleButton.tsx` がクリックで `document.documentElement` の `dark` クラスを切り替え
3. **永続化**: `localStorage` の `theme` キーに `'light'` / `'dark'` を保存
4. **適用タイミング**: `layout.astro` のインラインスクリプトで `<html>` タグに `dark` クラスを付与 (フラッシュ防止)
