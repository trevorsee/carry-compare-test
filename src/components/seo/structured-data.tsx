import type { PlanWithProvider } from '@/lib/types';

// Static date for SSG - recalculated at build time
const THIRTY_DAYS_FROM_BUILD = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
}

export function OrganizationSchema({ 
  name = 'CarryCoverage', 
  url = 'https://carrycoverage.com' 
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo: `${url}/logo.png`,
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ProductSchemaProps {
  plan: PlanWithProvider;
  priceValidUntil?: string;
}

export function ProductSchema({ plan, priceValidUntil }: ProductSchemaProps) {
  const price = plan.priceMonthly || (plan.priceAnnual ? plan.priceAnnual / 12 : null);
  
  // Default to 30 days from build time if not provided
  const validUntil = priceValidUntil || THIRTY_DAYS_FROM_BUILD;
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: plan.name,
    description: plan.bestFor || plan.coverageNotes || `${plan.name} by ${plan.provider.name}`,
    brand: {
      '@type': 'Brand',
      name: plan.provider.name,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: price || 'Contact for pricing',
      priceValidUntil: validUntil,
      availability: 'https://schema.org/InStock',
      url: plan.affiliateUrl || plan.provider.websiteUrl,
    },
    ...(plan.overallScore && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: plan.overallScore / 20, // Convert to 5-star scale
        bestRating: 5,
        worstRating: 1,
        ratingCount: 1,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQSchemaProps {
  faqs: { question: string; answer: string }[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleSchemaProps {
  title: string;
  description?: string;
  author?: string;
  publishedAt?: Date;
  updatedAt?: Date;
  url: string;
}

export function ArticleSchema({ 
  title, 
  description, 
  author = 'CarryCoverage',
  publishedAt,
  updatedAt,
  url 
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CarryCoverage',
      logo: {
        '@type': 'ImageObject',
        url: 'https://carrycoverage.com/logo.png',
      },
    },
    datePublished: publishedAt?.toISOString(),
    dateModified: updatedAt?.toISOString(),
    mainEntityOfPage: url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ComparisonTableSchemaProps {
  plans: PlanWithProvider[];
}

export function ComparisonTableSchema({ plans }: ComparisonTableSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'CCW Legal Protection Plans Comparison',
    description: 'Compare concealed carry legal protection plans',
    numberOfItems: plans.length,
    itemListElement: plans.map((plan, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: plan.name,
        description: plan.bestFor || `${plan.name} by ${plan.provider.name}`,
        brand: {
          '@type': 'Brand',
          name: plan.provider.name,
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          price: plan.priceMonthly || (plan.priceAnnual ? plan.priceAnnual / 12 : 'Contact'),
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
