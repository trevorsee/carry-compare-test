import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CarryCoverage — Compare CCW legal protection plans",
    template: "%s — CarryCoverage",
  },
  description:
    "Filter and compare concealed carry self-defense legal protection plans by price, payment style, attorney choice, waiting period, and family coverage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <header className="border-b border-slate-200">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/compare" className="font-semibold">
              CarryCoverage
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/compare" className="hover:underline">
                Compare
              </Link>
              <Link href="/guides/how-to-choose" className="hover:underline">
                Guides
              </Link>
              <Link href="/methodology" className="hover:underline">
                Methodology
              </Link>
              <Link href="/disclosures" className="hover:underline">
                Disclosures
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>

        <footer className="mt-12 border-t border-slate-200">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-slate-600">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <Link href="/methodology" className="hover:underline">
                How we rank
              </Link>
              <Link href="/disclosures" className="hover:underline">
                Affiliate disclosure & disclaimer
              </Link>
              <Link href="/compare" className="hover:underline">
                Compare plans
              </Link>
            </div>
            <p>
              Not legal advice. Always verify terms with the provider and read
              the policy/member agreement.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

