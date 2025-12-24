import { prisma } from '@/lib/prisma';
import { Check, X, HelpCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function SideBySidePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const planIds = (typeof params.plans === 'string' ? params.plans : '').split(',').filter(Boolean);

  if (planIds.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold">No plans selected</h2>
        <Link href="/compare" className="text-blue-600 hover:underline mt-4 inline-block">
          Go back to compare
        </Link>
      </div>
    );
  }

  const plans = await prisma.plan.findMany({
    where: {
      id: { in: planIds },
    },
    include: {
      provider: true,
    },
  });

  // Sort plans by the order in planIds
  const sortedPlans = planIds
    .map(id => plans.find(p => p.id === id))
    .filter((p): p is typeof plans[0] => !!p);

  return (
    <div className="space-y-8">
      <div>
        <Link href="/compare" className="text-blue-600 hover:underline text-sm flex items-center gap-1 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to all plans
        </Link>
        <h1 className="text-2xl font-bold">Side-by-Side Comparison</h1>
      </div>

      <div className="overflow-x-auto border rounded-lg bg-white shadow-sm">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b">
              <th className="p-4 w-48 font-medium text-slate-500">Feature</th>
              {sortedPlans.map(plan => (
                <th key={plan.id} className="p-4 min-w-[200px] border-l">
                  <div className="font-bold text-lg text-slate-900">{plan.provider.name}</div>
                  <div className="text-slate-500 font-normal">{plan.name}</div>
                  <div className="mt-2 text-xl font-bold">${Number(plan.price_monthly)}<span className="text-xs font-normal text-slate-500">/mo</span></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {/* Payment Style */}
            <tr>
              <th className="p-4 font-medium text-slate-700 bg-slate-50/50">Payment Style</th>
              {sortedPlans.map(plan => (
                <td key={plan.id} className="p-4 border-l capitalize">
                   {plan.payment_style}
                </td>
              ))}
            </tr>
            
            {/* Attorney Choice */}
            <tr>
              <th className="p-4 font-medium text-slate-700 bg-slate-50/50">Attorney Choice</th>
              {sortedPlans.map(plan => (
                <td key={plan.id} className="p-4 border-l">
                   {plan.attorney_choice === 'yes' ? 'Any Attorney' : 
                    plan.attorney_choice === 'no' ? 'Network Only' : 'Limited Selection'}
                </td>
              ))}
            </tr>

            {/* Coverage Type */}
            <tr>
              <th className="p-4 font-medium text-slate-700 bg-slate-50/50">Coverage Type</th>
              {sortedPlans.map(plan => (
                <td key={plan.id} className="p-4 border-l capitalize">
                   {plan.coverage_type}
                </td>
              ))}
            </tr>

            {/* Annual Price */}
            <tr>
              <th className="p-4 font-medium text-slate-700 bg-slate-50/50">Annual Price</th>
              {sortedPlans.map(plan => (
                <td key={plan.id} className="p-4 border-l">
                   ${Number(plan.price_annual)}
                </td>
              ))}
            </tr>
            
            {/* Family Coverage */}
            <tr>
              <th className="p-4 font-medium text-slate-700 bg-slate-50/50">Family Coverage</th>
              {sortedPlans.map(plan => (
                <td key={plan.id} className="p-4 border-l capitalize">
                   {plan.family_coverage}
                </td>
              ))}
            </tr>

             {/* CTA */}
             <tr className="bg-slate-50">
              <th className="p-4"></th>
              {sortedPlans.map(plan => (
                <td key={plan.id} className="p-4 border-l">
                   <a 
                     href={plan.affiliate_url || plan.provider.website_url}
                     target="_blank"
                     className="block w-full text-center bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
                   >
                     {plan.cta_label || 'View Plan'}
                   </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
