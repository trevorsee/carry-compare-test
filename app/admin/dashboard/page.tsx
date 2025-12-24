'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [plans, setPlans] = useState<any[]>([]);
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const [plansRes, providersRes] = await Promise.all([
        fetch('/api/admin/plans', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('/api/admin/providers', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (plansRes.ok && providersRes.ok) {
        const plansData = await plansRes.json();
        const providersData = await providersRes.json();
        setPlans(plansData.plans || []);
        setProviders(providersData.providers || []);
      } else {
        router.push('/admin');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Link
            href="/admin/providers/new"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            New Provider
          </Link>
          <Link
            href="/admin/plans/new"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            New Plan
          </Link>
          <button
            onClick={handleLogout}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Providers ({providers.length})</h2>
          <div className="bg-white border border-gray-200 rounded">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className="p-4 border-b border-gray-200 flex justify-between items-center"
              >
                <div>
                  <Link
                    href={`/admin/providers/${provider.id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {provider.name}
                  </Link>
                  <p className="text-sm text-gray-600">{provider.slug}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    provider.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {provider.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Plans ({plans.length})</h2>
          <div className="bg-white border border-gray-200 rounded">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="p-4 border-b border-gray-200 flex justify-between items-center"
              >
                <div>
                  <Link
                    href={`/admin/plans/${plan.id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {plan.name}
                  </Link>
                  <p className="text-sm text-gray-600">{plan.provider.name}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    plan.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {plan.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
