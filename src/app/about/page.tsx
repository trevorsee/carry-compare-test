export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              About CCW Compare
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              We built this tool to help concealed carry permit holders make
              informed decisions about legal protection.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h2>Our Mission</h2>
          <p>
            Choosing legal protection for concealed carry is a high-stakes
            decision. The marketing from providers can be confusing, and it&apos;s
            difficult to understand what you&apos;re actually getting. We created CCW
            Compare to cut through the noise and provide clear, honest information.
          </p>

          <h2>How We Operate</h2>
          <h3>Transparency First</h3>
          <ul>
            <li>
              <strong>Sources are cited:</strong> Every piece of information comes
              from publicly available sources, primarily the providers&apos; own
              websites and terms of service.
            </li>
            <li>
              <strong>Last verified dates:</strong> We show when information was
              last verified so you know how current it is.
            </li>
            <li>
              <strong>&quot;Not disclosed&quot; is explicit:</strong> When we can&apos;t find
              information, we say so rather than guess.
            </li>
            <li>
              <strong>Sponsored content is labeled:</strong> If any content is
              sponsored or we have an affiliate relationship, it&apos;s clearly marked.
            </li>
          </ul>

          <h3>No Legal Advice</h3>
          <p>
            We provide factual comparisons of plan features—not legal advice.
            Self-defense laws are complex and vary by state. Always consult with a
            licensed attorney for legal questions.
          </p>

          <h3>Independence</h3>
          <p>
            Our comparisons are not influenced by providers. Rankings and
            organization are based on objective criteria and user relevance, not
            payment.
          </p>

          <h2>Methodology</h2>
          <p>
            We gather information from official provider websites, terms of
            service, policy documents, and public statements. We focus on
            attributes that matter for decision-making:
          </p>
          <ul>
            <li>Payment style (upfront vs. reimbursement)</li>
            <li>Attorney choice options</li>
            <li>Coverage limits and scope</li>
            <li>Exclusions and limitations</li>
            <li>Pricing and value</li>
            <li>Company history and reputation</li>
          </ul>

          <h2>Updates</h2>
          <p>
            Provider plans change. We strive to keep information current and show
            verification dates. If you notice outdated information, please let us
            know.
          </p>

          <h2>Affiliate Disclosure</h2>
          <p>
            Some links on this site may be affiliate links, meaning we may earn a
            commission if you purchase through them. This never influences our
            comparisons or rankings. Affiliate relationships are always disclosed
            where they exist.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gray-100 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900">
            Questions or Feedback?
          </h2>
          <p className="mt-2 text-gray-600">
            We welcome corrections, suggestions, and questions about our
            methodology.
          </p>
          <a
            href="mailto:info@ccwcompare.com"
            className="mt-4 inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
