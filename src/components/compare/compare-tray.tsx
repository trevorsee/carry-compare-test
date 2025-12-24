'use client';

import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCompareStore } from '@/lib/store';
import { trackCompareRemove, trackCompareView } from '@/lib/analytics';
import { cn } from '@/lib/utils';

export function CompareTray() {
  const { selectedPlans, removePlan, clearPlans } = useCompareStore();

  if (selectedPlans.length === 0) return null;

  const handleRemove = (planId: string) => {
    removePlan(planId);
    trackCompareRemove(planId);
  };

  const handleCompareClick = () => {
    trackCompareView(selectedPlans.map((p) => p.id));
  };

  const compareUrl = `/compare/side-by-side?plans=${selectedPlans.map((p) => p.slug).join(',')}`;

  return (
    <div className={cn(
      'fixed bottom-0 left-0 right-0 z-40',
      'bg-white border-t border-gray-200 shadow-lg',
      'animate-in slide-in-from-bottom duration-300'
    )}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Selected plans */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-gray-700">
              Compare ({selectedPlans.length}/4):
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-1.5 rounded-full text-sm"
                >
                  <span className="max-w-[150px] truncate">{plan.name}</span>
                  <button
                    onClick={() => handleRemove(plan.id)}
                    className="hover:bg-blue-100 rounded-full p-0.5 transition-colors"
                    aria-label={`Remove ${plan.name} from comparison`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={clearPlans}>
              Clear All
            </Button>
            <Button
              size="sm"
              disabled={selectedPlans.length < 2}
              onClick={handleCompareClick}
              asChild
            >
              <Link href={compareUrl}>
                Compare Now
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>

        {selectedPlans.length < 2 && (
          <p className="text-xs text-gray-500 mt-2 text-center sm:text-left">
            Select at least 2 plans to compare side-by-side
          </p>
        )}
      </div>
    </div>
  );
}
