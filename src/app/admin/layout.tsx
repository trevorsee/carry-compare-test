import Link from 'next/link';
import { Shield, Home, FileText, Users, BookOpen } from 'lucide-react';

const adminNav = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Plans', href: '/admin/plans', icon: FileText },
  { name: 'Providers', href: '/admin/providers', icon: Users },
  { name: 'Guides', href: '/admin/guides', icon: BookOpen },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-blue-400" />
                <span className="font-semibold">CarryCoverage Admin</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                {adminNav.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <Link 
              href="/"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              View Site →
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
