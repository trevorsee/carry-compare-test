"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  formatAttorneyChoice,
  formatCoverageType,
  formatFamilyCoverage,
  formatMaybeMoney,
  formatPaymentStyle,
  formatWaitingPeriod,
} from "@/lib/format";
import { trackEvent } from "@/lib/track";
import { OutboundLink } from "@/components/OutboundLink";
import { DisclosureInline } from "@/components/DisclosureInline";

export type ComparePlanRow = {
  id: string;
  slug: string;
  name: string;
  providerId: string;
  providerName: string;
  providerWebsiteUrl: string;
  priceMonthly: number | null;
  priceAnnual: number | null;
  paymentStyle: "upfront" | "reimbursement" | "mixed" | "unknown";
  attorneyChoice: "yes" | "limited" | "no" | "unknown";
  waitingPeriodDays: number | null;
  coverageType: "criminal" | "civil" | "both" | "unknown";
  familyCoverage: "yes" | "limited" | "no" | "unknown";
  affiliateUrl: string | null;
  ctaLabel: string | null;
  isFeatured: boolean;
  isSponsored: boolean;
  sponsoredRankPosition: number | null;
  overallScore: number | null;
  lastVerifiedAt: string | null;
  availabilityNational: boolean | "unknown";
};

type SortKey = "overall" | "price_asc";
type PresetKey =
  | "none"
  | "best_budget"
  | "best_attorney_choice"
  | "best_upfront"
  | "best_families"
  | "best_simple";

function effectiveMonthly(p: ComparePlanRow): number | null {
  if (p.priceMonthly != null) return p.priceMonthly;
  if (p.priceAnnual != null) return p.priceAnnual / 12;
  return null;
}

function attorneyRank(v: ComparePlanRow["attorneyChoice"]) {
  switch (v) {
    case "yes":
      return 3;
    case "limited":
      return 2;
    case "no":
      return 1;
    default:
      return 0;
  }
}

function familyRank(v: ComparePlanRow["familyCoverage"]) {
  switch (v) {
    case "yes":
      return 3;
    case "limited":
      return 2;
    case "no":
      return 1;
    default:
      return 0;
  }
}

function paymentRank(v: ComparePlanRow["paymentStyle"]) {
  switch (v) {
    case "upfront":
      return 3;
    case "mixed":
      return 2;
    case "reimbursement":
      return 1;
    default:
      return 0;
  }
}

function parseNumberOrEmpty(v: string | null) {
  if (!v) return "";
  const n = Number(v);
  return Number.isFinite(n) ? n : "";
}

