"use client";

type TocItem = {
  id: string;
  text: string;
  indentLevel: number;
};

interface Props {
  toc: TocItem[];
  className?: string;
}

export function TableOfContents({ toc, className }: Props) {
  function scrollToHeadingWithOffset(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    const header = document.querySelector('header');
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const y = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
    window.scrollTo({ top: y, behavior: 'smooth' });
    window.history.replaceState(null, '', `#${id}`);
  }

  return (
    <nav className={className}>
      {toc.length > 0 ? (
        toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id?.replace(/-/g, '')}`}
            style={{ marginLeft: item.indentLevel * 16 }}
            className="block hover:underline"
            onClick={e => {
              e.preventDefault();
              scrollToHeadingWithOffset(item.id?.replace(/-/g, '') ?? '');
            }}
          >
            {item.text}
          </a>
        ))
      ) : (
        <span className="text-muted-foreground text-xs">목차가 없습니다.</span>
      )}
    </nav>
  );
}
