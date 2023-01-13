import * as React from 'react';
import { Link, graphql, type PageProps, type HeadProps } from 'gatsby';
import Seo from '..//components/Seo';
import type { MicroCMSNews } from '../../types';

type NewsTemplateQueryData = {
  microcmsNews: Pick<MicroCMSNews, 'slug' | 'title' | 'publishedAt' | 'content'>;
  newer: Pick<MicroCMSNews, 'slug' | 'title' | 'publishedAt'> | null;
  older: Pick<MicroCMSNews, 'slug' | 'title' | 'publishedAt'> | null;
};

type NewsTemplatePageContext = {
  slug: string;
  newer: string | null;
  older: string | null;
};

function NewsTemplate({ data }: PageProps<NewsTemplateQueryData, NewsTemplatePageContext>) {
  const { microcmsNews, newer, older } = data;
  const { title, publishedAt, content } = microcmsNews;
  return (
    <div>
      <div>
        <Link to="/">トップページ</Link>
      </div>
      <main>
        <article>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
          <aside>{publishedAt}</aside>
        </article>
      </main>
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
    </div>
  );
}

export default NewsTemplate;

export function Head({ data }: HeadProps<NewsTemplateQueryData, NewsTemplatePageContext>) {
  const { microcmsNews } = data;
  return <Seo title={microcmsNews.title} />;
}

export const query = graphql`
  query NewsPageQuery($slug: String!, $newer: String, $older: String) {
    microcmsNews(slug: { eq: $slug }) {
      slug
      title
      publishedAt(formatString: "YYYY年MM月DD日")
      content
    }
    newer: microcmsNews(slug: { eq: $newer }) {
      slug
      title
      publishedAt(formatString: "YYYY年MM月DD日")
    }
    older: microcmsNews(slug: { eq: $older }) {
      slug
      title
      publishedAt(formatString: "YYYY年MM月DD日")
    }
  }
`;
