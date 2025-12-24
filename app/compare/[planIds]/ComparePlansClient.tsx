'use client';

import { trackCompareView } from '@/lib/analytics';
import { useEffect } from 'react';

interface Plan {
  id: string;
}

interface ComparePlansClientProps {
  plans: Plan[];
}

// Hidden component just for tracking compare view
export default function ComparePlansClient({ plans }: ComparePlansClientProps) {
  useEffect(() => {
    trackCompareView(plans.map((p) => p.id));
  }, [plans]);

  return null;
}
