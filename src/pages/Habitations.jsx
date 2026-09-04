import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/Layout';
import { Users, Search, Eye, ArrowUpDown } from 'lucide-react';
import { RiskBadge, PriorityBadge, CapacityBadge, StatusBadge } from '@/components/Badges';
import { HABITATIONS, DISTRICTS } from '@/data/demoData';

const COLUMNS = [
  { key: 'name', label: 'Habitation', sortable: true },
  { key: 'district', label: 'District', sortable: true },
  { key: 'population', label: 'Population', sortable: true },
  { key: 'hazard', label: 'Primary Hazard', sortable: true },
  { key: 'riskScore', label: 'Risk Score', sortable: true },
  { key: 'vulnerability', label: 'Vulnerability', sortable: false },
  { key: 'capacityStatus', label: 'Capacity', sortable: false },
  { key: 'priority', label: 'Priority', sortable: false },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'action', label: 'Action', sortable: false },
];

export default function Habitations() {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('riskScore');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(0);
  const [filterDistrict, setFilterDistrict] = useState('');
  const perPage = 10;

  const filtered = useMemo(() => {
    let result = HABITATIONS.filter((h) => {
      if (filterDistrict && h.district !== filterDistrict) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          h.name.toLowerCase().includes(q) ||
          h.district.toLowerCase().includes(q) ||
          h.hazard.toLowerCase().includes(q)
        );
      }
      return true;
    });

    result.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === 'number') return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      return sortDir === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    return result;
  }, [query, sortKey, sortDir, filterDistrict]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const pageData = filtered.slice(page * perPage, (page + 1) * perPage);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
      <PageHeader title="Habitations" subtitle="Searchable database of vulnerable habitations — Demo Data" icon={Users} />

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(0); }}
            placeholder="Search by habitation, district, or hazard..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterDistrict}
          onChange={(e) => { setFilterDistrict(e.target.value); setPage(0); }}
          className="px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Districts</option>
          {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className={`px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap ${
                      col.sortable ? 'cursor-pointer hover:bg-slate-100' : ''
                    }`}
                    onClick={() => col.sortable && toggleSort(col.key)}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {col.sortable && sortKey === col.key && (
                        <ArrowUpDown className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pageData.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50">
                  <td className="px-3 py-2.5 font-medium text-slate-800 whitespace-nowrap">{h.name}</td>
                  <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap">{h.district}</td>
                  <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap">{h.population.toLocaleString()}</td>
                  <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap">{h.hazard}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <span className={`font-semibold ${
                      h.riskScore >= 80 ? 'text-red-600' : h.riskScore >= 60 ? 'text-orange-600' : h.riskScore >= 40 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {h.riskScore}
                    </span>
                    <span className="text-slate-300 text-xs">/100</span>
                  </td>
                  <td className="px-3 py-2.5 whitespace-nowrap"><RiskBadge level={h.vulnerability === 'Very High' ? 'Critical' : h.vulnerability} /></td>
                  <td className="px-3 py-2.5 whitespace-nowrap"><CapacityBadge status={h.capacityStatus} /></td>
                  <td className="px-3 py-2.5 whitespace-nowrap"><PriorityBadge priority={h.priority} /></td>
                  <td className="px-3 py-2.5 whitespace-nowrap"><StatusBadge status={h.status} /></td>
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <Link
                      to={`/habitations/${h.id}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-900"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Showing {page * perPage + 1}–{Math.min((page + 1) * perPage, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-3 py-1 text-xs font-medium text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-xs text-slate-500">Page {page + 1} of {totalPages || 1}</span>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className="px-3 py-1 text-xs font-medium text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
