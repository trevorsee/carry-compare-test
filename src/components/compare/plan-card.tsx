'use client';

import Link from 'next/link';
import { Check, X, HelpCircle, Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useCompareStore } from '@/lib/store';
import { trackCompareAdd, trackCompareRemove, trackOutboundClick } from '@/lib/analytics';
import {
  formatPrice,
  formatPaymentStyle,
  formatAttorneyChoice,
  formatCoverageType,
  formatFamilyCoverage,
  formatWaitingPeriod,
  getScoreColor,
  cn,
} from '@/lib/utils';
import type { PlanWithProvider } from '@/lib/types';

interface PlanCardProps {
  plan: PlanWithProvider;
  index: number;
  view?: 'table' | 'card';
}

function StatusIcon({ status }: { status: string }) {
  if (status === 'yes' || status === 'upfront' || status === 'both') {
    return <Check className="h-4 w-4 text-green-600" />;
  }
  if (status === 'no' || status === 'unknown') {
    return <X className="h-4 w-4 text-red-500" />;
  }
  return <HelpCircle className="h-4 w-4 text-yellow-500" />;
}

export function PlanCard({ plan, index, view = 'card' }: PlanCardProps) {
  const { addPlan, removePlan, isSelected, selectedPlans } = useCompareStore();
  const selected = isSelected(plan.id);
  const canAdd = selectedPlans.length < 4;

  const handleCompareToggle = () => {
    if (selected) {
      removePlan(plan.id);
      trackCompareRemove(plan.id);
    } else if (canAdd) {
      addPlan({
        id: plan.id,
        name: plan.name,
        providerName: plan.provider.name,
        slug: plan.slug,
      });
      trackCompareAdd(plan.id, plan.providerId, plan.provider.name);
    }
  };

  const handleOutboundClick = () => {
    trackOutboundClick(plan.providerId, plan.id, 'table', index, plan.ctaLabel);
  };

  if (view === 'table') {
    return (
      <tr className={cn('border-b border-gray-100 hover:bg-gray-50 transition-colors', plan.isFeatured && 'bg-blue-50/50')}>
        <td className="py-4 px-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selected}
              onChange={handleCompareToggle}
              disabled={!selected && !canAdd}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              aria-label={`Compare ${plan.name}`}
            />
            <div>
              <div className="flex items-center gap-2">
                <Link href={`/plans/${plan.slug}`} className="font-medium text-gray-900 hover:text-blue-600">
                  {plan.name}
                </Link>
                {plan.isFeatured && (
                  <Badge variant="default" className="text-xs">
                    <Star className="h-3 w-3 mr-1" /> Featured
                  </Badge>
                )}
              </div>
              <Link href={`/providers/${plan.provider.slug}`} className="text-sm text-gray-500 hover:text-blue-600">
                {plan.provider.name}
              </Link>
            </div>
          </div>
        </td>
        <td className="py-4 px-4">
          <div className="font-medium text-gray-900">{formatPrice(plan.priceMonthly, plan.priceAnnual)}</div>
          {plan.priceAnnual && plan.priceMonthly && (
            <div className="text-xs text-gray-500">{formatPrice(null, plan.priceAnnual)}</div>
          )}
        </td>
        <td className="py-4 px-4">
          <div className="flex items-center gap-1.5">
            <StatusIcon status={plan.paymentStyle} />
            <span className="text-sm">{formatPaymentStyle(plan.paymentStyle)}</span>
          </div>
        </td>
        <td className="py-4 px-4">
          <div className="flex items-center gap-1.5">
            <StatusIcon status={plan.attorneyChoice} />
            <span className="text-sm">{formatAttorneyChoice(plan.attorneyChoice)}</span>
          </div>
        </td>
        <td className="py-4 px-4">
          <span className="text-sm">{formatCoverageType(plan.coverageType)}</span>
        </td>
        <td className="py-4 px-4">
          <div className="flex items-center gap-1.5">
            <StatusIcon status={plan.familyCoverage} />
            <span className="text-sm">{formatFamilyCoverage(plan.familyCoverage)}</span>
          </div>
        </td>
        <td className="py-4 px-4">
          <span className="text-sm">{formatWaitingPeriod(plan.waitingPeriodDays)}</span>
        </td>
        <td className="py-4 px-4">
          {plan.overallScore !== null && (
            <div className={cn('font-bold text-lg', getScoreColor(plan.overallScore))}>
              {plan.overallScore}
            </div>
          )}
        </td>
        <td className="py-4 px-4">
          <Button
            size="sm"
            onClick={handleOutboundClick}
            asChild
          >
            <a href={plan.affiliateUrl || plan.provider.websiteUrl} target="_blank" rel="noopener noreferrer sponsored">
              {plan.ctaLabel}
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </Button>
        </td>
      </tr>
    );
  }

  // Card view for mobile
  return (
    <Card className={cn('overflow-hidden', plan.isFeatured && 'ring-2 ring-blue-500')}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              <Link href={`/plans/${plan.slug}`} className="font-semibold text-gray-900 hover:text-blue-600">
                {plan.name}
              </Link>
              {plan.isFeatured && (
                <Badge variant="default" className="text-xs">
                  <Star className="h-3 w-3 mr-1" /> Featured
                </Badge>
              )}
            </div>
            <Link href={`/providers/${plan.provider.slug}`} className="text-sm text-gray-500 hover:text-blue-600">
              {plan.provider.name}
            </Link>
          </div>
          {plan.overallScore !== null && (
            <div className={cn('font-bold text-2xl', getScoreColor(plan.overallScore))}>
              {plan.overallScore}
            </div>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="text-2xl font-bold text-gray-900">{formatPrice(plan.priceMonthly, plan.priceAnnual)}</div>
          {plan.priceAnnual && plan.priceMonthly && (
            <div className="text-sm text-gray-500">or {formatPrice(null, plan.priceAnnual)}</div>
          )}
        </div>

        {/* Key features */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <StatusIcon status={plan.paymentStyle} />
            <span>{formatPaymentStyle(plan.paymentStyle)}</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusIcon status={plan.attorneyChoice} />
            <span>{formatAttorneyChoice(plan.attorneyChoice)}</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusIcon status={plan.coverageType === 'both' ? 'yes' : plan.coverageType} />
            <span>{formatCoverageType(plan.coverageType)}</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusIcon status={plan.familyCoverage} />
            <span>{formatFamilyCoverage(plan.familyCoverage)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant={selected ? 'secondary' : 'outline'}
            size="sm"
            onClick={handleCompareToggle}
            disabled={!selected && !canAdd}
            className="flex-1"
          >
            {selected ? 'Remove' : 'Compare'}
          </Button>
          <Button size="sm" className="flex-1" onClick={handleOutboundClick} asChild>
            <a href={plan.affiliateUrl || plan.provider.websiteUrl} target="_blank" rel="noopener noreferrer sponsored">
              {plan.ctaLabel}
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}
