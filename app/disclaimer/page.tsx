import Link from 'next/link';

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Disclaimer</h1>

      <div className="prose max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Not Legal Advice</h2>
          <p className="text-gray-700">
            The information provided on this website is for informational and comparison purposes only. 
            It does not constitute legal advice, and should not be relied upon as such. We are not 
            attorneys, and we do not provide legal services or legal advice.
          </p>
          <p className="text-gray-700 mt-4">
            If you need legal advice, please consult with a qualified attorney who specializes in 
            self-defense law and is licensed to practice in your jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">No Guarantees</h2>
          <p className="text-gray-700">
            We do not guarantee the accuracy, completeness, or timeliness of the information provided 
            on this website. Plan terms, pricing, and coverage details may change without notice. 
            Always verify information directly with the provider before making a decision.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Plan Terms</h2>
          <p className="text-gray-700">
            The actual terms, conditions, and coverage of any legal protection plan are governed by 
            the provider's official plan documents and terms of service. Our summaries and comparisons 
            are based on publicly available information and may not reflect all terms or recent changes.
          </p>
          <p className="text-gray-700 mt-4">
            Always read the full terms of service and plan documents before purchasing any plan.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">No Endorsement</h2>
          <p className="text-gray-700">
            The inclusion of a provider or plan on this website does not constitute an endorsement 
            or recommendation. We provide information to help you make your own informed decisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Affiliate Relationships</h2>
          <p className="text-gray-700">
            We may earn commissions from providers when you click through our links and purchase 
            plans. This does not affect our editorial independence or the information we provide. 
            We maintain strict separation between advertising and editorial content.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Use at Your Own Risk</h2>
          <p className="text-gray-700">
            Your use of this website and reliance on any information provided is at your own risk. 
            We are not responsible for any decisions you make based on the information provided, 
            or for any consequences that may result from those decisions.
          </p>
        </section>

        <section className="bg-gray-50 border border-gray-200 rounded p-6">
          <h2 className="text-2xl font-semibold mb-4">Questions?</h2>
          <p className="text-gray-700">
            If you have questions about this disclaimer or our website, please review our{' '}
            <Link href="/methodology" className="text-blue-600 hover:underline">methodology page</Link> 
            {' '}or contact us.
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
