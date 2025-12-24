"use client";

import { useState, useMemo, useCallback } from "react";
import { plans } from "@/data/plans";
import { FilterState, ProviderPlan } from "@/types";
import { filterPlans, defaultFilters } from "@/lib/filters";
import { analytics } from "@/lib/analytics";
import { FilterBar } from "@/components/FilterBar";
import { PlanCard } from "@/components/PlanCard";
import { ComparisonTable } from "@/components/ComparisonTable";
import { PlanDetailModal } from "@/components/PlanDetailModal";
import { ComparisonSelector } from "@/components/ComparisonSelector";
import { QuickLearnBanner } from "@/components/EducationCard";

type ViewMode = "browse" | "compare";

export default function Home() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [selectedPlanIds, setSelectedPlanIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("browse");
  const [detailPlan, setDetailPlan] = useState<ProviderPlan | null>(null);
  const [showLearnBanner, setShowLearnBanner] = useState(true);

  // Filter plans based on current filters
  const filteredPlans = useMemo(() => {
    return filterPlans(plans, filters);
  }, [filters]);

  // Get selected plan objects
  const selectedPlans = useMemo(() => {
    return plans.filter((p) => selectedPlanIds.includes(p.id));
  }, [selectedPlanIds]);

  const handlePlanSelect = useCallback((planId: string) => {
    setSelectedPlanIds((prev) => {
      if (prev.includes(planId)) {
        return prev.filter((id) => id !== planId);
      }
      if (prev.length >= 4) {
        // Max 4 plans for comparison
        return prev;
      }
      return [...prev, planId];
    });
  }, []);

  const handleCompare = useCallback(() => {
    if (selectedPlanIds.length >= 2) {
      analytics.comparisonStarted(selectedPlanIds);
      setViewMode("compare");
    }
  }, [selectedPlanIds]);

  const handleRemoveFromComparison = useCallback((planId: string) => {
    setSelectedPlanIds((prev) => prev.filter((id) => id !== planId));
    // If less than 2 plans, go back to browse
    if (selectedPlanIds.length <= 2) {
      setViewMode("browse");
    }
  }, [selectedPlanIds.length]);

  const handleViewDetails = useCallback((plan: ProviderPlan) => {
    setDetailPlan(plan);
  }, []);

  const handleLearnMore = useCallback(() => {
    window.location.href = "/learn";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Compare Concealed Carry Legal Protection Plans
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Understand the real differences between providers. Filter by your
              needs, compare side-by-side, and make a confident decision.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {plans.length}
              </div>
              <div className="text-sm text-gray-500">Providers Compared</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {plans.reduce((acc, p) => acc + p.tiers.length, 0)}
              </div>
              <div className="text-sm text-gray-500">Plan Options</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">50+</div>
              <div className="text-sm text-gray-500">Attributes Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">Dec 2024</div>
              <div className="text-sm text-gray-500">Last Updated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Learn Banner */}
      {showLearnBanner && viewMode === "browse" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="relative">
            <button
              onClick={() => setShowLearnBanner(false)}
              className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md text-gray-400 hover:text-gray-600 z-10"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <QuickLearnBanner onLearnMore={handleLearnMore} />
          </div>
        </section>
      )}

      {/* View Toggle */}
      {selectedPlanIds.length >= 2 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center gap-2 bg-gray-100 rounded-lg p-1 max-w-xs mx-auto">
            <button
              onClick={() => setViewMode("browse")}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                viewMode === "browse"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Browse
            </button>
            <button
              onClick={() => {
                setViewMode("compare");
                analytics.comparisonViewed(selectedPlanIds);
              }}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                viewMode === "compare"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Compare ({selectedPlanIds.length})
            </button>
          </div>
        </section>
      )}

      {/* Filter Bar */}
      {viewMode === "browse" && (
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          resultCount={filteredPlans.length}
        />
      )}

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === "browse" ? (
          <>
            {/* Results info */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                {filteredPlans.length === plans.length
                  ? `Showing all ${plans.length} providers`
                  : `${filteredPlans.length} of ${plans.length} providers match your criteria`}
              </p>
              {selectedPlanIds.length > 0 && (
                <p className="text-sm text-primary-600">
                  {selectedPlanIds.length} selected for comparison
                </p>
              )}
            </div>

            {/* Plan Cards Grid */}
            {filteredPlans.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPlans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    matchingTiers={plan.matchingTiers}
                    isSelected={selectedPlanIds.includes(plan.id)}
                    onSelect={() => handlePlanSelect(plan.id)}
                    onViewDetails={() => handleViewDetails(plan)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <svg
                  className="w-12 h-12 mx-auto text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No plans match your criteria
                </h3>
                <p className="mt-2 text-gray-500">
                  Try adjusting your filters to see more options.
                </p>
                <button
                  onClick={() => setFilters(defaultFilters)}
                  className="mt-4 px-4 py-2 text-primary-600 font-medium hover:bg-primary-50 rounded-lg transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Comparison View */}
            <div className="mb-6">
              <button
                onClick={() => setViewMode("browse")}
                className="flex items-center text-primary-600 hover:text-primary-800 font-medium"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to all plans
              </button>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Comparing {selectedPlans.length} Plans
            </h2>

            <ComparisonTable
              plans={selectedPlans}
              onRemovePlan={handleRemoveFromComparison}
            />

            {/* Add more plans */}
            {selectedPlans.length < 4 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Add another plan to compare
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {plans
                    .filter((p) => !selectedPlanIds.includes(p.id))
                    .map((plan) => (
                      <PlanCard
                        key={plan.id}
                        plan={plan}
                        compact
                        isSelected={false}
                        onSelect={() => handlePlanSelect(plan.id)}
                      />
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* Comparison Selector (fixed bottom bar) */}
      {viewMode === "browse" && (
        <ComparisonSelector
          selectedPlans={selectedPlans}
          onClearAll={() => setSelectedPlanIds([])}
          onCompare={handleCompare}
        />
      )}

      {/* Plan Detail Modal */}
      {detailPlan && (
        <PlanDetailModal
          plan={detailPlan}
          isOpen={!!detailPlan}
          onClose={() => setDetailPlan(null)}
        />
      )}

      {/* Bottom padding for fixed comparison selector */}
      {viewMode === "browse" && selectedPlanIds.length > 0 && (
        <div className="h-20" />
      )}
    </div>
  );
}
