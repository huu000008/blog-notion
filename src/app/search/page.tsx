import { getPublishedPosts } from '@/lib/notion';
import PostList from '@/components/features/blog/PostList';
import PostListSkeleton from '@/components/features/blog/PostListSkeleton';
import { Suspense } from 'react';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const q = (await searchParams).q || '';
  const postsPromise = getPublishedPosts('ALL', 'latest', 10, '', q)();

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-2xl font-bold">
        {q ? (
          <>
            검색 결과: <span className="text-primary">&quot;{q}&quot;</span>
          </>
        ) : (
          '검색'
        )}
      </h1>
      <Suspense fallback={<PostListSkeleton />}>
        <PostList postsPromise={postsPromise} q={q} />
      </Suspense>
    </div>
  );
}
