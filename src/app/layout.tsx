import type { Metadata } from 'next';
import { Inter, Enriqueta } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Navigation } from '@/components/Navigation';
import { Suspense } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

const inter = Inter({ subsets: ['latin'] });
const enriqueta = Enriqueta({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Store Demo',
  description: 'A modern e-commerce demo using Next.js, Tailwind CSS, Redux, and TypeScript.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='h-full'>
      <body className={`${inter.className} min-h-screen`}>
        <Providers>
          <Navigation />
          <Suspense fallback={<LoadingScreen />}>
            <main className={`${enriqueta.className} flex-grow container mx-auto px-4 py-6`}>{children}</main>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
