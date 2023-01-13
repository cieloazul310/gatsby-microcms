import * as React from 'react';
import { Link, graphql, type PageProps } from 'gatsby';
import Seo from '../components/Seo';
import useSiteMetadata from '../utils/useSiteMetadata';
import type { MicroCMSHello, MicroCMSNews } from '../../types';

type IndexPageData = {
  microcmsHello: Pick<MicroCMSHello, 'id' | 'title' | 'body'>
  allMicrocmsNews: {
    nodes: Pick<MicroCMSNews, 'slug' | 'title' | 'publishedAt'>[]
  }
};

function IndexPage({ data }: PageProps<IndexPageData>) {
  const { microcmsHello, allMicrocmsNews } = data;
  const { title, description } = useSiteMetadata();
  return (
    <div>
      <header>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
      <main>
        <h2>{microcmsHello.title}</h2>
        <p>{microcmsHello.body}</p>
      </main>
      <nav>
        <h2>最新のニュース</h2>
        <ul>
          {allMicrocmsNews.nodes.map((node) => (
            <li key={node.slug}>
              <Link to={node.slug}>
                <p>{node.title}</p>
                <small>{node.publishedAt}</small>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default IndexPage;

export function Head() {
  return <Seo />;
}

export const query = graphql`
  {
    microcmsHello {
      id
      title
      body
    }
    allMicrocmsNews(sort: { publishedAt: DESC }, limit: 8) {
      nodes {
        slug
        title
        publishedAt(formatString: "YYYY年MM月DD日")
      }
    }
  }
`;
