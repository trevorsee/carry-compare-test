import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Concealed Carry Legal Protection Comparison',
  description: 'Compare concealed carry legal protection plans. Understand differences, find the right plan for your needs, and make confident decisions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
