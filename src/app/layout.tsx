import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: {
    default: 'CarryCoverage - Compare CCW Legal Protection Plans',
    template: '%s | CarryCoverage',
  },
  description: 'Compare concealed carry legal protection plans. Find the best CCW insurance for your needs with unbiased reviews, transparent pricing, and expert analysis.',
  keywords: ['CCW insurance', 'concealed carry insurance', 'self-defense insurance', 'legal protection', 'USCCA', 'CCW Safe'],
  authors: [{ name: 'CarryCoverage' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://carrycoverage.com',
    siteName: 'CarryCoverage',
    title: 'CarryCoverage - Compare CCW Legal Protection Plans',
    description: 'Compare concealed carry legal protection plans. Find the best CCW insurance for your needs.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CarryCoverage - Compare CCW Legal Protection Plans',
    description: 'Compare concealed carry legal protection plans. Find the best CCW insurance for your needs.',
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
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
