"use client";

import { ProviderPlan } from "@/types";
import { DisclosureBadge, SourceBadge, SponsoredBadge } from "./DisclosureBadge";
import { formatMoney } from "@/lib/filters";
import { analytics } from "@/lib/analytics";
import { useEffect } from "react";

interface PlanDetailModalProps {
  plan: ProviderPlan;
  isOpen: boolean;
  onClose: () => void;
}

export function PlanDetailModal({ plan, isOpen, onClose }: PlanDetailModalProps) {
  useEffect(() => {
    if (isOpen) {
      analytics.planViewed(plan.id, plan.name);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, plan.id, plan.name]);

  if (!isOpen) return null;

  const paymentStyleLabels = {
    upfront: "Upfront Payment",
    reimbursement: "Reimbursement",
    hybrid: "Hybrid",
  };

  const attorneyChoiceLabels = {
    your_choice: "Choose Your Own Attorney",
    panel_only: "Panel Attorneys Only",
    panel_preferred: "Panel Preferred",
  };

  const handleOutboundClick = () => {
    analytics.outboundClick(plan.id, plan.name, plan.website);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900">{plan.name}</h2>
              {plan.isSponsored && <SponsoredBadge />}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-6">
            {/* Description */}
            <p className="text-gray-600">{plan.description}</p>

            {/* Key Attributes */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Payment Style
                </h4>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg font-semibold text-gray-900">
                    {paymentStyleLabels[plan.paymentStyle.type]}
                  </span>
                  <DisclosureBadge status={plan.paymentStyle.disclosed} />
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {plan.paymentStyle.description}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Attorney Choice
                </h4>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg font-semibold text-gray-900">
                    {attorneyChoiceLabels[plan.attorneyChoice.type]}
                  </span>
                  <DisclosureBadge status={plan.attorneyChoice.disclosed} />
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {plan.attorneyChoice.description}
                </p>
              </div>
            </div>

            {/* Plan Tiers */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Available Plans
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plan.tiers.map((tier) => (
                  <div
                    key={tier.id}
                    className="border border-gray-200 rounded-xl p-4 hover:border-primary-300 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900">{tier.name}</h4>
                    <div className="mt-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${tier.monthlyPrice.amount}
                      </span>
                      <span className="text-gray-500">/month</span>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      or ${tier.annualPrice.amount}/year
                    </div>

                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Criminal:</span>
                        <span className="font-medium">
                          {formatMoney(tier.coverageLimits.criminal.amount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Civil:</span>
                        <span className="font-medium">
                          {formatMoney(tier.coverageLimits.civil.amount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bail Bond:</span>
                        <span className="font-medium">
                          {formatMoney(tier.bailBond.amount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Family:</span>
                        <span className="font-medium">
                          {tier.familyCoverage.value ? (
                            <span className="text-green-600">✓</span>
                          ) : (
                            <span className="text-gray-400">✗</span>
                          )}
                        </span>
                      </div>
                    </div>

                    <ul className="mt-4 space-y-1">
                      {tier.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-600 flex items-start"
                        >
                          <svg
                            className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Best For / Not Ideal For */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-700 flex items-center mb-3">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Best For
                </h3>
                <ul className="space-y-2">
                  {plan.bestFor.map((item, idx) => (
                    <li key={idx} className="flex items-start text-gray-600">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-700 flex items-center mb-3">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Not Ideal If
                </h3>
                <ul className="space-y-2">
                  {plan.notIdealFor.map((item, idx) => (
                    <li key={idx} className="flex items-start text-gray-600">
                      <span className="text-amber-500 mr-2 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Exclusions */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                Exclusions & Limitations
              </h3>
              <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                <ul className="space-y-3">
                  {plan.exclusions.map((exclusion, idx) => (
                    <li key={idx} className="flex items-start">
                      <span
                        className={`inline-block w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${
                          exclusion.severity === "critical"
                            ? "bg-red-500"
                            : exclusion.severity === "important"
                            ? "bg-amber-500"
                            : "bg-gray-400"
                        }`}
                      />
                      <div>
                        <span className="font-medium text-gray-900">
                          {exclusion.category}
                        </span>
                        <span className="text-gray-600">
                          : {exclusion.description}
                        </span>
                        <DisclosureBadge
                          status={exclusion.disclosed}
                          className="ml-2"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Geographic */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Availability
              </h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Waiting Period:</span>
                  <span className="font-medium">{plan.waitingPeriod.value}</span>
                  <DisclosureBadge
                    status={plan.waitingPeriod.disclosed}
                    className="ml-2"
                  />
                </div>
                {plan.statesExcluded.length > 0 && (
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">Not Available In:</span>
                    <span className="font-medium text-amber-600">
                      {plan.statesExcluded.join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Sources */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Sources
              </h3>
              <div className="flex flex-wrap gap-3">
                <SourceBadge lastVerified={plan.lastVerified} />
                {plan.sources.map((source, idx) => (
                  <a
                    key={idx}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => analytics.sourceClicked(plan.id, source.url)}
                    className="inline-flex items-center px-3 py-1 text-sm text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    {source.name}
                    <svg
                      className="w-3 h-3 ml-1"
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
                ))}
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Verify all details directly with the provider before purchasing.
            </p>
            <a
              href={plan.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleOutboundClick}
              className="px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center"
            >
              Visit {plan.shortName}
              <svg
                className="w-4 h-4 ml-2"
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
    </div>
  );
}
