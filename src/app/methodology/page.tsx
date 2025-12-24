import Link from "next/link";
import { TrackEventOnMount } from "@/components/TrackEventOnMount";

export const metadata = {
  title: "Methodology",
};

export default function MethodologyPage() {
  return (
    <div className="space-y-8">
      <TrackEventOnMount name="methodology_view" />
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Methodology</h1>
        <p className="text-slate-700">
          CarryCoverage compares concealed carry legal protection plans using
          structured fields (what’s disclosed) plus sourced notes (what’s
          nuanced). We do not provide legal advice.
        </p>
      </div>

      <section className="space-y-2">
        <h2 className="text-lg font-medium">What we compare</h2>
        <ul className="list-disc space-y-1 pl-6 text-slate-700">
          <li>Pricing (monthly/annual where disclosed)</li>
          <li>Payment style (up-front vs reimbursement vs mixed)</li>
          <li>Attorney choice (yes/limited/no)</li>
          <li>Waiting period (days where disclosed)</li>
          <li>Coverage type (criminal, civil, both)</li>
          <li>Family coverage (yes/limited/no)</li>
          <li>Notable exclusions and “gotchas” (sourced)</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-medium">Data collection & verification</h2>
        <p className="text-slate-700">
          We capture provider statements from public pages, terms, and PDFs and
          attach citations to each plan. Every plan page shows a “Last verified”
          date so you can judge freshness.
        </p>
        <p className="text-slate-700">
          Suggested cadence for MVP: review quarterly (or more often during major
          policy changes).
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-medium">Sponsored placement policy</h2>
        <p className="text-slate-700">
          If a provider pays for placement, we label it as <strong>Sponsored</strong>{" "}
          and it may appear in a fixed position. Sponsored placements never
          remove competitors from the table; they are shown alongside organic
          results.
        </p>
        <p className="text-slate-700">
          Learn more on the{" "}
          <Link href="/disclosures" className="underline">
            disclosures page
          </Link>
          .
        </p>
      </section>
    </div>
  );
}

