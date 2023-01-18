/**
 * Gatsby Browser APIs
 * https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */
import * as React from 'react';
import type { WrapPageElementBrowserArgs } from 'gatsby';
import Layout from './src/layout';

/** 全てのページを<Layout>でラップする */
export function wrapPageElement({ element }: WrapPageElementBrowserArgs) {
  return <Layout>{element}</Layout>;
}
