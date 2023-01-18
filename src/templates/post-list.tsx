import * as React from 'react';
import { Link, graphql, type PageProps, type HeadProps } from 'gatsby';
import Seo from '../components/Seo';
import type { MicrocmsBlogs } from '../../types';

/**
 * 記事リストのページで実行するGraphQLクエリの返り値の型定義
 */
type PostListTemplateData = {
  allMicrocmsBlogs: {
    nodes: Pick<MicrocmsBlogs, 'slug' | 'title' | 'publishedAt'>[];
  };
};

/**
 * 記事リストのページで実行するGraphQLクエリの返り値の型定義
 */
type PostListTemplatePageContext = {
  limit: number;
  skip: number;
  numPages: number;
  currentPage: number;
};

function PostListTemplate({ data, pageContext }: PageProps<PostListTemplateData, PostListTemplatePageContext>) {
  const { allMicrocmsBlogs } = data;
  const { numPages, currentPage } = pageContext;
  return (
    <>
      <div>
        <h2>
          記事の一覧 ({currentPage}/{numPages})
        </h2>
        <ul>
          {allMicrocmsBlogs.nodes.map((node) => (
            <li key={node.slug}>
              <Link to={node.slug}>
                <p>{node.title}</p>
                <small>{node.publishedAt}</small>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <nav>
        {currentPage !== 1 ? (
          <div>
            <Link to={currentPage === 2 ? `/posts/` : `/posts/${currentPage - 1}/`}>
              {currentPage - 1}/{numPages}
            </Link>
          </div>
        ) : null}
        {currentPage !== numPages ? (
          <div>
            <Link to={`/posts/${currentPage + 1}/`}>
              {currentPage + 1}/{numPages}
            </Link>
          </div>
        ) : null}
      </nav>
    </>
  );
}

export default PostListTemplate;

/**
 * Gatsby Head API
 * https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export function Head({ pageContext }: HeadProps<PostListTemplateData, PostListTemplatePageContext>) {
  const { numPages, currentPage } = pageContext;
  const title = `記事一覧 (${currentPage}/${numPages})`;
  return <Seo title={title} />;
}

/**
 * Querying Data in Pages with GraphQL
 * https://www.gatsbyjs.com/docs/how-to/querying-data/page-query/
 * 
 * ページコンテキストが変数として利用できる
 * - $skip: Int!
 * - $limit: Int!
 */
export const query = graphql`
  query PostList($skip: Int!, $limit: Int!) {
    allMicrocmsBlogs(sort: { publishedAt: DESC }, limit: $limit, skip: $skip) {
      nodes {
        slug
        title
        publishedAt(formatString: "YYYY年MM月DD日")
      }
    }
  }
`;
