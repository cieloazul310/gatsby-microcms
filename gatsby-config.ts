import type { GatsbyConfig } from 'gatsby';

const pathPrefix = '/gatsby-microcms';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Gatsby microCMS Example`,
    description: `Gatsby + microCMS`,
    siteUrl: 'https://cieloazul310.github.io/gatsby-microcms',
    author: `@cieloazul310`,
  },
  pathPrefix,
  plugins: [],
};

export default config;
