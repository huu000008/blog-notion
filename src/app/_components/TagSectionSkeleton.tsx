import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function TagSectionSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-20 rounded" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full rounded-md" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
