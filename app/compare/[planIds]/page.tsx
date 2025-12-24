import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ComparePlansClient from './ComparePlansClient';
import CompareActionButton from './CompareActionButton';

export const dynamic = 'force-dynamic';

export default async function ComparePlansPage({
  params,
}: {
  params: { planIds: string };
}) {
  const planSlugs = params.planIds.split('-vs-');
  
  if (planSlugs.length < 2 || planSlugs.length > 4) {
    notFound();
  }

  const plans = await prisma.plan.findMany({
    where: {
      slug: { in: planSlugs },
      isActive: true,
    },
    include: {
      provider: true,
      sources: true,
    },
  });

  if (plans.length !== planSlugs.length) {
    notFound();
  }

  const formatPrice = (plan: typeof plans[0]) => {
    if (plan.priceMonthly) {
      return `$${plan.priceMonthly.toFixed(2)}/mo`;
    }
    if (plan.priceAnnual) {
      return `$${plan.priceAnnual.toFixed(2)}/yr`;
    }
    return 'Not disclosed';
  };

  const formatEnum = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, ' ');
  };


  const comparisonFields = [
    { label: 'Provider', key: 'provider' },
    { label: 'Price', key: 'price' },
    { label: 'Payment Style', key: 'paymentStyle' },
    { label: 'Attorney Choice', key: 'attorneyChoice' },
    { label: 'Coverage Type', key: 'coverageType' },
    { label: 'Family Coverage', key: 'familyCoverage' },
    { label: 'Waiting Period', key: 'waitingPeriod' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/compare" className="text-blue-600 hover:underline">
          ← Back to Compare
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-8">Compare Plans</h1>

      <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
        <p className="text-sm text-yellow-800">
          <strong>Affiliate Disclosure:</strong> We may earn commissions from providers when you click through our links.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left p-4 font-semibold">Feature</th>
              {plans.map((plan) => (
                <th key={plan.id} className="text-left p-4 font-semibold">
                  <div>
                    <div className="font-bold text-lg">{plan.name}</div>
                    <div className="text-sm text-gray-600">{plan.provider.name}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonFields.map((field) => (
              <tr key={field.key} className="border-b border-gray-200">
                <td className="p-4 font-medium">{field.label}</td>
                {plans.map((plan) => (
                  <td key={plan.id} className="p-4">
                    {field.key === 'provider' && plan.provider.name}
                    {field.key === 'price' && formatPrice(plan)}
                    {field.key === 'paymentStyle' && formatEnum(plan.paymentStyle)}
                    {field.key === 'attorneyChoice' && formatEnum(plan.attorneyChoice)}
                    {field.key === 'coverageType' && formatEnum(plan.coverageType)}
                    {field.key === 'familyCoverage' && formatEnum(plan.familyCoverage)}
                    {field.key === 'waitingPeriod' &&
                      (plan.waitingPeriodDays !== null
                        ? `${plan.waitingPeriodDays} days`
                        : 'Not disclosed')}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-b border-gray-200">
              <td className="p-4 font-medium">Coverage Notes</td>
              {plans.map((plan) => (
                <td key={plan.id} className="p-4">
                  {plan.coverageNotes ? (
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                      {plan.coverageNotes}
                    </p>
                  ) : (
                    <span className="text-gray-400">Not disclosed</span>
                  )}
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-4 font-medium">Exclusions</td>
              {plans.map((plan) => (
                <td key={plan.id} className="p-4">
                  {plan.exclusionsNotes ? (
                    <div className="bg-red-50 border border-red-200 rounded p-3">
                      <p className="text-sm text-red-900 whitespace-pre-line">
                        {plan.exclusionsNotes}
                      </p>
                    </div>
                  ) : (
                    <span className="text-gray-400">Not disclosed</span>
                  )}
                </td>
              ))}
            </tr>
            <tr className="border-b-2 border-gray-300">
              <td className="p-4 font-medium">Action</td>
              {plans.map((plan) => (
                <td key={plan.id} className="p-4">
                  <CompareActionButton plan={plan} />
                </td>
              ))}
            </tr>
            <ComparePlansClient plans={plans} />
          </tbody>
        </table>
      </div>
    </div>
  );
}
