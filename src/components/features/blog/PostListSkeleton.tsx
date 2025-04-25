import { Skeleton } from '@/components/ui/skeleton';
export default function PostListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
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
  );
}
