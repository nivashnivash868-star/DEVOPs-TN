import React, { useState } from 'react';
import { Logo } from '../Logo';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  KeyRound,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ 
  onLoginSuccess, 
  onBackToSite 
}) => {
  const [email, setEmail] = useState('nivashnivash868@gmail.com');
  const [password, setPassword] = useState('nivash888');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const trimmedEmail = email.trim().toLowerCase();
      
      // Strict credentials check: Registered company account only
      if (trimmedEmail === 'nivashnivash868@gmail.com' && password === 'nivash888') {
        sessionStorage.setItem('devopstn_auth', 'true');
        sessionStorage.setItem('devopstn_auth_email', 'nivashnivash868@gmail.com');
        onLoginSuccess();
      } else {
        setError('Access Denied: Only registered company email (nivashnivash868@gmail.com) and valid credentials can log in.');
      }
    }, 500);
  };

  const handleFillDemo = () => {
    setEmail('nivashnivash868@gmail.com');
    setPassword('nivash888');
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden transition-colors">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-brand-500/10 dark:bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Back to Site Link */}
      <div className="absolute top-6 left-6 sm:left-10">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-white transition-colors bg-white dark:bg-slate-900 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 shadow-subtle"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Main Website</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-4">
          <Logo className="h-12" />
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          DEVOPS TN Company Portal
        </h2>
        <p className="mt-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
          Internal management console for client requests &amp; active work deliverables
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white dark:bg-[#111827] py-8 px-6 sm:px-8 shadow-xl rounded-2xl border border-slate-200 dark:border-slate-800 relative z-10">
          
          <div className="mb-5 p-3 rounded-lg bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-[11px] font-mono text-brand-800 dark:text-brand-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-brand-600 dark:text-brand-400" />
            <span>Registered Email Only: <strong className="font-semibold">nivashnivash868@gmail.com</strong></span>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Registered Company Email
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-9 pr-3.5 py-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  placeholder="nivashnivash868@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-9 pr-3.5 py-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg shadow-sm text-sm font-semibold text-white bg-slate-900 dark:bg-brand-600 hover:bg-brand-600 dark:hover:bg-brand-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Verifying Credentials...</span>
                ) : (
                  <>
                    <span>Login to Company Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Credentials Helper */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <button
              type="button"
              onClick={handleFillDemo}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-600 dark:text-brand-400 hover:underline"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Click to Autofill Company Credentials</span>
            </button>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-mono">
              Email: nivashnivash868@gmail.com • Password: nivash888
            </p>
          </div>

        </div>

        {/* Security badge */}
        <div className="mt-4 text-center flex items-center justify-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>DEVOPS TN Internal Gateway • nivashnivash868@gmail.com</span>
        </div>
      </div>
    </div>
  );
};
