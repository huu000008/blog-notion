import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-[1fr_220px] gap-6">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-32" aria-hidden role="presentation" />
            <Skeleton className="h-10 w-32" aria-hidden role="presentation" />
          </div>
          <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-full rounded-xl" aria-hidden role="presentation" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" aria-hidden role="presentation" />
                  <Skeleton className="h-6 w-full" aria-hidden role="presentation" />
                  <Skeleton className="h-4 w-full" aria-hidden role="presentation" />
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-32" aria-hidden role="presentation" />
                    <Skeleton className="h-4 w-16" aria-hidden role="presentation" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className="space-y-4">
          <Skeleton className="h-10 w-full" aria-hidden role="presentation" />
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" aria-hidden role="presentation" />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
