import type { Node } from 'gatsby';

export type SiteMetadata = {
  title: string;
  description: string;
  siteUrl: string;
  author: string;
};

export type MicroCMSHello = {
  title: string;
  body: string;
} & Node;
