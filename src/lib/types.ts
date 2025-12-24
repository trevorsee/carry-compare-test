import type { Plan, Provider, Source } from '@prisma/client';

export type PlanWithProvider = Plan & {
  provider: Provider;
  sources: Source[];
};

export type ProviderWithPlans = Provider & {
  plans: Plan[];
};

export interface LimitsData {
  criminal?: number | string;
  civil?: number | string;
  bail?: number | string;
  appeals?: string;
  expertWitnesses?: string;
  familyMembers?: number;
  initialDeposit?: number;
  additional?: string;
}

export interface SupportFeature {
  name: string;
  included: boolean;
}

export type SortOption = {
  value: string;
  label: string;
};

export const SORT_OPTIONS: SortOption[] = [
  { value: 'overallScore', label: 'Overall Score' },
  { value: 'priceMonthly', label: 'Price (Low to High)' },
  { value: 'priceMonthlyDesc', label: 'Price (High to Low)' },
  { value: 'name', label: 'Plan Name' },
];

export type PresetFilter = {
  id: string;
  label: string;
  description: string;
  filter: Partial<{
    paymentStyle: string[];
    attorneyChoice: string[];
    familyCoverage: string[];
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  }>;
};

export const PRESET_FILTERS: PresetFilter[] = [
  {
    id: 'budget',
    label: 'Best Budget Pick',
    description: 'Affordable plans under $20/month',
    filter: { sortBy: 'priceMonthly', sortOrder: 'asc' },
  },
  {
    id: 'attorney-choice',
    label: 'Best for Attorney Choice',
    description: 'Plans with full attorney selection',
    filter: { attorneyChoice: ['yes'], sortBy: 'overallScore', sortOrder: 'desc' },
  },
  {
    id: 'upfront',
    label: 'Best for Up-Front Coverage',
    description: 'No out-of-pocket during legal process',
    filter: { paymentStyle: ['upfront'], sortBy: 'overallScore', sortOrder: 'desc' },
  },
  {
    id: 'families',
    label: 'Best for Families',
    description: 'Plans that cover spouse/partner',
    filter: { familyCoverage: ['yes', 'limited'], sortBy: 'overallScore', sortOrder: 'desc' },
  },
  {
    id: 'top-rated',
    label: 'Top Rated',
    description: 'Highest overall scores',
    filter: { sortBy: 'overallScore', sortOrder: 'desc' },
  },
];
