import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'CarryCoverage terms of service.',
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

      <div className="prose prose-lg max-w-none">
        <p className="lead text-xl text-gray-600">
          By using CarryCoverage, you agree to these terms.
        </p>

        <h2>Acceptance of Terms</h2>
        <p>
          By accessing or using CarryCoverage (&quot;the Site&quot;), you agree to be bound by these 
          Terms of Service. If you do not agree, please do not use the Site.
        </p>

        <h2>Use of the Site</h2>
        <p>You agree to use the Site only for lawful purposes. You may not:</p>
        <ul>
          <li>Use the Site in any way that violates applicable laws</li>
          <li>Attempt to gain unauthorized access to any part of the Site</li>
          <li>Interfere with the Site&apos;s operation</li>
          <li>Scrape or collect data without permission</li>
          <li>Use automated systems to access the Site excessively</li>
        </ul>

        <h2>Content and Information</h2>
        <p>
          The information on this Site is provided for general informational purposes 
          only. See our <Link href="/disclaimer" className="text-blue-600 hover:underline">Disclaimer</Link> for 
          important limitations.
        </p>
        <p>
          We make no warranties about the accuracy, completeness, or reliability of 
          any content on the Site.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          The content on this Site, including text, graphics, logos, and software, 
          is owned by CarryCoverage or its licensors and is protected by copyright 
          and other laws.
        </p>
        <p>
          You may view and print content for personal, non-commercial use only. 
          You may not reproduce, distribute, or create derivative works without 
          our written permission.
        </p>

        <h2>Third-Party Links</h2>
        <p>
          The Site contains links to third-party websites. We do not control these 
          sites and are not responsible for their content or practices. Your use of 
          third-party sites is at your own risk.
        </p>

        <h2>Affiliate Relationships</h2>
        <p>
          We participate in affiliate programs and may receive compensation when you 
          click links to third parties. See our{' '}
          <Link href="/disclosure" className="text-blue-600 hover:underline">Affiliate Disclosure</Link>.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, CarryCoverage and its affiliates 
          shall not be liable for any indirect, incidental, special, consequential, 
          or punitive damages arising from your use of the Site.
        </p>

        <h2>Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless CarryCoverage and its affiliates 
          from any claims, damages, or expenses arising from your use of the Site 
          or violation of these Terms.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We may modify these Terms at any time. Continued use of the Site after 
          changes constitutes acceptance of the new Terms.
        </p>

        <h2>Termination</h2>
        <p>
          We may terminate or suspend your access to the Site at any time, without 
          notice, for any reason.
        </p>

        <h2>Governing Law</h2>
        <p>
          These Terms shall be governed by the laws of the United States, without 
          regard to conflict of law provisions.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these Terms should be sent to legal@carrycoverage.com.
        </p>

        <p className="text-sm text-gray-500 mt-8">
          Effective Date: December 2024
        </p>
      </div>
    </div>
  );
}
