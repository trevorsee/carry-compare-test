import Link from 'next/link';
import { Shield } from 'lucide-react';

const footerLinks = {
  compare: [
    { name: 'All Plans', href: '/compare' },
    { name: 'Best Budget', href: '/compare?preset=budget' },
    { name: 'Best for Families', href: '/compare?preset=families' },
    { name: 'Top Rated', href: '/compare?preset=top-rated' },
  ],
  learn: [
    { name: 'How CCW Insurance Works', href: '/guides/how-concealed-carry-legal-protection-works' },
    { name: 'Up-Front vs Reimbursement', href: '/guides/upfront-vs-reimbursement-coverage' },
    { name: 'Attorney Choice Explained', href: '/guides/attorney-choice-explained' },
    { name: 'Common Exclusions', href: '/guides/common-exclusions-gotchas' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Methodology', href: '/methodology' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Affiliate Disclosure', href: '/disclosure' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">CarryCoverage</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Helping you find the right legal protection for concealed carry.
            </p>
          </div>

          {/* Compare */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Compare
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.compare.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Learn
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.learn.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} CarryCoverage. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 text-center md:text-right max-w-xl">
              <strong>Disclaimer:</strong> This site provides general information only and does not constitute legal advice. 
              We may receive compensation from providers through affiliate links. 
              Always read the full terms from providers before purchasing.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
