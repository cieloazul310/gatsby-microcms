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

export type MicroCMSNewsCategory = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};

export type MicroCMSNews = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  category: MicroCMSNewsCategory | null;
  sortIndex: number;
  newsId: string;
  slug: string;
} & Node;
