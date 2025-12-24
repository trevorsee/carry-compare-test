'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { plans, PaymentType } from '@/data/plans';
import { PlanCard } from '@/components/PlanCard';
import { ComparisonTable } from '@/components/ComparisonTable';
import { Filters } from '@/components/Filters';
import { EducationalContent } from '@/components/EducationalContent';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, X } from 'lucide-react';
import { useAnalytics } from '@/lib/analytics';

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { trackEvent } = useAnalytics();

  // Initialize state from URL or defaults
  const [maxPrice, setMaxPrice] = useState<number>(() => {
    const p = searchParams.get('maxPrice');
    return p ? Number(p) : 50;
  });
  
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>(() => {
    const p = searchParams.get('paymentTypes');
    return p ? (p.split(',') as PaymentType[]) : ['Up-front', 'Reimbursement'];
  });

  const [stateFilter, setStateFilter] = useState<string>(() => {
    return searchParams.get('state') || 'ALL';
  });

  const [selectedPlanIds, setSelectedPlanIds] = useState<string[]>(() => {
    const p = searchParams.get('compare');
    return p ? p.split(',') : [];
  });

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('maxPrice', maxPrice.toString());
    if (paymentTypes.length > 0) params.set('paymentTypes', paymentTypes.join(','));
    if (stateFilter !== 'ALL') params.set('state', stateFilter);
    if (selectedPlanIds.length > 0) params.set('compare', selectedPlanIds.join(','));

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [maxPrice, paymentTypes, stateFilter, selectedPlanIds, router]);

  // Filter Logic
  const filteredPlans = useMemo(() => {
    return plans.filter(plan => {
      if (plan.price > maxPrice) return false;
      if (paymentTypes.length > 0 && !paymentTypes.includes(plan.paymentType.value)) return false;
      if (stateFilter !== 'ALL') {
         if (plan.stateAvailability.startsWith('Excludes')) {
             if (plan.stateAvailability.includes(stateFilter)) return false;
         }
      }
      return true;
    });
  }, [maxPrice, paymentTypes, stateFilter]);

  // Handlers
  const handleSetMaxPrice = (val: number) => {
    setMaxPrice(val);
    trackEvent({ action: 'filter_used', category: 'price', value: val });
  };

  const handleTogglePaymentType = (type: PaymentType) => {
    setPaymentTypes(prev => {
      const next = prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type];
      trackEvent({ action: 'filter_used', category: 'payment_type', label: next.join(',') });
      return next;
    });
  };

  const handleSetStateFilter = (state: string) => {
    setStateFilter(state);
    trackEvent({ action: 'filter_used', category: 'state', label: state });
  };

  const toggleCompare = (id: string) => {
    setSelectedPlanIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(p => p !== id);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 plans at a time.");
        return prev;
      }
      trackEvent({ action: 'compare_viewed', label: id });
      return [...prev, id];
    });
  };

  const selectedPlans = plans.filter(p => selectedPlanIds.includes(p.id));

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            <h1 className="text-2xl font-bold">CCW Plan Compare</h1>
          </div>
          <p className="text-slate-300 max-w-2xl">
            Find the right concealed carry legal protection. No legal advice, just clear data.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-6xl py-8">
        
        {/* Educational Section (JTBD #1) */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6 text-slate-800">Before you choose...</h2>
          <EducationalContent />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar (JTBD #2) */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <Filters 
                maxPrice={maxPrice}
                setMaxPrice={handleSetMaxPrice}
                paymentTypes={paymentTypes}
                togglePaymentType={handleTogglePaymentType}
                stateFilter={stateFilter}
                setStateFilter={handleSetStateFilter}
                onReset={() => {
                  setMaxPrice(100);
                  setPaymentTypes(['Up-front', 'Reimbursement']);
                  setStateFilter('ALL');
                }}
              />
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-800">
                <strong>Why these filters?</strong>
                <p className="mt-1">
                  Most buyers overpay for coverage they can&apos;t use. Filter by what matters: 
                  <strong> up-front payment</strong> vs reimbursement.
                </p>
              </div>
            </div>
          </aside>

          {/* Plan List */}
          <section className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                Available Plans ({filteredPlans.length})
              </h2>
            </div>
            
            {filteredPlans.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-500">No plans match your filters.</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setMaxPrice(100);
                    setPaymentTypes(['Up-front', 'Reimbursement']);
                    setStateFilter('ALL');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPlans.map(plan => (
                  <PlanCard 
                    key={plan.id} 
                    plan={plan} 
                    onCompare={toggleCompare}
                    isSelectedForCompare={selectedPlanIds.includes(plan.id)}
                  />
                ))}
              </div>
            )}
            
            {/* Comparison Section (JTBD #3) */}
            {selectedPlans.length > 0 && (
              <div className="mt-12 scroll-mt-12" id="comparison">
                <div className="flex justify-between items-end mb-6">
                  <div>
                     <h2 className="text-2xl font-bold text-slate-900 mb-2">Comparison</h2>
                     <p className="text-slate-600">
                       Comparing {selectedPlans.length} plans side-by-side.
                     </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedPlanIds([])} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <X className="w-4 h-4 mr-2" />
                    Clear Comparison
                  </Button>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm">
                   <ComparisonTable plans={selectedPlans} />
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Floating Compare Bar (Mobile/General convenience) */}
      {selectedPlans.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 lg:hidden">
          <div className="flex justify-between items-center container mx-auto px-4">
             <span className="font-semibold text-slate-900">{selectedPlans.length} plans selected</span>
             <Button 
               onClick={() => {
                 document.getElementById('comparison')?.scrollIntoView({ behavior: 'smooth' });
               }}
             >
               View Comparison
             </Button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
        <div className="container mx-auto px-4 text-sm text-center">
          <p className="mb-4">
            <strong>Disclaimer:</strong> This site does not provide legal advice. Plan details are summarized for comparison and may have changed since our last verification. 
            Always read the official policy documents from the provider before purchasing.
          </p>
          <p>
            Some links on this site may be affiliate links, meaning we may earn a commission if you purchase through them, at no extra cost to you. 
            This helps support our independent research.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
