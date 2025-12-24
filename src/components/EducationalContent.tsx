import React from 'react';
import { Shield, DollarSign, Scale } from 'lucide-react';

export const EducationalContent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <DollarSign className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="font-semibold text-slate-900 mb-2">Up-front vs. Reimbursement</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          <strong>Up-front</strong> plans pay the attorney directly, so you don&apos;t need cash on hand. 
          <strong> Reimbursement</strong> plans require you to pay the lawyer first, then the company pays you back.
        </p>
      </div>

      <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
         <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-4">
          <Scale className="w-5 h-5 text-purple-600" />
        </div>
        <h3 className="font-semibold text-slate-900 mb-2">Attorney Choice</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Some plans restrict you to a <strong>Network</strong> of lawyers. Others let you choose <strong>Any Attorney</strong> but might have lower caps. 
          Knowing your preference is key.
        </p>
      </div>

      <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
         <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-5 h-5 text-amber-600" />
        </div>
        <h3 className="font-semibold text-slate-900 mb-2">Bail & Civil Liability</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Criminal defense keeps you out of jail. <strong>Civil defense</strong> protects your assets from lawsuits. 
          Don&apos;t overlook bail bond coverage—it&apos;s your first expense.
        </p>
      </div>
    </div>
  );
};
