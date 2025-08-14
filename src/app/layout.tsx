import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { Providers } from './providers';
import './globals.css';
import Header from '@/components/header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Next Discuss',
  description: 'A lovely reddit clone'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <SessionProvider>
          <Providers>
            <Header />
            {children}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
