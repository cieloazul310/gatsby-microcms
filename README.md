# Gatsby + microCMS Template

[Gatsby] + [microCMS] の最小限のテンプレートです。

## 使い方

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

```

[Gatsby]: https://www.gatsbyjs.com "Gatsby"
[microCMS]: https://microcms.io "microCMS"
