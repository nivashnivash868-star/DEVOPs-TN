import React, { useState } from 'react';
import { WHY_US_POINTS } from '../data/companyData';
import { CheckCircle2 } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = WHY_US_POINTS[activeStepIndex];

  return (
    <section id="solutions" className="py-24 bg-white dark:bg-[#0E1526] border-y border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-mono font-medium mb-3">
            <span>Our Approach</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineering, not just development.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            We don't just ship surface-level code. We apply systematic engineering discipline, rigorous testing, and cloud automation to build systems that endure.
          </p>
        </div>

        {/* 4 Points Grid / Interactive Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: 4 Principle Cards */}
          <div className="lg:col-span-6 space-y-4">
            {WHY_US_POINTS.map((point, index) => {
              const isActive = activeStepIndex === index;
              return (
                <div
                  key={point.step}
                  onClick={() => setActiveStepIndex(index)}
                  className={`p-6 rounded-xl border transition-all duration-200 cursor-pointer text-left ${
                    isActive
                      ? 'bg-brand-50/60 dark:bg-brand-950/40 border-brand-500 dark:border-brand-500 shadow-sm ring-1 ring-brand-500/20'
                      : 'bg-white dark:bg-[#111827] hover:bg-slate-50 dark:hover:bg-slate-800/60 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
                        isActive 
                          ? 'bg-brand-600 text-white' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}>
                        {point.step}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {point.title}
                      </h3>
                    </div>
                    
                    <span className="text-xs font-mono font-semibold text-brand-600 dark:text-brand-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-brand-100 dark:border-slate-800">
                      {point.metric}
                    </span>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {point.description}
                  </p>

                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {point.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Engineering Preview Box */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="h-full rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between">
              
              <div>
                {/* Header of code preview */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono text-slate-400 ml-2">
                      devops-tn::principles/{activeStep.title.toLowerCase()}.ts
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-brand-400 bg-brand-950/80 px-2 py-0.5 rounded border border-brand-800">
                    Step {activeStep.step} of 04
                  </span>
                </div>

                {/* Subtitle & Concept */}
                <div className="mb-4">
                  <div className="text-xs uppercase font-mono text-brand-400 tracking-wider font-semibold">
                    Principle {activeStep.step}
                  </div>
                  <h4 className="text-xl font-bold text-slate-100 mt-1">
                    {activeStep.title} — {activeStep.description}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {activeStep.detail}
                  </p>
                </div>

                {/* Code / Architecture Snippet */}
                {activeStep.codeSnippet && (
                  <div className="rounded-lg bg-slate-950 p-4 border border-slate-800/80 font-mono text-xs overflow-x-auto my-4 text-emerald-400">
                    <pre className="leading-relaxed">
                      <code>{activeStep.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </div>

              {/* Bottom Checklist for this principle */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>DEVOPS TN Quality Standard</span>
                </div>
                <span className="text-slate-500">Tamil Nadu, India</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
