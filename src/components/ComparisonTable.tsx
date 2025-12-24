import React from 'react';
import { Plan } from '@/data/plans';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle } from 'lucide-react';

interface ComparisonTableProps {
  plans: Plan[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ plans }) => {
  if (plans.length === 0) return null;

  return (
    <div className="overflow-x-auto border rounded-xl border-slate-200">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="p-4 w-48 font-semibold text-slate-700">Feature</th>
            {plans.map(plan => (
              <th key={plan.id} className="p-4 font-bold text-slate-900 min-w-[200px]">
                {plan.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {/* Price Row */}
          <tr>
            <td className="p-4 font-medium text-slate-700">Price</td>
            {plans.map(plan => (
              <td key={plan.id} className="p-4 text-slate-900 font-bold">
                ${plan.price}/{plan.period}
              </td>
            ))}
          </tr>

          {/* Core Features */}
          <tr>
            <td className="p-4 font-medium text-slate-700">Payment Type</td>
            {plans.map(plan => (
              <td key={plan.id} className="p-4">
                 <div className="flex flex-col gap-1">
                    <Badge variant={plan.paymentType.value === 'Up-front' ? 'success' : 'warning'}>
                      {plan.paymentType.value}
                    </Badge>
                    <span className="text-xs text-slate-500">{plan.paymentType.description}</span>
                 </div>
              </td>
            ))}
          </tr>

           <tr>
            <td className="p-4 font-medium text-slate-700">Attorney Choice</td>
            {plans.map(plan => (
              <td key={plan.id} className="p-4">
                 <div className="flex flex-col gap-1">
                    <span className="font-medium">{plan.attorneyChoice.value}</span>
                    <span className="text-xs text-slate-500">{plan.attorneyChoice.description}</span>
                 </div>
              </td>
            ))}
          </tr>

          {/* Limits */}
          <tr>
            <td className="p-4 font-medium text-slate-700 bg-slate-50/50" colSpan={plans.length + 1}>Coverage Limits</td>
          </tr>
          
          <tr>
            <td className="p-4 font-medium text-slate-700 pl-8">Bail Bond</td>
            {plans.map(plan => (
              <td key={plan.id} className="p-4 text-slate-700">{plan.bailBond.value}</td>
            ))}
          </tr>
          <tr>
             <td className="p-4 font-medium text-slate-700 pl-8">Criminal Defense</td>
            {plans.map(plan => (
              <td key={plan.id} className="p-4 text-slate-700">{plan.criminalDefense.value}</td>
            ))}
          </tr>
           <tr>
             <td className="p-4 font-medium text-slate-700 pl-8">Civil Defense</td>
            {plans.map(plan => (
              <td key={plan.id} className="p-4 text-slate-700">{plan.civilDefense.value}</td>
            ))}
          </tr>

          {/* Exclusions */}
          <tr>
            <td className="p-4 font-medium text-slate-700 align-top">
              <div className="flex items-center text-red-600 gap-2">
                <AlertTriangle className="w-4 h-4" />
                Key Exclusions
              </div>
            </td>
            {plans.map(plan => (
              <td key={plan.id} className="p-4 align-top">
                <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                  {plan.majorExclusions.map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>
          
          {/* Footer Actions */}
          <tr className="bg-slate-50">
            <td className="p-4"></td>
            {plans.map(plan => (
              <td key={plan.id} className="p-4">
                <a 
                  href={plan.sourceUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="block w-full text-center py-2 px-4 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-800"
                >
                  View Plan
                </a>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
