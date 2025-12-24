import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { AdminNav } from "@/components/AdminNav";
import { isAdminRequest } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  if (!(await isAdminRequest())) redirect("/admin");
}

const PlanSchema = z.object({
  id: z.string().optional(),
  providerId: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  priceMonthly: z.string().optional(),
  priceAnnual: z.string().optional(),
  paymentStyle: z.enum(["upfront", "reimbursement", "mixed", "unknown"]),
  attorneyChoice: z.enum(["yes", "limited", "no", "unknown"]),
  waitingPeriodDays: z.string().optional(),
  coverageType: z.enum(["criminal", "civil", "both", "unknown"]),
  familyCoverage: z.enum(["yes", "limited", "no", "unknown"]),
  coverageNotes: z.string().optional(),
  exclusionsNotes: z.string().optional(),
  supportFeatures: z.string().optional(),
  limitsJson: z.string().optional(),
  availabilityJson: z.string().optional(),
  affiliateUrl: z.string().optional(),
  ctaLabel: z.string().optional(),
  isFeatured: z.coerce.boolean().default(false),
  isSponsored: z.coerce.boolean().default(false),
  sponsoredRankPosition: z.string().optional(),
  overallScore: z.string().optional(),
  lastVerifiedAt: z.string().optional(),
  isActive: z.coerce.boolean().default(true),
  isPublished: z.coerce.boolean().default(false),
  changeSummary: z.string().optional(),
});

