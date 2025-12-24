"use client";

import { ProviderPlan } from "@/types";

interface ComparisonSelectorProps {
  selectedPlans: ProviderPlan[];
  onClearAll: () => void;
  onCompare: () => void;
}

export function ComparisonSelector({
  selectedPlans,
  onClearAll,
  onCompare,
}: ComparisonSelectorProps) {
  if (selectedPlans.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">
                {selectedPlans.length}
              </span>{" "}
              plan{selectedPlans.length !== 1 ? "s" : ""} selected
            </span>
            <div className="hidden sm:flex items-center gap-2">
              {selectedPlans.map((plan) => (
                <span
                  key={plan.id}
                  className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full"
                >
                  {plan.shortName}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClearAll}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium"
            >
              Clear
            </button>
            <button
              onClick={onCompare}
              disabled={selectedPlans.length < 2}
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                selectedPlans.length >= 2
                  ? "bg-primary-600 text-white hover:bg-primary-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Compare {selectedPlans.length >= 2 ? `(${selectedPlans.length})` : ""}
            </button>
          </div>
        </div>
        {selectedPlans.length === 1 && (
          <p className="mt-2 text-xs text-gray-500 sm:hidden">
            Select at least one more plan to compare
          </p>
        )}
      </div>
    </div>
  );
}
