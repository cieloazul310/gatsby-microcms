import type { GatsbyConfig } from 'gatsby';
import * as dotenv from 'dotenv';

dotenv.config();
const pathPrefix = '/gatsby-microcms';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Gatsby microCMS Example`,
    description: `Gatsby + microCMS`,
    siteUrl: 'https://cieloazul310.github.io/gatsby-microcms',
    author: `@cieloazul310`,
  },
  pathPrefix,
  plugins: [
    {
      resolve: 'gatsby-source-microcms',
      options: {
        apiKey: process.env.MICROCMS_APIKEY,
        serviceId: 'cieloazul310',
        apis: [
          { endpoint: 'hello', format: 'object' },
          { endpoint: 'blogs', format: 'list' },
        ],
      },
    },
  ],
};

export default config;
