import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.source.deleteMany();
  await prisma.changeLog.deleteMany();
  await prisma.plan.deleteMany();
  await prisma.provider.deleteMany();
  await prisma.guide.deleteMany();

  // Create Providers
  const uscca = await prisma.provider.create({
    data: {
      name: 'USCCA',
      slug: 'uscca',
      websiteUrl: 'https://www.uscca.com',
      logoUrl: '/logos/uscca.svg',
      summaryShort: 'U.S. Concealed Carry Association offers comprehensive self-defense liability insurance with extensive training resources.',
      summaryLong: 'The USCCA provides self-defense liability insurance, legal protection, and extensive educational resources for responsible gun owners. They offer multiple membership tiers with varying coverage limits.',
      isActive: true,
    },
  });

  const ccwSafe = await prisma.provider.create({
    data: {
      name: 'CCW Safe',
      slug: 'ccw-safe',
      websiteUrl: 'https://ccwsafe.com',
      logoUrl: '/logos/ccwsafe.svg',
      summaryShort: 'CCW Safe provides unlimited legal defense coverage with no caps on attorney fees or expert witnesses.',
      summaryLong: 'CCW Safe offers comprehensive legal defense coverage for self-defense incidents. Their unlimited coverage and experienced legal team make them a popular choice for those prioritizing complete protection.',
      isActive: true,
    },
  });

  const usLawShield = await prisma.provider.create({
    data: {
      name: 'U.S. LawShield',
      slug: 'us-lawshield',
      websiteUrl: 'https://www.uslawshield.com',
      logoUrl: '/logos/uslawshield.svg',
      summaryShort: 'U.S. LawShield offers affordable legal defense with a network of independent program attorneys.',
      summaryLong: 'U.S. LawShield provides legal defense coverage through a network of experienced attorneys. They focus on accessibility and education, offering various add-on options.',
      isActive: true,
    },
  });

  const secondCall = await prisma.provider.create({
    data: {
      name: 'Second Call Defense',
      slug: 'second-call-defense',
      websiteUrl: 'https://www.secondcalldefense.org',
      logoUrl: '/logos/secondcall.svg',
      summaryShort: 'Second Call Defense provides immediate response and up-front legal funding with no reimbursement required.',
      summaryLong: 'Second Call Defense focuses on immediate incident response with up-front payment for legal expenses. They emphasize quick action during critical moments.',
      isActive: true,
    },
  });

  const armedCitizens = await prisma.provider.create({
    data: {
      name: 'Armed Citizens Legal Defense Network',
      slug: 'acldn',
      websiteUrl: 'https://armedcitizensnetwork.org',
      logoUrl: '/logos/acldn.svg',
      summaryShort: 'ACLDN provides a legal defense fund with educational resources and expert witness access.',
      summaryLong: 'Armed Citizens Legal Defense Network offers a unique approach with a legal defense fund rather than insurance. They provide educational materials and access to expert witnesses.',
      isActive: true,
    },
  });

  const rightsWatch = await prisma.provider.create({
    data: {
      name: 'Firearms Legal Protection',
      slug: 'firearms-legal-protection',
      websiteUrl: 'https://firearmslegal.com',
      logoUrl: '/logos/flp.svg',
      summaryShort: 'Firearms Legal Protection offers straightforward coverage with 24/7 emergency hotline access.',
      summaryLong: 'Firearms Legal Protection provides comprehensive legal defense coverage with a focus on simplicity and accessibility. Their 24/7 hotline ensures immediate assistance.',
      isActive: true,
    },
  });

  const rightToCarry = await prisma.provider.create({
    data: {
      name: 'Right to Bear',
      slug: 'right-to-bear',
      websiteUrl: 'https://www.righttobear.com',
      logoUrl: '/logos/righttobear.svg',
      summaryShort: 'Right to Bear offers budget-friendly legal defense coverage with multiple tier options.',
      summaryLong: 'Right to Bear provides legal defense coverage at competitive prices with various membership levels to suit different needs and budgets.',
      isActive: true,
    },
  });

  const nraCarryGuard = await prisma.provider.create({
    data: {
      name: 'NRA Carry Guard',
      slug: 'nra-carry-guard',
      websiteUrl: 'https://www.nra.org',
      logoUrl: '/logos/nra.svg',
      summaryShort: 'NRA Carry Guard (currently inactive) previously offered self-defense insurance through the NRA.',
      summaryLong: 'NRA Carry Guard was a self-defense insurance program offered by the NRA. Note: This program is currently not accepting new members in most states.',
      isActive: false,
      disclosureNotes: 'Program currently not accepting new members',
    },
  });

  // Create Plans for USCCA
  const usccaPlatinum = await prisma.plan.create({
    data: {
      providerId: uscca.id,
      name: 'USCCA Platinum',
      slug: 'uscca-platinum',
      priceMonthly: 47.00,
      priceAnnual: 497.00,
      paymentStyle: 'upfront',
      attorneyChoice: 'yes',
      waitingPeriodDays: 0,
      coverageType: 'both',
      familyCoverage: 'limited',
      coverageNotes: 'Includes $2,250,000 in self-defense liability protection. Covers criminal defense, civil defense, and damages. Up to $250 daily compensation for court appearances.',
      exclusionsNotes: 'Does not cover incidents involving illegal activities, intoxication, or domestic disputes. Coverage may be reduced if using non-network attorney.',
      supportFeatures: JSON.stringify(['24/7 Critical Response Team', 'Attorney fee coverage', 'Expert witness fees', 'Investigation costs', 'Bail bond funding']),
      limitsJson: JSON.stringify({ criminal: 250000, civil: 2000000, bail: 250000, appeals: 'included', expertWitnesses: 'included' }),
      affiliateUrl: 'https://www.uscca.com/platinum?ref=carrycoverage',
      ctaLabel: 'Join USCCA Platinum',
      isFeatured: true,
      overallScore: 92,
      lastVerifiedAt: new Date('2024-12-15'),
      bestFor: 'Those wanting comprehensive coverage with extensive training resources and high coverage limits',
      notIdealIf: 'You\'re on a tight budget or prefer unlimited coverage without caps',
      prosJson: JSON.stringify(['Up-front payment model', 'High coverage limits', 'Extensive training library', 'Choose your own attorney', 'Strong reputation']),
      consJson: JSON.stringify(['Higher monthly cost', 'Coverage has caps', 'Family coverage requires add-on']),
    },
  });

  await prisma.source.create({
    data: {
      planId: usccaPlatinum.id,
      url: 'https://www.uscca.com/membership',
      title: 'USCCA Membership Page',
      note: 'Official pricing and coverage details',
    },
  });

  const usccaGold = await prisma.plan.create({
    data: {
      providerId: uscca.id,
      name: 'USCCA Gold',
      slug: 'uscca-gold',
      priceMonthly: 30.00,
      priceAnnual: 299.00,
      paymentStyle: 'upfront',
      attorneyChoice: 'yes',
      waitingPeriodDays: 0,
      coverageType: 'both',
      familyCoverage: 'limited',
      coverageNotes: 'Includes $1,150,000 in self-defense liability protection. Covers criminal and civil defense.',
      exclusionsNotes: 'Does not cover incidents involving illegal activities or intoxication.',
      supportFeatures: JSON.stringify(['24/7 Critical Response Team', 'Attorney fee coverage', 'Expert witness fees', 'Bail bond funding']),
      limitsJson: JSON.stringify({ criminal: 150000, civil: 1000000, bail: 100000, appeals: 'included' }),
      affiliateUrl: 'https://www.uscca.com/gold?ref=carrycoverage',
      ctaLabel: 'Join USCCA Gold',
      isFeatured: false,
      overallScore: 85,
      lastVerifiedAt: new Date('2024-12-15'),
      bestFor: 'Mid-range budget with solid coverage and training access',
      notIdealIf: 'You need the highest coverage limits available',
      prosJson: JSON.stringify(['Reasonable price point', 'Up-front payment', 'Training included', 'Attorney choice']),
      consJson: JSON.stringify(['Lower limits than Platinum', 'Family coverage extra']),
    },
  });

  await prisma.source.create({
    data: {
      planId: usccaGold.id,
      url: 'https://www.uscca.com/membership',
      title: 'USCCA Membership Page',
      note: 'Official pricing and coverage details',
    },
  });

  // Create Plans for CCW Safe
  const ccwSafeDefender = await prisma.plan.create({
    data: {
      providerId: ccwSafe.id,
      name: 'CCW Safe Defender',
      slug: 'ccw-safe-defender',
      priceMonthly: 16.00,
      priceAnnual: 179.00,
      paymentStyle: 'upfront',
      attorneyChoice: 'limited',
      waitingPeriodDays: 0,
      coverageType: 'criminal',
      familyCoverage: 'no',
      coverageNotes: 'Unlimited criminal defense coverage with no caps. Covers attorney fees, expert witnesses, and investigation costs.',
      exclusionsNotes: 'Civil defense requires upgrade. Does not cover illegal activities.',
      supportFeatures: JSON.stringify(['24/7 Emergency Hotline', 'Unlimited attorney fees', 'Expert witnesses', 'Investigation costs', 'Psychological support']),
      limitsJson: JSON.stringify({ criminal: 'unlimited', civil: 0, expertWitnesses: 'unlimited' }),
      affiliateUrl: 'https://ccwsafe.com/defender?ref=carrycoverage',
      ctaLabel: 'Get CCW Safe Defender',
      isFeatured: false,
      overallScore: 78,
      lastVerifiedAt: new Date('2024-12-10'),
      bestFor: 'Budget-conscious individuals wanting unlimited criminal defense',
      notIdealIf: 'You need civil liability coverage',
      prosJson: JSON.stringify(['Very affordable', 'Unlimited criminal defense', 'No caps on attorney fees', 'Up-front payment']),
      consJson: JSON.stringify(['No civil coverage', 'Limited attorney choice', 'No family coverage']),
    },
  });

  await prisma.source.create({
    data: {
      planId: ccwSafeDefender.id,
      url: 'https://ccwsafe.com/plans',
      title: 'CCW Safe Plans Page',
      note: 'Official plan details',
    },
  });

  const ccwSafeProtector = await prisma.plan.create({
    data: {
      providerId: ccwSafe.id,
      name: 'CCW Safe Protector',
      slug: 'ccw-safe-protector',
      priceMonthly: 29.00,
      priceAnnual: 325.00,
      paymentStyle: 'upfront',
      attorneyChoice: 'limited',
      waitingPeriodDays: 0,
      coverageType: 'both',
      familyCoverage: 'no',
      coverageNotes: 'Unlimited coverage for both criminal and civil defense. No caps on any legal expenses.',
      exclusionsNotes: 'Does not cover illegal activities or incidents while intoxicated.',
      supportFeatures: JSON.stringify(['24/7 Emergency Hotline', 'Unlimited attorney fees', 'Unlimited civil damages', 'Expert witnesses', 'Investigation costs', 'Psychological support']),
      limitsJson: JSON.stringify({ criminal: 'unlimited', civil: 'unlimited', expertWitnesses: 'unlimited', appeals: 'unlimited' }),
      affiliateUrl: 'https://ccwsafe.com/protector?ref=carrycoverage',
      ctaLabel: 'Get CCW Safe Protector',
      isFeatured: true,
      overallScore: 90,
      lastVerifiedAt: new Date('2024-12-10'),
      bestFor: 'Those wanting truly unlimited coverage with no caps whatsoever',
      notIdealIf: 'You want to choose your own attorney freely',
      prosJson: JSON.stringify(['Unlimited everything', 'Criminal and civil', 'No caps', 'Up-front payment', 'Excellent reputation']),
      consJson: JSON.stringify(['Limited attorney choice', 'No family coverage option', 'Higher price than Defender']),
    },
  });

  await prisma.source.create({
    data: {
      planId: ccwSafeProtector.id,
      url: 'https://ccwsafe.com/plans',
      title: 'CCW Safe Plans Page',
      note: 'Official plan details',
    },
  });

  const ccwSafeUltimate = await prisma.plan.create({
    data: {
      providerId: ccwSafe.id,
      name: 'CCW Safe Ultimate',
      slug: 'ccw-safe-ultimate',
      priceMonthly: 49.00,
      priceAnnual: 549.00,
      paymentStyle: 'upfront',
      attorneyChoice: 'limited',
      waitingPeriodDays: 0,
      coverageType: 'both',
      familyCoverage: 'yes',
      coverageNotes: 'Unlimited coverage for member plus spouse/partner. Includes all Protector benefits for both members.',
      exclusionsNotes: 'Does not cover illegal activities. Both members must reside at same address.',
      supportFeatures: JSON.stringify(['24/7 Emergency Hotline', 'Unlimited attorney fees', 'Unlimited civil damages', 'Expert witnesses', 'Spouse/partner coverage', 'Psychological support']),
      limitsJson: JSON.stringify({ criminal: 'unlimited', civil: 'unlimited', expertWitnesses: 'unlimited', appeals: 'unlimited', familyMembers: 1 }),
      affiliateUrl: 'https://ccwsafe.com/ultimate?ref=carrycoverage',
      ctaLabel: 'Get CCW Safe Ultimate',
      isFeatured: true,
      overallScore: 94,
      lastVerifiedAt: new Date('2024-12-10'),
      bestFor: 'Couples wanting comprehensive unlimited coverage for both partners',
      notIdealIf: 'Single individuals or those wanting full attorney choice',
      prosJson: JSON.stringify(['Covers spouse/partner', 'Unlimited everything', 'Best family value', 'Up-front payment']),
      consJson: JSON.stringify(['Limited attorney choice', 'Higher price point', 'Only covers one additional person']),
    },
  });

  await prisma.source.create({
    data: {
      planId: ccwSafeUltimate.id,
      url: 'https://ccwsafe.com/plans',
      title: 'CCW Safe Plans Page',
      note: 'Official plan details including family options',
    },
  });

  // Create Plans for U.S. LawShield
  const lawShieldBasic = await prisma.plan.create({
    data: {
      providerId: usLawShield.id,
      name: 'U.S. LawShield Basic',
      slug: 'us-lawshield-basic',
      priceMonthly: 10.95,
      priceAnnual: 131.40,
      paymentStyle: 'upfront',
      attorneyChoice: 'limited',
      waitingPeriodDays: 0,
      coverageType: 'criminal',
      familyCoverage: 'no',
      coverageNotes: 'Covers criminal defense for self-defense incidents. Access to network of independent program attorneys.',
      exclusionsNotes: 'Civil defense not included. Must use program attorneys. Some states have waiting periods.',
      supportFeatures: JSON.stringify(['24/7 Attorney-Answered Hotline', 'Network attorneys', 'Investigation support']),
      limitsJson: JSON.stringify({ criminal: 'network-covered', civil: 0 }),
      affiliateUrl: 'https://www.uslawshield.com/basic?ref=carrycoverage',
      ctaLabel: 'Join U.S. LawShield',
      isFeatured: false,
      overallScore: 72,
      lastVerifiedAt: new Date('2024-12-12'),
      bestFor: 'Budget-conscious individuals wanting basic criminal defense coverage',
      notIdealIf: 'You need civil coverage or want to choose your own attorney',
      prosJson: JSON.stringify(['Very affordable', 'Up-front payment', '24/7 hotline', 'Easy to understand']),
      consJson: JSON.stringify(['No civil coverage', 'Must use network attorneys', 'No family coverage']),
    },
  });

  await prisma.source.create({
    data: {
      planId: lawShieldBasic.id,
      url: 'https://www.uslawshield.com/membership-plans',
      title: 'U.S. LawShield Membership Plans',
      note: 'Official membership details',
    },
  });

  const lawShieldPlus = await prisma.plan.create({
    data: {
      providerId: usLawShield.id,
      name: 'U.S. LawShield Plus',
      slug: 'us-lawshield-plus',
      priceMonthly: 16.95,
      priceAnnual: 203.40,
      paymentStyle: 'upfront',
      attorneyChoice: 'limited',
      waitingPeriodDays: 0,
      coverageType: 'both',
      familyCoverage: 'no',
      coverageNotes: 'Includes criminal and civil defense. Multi-state coverage and additional legal services.',
      exclusionsNotes: 'Must use program attorneys. Coverage varies by state.',
      supportFeatures: JSON.stringify(['24/7 Attorney-Answered Hotline', 'Network attorneys', 'Civil defense', 'Multi-state coverage', 'Bail bond assistance']),
      limitsJson: JSON.stringify({ criminal: 'network-covered', civil: 'network-covered', bail: 'up to 50000' }),
      affiliateUrl: 'https://www.uslawshield.com/plus?ref=carrycoverage',
      ctaLabel: 'Join U.S. LawShield Plus',
      isFeatured: false,
      overallScore: 79,
      lastVerifiedAt: new Date('2024-12-12'),
      bestFor: 'Those needing both criminal and civil coverage at a low price',
      notIdealIf: 'You want unlimited coverage or free attorney choice',
      prosJson: JSON.stringify(['Affordable', 'Criminal and civil', 'Multi-state', 'Up-front payment']),
      consJson: JSON.stringify(['Must use network attorneys', 'No unlimited option', 'No family coverage']),
    },
  });

  await prisma.source.create({
    data: {
      planId: lawShieldPlus.id,
      url: 'https://www.uslawshield.com/membership-plans',
      title: 'U.S. LawShield Membership Plans',
      note: 'Official membership details',
    },
  });

  // Create Plans for Second Call Defense
  const secondCallDefender = await prisma.plan.create({
    data: {
      providerId: secondCall.id,
      name: 'Second Call Defender',
      slug: 'second-call-defender',
      priceMonthly: 14.95,
      priceAnnual: 149.95,
      paymentStyle: 'upfront',
      attorneyChoice: 'yes',
      waitingPeriodDays: 0,
      coverageType: 'criminal',
      familyCoverage: 'no',
      coverageNotes: 'Up to $50,000 immediate funding for legal defense. Choose your own attorney.',
      exclusionsNotes: 'Civil defense requires upgrade. Higher tiers available for more coverage.',
      supportFeatures: JSON.stringify(['24/7 Response', 'Choose your attorney', 'Immediate funding', 'Bail assistance']),
      limitsJson: JSON.stringify({ criminal: 50000, civil: 0, bail: 5000 }),
      affiliateUrl: 'https://www.secondcalldefense.org/defender?ref=carrycoverage',
      ctaLabel: 'Get Second Call Defender',
      isFeatured: false,
      overallScore: 74,
      lastVerifiedAt: new Date('2024-12-08'),
      bestFor: 'Those prioritizing attorney choice with a limited budget',
      notIdealIf: 'You need high coverage limits or civil protection',
      prosJson: JSON.stringify(['Choose your own attorney', 'Affordable', 'Up-front payment', 'Immediate response']),
      consJson: JSON.stringify(['Low coverage limits', 'No civil defense', 'Must upgrade for more']),
    },
  });

  await prisma.source.create({
    data: {
      planId: secondCallDefender.id,
      url: 'https://www.secondcalldefense.org/plans',
      title: 'Second Call Defense Plans',
      note: 'Official plan information',
    },
  });

  const secondCallGuardian = await prisma.plan.create({
    data: {
      providerId: secondCall.id,
      name: 'Second Call Guardian',
      slug: 'second-call-guardian',
      priceMonthly: 24.95,
      priceAnnual: 249.95,
      paymentStyle: 'upfront',
      attorneyChoice: 'yes',
      waitingPeriodDays: 0,
      coverageType: 'both',
      familyCoverage: 'no',
      coverageNotes: 'Up to $150,000 for legal defense including civil protection. Full attorney choice.',
      exclusionsNotes: 'Coverage limits apply. Higher tier available.',
      supportFeatures: JSON.stringify(['24/7 Response', 'Choose your attorney', 'Criminal and civil', 'Bail assistance', 'Expert witnesses']),
      limitsJson: JSON.stringify({ criminal: 100000, civil: 50000, bail: 10000 }),
      affiliateUrl: 'https://www.secondcalldefense.org/guardian?ref=carrycoverage',
      ctaLabel: 'Get Second Call Guardian',
      isFeatured: false,
      overallScore: 81,
      lastVerifiedAt: new Date('2024-12-08'),
      bestFor: 'Those wanting attorney choice with criminal and civil coverage',
      notIdealIf: 'You need unlimited or very high coverage limits',
      prosJson: JSON.stringify(['Full attorney choice', 'Criminal and civil', 'Up-front payment', 'Reasonable price']),
      consJson: JSON.stringify(['Coverage limits', 'No family coverage', 'Not unlimited']),
    },
  });

  await prisma.source.create({
    data: {
      planId: secondCallGuardian.id,
      url: 'https://www.secondcalldefense.org/plans',
      title: 'Second Call Defense Plans',
      note: 'Official plan information',
    },
  });

  const secondCallElite = await prisma.plan.create({
    data: {
      providerId: secondCall.id,
      name: 'Second Call Elite',
      slug: 'second-call-elite',
      priceMonthly: 39.95,
      priceAnnual: 399.95,
      paymentStyle: 'upfront',
      attorneyChoice: 'yes',
      waitingPeriodDays: 0,
      coverageType: 'both',
      familyCoverage: 'yes',
      coverageNotes: 'Up to $500,000 coverage including spouse. Highest tier with most comprehensive benefits.',
      exclusionsNotes: 'Standard exclusions for illegal activities apply.',
      supportFeatures: JSON.stringify(['24/7 Response', 'Choose your attorney', 'Criminal and civil', 'Spouse coverage', 'Bail assistance', 'Expert witnesses', 'Psychological support']),
      limitsJson: JSON.stringify({ criminal: 350000, civil: 150000, bail: 25000, familyMembers: 1 }),
      affiliateUrl: 'https://www.secondcalldefense.org/elite?ref=carrycoverage',
      ctaLabel: 'Get Second Call Elite',
      isFeatured: true,
      overallScore: 88,
      lastVerifiedAt: new Date('2024-12-08'),
      bestFor: 'Couples wanting attorney choice with high coverage limits',
      notIdealIf: 'You need truly unlimited coverage',
      prosJson: JSON.stringify(['Full attorney choice', 'Covers spouse', 'High limits', 'Comprehensive benefits']),
      consJson: JSON.stringify(['Not unlimited', 'Higher price', 'Coverage has caps']),
    },
  });

  await prisma.source.create({
    data: {
      planId: secondCallElite.id,
      url: 'https://www.secondcalldefense.org/plans',
      title: 'Second Call Defense Plans',
      note: 'Official plan information including family coverage',
    },
  });

  // Create Plans for ACLDN
  const acldnMembership = await prisma.plan.create({
    data: {
      providerId: armedCitizens.id,
      name: 'ACLDN Membership',
      slug: 'acldn-membership',
      priceMonthly: null,
      priceAnnual: 135.00,
      paymentStyle: 'mixed',
      attorneyChoice: 'yes',
      waitingPeriodDays: 0,
      coverageType: 'both',
      familyCoverage: 'no',
      coverageNotes: 'Access to legal defense fund, not insurance. Up to $25,000 initial deposit for legal fees, with additional funds voted by advisory board.',
      exclusionsNotes: 'Not traditional insurance - fund-based model. Board reviews cases for additional funding.',
      supportFeatures: JSON.stringify(['Legal defense fund', 'Expert witness network', 'Educational DVDs', 'Choose your attorney', 'Advisory board review']),
      limitsJson: JSON.stringify({ initialDeposit: 25000, additional: 'board-approved', expertWitnesses: 'included' }),
      affiliateUrl: 'https://armedcitizensnetwork.org/join?ref=carrycoverage',
      ctaLabel: 'Join ACLDN',
      isFeatured: false,
      overallScore: 76,
      lastVerifiedAt: new Date('2024-12-05'),
      bestFor: 'Those preferring a legal defense fund model over insurance with expert witness access',
      notIdealIf: 'You want guaranteed coverage amounts or traditional insurance structure',
      prosJson: JSON.stringify(['Choose your attorney', 'Expert witness access', 'Educational focus', 'Established network']),
      consJson: JSON.stringify(['Fund-based not insurance', 'Annual only', 'Additional funds require approval', 'No monthly option']),
    },
  });

  await prisma.source.create({
    data: {
      planId: acldnMembership.id,
      url: 'https://armedcitizensnetwork.org/membership',
      title: 'ACLDN Membership Information',
      note: 'Official membership and fund details',
    },
  });

  // Create Plans for Firearms Legal Protection
  const flpBasic = await prisma.plan.create({
    data: {
      providerId: rightsWatch.id,
      name: 'Firearms Legal Basic',
      slug: 'flp-basic',
      priceMonthly: 9.95,
      priceAnnual: 107.40,
      paymentStyle: 'mixed',
      attorneyChoice: 'limited',
      waitingPeriodDays: 0,
      coverageType: 'criminal',
      familyCoverage: 'no',
      coverageNotes: 'Criminal defense coverage with 24/7 emergency hotline. Network attorney access.',
      exclusionsNotes: 'Civil defense not included. Reimbursement for some expenses after acquittal.',
      supportFeatures: JSON.stringify(['24/7 Emergency Hotline', 'Network attorneys', 'Investigation support']),
      limitsJson: JSON.stringify({ criminal: 'network-covered', civil: 0 }),
      affiliateUrl: 'https://firearmslegal.com/basic?ref=carrycoverage',
      ctaLabel: 'Join FLP Basic',
      isFeatured: false,
      overallScore: 70,
      lastVerifiedAt: new Date('2024-12-01'),
      bestFor: 'Budget-minded individuals wanting basic criminal defense access',
      notIdealIf: 'You need civil coverage or prefer pure up-front models',
      prosJson: JSON.stringify(['Very affordable', '24/7 hotline', 'Easy enrollment']),
      consJson: JSON.stringify(['No civil coverage', 'Limited attorney choice', 'Some reimbursement aspects']),
    },
  });

  await prisma.source.create({
    data: {
      planId: flpBasic.id,
      url: 'https://firearmslegal.com/plans',
      title: 'Firearms Legal Protection Plans',
      note: 'Official plan details',
    },
  });

  const flpPremium = await prisma.plan.create({
    data: {
      providerId: rightsWatch.id,
      name: 'Firearms Legal Premium',
      slug: 'flp-premium',
      priceMonthly: 16.95,
      priceAnnual: 183.00,
      paymentStyle: 'mixed',
      attorneyChoice: 'limited',
      waitingPeriodDays: 0,
      coverageType: 'both',
      familyCoverage: 'no',
      coverageNotes: 'Criminal and civil defense coverage. Higher limits and more comprehensive protection.',
      exclusionsNotes: 'Standard exclusions apply. Some expenses may require reimbursement model.',
      supportFeatures: JSON.stringify(['24/7 Emergency Hotline', 'Network attorneys', 'Civil defense', 'Bail assistance', 'Expert witnesses']),
      limitsJson: JSON.stringify({ criminal: 'network-covered', civil: 'up to 250000', bail: 10000 }),
      affiliateUrl: 'https://firearmslegal.com/premium?ref=carrycoverage',
      ctaLabel: 'Join FLP Premium',
      isFeatured: false,
      overallScore: 77,
      lastVerifiedAt: new Date('2024-12-01'),
      bestFor: 'Those wanting criminal and civil coverage at a moderate price',
      notIdealIf: 'You need unlimited coverage or full attorney choice',
      prosJson: JSON.stringify(['Affordable', 'Criminal and civil', 'Bail assistance', '24/7 support']),
      consJson: JSON.stringify(['Mixed payment model', 'Limited attorney choice', 'No family option']),
    },
  });

  await prisma.source.create({
    data: {
      planId: flpPremium.id,
      url: 'https://firearmslegal.com/plans',
      title: 'Firearms Legal Protection Plans',
      note: 'Official plan details',
    },
  });

  // Create Plans for Right to Bear
  const rtbBasic = await prisma.plan.create({
    data: {
      providerId: rightToCarry.id,
      name: 'Right to Bear Basic',
      slug: 'right-to-bear-basic',
      priceMonthly: 10.00,
      priceAnnual: 100.00,
      paymentStyle: 'reimbursement',
      attorneyChoice: 'yes',
      waitingPeriodDays: 0,
      coverageType: 'criminal',
      familyCoverage: 'no',
      coverageNotes: 'Up to $250,000 in criminal defense reimbursement. Choose your own attorney.',
      exclusionsNotes: 'Reimbursement model - you pay upfront, get reimbursed after acquittal/dismissal.',
      supportFeatures: JSON.stringify(['24/7 Hotline', 'Choose your attorney', 'Reimbursement after acquittal']),
      limitsJson: JSON.stringify({ criminal: 250000, civil: 0, bail: 25000 }),
      affiliateUrl: 'https://www.righttobear.com/basic?ref=carrycoverage',
      ctaLabel: 'Get Right to Bear Basic',
      isFeatured: false,
      overallScore: 68,
      lastVerifiedAt: new Date('2024-11-28'),
      bestFor: 'Those comfortable with reimbursement model wanting attorney choice at low cost',
      notIdealIf: 'You want up-front payment or cannot front legal costs initially',
      prosJson: JSON.stringify(['Very affordable', 'Choose your attorney', 'High reimbursement limits', 'Includes bail']),
      consJson: JSON.stringify(['Reimbursement model', 'Must pay upfront', 'No civil coverage']),
    },
  });

  await prisma.source.create({
    data: {
      planId: rtbBasic.id,
      url: 'https://www.righttobear.com/coverage',
      title: 'Right to Bear Coverage Details',
      note: 'Official coverage information',
    },
  });

  const rtbPro = await prisma.plan.create({
    data: {
      providerId: rightToCarry.id,
      name: 'Right to Bear Pro',
      slug: 'right-to-bear-pro',
      priceMonthly: 20.00,
      priceAnnual: 200.00,
      paymentStyle: 'reimbursement',
      attorneyChoice: 'yes',
      waitingPeriodDays: 0,
      coverageType: 'both',
      familyCoverage: 'no',
      coverageNotes: 'Up to $500,000 in criminal defense and $1,000,000 civil reimbursement.',
      exclusionsNotes: 'Reimbursement model applies. Must be acquitted or have charges dismissed.',
      supportFeatures: JSON.stringify(['24/7 Hotline', 'Choose your attorney', 'Criminal and civil', 'Reimbursement after acquittal', 'Expert witnesses']),
      limitsJson: JSON.stringify({ criminal: 500000, civil: 1000000, bail: 50000 }),
      affiliateUrl: 'https://www.righttobear.com/pro?ref=carrycoverage',
      ctaLabel: 'Get Right to Bear Pro',
      isFeatured: false,
      overallScore: 73,
      lastVerifiedAt: new Date('2024-11-28'),
      bestFor: 'Those okay with reimbursement model wanting high limits and attorney choice',
      notIdealIf: 'You cannot front legal costs or prefer guaranteed up-front coverage',
      prosJson: JSON.stringify(['High coverage limits', 'Choose your attorney', 'Criminal and civil', 'Affordable']),
      consJson: JSON.stringify(['Reimbursement model', 'Must pay upfront initially', 'No family option']),
    },
  });

  await prisma.source.create({
    data: {
      planId: rtbPro.id,
      url: 'https://www.righttobear.com/coverage',
      title: 'Right to Bear Coverage Details',
      note: 'Official coverage information',
    },
  });

  const rtbElite = await prisma.plan.create({
    data: {
      providerId: rightToCarry.id,
      name: 'Right to Bear Elite',
      slug: 'right-to-bear-elite',
      priceMonthly: 35.00,
      priceAnnual: 350.00,
      paymentStyle: 'reimbursement',
      attorneyChoice: 'yes',
      waitingPeriodDays: 0,
      coverageType: 'both',
      familyCoverage: 'yes',
      coverageNotes: 'Up to $1,500,000 total coverage including spouse. Highest tier with family protection.',
      exclusionsNotes: 'Reimbursement model. Standard exclusions for illegal activities.',
      supportFeatures: JSON.stringify(['24/7 Hotline', 'Choose your attorney', 'Criminal and civil', 'Spouse coverage', 'Psychological support', 'Expert witnesses']),
      limitsJson: JSON.stringify({ criminal: 750000, civil: 750000, bail: 75000, familyMembers: 1 }),
      affiliateUrl: 'https://www.righttobear.com/elite?ref=carrycoverage',
      ctaLabel: 'Get Right to Bear Elite',
      isFeatured: false,
      overallScore: 80,
      lastVerifiedAt: new Date('2024-11-28'),
      bestFor: 'Couples comfortable with reimbursement model wanting comprehensive coverage',
      notIdealIf: 'You need up-front payment or cannot front legal costs',
      prosJson: JSON.stringify(['High limits', 'Covers spouse', 'Choose your attorney', 'Criminal and civil']),
      consJson: JSON.stringify(['Reimbursement only', 'Must pay upfront initially', 'Higher price']),
    },
  });

  await prisma.source.create({
    data: {
      planId: rtbElite.id,
      url: 'https://www.righttobear.com/coverage',
      title: 'Right to Bear Coverage Details',
      note: 'Official coverage including family options',
    },
  });

  // Create editorial guides
  await prisma.guide.create({
    data: {
      slug: 'how-concealed-carry-legal-protection-works',
      title: 'How Concealed Carry Legal Protection Works',
      description: 'A comprehensive guide to understanding CCW legal protection, what it covers, and why you might need it.',
      author: 'CarryCoverage Editorial',
      isPublished: true,
      publishedAt: new Date('2024-10-15'),
      content: `# How Concealed Carry Legal Protection Works

Carrying a firearm for self-defense comes with significant legal responsibility. Even in a justified shooting, you may face criminal charges, civil lawsuits, and substantial legal fees. This guide explains how CCW legal protection plans work and what to look for.

## What Is CCW Legal Protection?

CCW legal protection (also called self-defense insurance or legal defense coverage) provides financial and legal support if you're involved in a self-defense incident. These aren't traditional insurance policies—they're membership programs that help cover:

- **Criminal defense costs**: Attorney fees if you face criminal charges
- **Civil liability**: Defense against lawsuits from attackers or their families
- **Bail bonds**: Help getting released from jail
- **Expert witnesses**: Specialists who can testify on your behalf
- **Investigation costs**: Private investigators to gather evidence

## Types of Coverage

### Up-Front vs. Reimbursement

This is the most critical distinction:

**Up-Front Payment**: The provider pays your legal costs directly as they occur. You don't need to front the money.

**Reimbursement**: You pay legal costs yourself, then get reimbursed if you're acquitted or charges are dropped. This can leave you in financial difficulty during the legal process.

**Mixed**: Some combination of both models.

### Criminal vs. Civil Coverage

- **Criminal coverage**: Protects you if prosecutors file charges
- **Civil coverage**: Protects you from lawsuits seeking monetary damages
- **Both**: Comprehensive plans cover both scenarios

## Key Features to Compare

1. **Coverage limits**: Is there a cap on what they'll pay?
2. **Attorney choice**: Can you choose your own lawyer or must use their network?
3. **Waiting period**: How soon after joining are you covered?
4. **Family coverage**: Does it extend to spouse/dependents?
5. **Geographic coverage**: Does it work in all states?

## Common Exclusions

Most plans won't cover:
- Illegal activities
- Incidents involving alcohol or drugs
- Domestic disputes
- Criminal convictions (some won't cover any costs if convicted)

## Making Your Decision

Consider your priorities:
- **Budget**: Plans range from $10-$50+/month
- **Risk tolerance**: Can you front legal costs if needed?
- **Attorney relationship**: Do you have a preferred attorney?
- **Family needs**: Do you need coverage for a spouse?

Use our comparison tool to find the right plan for your situation.`,
    },
  });

  await prisma.guide.create({
    data: {
      slug: 'upfront-vs-reimbursement-coverage',
      title: 'Up-Front vs. Reimbursement: Which CCW Coverage Model Is Right for You?',
      description: 'Understanding the critical difference between up-front and reimbursement legal protection models.',
      author: 'CarryCoverage Editorial',
      isPublished: true,
      publishedAt: new Date('2024-10-20'),
      content: `# Up-Front vs. Reimbursement Coverage

The single most important factor when choosing a CCW legal protection plan may be how and when they pay for your defense.

## The Up-Front Payment Model

**How it works**: The provider pays your legal expenses directly to attorneys and other professionals as costs occur.

**Pros**:
- No out-of-pocket costs during legal proceedings
- Access to defense immediately
- Less financial stress during a difficult time
- No need for personal savings or credit

**Cons**:
- Often more expensive monthly fees
- May have coverage limits
- May be limited to network attorneys

**Best for**: Those who want peace of mind and may not have significant savings to front legal costs.

## The Reimbursement Model

**How it works**: You pay legal costs yourself during the case. If you're acquitted or charges are dropped, the provider reimburses you.

**Pros**:
- Often lower monthly costs
- Usually allows full attorney choice
- High coverage limits common

**Cons**:
- Must have money to pay upfront
- Reimbursement only if acquitted
- Could wait months/years for reimbursement
- Financial stress during legal process

**Best for**: Those with significant savings who prioritize attorney choice and lower monthly costs.

## The Mixed Model

Some providers offer hybrid approaches:
- Partial up-front payment with reimbursement for additional costs
- Up-front for certain expenses, reimbursement for others
- Initial funding with approval needed for additional amounts

## Real-World Implications

Consider this scenario: You're involved in a justified self-defense shooting. Even with a clear-cut case, you could face:

- $50,000+ in criminal defense fees
- 6-18 months of legal proceedings
- Potential civil lawsuit adding another $50,000+

With reimbursement coverage, you'd need to pay this yourself and wait for acquittal to recover costs. With up-front coverage, the provider handles it from day one.

## Questions to Ask

1. How soon after an incident do you begin paying legal costs?
2. Is there a deductible or initial amount I must pay?
3. What happens if I'm convicted? (Most don't reimburse)
4. How long does reimbursement typically take?
5. Are there any costs I'd need to pay regardless?

Choose based on your financial situation and risk tolerance.`,
    },
  });

  await prisma.guide.create({
    data: {
      slug: 'attorney-choice-explained',
      title: 'Attorney Choice in CCW Legal Protection: Why It Matters',
      description: 'Why being able to choose your own attorney can make a difference in your self-defense case.',
      author: 'CarryCoverage Editorial',
      isPublished: true,
      publishedAt: new Date('2024-10-25'),
      content: `# Attorney Choice Explained

When reviewing CCW legal protection plans, you'll see "attorney choice" as a key feature. Here's why it matters and what the different options mean.

## Types of Attorney Choice

### Full Attorney Choice ("Yes")
You can hire any licensed attorney you want. The provider pays (or reimburses) regardless of who you choose.

**Pros**:
- Use an attorney you trust
- Find specialists in self-defense law
- Local expertise in your jurisdiction
- Existing relationship advantage

**Cons**:
- Must find and vet attorneys yourself
- Quality varies
- May have rate limits

### Limited Attorney Choice
You can choose from a provider-approved network of attorneys.

**Pros**:
- Pre-vetted for self-defense experience
- Established relationships with provider
- Often streamlined billing
- Usually no rate concerns

**Cons**:
- May not include your preferred attorney
- Network size varies by location
- Less personal control

### No Attorney Choice ("No")
The provider assigns an attorney from their team or network.

**Pros**:
- Simple—no decisions to make
- Attorneys are experienced with the program
- Coordinated coverage

**Cons**:
- No input on who represents you
- May not match your preferences
- Potential conflicts of interest

## Why It Matters

Self-defense law is complex and varies significantly by state. An attorney experienced in:
- Local self-defense statutes
- Stand your ground / castle doctrine cases
- Firearms law
- Your specific jurisdiction's courts and prosecutors

...can make a significant difference in outcomes.

## Considerations

**If attorney choice is important to you**:
- Research self-defense attorneys in your area now
- Ask if your preferred attorney accepts payment from any providers
- Consider providers offering full choice

**If you don't have attorney preferences**:
- Network attorneys are often well-qualified
- Provider relationships can streamline the process
- Focus on other factors like coverage limits

## The Bottom Line

Attorney choice is most valuable if you already have a relationship with a qualified self-defense attorney or strongly prefer to make this decision yourself. If not, a quality provider network may serve you well.`,
    },
  });

  await prisma.guide.create({
    data: {
      slug: 'common-exclusions-gotchas',
      title: 'Common Exclusions and Gotchas in CCW Legal Protection',
      description: 'What your concealed carry legal protection plan probably won\'t cover—and why you need to know.',
      author: 'CarryCoverage Editorial',
      isPublished: true,
      publishedAt: new Date('2024-11-01'),
      content: `# Common Exclusions and Gotchas

No CCW legal protection plan covers everything. Understanding exclusions before you need coverage is critical.

## Universal Exclusions

These are excluded by virtually all providers:

### Illegal Activities
If you're engaged in illegal activity when the incident occurs, coverage is voided. This includes:
- Carrying where prohibited
- Using an illegally-owned firearm
- Drug-related activities
- Other criminal conduct

### Intoxication
Most plans exclude incidents where you're under the influence of alcohol or drugs. Some specify legal limits; others are broader.

### Intentional Criminal Acts
Coverage is for self-defense, not offensive violence. If you're the aggressor or commit a crime, no coverage applies.

### Domestic Disputes
Many plans specifically exclude incidents between family members or household residents.

## Common Gotchas

### Waiting Periods
Some plans have waiting periods before coverage activates. This could be:
- 30-90 days for new members
- Immediate for upgrades within a provider

### Conviction = No Coverage
Most reimbursement plans only pay if you're acquitted or charges are dropped. A conviction (even a plea deal) often means no reimbursement.

### Coverage Limits Per Incident vs. Lifetime
Check whether limits are:
- Per incident (resets each time)
- Lifetime (one limit for all incidents ever)
- Annual (resets each year)

### Civil Suit Timing
Some plans only cover civil suits arising from incidents during membership—even if the lawsuit comes years later. Others require continuous membership.

### "Self-Defense" Definition
Providers may define self-defense narrowly. Defense of property, defense of others, or defensive display without firing may or may not be covered.

### Network Attorney Rates
Even with "attorney choice," some plans cap hourly rates. If your attorney charges more, you pay the difference.

## Red Flags to Watch For

1. **Vague language** about what triggers coverage
2. **No clear policy documents** available before joining
3. **Excessive exclusions** beyond the standard ones
4. **Unclear claims process** documentation
5. **No examples** of coverage in action

## Protect Yourself

1. Read the full member agreement before joining
2. Ask specific questions about scenarios that concern you
3. Understand exactly when coverage starts
4. Know what's required of you after an incident
5. Keep your membership current—lapses can void coverage

The best time to understand your coverage is before you need it.`,
    },
  });

  await prisma.guide.create({
    data: {
      slug: 'how-to-choose-ccw-plan',
      title: 'How to Choose a CCW Legal Protection Plan: Decision Checklist',
      description: 'A step-by-step guide to evaluating and selecting the right concealed carry legal protection for your needs.',
      author: 'CarryCoverage Editorial',
      isPublished: true,
      publishedAt: new Date('2024-11-10'),
      content: `# How to Choose a CCW Legal Protection Plan

With many providers and options available, choosing the right plan requires understanding your needs and priorities.

## Step 1: Assess Your Situation

**Financial capacity**:
- Can you front $50,000+ in legal fees if needed?
- Do you have emergency savings?
- What monthly budget is comfortable?

**Family considerations**:
- Do you need coverage for a spouse/partner?
- Will dependents carry?

**Geographic factors**:
- Do you travel frequently?
- Carry in multiple states?

**Attorney preferences**:
- Do you have a preferred attorney?
- Want full choice or trust a network?

## Step 2: Prioritize Features

Rank these by importance to you:

1. **Up-front vs. reimbursement**: Can you front costs?
2. **Coverage limits**: How much protection do you need?
3. **Attorney choice**: Is choosing your lawyer essential?
4. **Criminal + civil**: Do you need both?
5. **Family coverage**: Spouse/partner protection?
6. **Monthly cost**: What's your budget?
7. **Provider reputation**: Track record matters

## Step 3: Compare Plans

Use our comparison table to filter by your priorities:

**Budget picks** (under $15/month):
- Best for basic coverage on a budget
- May have limits on coverage or features

**Mid-range** ($15-$30/month):
- Balanced coverage and cost
- Good for most concealed carriers

**Premium** ($30+/month):
- Comprehensive coverage
- Family options
- Highest limits

## Step 4: Verify Claims

Before joining, verify:
- [ ] Coverage amounts are clearly stated
- [ ] Exclusions are documented
- [ ] Claims process is explained
- [ ] Contact information is readily available
- [ ] Provider has a track record

## Step 5: Decision Checklist

Use this checklist for your final decision:

- [ ] Payment model (up-front/reimbursement) fits my situation
- [ ] Coverage limits are adequate for my area
- [ ] Attorney choice matches my preference
- [ ] Both criminal and civil covered (if needed)
- [ ] Family coverage included (if needed)
- [ ] No waiting period (or acceptable waiting period)
- [ ] Monthly/annual cost fits my budget
- [ ] Provider has positive reputation and history
- [ ] I've read and understand the member agreement
- [ ] I know what to do if an incident occurs

## After You Join

1. Save emergency contact numbers in your phone
2. Understand the incident reporting process
3. Tell your spouse/family about your coverage
4. Set reminders for renewal dates
5. Review coverage annually

## Need More Help?

Use our comparison tool to see plans side-by-side and filter by the features that matter most to you.`,
    },
  });

  console.log('Seed data created successfully!');
  console.log(`Created ${await prisma.provider.count()} providers`);
  console.log(`Created ${await prisma.plan.count()} plans`);
  console.log(`Created ${await prisma.source.count()} sources`);
  console.log(`Created ${await prisma.guide.count()} guides`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
