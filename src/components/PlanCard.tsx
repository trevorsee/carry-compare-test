"use client";

import { ProviderPlan, PlanTier } from "@/types";
import { DisclosureBadge, SourceBadge, SponsoredBadge } from "./DisclosureBadge";
import { formatMoney, formatMonthlyPrice, getLowestPrice } from "@/lib/filters";

interface PlanCardProps {
  plan: ProviderPlan;
  matchingTiers?: PlanTier[];
  isSelected?: boolean;
  onSelect?: () => void;
  onViewDetails?: () => void;
  compact?: boolean;
}

export function PlanCard({
  plan,
  matchingTiers,
  isSelected = false,
  onSelect,
  onViewDetails,
  compact = false,
}: PlanCardProps) {
  const displayTiers = matchingTiers || plan.tiers;
  const lowestPrice = getLowestPrice(plan);

  const paymentStyleLabels = {
    upfront: "Upfront Payment",
    reimbursement: "Reimbursement",
    hybrid: "Hybrid",
  };

  const attorneyChoiceLabels = {
    your_choice: "Your Choice",
    panel_only: "Panel Only",
    panel_preferred: "Panel Preferred",
  };

  if (compact) {
    return (
      <div
        className={`plan-card bg-white rounded-lg border-2 p-4 cursor-pointer ${
          isSelected
            ? "border-primary-500 ring-2 ring-primary-200"
            : "border-gray-200 hover:border-gray-300"
        }`}
        onClick={onSelect}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{plan.shortName}</h3>
              {plan.isSponsored && <SponsoredBadge />}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              From {formatMonthlyPrice(lowestPrice)}
            </p>
          </div>
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              isSelected
                ? "border-primary-500 bg-primary-500"
                : "border-gray-300"
            }`}
          >
            {isSelected && (
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`plan-card bg-white rounded-xl border-2 overflow-hidden ${
        isSelected
          ? "border-primary-500 ring-2 ring-primary-200"
          : "border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              {plan.isSponsored && <SponsoredBadge />}
            </div>
            <p className="text-gray-600 mt-1 text-sm">{plan.description}</p>
          </div>
          {onSelect && (
            <button
              onClick={onSelect}
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                isSelected
                  ? "border-primary-500 bg-primary-500"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {isSelected && (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Key attributes */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-50 text-primary-700">
            {paymentStyleLabels[plan.paymentStyle.type]}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
            Attorney: {attorneyChoiceLabels[plan.attorneyChoice.type]}
          </span>
        </div>
      </div>

      {/* Pricing tiers */}
      <div className="p-6 bg-gray-50">
        <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
          Plans & Pricing
        </h4>
        <div className="space-y-3">
          {displayTiers.slice(0, 3).map((tier) => (
            <div
              key={tier.id}
              className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-gray-200"
            >
              <div>
                <span className="font-medium text-gray-900">{tier.name}</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-500">
                    Criminal: {formatMoney(tier.coverageLimits.criminal.amount)}
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="text-sm text-gray-500">
                    Civil: {formatMoney(tier.coverageLimits.civil.amount)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">
                  ${tier.monthlyPrice.amount}
                </span>
                <span className="text-gray-500">/mo</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best for / Not ideal for */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-semibold text-green-700 flex items-center mb-2">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Best For
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {plan.bestFor.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-amber-700 flex items-center mb-2">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Not Ideal If
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {plan.notIdealFor.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer with source info and actions */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <SourceBadge lastVerified={plan.lastVerified} />
          <DisclosureBadge status={plan.paymentStyle.disclosed} />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onViewDetails}
            className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors"
          >
            View Details
          </button>
          <a
            href={plan.website}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center"
          >
            Visit Site
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
