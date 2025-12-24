import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t py-8 mt-auto">
      <div className="container mx-auto px-4 text-sm text-slate-600">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-2 text-slate-900">CarryCoverage</h3>
            <p className="text-xs">Helping you find the best concealed carry legal protection.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-slate-900">Company</h3>
            <div className="flex flex-col gap-1">
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-slate-900">Legal</h3>
            <div className="flex flex-col gap-1">
              <Link href="/disclosure" className="hover:underline">Affiliate Disclosure</Link>
              <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
              <Link href="/terms" className="hover:underline">Terms of Service</Link>
            </div>
          </div>
        </div>
        <div className="border-t pt-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CarryCoverage. All rights reserved.</p>
          <p className="mt-2">Disclaimer: We are not a law firm and do not provide legal advice. Information is for educational purposes only.</p>
        </div>
      </div>
    </footer>
  );
}
