export const metadata = {
  title: "Disclosures & disclaimer",
};

export default function DisclosuresPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Disclosures & disclaimer</h1>

      <section className="space-y-2">
        <h2 className="text-lg font-medium">Affiliate disclosure</h2>
        <p className="text-slate-700">
          CarryCoverage may earn compensation when you click certain links or
          take actions with a provider (affiliate/lead relationships). When we
          have sponsored placements, we label them clearly.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-medium">Not legal advice</h2>
        <p className="text-slate-700">
          Content on this site is for informational purposes only and is not
          legal advice. Plan terms can change; always confirm details directly
          with the provider and review the written policy/member agreement.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-medium">Sources & last verified</h2>
        <p className="text-slate-700">
          We list sources on each plan page and show a “Last verified” date so
          you can judge freshness. Unknown values are shown as “Not disclosed.”
        </p>
      </section>
    </div>
  );
}

