import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowLeft,
  ExternalLink,
  Check,
  X,
  AlertTriangle,
  Calendar,
  Link as LinkIcon,
  Star,
  Info,
} from 'lucide-react';
import {
  formatPrice,
  formatPaymentStyle,
  formatAttorneyChoice,
  formatCoverageType,
  formatFamilyCoverage,
  formatWaitingPeriod,
  getScoreColor,
  getScoreBgColor,
  parseJSON,
  cn,
} from '@/lib/utils';
import { format } from 'date-fns';
import type { PlanWithProvider, LimitsData } from '@/lib/types';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPlan(slug: string): Promise<PlanWithProvider | null> {
  const plan = await prisma.plan.findUnique({
    where: { slug },
    include: {
      provider: true,
      sources: true,
    },
  });
  return plan;
}

async function getAlternatives(plan: PlanWithProvider): Promise<PlanWithProvider[]> {
  const alternatives = await prisma.plan.findMany({
    where: {
      isActive: true,
      id: { not: plan.id },
      provider: { isActive: true },
    },
    include: {
      provider: true,
      sources: true,
    },
    orderBy: { overallScore: 'desc' },
    take: 3,
  });
  return alternatives;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const plan = await getPlan(slug);
  if (!plan) return { title: 'Plan Not Found' };

  return {
    title: `${plan.name} Review - ${plan.provider.name}`,
    description: `${plan.name} by ${plan.provider.name}: ${plan.bestFor || plan.provider.summaryShort}`,
  };
}

export async function generateStaticParams() {
  const plans = await prisma.plan.findMany({
    where: { isActive: true },
    select: { slug: true },
  });
  return plans.map((plan) => ({ slug: plan.slug }));
}

