import { PageHeader } from '@/components/Layout';
import { BookOpen, ExternalLink } from 'lucide-react';
import { OFFICIAL_RESOURCES } from '@/data/demoData';

export default function Resources() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
      <PageHeader title="Official Resources" subtitle="External links to official government platforms" icon={BookOpen} />

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          These links open the actual official websites in a new browser tab. NDMA Sentinel-DSS does not
          host or control these external resources.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {OFFICIAL_RESOURCES.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg border border-slate-200 p-5 hover:shadow-md transition-shadow flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <span className="text-sm font-bold">{resource.name.substring(0, 3)}</span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-300" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800 mb-1">{resource.name}</h3>
            <p className="text-xs text-slate-500 mb-2">{resource.fullName}</p>
            <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-1">{resource.description}</p>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
            >
              Visit Official Website
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
