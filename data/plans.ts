import { Plan } from '@/lib/types';

// Sample plan data - in production, this would come from a database or API
export const plans: Plan[] = [
  {
    id: 'uscca-essential',
    name: 'USCCA Essential',
    provider: 'USCCA',
    description: 'Entry-level plan with core legal protection coverage.',
    monthlyPrice: { value: 22, status: 'disclosed', source: 'uscca.com', lastVerified: '2024-12-01' },
    annualPrice: { value: 247, status: 'disclosed', source: 'uscca.com', lastVerified: '2024-12-01' },
    paymentStyle: 'upfront',
    attorneyChoice: 'network',
    familyCoverage: { value: false, status: 'disclosed', source: 'uscca.com', lastVerified: '2024-12-01' },
    coverageLimit: { value: 100000, status: 'disclosed', source: 'uscca.com', lastVerified: '2024-12-01' },
    waitingPeriod: { value: 0, status: 'disclosed', source: 'uscca.com', lastVerified: '2024-12-01' },
    coversCivil: { value: true, status: 'disclosed', source: 'uscca.com', lastVerified: '2024-12-01' },
    coversCriminal: { value: true, status: 'disclosed', source: 'uscca.com', lastVerified: '2024-12-01' },
    coversBail: { value: true, status: 'disclosed', source: 'uscca.com', lastVerified: '2024-12-01' },
    coversExpertWitness: { value: true, status: 'disclosed', source: 'uscca.com', lastVerified: '2024-12-01' },
    exclusions: [
      'Intentional criminal acts',
      'Pre-existing incidents',
      'Incidents outside self-defense context'
    ],
    limitations: [
      '$100,000 coverage limit per incident',
      'Network attorney required (no choice)',
      'No family coverage included'
    ],
    notIdealFor: [
      'Families needing coverage for multiple members',
      'Those who want attorney choice',
      'High-net-worth individuals needing higher limits'
    ],
    bestFor: [
      'Budget-conscious individuals',
      'Solo coverage needs',
      'Those comfortable with network attorneys'
    ],
    source: 'uscca.com',
    lastVerified: '2024-12-01',
    providerLink: 'https://www.uscca.com/plans/essential',
  },
  {
    id: 'uscca-gold',
    name: 'USCCA Gold',
    provider: 'USCCA',
    description: 'Mid-tier plan with expanded coverage and higher limits.',
    monthlyPrice: { value: 37, status: 'disclosed', source: 'uscca.com', lastVerified: '2024-12-01' },
    annualPrice: { value: 397, status: 'disclosed', source: 'uscca.com', lastVerified: '2024-12-01' },
    paymentStyle: 'upfront',
    attorneyChoice: 'network',
    familyCoverage: { value: true, status: 'disclosed', source: 'uscca.com', lastVerified: '2024-12-01' },
    coverageLimit: { value: 300000, status: 'disclosed', source: 'uscca.com', lastVerified: '2024-12-01' },
    waitingPeriod: { value: 0, status: 'disclosed', source: 'uscca.com', lastVerified: '2024-12-01' },
    coversCivil: { value: true, status: 'disclosed', source: 'uscca.com', lastVerified: '2024-12-01' },
    coversCriminal: { value: true, status: 'disclosed', source: 'uscca.com', lastVerified: '2024-12-01' },
    coversBail: { value: true, status: 'disclosed', source: 'uscca.com', lastVerified: '2024-12-01' },
    coversExpertWitness: { value: true, status: 'disclosed', source: 'uscca.com', lastVerified: '2024-12-01' },
    exclusions: [
      'Intentional criminal acts',
      'Pre-existing incidents',
      'Incidents outside self-defense context'
    ],
    limitations: [
      '$300,000 coverage limit per incident',
      'Network attorney required (no choice)'
    ],
    notIdealFor: [
      'Those who want attorney choice',
      'Unlimited coverage needs'
    ],
    bestFor: [
      'Families needing coverage',
      'Those wanting higher coverage limits',
      'Budget-conscious with family needs'
    ],
    source: 'uscca.com',
    lastVerified: '2024-12-01',
    providerLink: 'https://www.uscca.com/plans/gold',
  },
  {
    id: 'ccwsafe-basic',
    name: 'CCW Safe Basic',
    provider: 'CCW Safe',
    description: 'Basic plan with reimbursement model and attorney choice.',
    monthlyPrice: { value: 12, status: 'disclosed', source: 'ccwsafe.com', lastVerified: '2024-12-01' },
    annualPrice: { value: 144, status: 'disclosed', source: 'ccwsafe.com', lastVerified: '2024-12-01' },
    paymentStyle: 'reimbursement',
    attorneyChoice: 'choice',
    familyCoverage: { value: false, status: 'disclosed', source: 'ccwsafe.com', lastVerified: '2024-12-01' },
    coverageLimit: { value: null, status: 'not_disclosed', source: 'ccwsafe.com', lastVerified: '2024-12-01' },
    waitingPeriod: { value: 30, status: 'disclosed', source: 'ccwsafe.com', lastVerified: '2024-12-01' },
    coversCivil: { value: true, status: 'disclosed', source: 'ccwsafe.com', lastVerified: '2024-12-01' },
    coversCriminal: { value: true, status: 'disclosed', source: 'ccwsafe.com', lastVerified: '2024-12-01' },
    coversBail: { value: true, status: 'disclosed', source: 'ccwsafe.com', lastVerified: '2024-12-01' },
    coversExpertWitness: { value: true, status: 'disclosed', source: 'ccwsafe.com', lastVerified: '2024-12-01' },
    exclusions: [
      'Intentional criminal acts',
      'Pre-existing incidents',
      'Incidents outside self-defense context'
    ],
    limitations: [
      '30-day waiting period',
      'Reimbursement model (you pay upfront, get reimbursed)',
      'Coverage limits not clearly disclosed',
      'No family coverage included'
    ],
    notIdealFor: [
      'Those who cannot afford upfront legal costs',
      'Families needing coverage',
      'Those wanting immediate coverage (waiting period)'
    ],
    bestFor: [
      'Budget-conscious individuals',
      'Those who want attorney choice',
      'Those comfortable with reimbursement model'
    ],
    source: 'ccwsafe.com',
    lastVerified: '2024-12-01',
    providerLink: 'https://www.ccwsafe.com/plans/basic',
  },
  {
    id: 'ccwsafe-premier',
    name: 'CCW Safe Premier',
    provider: 'CCW Safe',
    description: 'Premium plan with upfront payment and unlimited coverage.',
    monthlyPrice: { value: 30, status: 'disclosed', source: 'ccwsafe.com', lastVerified: '2024-12-01' },
    annualPrice: { value: 360, status: 'disclosed', source: 'ccwsafe.com', lastVerified: '2024-12-01' },
    paymentStyle: 'upfront',
    attorneyChoice: 'choice',
    familyCoverage: { value: true, status: 'disclosed', source: 'ccwsafe.com', lastVerified: '2024-12-01' },
    coverageLimit: { value: 'unlimited', status: 'disclosed', source: 'ccwsafe.com', lastVerified: '2024-12-01' },
    waitingPeriod: { value: 0, status: 'disclosed', source: 'ccwsafe.com', lastVerified: '2024-12-01' },
    coversCivil: { value: true, status: 'disclosed', source: 'ccwsafe.com', lastVerified: '2024-12-01' },
    coversCriminal: { value: true, status: 'disclosed', source: 'ccwsafe.com', lastVerified: '2024-12-01' },
    coversBail: { value: true, status: 'disclosed', source: 'ccwsafe.com', lastVerified: '2024-12-01' },
    coversExpertWitness: { value: true, status: 'disclosed', source: 'ccwsafe.com', lastVerified: '2024-12-01' },
    exclusions: [
      'Intentional criminal acts',
      'Pre-existing incidents',
      'Incidents outside self-defense context'
    ],
    limitations: [
      'Higher monthly cost',
      'May require qualification'
    ],
    notIdealFor: [
      'Budget-conscious individuals',
      'Those who don\'t need unlimited coverage'
    ],
    bestFor: [
      'Those wanting unlimited coverage',
      'Families needing comprehensive protection',
      'Those who want attorney choice with upfront payment'
    ],
    source: 'ccwsafe.com',
    lastVerified: '2024-12-01',
    providerLink: 'https://www.ccwsafe.com/plans/premier',
  },
  {
    id: 'armed-citizens-network',
    name: 'Armed Citizens Legal Defense Network',
    provider: 'ACLDN',
    description: 'Non-profit network with reimbursement model and educational focus.',
    monthlyPrice: { value: 12, status: 'disclosed', source: 'armedcitizensnetwork.org', lastVerified: '2024-12-01' },
    annualPrice: { value: 135, status: 'disclosed', source: 'armedcitizensnetwork.org', lastVerified: '2024-12-01' },
    paymentStyle: 'reimbursement',
    attorneyChoice: 'network',
    familyCoverage: { value: false, status: 'disclosed', source: 'armedcitizensnetwork.org', lastVerified: '2024-12-01' },
    coverageLimit: { value: null, status: 'not_disclosed', source: 'armedcitizensnetwork.org', lastVerified: '2024-12-01' },
    waitingPeriod: { value: 60, status: 'disclosed', source: 'armedcitizensnetwork.org', lastVerified: '2024-12-01' },
    coversCivil: { value: true, status: 'disclosed', source: 'armedcitizensnetwork.org', lastVerified: '2024-12-01' },
    coversCriminal: { value: true, status: 'disclosed', source: 'armedcitizensnetwork.org', lastVerified: '2024-12-01' },
    coversBail: { value: true, status: 'disclosed', source: 'armedcitizensnetwork.org', lastVerified: '2024-12-01' },
    coversExpertWitness: { value: true, status: 'disclosed', source: 'armedcitizensnetwork.org', lastVerified: '2024-12-01' },
    exclusions: [
      'Intentional criminal acts',
      'Pre-existing incidents',
      'Incidents outside self-defense context'
    ],
    limitations: [
      '60-day waiting period (longer than most)',
      'Reimbursement model (you pay upfront)',
      'Coverage limits not clearly disclosed',
      'No family coverage',
      'Network attorney only'
    ],
    notIdealFor: [
      'Those needing immediate coverage',
      'Those who cannot afford upfront costs',
      'Families needing coverage',
      'Those wanting attorney choice'
    ],
    bestFor: [
      'Budget-conscious individuals',
      'Those who value educational resources',
      'Those comfortable with longer waiting periods'
    ],
    source: 'armedcitizensnetwork.org',
    lastVerified: '2024-12-01',
    providerLink: 'https://www.armedcitizensnetwork.org/membership',
  },
];
