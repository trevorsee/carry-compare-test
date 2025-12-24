'use client';

export default function EducationalContent() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Understanding Concealed Carry Legal Protection</h2>
        <p className="text-gray-600 mt-2">
          Learn what these plans cover and how they differ so you can make an informed decision.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Payment Models: Up-Front vs Reimbursement</h3>
        <div className="space-y-3 text-gray-700">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Up-Front Payment</h4>
            <p>
              The provider pays legal costs directly to attorneys and service providers. You typically don't pay anything out of pocket for covered services.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <strong>Best for:</strong> Those who cannot afford large upfront legal costs or want simplicity.
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Reimbursement Model</h4>
            <p>
              You pay legal costs upfront, then submit receipts to the provider for reimbursement. You need sufficient funds available to cover initial costs.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <strong>Best for:</strong> Those who can afford upfront costs and want more control over attorney selection.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Attorney Choice: Network vs Your Choice</h3>
        <div className="space-y-3 text-gray-700">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Network Attorneys</h4>
            <p>
              The provider maintains a network of pre-approved attorneys. You must use attorneys from this network to receive coverage.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <strong>Consider:</strong> Network attorneys are vetted, but you have limited choice. May not include your preferred local attorney.
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Your Choice</h4>
            <p>
              You can choose any qualified attorney, subject to provider approval. More flexibility but may require pre-approval.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <strong>Consider:</strong> More control, but you may need to work with the provider to ensure your attorney qualifies.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Common Exclusions & "Gotchas"</h3>
        <div className="bg-red-50 p-4 rounded-lg">
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Intentional criminal acts:</strong> Coverage typically excludes acts that are clearly criminal, not self-defense.</li>
            <li><strong>Pre-existing incidents:</strong> Incidents that occurred before coverage started are not covered.</li>
            <li><strong>Waiting periods:</strong> Some plans have waiting periods (30-60 days) before coverage begins.</li>
            <li><strong>Coverage limits:</strong> Some plans have per-incident limits; others are unlimited. Check carefully.</li>
            <li><strong>State restrictions:</strong> Coverage may vary by state. Verify your state is covered.</li>
            <li><strong>Family coverage:</strong> Not all plans cover family members automatically. Check if you need family coverage.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">What We Know vs What's Unknown</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 mb-3">
            Throughout this comparison tool, you'll see indicators showing:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>Disclosed:</strong> Information is publicly available and verified.</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2">?</span>
              <span><strong>Not Disclosed:</strong> Information is not publicly available from the provider.</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600 mr-2">~</span>
              <span><strong>Unclear:</strong> Information is ambiguous or contradictory in sources.</span>
            </li>
          </ul>
          <p className="text-sm text-gray-600 mt-4">
            <strong>Important:</strong> Always verify information directly with providers before making decisions. Information may change, and this tool is not a substitute for reading plan documents.
          </p>
        </div>
      </section>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <p className="text-sm text-gray-800">
          <strong>Legal Disclaimer:</strong> This tool provides educational information only and does not constitute legal advice. Always consult with a qualified attorney for legal matters. This comparison is based on publicly available information and may not reflect the most current plan details.
        </p>
      </div>
    </div>
  );
}
