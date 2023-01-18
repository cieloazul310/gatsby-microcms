import * as React from 'react';
import useSiteMetadata from '../utils/useSiteMetadata';

type SeoProps = React.PropsWithChildren<{
  title?: string;
  description?: string;
}>;

/**
 * Gatsby Head API で使用するための <Seo> コンポーネント
 *
 * Gatsby Head API
 * https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
function Seo({ title, description, children }: SeoProps) {
  const siteMetadata = useSiteMetadata();
  const pageTitle = title ? `${title} - ${siteMetadata.title}` : siteMetadata.title;
  const pageDescription = description ?? siteMetadata.description;

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {children}
    </>
  );
}

export default Seo;
