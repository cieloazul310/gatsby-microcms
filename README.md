# Gatsby + microCMS Template

[Gatsby] + [microCMS] の最小限のテンプレートです。

## 使い方

このリポジトリは Template Repositoryです。
「Use this template」>「Create a new repository」から利用することを前提としています。

microCMSに登録後、以下の2種類のAPIを作成。

### APIの作成

#### 1. 最初のAPI

以下のチュートリアルに従って作成  
<https://document.microcms.io/tutorial/gatsby/gatsby-getting-started>

- API名: 最初のAPI(何でもよい)
- エンドポイント: **hello**
- APIの型: **オブジェクト形式**

##### 最初のAPIのフィールド

- フィールドID: **text**
- 表示名: テキスト(何でもよい)
- 種類: テキストフィールド

#### 2. ブログ

microCMSのテンプレートからAPIを自動作成  
<https://document.microcms.io/manual/create-api>

- API名: ブログ(自動)
- エンドポイント: **blogs**(自動)
- APIの型: リスト形式(自動)

##### ブログのフィールド

| フィールドID | 表示名     | 種類                    |
|------------|-----------|------------------------|
| title      | タイトル    | テキストフィールド        |
| content    | 内容       | リッチエディタ           |
| eyecatch   | アイキャッチ | 画像                   |
| category   | カテゴリ    | コンテンツ参照 - カテゴリ |

### gatsby-config.ts の編集

```ts
const config: GatsbyConfig = {
  siteMetadata: {
    title: `サイト名`,
    description: `サイトの説明`,
    siteUrl: 'siteUrl',
    author: `作者名`,
  },
  pathPrefix,
  plugins: [
    {
      resolve: 'gatsby-source-microcms',
      options: {
        // API Key を .env ファイルに記述
        apiKey: process.env.MICROCMS_APIKEY,
        // microCMSのサービスID
        serviceId: 'YOUR_SERVICEID',
        apis: [
          { endpoint: 'hello', format: 'object' },
          { endpoint: 'blogs', format: 'list' },
        ],
      },
    },
  ],
};
```

## Github Pagesに公開する

### Repository secrets の設定

リポジトリ内の「Settings」>「Security」>「Secrets and variables」>「Actions」のページに移動し、New repository secrets に以下の通りに設定する。

- Name: **MICROCMS_APIKEY**
- Secret: microCMSで取得したAPIキー

### Github Pages の設定

「Settings」>「Code and automation」>「Pages」に移動し、「Build and deployment」>「Source」に「Github Actions」を設定する。

### Webhook を設定

Webhookを設定することで、microCMSでコンテンツの更新に合わせてGithub Pagesにデプロイしたページを自動で更新することができます。  
ブログAPIの画面右上のAPI設定から「API設定」>「Webhook」>「Github Actions」と移動し設定してください。

- Webhookの識別名
- [Githubトークンを取得](https://docs.github.com/ja/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- リポジトリのユーザ名
- リポジトリ名
- トリガーイベント名: **update_blogs**

コンテンツのWebhookを設定  
<https://document.microcms.io/manual/webhook-setting#hf0d425ae06>

[Gatsby]: https://www.gatsbyjs.com "Gatsby"
[microCMS]: https://microcms.io "microCMS"
