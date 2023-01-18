import { graphql, useStaticQuery } from 'gatsby';
import type { SiteMetadata } from '../../types';

/**
 * フックで実行するGraphQLクエリの返り値の型定義
 */
type UseSiteMetadataQueryData = {
  site: {
    siteMetadata: SiteMetadata;
  };
};

/**
 * サイトメタデータを取得するReactフック
 */
function useSiteMetadata() {
  const { site } = useStaticQuery<UseSiteMetadataQueryData>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `);
  return site.siteMetadata;
}

export default useSiteMetadata;
