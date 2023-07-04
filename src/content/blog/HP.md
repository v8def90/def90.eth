---
title: このサイトについて
slug: HP
pubDate: 2023-07-01T00:00:00.000Z
image: /assets/astro.jpg
category:
  - typescript
  - astro
description: 'Blog #1'
draft: false
---

qiitaやzenn, noteでAccount作ってBlogを書いてもよかったんですが、あまり人に見られたくないので自製でHPを構築運用してみることとしました。

このURLを知っている人限りで技術的な内容を共有したり、ポエムを垂れ流したりできたらなと考えています。Portfolioも作成して公開することも視野に入れています。(因みにこのBlogはMarkdownの練習も兼ねてます)

最初の投稿は、せっかくなのでこのBlog自体について書きたいと思います。このBlogを作成するにあたって、検討したことは以下の通りです。

\- Concept

&#x9;1\. システムアーキテクチャ ~できる限りランニングコストを0に~

&#x9;2\. 自分が触ったことのないスキルセットを使ってみる

&#x9;3\. 管理系運用系のライブラリについて、自分なりのベストプラクティスを模索してみる

1\. これについては重要です。ランニングコストが高いと、実際に顧客に提案するにあたってランニングコストを気にする人は多いと思うので、できるでけ安く。ただし、エンジニアでなくても運用できるようにというのは、気にしたポイントです。

2\. これについてはAstroを選択してみました。Astroの魅力については後述しますが、Javascript/TypeScriptのフレームワークの中でとにかく表示が早いというところがメインです。

3\. 最近はJavaScript/Typescriptのフレームワークで実装していることが多いのですが、管理用のライブラリが豊富で有用なものが多いです。今後積極的に使っていきたいものについて、今回紹介したいと思います。

\### システムアーキテクチャ

\---

HPサーバを構築し、Blogを書いていくとなるとランニング費用に直結してくるのは、DBの有無だと思います。DBを使用しないだけで月々のランニング費用は大きく変わってきます。

となるとwordpressは利用できないわけでCMSについて色々調査していると、Headless CMSみたいな概念でベースとなるCMSの機能は提供するけれど、画面やUIは提供しないといったCMSが結構な数、提供されるようになっていました。これによりユーザ(開発者)は好きな画面、UIで構築しつつコンテンツの管理はCMSに任せるといった構成が取れることになります。

ということで今回はHeadlessでOSSのものの中からDBレスでもある、TinaCMSを選定してみました。

https://tina.io/

仕組みとしては、コンテンツ(ブログの記事や画像)も含めてGithubで管理しています。そのコンテンツはtinaCMSから管理(作成、更新、追加)することが可能で、tinaCMS上でコンテンツの追加等が行われると、githubにpushされるという内容です。今回のサイトはAWS Amplify上に構築していて、github上でcommitされるとCI/CDパイプラインが走って、サイトのコンテンツ(tinaCMSで変更した内容)が更新されるという仕組みになっています。githubの容量制限は10GB/repositoryなのでBlogサイトとしては十分で、Frontend部分のみの利用なのでAmplifyも無料枠の中に収まっています。

!\[\[Pasted image 20230704093320.png]]

!\[\[Pasted image 20230704093347.png]]

他にもstrapiやNetlify CMSといったHeadlessのCMSも使ってみたかったのですが、strapiはDBレスではなく、tinaCMSがそもそもNetlify-cmsの対抗サービスとして出て来ているようなので、npm tremdsも参考にしながらtinaCMSを選びました。

!\[\[Pasted image 20230704094259.png]]

話は変わりますが、Headless XXXのようなものはCMS以外にも転用できるのではないかと考えています。例えばHeadless ERPみたいなものが開発できると、~~業務の標準化ができない~~日本の企業のようなところにはFitする気がしています。画面周りなんかは会社によって求めるものが違うのが当然だと思いますし、事前に作っておくよりは「お客様のための画面を作ります」みたいな営業文句が刺さったりするようなしないような。

当然これはDXに逆行している内容だと思うのですが、業務の標準化を進められる企業なんて一握りでしょうし、落とし所としてはありのような気がしています。

\- Backend: Github(TinaCMS)

\## Astroについて

\---

