export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Methodology: How We Compare</h1>
      <div className="space-y-6 text-slate-700 leading-relaxed">
        <p>
          Our goal at CarryCoverage is to provide transparent, unbiased data on concealed carry legal protection plans.
        </p>
        
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Data Collection Process</h2>
          <p className="mb-4">
            We manually verify plan details by reviewing:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Official membership agreements and terms of service</li>
            <li>Provider websites and FAQs</li>
            <li>Direct communication with provider representatives (where possible)</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Scoring Methodology</h2>
          <p className="mb-4">
            Our "Overall Score" is calculated based on a weighted average of:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Coverage Breadth (40%)</strong>: Criminal defense, civil liability, and appeals.</li>
            <li><strong>Financial Protection (30%)</strong>: Up-front payment vs reimbursement, limits, and bail coverage.</li>
            <li><strong>Flexibility (20%)</strong>: Attorney choice and portability.</li>
            <li><strong>Value (10%)</strong>: Price-to-feature ratio.</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Sponsored Placements</h2>
          <p>
            Some listings on this site may be sponsored or contain affiliate links. However, our data and comparisons remain objective. Sponsored plans are clearly labeled if they appear in premium positions outside of organic ranking order.
          </p>
        </section>
        
        <p className="text-sm text-slate-500 mt-8 pt-8 border-t">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
