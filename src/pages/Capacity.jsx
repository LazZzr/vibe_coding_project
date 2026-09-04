import { PageHeader, Disclaimer } from '@/components/Layout';
import { Gauge } from 'lucide-react';
import StatCard from '@/components/StatCard';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { HABITATIONS } from '@/data/demoData';

const RISK_COLORS = { Low: '#16a34a', Moderate: '#ca8a04', High: '#ea580c', Critical: '#dc2626' };
const CAPACITY_COLORS = { Adequate: '#16a34a', Warning: '#ca8a04', Deficit: '#ea580c', 'Critical Deficit': '#dc2626' };

export default function Capacity() {
  const totalPop = HABITATIONS.reduce((s, h) => s + h.population, 0);
  const totalCapacity = HABITATIONS.reduce((s, h) => s + h.safeCapacity, 0);
  const totalDeficit = HABITATIONS.reduce((s, h) => s + h.capacityDeficit, 0);
  const totalSurplus = HABITATIONS.reduce((s, h) => s + h.capacitySurplus, 0);
  const deficitCount = HABITATIONS.filter((h) => h.capacityStatus === 'Deficit' || h.capacityStatus === 'Critical Deficit').length;

  // Population vs Capacity by district
  const byDistrict = {};
  HABITATIONS.forEach((h) => {
    if (!byDistrict[h.district]) byDistrict[h.district] = { district: h.district, population: 0, capacity: 0, deficit: 0 };
    byDistrict[h.district].population += h.population;
    byDistrict[h.district].capacity += h.safeCapacity;
    byDistrict[h.district].deficit += h.capacityDeficit;
  });
  const districtData = Object.values(byDistrict).sort((a, b) => b.deficit - a.deficit);

  // Capacity distribution
  const capDist = {};
  HABITATIONS.forEach((h) => { capDist[h.capacityStatus] = (capDist[h.capacityStatus] || 0) + 1; });
  const capDistData = Object.entries(capDist).map(([name, value]) => ({ name, value }));

  // Pop vs capacity chart data
  const popVsCapData = districtData.slice(0, 8).map((d) => ({
    district: d.district.length > 10 ? d.district.substring(0, 10) + '...' : d.district,
    Population: d.population,
    'Safe Capacity': d.capacity,
  }));

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
      <PageHeader title="Capacity Assessment" subtitle="Population vs available safe carrying capacity" icon={Gauge} />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <StatCard label="Total Population" value={totalPop} type="population" isDemo />
        <StatCard label="Available Capacity" value={totalCapacity} type="total" isDemo />
        <StatCard label="Capacity Deficit" value={totalDeficit} type="deficit" isDemo />
        <StatCard label="Capacity Surplus" value={totalSurplus} type="capacity" isDemo />
        <StatCard label="Habitations w/ Deficit" value={deficitCount} type="critical" isDemo />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Population vs Capacity */}
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Population vs Safe Capacity by District</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={popVsCapData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="district" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="Population" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Safe Capacity" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Capacity Deficit by District */}
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Capacity Deficit by District</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={districtData.slice(0, 8)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="district" type="category" tick={{ fontSize: 10 }} width={90} />
              <Tooltip />
              <Bar dataKey="deficit" fill="#ea580c" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Capacity Status Distribution */}
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Capacity Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={capDistData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {capDistData.map((entry, i) => (
                  <Cell key={i} fill={CAPACITY_COLORS[entry.name] || '#94a3b8'} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Status summary table */}
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Capacity Status Breakdown</h3>
          <div className="space-y-2">
            {capDistData.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ background: CAPACITY_COLORS[item.name] }} />
                  <span className="text-sm text-slate-700">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-slate-800">{item.value} habitations</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Disclaimer text="Capacity values shown in the prototype are assessment/demo values and should not be interpreted as official government evacuation standards." />
    </div>
  );
}
