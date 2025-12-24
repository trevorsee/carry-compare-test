'use client';

import { useState } from 'react';
import { Plan, Provider } from '@prisma/client';
import { Check, X, HelpCircle, ArrowUpDown } from 'lucide-react';

type PlanWithProvider = Plan & { provider: Provider };

interface ComparisonTableProps {
  initialPlans: PlanWithProvider[];
}

export function ComparisonTable({ initialPlans }: ComparisonTableProps) {
  const [plans, setPlans] = useState(initialPlans);
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  
  // Sort state
  const [sortField, setSortField] = useState<keyof Plan | 'price'>('overall_score');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof Plan | 'price') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc'); // Default to desc for score, maybe asc for price?
      if (field === 'price_monthly' || field === 'price') {
         setSortDirection('asc');
      }
    }
  };

  const sortedPlans = [...plans].sort((a, b) => {
    const dir = sortDirection === 'asc' ? 1 : -1;
    if (sortField === 'price') {
       return (Number(a.price_monthly) - Number(b.price_monthly)) * dir;
    }
    // @ts-ignore
    if (a[sortField] > b[sortField]) return 1 * dir;
    // @ts-ignore
    if (a[sortField] < b[sortField]) return -1 * dir;
    return 0;
  });

  const toggleSelection = (id: string) => {
    if (selectedPlans.includes(id)) {
      setSelectedPlans(selectedPlans.filter(p => p !== id));
    } else {
      if (selectedPlans.length < 4) {
        setSelectedPlans([...selectedPlans, id]);
      }
    }
  };

  return (
    <div className="pb-24">
      <div className="overflow-x-auto border rounded-lg bg-white shadow-sm">
        <table className="w-full text-sm text-left">
           <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
             <tr>
               <th className="px-6 py-3 cursor-pointer hover:bg-slate-100" onClick={() => handleSort('name')}>
                 Plan
               </th>
               <th className="px-6 py-3 cursor-pointer hover:bg-slate-100" onClick={() => handleSort('price')}>
                 <div className="flex items-center gap-1">Price <ArrowUpDown className="w-3 h-3"/></div>
               </th>
               <th className="px-6 py-3">Payment Style</th>
               <th className="px-6 py-3">Attorney Choice</th>
               <th className="px-6 py-3">Coverage Type</th>
               <th className="px-6 py-3 text-center">Compare</th>
               <th className="px-6 py-3"></th>
             </tr>
           </thead>
           <tbody>
             {sortedPlans.map(plan => (
               <tr key={plan.id} className="border-b hover:bg-slate-50 transition-colors">
                 <td className="px-6 py-4 font-medium text-slate-900">
                   <div className="flex items-center gap-3">
                     <div>
                       <div className="font-bold text-base">{plan.provider.name}</div>
                       <div className="text-slate-500 font-normal">{plan.name}</div>
                     </div>
                   </div>
                 </td>
                 <td className="px-6 py-4">
                   <div className="font-semibold text-base">${Number(plan.price_monthly)}/mo</div>
                   <div className="text-xs text-slate-500">${Number(plan.price_annual)}/yr</div>
                 </td>
                 <td className="px-6 py-4">
                   <Badge>{plan.payment_style}</Badge>
                 </td>
                 <td className="px-6 py-4">
                   {plan.attorney_choice === 'yes' ? 
                    <div className="flex items-center gap-2 text-green-700"><Check className="w-4 h-4" /> Any Attorney</div> : 
                    plan.attorney_choice === 'no' ? 
                    <div className="flex items-center gap-2 text-slate-500"><X className="w-4 h-4" /> Network Only</div> : 
                    <div className="flex items-center gap-2 text-orange-600"><HelpCircle className="w-4 h-4" /> Limited</div>}
                 </td>
                 <td className="px-6 py-4">
                    <span className="capitalize">{plan.coverage_type}</span>
                 </td>
                 <td className="px-6 py-4 text-center">
                   <input 
                     type="checkbox" 
                     checked={selectedPlans.includes(plan.id)}
                     onChange={() => toggleSelection(plan.id)}
                     className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                   />
                 </td>
                 <td className="px-6 py-4 text-right">
                   <a 
                     href={plan.affiliate_url || plan.provider.website_url} 
                     target="_blank" 
                     rel="nofollow noreferrer"
                     className="inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                   >
                     {plan.cta_label || 'View'}
                   </a>
                 </td>
               </tr>
             ))}
           </tbody>
        </table>
      </div>
      
      {/* Compare Tray */}
      {selectedPlans.length > 0 && (
         <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 z-50 animate-in slide-in-from-bottom-5">
           <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
             <div className="flex flex-wrap gap-3">
               <span className="text-sm font-medium text-slate-500 self-center mr-2">Comparing:</span>
               {selectedPlans.map(id => {
                 const p = plans.find(x => x.id === id);
                 return (
                   <div key={id} className="bg-slate-100 px-3 py-1.5 rounded-full text-sm flex items-center gap-2 border">
                     <span className="font-semibold">{p?.provider.name}</span>
                     <span className="text-slate-500">{p?.name}</span>
                     <button onClick={() => toggleSelection(id)} className="hover:text-red-500 ml-1"><X className="w-3.5 h-3.5" /></button>
                   </div>
                 )
               })}
             </div>
             <div className="flex items-center gap-3">
               <button 
                 className="text-sm text-slate-500 hover:text-slate-900"
                 onClick={() => setSelectedPlans([])}
               >
                 Clear all
               </button>
               <a 
                 href={`/compare/side-by-side?plans=${selectedPlans.join(',')}`}
                 className={`bg-blue-900 text-white px-6 py-2.5 rounded-md font-medium hover:bg-blue-800 transition-colors ${selectedPlans.length < 2 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
               >
                 Compare Details
               </a>
             </div>
           </div>
         </div>
      )}
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  const color = 
    children === 'upfront' ? 'bg-green-100 text-green-800' :
    children === 'reimbursement' ? 'bg-orange-100 text-orange-800' :
    'bg-gray-100 text-gray-800';
    
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${color}`}>{children}</span>;
}
