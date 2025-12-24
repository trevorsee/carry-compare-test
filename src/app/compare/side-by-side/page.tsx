import { Metadata } from 'next';
import Link from 'next/link';
import prisma from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  ExternalLink, 
  Check, 
  X, 
  HelpCircle,
  Info 
} from 'lucide-react';
import {
  formatPrice,
  formatPaymentStyle,
  formatAttorneyChoice,
  formatCoverageType,
  formatFamilyCoverage,
  formatWaitingPeriod,
  getScoreColor,
  parseJSON,
  cn,
} from '@/lib/utils';
import type { PlanWithProvider, LimitsData } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Side-by-Side Plan Comparison',
  description: 'Compare CCW legal protection plans side-by-side with detailed breakdowns.',
};

interface Props {
  searchParams: Promise<{ plans?: string }>;
}

async function getPlans(slugs: string[]): Promise<PlanWithProvider[]> {
  if (slugs.length === 0) return [];
  
  const plans = await prisma.plan.findMany({
    where: {
      slug: { in: slugs },
      isActive: true,
    },
    include: {
      provider: true,
      sources: true,
    },
  });
  
  // Sort to match the order of slugs
  return slugs
    .map((slug) => plans.find((p) => p.slug === slug))
    .filter((p): p is PlanWithProvider => p !== undefined);
}

function StatusIcon({ status }: { status: string }) {
  if (status === 'yes' || status === 'upfront' || status === 'both') {
    return <Check className="h-5 w-5 text-green-600" />;
  }
  if (status === 'no' || status === 'unknown') {
    return <X className="h-5 w-5 text-red-500" />;
  }
  return <HelpCircle className="h-5 w-5 text-yellow-500" />;
}

function CompareRow({ 
  label, 
  values, 
  highlight = false 
}: { 
  label: string; 
  values: (string | React.ReactNode)[]; 
  highlight?: boolean;
}) {
  return (
    <tr className={cn(highlight && 'bg-blue-50')}>
      <td className="py-3 px-4 font-medium text-gray-700 border-r border-gray-200">
        {label}
      </td>
      {values.map((value, i) => (
        <td key={i} className="py-3 px-4 text-center border-r border-gray-200 last:border-r-0">
          {value}
        </td>
      ))}
    </tr>
  );
}

