'use client';

import dynamic from 'next/dynamic';
import { NotionRenderer } from 'react-notion-x';
import { ExtendedRecordMap } from 'notion-types';
import { useTheme } from 'next-themes';
import 'react-notion-x/src/styles.css';
import { useState, useEffect } from 'react'; // Import useState and useEffect

const Code = dynamic(() => import('react-notion-x/build/third-party/code').then((m) => m.Code), {
  ssr: false,
});
const Collection = dynamic(
  () => import('react-notion-x/build/third-party/collection').then((m) => m.Collection),
  {
    ssr: false,
  }
);

export default function NotionContent({ recordMap }: { recordMap: ExtendedRecordMap }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false); // Add mounted state

  // Set mounted to true after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

  // Return null or a placeholder during SSR/initial client render
  if (!mounted) {
    return null; // Or a placeholder div if needed
  }

  return (
    // Apply theme class only when mounted
    <div className={`prose prose-neutral my-8 max-w-none ${isDark ? 'dark:prose-invert' : ''}`}>
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={isDark}
        components={{
          Code,
          Collection,
        }}
      />
    </div>
  );
}
