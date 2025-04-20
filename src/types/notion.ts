/**
 * Notion 관련 타입 분리
 */
import type { Post } from './blog';

export interface GetPublishedPostsParams {
  tag?: string;
  sort?: string;
  pageSize?: number;
  startCursor?: string;
}

export interface GetPublishedPostsResponse {
  posts: Post[];
  hasMore: boolean;
  nextCursor: string | null;
}

export interface CreatePostParams {
  title: string;
  tag: string;
  content: string;
}

export interface TagFilterItem {
  id: string;
  name: string;
  count: number;
}
