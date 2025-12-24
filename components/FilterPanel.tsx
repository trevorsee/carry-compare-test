'use client';

import { useState } from 'react';
import { FilterConstraints, PaymentStyle, AttorneyChoice } from '@/lib/types';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

interface FilterPanelProps {
  constraints: FilterConstraints;
  onChange: (constraints: FilterConstraints) => void;
  resultCount: number;
  totalCount: number;
}

export default function FilterPanel({ constraints, onChange, resultCount, totalCount }: FilterPanelProps) {
  const [localConstraints, setLocalConstraints] = useState<FilterConstraints>(constraints);

  const updateConstraint = <K extends keyof FilterConstraints>(
    key: K,
    value: FilterConstraints[K]
  ) => {
    const newConstraints = { ...localConstraints, [key]: value };
    setLocalConstraints(newConstraints);
    onChange(newConstraints);
    trackEvent(AnalyticsEvents.CONSTRAINT_SET, { constraint: key, value });
  };

  const clearFilters = () => {
    const empty: FilterConstraints = {};
    setLocalConstraints(empty);
    onChange(empty);
    trackEvent(AnalyticsEvents.FILTER_APPLIED, { action: 'clear' });
  };

  const hasActiveFilters = Object.keys(constraints).length > 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600">Showing</div>
        <div className="text-2xl font-bold text-gray-900">{resultCount}</div>
        <div className="text-sm text-gray-600">of {totalCount} plans</div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Monthly Price
          </label>
          <input
            type="number"
            value={localConstraints.maxMonthlyPrice || ''}
            onChange={(e) => updateConstraint('maxMonthlyPrice', e.target.value ? Number(e.target.value) : undefined)}
            placeholder="No limit"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Annual Price
          </label>
          <input
            type="number"
            value={localConstraints.maxAnnualPrice || ''}
            onChange={(e) => updateConstraint('maxAnnualPrice', e.target.value ? Number(e.target.value) : undefined)}
            placeholder="No limit"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Style
          </label>
          <div className="space-y-2">
            {(['upfront', 'reimbursement', 'hybrid'] as PaymentStyle[]).map((style) => (
              <label key={style} className="flex items-center">
                <input
                  type="checkbox"
                  checked={localConstraints.paymentStyle?.includes(style) || false}
                  onChange={(e) => {
                    const current = localConstraints.paymentStyle || [];
                    const updated = e.target.checked
                      ? [...current, style]
                      : current.filter(s => s !== style);
                    updateConstraint('paymentStyle', updated.length > 0 ? updated : undefined);
                  }}
                  className="mr-2 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 capitalize">{style}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Attorney Choice
          </label>
          <div className="space-y-2">
            {(['network', 'choice', 'hybrid'] as AttorneyChoice[]).map((choice) => (
              <label key={choice} className="flex items-center">
                <input
                  type="checkbox"
                  checked={localConstraints.attorneyChoice?.includes(choice) || false}
                  onChange={(e) => {
                    const current = localConstraints.attorneyChoice || [];
                    const updated = e.target.checked
                      ? [...current, choice]
                      : current.filter(c => c !== choice);
                    updateConstraint('attorneyChoice', updated.length > 0 ? updated : undefined);
                  }}
                  className="mr-2 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 capitalize">{choice}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={localConstraints.familyCoverage === true}
              onChange={(e) => updateConstraint('familyCoverage', e.target.checked ? true : undefined)}
              className="mr-2 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">Family coverage required</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Coverage Limit
          </label>
          <input
            type="number"
            value={localConstraints.minCoverageLimit || ''}
            onChange={(e) => updateConstraint('minCoverageLimit', e.target.value ? Number(e.target.value) : undefined)}
            placeholder="No minimum"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}
