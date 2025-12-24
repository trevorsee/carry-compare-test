'use client';

import { Plan, PlanAttribute } from '@/lib/types';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

interface ComparisonViewProps {
  plans: Plan[];
  onClose: () => void;
}

export default function ComparisonView({ plans, onClose }: ComparisonViewProps) {
  const formatPrice = (attr: PlanAttribute) => {
    if (attr.value === null) return 'Not disclosed';
    if (typeof attr.value === 'number') {
      return `$${attr.value.toLocaleString()}`;
    }
    return String(attr.value);
  };

  const formatCoverageLimit = (attr: PlanAttribute) => {
    if (attr.value === null) return 'Not disclosed';
    if (attr.value === 'unlimited') return 'Unlimited';
    if (typeof attr.value === 'number') {
      return `$${attr.value.toLocaleString()}`;
    }
    return String(attr.value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'disclosed':
        return <span className="text-xs text-green-600">✓</span>;
      case 'not_disclosed':
        return <span className="text-xs text-yellow-600">?</span>;
      case 'unclear':
        return <span className="text-xs text-gray-600">~</span>;
      default:
        return null;
    }
  };

  const comparisonAttributes = [
    { label: 'Provider', key: 'provider' as const },
    { label: 'Monthly Price', key: 'monthlyPrice' as const },
    { label: 'Annual Price', key: 'annualPrice' as const },
    { label: 'Payment Style', key: 'paymentStyle' as const },
    { label: 'Attorney Choice', key: 'attorneyChoice' as const },
    { label: 'Family Coverage', key: 'familyCoverage' as const },
    { label: 'Coverage Limit', key: 'coverageLimit' as const },
    { label: 'Waiting Period', key: 'waitingPeriod' as const },
    { label: 'Covers Civil', key: 'coversCivil' as const },
    { label: 'Covers Criminal', key: 'coversCriminal' as const },
    { label: 'Covers Bail', key: 'coversBail' as const },
    { label: 'Covers Expert Witness', key: 'coversExpertWitness' as const },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Compare Plans</h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Back to List
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                  Attribute
                </th>
                {plans.map((plan) => (
                  <th key={plan.id} className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
                    <div className="font-bold text-gray-900">{plan.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{plan.provider}</div>
                    {plan.sponsored && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded mt-1 inline-block">Sponsored</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {comparisonAttributes.map((attr) => (
                <tr key={attr.key} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white z-10">
                    {attr.label}
                  </td>
                  {plans.map((plan) => {
                    const value = plan[attr.key];
                    let displayValue: React.ReactNode = '';
                    
                    if (attr.key === 'provider') {
                      displayValue = plan.provider;
                    } else if (attr.key === 'paymentStyle' || attr.key === 'attorneyChoice') {
                      displayValue = <span className="capitalize">{String(value)}</span>;
                    } else if (attr.key === 'familyCoverage' || attr.key === 'coversCivil' || attr.key === 'coversCriminal' || attr.key === 'coversBail' || attr.key === 'coversExpertWitness') {
                      const attrValue = value as typeof plan.familyCoverage;
                      displayValue = (
                        <div className="flex items-center gap-2">
                          <span>{attrValue.value ? 'Yes' : 'No'}</span>
                          {getStatusBadge(attrValue.status)}
                        </div>
                      );
                    } else if (attr.key === 'monthlyPrice' || attr.key === 'annualPrice') {
                      const attrValue = value as typeof plan.monthlyPrice;
                      displayValue = (
                        <div className="flex items-center gap-2">
                          <span>{formatPrice(attrValue)}</span>
                          {getStatusBadge(attrValue.status)}
                        </div>
                      );
                    } else if (attr.key === 'coverageLimit') {
                      const attrValue = value as typeof plan.coverageLimit;
                      displayValue = (
                        <div className="flex items-center gap-2">
                          <span>{formatCoverageLimit(attrValue)}</span>
                          {getStatusBadge(attrValue.status)}
                        </div>
                      );
                    } else if (attr.key === 'waitingPeriod') {
                      const attrValue = value as typeof plan.waitingPeriod;
                      displayValue = (
                        <div className="flex items-center gap-2">
                          <span>{attrValue.value !== null ? `${attrValue.value} days` : 'Not disclosed'}</span>
                          {getStatusBadge(attrValue.status)}
                        </div>
                      );
                    }

                    return (
                      <td key={plan.id} className="px-6 py-4 text-sm text-gray-700">
                        {displayValue}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Exclusions and Limitations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{plan.name}</h3>
            
            {plan.exclusions.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-red-900 mb-2">Exclusions</h4>
                <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                  {plan.exclusions.map((exclusion, idx) => (
                    <li key={idx}>{exclusion}</li>
                  ))}
                </ul>
              </div>
            )}

            {plan.limitations.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-yellow-900 mb-2">Limitations</h4>
                <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                  {plan.limitations.map((limitation, idx) => (
                    <li key={idx}>{limitation}</li>
                  ))}
                </ul>
              </div>
            )}

            {plan.notIdealFor.length > 0 && (
              <div className="mb-4 bg-red-50 p-3 rounded">
                <h4 className="text-sm font-semibold text-red-900 mb-2">Not ideal if:</h4>
                <ul className="text-sm text-red-800 list-disc list-inside space-y-1">
                  {plan.notIdealFor.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500 mb-3">
                Source: {plan.source} • Verified: {plan.lastVerified}
              </div>
              <a
                href={plan.providerLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent(AnalyticsEvents.PROVIDER_CLICKED, { planId: plan.id, provider: plan.provider, context: 'comparison' })}
                className="block w-full text-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                Visit {plan.provider}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
