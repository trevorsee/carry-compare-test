import { Metadata } from 'next';
import Link from 'next/link';
import prisma from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Users, 
  BookOpen, 
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  robots: { index: false, follow: false },
};

async function getStats() {
  const [
    providerCount,
    planCount,
    activeCount,
    guideCount,
    recentPlans,
    staleCount,
  ] = await Promise.all([
    prisma.provider.count(),
    prisma.plan.count(),
    prisma.plan.count({ where: { isActive: true } }),
    prisma.guide.count({ where: { isPublished: true } }),
    prisma.plan.findMany({
      include: { provider: true },
      orderBy: { updatedAt: 'desc' },
      take: 5,
    }),
    prisma.plan.count({
      where: {
        lastVerifiedAt: {
          lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        },
      },
    }),
  ]);

  return { providerCount, planCount, activeCount, guideCount, recentPlans, staleCount };
}

export default async function AdminPage() {
  const { providerCount, planCount, activeCount, guideCount, recentPlans, staleCount } = await getStats();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage plans, providers, and content</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/">View Site</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{providerCount}</div>
                <div className="text-sm text-gray-600">Providers</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{activeCount}/{planCount}</div>
                <div className="text-sm text-gray-600">Active Plans</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{guideCount}</div>
                <div className="text-sm text-gray-600">Guides</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={staleCount > 0 ? 'border-yellow-300' : ''}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${staleCount > 0 ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                <AlertCircle className={`h-6 w-6 ${staleCount > 0 ? 'text-yellow-600' : 'text-gray-600'}`} />
              </div>
              <div>
                <div className="text-2xl font-bold">{staleCount}</div>
                <div className="text-sm text-gray-600">Need Review</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Providers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Manage provider companies and their information.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/providers">View All</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/admin/providers/new">Add New</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Plans
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Manage plan details, pricing, and coverage information.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/plans">View All</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/admin/plans/new">Add New</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Guides
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Manage educational content and articles.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/guides">View All</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/admin/guides/new">Add New</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Updated Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-gray-200">
            {recentPlans.map((plan) => (
              <div key={plan.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{plan.name}</div>
                  <div className="text-sm text-gray-500">{plan.provider.name}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-500">
                    {format(new Date(plan.updatedAt), 'MMM d, yyyy')}
                  </div>
                  <div className="flex items-center gap-1">
                    {plan.isActive ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    )}
                    <span className="text-xs text-gray-500">
                      {plan.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/plans/${plan.id}`}>Edit</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
