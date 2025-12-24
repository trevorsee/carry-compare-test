import React from 'react';
import { Plan } from '@/data/plans';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Check, X } from 'lucide-react';

interface PlanCardProps {
  plan: Plan;
  onCompare?: (planId: string) => void;
  isSelectedForCompare?: boolean;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, onCompare, isSelectedForCompare }) => {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden h-full">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
            <p className="text-sm text-slate-500">{plan.provider}</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-slate-900">${plan.price}</span>
            <span className="text-xs text-slate-500 block">/{plan.period}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant={plan.paymentType.value === 'Up-front' ? 'success' : 'warning'}>
            {plan.paymentType.value === 'Up-front' ? 'Up-front Pay' : 'Reimbursement'}
          </Badge>
          <Badge variant="outline">{plan.attorneyChoice.value}</Badge>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center">
              <Check className="w-4 h-4 mr-2 text-emerald-500" />
              Best For
            </h4>
            <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside pl-1">
              {plan.bestFor.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center">
              <X className="w-4 h-4 mr-2 text-red-500" />
              Not Ideal If
            </h4>
            <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside pl-1">
              {plan.notIdealFor.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
         <Button 
          variant={isSelectedForCompare ? "secondary" : "outline"} 
          className="flex-1"
          onClick={() => onCompare?.(plan.id)}
        >
          {isSelectedForCompare ? 'Selected' : 'Compare'}
        </Button>
        <Button className="flex-1" onClick={() => window.open(plan.sourceUrl, '_blank')}>
          View Details
        </Button>
      </div>
    </div>
  );
};
