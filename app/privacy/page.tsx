import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

      <div className="prose max-w-none space-y-6">
        <section>
          <p className="text-gray-700">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="text-gray-700 mb-4">We collect minimal information to operate this website:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Usage Data:</strong> We use analytics tools to understand how visitors use our website. This may include pages viewed, time spent, and general location data.</li>
            <li><strong>Cookies:</strong> We use cookies to remember your preferences (such as selected plans for comparison) and to analyze website traffic.</li>
            <li><strong>Outbound Clicks:</strong> We track when you click through to provider websites to understand which plans are most popular.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Information</h2>
          <p className="text-gray-700 mb-4">We use collected information to:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Improve our website and user experience</li>
            <li>Understand which plans and features are most useful to visitors</li>
            <li>Maintain and update plan information</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
          <p className="text-gray-700">
            We use third-party analytics services (such as Google Analytics) to understand website usage. 
            These services may collect information according to their own privacy policies. We do not sell 
            your personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="text-gray-700">
            We take reasonable measures to protect the information we collect. However, no method of 
            transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="text-gray-700 mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Access information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of analytics tracking (via browser settings)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
          <p className="text-gray-700">
            We use cookies to remember your comparison selections and to analyze website traffic. 
            You can control cookies through your browser settings, though this may affect website functionality.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
          <p className="text-gray-700">
            This website is not intended for children under 18. We do not knowingly collect information 
            from children.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
          <p className="text-gray-700">
            We may update this privacy policy from time to time. Changes will be posted on this page 
            with an updated "Last Updated" date.
          </p>
        </section>

        <section className="bg-gray-50 border border-gray-200 rounded p-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700">
            If you have questions about this privacy policy, please contact us through the methods 
            provided on our website.
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
