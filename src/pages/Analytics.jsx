import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/Layout';
import { BarChart3, Filter } from 'lucide-react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { HABITATIONS, DISTRICTS } from '@/data/demoData';

const RISK_COLORS = { Low: '#16a34a', Moderate: '#ca8a04', High: '#ea580c', Critical: '#dc2626' };
const HAZARD_COLORS = { Flood: '#2563eb', Landslide: '#ea580c', Erosion: '#78716c' };
const PRIORITY_COLORS = { Immediate: '#dc2626', 'Short-Term': '#ea580c', 'Medium-Term': '#ca8a04', Monitor: '#16a34a' };
const CAPACITY_COLORS = { Adequate: '#16a34a', Warning: '#ca8a04', Deficit: '#ea580c', 'Critical Deficit': '#dc2626' };

export default function Analytics() {
  const [district, setDistrict] = useState('');

  const data = useMemo(() => {
    const filtered = district ? HABITATIONS.filter((h) => h.district === district) : HABITATIONS;

    const riskDist = { Low: 0, Moderate: 0, High: 0, Critical: 0 };
    const hazardDist = { Flood: 0, Landslide: 0, Erosion: 0 };
    const priorityDist = { Immediate: 0, 'Short-Term': 0, 'Medium-Term': 0, Monitor: 0 };
    const capacityDist = { Adequate: 0, Warning: 0, Deficit: 0, 'Critical Deficit': 0 };
    const popByHazard = { Flood: 0, Landslide: 0, Erosion: 0 };

    filtered.forEach((h) => {
      riskDist[h.riskLevel]++;
      hazardDist[h.hazard]++;
      priorityDist[h.priority]++;
      capacityDist[h.capacityStatus]++;
      popByHazard[h.hazard] += h.population;
    });

    return {
      riskData: Object.entries(riskDist).map(([name, value]) => ({ name, value })),
      hazardData: Object.entries(hazardDist).map(([name, value]) => ({ name, value })),
      priorityData: Object.entries(priorityDist).map(([name, value]) => ({ name, value })),
      capacityData: Object.entries(capacityDist).map(([name, value]) => ({ name, value })),
      popData: Object.entries(popByHazard).map(([name, value]) => ({ name, population: value })),
    };
  }, [district]);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
      <PageHeader title="Analytics" subtitle="Risk, hazard & capacity distribution dashboard" icon={BarChart3}>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Districts</option>
            {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution */}
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={data.riskData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {data.riskData.map((entry, i) => (
                  <Cell key={i} fill={RISK_COLORS[entry.name] || '#94a3b8'} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Hazard Distribution */}
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Hazard Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.hazardData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" name="Habitations" radius={[4, 4, 0, 0]}>
                {data.hazardData.map((entry, i) => (
                  <Cell key={i} fill={HAZARD_COLORS[entry.name] || '#94a3b8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Population at Risk by Hazard */}
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Population at Risk by Hazard</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.popData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="population" name="Population" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Relocation Priority */}
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Relocation Priority Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={data.priorityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {data.priorityData.map((entry, i) => (
                  <Cell key={i} fill={PRIORITY_COLORS[entry.name] || '#94a3b8'} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Capacity Status */}
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Capacity Status Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={data.capacityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {data.capacityData.map((entry, i) => (
                  <Cell key={i} fill={CAPACITY_COLORS[entry.name] || '#94a3b8'} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-slate-50 rounded-md">
              <span className="text-sm text-slate-600">Total Habitations</span>
              <span className="text-sm font-semibold text-slate-800">{district ? HABITATIONS.filter(h => h.district === district).length : HABITATIONS.length}</span>
            </div>
            <div className="flex justify-between p-3 bg-red-50 rounded-md">
              <span className="text-sm text-slate-600">Critical Risk</span>
              <span className="text-sm font-semibold text-red-700">{data.riskData.find(d => d.name === 'Critical')?.value || 0}</span>
            </div>
            <div className="flex justify-between p-3 bg-orange-50 rounded-md">
              <span className="text-sm text-slate-600">Immediate Relocation</span>
              <span className="text-sm font-semibold text-orange-700">{data.priorityData.find(d => d.name === 'Immediate')?.value || 0}</span>
            </div>
            <div className="flex justify-between p-3 bg-amber-50 rounded-md">
              <span className="text-sm text-slate-600">Capacity Deficit</span>
              <span className="text-sm font-semibold text-amber-700">{(data.capacityData.find(d => d.name === 'Deficit')?.value || 0) + (data.capacityData.find(d => d.name === 'Critical Deficit')?.value || 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
