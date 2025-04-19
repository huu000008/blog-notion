'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

export function ProfileImage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // SSR과 hydration 시 일치하도록 기본 이미지만 렌더
    return (
      <Image
        src="/images/profile-light.png"
        alt="조혁래"
        width={144}
        height={144}
        className="object-cover"
      />
    );
  }

  return (
    <Image
      src={theme === 'dark' ? '/images/profile-dark.png' : '/images/profile-light.png'}
      alt="조혁래"
      width={144}
      height={144}
      className="object-cover"
    />
  );
}
