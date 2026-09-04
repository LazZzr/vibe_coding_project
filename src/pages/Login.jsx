import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Info } from 'lucide-react';
import Logo from '@/components/Logo';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo login — no real authentication
    navigate('/admin');
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem-200px)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8">
          <div className="text-center mb-6">
            <div className="w-14 h-14 flex items-center justify-center mx-auto mb-3">
              <Logo className="w-12 h-12" variant="dark" />
            </div>
            <h1 className="text-xl font-bold text-slate-800">Login</h1>
            <p className="text-xs text-slate-500 mt-1">NDMA Sentinel-DSS</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-5">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800">
                <strong>Demo Login</strong> — This is a frontend prototype. No real authentication is performed.
                Do not enter real passwords. Any credentials will log you in.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@example.com"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember" className="text-xs text-slate-600">Remember Me</label>
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-5">
            <Link to="/" className="hover:text-slate-600">← Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
