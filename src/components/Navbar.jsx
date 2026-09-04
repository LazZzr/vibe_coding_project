import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import {
  Search, Bell, Menu, X, ChevronDown,
  Home, Info, Waves, Map, Users, Gauge, Move, BarChart3,
  BookOpen, LogIn,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { NOTIFICATIONS } from '@/data/demoData';

const NAV_LINKS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/about', label: 'About', icon: Info },
  { to: '/disasters', label: 'Disaster Information', icon: Waves },
  { to: '/risk-map', label: 'Risk Map', icon: Map },
  { to: '/habitations', label: 'Habitations', icon: Users },
  { to: '/capacity', label: 'Capacity', icon: Gauge },
  { to: '/relocation', label: 'Relocation', icon: Move },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/resources', label: 'Resources', icon: BookOpen },
];

function NotificationsDropdown({ onClose }) {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-slate-200 z-50">
      <div className="px-4 py-3 border-b border-slate-100">
        <p className="text-sm font-semibold text-slate-800">Notifications</p>
        <p className="text-xs text-slate-400">Prototype Notifications — Demo</p>
      </div>
      <div className="max-h-72 overflow-y-auto scrollbar-thin">
        {NOTIFICATIONS.map((n) => (
          <div key={n.id} className="px-4 py-3 border-b border-slate-50 hover:bg-slate-50">
            <div className="flex items-start gap-2">
              <span className={`mt-1 inline-block w-2 h-2 rounded-full flex-shrink-0 ${
                n.type === 'critical' ? 'bg-red-500' : n.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
              }`} />
              <div>
                <p className="text-sm font-medium text-slate-700">{n.title}</p>
                <p className="text-xs text-slate-500">{n.detail}</p>
                <p className="text-xs text-slate-300 mt-1">{n.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-2 text-center">
        <p className="text-xs text-slate-400">These are prototype notifications for demonstration.</p>
      </div>
    </div>
  );
}

function SearchDropdown({ onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-slate-200 z-50">
      <div className="p-3 border-b border-slate-100">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search habitations, districts, hazards..."
            className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="max-h-60 overflow-y-auto scrollbar-thin p-2">
        <p className="text-xs text-slate-400 px-2 py-1">Search by: Habitation, District, Hazard, Relocation Site</p>
      </div>
    </div>
  );
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const searchRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <Logo className="w-7 h-7" variant="dark" />
            <div className="hidden sm:block">
              <span className="text-sm font-bold text-slate-800 leading-tight block">NDMA Sentinel-DSS</span>
              <span className="text-[10px] text-slate-400 leading-tight block">SIH 2026 Prototype</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  isActive(link.to)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => { setSearchOpen(!searchOpen); setNotifOpen(false); }}
                className="p-2 rounded-md text-slate-600 hover:bg-slate-100"
                aria-label="Search"
              >
                <Search className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
              </button>
              {searchOpen && <SearchDropdown onClose={() => setSearchOpen(false)} />}
            </div>

            <div className="relative" ref={notifRef}>
              <button
                onClick={() => { setNotifOpen(!notifOpen); setSearchOpen(false); }}
                className="relative p-2 rounded-md text-slate-600 hover:bg-slate-100"
                aria-label="Notifications"
              >
                <Bell className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              {notifOpen && <NotificationsDropdown onClose={() => setNotifOpen(false)} />}
            </div>

            <Link
              to="/login"
              className="hidden sm:flex items-center gap-1.5 ml-2 px-3 py-1.5 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              Login
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white max-h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-md ${
                  isActive(link.to) ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 rounded-md"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
