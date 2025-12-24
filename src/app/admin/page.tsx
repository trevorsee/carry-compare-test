import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const providers = await prisma.provider.findMany({
    include: { _count: { select: { plans: true } } }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded opacity-50 cursor-not-allowed">Add Provider (WIP)</button>
      </div>
      
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b">
             <tr>
               <th className="px-6 py-3">Provider</th>
               <th className="px-6 py-3">Plans</th>
               <th className="px-6 py-3">Status</th>
               <th className="px-6 py-3">Actions</th>
             </tr>
          </thead>
          <tbody className="divide-y">
            {providers.map(p => (
              <tr key={p.id}>
                <td className="px-6 py-4 font-medium">{p.name}</td>
                <td className="px-6 py-4">{p._count.plans}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${p.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100'}`}>
                    {p.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-slate-400">Edit</span>
                </td>
              </tr>
            ))}
            {providers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  No providers found. Run seed script.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
