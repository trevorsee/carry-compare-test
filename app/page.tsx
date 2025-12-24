'use client';

import { useState } from 'react';
import { plans } from '@/data/plans';
import { FilterConstraints, Plan } from '@/lib/types';
import { filterPlans } from '@/lib/filters';
import PlanCard from '@/components/PlanCard';
import FilterPanel from '@/components/FilterPanel';
import ComparisonView from '@/components/ComparisonView';
import EducationalContent from '@/components/EducationalContent';
import Header from '@/components/Header';
import { AnalyticsEvents, trackEvent } from '@/lib/analytics';

export default function Home() {
  const [constraints, setConstraints] = useState<FilterConstraints>({});
  const [filteredPlans, setFilteredPlans] = useState<Plan[]>(plans);
  const [comparisonPlans, setComparisonPlans] = useState<Set<string>>(new Set());
  const [showComparison, setShowComparison] = useState(false);
  const [showEducation, setShowEducation] = useState(false);

  const handleFilterChange = (newConstraints: FilterConstraints) => {
    setConstraints(newConstraints);
    const filtered = filterPlans(plans, newConstraints);
    setFilteredPlans(filtered);
    trackEvent(AnalyticsEvents.FILTER_APPLIED, { constraints: newConstraints, resultCount: filtered.length });
  };

  const toggleComparison = (planId: string) => {
    const newSet = new Set(comparisonPlans);
    if (newSet.has(planId)) {
      newSet.delete(planId);
    } else {
      if (newSet.size >= 4) {
        alert('You can compare up to 4 plans at once.');
        return;
      }
      newSet.add(planId);
    }
    setComparisonPlans(newSet);
    if (newSet.size > 0) {
      trackEvent(AnalyticsEvents.COMPARISON_STARTED, { planCount: newSet.size });
    }
  };

  const handleShowComparison = () => {
    if (comparisonPlans.size < 2) {
      alert('Please select at least 2 plans to compare.');
      return;
    }
    setShowComparison(true);
    trackEvent(AnalyticsEvents.COMPARISON_VIEWED, { planCount: comparisonPlans.size });
  };

  const plansToCompare = filteredPlans.filter(p => comparisonPlans.has(p.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onEducationClick={() => setShowEducation(!showEducation)}
        comparisonCount={comparisonPlans.size}
        onShowComparison={handleShowComparison}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showEducation && (
          <div className="mb-8">
            <EducationalContent />
          </div>
        )}

        {showComparison && comparisonPlans.size >= 2 ? (
          <ComparisonView 
            plans={plansToCompare}
            onClose={() => setShowComparison(false)}
          />
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Compare Concealed Carry Legal Protection Plans
              </h1>
              <p className="text-gray-600">
                Find the right plan for your needs. Use filters to narrow your options, then compare plans side-by-side.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <FilterPanel 
                  constraints={constraints}
                  onChange={handleFilterChange}
                  resultCount={filteredPlans.length}
                  totalCount={plans.length}
                />
              </div>

              <div className="lg:col-span-3">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Showing {filteredPlans.length} of {plans.length} plans
                  </p>
                  {comparisonPlans.size > 0 && (
                    <button
                      onClick={handleShowComparison}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Compare {comparisonPlans.size} Plan{comparisonPlans.size !== 1 ? 's' : ''}
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {filteredPlans.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                      <p className="text-gray-600 mb-4">No plans match your filters.</p>
                      <button
                        onClick={() => {
                          setConstraints({});
                          setFilteredPlans(plans);
                        }}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        Clear all filters
                      </button>
                    </div>
                  ) : (
                    filteredPlans.map(plan => (
                      <PlanCard
                        key={plan.id}
                        plan={plan}
                        isInComparison={comparisonPlans.has(plan.id)}
                        onToggleComparison={toggleComparison}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="mt-16 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>Legal Disclaimer:</strong> This tool is for informational purposes only and does not constitute legal advice. Always consult with a qualified attorney for legal matters.</p>
            <p>Information is based on publicly available sources and may not reflect the most current plan details. Verify all information directly with providers before making decisions.</p>
            <p className="text-xs text-gray-500 mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
