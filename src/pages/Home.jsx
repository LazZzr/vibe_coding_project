import { Link } from 'react-router-dom';
import {
  Map as MapIcon, Users, ShieldAlert, ArrowRight,
  Gauge, Move, BarChart3, Workflow, ShieldCheck,
} from 'lucide-react';
import StatCard from '@/components/StatCard';
import MapView from '@/components/MapView';
import MapLegend from '@/components/MapLegend';
import { HOME_STATS, HABITATIONS, RELOCATION_SITES } from '@/data/demoData';

export default function Home() {
  const highRisk = HABITATIONS.filter((h) => h.riskScore >= 70).slice(0, 12);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full mb-4">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-blue-200">SIH 2026 Prototype</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Intelligent Disaster Risk & Relocation Decision Support
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
              Identify hazard-prone red zones, assess habitation capacity, and prioritize immediate
              relocation using GIS-based risk analysis and data-driven decision support.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/risk-map"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
              >
                <MapIcon className="w-4 h-4" />
                Explore Risk Map
              </Link>
              <Link
                to="/habitations"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium rounded-md transition-colors"
              >
                View High-Risk Habitations
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="mt-8 text-sm text-slate-400 font-medium">
              From Hazard Detection to Relocation Prioritization
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard label="Total Habitations" value={HOME_STATS.totalHabitations} type="total" isDemo />
          <StatCard label="Critical Red Zones" value={HOME_STATS.criticalRedZones} type="critical" isDemo />
          <StatCard label="Population at Risk" value={HOME_STATS.populationAtRisk} type="population" isDemo />
          <StatCard label="Capacity Deficit" value={HOME_STATS.capacityDeficit} type="deficit" isDemo />
          <StatCard label="Immediate Relocation" value={HOME_STATS.immediateRelocation} type="relocation" isDemo />
        </div>
      </section>

      {/* Map preview */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Risk Map Preview</h2>
            <p className="text-sm text-slate-500">Interactive GIS map with hazard risk markers — Demo Data</p>
          </div>
          <Link to="/risk-map" className="text-sm font-medium text-blue-700 hover:text-blue-900 inline-flex items-center gap-1">
            View Full Map <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <MapView habitations={highRisk} height="450px" />
        <div className="mt-3 flex justify-center">
          <MapLegend />
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-slate-50 border-y border-slate-200 py-12">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-slate-800 text-center mb-2">Core Workflow</h2>
          <p className="text-sm text-slate-500 text-center mb-8">From hazard detection to relocation prioritization</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { icon: Users, label: 'Data Collection' },
              { icon: Workflow, label: 'Preprocessing' },
              { icon: ShieldAlert, label: 'Hazard Analysis' },
              { icon: ShieldCheck, label: 'Risk Assessment' },
              { icon: Gauge, label: 'Capacity Assessment' },
              { icon: Move, label: 'Relocation Priority' },
              { icon: BarChart3, label: 'GIS Dashboard' },
            ].map((step, i) => (
              <div key={i} className="bg-white rounded-lg border border-slate-200 p-4 text-center">
                <div className="w-10 h-10 mx-auto rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-2">
                  <step.icon className="w-5 h-5" />
                </div>
                <p className="text-xs font-medium text-slate-600">{step.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick access */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { to: '/risk-map', icon: MapIcon, title: 'Risk Map', desc: 'Interactive GIS command center' },
            { to: '/habitations', icon: Users, title: 'Habitations', desc: 'Searchable habitation database' },
            { to: '/capacity', icon: Gauge, title: 'Capacity', desc: 'Population vs safe capacity' },
            { to: '/relocation', icon: Move, title: 'Relocation', desc: 'Prioritized relocation queue' },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group bg-white rounded-lg border border-slate-200 p-5 hover:shadow-lg hover:border-blue-300 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-3 group-hover:bg-blue-100">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800 mb-1">{item.title}</h3>
              <p className="text-xs text-slate-500">{item.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-700">
                Open <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Relocation sites preview */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 pb-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Safe Relocation Sites</h2>
            <p className="text-sm text-slate-500">Candidate sites with available capacity — Demo Data</p>
          </div>
          <Link to="/relocation-sites" className="text-sm font-medium text-blue-700 hover:text-blue-900 inline-flex items-center gap-1">
            Explore Safe Sites <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <MapView habitations={highRisk.slice(0, 6)} relocationSites={RELOCATION_SITES} showSites height="400px" />
      </section>
    </div>
  );
}
