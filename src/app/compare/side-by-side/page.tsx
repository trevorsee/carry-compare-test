import Link from "next/link";
import { notFound } from "next/navigation";
import { DisclosureInline } from "@/components/DisclosureInline";
import { OutboundLink } from "@/components/OutboundLink";
import { TrackEventOnMount } from "@/components/TrackEventOnMount";
import {
  formatAttorneyChoice,
  formatCoverageType,
  formatFamilyCoverage,
  formatMaybeMoney,
  formatPaymentStyle,
  formatWaitingPeriod,
} from "@/lib/format";
import { getPlansByIds } from "@/lib/queries";

function allEqual<T>(values: T[]) {
  if (values.length <= 1) return true;
  return values.every((v) => v === values[0]);
}

export const metadata = {
  title: "Compare side-by-side",
};

export default async function CompareSideBySidePage({
  searchParams,
}: {
  searchParams: { ids?: string };
}) {
  const ids = (searchParams.ids || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4);

  if (ids.length < 2) notFound();

  const rows = await getPlansByIds(ids);
  const byId = new Map(rows.map((p) => [p.id, p]));
  const plans = ids.map((id) => byId.get(id)).filter(Boolean);

  if (plans.length < 2) notFound();

  const planIds = plans.map((p) => p!.id);

  const titles = plans.map((p) => `${p!.provider.name} — ${p!.name}`);

  const section = (title: string) => (
    <tr>
      <th colSpan={plans.length + 1} className="bg-slate-50 px-3 py-2 text-left text-sm">
        {title}
      </th>
    </tr>
  );

  const row = (label: string, values: (string | null | undefined)[]) => {
    const highlight = !allEqual(values.map((v) => v ?? "Not disclosed"));
    return (
      <tr className="[&>td]:border-t [&>td]:border-slate-100 [&>td]:px-3 [&>td]:py-3">
        <td className="w-48 text-sm font-medium text-slate-700">{label}</td>
        {values.map((v, i) => (
          <td
            key={`${label}-${i}`}
            className={`align-top text-sm ${highlight ? "bg-emerald-50/40" : ""}`}
          >
            {v ?? "Not disclosed"}
          </td>
        ))}
      </tr>
    );
  };

  return (
    <div className="space-y-6">
      <TrackEventOnMount name="compare_view" payload={{ plan_ids: planIds }} />

      <div className="space-y-2">
        <Link href="/compare" className="text-sm text-slate-600 hover:underline">
          ← Back to table
        </Link>
        <h1 className="text-2xl font-semibold">Side-by-side comparison</h1>
        <p className="text-slate-700">
          Comparing {plans.length} plans. Differences are lightly highlighted.
        </p>
        <DisclosureInline />
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {plans.map((p) => {
          const href = p!.affiliateUrl || p!.provider.websiteUrl;
          const cta = p!.ctaLabel || "Visit Provider";
          return (
            <div key={p!.id} className="rounded-lg border border-slate-200 p-4">
              <div className="text-xs text-slate-600">{p!.provider.name}</div>
              <div className="mt-1 font-medium">{p!.name}</div>
              <div className="mt-3 flex gap-2">
                <OutboundLink
                  href={href}
                  providerId={p!.providerId}
                  planId={p!.id}
                  placement="compare"
                  pagePath="/compare/side-by-side"
                  ctaLabel={cta}
                  className="w-full rounded bg-slate-900 px-3 py-2 text-center text-sm text-white hover:bg-slate-800"
                >
                  {cta}
                </OutboundLink>
              </div>
              <div className="mt-3 text-xs text-slate-600">
                <Link href={`/plans/${p!.slug}`} className="underline">
                  View full details
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-[900px] w-full border-collapse">
          <thead>
            <tr className="bg-slate-50 text-left text-sm [&>th]:border-b [&>th]:border-slate-200 [&>th]:px-3 [&>th]:py-3">
              <th className="w-48">Field</th>
              {titles.map((t) => (
                <th key={t}>{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section("Pricing & fees")}
            {row(
              "Monthly price",
              plans.map((p) => (p!.priceMonthly != null ? `${formatMaybeMoney(p!.priceMonthly)} / mo` : "Not disclosed")),
            )}
            {row(
              "Annual price",
              plans.map((p) => (p!.priceAnnual != null ? `${formatMaybeMoney(p!.priceAnnual)} / yr` : "Not disclosed")),
            )}

            {section("Coverage summary")}
            {row("Coverage type", plans.map((p) => formatCoverageType(p!.coverageType)))}
            {row("Payment style", plans.map((p) => formatPaymentStyle(p!.paymentStyle)))}

            {section("Attorney choice")}
            {row("Attorney choice", plans.map((p) => formatAttorneyChoice(p!.attorneyChoice)))}

            {section("Waiting period & eligibility")}
            {row("Waiting period", plans.map((p) => formatWaitingPeriod(p!.waitingPeriodDays)))}

            {section("Family coverage")}
            {row("Family coverage", plans.map((p) => formatFamilyCoverage(p!.familyCoverage)))}

            {section("Exclusions & gotchas (notes)")}
            {row(
              "Notes",
              plans.map((p) => (p!.exclusionsNotes ? p!.exclusionsNotes : "Not disclosed")),
            )}

            {section("Support/services")}
            {row(
              "Support features",
              plans.map((p) => {
                const tags = (p!.supportFeatures as any[]) || [];
                return tags.length ? tags.join(", ") : "Not disclosed";
              }),
            )}

            {section("Sources & last verified")}
            {row(
              "Last verified",
              plans.map((p) => (p!.lastVerifiedAt ? p!.lastVerifiedAt.toISOString().slice(0, 10) : "Not disclosed")),
            )}
            {row(
              "Source count",
              plans.map((p) => String(p!.sources.length)),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

