import { Metadata } from 'next';
import Link from 'next/link';
import prisma from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  ArrowLeft, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Star,
  ExternalLink,
} from 'lucide-react';
import { format } from 'date-fns';
import { formatPrice, cn, getScoreColor } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Manage Plans - Admin',
  robots: { index: false, follow: false },
};

async function getPlans() {
  const plans = await prisma.plan.findMany({
    include: { 
      provider: true,
      sources: { select: { id: true } },
    },
    orderBy: [{ provider: { name: 'asc' } }, { name: 'asc' }],
  });
  return plans;
}

export default async function AdminPlansPage() {
  const plans = await getPlans();

  // Group by provider
  const groupedPlans = plans.reduce((acc, plan) => {
    const providerName = plan.provider.name;
    if (!acc[providerName]) {
      acc[providerName] = [];
    }
    acc[providerName].push(plan);
    return acc;
  }, {} as Record<string, typeof plans>);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Plans</h1>
            <p className="text-gray-600">{plans.length} plans total</p>
          </div>
        </div>
        <Button asChild>
          <Link href="/admin/plans/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Plan
          </Link>
        </Button>
      </div>

      {/* Plans grouped by provider */}
      <div className="space-y-8">
        {Object.entries(groupedPlans).map(([providerName, providerPlans]) => (
          <div key={providerName} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">{providerName}</h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  <th className="px-6 py-3">Plan</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Score</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Last Verified</th>
                  <th className="px-6 py-3">Sources</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {providerPlans.map((plan) => {
                  const isStale = new Date(plan.lastVerifiedAt) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                  
                  return (
                    <tr key={plan.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{plan.name}</span>
                          {plan.isFeatured && (
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{plan.slug}</div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {formatPrice(plan.priceMonthly, plan.priceAnnual)}
                      </td>
                      <td className="px-6 py-4">
                        {plan.overallScore && (
                          <span className={cn('font-bold', getScoreColor(plan.overallScore))}>
                            {plan.overallScore}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {plan.isActive ? (
                          <Badge variant="success" className="flex items-center gap-1 w-fit">
                            <CheckCircle className="h-3 w-3" />
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                            <XCircle className="h-3 w-3" />
                            Inactive
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className={cn(
                          'flex items-center gap-1 text-sm',
                          isStale ? 'text-yellow-600' : 'text-gray-600'
                        )}>
                          {isStale && <AlertCircle className="h-4 w-4" />}
                          {format(new Date(plan.lastVerifiedAt), 'MMM d, yyyy')}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {plan.sources.length} source{plan.sources.length !== 1 ? 's' : ''}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/plans/${plan.slug}`} target="_blank">
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/plans/${plan.id}`}>Edit</Link>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
