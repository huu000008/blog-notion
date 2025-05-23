'use client';

import Link from 'next/link';
import { PostCard } from '@/components/features/blog/PostCard';
import { Loader2 } from 'lucide-react';
import { GetPublishedPostsResponse } from '@/types/notion';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, use } from 'react';
import { useInView } from 'react-intersection-observer';
import { FadeInSection } from '@/components/FadeInSection';
interface PostListProps {
  postsPromise: Promise<GetPublishedPostsResponse>;
  q?: string;
}

export default function PostList({ postsPromise, q }: PostListProps) {
  const initialData = use(postsPromise);
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');
  const sort = searchParams.get('sort');
  const qParam = typeof q === 'string' ? q : searchParams.get('q');
  const pageSize = 2;

  const fetchPosts = async ({ pageParam }: { pageParam: string | undefined }) => {
    const params = new URLSearchParams();
    if (tag) params.set('tag', tag);
    if (sort) params.set('sort', sort);
    if (qParam) params.set('q', qParam);
    if (pageParam) params.set('startCursor', pageParam);
    params.set('pageSize', pageSize.toString());

    const response = await fetch(`/api/posts?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['posts', tag, sort, qParam, pageSize],
    queryFn: fetchPosts,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialData: {
      pages: [initialData],
      pageParams: [undefined],
    },
  });

  const { ref, inView } = useInView({
    threshold: 1,
  });
  // const handleLoadMore = () => {
  //   if (hasNextPage && !isFetchingNextPage) {
  //     fetchNextPage();
  //   }
  // };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allPosts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <div className="space-y-6">
      {allPosts.length === 0 ? (
        <div className="flex h-[300px] flex-col items-center justify-center py-24">
          {qParam ? (
            <span className="text-muted-foreground text-lg">
              <span className="text-primary font-semibold">&quot;{qParam}&quot;</span> 검색 결과가
              없습니다.
            </span>
          ) : (
            <span className="text-muted-foreground text-lg">검색 결과가 없습니다.</span>
          )}
          <span className="text-muted-foreground/70 mt-2 text-sm">
            다른 <b className="text-primary">태그</b>를 선택하거나{' '}
            <b className="text-primary">검색어</b>를 변경해보세요.
          </span>
        </div>
      ) : (
        <div className="grid gap-4">
          {allPosts.map((post, index) => (
            <Link href={`/blog/${post.slug}`} key={post.id}>
              <FadeInSection>
                <PostCard post={post} isFirst={index === 0} />
              </FadeInSection>
            </Link>
          ))}
        </div>
      )}
      {hasNextPage && !isFetchingNextPage && <div ref={ref} className="h-10" />}
      {isFetchingNextPage && (
        <div className="flex items-center justify-center gap-2 py-4">
          <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
          <span className="text-muted-foreground text-sm">로딩중...</span>
        </div>
      )}
      {/* {hasNextPage && (
        <div>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={handleLoadMore}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? '로딩중...' : '더보기'}
          </Button>
        </div>
      )} */}
    </div>
  );
}
