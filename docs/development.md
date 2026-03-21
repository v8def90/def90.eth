# 開発ガイド

## 前提条件

| ツール | 推奨バージョン |
|---|---|
| Node.js | 20.x 以上 |
| pnpm | 9.x 以上 |

---

## セットアップ

### 1. リポジトリのクローン

```bash
git clone https://github.com/v8def90/my-blog.git
cd my-blog
```

### 2. 依存関係のインストール

```bash
pnpm install
```

### 3. 環境変数の設定

`.env.example` をコピーして `.env` を作成します。

```bash
cp .env.example .env
```

`.env` に以下の値を設定します:

```env
# TinaCMS 認証 (tina.io から取得)
CLIENTID=your-tina-client-id
TOKEN=your-tina-token

# Sentry エラー監視 (sentry.io から取得)
SENTRY_AUTH_TOKEN=your-sentry-auth-token
```

> TinaCMS の `CLIENTID` / `TOKEN` は [tina.io](https://tina.io/) でプロジェクトを作成して取得してください。
> ローカル開発のみであれば TinaCMS の認証情報は不要です (ローカルモードで動作します)。

---

## 開発コマンド

| コマンド | 説明 |
|---|---|
| `pnpm dev` | 開発サーバーを起動 (TinaCMS + Astro) |
| `pnpm start` | `pnpm dev` と同じ |
| `pnpm build` | 本番ビルド (TinaCMS → Astro → .map 削除) |
| `pnpm build:astro-only` | Astro のみビルド (TinaCMS スキップ) |
| `pnpm preview` | ビルド成果物のプレビューサーバーを起動 |
| `pnpm format` | コードフォーマット (Prettier) |
| `pnpm lint:js` | JavaScript / TypeScript / Astro のリント (ESLint) |
| `pnpm lint:style` | CSS スタイルのリント (Stylelint) |
| `pnpm e2e:all` | E2E テストを全ブラウザで実行 |
| `pnpm e2e:chromium` | E2E テストを Chromium のみで実行 |

### 開発サーバー

```bash
pnpm dev
```

起動後、以下の URL でアクセスできます:

| URL | 説明 |
|---|---|
| `http://localhost:4321` | Astro サイト |
| `http://localhost:4321/admin` | TinaCMS 管理画面 |

---

## ビルド

```bash
pnpm build
```

ビルド成果物は `dist/` ディレクトリに出力されます:

```
dist/
├── client/     # 静的ファイル (HTML, CSS, JS, 画像など)
└── server/     # サーバーエントリーポイント
```

### 注意点

- ビルド時に `.map` ファイルは自動的に削除されます (セキュリティ対策)
- `TINA_SKIP_SCHEMA_VALIDATION=true` が設定されており、スキーマバリデーションをスキップします

---

## コード品質

### フォーマット (Prettier)

```bash
pnpm format
```

対象ファイル: `*.css`, `*.ts`, `*.tsx`, `*.astro`

設定ファイル: `.prettierrc`

### リント (ESLint)

```bash
pnpm lint:js
```

対象ファイル: `src/**/*.{js,jsx,ts,tsx,astro}`

使用プラグイン:
- `@typescript-eslint`
- `eslint-plugin-astro`
- `eslint-plugin-react`
- `eslint-plugin-import`
- `eslint-plugin-tailwindcss`

### スタイルリント (Stylelint)

```bash
pnpm lint:style
```

対象ファイル: `src/**/*.{css,scss,astro}`

使用設定:
- `stylelint-config-recess-order` (プロパティ順序)
- `stylelint-declaration-block-no-ignored-properties`
- `stylelint-no-unsupported-browser-features`
- `stylelint-prettier`
- `stylelint-scss`

### Git フック (Husky + lint-staged)

コミット前に `lint-staged` が自動実行されます。

| ファイルパターン | 実行コマンド |
|---|---|
| `*.{js,jsx,ts,tsx}` | Prettier → ESLint |
| `*.astro` | Prettier → Stylelint → ESLint |
| `*.{css,scss}` | Prettier → Stylelint |
| `*.json` | Prettier |

---

## テスト (E2E)

[Playwright](https://playwright.dev/) を使用した E2E テストです。

### テスト実行

```bash
# 全ブラウザ (chromium, webkit, Mobile Chrome, Mobile Safari)
pnpm e2e:all

# Chromium のみ
pnpm e2e:chromium
```

テスト前に自動的に `pnpm dev` で開発サーバーが起動します。

### テスト対象ブラウザ

| プロジェクト名 | ブラウザ |
|---|---|
| `chromium` | Desktop Chrome |
| `webkit` | Desktop Safari |
| `Mobile Chrome` | Pixel 5 (Android) |
| `Mobile Safari` | iPhone 12 (iOS) |

### テストケース (`tests/index.spec.ts`)

| テスト名 | 内容 |
|---|---|
| `first landing page` | トップページのスクリーンショット比較 |
| `Blog Title link` | ロゴクリックでトップページに遷移 |
| `Home link` | Home リンクでトップページに遷移 |
| `Blog link` | Blog リンクで `/blog` に遷移 |
| `twitter` | フッターの Twitter リンクが正しい URL |
| `github link points to correct URL` | フッターの GitHub リンクが正しい URL |
| `top text` | トップページの h1 テキストが `def90.eth` |

### スクリーンショットのベースライン更新

```bash
# ベースラインスクリーンショットを更新
pnpm e2e:all --update-snapshots
```

スナップショットは `tests/index.spec.ts-snapshots/` に保存されています。

### CI 設定

`playwright.config.ts` で CI 環境向けの設定がされています:

- `forbidOnly: true` — `test.only` が残っているとビルド失敗
- `retries: 2` — 失敗時に最大2回リトライ
- `workers: 1` — 並列実行なし

---

## 環境変数一覧

| 変数名 | 必須 | 説明 |
|---|---|---|
| `CLIENTID` | 任意 | TinaCMS クライアント ID |
| `TOKEN` | 任意 | TinaCMS 認証トークン |
| `TINA_CLIENT_ID` | 任意 | TinaCMS クライアント ID (代替) |
| `TINA_TOKEN` | 任意 | TinaCMS 認証トークン (代替) |
| `TINA_BRANCH` | 任意 | TinaCMS ブランチ名 (デフォルト: `main`) |
| `SENTRY_AUTH_TOKEN` | 任意 | Sentry ソースマップアップロード用トークン |

---

## TypeScript パスエイリアス

`tsconfig.json` で以下のパスエイリアスが設定されています (推定):

| エイリアス | 実際のパス |
|---|---|
| `@components/*` | `src/components/*` |
| `@layouts/*` | `src/layouts/*` |
| `@lib/*` | `src/lib/*` |

---

## VSCode 推奨設定

`.vscode/extensions.json` に推奨拡張機能が定義されています。

### 推奨拡張機能

- Astro 公式拡張 (`astro-build.astro-vscode`)
- Tailwind CSS IntelliSense
- ESLint
- Prettier

---

## トラブルシューティング

### TinaCMS のスキーマエラー

```bash
# スキーマバリデーションをスキップして起動
TINA_SKIP_SCHEMA_VALIDATION=true pnpm dev
```

開発・ビルドコマンドにはデフォルトでこのフラグが設定されています。

### 画像変換エラー

`imgToPicture.js` は `public/` 以下の画像のみを処理します。外部 URL の画像を使用する場合はそのまま `<img>` タグとして出力されます。

### Sentry ソースマップのアップロード失敗

`SENTRY_AUTH_TOKEN` が設定されていない場合、ビルド時に警告が表示されますが、ビルド自体は成功します。

### ポートの変更

Astro のデフォルトポートは `4321` です。変更する場合:

```bash
pnpm astro dev --port 3000
```
