import type { Metadata } from 'next';
import { Inter, Roboto_Flex } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Navigation } from '@/components/Navigation';
import { Suspense } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import { ToastContainer } from 'react-toastify';

const robotoFlex = Roboto_Flex({
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
      <body className={`${robotoFlex.className} min-h-screen overflow-x-hidden`}>
        <Providers>
          <Navigation />
          <Suspense fallback={<LoadingScreen />}>
            <main className='flex-grow container mx-auto px-4 py-6'>{children}</main>
            <ToastContainer position='bottom-right' autoClose={2500} newestOnTop theme='dark' />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
