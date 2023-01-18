import * as React from 'react';
import { Link, graphql, type PageProps, type HeadProps } from 'gatsby';
import Seo from '..//components/Seo';
import type { MicrocmsBlogs } from '../../types';

/**
 * 各記事のページで実行するGraphQLクエリの返り値の型定義
 */
type BlogPostTemplateQueryData = {
  microcmsBlogs: Pick<MicrocmsBlogs, 'slug' | 'title' | 'publishedAt' | 'content'>;
  newer: Pick<MicrocmsBlogs, 'slug' | 'title' | 'publishedAt'> | null;
  older: Pick<MicrocmsBlogs, 'slug' | 'title' | 'publishedAt'> | null;
};

/**
 * createPagesで設定した各記事のページに供給されるページコンテキスト
 * GraphQLクエリで変数として使用できる
 */
type BlogPostTemplatePageContext = {
  slug: string;
  newer: string | null;
  older: string | null;
};

function BlogsTemplate({ data }: PageProps<BlogPostTemplateQueryData, BlogPostTemplatePageContext>) {
  const { microcmsBlogs, newer, older } = data;
  const { title, publishedAt, content } = microcmsBlogs;
  return (
    <>
      <article>
        <h1>{title}</h1>
        <p>{publishedAt}</p>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </article>
      <nav>
        <div>
          {newer ? (
            <div>
              <p>新しい記事</p>
              <Link to={newer.slug}>{newer.title}</Link>
              <small>{newer.publishedAt}</small>
            </div>
          ) : null}
          {older ? (
            <div>
              <p>古い記事</p>
              <Link to={older.slug}>{older.title}</Link>
              <small>{older.publishedAt}</small>
            </div>
          ) : null}
        </div>
      </nav>
    </>
  );
}

export default BlogsTemplate;

/**
 * Gatsby Head API
 * https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export function Head({ data }: HeadProps<BlogPostTemplateQueryData, BlogPostTemplatePageContext>) {
  const { microcmsBlogs } = data;
  return <Seo title={microcmsBlogs.title} />;
}

/**
 * Querying Data in Pages with GraphQL
 * https://www.gatsbyjs.com/docs/how-to/querying-data/page-query/
 *
 * ページコンテキストが変数として利用できる
 * - $slug: String!
 * - $newer: String
 * - $older: String
 */
export const query = graphql`
  query BlogPostPageQuery($slug: String!, $newer: String, $older: String) {
    microcmsBlogs(slug: { eq: $slug }) {
      slug
      title
      publishedAt(formatString: "YYYY年MM月DD日")
      content
    }
    newer: microcmsBlogs(slug: { eq: $newer }) {
      slug
      title
      publishedAt(formatString: "YYYY年MM月DD日")
    }
    older: microcmsBlogs(slug: { eq: $older }) {
      slug
      title
      publishedAt(formatString: "YYYY年MM月DD日")
    }
  }
`;
