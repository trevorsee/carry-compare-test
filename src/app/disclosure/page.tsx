import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'CarryCoverage affiliate disclosure and advertising policy.',
};

export default function DisclosurePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Affiliate Disclosure</h1>

      <div className="prose prose-lg max-w-none">
        <p className="lead text-xl text-gray-600">
          CarryCoverage is committed to transparency. This page explains how we make money 
          and how it affects (and doesn&apos;t affect) our content.
        </p>

        <h2>How We Make Money</h2>
        <p>
          CarryCoverage is a free resource. We earn revenue through affiliate relationships 
          with some of the CCW legal protection providers we review and compare.
        </p>
        <p>
          When you click a link to a provider and sign up for their service, we may receive 
          a commission. This happens at no additional cost to you—you pay the same price 
          whether you use our link or go directly to the provider.
        </p>

        <h2>What This Means for Our Content</h2>
        <h3>We maintain editorial independence</h3>
        <p>
          Our rankings, scores, and recommendations are based on objective criteria as 
          described in our <Link href="/methodology" className="text-blue-600 hover:underline">methodology</Link>. 
          Affiliate relationships do not influence how we rank or score plans.
        </p>

        <h3>We compare all major providers</h3>
        <p>
          We include providers in our comparison whether or not we have an affiliate 
          relationship with them. If a provider offers a good plan, we&apos;ll include it 
          regardless of compensation.
        </p>

        <h3>Sponsored placements are labeled</h3>
        <p>
          If a provider pays for enhanced placement (such as &quot;Featured&quot; status), 
          we clearly label this. Sponsored plans do not receive higher scores—the label 
          indicates paid placement only.
        </p>

        <h2>Affiliate Partnerships</h2>
        <p>
          We currently have or may establish affiliate relationships with providers 
          including but not limited to:
        </p>
        <ul>
          <li>USCCA (U.S. Concealed Carry Association)</li>
          <li>CCW Safe</li>
          <li>U.S. LawShield</li>
          <li>Second Call Defense</li>
          <li>Firearms Legal Protection</li>
          <li>Right to Bear</li>
          <li>Armed Citizens Legal Defense Network</li>
        </ul>
        <p>
          This list may not be complete. Assume any outbound link to a provider may be 
          an affiliate link.
        </p>

        <h2>FTC Compliance</h2>
        <p>
          This disclosure is provided in accordance with the Federal Trade Commission&apos;s 
          16 CFR Part 255: &quot;Guides Concerning the Use of Endorsements and Testimonials 
          in Advertising.&quot;
        </p>

        <h2>Questions?</h2>
        <p>
          If you have questions about our affiliate relationships or advertising policies, 
          please <Link href="/contact" className="text-blue-600 hover:underline">contact us</Link>.
        </p>
      </div>
    </div>
  );
}