export default async function SideBySidePage({ searchParams }: Props) {
  const params = await searchParams;
  const planSlugs = params.plans?.split(',').filter(Boolean) || [];
  const plans = await getPlans(planSlugs);

  if (plans.length < 2) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Select Plans to Compare
          </h1>
          <p className="text-gray-600 mb-8">
            Please select at least 2 plans from the comparison table to view them side-by-side.
          </p>
          <Button asChild>
            <Link href="/compare">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Comparison
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const colWidth = `${100 / (plans.length + 1)}%`;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link 
            href="/compare" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to all plans
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Compare {plans.length} Plans
          </h1>
        </div>
      </div>

      {/* Disclosure */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800 mb-6">
        <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Affiliate Disclosure:</strong> We may receive compensation when you click provider links. 
          See our <Link href="/disclosure" className="underline">full disclosure</Link>.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          {/* Plan Headers */}
          <thead className="bg-gray-50">
            <tr>
              <th className="py-4 px-4 text-left border-r border-gray-200" style={{ width: colWidth }}>
                <span className="sr-only">Feature</span>
              </th>
              {plans.map((plan) => (
                <th key={plan.id} className="py-4 px-4 border-r border-gray-200 last:border-r-0" style={{ width: colWidth }}>
                  <div className="text-center">
                    <Link href={`/plans/${plan.slug}`} className="font-semibold text-gray-900 hover:text-blue-600">
                      {plan.name}
                    </Link>
                    <div className="text-sm text-gray-500">{plan.provider.name}</div>
                    {plan.isFeatured && (
                      <Badge variant="default" className="mt-2">Featured</Badge>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {/* Score */}
            <CompareRow
              label="Overall Score"
              values={plans.map((p) => (
                <span key={p.id} className={cn('text-2xl font-bold', getScoreColor(p.overallScore))}>
                  {p.overallScore ?? 'N/A'}
                </span>
              ))}
              highlight
            />

            {/* Pricing Section */}
            <tr className="bg-gray-100">
              <td colSpan={plans.length + 1} className="py-2 px-4 font-semibold text-gray-900">
                Pricing
              </td>
            </tr>
            <CompareRow
              label="Monthly Price"
              values={plans.map((p) => formatPrice(p.priceMonthly, null))}
            />
            <CompareRow
              label="Annual Price"
              values={plans.map((p) => formatPrice(null, p.priceAnnual))}
            />

            {/* Coverage Section */}
            <tr className="bg-gray-100">
              <td colSpan={plans.length + 1} className="py-2 px-4 font-semibold text-gray-900">
                Coverage
              </td>
            </tr>
            <CompareRow
              label="Payment Style"
              values={plans.map((p) => (
                <div key={p.id} className="flex items-center justify-center gap-2">
                  <StatusIcon status={p.paymentStyle} />
                  <span>{formatPaymentStyle(p.paymentStyle)}</span>
                </div>
              ))}
              highlight
            />
            <CompareRow
              label="Coverage Type"
              values={plans.map((p) => formatCoverageType(p.coverageType))}
            />
            <CompareRow
              label="Attorney Choice"
              values={plans.map((p) => (
                <div key={p.id} className="flex items-center justify-center gap-2">
                  <StatusIcon status={p.attorneyChoice} />
                  <span>{formatAttorneyChoice(p.attorneyChoice)}</span>
                </div>
              ))}
              highlight
            />
            <CompareRow
              label="Family Coverage"
              values={plans.map((p) => (
                <div key={p.id} className="flex items-center justify-center gap-2">
                  <StatusIcon status={p.familyCoverage} />
                  <span>{formatFamilyCoverage(p.familyCoverage)}</span>
                </div>
              ))}
            />
            <CompareRow
              label="Waiting Period"
              values={plans.map((p) => formatWaitingPeriod(p.waitingPeriodDays))}
            />

            {/* Limits Section */}
            <tr className="bg-gray-100">
              <td colSpan={plans.length + 1} className="py-2 px-4 font-semibold text-gray-900">
                Coverage Limits
              </td>
            </tr>
            <CompareRow
              label="Criminal Defense"
              values={plans.map((p) => {
                const limits = parseJSON<LimitsData>(p.limitsJson, {});
                const value = limits.criminal;
                if (value === 'unlimited') return <span key={p.id} className="text-green-600 font-medium">Unlimited</span>;
                if (typeof value === 'number') return `$${value.toLocaleString()}`;
                return value || 'Not disclosed';
              })}
            />
            <CompareRow
              label="Civil Defense"
              values={plans.map((p) => {
                const limits = parseJSON<LimitsData>(p.limitsJson, {});
                const value = limits.civil;
                if (value === 'unlimited') return <span key={p.id} className="text-green-600 font-medium">Unlimited</span>;
                if (typeof value === 'number') {
                  if (value === 0) return <span key={p.id} className="text-red-500">Not included</span>;
                  return `$${value.toLocaleString()}`;
                }
                return value || 'Not disclosed';
              })}
            />
            <CompareRow
              label="Bail Bond"
              values={plans.map((p) => {
                const limits = parseJSON<LimitsData>(p.limitsJson, {});
                const value = limits.bail;
                if (typeof value === 'number') return `$${value.toLocaleString()}`;
                return value || 'Not disclosed';
              })}
            />

            {/* Best For / Not Ideal */}
            <tr className="bg-gray-100">
              <td colSpan={plans.length + 1} className="py-2 px-4 font-semibold text-gray-900">
                Summary
              </td>
            </tr>
            <CompareRow
              label="Best For"
              values={plans.map((p) => (
                <span key={p.id} className="text-sm text-left block">
                  {p.bestFor || 'Not specified'}
                </span>
              ))}
            />
            <CompareRow
              label="Not Ideal If"
              values={plans.map((p) => (
                <span key={p.id} className="text-sm text-left block text-gray-600">
                  {p.notIdealIf || 'Not specified'}
                </span>
              ))}
            />

            {/* Pros */}
            <CompareRow
              label="Pros"
              values={plans.map((p) => {
                const pros = parseJSON<string[]>(p.prosJson, []);
                return (
                  <ul key={p.id} className="text-sm text-left space-y-1">
                    {pros.slice(0, 4).map((pro, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                );
              })}
            />

            {/* Cons */}
            <CompareRow
              label="Cons"
              values={plans.map((p) => {
                const cons = parseJSON<string[]>(p.consJson, []);
                return (
                  <ul key={p.id} className="text-sm text-left space-y-1">
                    {cons.slice(0, 4).map((con, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                );
              })}
            />

            {/* CTA Row */}
            <tr className="bg-gray-50">
              <td className="py-4 px-4 border-r border-gray-200"></td>
              {plans.map((plan) => (
                <td key={plan.id} className="py-4 px-4 text-center border-r border-gray-200 last:border-r-0">
                  <div className="space-y-2">
                    <Button asChild className="w-full">
                      <a 
                        href={plan.affiliateUrl || plan.provider.websiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer sponsored"
                      >
                        {plan.ctaLabel}
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </Button>
                    <Button variant="outline" asChild className="w-full">
                      <Link href={`/plans/${plan.slug}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
