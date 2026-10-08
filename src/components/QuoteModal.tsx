import React, { useState } from 'react';
import { BRAND, PROJECT_TYPES, BUDGET_RANGES } from '../data/companyData';
import { ProjectLead } from '../types';
import { addLead, generateEmailNotificationUrl } from '../services/leadService';
import { Logo } from './Logo';
import { 
  X, 
  Send, 
  CheckCircle2,
  Mail,
  ExternalLink
} from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProjectType?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ 
  isOpen, 
  onClose, 
  defaultProjectType 
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState(defaultProjectType || 'Web Application');
  const [budget, setBudget] = useState('₹5,000 – ₹10,000');
  const [description, setDescription] = useState('');
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<ProjectLead | null>(null);

  if (!isOpen) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Please enter your name';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email';
    }
    if (!description.trim() || description.trim().length < 10) {
      errs.description = 'Please describe your project (minimum 10 characters)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setTimeout(() => {
      const lead = addLead({
        name,
        email,
        phone,
        projectType,
        budget,
        description,
        source: 'Quote Modal'
      });
      setSubmittedLead(lead);
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const handleCloseAndReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setDescription('');
    setSubmitted(false);
    setSubmittedLead(null);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-[#111827] rounded-2xl max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="sticky top-0 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <Logo variant="mark" className="w-8 h-8 shrink-0" />
            <div>
              <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">{BRAND.name}</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 block -mt-0.5">Project Estimation Request</span>
            </div>
          </div>
          <button
            onClick={handleCloseAndReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Project Quote Request Submitted!
                </h3>
                <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                  Request ID: #{submittedLead?.id} • Synced to Company Portal
                </p>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-slate-900 dark:text-white">{name}</span>. We will review your project scope and send a customized quote &amp; timeline estimate to <span className="font-mono text-brand-600 dark:text-brand-400">{email}</span>.
              </p>

              {/* Direct email forward button */}
              {submittedLead && (
                <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 max-w-md mx-auto text-left space-y-1.5">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                    Instant Email Copy
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Send a formatted copy directly to our official company email:
                  </p>
                  <a
                    href={generateEmailNotificationUrl(submittedLead)}
                    className="inline-flex items-center justify-center gap-2 w-full px-3.5 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-mono font-semibold transition-colors shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send to {BRAND.contactEmail}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={handleCloseAndReset}
                  className="px-5 py-2.5 rounded-lg bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold font-mono"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              
              <div>
                <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border text-xs sm:text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
                    errors.name ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20 dark:bg-rose-950/20' : 'border-slate-300 dark:border-slate-700 focus:border-brand-500 dark:focus:border-brand-500'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-xs sm:text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
                      errors.email ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20 dark:bg-rose-950/20' : 'border-slate-300 dark:border-slate-700 focus:border-brand-500 dark:focus:border-brand-500'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Project Type
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:outline-none focus:border-brand-500"
                  >
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Budget Range
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 focus:outline-none focus:border-brand-500"
                  >
                    {BUDGET_RANGES.map((b) => (
                      <option key={b} value={b} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Project Scope &amp; Requirements <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Key features, timeline expectations, tech stack preferences..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border text-xs sm:text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
                    errors.description ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20 dark:bg-rose-950/20' : 'border-slate-300 dark:border-slate-700 focus:border-brand-500 dark:focus:border-brand-500'
                  }`}
                />
                {errors.description && (
                  <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400">{errors.description}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Processing Request...</span>
                  ) : (
                    <>
                      <span>Submit Quote Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
