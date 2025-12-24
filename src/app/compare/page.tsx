import { Metadata } from 'next';
import prisma from '@/lib/db';
import { ComparisonTable } from '@/components/compare/comparison-table';
import type { PlanWithProvider } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Compare CCW Legal Protection Plans',
  description: 'Compare concealed carry legal protection plans side-by-side. Filter by price, coverage type, attorney choice, and more.',
};

async function getPlans(): Promise<PlanWithProvider[]> {
  const plans = await prisma.plan.findMany({
    where: {
      isActive: true,
      provider: {
        isActive: true,
      },
    },
    include: {
      provider: true,
      sources: true,
    },
    orderBy: [
      { isFeatured: 'desc' },
      { overallScore: 'desc' },
    ],
  });
  return plans;
}

export default async function ComparePage() {
  const plans = await getPlans();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Compare CCW Legal Protection Plans
        </h1>
        <p className="text-lg text-gray-600">
          Find the right concealed carry legal protection for your needs. Compare pricing, coverage, 
          attorney choice, and more across {plans.length} plans.
        </p>
      </div>

      {/* Comparison Table */}
      <ComparisonTable plans={plans} />
    </div>
  );
}
