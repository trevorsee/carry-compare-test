import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { AdminNav } from "@/components/AdminNav";
import { isAdminRequest } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  if (!(await isAdminRequest())) redirect("/admin");
}

const SourceSchema = z.object({
  planId: z.string().min(1),
  url: z.string().url(),
  title: z.string().optional(),
  note: z.string().optional(),
});

async function addSource(formData: FormData) {
  "use server";
  await requireAdmin();
  const parsed = SourceSchema.parse({
    planId: formData.get("planId")?.toString() || "",
    url: formData.get("url")?.toString() || "",
    title: formData.get("title")?.toString() || undefined,
    note: formData.get("note")?.toString() || undefined,
  });

  const src = await prisma.source.create({
    data: {
      planId: parsed.planId,
      url: parsed.url,
      title: parsed.title,
      note: parsed.note,
    },
  });

  const plan = await prisma.plan.findUnique({ where: { id: parsed.planId } });
  revalidatePath("/admin/sources");
  revalidatePath("/admin/plans");
  revalidatePath("/compare");
  if (plan) revalidatePath(`/plans/${plan.slug}`);
  void src;
}

export default async function AdminSourcesPage() {
  await requireAdmin();
  const plans = await prisma.plan.findMany({
    orderBy: { updatedAt: "desc" },
    include: { provider: true, sources: { orderBy: { capturedAt: "desc" } } },
  });

  return (
    <div className="space-y-6">
      <AdminNav />
      <h1 className="text-2xl font-semibold">Sources</h1>
      <p className="text-sm text-slate-600">
        Attach at least one citation to every published plan page.
      </p>

      <div className="grid gap-4">
        {plans.map((p) => (
          <details key={p.id} className="rounded-lg border border-slate-200 p-4">
            <summary className="cursor-pointer">
              <span className="font-medium">{p.provider.name}</span> — {p.name}{" "}
              <span className="text-sm text-slate-600">({p.sources.length} sources)</span>
            </summary>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-sm font-medium">Existing</div>
                <ul className="mt-2 space-y-2 text-sm">
                  {p.sources.length ? (
                    p.sources.map((s) => (
                      <li key={s.id} className="rounded border border-slate-100 p-3">
                        <div className="font-medium">{s.title || "Source"}</div>
                        <div className="mt-1 break-all text-slate-700">{s.url}</div>
                        {s.note ? <div className="mt-1 text-slate-600">{s.note}</div> : null}
                        <div className="mt-1 text-xs text-slate-500">
                          captured {s.capturedAt.toISOString().slice(0, 10)}
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="text-slate-700">No sources yet.</li>
                  )}
                </ul>
              </div>

              <div>
                <div className="text-sm font-medium">Add source</div>
                <form action={addSource} className="mt-2 grid gap-2">
                  <input type="hidden" name="planId" value={p.id} />
                  <input
                    name="url"
                    placeholder="https://provider.com/terms"
                    className="rounded border border-slate-300 px-3 py-2 text-sm"
                  />
                  <input
                    name="title"
                    placeholder="Title (optional)"
                    className="rounded border border-slate-300 px-3 py-2 text-sm"
                  />
                  <textarea
                    name="note"
                    placeholder="What this source supports (optional)"
                    className="rounded border border-slate-300 px-3 py-2 text-sm"
                    rows={3}
                  />
                  <button className="rounded bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800">
                    Add
                  </button>
                </form>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

