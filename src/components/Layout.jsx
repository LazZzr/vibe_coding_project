export function DemoBanner({ text = '' }) {
  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-1.5">
      <p className="text-xs text-amber-800 text-center font-medium">
        {text || 'DEMO DATA — SIH 2026 PROTOTYPE · This is not an official NDMA system'}
      </p>
    </div>
  );
}

export function Disclaimer({ text = '', className = '' }) {
  return (
    <div className={`bg-slate-50 border border-slate-200 rounded-lg p-3 ${className || ''}`}>
      <p className="text-xs text-slate-500 leading-relaxed">
        {text || 'Decision-support recommendation — final decisions require authorized assessment and ground validation.'}
      </p>
    </div>
  );
}

export function PageHeader({ title, subtitle, icon: Icon, children }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
