import { useParams, Link, useNavigate } from 'react-router-dom';
import { PageHeader, Disclaimer } from '@/components/Layout';
import {
  ArrowLeft, MapPin, Users, Home, Waves, Mountain, Wind,
  Gauge, Move, AlertTriangle, ShieldCheck, Activity,
} from 'lucide-react';
import { RiskBadge, PriorityBadge, CapacityBadge } from '@/components/Badges';
import MapView from '@/components/MapView';
import { getHabitationById } from '@/data/demoData';

function ProgressBar({ label, value, color }) {
  const pct = Math.min(100, value);
  const colorClass = color || (pct >= 70 ? 'bg-red-500' : pct >= 40 ? 'bg-amber-500' : 'bg-green-500');
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-slate-600">{label}</span>
        <span className="text-xs font-medium text-slate-700">{pct}%</span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${colorClass}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function HabitationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const h = getHabitationById(id);

  if (!h) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <AlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-slate-700 mb-2">Habitation Not Found</h2>
        <Link to="/habitations" className="text-sm text-blue-700 hover:text-blue-900">← Back to Habitations</Link>
      </div>
    );
  }

  const riskColor =
    h.riskLevel === 'Critical' ? 'text-red-600' :
    h.riskLevel === 'High' ? 'text-orange-600' :
    h.riskLevel === 'Moderate' ? 'text-yellow-600' : 'text-green-600';

  const riskBg =
    h.riskLevel === 'Critical' ? 'bg-red-50 border-red-200' :
    h.riskLevel === 'High' ? 'bg-orange-50 border-orange-200' :
    h.riskLevel === 'Moderate' ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200';

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{h.name}</h1>
          <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5" /> {h.district} District
          </p>
        </div>
        <div className="flex items-center gap-2">
          <RiskBadge level={h.riskLevel} />
          <PriorityBadge priority={h.priority} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          {/* Basic Info */}
          <section className="bg-white rounded-lg border border-slate-200 p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <Home className="w-4 h-4 text-slate-400" /> Basic Information
            </h2>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between"><dt className="text-slate-500">Population</dt><dd className="font-medium text-slate-700">{h.population.toLocaleString()}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">Households</dt><dd className="font-medium text-slate-700">{h.households.toLocaleString()}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">District</dt><dd className="font-medium text-slate-700">{h.district}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">Primary Hazard</dt><dd className="font-medium text-slate-700">{h.hazard}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">Location</dt><dd className="font-medium text-slate-700">{h.coords[0].toFixed(3)}, {h.coords[1].toFixed(3)}</dd></div>
            </dl>
          </section>

          {/* Hazard Exposure */}
          <section className="bg-white rounded-lg border border-slate-200 p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <Waves className="w-4 h-4 text-slate-400" /> Hazard Exposure
            </h2>
            <div className="space-y-4">
              <ProgressBar label="Flood Exposure" value={h.hazardExposure.Flood} color={h.hazard === 'Flood' ? 'bg-blue-500' : undefined} />
              <ProgressBar label="Landslide Exposure" value={h.hazardExposure.Landslide} color={h.hazard === 'Landslide' ? 'bg-amber-500' : undefined} />
              <ProgressBar label="Erosion Exposure" value={h.hazardExposure.Erosion} color={h.hazard === 'Erosion' ? 'bg-stone-500' : undefined} />
            </div>
          </section>

          {/* Vulnerability */}
          <section className="bg-white rounded-lg border border-slate-200 p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-400" /> Vulnerability
            </h2>
            <div className="space-y-4">
              <ProgressBar label="Population Vulnerability" value={h.vulnerabilityBreakdown.population} />
              <ProgressBar label="Infrastructure Vulnerability" value={h.vulnerabilityBreakdown.infrastructure} />
              <ProgressBar label="Accessibility" value={h.vulnerabilityBreakdown.accessibility} />
              <ProgressBar label="Emergency Access" value={h.vulnerabilityBreakdown.emergency} />
            </div>
          </section>
        </div>

        {/* Center column */}
        <div className="space-y-6">
          {/* Risk Score */}
          <section className={`rounded-lg border-2 p-6 text-center ${riskBg}`}>
            <h2 className="text-sm font-semibold text-slate-700 mb-3 flex items-center justify-center gap-2">
              <Activity className="w-4 h-4" /> Risk Score
            </h2>
            <p className={`text-5xl font-bold ${riskColor}`}>{h.riskScore}<span className="text-2xl text-slate-400">/100</span></p>
            <div className="mt-3 inline-block">
              <RiskBadge level={h.riskLevel} />
            </div>
            <div className="mt-5 pt-4 border-t border-slate-200/50 text-left">
              <p className="text-xs font-semibold text-slate-600 mb-2">Contributing Factors:</p>
              <div className="space-y-1.5">
                {Object.entries(h.contributingFactors).map(([key, val]) => (
                  <div key={key} className="flex justify-between text-xs">
                    <span className="text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className={`font-medium ${val === 'High' || val === 'Very High' ? 'text-red-600' : val === 'Moderate' ? 'text-amber-600' : 'text-green-600'}`}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Capacity */}
          <section className="bg-white rounded-lg border border-slate-200 p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-slate-400" /> Capacity Assessment
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Population</span>
                <span className="font-semibold text-slate-800">{h.population.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Safe Capacity</span>
                <span className="font-semibold text-green-600">{h.safeCapacity.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                <span className="text-slate-500">Capacity Deficit</span>
                <span className="font-semibold text-red-600">{h.capacityDeficit.toLocaleString()}</span>
              </div>
              <div className="pt-2">
                <CapacityBadge status={h.capacityStatus} />
              </div>
            </div>
          </section>

          {/* Map */}
          <section>
            <MapView habitations={[h]} height="280px" zoom={10} />
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Relocation Decision */}
          <section className="bg-white rounded-lg border-2 border-red-200 p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <Move className="w-4 h-4 text-slate-400" /> Relocation Decision
            </h2>
            <div className="text-center mb-4">
              <PriorityBadge priority={h.priority} />
            </div>
            <div className="bg-slate-50 rounded-md p-3 text-xs space-y-1.5">
              <p className="font-medium text-slate-600 mb-2">Decision Reasoning:</p>
              <p className="text-slate-600">{h.contributingFactors.hazardExposure} hazard exposure</p>
              <p className="text-slate-400">+</p>
              <p className="text-slate-600">{h.vulnerability} vulnerable population</p>
              <p className="text-slate-400">+</p>
              <p className="text-slate-600">Capacity deficit of {h.capacityDeficit.toLocaleString()}</p>
              <p className="text-slate-400">+</p>
              <p className="text-slate-600">{h.accessibility === 'Poor' ? 'Limited' : h.accessibility} accessibility</p>
              <p className="text-slate-400">=</p>
              <p className="font-semibold text-slate-700">{h.priority} relocation priority</p>
            </div>
            <Link
              to="/relocation"
              className="mt-4 block text-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
            >
              View Relocation Options
            </Link>
          </section>

          <Disclaimer />
        </div>
      </div>
    </div>
  );
}
