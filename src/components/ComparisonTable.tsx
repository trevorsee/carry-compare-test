"use client";

import { ProviderPlan } from "@/types";
import { DisclosureBadge, SponsoredBadge } from "./DisclosureBadge";
import { formatMoney } from "@/lib/filters";
import { analytics } from "@/lib/analytics";

interface ComparisonTableProps {
  plans: ProviderPlan[];
  onRemovePlan: (planId: string) => void;
}

export function ComparisonTable({ plans, onRemovePlan }: ComparisonTableProps) {
  if (plans.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
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
            d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          No plans selected for comparison
        </h3>
        <p className="mt-2 text-gray-500">
          Select 2-4 plans from the list to compare them side-by-side
        </p>
      </div>
    );
  }

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

  const handleOutboundClick = (plan: ProviderPlan) => {
    analytics.outboundClick(plan.id, plan.name, plan.website);
  };

  interface ComparisonRow {
    label: string;
    category: string;
    getValue: (plan: ProviderPlan) => React.ReactNode;
    important?: boolean;
  }

  const comparisonRows: ComparisonRow[] = [
    // Pricing & Cost
    {
      label: "Starting Price",
      category: "Cost",
      getValue: (plan) => {
        const tier = plan.tiers[0];
        return (
          <span className="font-semibold text-lg">
            ${tier.monthlyPrice.amount}/mo
          </span>
        );
      },
      important: true,
    },
    {
      label: "Top Tier Price",
      category: "Cost",
      getValue: (plan) => {
        const tier = plan.tiers[plan.tiers.length - 1];
        return <span>${tier.monthlyPrice.amount}/mo</span>;
      },
    },

    // Coverage
    {
      label: "Payment Style",
      category: "Coverage",
      getValue: (plan) => (
        <div>
          <span className="font-medium">
            {paymentStyleLabels[plan.paymentStyle.type]}
          </span>
          <DisclosureBadge
            status={plan.paymentStyle.disclosed}
            className="ml-2"
          />
        </div>
      ),
      important: true,
    },
    {
      label: "Max Criminal Defense",
      category: "Coverage",
      getValue: (plan) => {
        const tier = plan.tiers[plan.tiers.length - 1];
        const limit = tier.coverageLimits.criminal;
        return (
          <div>
            <span className={limit.amount === null ? "font-semibold text-green-600" : ""}>
              {formatMoney(limit.amount)}
            </span>
            {limit.notes && (
              <span className="text-xs text-gray-500 block">{limit.notes}</span>
            )}
          </div>
        );
      },
      important: true,
    },
    {
      label: "Max Civil Defense",
      category: "Coverage",
      getValue: (plan) => {
        const tier = plan.tiers[plan.tiers.length - 1];
        return formatMoney(tier.coverageLimits.civil.amount);
      },
    },

    // Attorney
    {
      label: "Attorney Choice",
      category: "Attorney",
      getValue: (plan) => (
        <div>
          <span className="font-medium">
            {attorneyChoiceLabels[plan.attorneyChoice.type]}
          </span>
          <DisclosureBadge
            status={plan.attorneyChoice.disclosed}
            className="ml-2"
          />
        </div>
      ),
      important: true,
    },

    // Additional Benefits
    {
      label: "Family Coverage Available",
      category: "Benefits",
      getValue: (plan) => {
        const hasFamilyTier = plan.tiers.some((t) => t.familyCoverage.value);
        return hasFamilyTier ? (
          <span className="text-green-600 font-medium">✓ Yes</span>
        ) : (
          <span className="text-gray-400">✗ No</span>
        );
      },
    },
    {
      label: "Max Bail Bond",
      category: "Benefits",
      getValue: (plan) => {
        const tier = plan.tiers[plan.tiers.length - 1];
        return formatMoney(tier.bailBond.amount);
      },
    },
    {
      label: "Psychological Support",
      category: "Benefits",
      getValue: (plan) => {
        const tier = plan.tiers[plan.tiers.length - 1];
        return tier.psychologicalSupport.value ? (
          <span className="text-green-600">✓ Yes</span>
        ) : (
          <span className="text-gray-400">✗ No</span>
        );
      },
    },
    {
      label: "Gun Replacement",
      category: "Benefits",
      getValue: (plan) => {
        const tier = plan.tiers[plan.tiers.length - 1];
        return tier.gunReplacement.value ? (
          <span className="text-green-600">✓ Yes</span>
        ) : (
          <span className="text-gray-400">✗ No</span>
        );
      },
    },

    // Limitations
    {
      label: "States Excluded",
      category: "Limitations",
      getValue: (plan) =>
        plan.statesExcluded.length > 0 ? (
          <span className="text-amber-600">{plan.statesExcluded.join(", ")}</span>
        ) : (
          <span className="text-green-600">None</span>
        ),
    },
    {
      label: "Waiting Period",
      category: "Limitations",
      getValue: (plan) => (
        <div className="flex items-center gap-1">
          <span>{plan.waitingPeriod.value}</span>
          <DisclosureBadge status={plan.waitingPeriod.disclosed} />
        </div>
      ),
    },
    {
      label: "Key Exclusions",
      category: "Limitations",
      getValue: (plan) => (
        <ul className="text-sm space-y-1">
          {plan.exclusions
            .filter((e) => e.severity === "critical")
            .slice(0, 2)
            .map((exclusion, idx) => (
              <li key={idx} className="text-amber-700">
                • {exclusion.category}
              </li>
            ))}
        </ul>
      ),
      important: true,
    },

    // Trust
    {
      label: "Years in Business",
      category: "Trust",
      getValue: (plan) =>
        plan.yearsInBusiness ? `${plan.yearsInBusiness} years` : "Not disclosed",
    },
    {
      label: "Member Count",
      category: "Trust",
      getValue: (plan) => plan.memberCount.value || "Not disclosed",
    },
    {
      label: "Last Verified",
      category: "Trust",
      getValue: (plan) => plan.lastVerified,
    },
  ];

  // Group rows by category
  const categories = Array.from(new Set(comparisonRows.map((r) => r.category)));

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="overflow-x-auto comparison-scroll">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="w-48 p-4 text-left bg-gray-50"></th>
              {plans.map((plan) => (
                <th
                  key={plan.id}
                  className="p-4 text-left bg-gray-50 min-w-[200px]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">
                          {plan.shortName}
                        </span>
                        {plan.isSponsored && <SponsoredBadge />}
                      </div>
                    </div>
                    <button
                      onClick={() => onRemovePlan(plan.id)}
                      className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded"
                    >
                      <svg
                        className="w-4 h-4"
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
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <>
                <tr key={`cat-${category}`} className="bg-gray-100">
                  <td
                    colSpan={plans.length + 1}
                    className="px-4 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {category}
                  </td>
                </tr>
                {comparisonRows
                  .filter((row) => row.category === category)
                  .map((row, idx) => (
                    <tr
                      key={`${category}-${idx}`}
                      className={`border-b border-gray-100 ${
                        row.important ? "bg-primary-50/30" : ""
                      }`}
                    >
                      <td className="p-4 text-sm font-medium text-gray-700">
                        {row.label}
                        {row.important && (
                          <span className="ml-1 text-primary-500">★</span>
                        )}
                      </td>
                      {plans.map((plan) => (
                        <td key={plan.id} className="p-4 text-sm text-gray-600">
                          {row.getValue(plan)}
                        </td>
                      ))}
                    </tr>
                  ))}
              </>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 border-t-2 border-gray-200">
              <td className="p-4"></td>
              {plans.map((plan) => (
                <td key={plan.id} className="p-4">
                  <a
                    href={plan.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleOutboundClick(plan)}
                    className="block w-full px-4 py-2 text-center text-sm font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Visit {plan.shortName}
                    <svg
                      className="w-4 h-4 ml-1 inline"
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
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Disclosure note */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
        <strong>Note:</strong> This comparison uses publicly available information.
        Clicking &quot;Visit&quot; will take you to the provider&apos;s website. Some links may be
        affiliate links (clearly marked with &quot;Sponsored&quot;). Always verify details
        directly with the provider before purchasing.
      </div>
    </div>
  );
}
