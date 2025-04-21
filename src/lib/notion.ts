import { Client } from '@notionhq/client';
import { unstable_cache } from 'next/cache';
import type { Post } from '@/types/blog';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';
import {
  NOTION_STATUS_PUBLISHED,
  NOTION_TAG_ALL,
  NOTION_TAG_ALL_ID,
} from './constants/notion.constants';
import type { TagFilterItem, CreatePostParams } from '../types/notion';

/**
 * Notion cover 객체에서 이미지 URL 추출
 */
function getCoverImage(cover: PageObjectResponse['cover']): string {
  if (!cover) return '';
  if (cover.type === 'external') return cover.external.url;
  if (cover.type === 'file') return cover.file.url;
  return '';
}

/**
 * Notion 페이지에서 Post 메타데이터 추출
 */
function getPostMetadata(page: PageObjectResponse): Post {
  const { properties } = page;
  return {
    id: page.id,
    title: properties.Title.type === 'title' ? (properties.Title.title[0]?.plain_text ?? '') : '',
    description:
      properties.Description.type === 'rich_text'
        ? (properties.Description.rich_text[0]?.plain_text ?? '')
        : '',
    coverImage: getCoverImage(page.cover),
    tags:
      properties.Tags.type === 'multi_select'
        ? properties.Tags.multi_select.map((tag) => tag.name)
        : [],
    date:
      properties.Created_time.type === 'created_time'
        ? (properties.Created_time.created_time ?? '')
        : '',
    slug:
      properties.Slug.type === 'rich_text'
        ? (properties.Slug.rich_text[0]?.plain_text ?? page.id)
        : page.id,
  };
}

function getEnvOrThrow(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`환경변수 ${key}가 설정되지 않았습니다.`);
  return value;
}

export const notion = new Client({
  auth: getEnvOrThrow('NOTION_TOKEN'),
});

/**
 * 슬러그로 게시글 1개 조회 (캐싱)
 */
export const getPostBySlug = unstable_cache(
  async (
    slug: string
  ): Promise<{
    post: Post | null;
  }> => {
    try {
      const response = await notion.databases.query({
        database_id: getEnvOrThrow('NOTION_DATABASE_ID'),
        filter: {
          and: [
            {
              property: 'Slug',
              rich_text: {
                equals: slug,
              },
            },
            {
              property: 'Status',
              select: {
                equals: NOTION_STATUS_PUBLISHED,
              },
            },
          ],
        },
      });
      if (!response.results[0]) {
        return { post: null };
      }
      return {
        post: getPostMetadata(response.results[0] as PageObjectResponse),
      };
    } catch (error) {
      console.error('getPostBySlug error:', error);
      return { post: null };
    }
  },
  ['post'],
  {
    tags: ['post'],
    revalidate: 60,
  }
);

/**
 * 게시글 목록 조회 (태그/정렬/페이지네이션 지원, 캐싱)
 */
export const getPublishedPosts = (
  tag: string = NOTION_TAG_ALL,
  sort: string = 'latest',
  pageSize: number = 4,
  startCursor: string = ''
) =>
  unstable_cache(
    async () => {
      try {
        const filter: QueryDatabaseParameters['filter'] = {
          and: [
            {
              property: 'Status',
              select: {
                equals: NOTION_STATUS_PUBLISHED,
              },
            },
          ],
        };
        if (tag && tag !== NOTION_TAG_ALL) {
          (filter.and as QueryDatabaseParameters['filter'][]).push({
            property: 'Tags',
            multi_select: { contains: tag },
          });
        }
        const response = await notion.databases.query({
          database_id: getEnvOrThrow('NOTION_DATABASE_ID'),
          filter,
          sorts: [
            {
              property: 'Created_time',
              direction: sort === 'latest' ? 'descending' : 'ascending',
            },
          ],
          page_size: pageSize,
          start_cursor: startCursor || undefined,
        });
        const posts = response.results
          .filter((page): page is PageObjectResponse => 'properties' in page)
          .map(getPostMetadata);
        return {
          posts,
          hasMore: response.has_more,
          nextCursor: response.next_cursor,
        };
      } catch (error) {
        console.error('getPublishedPosts error:', error);
        return { posts: [], hasMore: false, nextCursor: null };
      }
    },
    ['posts', tag, sort, String(pageSize), startCursor],
    {
      tags: ['posts'],
      revalidate: 60,
    }
  );

/**
 * 전체 태그 목록 및 카운트 반환
 */
export const getTags = async (): Promise<TagFilterItem[]> => {
  const { posts } = await getPublishedPosts(NOTION_TAG_ALL, 'latest', 100)();
  const tagCount = posts.reduce(
    (acc: Record<string, number>, post) => {
      post.tags?.forEach((tag: string) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>
  );
  const tags: TagFilterItem[] = Object.entries(tagCount).map(([name, count]) => ({
    id: name,
    name,
    count: Number(count),
  }));
  tags.unshift({
    id: NOTION_TAG_ALL_ID,
    name: NOTION_TAG_ALL,
    count: posts.length,
  });
  const [allTag, ...restTags] = tags;
  const sortedTags = restTags.sort((a, b) => a.name.localeCompare(b.name));
  return [allTag, ...sortedTags];
};

/**
 * Notion 페이지 recordMap 캐싱
 */
export const getNotionRecordMap = unstable_cache(
  async (pageId: string) => {
    const { NotionAPI } = await import('notion-client');
    const notion = new NotionAPI();
    return notion.getPage(pageId);
  },
  ['notion-record-map'],
  { tags: ['notion-record-map'], revalidate: 60 }
);

/**
 * 게시글 생성
 */
export const createPost = async ({ title, tag, content }: CreatePostParams) => {
  return notion.pages.create({
    parent: {
      database_id: getEnvOrThrow('NOTION_DATABASE_ID'),
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
      Tags: {
        multi_select: [
          {
            name: tag,
          },
        ],
      },
    },
    children: [
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              type: 'text',
              text: {
                content,
              },
            },
          ],
        },
      },
    ],
  });
};
