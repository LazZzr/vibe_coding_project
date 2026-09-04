import { PageHeader, Disclaimer } from '@/components/Layout';
import { Move, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RiskBadge, PriorityBadge, CapacityBadge } from '@/components/Badges';
import { getRelocationRanking } from '@/data/demoData';

export default function Relocation() {
  const ranking = getRelocationRanking();

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
      <PageHeader title="Immediate Relocation Priority" subtitle="Ranked relocation queue — Decision Support" icon={Move} />

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>{ranking.length}</strong> habitations identified as requiring relocation assessment.
          Rankings are based on risk score, vulnerability, capacity deficit, and accessibility.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Rank</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Habitation</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Risk</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Population</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Deficit</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Vulnerability</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Priority</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider min-w-[200px]">Reason</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ranking.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50">
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                      h.rank <= 3 ? 'bg-red-100 text-red-700' : h.rank <= 10 ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      #{h.rank}
                    </span>
                  </td>
                  <td className="px-3 py-3 font-medium text-slate-800 whitespace-nowrap">{h.name}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className={`font-semibold ${h.riskScore >= 80 ? 'text-red-600' : 'text-orange-600'}`}>{h.riskScore}</span>/100
                  </td>
                  <td className="px-3 py-3 text-slate-600 whitespace-nowrap">{h.population.toLocaleString()}</td>
                  <td className="px-3 py-3 text-red-600 font-medium whitespace-nowrap">{h.capacityDeficit.toLocaleString()}</td>
                  <td className="px-3 py-3 whitespace-nowrap"><RiskBadge level={h.vulnerability === 'Very High' ? 'Critical' : h.vulnerability} /></td>
                  <td className="px-3 py-3 whitespace-nowrap"><PriorityBadge priority={h.priority} /></td>
                  <td className="px-3 py-3 text-xs text-slate-500 max-w-xs">{h.reason}</td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <Link
                      to={`/habitations/${h.id}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-900"
                    >
                      Details <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4">
        <Link
          to="/relocation-sites"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
        >
          Explore Safe Relocation Sites <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="mt-6">
        <Disclaimer text="Decision-support recommendation — final decisions require authorized assessment and ground validation. Rankings shown are based on prototype risk calculations using demo data." />
      </div>
    </div>
  );
}
