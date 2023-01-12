import * as React from 'react';
import { graphql, type PageProps } from 'gatsby';
import Seo from '../components/Seo';
import type { MicroCMSHello } from '../../types';

type IndexPageData = {
  microcmsHello: Pick<MicroCMSHello, 'id' | 'title' | 'body'>
};

function IndexPage({ data }: PageProps<IndexPageData>) {
  return (
    <div>
      <h1>{data.microcmsHello.title}</h1>
      <p>{data.microcmsHello.body}</p>
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
  }
`;
