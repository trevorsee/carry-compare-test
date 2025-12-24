import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CarryCoverage - Compare Concealed Carry Legal Protection Plans",
  description: "Compare concealed carry legal protection plans side-by-side. Find the best plan for your needs with transparent pricing, coverage details, and expert analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <header className="border-b border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <a href="/" className="text-2xl font-bold text-gray-900">
                CarryCoverage
              </a>
              <div className="flex gap-6">
                <a href="/compare" className="text-gray-700 hover:text-gray-900">
                  Compare Plans
                </a>
                <a href="/methodology" className="text-gray-700 hover:text-gray-900">
                  Methodology
                </a>
                <a href="/guides" className="text-gray-700 hover:text-gray-900">
                  Guides
                </a>
              </div>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-gray-200 bg-gray-50 mt-12">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold mb-4">CarryCoverage</h3>
                <p className="text-sm text-gray-600">
                  Compare concealed carry legal protection plans with transparency and trust.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/compare" className="text-gray-600 hover:text-gray-900">Compare Plans</a></li>
                  <li><a href="/guides" className="text-gray-600 hover:text-gray-900">Guides</a></li>
                  <li><a href="/methodology" className="text-gray-600 hover:text-gray-900">Methodology</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/disclaimer" className="text-gray-600 hover:text-gray-900">Disclaimer</a></li>
                  <li><a href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
                  <li><a href="/terms" className="text-gray-600 hover:text-gray-900">Terms</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">About</h3>
                <p className="text-sm text-gray-600">
                  We provide transparent, data-driven comparisons to help you make informed decisions about legal protection plans.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-600 text-center">
              <p>© {new Date().getFullYear()} CarryCoverage. All rights reserved.</p>
              <p className="mt-2">
                <strong>Affiliate Disclosure:</strong> We may earn commissions from providers when you click through our links. This does not affect our editorial independence or recommendations.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
