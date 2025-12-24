"use client";

import { useState } from "react";
import { FilterState, PaymentStyle, AttorneyChoice } from "@/types";
import { US_STATES } from "@/data/plans";
import { countActiveFilters, defaultFilters } from "@/lib/filters";
import { analytics } from "@/lib/analytics";

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  resultCount: number;
}

export function FilterBar({ filters, onFilterChange, resultCount }: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const activeCount = countActiveFilters(filters);

  const handleReset = () => {
    onFilterChange(defaultFilters);
    analytics.filterCleared();
  };

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
    analytics.filterApplied(key, value);
  };

  return (
    <div className="filter-bar-sticky">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between md:hidden mb-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
            {activeCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-primary-600 text-white text-xs rounded-full">
                {activeCount}
              </span>
            )}
          </button>
          <span className="text-gray-600">
            <span className="font-semibold text-gray-900">{resultCount}</span>{" "}
            plans match
          </span>
        </div>

        {/* Desktop: always show, Mobile: toggle */}
        <div className={`${isExpanded ? "block" : "hidden"} md:block`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* State selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your State
              </label>
              <select
                value={filters.selectedState || ""}
                onChange={(e) =>
                  updateFilter(
                    "selectedState",
                    e.target.value || null
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All States</option>
                {US_STATES.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget slider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Budget
              </label>
              <select
                value={filters.maxMonthlyBudget || ""}
                onChange={(e) =>
                  updateFilter(
                    "maxMonthlyBudget",
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Any Price</option>
                <option value="15">Up to $15/mo</option>
                <option value="25">Up to $25/mo</option>
                <option value="35">Up to $35/mo</option>
                <option value="50">Up to $50/mo</option>
              </select>
            </div>

            {/* Payment style */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Style
              </label>
              <select
                value={filters.paymentStyle || ""}
                onChange={(e) =>
                  updateFilter(
                    "paymentStyle",
                    (e.target.value as PaymentStyle) || null
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Any</option>
                <option value="upfront">Upfront Payment</option>
                <option value="reimbursement">Reimbursement</option>
              </select>
            </div>

            {/* Attorney choice */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attorney Choice
              </label>
              <select
                value={filters.attorneyChoice || ""}
                onChange={(e) =>
                  updateFilter(
                    "attorneyChoice",
                    (e.target.value as AttorneyChoice) || null
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Any</option>
                <option value="your_choice">Choose My Own</option>
                <option value="panel_only">Panel Only</option>
                <option value="panel_preferred">Panel Preferred</option>
              </select>
            </div>

            {/* Family coverage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Family Coverage
              </label>
              <button
                onClick={() =>
                  updateFilter("needsFamilyCoverage", !filters.needsFamilyCoverage)
                }
                className={`w-full px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${
                  filters.needsFamilyCoverage
                    ? "bg-primary-50 border-primary-500 text-primary-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {filters.needsFamilyCoverage ? "✓ Required" : "Not Required"}
              </button>
            </div>

            {/* Reset / Results */}
            <div className="flex flex-col justify-end">
              <div className="hidden md:flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">{resultCount}</span>{" "}
                  plans
                </span>
                {activeCount > 0 && (
                  <button
                    onClick={handleReset}
                    className="text-sm text-primary-600 hover:text-primary-800 font-medium"
                  >
                    Reset all
                  </button>
                )}
              </div>
              <div className="md:hidden mt-4">
                {activeCount > 0 && (
                  <button
                    onClick={handleReset}
                    className="w-full px-4 py-2 text-sm text-primary-600 border border-primary-300 rounded-lg hover:bg-primary-50"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
