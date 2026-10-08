import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/companyData';
import { 
  CheckCircle2, 
  Search, 
  Compass, 
  Palette, 
  Code2, 
  ShieldCheck, 
  Rocket, 
  Headphones 
} from 'lucide-react';

export const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0: return Search;
      case 1: return Compass;
      case 2: return Palette;
      case 3: return Code2;
      case 4: return ShieldCheck;
      case 5: return Rocket;
      case 6: return Headphones;
      default: return CheckCircle2;
    }
  };

  return (
    <section className="py-24 bg-[#F8FAFC] dark:bg-[#0B0F19] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-mono font-medium mb-3">
            <span>Delivery Lifecycle</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Development Process
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            A transparent, sprint-based workflow from initial discovery through zero-downtime production deployment and ongoing support.
          </p>
        </div>

        {/* Step Selector Horizontal Bar (Desktop) */}
        <div className="hidden lg:flex items-center justify-between relative mb-12">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 -z-0" />

          {PROCESS_STEPS.map((step, idx) => {
            const Icon = getStepIcon(idx);
            const isCurrent = activeStep === idx;
            const isPassed = activeStep > idx;

            return (
              <button
                key={step.step}
                onClick={() => setActiveStep(idx)}
                className={`relative z-10 flex flex-col items-center group focus:outline-none`}
              >
                <div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 border-2 ${
                    isCurrent 
                      ? 'bg-brand-600 border-brand-600 text-white shadow-md scale-110' 
                      : isPassed
                        ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-400 dark:border-brand-700 text-brand-700 dark:text-brand-400'
                        : 'bg-white dark:bg-[#111827] border-slate-300 dark:border-slate-800 text-slate-500 dark:text-slate-400 group-hover:border-slate-400 dark:group-hover:border-slate-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <span className={`mt-3 text-xs font-mono font-bold tracking-tight transition-colors ${
                  isCurrent ? 'text-brand-600 dark:text-brand-400 font-extrabold' : 'text-slate-600 dark:text-slate-400'
                }`}>
                  {step.step} {step.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Step Feature Box (Desktop Detailed View) */}
        <div className="hidden lg:block bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <div className="grid grid-cols-12 gap-8 items-center">
            
            <div className="col-span-7">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-mono font-bold px-2.5 py-1 rounded bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                  Phase {PROCESS_STEPS[activeStep].step}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {PROCESS_STEPS[activeStep].title}
                </h3>
              </div>

              <p className="text-base text-slate-700 dark:text-slate-300 font-medium mb-6">
                {PROCESS_STEPS[activeStep].description}
              </p>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-3">
                  Core Phase Activities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PROCESS_STEPS[activeStep].activities.map((act, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-5 bg-slate-50 dark:bg-slate-900/60 rounded-xl p-6 border border-slate-200/80 dark:border-slate-800">
              <div className="text-xs font-mono uppercase text-slate-400 dark:text-slate-500 font-semibold mb-2">
                Phase Outcome &amp; Milestone
              </div>
              <div className="text-base font-bold text-slate-900 dark:text-white mb-4">
                {PROCESS_STEPS[activeStep].outcome}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                DEVOPS TN Quality Gate Checked &amp; Verified before advancing to next sprint.
              </div>
            </div>

          </div>
        </div>

        {/* Mobile / Tablet Vertical Timeline */}
        <div className="lg:hidden space-y-4">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = getStepIcon(idx);
            return (
              <div 
                key={step.step}
                className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-subtle"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 flex items-center justify-center text-brand-600 dark:text-brand-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-brand-600 dark:text-brand-400">
                      Step {step.step}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {step.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  {step.description}
                </p>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                  <span>Milestone:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{step.outcome}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
