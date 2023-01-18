/**
 * Gatsby Config API
 * https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */
import type { GatsbyConfig } from 'gatsby';
import * as dotenv from 'dotenv';

dotenv.config();

const config: GatsbyConfig = {
  /** サイトメタデータ */
  siteMetadata: {
    title: `Gatsby microCMS Example`,
    description: `Gatsby + microCMS`,
    author: `cieloazul310`,
  },
  /** GitHubのリポジトリ名 (GitHub Pagesで公開する場合) */
  pathPrefix: '/gatsby-microcms',
  plugins: [
    {
      resolve: 'gatsby-source-microcms',
      options: {
        /** .envファイルからmicroCMSのAPIキーを取得 */
        apiKey: process.env.MICROCMS_APIKEY,
        /**
         * プロジェクトで使用するmicroCMSのサービスID
         * https://${serviceId}.microcms.io
         */
        serviceId: 'cieloazul310',
        /**
         * プロジェクトで使用するmicroCMSサービスのコンテンツ(API)
         * https://${serviceId}.microcms.io/api/v1/${endpoint}
         */
        apis: [
          { endpoint: 'hello', format: 'object' },
          { endpoint: 'categories', format: 'list' },
          { endpoint: 'blogs', format: 'list' },
        ],
      },
    },
  ],
};

export default config;
