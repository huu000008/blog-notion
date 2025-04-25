import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import Header from '@/components/layouts/Header';
import Providers from './providers';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-noto-sans-kr',
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | 조혁래 블로그',
    default: '조혁래 블로그',
  },
  description: '프론트엔드 개발과 관련된 다양한 지식과 경험을 공유하는 블로그입니다.',
  keywords: ['프론트엔드', '웹개발', '코딩', 'React', 'Next.js', '블로그'],
  authors: [{ name: '조혁래', url: 'https://github.com/huu000008' }],
  creator: '조혁래',
  publisher: '조혁래',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  alternates: {
    canonical: '/',
  },
  other: {
    google: 'notranslate',
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${notoSansKr.variable} antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            {modal}
          </div>
        </Providers>
      </body>
    </html>
  );
}
