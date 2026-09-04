import { useState } from 'react';
import { PageHeader } from '@/components/Layout';
import { Waves, Mountain, Wind, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { DISASTER_INFO } from '@/data/demoData';

const ICON_MAP = { Waves, Mountain, Wind };

const COLOR_CLASSES = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  stone: 'bg-stone-100 text-stone-700 border-stone-200',
};

export default function DisasterInformation() {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(null);

  const filtered = DISASTER_INFO.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.causes.some((c) => c.toLowerCase().includes(query.toLowerCase())) ||
      d.impact.some((c) => c.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
      <PageHeader title="Disaster Information" subtitle="Hazard types, causes, indicators & mitigation" icon={Waves} />

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search disasters, causes, impacts..."
          className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-4">
        {filtered.map((disaster) => {
          const Icon = ICON_MAP[disaster.icon] || Waves;
          const isOpen = expanded === disaster.id;
          return (
            <div key={disaster.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <button
                onClick={() => setExpanded(isOpen ? null : disaster.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${COLOR_CLASSES[disaster.color]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-semibold text-slate-800">{disaster.name}</h3>
                    <p className="text-xs text-slate-500">Causes, indicators, impact & mitigation</p>
                  </div>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-slate-100 pt-4">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Causes</h4>
                    <ul className="space-y-1">
                      {disaster.causes.map((c, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <span className="text-slate-300 mt-0.5">•</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Risk Indicators</h4>
                    <ul className="space-y-1">
                      {disaster.riskIndicators.map((c, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <span className="text-slate-300 mt-0.5">•</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Impact</h4>
                    <ul className="space-y-1">
                      {disaster.impact.map((c, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <span className="text-slate-300 mt-0.5">•</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Vulnerable Areas</h4>
                    <ul className="space-y-1">
                      {disaster.vulnerableAreas.map((c, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <span className="text-slate-300 mt-0.5">•</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:col-span-2 lg:col-span-2">
                    <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Mitigation</h4>
                    <ul className="space-y-1">
                      {disaster.mitigation.map((c, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <span className="text-slate-300 mt-0.5">•</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
