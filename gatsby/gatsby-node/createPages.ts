/**
 * createPages
 * https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createPages
 */
import * as path from 'path';
import type { CreatePagesArgs } from 'gatsby';
import type { MicrocmsBlogs } from '../../types';

/**
 * createPages で実行するGraphQLクエリの返り値の型定義
 */
type CreatePagesQueryData = {
  allMicrocmsBlogs: {
    nodes: Pick<MicrocmsBlogs, 'slug'>[];
  };
};

export default async function createPages({ graphql, actions, reporter }: CreatePagesArgs) {
  const { createPage } = actions;
  const result = await graphql<CreatePagesQueryData>(`
    query {
      allMicrocmsBlogs(sort: { publishedAt: DESC }) {
        nodes {
          slug
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }
  if (!result.data) throw new Error('There are no posts');

  const { allMicrocmsBlogs } = result.data;

  /**
   * 各記事のページを生成する
   * path は createSchemaCustomization で生成した `slug` を指定
   *
   * "/YYYY/MM/${blogsId}/"
   */
  allMicrocmsBlogs.nodes.forEach(({ slug }, index) => {
    /** 一つ新しい記事のslugを取得 */
    const newer = index !== 0 ? allMicrocmsBlogs.nodes[index - 1].slug : null;
    /** 一つ古い記事のslugを取得 */
    const older = index !== allMicrocmsBlogs.nodes.length - 1 ? allMicrocmsBlogs.nodes[index + 1].slug : null;

    createPage({
      path: slug,
      component: path.resolve('./src/templates/blog-post.tsx'),
      /**
       * context はテンプレートのGraphQLクエリで変数として使用できる
       */
      context: {
        slug,
        newer,
        older,
      },
    });
  });

  /** 記事リストの一つのページに表示する記事数 */
  const postsPerPage = 20;

  /** 記事リストのページ数 */
  const numPages = Math.ceil(allMicrocmsBlogs.nodes.length / postsPerPage);

  /** 記事リストの各ページを生成 */
  Array.from({ length: numPages }).forEach((_, index) => {
    createPage({
      path: index === 0 ? '/posts/' : `/posts/${encodeURIComponent(index + 1)}/`,
      component: path.resolve('./src/templates/post-list.tsx'),
      /**
       * context はテンプレートのGraphQLクエリで変数として使用できる
       */
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        numPages,
        currentPage: index + 1,
      },
    });
  });
}
