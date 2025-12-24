import { prisma } from '@/lib/prisma';
import { ComparisonTable } from './ComparisonTable';

export const dynamic = 'force-dynamic'; // For MVP to ensure fresh data if we update it

export default async function ComparePage() {
  const plans = await prisma.plan.findMany({
    include: {
      provider: true,
    },
    orderBy: [
      { is_featured: 'desc' },
      { overall_score: 'desc' },
    ],
  });

  return (
    <div className="space-y-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Compare Concealed Carry Legal Protection</h1>
        <p className="text-slate-600">
          Find the best legal defense plan for your needs. Compare pricing, coverage, and attorney choice.
        </p>
      </div>
      
      <ComparisonTable initialPlans={plans} />
    </div>
  );
}
