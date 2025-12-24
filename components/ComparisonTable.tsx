'use client';

import { useState, useEffect } from 'react';
import { PlanWithProvider, SortOption } from '@/lib/types';
import { PaymentStyle, AttorneyChoice, CoverageType, FamilyCoverage } from '@prisma/client';
import { trackOutboundClick, trackFilterChange, trackSortChange, trackCompareAdd, trackCompareRemove } from '@/lib/analytics';

interface ComparisonTableProps {
  initialPlans: PlanWithProvider[];
}

export default function ComparisonTable({ initialPlans }: ComparisonTableProps) {
  const [plans, setPlans] = useState<PlanWithProvider[]>(initialPlans);
  const [loading, setLoading] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState({
    paymentStyle: [] as PaymentStyle[],
    attorneyChoice: [] as AttorneyChoice[],
    coverageType: [] as CoverageType[],
    familyCoverage: [] as FamilyCoverage[],
    priceMin: '',
    priceMax: '',
  });
  const [sort, setSort] = useState<SortOption>('score-high-low');

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (sort) params.set('sort', sort);
      if (filters.paymentStyle.length > 0) params.set('paymentStyle', filters.paymentStyle.join(','));
      if (filters.attorneyChoice.length > 0) params.set('attorneyChoice', filters.attorneyChoice.join(','));
      if (filters.coverageType.length > 0) params.set('coverageType', filters.coverageType.join(','));
      if (filters.familyCoverage.length > 0) params.set('familyCoverage', filters.familyCoverage.join(','));
      if (filters.priceMin) params.set('priceMin', filters.priceMin);
      if (filters.priceMax) params.set('priceMax', filters.priceMax);

      try {
        const res = await fetch(`/api/plans?${params.toString()}`);
        const data = await res.json();
        setPlans(data.plans || []);
      } catch (error) {
        console.error('Error fetching plans:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchPlans, 300);
    return () => clearTimeout(timeoutId);
  }, [filters, sort]);

  const togglePlanSelection = (planId: string) => {
    const newSelected = new Set(selectedPlans);
    const plan = plans.find((p) => p.id === planId);
    
    if (newSelected.has(planId)) {
      newSelected.delete(planId);
      if (plan) trackCompareRemove({ planId, providerId: plan.provider.id });
    } else if (newSelected.size < 4) {
      newSelected.add(planId);
      if (plan) trackCompareAdd({ planId, providerId: plan.provider.id });
    }
    setSelectedPlans(newSelected);
  };

  const formatPrice = (plan: PlanWithProvider) => {
    if (plan.priceMonthly) {
      return `$${plan.priceMonthly.toFixed(2)}/mo`;
    }
    if (plan.priceAnnual) {
      return `$${plan.priceAnnual.toFixed(2)}/yr`;
    }
    return 'Not disclosed';
  };

  const formatEnum = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, ' ');
  };

  const handleOutboundClick = (plan: PlanWithProvider, placement: 'table' | 'provider' | 'compare') => {
    trackOutboundClick({
      provider_id: plan.provider.id,
      plan_id: plan.id,
      placement,
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
      cta_label: plan.ctaLabel || 'Visit Provider',
    });

    const url = plan.affiliateUrl || plan.provider.websiteUrl || '#';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Payment Style</label>
            <div className="space-y-2">
              {(['upfront', 'reimbursement', 'mixed'] as PaymentStyle[]).map((style) => (
                <label key={style} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.paymentStyle.includes(style)}
                    onChange={(e) => {
                      const newFilters = {
                        ...filters,
                        paymentStyle: e.target.checked
                          ? [...filters.paymentStyle, style]
                          : filters.paymentStyle.filter((s) => s !== style),
                      };
                      setFilters(newFilters);
                      // Track will happen in useEffect when plans update
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm">{formatEnum(style)}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Attorney Choice</label>
            <div className="space-y-2">
              {(['yes', 'limited', 'no'] as AttorneyChoice[]).map((choice) => (
                <label key={choice} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.attorneyChoice.includes(choice)}
                    onChange={(e) => {
                      setFilters({
                        ...filters,
                        attorneyChoice: e.target.checked
                          ? [...filters.attorneyChoice, choice]
                          : filters.attorneyChoice.filter((c) => c !== choice),
                      });
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm">{formatEnum(choice)}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Coverage Type</label>
            <div className="space-y-2">
              {(['criminal', 'civil', 'both'] as CoverageType[]).map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.coverageType.includes(type)}
                    onChange={(e) => {
                      setFilters({
                        ...filters,
                        coverageType: e.target.checked
                          ? [...filters.coverageType, type]
                          : filters.coverageType.filter((t) => t !== type),
                      });
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm">{formatEnum(type)}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Family Coverage</label>
            <div className="space-y-2">
              {(['yes', 'limited', 'no'] as FamilyCoverage[]).map((coverage) => (
                <label key={coverage} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.familyCoverage.includes(coverage)}
                    onChange={(e) => {
                      setFilters({
                        ...filters,
                        familyCoverage: e.target.checked
                          ? [...filters.familyCoverage, coverage]
                          : filters.familyCoverage.filter((c) => c !== coverage),
                      });
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm">{formatEnum(coverage)}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Price Range (Monthly)</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceMin}
                onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 text-sm w-24"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.priceMax}
                onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 text-sm w-24"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sort */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Sort by:</label>
          <select
            value={sort}
            onChange={(e) => {
              const newSort = e.target.value as SortOption;
              setSort(newSort);
              trackSortChange({ sort_key: newSort });
            }}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="score-high-low">Best Score</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
          </select>
        </div>
        <div className="text-sm text-gray-600">
          {plans.length} plan{plans.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Compare Tray */}
      {selectedPlans.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-medium">
                {selectedPlans.size} plan{selectedPlans.size !== 1 ? 's' : ''} selected
              </span>
              <button
                onClick={() => {
                  const planIds = Array.from(selectedPlans).join('-vs-');
                  window.location.href = `/compare/${planIds}`;
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Compare Now
              </button>
            </div>
            <button
              onClick={() => setSelectedPlans(new Set())}
              className="text-gray-600 hover:text-gray-900"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : plans.length === 0 ? (
        <div className="text-center py-12 text-gray-600">
          No plans found matching your filters.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 font-semibold">Compare</th>
                <th className="text-left p-4 font-semibold">Plan</th>
                <th className="text-left p-4 font-semibold">Provider</th>
                <th className="text-left p-4 font-semibold">Price</th>
                <th className="text-left p-4 font-semibold">Payment Style</th>
                <th className="text-left p-4 font-semibold">Attorney Choice</th>
                <th className="text-left p-4 font-semibold">Coverage</th>
                <th className="text-left p-4 font-semibold">Family</th>
                <th className="text-left p-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedPlans.has(plan.id)}
                      onChange={() => togglePlanSelection(plan.id)}
                      disabled={!selectedPlans.has(plan.id) && selectedPlans.size >= 4}
                    />
                  </td>
                  <td className="p-4">
                    <a
                      href={`/plans/${plan.slug}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {plan.name}
                    </a>
                  </td>
                  <td className="p-4">{plan.provider.name}</td>
                  <td className="p-4">{formatPrice(plan)}</td>
                  <td className="p-4">{formatEnum(plan.paymentStyle)}</td>
                  <td className="p-4">{formatEnum(plan.attorneyChoice)}</td>
                  <td className="p-4">{formatEnum(plan.coverageType)}</td>
                  <td className="p-4">{formatEnum(plan.familyCoverage)}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleOutboundClick(plan, 'table')}
                      className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                    >
                      {plan.ctaLabel || 'Visit Provider'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
