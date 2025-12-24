import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'CarryCoverage privacy policy.',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

      <div className="prose prose-lg max-w-none">
        <p className="lead text-xl text-gray-600">
          Your privacy is important to us. This policy explains what information we collect 
          and how we use it.
        </p>

        <h2>Information We Collect</h2>
        
        <h3>Automatically Collected Information</h3>
        <p>When you visit CarryCoverage, we may automatically collect:</p>
        <ul>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Pages visited and time spent</li>
          <li>Referring website</li>
          <li>IP address (anonymized)</li>
        </ul>

        <h3>Information You Provide</h3>
        <p>
          If you contact us, we collect the information you provide such as your 
          email address and message content.
        </p>

        <h2>How We Use Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Improve our website and content</li>
          <li>Understand how visitors use our site</li>
          <li>Respond to your inquiries</li>
          <li>Detect and prevent technical issues</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          We use cookies and similar technologies to enhance your experience. These include:
        </p>
        <ul>
          <li><strong>Essential cookies</strong>: Required for site functionality</li>
          <li><strong>Analytics cookies</strong>: Help us understand site usage</li>
          <li><strong>Preference cookies</strong>: Remember your settings (like comparison selections)</li>
        </ul>
        <p>
          You can control cookies through your browser settings. Disabling cookies may 
          affect site functionality.
        </p>

        <h2>Third-Party Services</h2>
        <p>We may use third-party services including:</p>
        <ul>
          <li><strong>Analytics</strong>: To understand site usage patterns</li>
          <li><strong>Affiliate networks</strong>: To track referrals to provider websites</li>
        </ul>
        <p>
          These services may collect information according to their own privacy policies.
        </p>

        <h2>Data Sharing</h2>
        <p>We do not sell your personal information. We may share information:</p>
        <ul>
          <li>With service providers who assist our operations</li>
          <li>When required by law</li>
          <li>To protect our rights or safety</li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We implement reasonable security measures to protect your information. However, 
          no internet transmission is completely secure.
        </p>

        <h2>Your Rights</h2>
        <p>Depending on your location, you may have rights to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Request deletion of your information</li>
          <li>Opt out of certain data uses</li>
        </ul>
        <p>
          Contact us to exercise these rights.
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>
          Our website is not intended for children under 18. We do not knowingly 
          collect information from children.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this policy periodically. The updated policy will be posted 
          on this page with a new effective date.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy-related questions, contact us at privacy@carrycoverage.com.
        </p>

        <p className="text-sm text-gray-500 mt-8">
          Effective Date: December 2024
        </p>
      </div>
    </div>
  );
}
