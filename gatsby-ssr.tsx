/**
 * Gatsby Server Rendering APIs
 * https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */
import * as React from 'react';
import type { WrapPageElementNodeArgs } from 'gatsby';
import Layout from './src/layout';

/** 全てのページを<Layout>でラップする */
export function wrapPageElement({ element }: WrapPageElementNodeArgs) {
  return <Layout>{element}</Layout>;
}
