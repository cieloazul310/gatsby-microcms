/**
 * createSchemaCustomization
 *
 * https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createSchemaCustomization
 */
import type { CreateSchemaCustomizationArgs } from 'gatsby';
import type { MicrocmsBlogs } from '../../types';

export default async function createSchemaCustomization({ actions, schema }: CreateSchemaCustomizationArgs) {
  const { createTypes } = actions;

  /**
   * MicrocmsBlogs スキーマに新たに `slug` フィールドを作成する
   */
  createTypes(`
    type MicrocmsBlogs implements Node {
      slug: String!
    }
  `);
  createTypes(
    schema.buildObjectType({
      name: `MicrocmsBlogs`,
      fields: {
        slug: {
          type: `String!`,
          /**
           * `slug` フィールドの値をコンテンツIDと公開日時から生成する
           *
           * "/YYYY/MM/${blogsId}/"
           */
          resolve: ({ blogsId, publishedAt }: Pick<MicrocmsBlogs, 'blogsId' | 'publishedAt'>) => {
            const date = new Date(publishedAt);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return `/${encodeURIComponent(year.toString())}/${encodeURIComponent(month.toString().padStart(2, '0'))}/${encodeURIComponent(
              blogsId
            )}/`;
          },
        },
      },
    })
  );
}
