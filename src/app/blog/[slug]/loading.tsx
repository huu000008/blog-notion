import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const TocSkeleton = React.memo(() => (
  <>
    <Skeleton className="mb-2 h-6 w-24" aria-hidden role="presentation" />
    {Array.from({ length: 7 }).map((_, i) => (
      <Skeleton key={i} className="mb-2 h-4 w-32" aria-hidden role="presentation" />
    ))}
  </>
));
TocSkeleton.displayName = 'TocSkeleton';

export default function Loading() {
  return (
    <div className="container py-6 md:py-8 lg:py-12">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_240px] md:gap-8">
        <section>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-14 rounded-full" aria-hidden role="presentation" />
              <Skeleton className="h-6 w-14 rounded-full" aria-hidden role="presentation" />
            </div>
            <Skeleton className="h-10 w-3/4" aria-hidden role="presentation" />
            <div className="text-muted-foreground flex gap-4 text-sm">
              <Skeleton className="h-4 w-20" aria-hidden role="presentation" />
              <Skeleton className="h-4 w-16" aria-hidden role="presentation" />
            </div>
          </div>
          <div className="my-8">
            <Skeleton className="h-[2px] w-full" aria-hidden role="presentation" />
          </div>
          {/* 모바일 목차 */}
          <div className="mb-6 md:hidden">
            <TocSkeleton />
          </div>
          {/* 본문 컨텐츠 */}
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton
                key={i}
                className={`h-4 ${i % 3 === 0 ? 'w-4/5' : 'w-full'}`}
                aria-hidden
                role="presentation"
              />
            ))}
          </div>
        </section>
        <aside className="hidden md:block">
          <div className="sticky top-[var(--sticky-top)] space-y-4">
            <TocSkeleton />
          </div>
        </aside>
      </div>
    </div>
  );
}
