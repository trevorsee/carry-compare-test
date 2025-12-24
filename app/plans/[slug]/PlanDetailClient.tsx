'use client';

import { trackOutboundClick } from '@/lib/analytics';

interface PlanDetailClientProps {
  affiliateUrl: string | null;
  providerWebsiteUrl: string | null;
  ctaLabel: string | null;
  providerId: string;
  planId: string;
}

export default function PlanDetailClient({
  affiliateUrl,
  providerWebsiteUrl,
  ctaLabel,
  providerId,
  planId,
}: PlanDetailClientProps) {
  const handleOutboundClick = () => {
    trackOutboundClick({
      provider_id: providerId,
      plan_id: planId,
      placement: 'provider',
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
      cta_label: ctaLabel || 'Visit Provider',
    });

    const url = affiliateUrl || providerWebsiteUrl || '#';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleOutboundClick}
      className="w-full bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-medium"
    >
      {ctaLabel || 'Visit Provider'}
    </button>
  );
}
