import { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Legal disclaimer for CarryCoverage.',
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-4 mb-8">
        <AlertTriangle className="h-10 w-10 text-yellow-600" />
        <h1 className="text-4xl font-bold text-gray-900">Disclaimer</h1>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2>Not Legal Advice</h2>
        <p>
          The information provided on CarryCoverage is for general informational purposes 
          only. Nothing on this website constitutes legal advice. We are not attorneys, 
          and we do not provide legal services.
        </p>
        <p>
          If you need legal advice, please consult with a qualified attorney licensed 
          in your jurisdiction. Laws regarding concealed carry, self-defense, and legal 
          protection vary significantly by state and locality.
        </p>

        <h2>No Warranty</h2>
        <p>
          While we strive to provide accurate and up-to-date information, CarryCoverage 
          makes no representations or warranties of any kind, express or implied, about 
          the completeness, accuracy, reliability, suitability, or availability of the 
          information contained on this website.
        </p>
        <p>
          Any reliance you place on such information is strictly at your own risk. We 
          will not be liable for any loss or damage arising from use of this website.
        </p>

        <h2>Plan Information</h2>
        <p>
          The CCW legal protection plans described on this website are offered by 
          third-party providers. We do not sell, underwrite, or administer these plans. 
          Plan terms, pricing, coverage, and availability are subject to change without notice.
        </p>
        <p>
          <strong>Always verify</strong> current terms directly with the provider before 
          purchasing any plan. Read the full member agreement, policy documents, and 
          exclusions carefully.
        </p>

        <h2>Affiliate Relationships</h2>
        <p>
          CarryCoverage participates in affiliate programs and may receive compensation 
          when you click links to providers and make purchases. See our full{' '}
          <Link href="/disclosure" className="text-blue-600 hover:underline">affiliate disclosure</Link>.
        </p>

        <h2>External Links</h2>
        <p>
          This website may contain links to external websites. We do not control the 
          content of those sites and are not responsible for their content, privacy 
          practices, or other policies.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          In no event shall CarryCoverage, its owners, employees, or affiliates be 
          liable for any direct, indirect, incidental, special, consequential, or 
          punitive damages arising out of your access to or use of this website.
        </p>

        <h2>Changes</h2>
        <p>
          We reserve the right to modify this disclaimer at any time without prior 
          notice. Your continued use of the website following any changes constitutes 
          acceptance of those changes.
        </p>

        <h2>Governing Law</h2>
        <p>
          This disclaimer shall be governed by and construed in accordance with the 
          laws of the United States, without regard to its conflict of law provisions.
        </p>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: December 2024
        </p>
      </div>
    </div>
  );
}
