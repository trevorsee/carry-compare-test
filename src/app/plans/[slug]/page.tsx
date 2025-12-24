import Link from "next/link";
import { notFound } from "next/navigation";
import { DisclosureInline } from "@/components/DisclosureInline";
import { OutboundLink } from "@/components/OutboundLink";
import {
  formatAttorneyChoice,
  formatCoverageType,
  formatFamilyCoverage,
  formatMaybeMoney,
  formatPaymentStyle,
  formatWaitingPeriod,
} from "@/lib/format";
import { getAllPlanSlugs, getPlanBySlug, getPublishedPlans } from "@/lib/queries";

export async function generateStaticParams() {
  const slugs = await getAllPlanSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PlanDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plan = await getPlanBySlug(slug);
  if (!plan) notFound();

  const href = plan.affiliateUrl || plan.provider.websiteUrl;
  const cta = plan.ctaLabel || "Visit Provider";
  const lastVerified = plan.lastVerifiedAt
    ? plan.lastVerifiedAt.toISOString().slice(0, 10)
    : "Not disclosed";

  const limits = (plan.limitsJson as Record<string, unknown>) || {};
  const supportTags = (plan.supportFeatures as unknown as string[]) || [];

  // Simple alternatives: other published plans (excluding current)
  const allPlans = await getPublishedPlans();
  const alternatives = allPlans.filter((p) => p.id !== plan.id).slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Link href="/compare" className="text-sm text-slate-600 hover:underline">
          ← Back to table
        </Link>
        <h1 className="text-2xl font-semibold">
          {plan.provider.name}: {plan.name}
        </h1>
        <p className="text-slate-700">{plan.provider.summaryShort || "Plan details and key terms."}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 p-4 md:col-span-2">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <div className="text-sm text-slate-600">TL;DR</div>
              <div className="text-slate-800">
                <ul className="list-disc pl-5 text-sm text-slate-700">
                  <li>
                    <strong>Best for:</strong>{" "}
                    {plan.familyCoverage === "yes"
                      ? "families"
                      : plan.attorneyChoice === "yes"
                        ? "attorney choice"
                        : "a quick comparison baseline"}
                  </li>
                  <li>
                    <strong>Not ideal if:</strong>{" "}
                    {plan.paymentStyle === "reimbursement"
                      ? "you need up-front payment"
                      : plan.paymentStyle === "unknown"
                        ? "you want fully disclosed terms"
                        : "you need very specific coverage limits"}
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <OutboundLink
                href={href}
                providerId={plan.providerId}
                planId={plan.id}
                placement="provider"
                pagePath={`/plans/${plan.slug}`}
                ctaLabel={cta}
                className="rounded bg-slate-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-slate-800"
              >
                {cta}
              </OutboundLink>
              <Link
                href="/compare"
                className="rounded border border-slate-300 px-4 py-2 text-center text-sm hover:bg-slate-50"
                title="Use the compare checkboxes on /compare to compare 2–4 plans."
              >
                Compare with others
              </Link>
              <DisclosureInline />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 p-4">
          <div className="text-sm font-medium">Key facts</div>
          <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
            <dt className="text-slate-600">Monthly</dt>
            <dd className="text-slate-900">{formatMaybeMoney(plan.priceMonthly)} / mo</dd>
            <dt className="text-slate-600">Annual</dt>
            <dd className="text-slate-900">{formatMaybeMoney(plan.priceAnnual)} / yr</dd>
            <dt className="text-slate-600">Coverage</dt>
            <dd className="text-slate-900">{formatCoverageType(plan.coverageType)}</dd>
            <dt className="text-slate-600">Payment</dt>
            <dd className="text-slate-900">{formatPaymentStyle(plan.paymentStyle)}</dd>
            <dt className="text-slate-600">Attorney</dt>
            <dd className="text-slate-900">{formatAttorneyChoice(plan.attorneyChoice)}</dd>
            <dt className="text-slate-600">Waiting</dt>
            <dd className="text-slate-900">{formatWaitingPeriod(plan.waitingPeriodDays)}</dd>
            <dt className="text-slate-600">Family</dt>
            <dd className="text-slate-900">{formatFamilyCoverage(plan.familyCoverage)}</dd>
          </dl>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Coverage breakdown (as disclosed)</h2>
        <div className="rounded-lg border border-slate-200 p-4">
          <p className="text-sm text-slate-700">
            Many providers do not disclose structured limits publicly. Unknown values are shown
            as “Not disclosed.”
          </p>
          <dl className="mt-3 grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
            {Object.keys(limits).length ? (
              Object.entries(limits).map(([k, v]) => (
                <div key={k} className="flex items-start justify-between gap-4">
                  <dt className="text-slate-600">{k.replace(/_/g, " ")}</dt>
                  <dd className="text-slate-900">{String(v)}</dd>
                </div>
              ))
            ) : (
              <div className="text-slate-700">Not disclosed</div>
            )}
          </dl>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Exclusions & gotchas</h2>
        <div className="rounded-lg border border-slate-200 p-4 text-sm text-slate-700">
          {plan.exclusionsNotes || "Not disclosed"}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Support & services</h2>
        <div className="rounded-lg border border-slate-200 p-4 text-sm text-slate-700">
          {supportTags.length ? (
            <ul className="list-disc space-y-1 pl-5">
              {supportTags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          ) : (
            "Not disclosed"
          )}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Sources & last verified</h2>
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="text-sm text-slate-700">
            <strong>Last verified:</strong> {lastVerified}
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            {plan.sources.length ? (
              plan.sources.map((s) => (
                <li key={s.id} className="rounded border border-slate-100 p-3">
                  <div className="font-medium">{s.title || "Source"}</div>
                  <div className="mt-1 break-all text-slate-700">
                    <a className="underline" href={s.url} target="_blank" rel="noreferrer">
                      {s.url}
                    </a>
                  </div>
                  {s.note ? <div className="mt-1 text-slate-600">{s.note}</div> : null}
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-700">No sources attached.</li>
            )}
          </ul>
        </div>
      </section>

      {plan.changeLog.length ? (
        <section className="space-y-3">
          <h2 className="text-lg font-medium">Change log</h2>
          <div className="rounded-lg border border-slate-200 p-4">
            <ul className="space-y-2 text-sm text-slate-700">
              {plan.changeLog.map((c) => (
                <li key={c.id} className="flex flex-col gap-1">
                  <div className="font-medium">{c.summary}</div>
                  <div className="text-xs text-slate-500">
                    {c.changedAt.toISOString().slice(0, 10)}
                    {c.changedBy ? ` · ${c.changedBy}` : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Alternatives</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {alternatives.map((a) => (
            <Link
              key={a.id}
              href={`/plans/${a.slug}`}
              className="rounded-lg border border-slate-200 p-4 hover:bg-slate-50"
            >
              <div className="text-xs text-slate-600">{a.provider.name}</div>
              <div className="mt-1 font-medium">{a.name}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

