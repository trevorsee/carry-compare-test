import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

      <div className="prose max-w-none space-y-6">
        <section>
          <p className="text-gray-700">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing and using this website, you accept and agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use this website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Use of Website</h2>
          <p className="text-gray-700 mb-4">You agree to use this website only for lawful purposes and in a way that:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Does not infringe on the rights of others</li>
            <li>Does not violate any applicable laws or regulations</li>
            <li>Does not interfere with or disrupt the website or servers</li>
            <li>Does not attempt to gain unauthorized access to any part of the website</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
          <p className="text-gray-700">
            All content on this website, including text, graphics, logos, and software, is the property 
            of CarryCoverage or its content suppliers and is protected by copyright and other intellectual 
            property laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Disclaimer of Warranties</h2>
          <p className="text-gray-700">
            This website is provided "as is" without warranties of any kind, either express or implied. 
            We do not warrant that the website will be uninterrupted, error-free, or free from viruses 
            or other harmful components.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
          <p className="text-gray-700">
            To the fullest extent permitted by law, CarryCoverage shall not be liable for any indirect, 
            incidental, special, consequential, or punitive damages resulting from your use of this website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Third-Party Links</h2>
          <p className="text-gray-700">
            This website contains links to third-party websites. We are not responsible for the content, 
            privacy policies, or practices of third-party websites. Your use of third-party websites is 
            at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Modifications</h2>
          <p className="text-gray-700">
            We reserve the right to modify these Terms of Service at any time. Changes will be posted on 
            this page with an updated "Last Updated" date. Your continued use of the website after changes 
            constitutes acceptance of the modified terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Termination</h2>
          <p className="text-gray-700">
            We reserve the right to terminate or suspend your access to the website at any time, without 
            notice, for any reason, including violation of these Terms of Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
          <p className="text-gray-700">
            These Terms of Service shall be governed by and construed in accordance with applicable laws, 
            without regard to conflict of law principles.
          </p>
        </section>

        <section className="bg-gray-50 border border-gray-200 rounded p-6">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p className="text-gray-700">
            If you have questions about these Terms of Service, please contact us through the methods 
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
