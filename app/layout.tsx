import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'KidsPlayGuide - Safe & Fun Online Games for Kids',
    template: '%s | KidsPlayGuide',
  },
  description:
    'Every game on KidsPlayGuide is parent-approved and ad-free. Safe online games for children ages 0-10.',
  keywords: [
    'kids games',
    'children games',
    'safe games for kids',
    'educational games',
    'ad-free games',
    'preschool games',
    'toddler games',
  ],
  authors: [{ name: 'KidsPlayGuide' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'KidsPlayGuide',
    title: 'KidsPlayGuide - Safe & Fun Online Games for Kids',
    description:
      'Every game on KidsPlayGuide is parent-approved and ad-free. Safe online games for children ages 0-10.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KidsPlayGuide - Safe & Fun Online Games for Kids',
    description:
      'Every game on KidsPlayGuide is parent-approved and ad-free. Safe online games for children ages 0-10.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
