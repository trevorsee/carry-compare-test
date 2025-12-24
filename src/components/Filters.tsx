import React from 'react';
import { PaymentType } from '@/data/plans';
import { Button } from './ui/Button';

interface FiltersProps {
  maxPrice: number;
  setMaxPrice: (val: number) => void;
  paymentTypes: PaymentType[];
  togglePaymentType: (type: PaymentType) => void;
  stateFilter: string;
  setStateFilter: (state: string) => void;
  onReset: () => void;
}

export const Filters: React.FC<FiltersProps> = ({
  maxPrice,
  setMaxPrice,
  paymentTypes,
  togglePaymentType,
  stateFilter,
  setStateFilter,
  onReset
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-6">
      <div>
        <h3 className="font-semibold text-slate-900 mb-4">Filters</h3>
        
        {/* Price Filter */}
        <div className="mb-6">
          <label className="text-sm font-medium text-slate-700 mb-2 block">
            Max Monthly Price: ${maxPrice}
          </label>
          <input 
            type="range" 
            min="10" 
            max="100" 
            step="5" 
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
          />
        </div>

        {/* Payment Type */}
        <div className="mb-6">
          <label className="text-sm font-medium text-slate-700 mb-2 block">
            Payment Type
          </label>
          <div className="space-y-2">
            {['Up-front', 'Reimbursement'].map((type) => (
              <label key={type} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentTypes.includes(type as PaymentType)}
                  onChange={() => togglePaymentType(type as PaymentType)}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <span className="text-sm text-slate-600">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* State Filter - Simplified */}
        <div className="mb-6">
           <label className="text-sm font-medium text-slate-700 mb-2 block">
            Your State
          </label>
          <select 
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 text-sm p-2 border"
          >
            <option value="ALL">Any State</option>
            <option value="NY">New York</option>
            <option value="WA">Washington</option>
            <option value="NJ">New Jersey</option>
            <option value="OTHER">Other</option>
          </select>
          <p className="text-xs text-slate-500 mt-1">
            * NY, WA, and NJ have restrictive laws for these plans.
          </p>
        </div>

        <Button 
          variant="outline" 
          className="w-full"
          onClick={onReset}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};
