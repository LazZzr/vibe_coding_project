export default function FilterPanel({ filters, onChange, districts }) {
  const update = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  const selectClass = "w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs font-medium text-slate-600 block mb-1">District</label>
        <select className={selectClass} value={filters.district || ''} onChange={(e) => update('district', e.target.value)}>
          <option value="">All Districts</option>
          {districts.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div>
        <label className="text-xs font-medium text-slate-600 block mb-1">Hazard Type</label>
        <select className={selectClass} value={filters.hazard || ''} onChange={(e) => update('hazard', e.target.value)}>
          <option value="">All Hazards</option>
          <option value="Flood">Flood</option>
          <option value="Landslide">Landslide</option>
          <option value="Erosion">Erosion</option>
        </select>
      </div>
      <div>
        <label className="text-xs font-medium text-slate-600 block mb-1">Risk Level</label>
        <select className={selectClass} value={filters.riskLevel || ''} onChange={(e) => update('riskLevel', e.target.value)}>
          <option value="">All Levels</option>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>
      <div>
        <label className="text-xs font-medium text-slate-600 block mb-1">Vulnerability</label>
        <select className={selectClass} value={filters.vulnerability || ''} onChange={(e) => update('vulnerability', e.target.value)}>
          <option value="">All Levels</option>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
          <option value="Very High">Very High</option>
        </select>
      </div>
      <div>
        <label className="text-xs font-medium text-slate-600 block mb-1">Capacity Status</label>
        <select className={selectClass} value={filters.capacityStatus || ''} onChange={(e) => update('capacityStatus', e.target.value)}>
          <option value="">All Statuses</option>
          <option value="Adequate">Adequate</option>
          <option value="Warning">Warning</option>
          <option value="Deficit">Deficit</option>
          <option value="Critical Deficit">Critical Deficit</option>
        </select>
      </div>
      <div>
        <label className="text-xs font-medium text-slate-600 block mb-1">Relocation Priority</label>
        <select className={selectClass} value={filters.priority || ''} onChange={(e) => update('priority', e.target.value)}>
          <option value="">All Priorities</option>
          <option value="Immediate">Immediate</option>
          <option value="Short-Term">Short-Term</option>
          <option value="Medium-Term">Medium-Term</option>
          <option value="Monitor">Monitor</option>
        </select>
      </div>
      <button
        onClick={() => onChange({})}
        className="w-full px-3 py-2 text-xs font-medium text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50"
      >
        Clear Filters
      </button>
    </div>
  );
}
