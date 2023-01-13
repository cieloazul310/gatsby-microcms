import type { CreateSchemaCustomizationArgs } from 'gatsby';
import type { MicroCMSNews } from '../../types';

export default async function createSchemaCustomization({ actions, schema }: CreateSchemaCustomizationArgs) {
  const { createTypes } = actions;
  createTypes(`
    type MicrocmsNews implements Node {
      slug: String!
    }
  `);
  createTypes(
    schema.buildObjectType({
      name: `MicrocmsNews`,
      fields: {
        slug: {
          type: `String!`,
          resolve: ({ newsId, publishedAt }: Pick<MicroCMSNews, 'newsId' | 'publishedAt'>) => {
            const date = new Date(publishedAt);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            return `/${year}/${month.toString().padStart(2, '0')}/${newsId}/`;
          },
        },
      },
    })
  );
}
