import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { TagFilterItem } from '@/types/blog';
import { cn } from '@/lib/utils';
import { NOTION_TAG_ALL } from '@/lib/constants/notion.constants';

interface TagSectionProps {
  tags: TagFilterItem[];
  selectedTag: string;
  searchQuery?: string;
}

export default function TagSection({ tags, selectedTag, searchQuery }: TagSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>TAGS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {tags.map((tag) => (
            <Link href={`?tag=${tag.name}`} key={tag.name}>
              <div
                className={cn(
                  'hover:bg-muted-foreground/10 text-muted-foreground flex items-center justify-between rounded-md p-1.5 text-sm transition-colors',
                  !searchQuery &&
                    selectedTag === tag.name &&
                    'bg-muted-foreground/10 text-foreground font-medium'
                )}
              >
                <span>{tag.name === NOTION_TAG_ALL ? '전체' : tag.name}</span>
                <span>{tag.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
