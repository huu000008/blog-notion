import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container py-6 md:py-8 lg:py-12">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_240px] md:gap-8">
        <section>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-14 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
            <Skeleton className="h-10 w-3/4" />
            <div className="text-muted-foreground flex gap-4 text-sm">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <div className="my-8">
            <Skeleton className="h-[2px] w-full" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className={`h-4 ${i % 3 === 0 ? 'w-4/5' : 'w-full'}`} />
            ))}
          </div>
        </section>
        <aside className="hidden md:block">
          <div className="sticky top-[var(--sticky-top)] space-y-4">
            <Skeleton className="mb-2 h-6 w-24" />
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="mb-2 h-4 w-32" />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
