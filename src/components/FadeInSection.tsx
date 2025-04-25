'use client';

import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number; // ms 단위, optional
  className?: string;
}

export function FadeInSection({ children, delay = 0, className = '' }: FadeInSectionProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`${className} ${inView ? 'animate-fade-in' : 'opacity-0'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
