import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
export default function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="container flex h-[var(--header-height)] items-center px-4">
        <div className="grid w-full grid-cols-2 items-center">
          <div className="flex items-center justify-start">
            <Link href="/" className="text-xl font-semibold">
              <span className="font-bold">블로그</span>
            </Link>
          </div>

          <div className="flex items-center justify-end gap-2">
            <ThemeToggle />
            {/* <Button asChild size="sm" className="gap-2">
              <Link href="/blog/write">글쓰기</Link>
            </Button> */}
          </div>
        </div>
      </div>
    </header>
  );
}
