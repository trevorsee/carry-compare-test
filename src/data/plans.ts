export type PaymentType = 'Up-front' | 'Reimbursement';
export type AttorneyChoice = 'Network Only' | 'Any Attorney' | 'Network Preferred';

export interface PlanFeature {
  label: string;
  value: string | boolean | number;
  description?: string;
  isUnknown?: boolean;
}

export interface Plan {
  id: string;
  name: string;
  provider: string;
  price: number;
  period: 'monthly' | 'annual';
  paymentType: PaymentFeature;
  attorneyChoice: AttorneyFeature;
  stateAvailability: 'All 50' | 'Excludes NY, WA, NJ' | 'Regional';
  
  // Core coverage
  bailBond: PlanFeature;
  criminalDefense: PlanFeature;
  civilDefense: PlanFeature;
  
  // Qualitative data
  bestFor: string[];
  notIdealFor: string[];
  majorExclusions: string[];
  
  // Meta
  lastVerified: string;
  sourceUrl: string;
}

export interface PaymentFeature extends PlanFeature {
  value: PaymentType;
}

export interface AttorneyFeature extends PlanFeature {
  value: AttorneyChoice;
}

export const plans: Plan[] = [
  {
    id: 'defender-shield',
    name: 'Defender Shield Basic',
    provider: 'Defender Corp',
    price: 19.95,
    period: 'monthly',
    paymentType: {
      label: 'Payment Type',
      value: 'Up-front',
      description: 'Legal fees are paid directly by the provider. You don’t pay out of pocket.',
    },
    attorneyChoice: {
      label: 'Attorney Choice',
      value: 'Network Only',
      description: 'You must use an attorney from their approved list.',
    },
    stateAvailability: 'Excludes NY, WA, NJ',
    bailBond: {
      label: 'Bail Bond',
      value: '$25,000',
      description: 'Up to $25k for bail bond premium.',
    },
    criminalDefense: {
      label: 'Criminal Defense',
      value: 'Unlimited',
      description: '100% of defense costs covered.',
    },
    civilDefense: {
      label: 'Civil Defense',
      value: '$1,000,000',
      description: 'Coverage for civil damages and defense.',
    },
    bestFor: ['Budget conscious users', 'Those who want simple up-front coverage'],
    notIdealFor: ['Users who have a specific attorney in mind', 'Residents of NY/WA/NJ'],
    majorExclusions: [
      'Domestic violence incidents',
      'Incidents while under influence of alcohol',
      'Brandishing without threat'
    ],
    lastVerified: '2023-12-01',
    sourceUrl: 'https://example.com/defender-shield'
  },
  {
    id: 'guardian-plus',
    name: 'Guardian Plus',
    provider: 'Guardian Legal',
    price: 29.99,
    period: 'monthly',
    paymentType: {
      label: 'Payment Type',
      value: 'Reimbursement',
      description: 'You pay your lawyer, then submit receipts for reimbursement.',
    },
    attorneyChoice: {
      label: 'Attorney Choice',
      value: 'Any Attorney',
      description: 'Choose any licensed attorney in your state.',
    },
    stateAvailability: 'All 50',
    bailBond: {
      label: 'Bail Bond',
      value: '$50,000',
      description: 'Up to $50k coverage.',
    },
    criminalDefense: {
      label: 'Criminal Defense',
      value: '$500,000',
      description: 'Capped at $500k total defense cost.',
    },
    civilDefense: {
      label: 'Civil Defense',
      value: '$2,000,000',
      description: 'Higher limits for civil liability.',
    },
    bestFor: ['Users with a family lawyer', 'Travelers (50 state coverage)'],
    notIdealFor: ['Those with limited savings (must pay up front)', 'Users wanting unlimited defense caps'],
    majorExclusions: [
      'Incidents involving family members',
      'Negligent discharge',
      'Non-self-defense criminal acts'
    ],
    lastVerified: '2024-01-15',
    sourceUrl: 'https://example.com/guardian-plus'
  },
  {
    id: 'secure-life',
    name: 'Secure Life Elite',
    provider: 'Secure Life',
    price: 35.00,
    period: 'monthly',
    paymentType: {
      label: 'Payment Type',
      value: 'Up-front',
      description: 'Direct payment to attorney.',
    },
    attorneyChoice: {
      label: 'Attorney Choice',
      value: 'Network Preferred',
      description: 'No cap with network attorney; capped reimbursement for out-of-network.',
    },
    stateAvailability: 'Excludes NY, WA, NJ',
    bailBond: {
      label: 'Bail Bond',
      value: '$100,000',
      description: 'High limit bail coverage.',
    },
    criminalDefense: {
      label: 'Criminal Defense',
      value: 'Unlimited',
      description: 'Unlimited for network attorneys.',
    },
    civilDefense: {
      label: 'Civil Defense',
      value: 'Unlimited',
      description: 'Unlimited civil liability coverage.',
    },
    bestFor: ['Maximum coverage seekers', 'Those wanting flexibility but preferring network'],
    notIdealFor: ['Budget shoppers'],
    majorExclusions: [
      'Red flag law hearings (not disclosed)',
      'Appeals (partial coverage)',
    ],
    lastVerified: '2024-02-01',
    sourceUrl: 'https://example.com/secure-life'
  }
];