export function CompareTable({ plans }: { plans: ComparePlanRow[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [preset, setPreset] = useState<PresetKey>(
    (searchParams.get("preset") as PresetKey) || "none",
  );
  const [sort, setSort] = useState<SortKey>(
    (searchParams.get("sort") as SortKey) || "overall",
  );
  const [payment, setPayment] = useState<string>(searchParams.get("payment") || "all");
  const [attorney, setAttorney] = useState<string>(
    searchParams.get("attorney") || "all",
  );
  const [family, setFamily] = useState<string>(searchParams.get("family") || "all");
  const [nationalOnly, setNationalOnly] = useState<boolean>(
    searchParams.get("national") === "1",
  );
  const [maxWaiting, setMaxWaiting] = useState<number | "">(
    (parseNumberOrEmpty(searchParams.get("max_wait")) as number | "") || "",
  );
  const [minPrice, setMinPrice] = useState<number | "">(
    (parseNumberOrEmpty(searchParams.get("min_price")) as number | "") || "",
  );
  const [maxPrice, setMaxPrice] = useState<number | "">(
    (parseNumberOrEmpty(searchParams.get("max_price")) as number | "") || "",
  );

  const [compareIds, setCompareIds] = useState<string[]>(() => {
    try {
      const raw =
        typeof window !== "undefined"
          ? window.sessionStorage.getItem("carrycoverage_compare_ids")
          : null;
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });
  const lastResultsCountRef = useRef<number>(plans.length);

  useEffect(() => {
    try {
      sessionStorage.setItem("carrycoverage_compare_ids", JSON.stringify(compareIds));
    } catch {
      // ignore
    }
  }, [compareIds]);

  // URL state sync (debounced)
  useEffect(() => {
    const t = setTimeout(() => {
      const sp = new URLSearchParams();
      if (preset !== "none") sp.set("preset", preset);
      if (sort !== "overall") sp.set("sort", sort);
      if (payment !== "all") sp.set("payment", payment);
      if (attorney !== "all") sp.set("attorney", attorney);
      if (family !== "all") sp.set("family", family);
      if (nationalOnly) sp.set("national", "1");
      if (maxWaiting !== "") sp.set("max_wait", String(maxWaiting));
      if (minPrice !== "") sp.set("min_price", String(minPrice));
      if (maxPrice !== "") sp.set("max_price", String(maxPrice));
      const qs = sp.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, 150);
    return () => clearTimeout(t);
  }, [
    preset,
    sort,
    payment,
    attorney,
    family,
    nationalOnly,
    maxWaiting,
    minPrice,
    maxPrice,
    pathname,
    router,
  ]);

  const filtered = useMemo(() => {
    return plans.filter((p) => {
      if (nationalOnly && p.availabilityNational !== true) return false;
      if (payment !== "all" && p.paymentStyle !== payment) return false;
      if (attorney !== "all" && p.attorneyChoice !== attorney) return false;
      if (family !== "all" && p.familyCoverage !== family) return false;
      if (maxWaiting !== "" && (p.waitingPeriodDays ?? Number.POSITIVE_INFINITY) > maxWaiting)
        return false;

      const eff = effectiveMonthly(p);
      if (minPrice !== "" || maxPrice !== "") {
        if (eff == null) return false;
        if (minPrice !== "" && eff < minPrice) return false;
        if (maxPrice !== "" && eff > maxPrice) return false;
      }

      return true;
    });
  }, [plans, nationalOnly, payment, attorney, family, maxWaiting, minPrice, maxPrice]);

  const ordered = useMemo(() => {
    const sponsored = filtered
      .filter((p) => p.isSponsored && p.sponsoredRankPosition != null)
      .slice()
      .sort((a, b) => (a.sponsoredRankPosition ?? 0) - (b.sponsoredRankPosition ?? 0));

    const organic = filtered
      .filter((p) => !(p.isSponsored && p.sponsoredRankPosition != null))
      .slice();

    const applySort = (arr: ComparePlanRow[]) => {
      switch (sort) {
        case "price_asc":
          arr.sort((a, b) => {
            const am = effectiveMonthly(a);
            const bm = effectiveMonthly(b);
            if (am == null && bm == null) return 0;
            if (am == null) return 1;
            if (bm == null) return -1;
            return am - bm;
          });
          break;
        default:
          arr.sort((a, b) => (b.overallScore ?? -1) - (a.overallScore ?? -1));
      }
    };

    const applyPreset = (arr: ComparePlanRow[]) => {
      switch (preset) {
        case "best_budget":
          arr.sort((a, b) => {
            const am = effectiveMonthly(a);
            const bm = effectiveMonthly(b);
            if (am == null && bm == null) return 0;
            if (am == null) return 1;
            if (bm == null) return -1;
            return am - bm;
          });
          return;
        case "best_attorney_choice":
          arr.sort((a, b) => attorneyRank(b.attorneyChoice) - attorneyRank(a.attorneyChoice));
          return;
        case "best_upfront":
          arr.sort((a, b) => paymentRank(b.paymentStyle) - paymentRank(a.paymentStyle));
          return;
        case "best_families":
          arr.sort((a, b) => familyRank(b.familyCoverage) - familyRank(a.familyCoverage));
          return;
        case "best_simple":
          arr.sort((a, b) => (b.overallScore ?? -1) - (a.overallScore ?? -1));
          return;
        default:
          applySort(arr);
      }
    };

    applyPreset(organic);

    // Inject sponsored at fixed positions (1-indexed), without removing organic.
    const out = organic.slice();
    for (const s of sponsored) {
      const idx = Math.max(0, (s.sponsoredRankPosition ?? 1) - 1);
      out.splice(Math.min(idx, out.length), 0, s);
    }
    return out;
  }, [filtered, sort, preset]);

  // Instrument filter changes with result counts.
  useEffect(() => {
    if (lastResultsCountRef.current !== filtered.length) {
      lastResultsCountRef.current = filtered.length;
    }
  }, [filtered.length]);

  const comparePlans = useMemo(() => {
    const map = new Map(plans.map((p) => [p.id, p]));
    return compareIds.map((id) => map.get(id)).filter(Boolean) as ComparePlanRow[];
  }, [plans, compareIds]);

  function toggleCompare(id: string) {
    setCompareIds((prev) => {
      const has = prev.includes(id);
      const next = has ? prev.filter((x) => x !== id) : [...prev, id].slice(0, 4);
      trackEvent(has ? "compare_remove" : "compare_add", {
        plan_id: id,
      });
      return next;
    });
  }

  function onFilterChange(filterName: string, value: unknown, resultsCount: number) {
    trackEvent("filter_change", { filter_name: filterName, value, results_count: resultsCount });
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Compare CCW legal protection plans</h1>
        <p className="text-slate-700">
          Filter by the practical terms that matter (payment style, attorney choice, waiting
          period, and family coverage). Unknown values are shown as “Not disclosed.”
        </p>
        <p className="text-sm text-slate-600">
          <Link href="/methodology" className="underline">
            How we rank
          </Link>
        </p>
        <DisclosureInline />
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">Best for:</span>
          {(
            [
              ["none", "All"],
              ["best_budget", "Budget"],
              ["best_attorney_choice", "Attorney choice"],
              ["best_upfront", "Up-front coverage"],
              ["best_families", "Families"],
              ["best_simple", "Simple experience"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`rounded-full border px-3 py-1 text-sm ${
                preset === key ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300"
              }`}
              onClick={() => {
                setPreset(key);
                onFilterChange("preset", key, filtered.length);
              }}
            >
              {label}
            </button>
          ))}
          {preset !== "none" ? (
            <span className="text-xs text-slate-600">
              Preset changes the ranking (you can still adjust filters below).
            </span>
          ) : null}
        </div>

        <div className="grid gap-3 md:grid-cols-6">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-slate-700">Sort</span>
            <select
              className="rounded border border-slate-300 px-2 py-2"
              value={sort}
              onChange={(e) => {
                const v = e.target.value as SortKey;
                setSort(v);
                trackEvent("sort_change", { sort_key: v });
              }}
            >
              <option value="overall">Overall score</option>
              <option value="price_asc">Price (low → high)</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-slate-700">Payment style</span>
            <select
              className="rounded border border-slate-300 px-2 py-2"
              value={payment}
              onChange={(e) => {
                const v = e.target.value;
                setPayment(v);
                onFilterChange("payment_style", v, filtered.length);
              }}
            >
              <option value="all">All</option>
              <option value="upfront">Up-front</option>
              <option value="reimbursement">Reimbursement</option>
              <option value="mixed">Mixed</option>
              <option value="unknown">Not disclosed</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-slate-700">Attorney choice</span>
            <select
              className="rounded border border-slate-300 px-2 py-2"
              value={attorney}
              onChange={(e) => {
                const v = e.target.value;
                setAttorney(v);
                onFilterChange("attorney_choice", v, filtered.length);
              }}
            >
              <option value="all">All</option>
              <option value="yes">Yes</option>
              <option value="limited">Limited</option>
              <option value="no">No</option>
              <option value="unknown">Not disclosed</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-slate-700">Family coverage</span>
            <select
              className="rounded border border-slate-300 px-2 py-2"
              value={family}
              onChange={(e) => {
                const v = e.target.value;
                setFamily(v);
                onFilterChange("family_coverage", v, filtered.length);
              }}
            >
              <option value="all">All</option>
              <option value="yes">Yes</option>
              <option value="limited">Limited</option>
              <option value="no">No</option>
              <option value="unknown">Not disclosed</option>
            </select>
          </label>

          <label className="flex items-center gap-2 pt-7 text-sm">
            <input
              type="checkbox"
              checked={nationalOnly}
              onChange={(e) => {
                setNationalOnly(e.target.checked);
                onFilterChange("national_only", e.target.checked, filtered.length);
              }}
            />
            <span className="text-slate-700">National only</span>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-slate-700">Max waiting (days)</span>
            <input
              className="rounded border border-slate-300 px-2 py-2"
              inputMode="numeric"
              placeholder="e.g. 30"
              value={maxWaiting}
              onChange={(e) => {
                const raw = e.target.value;
                const v = raw === "" ? "" : Number(raw);
                setMaxWaiting(Number.isFinite(v) ? (v as number) : "");
                onFilterChange("max_waiting_period_days", v, filtered.length);
              }}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-slate-700">Min price (mo)</span>
            <input
              className="rounded border border-slate-300 px-2 py-2"
              inputMode="decimal"
              placeholder="e.g. 10"
              value={minPrice}
              onChange={(e) => {
                const raw = e.target.value;
                const v = raw === "" ? "" : Number(raw);
                setMinPrice(Number.isFinite(v) ? (v as number) : "");
                onFilterChange("min_price", v, filtered.length);
              }}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-slate-700">Max price (mo)</span>
            <input
              className="rounded border border-slate-300 px-2 py-2"
              inputMode="decimal"
              placeholder="e.g. 25"
              value={maxPrice}
              onChange={(e) => {
                const raw = e.target.value;
                const v = raw === "" ? "" : Number(raw);
                setMaxPrice(Number.isFinite(v) ? (v as number) : "");
                onFilterChange("max_price", v, filtered.length);
              }}
            />
          </label>
        </div>
      </div>

      <div className="text-sm text-slate-700">
        Showing <span className="font-medium">{ordered.length}</span> plans.
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-[900px] w-full border-collapse text-sm">
          <thead className="bg-slate-50 text-left">
            <tr className="[&>th]:border-b [&>th]:border-slate-200 [&>th]:px-3 [&>th]:py-3">
              <th className="sticky left-0 z-10 bg-slate-50">Plan</th>
              <th>Price</th>
              <th>Coverage</th>
              <th>Payment</th>
              <th>Attorney</th>
              <th>Waiting</th>
              <th>Family</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ordered.map((p, idx) => {
              const href = p.affiliateUrl || p.providerWebsiteUrl;
              const cta = p.ctaLabel || "Visit Provider";
              return (
                <tr
                  key={p.id}
                  className="border-b border-slate-100 last:border-b-0 [&>td]:px-3 [&>td]:py-3"
                >
                  <td className="sticky left-0 z-10 bg-white">
                    <div className="flex items-start gap-3">
                      <input
                        aria-label={`Compare ${p.name}`}
                        type="checkbox"
                        checked={compareIds.includes(p.id)}
                        onChange={() => toggleCompare(p.id)}
                        className="mt-1"
                      />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Link
                            href={`/plans/${p.slug}`}
                            className="font-medium hover:underline"
                          >
                            {p.name}
                          </Link>
                          {p.isSponsored ? (
                            <span className="rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-900">
                              Sponsored
                            </span>
                          ) : p.isFeatured ? (
                            <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                              Featured
                            </span>
                          ) : null}
                        </div>
                        <div className="truncate text-xs text-slate-600">
                          {p.providerName}
                        </div>
                        {p.lastVerifiedAt ? (
                          <div className="text-xs text-slate-500">
                            Last verified: {p.lastVerifiedAt}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="space-y-1">
                      <div>{formatMaybeMoney(p.priceMonthly)} / mo</div>
                      <div className="text-xs text-slate-600">
                        {p.priceAnnual != null ? `${formatMaybeMoney(p.priceAnnual)} / yr` : "—"}
                      </div>
                    </div>
                  </td>
                  <td>{formatCoverageType(p.coverageType)}</td>
                  <td>{formatPaymentStyle(p.paymentStyle)}</td>
                  <td>{formatAttorneyChoice(p.attorneyChoice)}</td>
                  <td>{formatWaitingPeriod(p.waitingPeriodDays)}</td>
                  <td>{formatFamilyCoverage(p.familyCoverage)}</td>
                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      <OutboundLink
                        href={href}
                        providerId={p.providerId}
                        planId={p.id}
                        placement="table"
                        pagePath="/compare"
                        positionIndex={idx}
                        ctaLabel={cta}
                        className="rounded bg-slate-900 px-3 py-2 text-white hover:bg-slate-800"
                      >
                        {cta}
                      </OutboundLink>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Compare tray */}
      {comparePlans.length > 0 ? (
        <div className="fixed bottom-4 left-0 right-0 z-20 px-4">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-lg md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <div className="text-sm font-medium">Compare</div>
              <div className="mt-1 flex flex-wrap gap-2 text-sm text-slate-700">
                {comparePlans.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className="rounded-full bg-slate-100 px-3 py-1 hover:bg-slate-200"
                    onClick={() => toggleCompare(p.id)}
                    title="Remove from compare"
                  >
                    {p.name} <span className="text-slate-500">×</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {compareIds.length >= 2 ? (
                <Link
                  href={`/compare/side-by-side?ids=${encodeURIComponent(compareIds.join(","))}`}
                  className="rounded bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                  onClick={() => trackEvent("compare_view", { plan_ids: compareIds })}
                >
                  Compare now
                </Link>
              ) : (
                <button
                  type="button"
                  className="cursor-not-allowed rounded bg-emerald-600/50 px-4 py-2 text-sm font-medium text-white"
                  title="Select at least 2 plans to compare"
                >
                  Compare now
                </button>
              )}
              <button
                type="button"
                className="text-sm text-slate-600 hover:underline"
                onClick={() => setCompareIds([])}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

