import * as path from 'path';
import type { CreatePagesArgs } from 'gatsby';
import type { MicroCMSNews } from '../../types';

type CreatePagesQueryData = {
  allMicrocmsNews: {
    nodes: Pick<MicroCMSNews, 'slug'>[];
  };
};

export default async function createPages({ graphql, actions, reporter }: CreatePagesArgs) {
  const { createPage } = actions;
  const result = await graphql<CreatePagesQueryData>(`
    query {
      allMicrocmsNews(sort: { publishedAt: DESC }) {
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

  const { allMicrocmsNews } = result.data;
  allMicrocmsNews.nodes.forEach(({ slug }, index) => {
    const newer = index !== 0 ? allMicrocmsNews.nodes[index - 1].slug : null;
    const older = index !== allMicrocmsNews.nodes.length - 1 ? allMicrocmsNews.nodes[index + 1].slug : null;

    createPage({
      path: slug,
      component: path.resolve('./src/templates/news.tsx'),
      context: {
        slug,
        newer,
        older,
      },
    });
  });
}
