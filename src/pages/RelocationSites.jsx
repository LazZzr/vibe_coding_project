import { PageHeader, Disclaimer } from '@/components/Layout';
import { MapPin, ArrowRight, Building2 } from 'lucide-react';
import MapView from '@/components/MapView';
import { StatusBadge } from '@/components/Badges';
import { RELOCATION_SITES, HABITATIONS } from '@/data/demoData';

export default function RelocationSites() {
  const atRisk = HABITATIONS.filter((h) => h.priority === 'Immediate').slice(0, 5);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
      <PageHeader title="Relocation Sites" subtitle="Safe-site assessment & candidate relocation areas" icon={Building2} />

      {/* Map */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-700">Prototype Route Visualization</h3>
            <p className="text-xs text-slate-500">At-risk habitations (red) → Potential relocation sites (blue)</p>
          </div>
        </div>
        <MapView
          habitations={atRisk}
          relocationSites={RELOCATION_SITES}
          showSites
          height="450px"
        />
      </div>

      {/* Sites table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden mb-6">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Site</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase">District</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Capacity</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Occupancy</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Available</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Accessibility</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Distance (km)</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Infrastructure</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Suitability</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {RELOCATION_SITES.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="px-3 py-3 font-medium text-slate-800 whitespace-nowrap">{s.name}</td>
                  <td className="px-3 py-3 text-slate-600 whitespace-nowrap">{s.district}</td>
                  <td className="px-3 py-3 text-slate-600 whitespace-nowrap">{s.capacity.toLocaleString()}</td>
                  <td className="px-3 py-3 text-slate-600 whitespace-nowrap">{s.occupancy.toLocaleString()}</td>
                  <td className="px-3 py-3 font-medium text-green-600 whitespace-nowrap">{s.available.toLocaleString()}</td>
                  <td className="px-3 py-3 text-slate-600 whitespace-nowrap">{s.accessibility}</td>
                  <td className="px-3 py-3 text-slate-600 whitespace-nowrap">{s.distance}</td>
                  <td className="px-3 py-3 text-slate-600 whitespace-nowrap">{s.infrastructure}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className={`text-xs font-medium ${
                      s.suitability === 'High' ? 'text-green-600' : s.suitability === 'Moderate' ? 'text-amber-600' : 'text-slate-500'
                    }`}>{s.suitability}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap"><StatusBadge status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Disclaimer text="Prototype Route Visualization — actual routing between at-risk habitations and relocation sites requires ground survey and logistical planning. Site data shown is demo/sample data." />
    </div>
  );
}
