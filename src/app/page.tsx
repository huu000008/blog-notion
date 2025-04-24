import { getTags, getPublishedPosts } from '@/lib/notion';
import PostList from '@/components/features/blog/PostList';
import { Suspense } from 'react';
import PostListSkeleton from '@/components/features/blog/PostListSkeleton';
import TagSectionSkeleton from '@/app/_components/TagSectionSkeleton';
import { Metadata } from 'next';
import TagSection from './_components/TagSection';

interface HomeProps {
  searchParams: Promise<{ tag?: string; sort?: string }>;
}

export const metadata: Metadata = {
  title: '홈',
  description: '프론트엔드 개발자 조혁래의 블로그입니다. 개발 지식과 경험을 공유합니다.',
  alternates: {
    canonical: '/',
  },
};

export default async function Home({ searchParams }: HomeProps) {
  const { tag, sort } = await searchParams;
  const selectedTag = tag || '전체';
  const selectedSort = sort || 'latest';

  const tags = await getTags();
  // getPublishedPosts는 팩토리 함수이므로 반드시 ()로 실행해야 하며, Promise를 넘겨야 함
  const postsPromise = getPublishedPosts(selectedTag, selectedSort, 10)();
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[200px_1fr_220px]">
        {/* 좌측 사이드바 */}
        <aside className="order-2 md:order-none">
          <Suspense fallback={<TagSectionSkeleton />}>
            <TagSection tags={tags} selectedTag={selectedTag} />
          </Suspense>
        </aside>
        <div className="order-3 space-y-8 md:order-none">
          {/* 블로그 카드 그리드 */}
          <Suspense fallback={<PostListSkeleton />}>
            <PostList postsPromise={postsPromise} />
          </Suspense>
        </div>
        {/* 우측 사이드바 */}
        <aside className="order-1 flex flex-col gap-6 md:order-none">
          {/* <ProfileSection /> */}
          {/* <ContactSection /> */}
        </aside>
      </div>
    </div>
  );
}
