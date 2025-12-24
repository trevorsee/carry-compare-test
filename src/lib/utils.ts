import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return 'Not disclosed';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPrice(monthly: number | null, annual: number | null): string {
  if (monthly) {
    return `${formatCurrency(monthly)}/mo`;
  }
  if (annual) {
    return `${formatCurrency(annual)}/yr`;
  }
  return 'Contact for pricing';
}

export function formatPaymentStyle(style: string): string {
  const styles: Record<string, string> = {
    upfront: 'Up-front',
    reimbursement: 'Reimbursement',
    mixed: 'Mixed',
    unknown: 'Not disclosed',
  };
  return styles[style] || style;
}

export function formatAttorneyChoice(choice: string): string {
  const choices: Record<string, string> = {
    yes: 'Full choice',
    limited: 'Network only',
    no: 'Assigned',
    unknown: 'Not disclosed',
  };
  return choices[choice] || choice;
}

export function formatCoverageType(type: string): string {
  const types: Record<string, string> = {
    criminal: 'Criminal only',
    civil: 'Civil only',
    both: 'Criminal & Civil',
    unknown: 'Not disclosed',
  };
  return types[type] || type;
}

export function formatFamilyCoverage(coverage: string): string {
  const coverages: Record<string, string> = {
    yes: 'Included',
    limited: 'Available',
    no: 'Not available',
    unknown: 'Not disclosed',
  };
  return coverages[coverage] || coverage;
}

export function formatWaitingPeriod(days: number | null): string {
  if (days === null || days === undefined) return 'Not disclosed';
  if (days === 0) return 'None';
  if (days === 1) return '1 day';
  return `${days} days`;
}

export function getScoreColor(score: number | null): string {
  if (score === null) return 'text-gray-500';
  if (score >= 90) return 'text-green-600';
  if (score >= 80) return 'text-green-500';
  if (score >= 70) return 'text-yellow-600';
  if (score >= 60) return 'text-orange-500';
  return 'text-red-500';
}

export function getScoreBgColor(score: number | null): string {
  if (score === null) return 'bg-gray-100';
  if (score >= 90) return 'bg-green-100';
  if (score >= 80) return 'bg-green-50';
  if (score >= 70) return 'bg-yellow-50';
  if (score >= 60) return 'bg-orange-50';
  return 'bg-red-50';
}

export function parseJSON<T>(json: string | null | undefined, defaultValue: T): T {
  if (!json) return defaultValue;
  try {
    return JSON.parse(json) as T;
  } catch {
    return defaultValue;
  }
}
