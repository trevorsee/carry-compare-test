'use client';

import { useFilterStore } from '@/lib/store';
import { PRESET_FILTERS, SORT_OPTIONS } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { trackFilterChange, trackSortChange } from '@/lib/analytics';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FiltersProps {
  resultsCount: number;
}

export function Filters({ resultsCount }: FiltersProps) {
  const { filters, setFilter, resetFilters, activePreset, setPreset } = useFilterStore();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handlePresetClick = (presetId: string) => {
    const preset = PRESET_FILTERS.find((p) => p.id === presetId);
    if (!preset) return;

    if (activePreset === presetId) {
      resetFilters();
      return;
    }

    // Apply preset filters
    resetFilters();
    Object.entries(preset.filter).forEach(([key, value]) => {
      setFilter(key as keyof typeof filters, value as never);
    });
    setPreset(presetId);
    trackFilterChange('preset', presetId, resultsCount);
  };

  const handlePaymentStyleChange = (value: string, checked: boolean) => {
    const current = filters.paymentStyle;
    const updated = checked
      ? [...current, value]
      : current.filter((v) => v !== value);
    setFilter('paymentStyle', updated);
    trackFilterChange('paymentStyle', updated, resultsCount);
  };

  const handleAttorneyChoiceChange = (value: string, checked: boolean) => {
    const current = filters.attorneyChoice;
    const updated = checked
      ? [...current, value]
      : current.filter((v) => v !== value);
    setFilter('attorneyChoice', updated);
    trackFilterChange('attorneyChoice', updated, resultsCount);
  };

  const handleFamilyCoverageChange = (value: string, checked: boolean) => {
    const current = filters.familyCoverage;
    const updated = checked
      ? [...current, value]
      : current.filter((v) => v !== value);
    setFilter('familyCoverage', updated);
    trackFilterChange('familyCoverage', updated, resultsCount);
  };

  const handleSortChange = (value: string) => {
    if (value === 'priceMonthlyDesc') {
      setFilter('sortBy', 'priceMonthly');
      setFilter('sortOrder', 'desc');
    } else if (value === 'priceMonthly') {
      setFilter('sortBy', 'priceMonthly');
      setFilter('sortOrder', 'asc');
    } else {
      setFilter('sortBy', value);
      setFilter('sortOrder', 'desc');
    }
    trackSortChange(value);
  };

  const hasActiveFilters = 
    filters.paymentStyle.length > 0 ||
    filters.attorneyChoice.length > 0 ||
    filters.familyCoverage.length > 0 ||
    activePreset !== null;

  return (
    <div className="space-y-4">
      {/* Preset buttons */}
      <div className="flex flex-wrap gap-2">
        {PRESET_FILTERS.map((preset) => (
          <Button
            key={preset.id}
            variant={activePreset === preset.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => handlePresetClick(preset.id)}
            title={preset.description}
          >
            {preset.label}
          </Button>
        ))}
      </div>

      {/* Sort and advanced filters toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Select
            options={SORT_OPTIONS}
            value={filters.sortBy === 'priceMonthly' && filters.sortOrder === 'desc' ? 'priceMonthlyDesc' : filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            label="Sort by"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            Filters
            {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
        <div className="text-sm text-gray-600">
          Showing <span className="font-medium">{resultsCount}</span> plans
        </div>
      </div>

      {/* Advanced filters */}
      {showAdvanced && (
        <div className={cn(
          'grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-lg border border-gray-200',
          'animate-in fade-in slide-in-from-top-2 duration-200'
        )}>
          {/* Payment Style */}
          <div>
            <h4 className="font-medium text-sm text-gray-900 mb-3">Payment Style</h4>
            <div className="space-y-2">
              <Checkbox
                id="payment-upfront"
                label="Up-front"
                checked={filters.paymentStyle.includes('upfront')}
                onChange={(e) => handlePaymentStyleChange('upfront', e.target.checked)}
              />
              <Checkbox
                id="payment-reimbursement"
                label="Reimbursement"
                checked={filters.paymentStyle.includes('reimbursement')}
                onChange={(e) => handlePaymentStyleChange('reimbursement', e.target.checked)}
              />
              <Checkbox
                id="payment-mixed"
                label="Mixed"
                checked={filters.paymentStyle.includes('mixed')}
                onChange={(e) => handlePaymentStyleChange('mixed', e.target.checked)}
              />
            </div>
          </div>

          {/* Attorney Choice */}
          <div>
            <h4 className="font-medium text-sm text-gray-900 mb-3">Attorney Choice</h4>
            <div className="space-y-2">
              <Checkbox
                id="attorney-yes"
                label="Full choice"
                checked={filters.attorneyChoice.includes('yes')}
                onChange={(e) => handleAttorneyChoiceChange('yes', e.target.checked)}
              />
              <Checkbox
                id="attorney-limited"
                label="Network only"
                checked={filters.attorneyChoice.includes('limited')}
                onChange={(e) => handleAttorneyChoiceChange('limited', e.target.checked)}
              />
              <Checkbox
                id="attorney-no"
                label="Assigned"
                checked={filters.attorneyChoice.includes('no')}
                onChange={(e) => handleAttorneyChoiceChange('no', e.target.checked)}
              />
            </div>
          </div>

          {/* Family Coverage */}
          <div>
            <h4 className="font-medium text-sm text-gray-900 mb-3">Family Coverage</h4>
            <div className="space-y-2">
              <Checkbox
                id="family-yes"
                label="Included"
                checked={filters.familyCoverage.includes('yes')}
                onChange={(e) => handleFamilyCoverageChange('yes', e.target.checked)}
              />
              <Checkbox
                id="family-limited"
                label="Available (add-on)"
                checked={filters.familyCoverage.includes('limited')}
                onChange={(e) => handleFamilyCoverageChange('limited', e.target.checked)}
              />
              <Checkbox
                id="family-no"
                label="Not available"
                checked={filters.familyCoverage.includes('no')}
                onChange={(e) => handleFamilyCoverageChange('no', e.target.checked)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
