import { prisma } from '@/lib/db';
import ComparisonTable from '@/components/ComparisonTable';

export const dynamic = 'force-dynamic';

export default async function ComparePage() {
  const plans = await prisma.plan.findMany({
    where: {
      isActive: true,
      provider: {
        isActive: true,
      },
    },
    include: {
      provider: {
        select: {
          id: true,
          name: true,
          slug: true,
          logoUrl: true,
        },
      },
      _count: {
        select: {
          sources: true,
        },
      },
    },
    orderBy: {
      overallScore: 'desc',
    },
    take: 50,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Compare Concealed Carry Legal Protection Plans</h1>
        <p className="text-lg text-gray-600">
          Compare plans side-by-side to find the best legal protection for your needs. 
          Use filters to narrow down your options, then select up to 4 plans to compare in detail.
        </p>
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            <strong>Affiliate Disclosure:</strong> We may earn commissions from providers when you click through our links. 
            This does not affect our editorial independence or recommendations.{' '}
            <a href="/methodology" className="underline">Learn more about our methodology</a>.
          </p>
        </div>
      </div>

      <ComparisonTable initialPlans={plans} />
    </div>
  );
}
