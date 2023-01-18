import type { Node } from 'gatsby';

/** サイトメタデータ */
export type SiteMetadata = {
  /** サイトタイトル */
  title: string;
  /** サイトの説明 */
  description: string;
  /**  サイト作成者 */
  author: string;
};

/**
 * コンテンツ(API)に自動付与される値
 * https://document.microcms.io/manual/automatic-grant-fields
 */
export type MicrocmsDefaultFields = {
  /** コンテンツの作成日時 */
  createdAt: string;
  /** コンテンツの更新日時 */
  updatedAt: string;
  /** コンテンツの公開日時 */
  publishedAt: string;
  /** コンテンツの改定日時 */
  revisedAt: string;
  /** コンテンツの表示順 (0が最上位) */
  sortIndex: number;
};

/** microCMSで作成した `hello` コンテンツ(API)の型定義 */
export type MicrocmsHello = {
  /**
   * - フィールドID: `text`
   * - 表示名: テキスト
   * - 種類: テキストフィールド
   */
  text: string;
} & Omit<MicrocmsDefaultFields, 'sortIndex'> &
  Node;

/**
 * GraphQLで生成される`blogs.category`の型定義
 * `blogs.category.id` と `categories.categoriesId` が一致する
 */
export type MicrocmsBlogsCategory = Pick<MicrocmsCategories, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt' | 'revisedAt' | 'name'>;

/**
 * GraphQLで生成される`blogs.eyecatch`の型定義
 */
export type MicrocmsBlogsEyecatch = {
  url: string;
  width: number;
  height: number;
};

/** microCMSで（自動）作成した `categories` コンテンツ(API)の型定義 */
export type MicrocmsCategories = {
  /** 各コンテンツ固有のID */
  categoriesId: string;
  /**
   * - フィールドID: `name`
   * - 表示名: カテゴリ名
   * - 種類: テキストフィールド
   */
  name: string;
} & MicrocmsDefaultFields &
  Node;

/** microCMSで（自動）作成した `blogs` コンテンツ(API)の型定義 */
export type MicrocmsBlogs = {
  /** 各コンテンツ固有のID */
  blogsId: string;
  /**
   * - フィールドID: `title`
   * - 表示名: タイトル
   * - 種類: テキストフィールド
   */
  title: string;
  /**
   * - フィールドID: `content`
   * - 表示名: 内容
   * - 種類: リッチエディタ
   */
  content: string;
  /**
   * - フィールドID: `eyecatch`
   * - 表示名: アイキャッチ
   * - 種類: 画像
   */
  eyecatch: MicrocmsBlogsEyecatch | null;
  /**
   * - フィールドID: `category`
   * - 表示名: カテゴリ
   * - 種類: コンテンツ参照 - カテゴリ
   *
   * `blogs.category.id` と `categories.categoriesId` が一致する
   */
  category: MicrocmsBlogsCategory | null;
} & MicrocmsDefaultFields &
  Node & {
    /**
     * Gatsby Node APIs
     * createSchemaCustomizationで作成した新たなフィールド
     */
    slug: string;
  };
