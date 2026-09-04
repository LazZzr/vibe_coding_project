import { useState, useMemo } from 'react';
import { PageHeader, Disclaimer } from '@/components/Layout';
import { Map as MapIcon, SlidersHorizontal } from 'lucide-react';
import MapView from '@/components/MapView';
import MapLegend from '@/components/MapLegend';
import FilterPanel from '@/components/FilterPanel';
import { HABITATIONS, RELOCATION_SITES, DISTRICTS } from '@/data/demoData';

export default function RiskMap() {
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(true);

  const filtered = useMemo(() => {
    return HABITATIONS.filter((h) => {
      if (filters.district && h.district !== filters.district) return false;
      if (filters.hazard && h.hazard !== filters.hazard) return false;
      if (filters.riskLevel && h.riskLevel !== filters.riskLevel) return false;
      if (filters.vulnerability && h.vulnerability !== filters.vulnerability) return false;
      if (filters.capacityStatus && h.capacityStatus !== filters.capacityStatus) return false;
      if (filters.priority && h.priority !== filters.priority) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
      <PageHeader title="Risk Map" subtitle="GIS command center — hazard risk visualization" icon={MapIcon} />

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Filter Panel */}
        <div className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <SlidersHorizontal className="w-4 h-4 text-slate-600" />
              <h3 className="text-sm font-semibold text-slate-700">Filters</h3>
            </div>
            <FilterPanel filters={filters} onChange={setFilters} districts={DISTRICTS} />
          </div>
        </div>

        {/* Map */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">
                Showing <strong className="text-slate-800">{filtered.length}</strong> habitations
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden px-3 py-1.5 text-xs font-medium text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50"
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
          </div>
          <MapView habitations={filtered} relocationSites={RELOCATION_SITES} showSites height="600px" />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <MapLegend />
            <p className="text-xs text-slate-400">Demo Data — {filtered.length} markers displayed</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Disclaimer text="Map data shown is demo/sample data for the SIH 2026 prototype. Risk zones and markers are illustrative and do not represent official government hazard maps." />
      </div>
    </div>
  );
}
