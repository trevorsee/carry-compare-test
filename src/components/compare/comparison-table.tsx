'use client';

import { useMemo } from 'react';
import { Filters } from './filters';
import { PlanCard } from './plan-card';
import { CompareTray } from './compare-tray';
import { useFilterStore } from '@/lib/store';
import { Info, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import type { PlanWithProvider } from '@/lib/types';

interface ComparisonTableProps {
  plans: PlanWithProvider[];
}

export function ComparisonTable({ plans }: ComparisonTableProps) {
  const { filters } = useFilterStore();

  // Filter and sort plans
  const filteredPlans = useMemo(() => {
    let result = [...plans].filter((plan) => plan.isActive && plan.provider.isActive);

    // Apply payment style filter
    if (filters.paymentStyle.length > 0) {
      result = result.filter((plan) => filters.paymentStyle.includes(plan.paymentStyle));
    }

    // Apply attorney choice filter
    if (filters.attorneyChoice.length > 0) {
      result = result.filter((plan) => filters.attorneyChoice.includes(plan.attorneyChoice));
    }

    // Apply family coverage filter
    if (filters.familyCoverage.length > 0) {
      result = result.filter((plan) => filters.familyCoverage.includes(plan.familyCoverage));
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'overallScore':
          comparison = (b.overallScore ?? 0) - (a.overallScore ?? 0);
          break;
        case 'priceMonthly':
          const priceA = a.priceMonthly ?? (a.priceAnnual ? a.priceAnnual / 12 : 999);
          const priceB = b.priceMonthly ?? (b.priceAnnual ? b.priceAnnual / 12 : 999);
          comparison = priceA - priceB;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        default:
          comparison = (b.overallScore ?? 0) - (a.overallScore ?? 0);
      }

      // Flip for ascending
      if (filters.sortOrder === 'asc' && filters.sortBy === 'priceMonthly') {
        return comparison;
      }
      if (filters.sortOrder === 'desc' && filters.sortBy === 'priceMonthly') {
        return -comparison;
      }

      // Featured plans first (unless sorting by price)
      if (filters.sortBy !== 'priceMonthly') {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
      }

      return comparison;
    });

    return result;
  }, [plans, filters]);

  return (
    <div className="space-y-6">
      {/* Disclosure */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800">
        <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div>
          <p>
            <strong>Affiliate Disclosure:</strong> We may receive compensation when you click provider links. 
            This does not affect our rankings, which are based on objective criteria. 
            See our{' '}
            <Link href="/methodology" className="underline hover:no-underline">
              methodology
            </Link>{' '}
            and{' '}
            <Link href="/disclosure" className="underline hover:no-underline">
              full disclosure
            </Link>.
          </p>
        </div>
      </div>

      {/* Filters */}
      <Filters resultsCount={filteredPlans.length} />

      {/* No results */}
      {filteredPlans.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No plans match your filters</h3>
          <p className="text-gray-600 mb-4">Try adjusting your filters or clearing them to see all plans.</p>
        </div>
      )}

      {/* Desktop table view */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200 text-left text-sm font-medium text-gray-600">
              <th className="py-3 px-4">Plan</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Payment</th>
              <th className="py-3 px-4">Attorney</th>
              <th className="py-3 px-4">Coverage</th>
              <th className="py-3 px-4">Family</th>
              <th className="py-3 px-4">Wait</th>
              <th className="py-3 px-4">Score</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {filteredPlans.map((plan, index) => (
              <PlanCard key={plan.id} plan={plan} index={index} view="table" />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="lg:hidden grid gap-4">
        {filteredPlans.map((plan, index) => (
          <PlanCard key={plan.id} plan={plan} index={index} view="card" />
        ))}
      </div>

      {/* Compare tray */}
      <CompareTray />

      {/* Bottom padding for compare tray */}
      <div className="h-24 lg:h-20" />
    </div>
  );
}