Astroは最近気になっていたフレームワークで、今回面白いなと思って採用してみました。

https://astro.build/

Astroの何が面白いかというと、Javascriptのフレームワークでありながら"zero-JS frontend Architecture"を謳っている点です。build時に極力JavaScriptを排除することで、JavaScriptを減らしページのレスポンス向上を図るといった(変わった)フレームワークです。そのため、明示的に指定しないとJavaScriptが動作しないといった仕様になっています。

その代わりページのレスポンスは早く、他のフレームワークの1.5倍というパフォーマンスを謳ってます。(以下は公式ページより)

!\[\[Pasted image 20230703122938.png]]

Lighthouseでレポートも作成してみましたが、割りといいスコアを出しています。今後、別のフレームワークを調査するときの比較対象として残しておきます。

!\[\[Pasted image 20230703130548.png]]

また、ReactやVue, Svelteなどの複数のフレームワークと互換性があるため、そのページコンテンツはAstroで作成しておきながら、ページ内のコンポーネントはReactで作成するといった実装が可能です。

Astroのいいところをこれまで語ってきましたが、当然不得意な分野も存在します。公式も宣言しているのが面白いところです。

\> \*\*Astro was designed for building content-rich websites.\*\* This includes most marketing sites, publishing sites, documentation sites, blogs, portfolios, and some ecommerce sites.

\> By contrast, most modern web frameworks are designed for building \_web applications\_. These frameworks work best for building more complex, application-like experiences in the browser: logged-in admin dashboards, inboxes, social networks, todo lists, and even native-like applications like \[Figma]\(https://figma.com/) and \[Ping]\(https://ping.gg/).

\> If your project falls into the second “application” camp, Astro might not be the right choice for your project… \*\*and that’s okay!\*\* Check out \[Next.js]\(https://nextjs.org/) for a more application-focused alternative to Astro.

(意訳)Astroは静的なコンテンツ(HPやBlog, Portfolioなど)を構築するために、設計されています。

世間一般的なWebフレームワークは、アプリケーション(FigmaとかPing)を構築するために設定されていて、あなたがアプリケーションを構築したいのであれば、Next.jsをチェックしてみてください。

今回は、BlogとPortfolioがメインなのでAstroを採用しましたが、業務アプリを構築するような場合にはNext.jsの方がいいみたいです。(とAstro公式が言ってます)

なお、今回はAstro v2がリリースされていたので、versionは2.5.6を使用しています。CSSはTailwindCSSで構築しています。個人的なこだわりでダークモードも導入しています。

\- Frontend: Astro v2(一部Reactを使用)

\- CSS: TailwindCSS

\### 管理用ライブラリについて

\---

最近はTypescript/Next.jsすることが多かったのでこの機会に、開発をサポートするライブラリについて自分の中で整理しつつ、設定なども細かく見てみました。ぶっちゃけ、ここに一番時間がかかっていると思います。

最終的にやりたいことは以下の通りです。

1\. commitを発行する前に各種リンター、フォーマッターでチェック、整形を行う。

2\. pushする前にテストツールでe2eテストを実行し、エラーがある状態でのリモートリポジトリへのpushをブロックする。

自分で設定しておきながら、1.および2.によく引っかかってました。1, 2ともにgitコマンドをhookするために、huskyを使ってます。1.の場合はさらにlint-stagedを使って各種リンターを動かしています。

今回の構成ライブラリは以下の通りです。個人的におぉって思ったのは、Playwrightです。QAエンジニアになろうかな。

\- ESLint

&#x9;\- JavaScriptのリンター、デフォルトではチェックしてくれないのでextendsでいくつか追加しています。

\- StyleLint

&#x9;\- CSSのリンター

\- Prettier

&#x9;\- フォーマッター、ファイルのフォーマットをしてくれる。

\- Lint-Staged

&#x9;\- gitでStagingされているファイルに対して、リンターやフォーマッターを実行してくれる。

\- Husky

&#x9;\- GitコマンドをHookして任意のプログラムを実行してくれます。ここで、Lint-stagedやpackage.jsonで定義しているscript(playwright)を実行させてます。

\- Playwright

&#x9;\- e2eテストツール。

\### ソース

\---

以下に公開しております。

https://github.com/v8def90/def90.eth
