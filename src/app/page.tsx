import { getTags, getPublishedPosts } from '@/lib/notion';
import { NOTION_TAG_ALL } from '@/lib/constants/notion.constants';
import PostList from '@/components/features/blog/PostList';
import { Suspense } from 'react';
import PostListSkeleton from '@/components/features/blog/PostListSkeleton';
import TagSectionSkeleton from '@/app/_components/TagSectionSkeleton';
import { Metadata } from 'next';
import TagSection from './_components/TagSection';

interface HomeProps {
  searchParams: Promise<{ tag?: string; sort?: string; q?: string }>;
}

export const metadata: Metadata = {
  title: '홈',
  description: '프론트엔드 개발자 조혁래의 블로그입니다. 개발 지식과 경험을 공유합니다.',
  alternates: {
    canonical: '/',
  },
};

export default async function Home({ searchParams }: HomeProps) {
  const { tag, sort, q } = await searchParams;
  const selectedTag = tag || NOTION_TAG_ALL;
  const selectedSort = sort || 'latest';
  const searchQuery = q || '';

  const tags = await getTags();
  // getPublishedPosts는 팩토리 함수이므로 반드시 ()로 실행해야 하며, Promise를 넘겨야 함
  const postsPromise = getPublishedPosts(selectedTag, selectedSort, 10, '', searchQuery)();
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_220px]">
        <div className="order-3 space-y-8 md:order-none">
          <Suspense fallback={<PostListSkeleton />}>
            <PostList postsPromise={postsPromise} />
          </Suspense>
        </div>
        <aside className="order-2 md:order-none">
          <Suspense fallback={<TagSectionSkeleton />}>
            <TagSection tags={tags} selectedTag={selectedTag} searchQuery={searchQuery} />
          </Suspense>
        </aside>
      </div>
    </div>
  );
}
