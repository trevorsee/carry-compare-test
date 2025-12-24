import Link from 'next/link';

export default function GuidesPage() {
  const guides = [
    {
      slug: 'how-concealed-carry-legal-protection-works',
      title: 'How Concealed Carry Legal Protection Works',
      description: 'Understanding the basics of legal protection plans and what they cover.',
    },
    {
      slug: 'upfront-vs-reimbursement',
      title: 'Up-Front vs Reimbursement: What You Need to Know',
      description: 'The critical difference between plans that pay immediately and those that require you to pay first.',
    },
    {
      slug: 'attorney-choice-explained',
      title: 'Attorney Choice Explained',
      description: 'Why the ability to choose your own attorney matters and what to look for.',
    },
    {
      slug: 'common-exclusions',
      title: 'Common Exclusions and Gotchas',
      description: 'Important situations that may not be covered and how to avoid surprises.',
    },
    {
      slug: 'how-to-choose',
      title: 'How to Choose a Plan: Decision Checklist',
      description: 'A step-by-step guide to evaluating plans and making the right choice for your needs.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Guides & Resources</h1>
      <p className="text-lg text-gray-600 mb-8">
        Learn about concealed carry legal protection plans and make informed decisions.
      </p>

      <div className="space-y-6">
        {guides.map((guide) => (
          <div
            key={guide.slug}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-2">
              <Link
                href={`/guides/${guide.slug}`}
                className="text-blue-600 hover:underline"
              >
                {guide.title}
              </Link>
            </h2>
            <p className="text-gray-700">{guide.description}</p>
            <Link
              href={`/guides/${guide.slug}`}
              className="inline-block mt-4 text-blue-600 hover:underline font-medium"
            >
              Read more →
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/compare" className="text-blue-600 hover:underline">
          ← Back to Compare Plans
        </Link>
      </div>
    </div>
  );
}
