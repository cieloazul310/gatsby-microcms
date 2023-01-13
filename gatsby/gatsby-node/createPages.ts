import * as path from 'path';
import type { CreatePagesArgs } from 'gatsby';
import type { MicroCMSBlogs } from '../../types';

type CreatePagesQueryData = {
  allMicrocmsBlogs: {
    nodes: Pick<MicroCMSBlogs, 'slug'>[];
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
  allMicrocmsBlogs.nodes.forEach(({ slug }, index) => {
    const newer = index !== 0 ? allMicrocmsBlogs.nodes[index - 1].slug : null;
    const older = index !== allMicrocmsBlogs.nodes.length - 1 ? allMicrocmsBlogs.nodes[index + 1].slug : null;

    createPage({
      path: slug,
      component: path.resolve('./src/templates/blog-post.tsx'),
      context: {
        slug,
        newer,
        older,
      },
    });
  });
}
