'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { trackMethodologyView } from '@/lib/analytics';

export default function MethodologyPage() {
  useEffect(() => {
    trackMethodologyView();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">How We Compare Plans</h1>

      <div className="prose max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700">
            Our goal is to provide transparent, data-driven comparisons of concealed carry legal 
            protection plans. We understand that choosing the right plan is a high-stakes decision, 
            and we aim to cut through marketing claims to show you what you're actually buying.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">What We Compare</h2>
          <p className="text-gray-700 mb-4">We evaluate plans based on:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Pricing:</strong> Monthly and annual costs, including any setup fees</li>
            <li><strong>Payment Style:</strong> Whether the plan pays up-front or requires reimbursement</li>
            <li><strong>Attorney Choice:</strong> Your ability to choose your own attorney vs. using a network</li>
            <li><strong>Coverage Type:</strong> Criminal defense, civil liability, or both</li>
            <li><strong>Family Coverage:</strong> Whether spouses and dependents are covered</li>
            <li><strong>Waiting Periods:</strong> Time before coverage begins</li>
            <li><strong>Exclusions:</strong> Situations not covered by the plan</li>
            <li><strong>Support Features:</strong> Hotlines, incident response, expert witnesses, appeals coverage</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Collection Process</h2>
          <p className="text-gray-700 mb-4">
            We collect data from multiple sources to ensure accuracy:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li>Publicly available plan documents and terms of service</li>
            <li>Provider websites and marketing materials</li>
            <li>Direct inquiries to providers when information is unclear</li>
            <li>Third-party reviews and analysis from legal experts</li>
          </ol>
          <p className="text-gray-700 mt-4">
            Every plan page includes source citations so you can verify our information yourself.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Verification Cadence</h2>
          <p className="text-gray-700">
            We review and verify plan information on a quarterly basis, or more frequently when 
            we receive reports of changes. Each plan page shows a "Last verified" date so you 
            know how current the information is. If you notice outdated information, please 
            contact us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Scoring (If Applicable)</h2>
          <p className="text-gray-700">
            If we provide overall scores for plans, they are calculated based on weighted factors 
            including coverage comprehensiveness, attorney choice, payment style, pricing value, 
            and transparency. Scores are meant as a starting point for comparison, not a definitive 
            ranking. Your individual needs may vary.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Sponsored Placements</h2>
          <p className="text-gray-700 mb-4">
            Some providers may pay for sponsored placements or featured positions. When this occurs:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>The placement will be clearly labeled as "Sponsored" or "Featured"</li>
            <li>Sponsored placements do not affect our editorial analysis or scoring</li>
            <li>We maintain strict separation between advertising and editorial content</li>
            <li>Our recommendations remain independent of sponsorship relationships</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">What We Don't Do</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Provide legal advice or personalized recommendations</li>
            <li>Guarantee coverage or make binding promises about plan terms</li>
            <li>Accept payments to change rankings or scores</li>
            <li>Endorse specific providers without disclosure</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Affiliate Relationships</h2>
          <p className="text-gray-700">
            We may earn commissions when you click through our links to provider websites. 
            This does not affect our editorial independence, and we will always disclose these 
            relationships. Our goal is to help you make informed decisions, regardless of 
            affiliate relationships.
          </p>
        </section>

        <section className="bg-gray-50 border border-gray-200 rounded p-6">
          <h2 className="text-2xl font-semibold mb-4">Questions or Concerns?</h2>
          <p className="text-gray-700">
            If you have questions about our methodology, notice outdated information, or want 
            to suggest improvements, we'd love to hear from you. Transparency and accuracy are 
            our top priorities.
          </p>
        </section>

        <div className="mt-8">
          <Link href="/compare" className="text-blue-600 hover:underline">
            ← Back to Compare Plans
          </Link>
        </div>
      </div>
    </div>
  );
}
