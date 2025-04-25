'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useState } from 'react';
import { CommandDialog, CommandInput } from '@/components/ui/command';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const router = useRouter();

  const handleSearch = (q: string) => {
    setOpen(false);
    if (q.trim()) {
      router.push(`/search?q=${encodeURIComponent(q.trim())}`);
    }
  };

  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="container flex h-[var(--header-height)] items-center px-4">
        <div className="grid w-full grid-cols-2 items-center">
          <div className="flex items-center justify-start">
            <Link href="/" className="text-xl font-semibold">
              <span className="font-bold">BLOG</span>
            </Link>
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-md"
              type="button"
              aria-label="검색"
              onClick={() => setOpen(true)}
            >
              <SearchIcon className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            {/* <Button asChild size="sm" className="gap-2">
              <Link href="/blog/write">글쓰기</Link>
            </Button> */}
          </div>
        </div>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="검색어를 입력하세요"
          value={value}
          onValueChange={setValue}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(value);
            }
          }}
        />
      </CommandDialog>
    </header>
  );
}
