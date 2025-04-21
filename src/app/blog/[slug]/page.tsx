import { notFound } from 'next/navigation';
import { getPostBySlug, getNotionRecordMap } from '@/lib/notion';
import { Metadata } from 'next';
import { formatDate } from '@/lib/date';
import { getToc } from '@/lib/toc';
import { Separator } from '@/components/ui/separator';
import { CalendarDays } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import NotionContent from '../../_components/NotionContent';
import { TableOfContents } from '../../_components/TableOfContents';

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { post } = await getPostBySlug(slug);
  if (!post) {
    return { title: '포스트를 찾을 수 없습니다' };
  }
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author || '조혁래' }],
    publisher: '조혁래',
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modifiedDate,
      authors: post.author || '조혁래',
      tags: post.tags,
    },
  };
}

export const revalidate = 60;

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const { post } = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Notion 페이지 데이터 fetch (recordMap)
  const pageId = post.id;
  const recordMap = await getNotionRecordMap(pageId);

  // 목차 데이터 추출
  const toc = getToc(recordMap);

  return (
    <div className="container py-6 md:py-8 lg:py-12">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[240px_1fr_240px] md:gap-8">
        <aside className="hidden md:block">{/* 추후 콘텐츠 추가 */}</aside>
        <section>
          {/* 블로그 헤더 */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex gap-2">
                {post.tags?.map((tag) => <Badge key={tag}>{tag}</Badge>)}
              </div>
              <h1 className="text-3xl font-bold md:text-4xl">{post.title}</h1>
            </div>
            {/* 메타 정보 */}
            <div className="text-muted-foreground flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>{formatDate(post.date)}</span>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* 모바일 전용 목차 */}
          <div className="sticky top-[var(--sticky-top)] mb-6 md:hidden">
            <details className="bg-muted/60 rounded-lg p-4 backdrop-blur-sm">
              <summary className="cursor-pointer text-lg font-semibold">목차</summary>
              <TableOfContents toc={toc} className="mt-3 space-y-3 text-sm" />
            </details>
          </div>

          {/* 본문 */}
          <NotionContent recordMap={recordMap} />
        </section>
        <aside className="relative hidden md:block">
          <div className="sticky top-[var(--sticky-top)]">
            <div className="bg-muted/60 space-y-4 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold">목차</h3>
              <TableOfContents toc={toc} className="space-y-3 text-sm" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
