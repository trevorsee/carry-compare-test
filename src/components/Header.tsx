import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-blue-900">
          CarryCoverage
        </Link>
        <nav className="flex gap-6 text-sm font-medium text-slate-600">
          <Link href="/compare" className="hover:text-blue-900">Compare Plans</Link>
          <Link href="/methodology" className="hover:text-blue-900">Methodology</Link>
        </nav>
      </div>
    </header>
  );
}