function parseFloatOrNull(v?: string) {
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function parseIntOrNull(v?: string) {
  if (!v) return null;
  const n = Number(v);
  return Number.isInteger(n) ? n : null;
}

function parseJsonOrFallback(v: string | undefined, fallback: unknown) {
  if (!v) return fallback;
  try {
    return JSON.parse(v);
  } catch {
    return fallback;
  }
}

async function upsertPlan(formData: FormData) {
  "use server";
  await requireAdmin();

  const parsed = PlanSchema.parse({
    id: formData.get("id")?.toString() || undefined,
    providerId: formData.get("providerId")?.toString() || "",
    name: formData.get("name")?.toString() || "",
    slug: formData.get("slug")?.toString() || "",
    priceMonthly: formData.get("priceMonthly")?.toString() || undefined,
    priceAnnual: formData.get("priceAnnual")?.toString() || undefined,
    paymentStyle: formData.get("paymentStyle")?.toString() || "unknown",
    attorneyChoice: formData.get("attorneyChoice")?.toString() || "unknown",
    waitingPeriodDays: formData.get("waitingPeriodDays")?.toString() || undefined,
    coverageType: formData.get("coverageType")?.toString() || "unknown",
    familyCoverage: formData.get("familyCoverage")?.toString() || "unknown",
    coverageNotes: formData.get("coverageNotes")?.toString() || undefined,
    exclusionsNotes: formData.get("exclusionsNotes")?.toString() || undefined,
    supportFeatures: formData.get("supportFeatures")?.toString() || undefined,
    limitsJson: formData.get("limitsJson")?.toString() || undefined,
    availabilityJson: formData.get("availabilityJson")?.toString() || undefined,
    affiliateUrl: formData.get("affiliateUrl")?.toString() || undefined,
    ctaLabel: formData.get("ctaLabel")?.toString() || undefined,
    isFeatured: formData.get("isFeatured")?.toString() === "on",
    isSponsored: formData.get("isSponsored")?.toString() === "on",
    sponsoredRankPosition: formData.get("sponsoredRankPosition")?.toString() || undefined,
    overallScore: formData.get("overallScore")?.toString() || undefined,
    lastVerifiedAt: formData.get("lastVerifiedAt")?.toString() || undefined,
    isActive: formData.get("isActive")?.toString() === "on",
    isPublished: formData.get("isPublished")?.toString() === "on",
    changeSummary: formData.get("changeSummary")?.toString() || undefined,
  });

  const lastVerifiedAt = parsed.lastVerifiedAt ? new Date(parsed.lastVerifiedAt) : null;
  if (parsed.isPublished && !lastVerifiedAt) {
    throw new Error("Cannot publish without last verified date.");
  }

  const supportFeatures = (parsed.supportFeatures || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const data = {
    providerId: parsed.providerId,
    name: parsed.name,
    slug: parsed.slug,
    priceMonthly: parseFloatOrNull(parsed.priceMonthly),
    priceAnnual: parseFloatOrNull(parsed.priceAnnual),
    paymentStyle: parsed.paymentStyle,
    attorneyChoice: parsed.attorneyChoice,
    waitingPeriodDays: parseIntOrNull(parsed.waitingPeriodDays),
    coverageType: parsed.coverageType,
    familyCoverage: parsed.familyCoverage,
    coverageNotes: parsed.coverageNotes,
    exclusionsNotes: parsed.exclusionsNotes,
    supportFeatures,
    limitsJson: parseJsonOrFallback(parsed.limitsJson, {}),
    availabilityJson: parseJsonOrFallback(parsed.availabilityJson, {}),
    affiliateUrl: parsed.affiliateUrl || null,
    ctaLabel: parsed.ctaLabel || null,
    isFeatured: parsed.isFeatured,
    isSponsored: parsed.isSponsored,
    sponsoredRankPosition: parseIntOrNull(parsed.sponsoredRankPosition),
    overallScore: parseFloatOrNull(parsed.overallScore),
    lastVerifiedAt,
    isActive: parsed.isActive,
    isPublished: parsed.isPublished,
  } as const;

  const saved = parsed.id
    ? await prisma.plan.update({ where: { id: parsed.id }, data })
    : await prisma.plan.create({ data });

  if (parsed.changeSummary) {
    await prisma.changeLog.create({
      data: {
        planId: saved.id,
        summary: parsed.changeSummary,
        changedBy: "admin",
      },
    });
  }

  revalidatePath("/admin/plans");
  revalidatePath("/compare");
  revalidatePath(`/plans/${saved.slug}`);
}

export default async function AdminPlansPage() {
  await requireAdmin();

  const [plans, providers] = await Promise.all([
    prisma.plan.findMany({
      orderBy: { updatedAt: "desc" },
      include: { provider: true, sources: true },
    }),
    prisma.provider.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <AdminNav />
      <h1 className="text-2xl font-semibold">Plans</h1>

      <details className="rounded-lg border border-slate-200 p-4">
        <summary className="cursor-pointer font-medium">Add plan</summary>
        <form action={upsertPlan} className="mt-4 grid gap-3">
          <input type="hidden" name="id" value="" />
          <div className="grid gap-3 md:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm">
              Provider
              <select name="providerId" className="rounded border border-slate-300 px-3 py-2">
                {providers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Name
              <input name="name" className="rounded border border-slate-300 px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1 text-sm md:col-span-2">
              Slug
              <input name="slug" className="rounded border border-slate-300 px-3 py-2" />
            </label>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            <label className="flex flex-col gap-1 text-sm">
              Monthly price
              <input name="priceMonthly" className="rounded border border-slate-300 px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Annual price
              <input name="priceAnnual" className="rounded border border-slate-300 px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Waiting (days)
              <input
                name="waitingPeriodDays"
                className="rounded border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Last verified
              <input
                name="lastVerifiedAt"
                type="date"
                className="rounded border border-slate-300 px-3 py-2"
              />
            </label>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            <label className="flex flex-col gap-1 text-sm">
              Payment style
              <select name="paymentStyle" className="rounded border border-slate-300 px-3 py-2">
                {["upfront", "reimbursement", "mixed", "unknown"].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Attorney choice
              <select
                name="attorneyChoice"
                className="rounded border border-slate-300 px-3 py-2"
              >
                {["yes", "limited", "no", "unknown"].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Coverage type
              <select name="coverageType" className="rounded border border-slate-300 px-3 py-2">
                {["criminal", "civil", "both", "unknown"].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Family coverage
              <select name="familyCoverage" className="rounded border border-slate-300 px-3 py-2">
                {["yes", "limited", "no", "unknown"].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm">
              Affiliate URL (optional)
              <input name="affiliateUrl" className="rounded border border-slate-300 px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              CTA label (optional)
              <input name="ctaLabel" className="rounded border border-slate-300 px-3 py-2" />
            </label>
          </div>

          <label className="flex flex-col gap-1 text-sm">
            Support features (comma-separated)
            <input
              name="supportFeatures"
              className="rounded border border-slate-300 px-3 py-2"
              placeholder="e.g. 24/7 hotline, incident response"
            />
          </label>

          <div className="grid gap-3 md:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm">
              Limits JSON
              <textarea name="limitsJson" className="rounded border border-slate-300 px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Availability JSON
              <textarea
                name="availabilityJson"
                className="rounded border border-slate-300 px-3 py-2"
              />
            </label>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm">
              Coverage notes
              <textarea
                name="coverageNotes"
                className="rounded border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Exclusions notes
              <textarea
                name="exclusionsNotes"
                className="rounded border border-slate-300 px-3 py-2"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isActive" defaultChecked />
              Active
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isPublished" />
              Published (requires last verified + sources)
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isFeatured" />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isSponsored" />
              Sponsored
            </label>
            <label className="flex items-center gap-2 text-sm">
              Sponsored position
              <input
                name="sponsoredRankPosition"
                className="w-20 rounded border border-slate-300 px-2 py-2 text-sm"
              />
            </label>
            <label className="flex items-center gap-2 text-sm">
              Overall score
              <input
                name="overallScore"
                className="w-24 rounded border border-slate-300 px-2 py-2 text-sm"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1 text-sm">
            Change log summary (optional)
            <input
              name="changeSummary"
              className="rounded border border-slate-300 px-3 py-2"
              placeholder="What changed and why?"
            />
          </label>

          <button className="rounded bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800">
            Save
          </button>
        </form>
      </details>

      <div className="grid gap-4">
        {plans.map((p) => (
          <details key={p.id} className="rounded-lg border border-slate-200 p-4">
            <summary className="cursor-pointer">
              <span className="font-medium">{p.provider.name}</span>{" "}
              <span className="text-slate-700">— {p.name}</span>{" "}
              <span className="text-sm text-slate-600">({p.slug})</span>
              {p.isSponsored ? (
                <span className="ml-2 rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-900">
                  sponsored
                </span>
              ) : null}
              {!p.isPublished ? (
                <span className="ml-2 rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                  draft
                </span>
              ) : null}
              <span className="ml-2 text-xs text-slate-500">
                sources: {p.sources.length}
              </span>
            </summary>

            <form action={upsertPlan} className="mt-4 grid gap-3">
              <input type="hidden" name="id" value={p.id} />
              <div className="grid gap-3 md:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm">
                  Provider
                  <select
                    name="providerId"
                    defaultValue={p.providerId}
                    className="rounded border border-slate-300 px-3 py-2"
                  >
                    {providers.map((pr) => (
                      <option key={pr.id} value={pr.id}>
                        {pr.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  Name
                  <input
                    name="name"
                    defaultValue={p.name}
                    className="rounded border border-slate-300 px-3 py-2"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm md:col-span-2">
                  Slug
                  <input
                    name="slug"
                    defaultValue={p.slug}
                    className="rounded border border-slate-300 px-3 py-2"
                  />
                </label>
              </div>

              <div className="grid gap-3 md:grid-cols-4">
                <label className="flex flex-col gap-1 text-sm">
                  Monthly price
                  <input
                    name="priceMonthly"
                    defaultValue={p.priceMonthly ?? ""}
                    className="rounded border border-slate-300 px-3 py-2"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  Annual price
                  <input
                    name="priceAnnual"
                    defaultValue={p.priceAnnual ?? ""}
                    className="rounded border border-slate-300 px-3 py-2"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  Waiting (days)
                  <input
                    name="waitingPeriodDays"
                    defaultValue={p.waitingPeriodDays ?? ""}
                    className="rounded border border-slate-300 px-3 py-2"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  Last verified
                  <input
                    name="lastVerifiedAt"
                    type="date"
                    defaultValue={p.lastVerifiedAt ? p.lastVerifiedAt.toISOString().slice(0, 10) : ""}
                    className="rounded border border-slate-300 px-3 py-2"
                  />
                </label>
              </div>

              <div className="grid gap-3 md:grid-cols-4">
                <label className="flex flex-col gap-1 text-sm">
                  Payment style
                  <select
                    name="paymentStyle"
                    defaultValue={p.paymentStyle}
                    className="rounded border border-slate-300 px-3 py-2"
                  >
                    {["upfront", "reimbursement", "mixed", "unknown"].map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  Attorney choice
                  <select
                    name="attorneyChoice"
                    defaultValue={p.attorneyChoice}
                    className="rounded border border-slate-300 px-3 py-2"
                  >
                    {["yes", "limited", "no", "unknown"].map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  Coverage type
                  <select
                    name="coverageType"
                    defaultValue={p.coverageType}
                    className="rounded border border-slate-300 px-3 py-2"
                  >
                    {["criminal", "civil", "both", "unknown"].map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  Family coverage
                  <select
                    name="familyCoverage"
                    defaultValue={p.familyCoverage}
                    className="rounded border border-slate-300 px-3 py-2"
                  >
                    {["yes", "limited", "no", "unknown"].map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm">
                  Affiliate URL (optional)
                  <input
                    name="affiliateUrl"
                    defaultValue={p.affiliateUrl ?? ""}
                    className="rounded border border-slate-300 px-3 py-2"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  CTA label (optional)
                  <input
                    name="ctaLabel"
                    defaultValue={p.ctaLabel ?? ""}
                    className="rounded border border-slate-300 px-3 py-2"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1 text-sm">
                Support features (comma-separated)
                <input
                  name="supportFeatures"
                  defaultValue={Array.isArray(p.supportFeatures) ? (p.supportFeatures as any[]).join(", ") : ""}
                  className="rounded border border-slate-300 px-3 py-2"
                />
              </label>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm">
                  Limits JSON
                  <textarea
                    name="limitsJson"
                    defaultValue={JSON.stringify(p.limitsJson ?? {}, null, 2)}
                    className="rounded border border-slate-300 px-3 py-2 font-mono text-xs"
                    rows={6}
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  Availability JSON
                  <textarea
                    name="availabilityJson"
                    defaultValue={JSON.stringify(p.availabilityJson ?? {}, null, 2)}
                    className="rounded border border-slate-300 px-3 py-2 font-mono text-xs"
                    rows={6}
                  />
                </label>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm">
                  Coverage notes
                  <textarea
                    name="coverageNotes"
                    defaultValue={p.coverageNotes ?? ""}
                    className="rounded border border-slate-300 px-3 py-2"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  Exclusions notes
                  <textarea
                    name="exclusionsNotes"
                    defaultValue={p.exclusionsNotes ?? ""}
                    className="rounded border border-slate-300 px-3 py-2"
                  />
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="isActive" defaultChecked={p.isActive} />
                  Active
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="isPublished" defaultChecked={p.isPublished} />
                  Published
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="isFeatured" defaultChecked={p.isFeatured} />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="isSponsored" defaultChecked={p.isSponsored} />
                  Sponsored
                </label>
                <label className="flex items-center gap-2 text-sm">
                  Sponsored position
                  <input
                    name="sponsoredRankPosition"
                    defaultValue={p.sponsoredRankPosition ?? ""}
                    className="w-20 rounded border border-slate-300 px-2 py-2 text-sm"
                  />
                </label>
                <label className="flex items-center gap-2 text-sm">
                  Overall score
                  <input
                    name="overallScore"
                    defaultValue={p.overallScore ?? ""}
                    className="w-24 rounded border border-slate-300 px-2 py-2 text-sm"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1 text-sm">
                Change log summary (optional)
                <input
                  name="changeSummary"
                  className="rounded border border-slate-300 px-3 py-2"
                  placeholder="What changed and why?"
                />
              </label>

              <button className="rounded bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800">
                Save changes
              </button>
            </form>
          </details>
        ))}
      </div>
    </div>
  );
}

