import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PlanDetailClient from './PlanDetailClient';

export const dynamic = 'force-dynamic';

export default async function PlanDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const plan = await prisma.plan.findUnique({
    where: {
      slug: params.slug,
      isActive: true,
    },
    include: {
      provider: true,
      sources: {
        orderBy: {
          capturedAt: 'desc',
        },
      },
      changeLogs: {
        orderBy: {
          changedAt: 'desc',
        },
        take: 10,
      },
    },
  });

  if (!plan) {
    notFound();
  }

  const formatPrice = () => {
    if (plan.priceMonthly) {
      return `$${plan.priceMonthly.toFixed(2)}/month`;
    }
    if (plan.priceAnnual) {
      return `$${plan.priceAnnual.toFixed(2)}/year`;
    }
    return 'Not disclosed';
  };

  const formatEnum = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, ' ');
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/compare" className="text-blue-600 hover:underline">
          ← Back to Compare
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{plan.name}</h1>
            <p className="text-xl text-gray-600">{plan.provider.name}</p>
          </div>
          {plan.provider.logoUrl && (
            <img
              src={plan.provider.logoUrl}
              alt={plan.provider.name}
              className="h-16 w-auto"
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Key Facts</h2>
            <dl className="space-y-3">
              <div>
                <dt className="font-medium">Price</dt>
                <dd className="text-gray-600">{formatPrice()}</dd>
              </div>
              <div>
                <dt className="font-medium">Payment Style</dt>
                <dd className="text-gray-600">{formatEnum(plan.paymentStyle)}</dd>
              </div>
              <div>
                <dt className="font-medium">Attorney Choice</dt>
                <dd className="text-gray-600">{formatEnum(plan.attorneyChoice)}</dd>
              </div>
              <div>
                <dt className="font-medium">Coverage Type</dt>
                <dd className="text-gray-600">{formatEnum(plan.coverageType)}</dd>
              </div>
              <div>
                <dt className="font-medium">Family Coverage</dt>
                <dd className="text-gray-600">{formatEnum(plan.familyCoverage)}</dd>
              </div>
              {plan.waitingPeriodDays !== null && (
                <div>
                  <dt className="font-medium">Waiting Period</dt>
                  <dd className="text-gray-600">{plan.waitingPeriodDays} days</dd>
                </div>
              )}
            </dl>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Summary</h2>
            {plan.provider.summaryShort && (
              <p className="text-gray-700 mb-4">{plan.provider.summaryShort}</p>
            )}
            <div className="space-y-2">
              <PlanDetailClient
                affiliateUrl={plan.affiliateUrl}
                providerWebsiteUrl={plan.provider.websiteUrl}
                ctaLabel={plan.ctaLabel}
                providerId={plan.provider.id}
                planId={plan.id}
              />
              <Link
                href={`/compare/${plan.slug}`}
                className="block w-full text-center border border-gray-300 px-6 py-3 rounded hover:bg-gray-50"
              >
                Compare with Others
              </Link>
            </div>
          </div>
        </div>

        {plan.coverageNotes && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Coverage Details</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">{plan.coverageNotes}</p>
            </div>
          </div>
        )}

        {plan.exclusionsNotes && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Exclusions & Important Notes</h2>
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <div className="prose max-w-none">
                <p className="text-red-900 whitespace-pre-line">{plan.exclusionsNotes}</p>
              </div>
            </div>
          </div>
        )}

        {plan.limitsJson && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Coverage Limits</h2>
            <div className="bg-gray-50 rounded p-4">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(plan.limitsJson, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {plan.sources.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Sources</h2>
            <ul className="space-y-2">
              {plan.sources.map((source) => (
                <li key={source.id}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {source.title || source.url}
                  </a>
                  {source.note && (
                    <span className="text-sm text-gray-600 ml-2">— {source.note}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-600">
            <strong>Last verified:</strong>{' '}
            {plan.lastVerifiedAt
              ? new Date(plan.lastVerifiedAt).toLocaleDateString()
              : 'Not verified'}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Affiliate Disclosure:</strong> We may earn commissions from providers when you 
            click through our links. This does not affect our editorial independence.
          </p>
        </div>
      </div>
    </div>
  );
}
