import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { AdminNav } from "@/components/AdminNav";
import { isAdminRequest } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

const ProviderSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  slug: z.string().min(1),
  websiteUrl: z.string().url(),
  summaryShort: z.string().optional(),
  disclosureNotes: z.string().optional(),
  isActive: z.coerce.boolean().default(true),
});

async function requireAdmin() {
  if (!(await isAdminRequest())) redirect("/admin");
}

async function upsertProvider(formData: FormData) {
  "use server";
  await requireAdmin();

  const parsed = ProviderSchema.parse({
    id: formData.get("id")?.toString() || undefined,
    name: formData.get("name")?.toString() || "",
    slug: formData.get("slug")?.toString() || "",
    websiteUrl: formData.get("websiteUrl")?.toString() || "",
    summaryShort: formData.get("summaryShort")?.toString() || undefined,
    disclosureNotes: formData.get("disclosureNotes")?.toString() || undefined,
    isActive: formData.get("isActive")?.toString() === "on",
  });

  if (parsed.id) {
    await prisma.provider.update({
      where: { id: parsed.id },
      data: {
        name: parsed.name,
        slug: parsed.slug,
        websiteUrl: parsed.websiteUrl,
        summaryShort: parsed.summaryShort,
        disclosureNotes: parsed.disclosureNotes,
        isActive: parsed.isActive,
      },
    });
  } else {
    await prisma.provider.create({
      data: {
        name: parsed.name,
        slug: parsed.slug,
        websiteUrl: parsed.websiteUrl,
        summaryShort: parsed.summaryShort,
        disclosureNotes: parsed.disclosureNotes,
        isActive: parsed.isActive,
      },
    });
  }

  revalidatePath("/admin/providers");
}

export default async function AdminProvidersPage() {
  await requireAdmin();
  const providers = await prisma.provider.findMany({
    orderBy: { updatedAt: "desc" },
    include: { plans: true },
  });

  return (
    <div className="space-y-6">
      <AdminNav />
      <h1 className="text-2xl font-semibold">Providers</h1>

      <details className="rounded-lg border border-slate-200 p-4" open>
        <summary className="cursor-pointer font-medium">Add provider</summary>
        <form action={upsertProvider} className="mt-4 grid gap-3 md:grid-cols-2">
          <input type="hidden" name="id" value="" />
          <label className="flex flex-col gap-1 text-sm">
            Name
            <input name="name" className="rounded border border-slate-300 px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Slug
            <input name="slug" className="rounded border border-slate-300 px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm md:col-span-2">
            Website URL
            <input name="websiteUrl" className="rounded border border-slate-300 px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm md:col-span-2">
            Summary (short)
            <textarea name="summaryShort" className="rounded border border-slate-300 px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1 text-sm md:col-span-2">
            Disclosure notes
            <textarea
              name="disclosureNotes"
              className="rounded border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isActive" defaultChecked />
            Active
          </label>
          <div className="md:col-span-2">
            <button className="rounded bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800">
              Save
            </button>
          </div>
        </form>
      </details>

      <div className="grid gap-4">
        {providers.map((p) => (
          <details key={p.id} className="rounded-lg border border-slate-200 p-4">
            <summary className="cursor-pointer">
              <span className="font-medium">{p.name}</span>{" "}
              <span className="text-sm text-slate-600">({p.plans.length} plans)</span>
              {!p.isActive ? (
                <span className="ml-2 rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                  inactive
                </span>
              ) : null}
            </summary>
            <form action={upsertProvider} className="mt-4 grid gap-3 md:grid-cols-2">
              <input type="hidden" name="id" value={p.id} />
              <label className="flex flex-col gap-1 text-sm">
                Name
                <input
                  name="name"
                  defaultValue={p.name}
                  className="rounded border border-slate-300 px-3 py-2"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                Slug
                <input
                  name="slug"
                  defaultValue={p.slug}
                  className="rounded border border-slate-300 px-3 py-2"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm md:col-span-2">
                Website URL
                <input
                  name="websiteUrl"
                  defaultValue={p.websiteUrl}
                  className="rounded border border-slate-300 px-3 py-2"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm md:col-span-2">
                Summary (short)
                <textarea
                  name="summaryShort"
                  defaultValue={p.summaryShort ?? ""}
                  className="rounded border border-slate-300 px-3 py-2"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm md:col-span-2">
                Disclosure notes
                <textarea
                  name="disclosureNotes"
                  defaultValue={p.disclosureNotes ?? ""}
                  className="rounded border border-slate-300 px-3 py-2"
                />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="isActive" defaultChecked={p.isActive} />
                Active
              </label>
              <div className="md:col-span-2">
                <button className="rounded bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800">
                  Save changes
                </button>
              </div>
            </form>
          </details>
        ))}
      </div>
    </div>
  );
}

