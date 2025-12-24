'use client';

import { trackOutboundClick } from '@/lib/analytics';
import Link from 'next/link';

interface CompareActionButtonProps {
  plan: {
    id: string;
    slug: string;
    affiliateUrl: string | null;
    ctaLabel: string | null;
    provider: {
      id: string;
      websiteUrl: string | null;
    };
  };
}

export default function CompareActionButton({ plan }: CompareActionButtonProps) {
  const handleClick = () => {
    trackOutboundClick({
      provider_id: plan.provider.id,
      plan_id: plan.id,
      placement: 'compare',
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
      cta_label: plan.ctaLabel || 'Visit Provider',
    });

    const url = plan.affiliateUrl || plan.provider.websiteUrl || '#';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {plan.ctaLabel || 'Visit Provider'}
      </button>
      <Link
        href={`/plans/${plan.slug}`}
        className="block mt-2 text-blue-600 hover:underline text-sm"
      >
        View Details
      </Link>
    </>
  );
}