export default async function PlanPage({ params }: Props) {
  const { slug } = await params;
  const plan = await getPlan(slug);

  if (!plan) {
    notFound();
  }

  const alternatives = await getAlternatives(plan);
  const limits = parseJSON<LimitsData>(plan.limitsJson, {});
  const pros = parseJSON<string[]>(plan.prosJson, []);
  const cons = parseJSON<string[]>(plan.consJson, []);
  const supportFeatures = parseJSON<string[]>(plan.supportFeatures, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <Link
        href="/compare"
        className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to comparison
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{plan.name}</h1>
                {plan.isFeatured && (
                  <Badge variant="default">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              <Link
                href={`/providers/${plan.provider.slug}`}
                className="text-lg text-gray-600 hover:text-blue-600"
              >
                by {plan.provider.name}
              </Link>
            </div>
            {plan.overallScore !== null && (
              <div className={cn('text-center px-4 py-2 rounded-lg', getScoreBgColor(plan.overallScore))}>
                <div className={cn('text-4xl font-bold', getScoreColor(plan.overallScore))}>
                  {plan.overallScore}
                </div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
            )}
          </div>

          {/* TL;DR */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {plan.bestFor && (
                <div className="flex gap-3">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Best for:</div>
                    <div className="text-gray-600">{plan.bestFor}</div>
                  </div>
                </div>
              )}
              {plan.notIdealIf && (
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Not ideal if:</div>
                    <div className="text-gray-600">{plan.notIdealIf}</div>
                  </div>
                </div>
              )}

              {/* Pros & Cons */}
              <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Pros</h4>
                  <ul className="space-y-2">
                    {pros.map((pro, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Cons</h4>
                  <ul className="space-y-2">
                    {cons.map((con, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Facts Grid */}
          <Card>
            <CardHeader>
              <CardTitle>Key Facts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Price</div>
                  <div className="font-semibold text-gray-900">
                    {formatPrice(plan.priceMonthly, plan.priceAnnual)}
                  </div>
                  {plan.priceAnnual && plan.priceMonthly && (
                    <div className="text-xs text-gray-500">
                      or {formatPrice(null, plan.priceAnnual)}
                    </div>
                  )}
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Payment Style</div>
                  <div className="font-semibold text-gray-900">
                    {formatPaymentStyle(plan.paymentStyle)}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Attorney Choice</div>
                  <div className="font-semibold text-gray-900">
                    {formatAttorneyChoice(plan.attorneyChoice)}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Coverage Type</div>
                  <div className="font-semibold text-gray-900">
                    {formatCoverageType(plan.coverageType)}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Family Coverage</div>
                  <div className="font-semibold text-gray-900">
                    {formatFamilyCoverage(plan.familyCoverage)}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Waiting Period</div>
                  <div className="font-semibold text-gray-900">
                    {formatWaitingPeriod(plan.waitingPeriodDays)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coverage Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Coverage Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Criminal Defense</span>
                  <span className="font-medium">
                    {limits.criminal === 'unlimited' ? (
                      <span className="text-green-600">Unlimited</span>
                    ) : typeof limits.criminal === 'number' ? (
                      `$${limits.criminal.toLocaleString()}`
                    ) : (
                      limits.criminal || 'Not disclosed'
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Civil Defense</span>
                  <span className="font-medium">
                    {limits.civil === 'unlimited' ? (
                      <span className="text-green-600">Unlimited</span>
                    ) : limits.civil === 0 ? (
                      <span className="text-red-500">Not included</span>
                    ) : typeof limits.civil === 'number' ? (
                      `$${limits.civil.toLocaleString()}`
                    ) : (
                      limits.civil || 'Not disclosed'
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Bail Bond</span>
                  <span className="font-medium">
                    {typeof limits.bail === 'number' ? (
                      `$${limits.bail.toLocaleString()}`
                    ) : (
                      limits.bail || 'Not disclosed'
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Appeals</span>
                  <span className="font-medium">{limits.appeals || 'Not disclosed'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Expert Witnesses</span>
                  <span className="font-medium">{limits.expertWitnesses || 'Not disclosed'}</span>
                </div>
              </div>

              {plan.coverageNotes && (
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Coverage Details</h4>
                  <p className="text-gray-600 text-sm">{plan.coverageNotes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Support Features */}
          {supportFeatures.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Included Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {supportFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Exclusions */}
          {plan.exclusionsNotes && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Exclusions & Gotchas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{plan.exclusionsNotes}</p>
              </CardContent>
            </Card>
          )}

          {/* Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5" />
                Sources & Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Last verified:</span>
                <span className="font-medium">
                  {format(new Date(plan.lastVerifiedAt), 'MMMM d, yyyy')}
                </span>
              </div>

              {plan.sources.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Sources</h4>
                  <ul className="space-y-2">
                    {plan.sources.map((source) => (
                      <li key={source.id} className="text-sm">
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {source.title || source.url}
                        </a>
                        {source.note && (
                          <span className="text-gray-500 ml-2">— {source.note}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* CTA Card */}
          <Card className="sticky top-24">
            <CardContent className="pt-6">
              {/* Disclosure */}
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg text-xs text-blue-800 mb-4">
                <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>
                  Affiliate link.{' '}
                  <Link href="/disclosure" className="underline">
                    Learn more
                  </Link>
                </span>
              </div>

              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-gray-900">
                  {formatPrice(plan.priceMonthly, plan.priceAnnual)}
                </div>
                {plan.priceAnnual && plan.priceMonthly && (
                  <div className="text-sm text-gray-500">
                    or {formatPrice(null, plan.priceAnnual)}
                  </div>
                )}
              </div>

              <Button className="w-full mb-3" size="lg" asChild>
                <a
                  href={plan.affiliateUrl || plan.provider.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                >
                  {plan.ctaLabel}
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>

              <p className="text-xs text-gray-500 text-center">
                You&apos;ll be taken to {plan.provider.name}&apos;s website
              </p>
            </CardContent>
          </Card>

          {/* Alternatives */}
          {alternatives.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Compare With</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {alternatives.map((alt) => (
                  <Link
                    key={alt.id}
                    href={`/plans/${alt.slug}`}
                    className="block p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900">{alt.name}</div>
                        <div className="text-sm text-gray-500">{alt.provider.name}</div>
                        <div className="text-sm font-medium text-gray-900 mt-1">
                          {formatPrice(alt.priceMonthly, alt.priceAnnual)}
                        </div>
                      </div>
                      {alt.overallScore && (
                        <div className={cn('text-lg font-bold', getScoreColor(alt.overallScore))}>
                          {alt.overallScore}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}

                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/compare/side-by-side?plans=${plan.slug},${alternatives[0]?.slug || ''}`}>
                    Compare Side-by-Side
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
