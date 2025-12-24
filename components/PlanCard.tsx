'use client';

import { Plan } from '@/lib/types';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

interface PlanCardProps {
  plan: Plan;
  isInComparison: boolean;
  onToggleComparison: (planId: string) => void;
}

export default function PlanCard({ plan, isInComparison, onToggleComparison }: PlanCardProps) {
  const formatPrice = (attr: typeof plan.monthlyPrice) => {
    if (attr.value === null) return 'Not disclosed';
    if (typeof attr.value === 'number') {
      return `$${attr.value.toLocaleString()}`;
    }
    return String(attr.value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'disclosed':
        return <span className="text-xs text-green-600 font-medium">✓ Disclosed</span>;
      case 'not_disclosed':
        return <span className="text-xs text-yellow-600 font-medium">? Not disclosed</span>;
      case 'unclear':
        return <span className="text-xs text-gray-600 font-medium">~ Unclear</span>;
      default:
        return null;
    }
  };

  const formatCoverageLimit = (attr: typeof plan.coverageLimit) => {
    if (attr.value === null) return 'Not disclosed';
    if (attr.value === 'unlimited') return 'Unlimited';
    if (typeof attr.value === 'number') {
      return `$${attr.value.toLocaleString()}`;
    }
    return String(attr.value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
          <p className="text-sm text-gray-600">{plan.provider}</p>
        </div>
        {plan.sponsored && (
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Sponsored</span>
        )}
      </div>

      <p className="text-gray-700 mb-4">{plan.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
        <div>
          <div className="text-gray-500">Monthly</div>
          <div className="font-semibold text-gray-900">{formatPrice(plan.monthlyPrice)}</div>
          {getStatusBadge(plan.monthlyPrice.status)}
        </div>
        <div>
          <div className="text-gray-500">Annual</div>
          <div className="font-semibold text-gray-900">{formatPrice(plan.annualPrice)}</div>
          {getStatusBadge(plan.annualPrice.status)}
        </div>
        <div>
          <div className="text-gray-500">Payment</div>
          <div className="font-semibold text-gray-900 capitalize">{plan.paymentStyle}</div>
        </div>
        <div>
          <div className="text-gray-500">Attorney</div>
          <div className="font-semibold text-gray-900 capitalize">{plan.attorneyChoice}</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2">
          <strong>Coverage Limit:</strong> {formatCoverageLimit(plan.coverageLimit)}
          {getStatusBadge(plan.coverageLimit.status)}
        </div>
        <div className="text-sm text-gray-600">
          <strong>Family Coverage:</strong> {plan.familyCoverage.value ? 'Yes' : 'No'}
          {getStatusBadge(plan.familyCoverage.status)}
        </div>
        {plan.waitingPeriod.value !== null && typeof plan.waitingPeriod.value === 'number' && (
          <div className="text-sm text-gray-600 mt-1">
            <strong>Waiting Period:</strong> {plan.waitingPeriod.value} days
          </div>
        )}
      </div>

      {plan.bestFor.length > 0 && (
        <div className="mb-4">
          <div className="text-sm font-semibold text-gray-900 mb-1">Best for:</div>
          <ul className="text-sm text-gray-700 list-disc list-inside">
            {plan.bestFor.slice(0, 3).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {plan.notIdealFor.length > 0 && (
        <div className="mb-4 bg-red-50 p-3 rounded">
          <div className="text-sm font-semibold text-red-900 mb-1">Not ideal if:</div>
          <ul className="text-sm text-red-800 list-disc list-inside">
            {plan.notIdealFor.slice(0, 2).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          Source: {plan.source} • Verified: {plan.lastVerified}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              onToggleComparison(plan.id);
              trackEvent(AnalyticsEvents.COMPARISON_STARTED, { planId: plan.id, action: isInComparison ? 'remove' : 'add' });
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isInComparison
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isInComparison ? 'Remove' : 'Compare'}
          </button>
          <a
            href={plan.providerLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent(AnalyticsEvents.PROVIDER_CLICKED, { planId: plan.id, provider: plan.provider })}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
          >
            Visit Provider
          </a>
        </div>
      </div>
    </div>
  );
}
