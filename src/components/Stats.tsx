import React from 'react';
import { CAPABILITY_STATS } from '../data/companyData';
import { 
  Layers, 
  TrendingUp, 
  GitBranch, 
  ShieldCheck 
} from 'lucide-react';

export const Stats: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return Layers;
      case 'TrendingUp': return TrendingUp;
      case 'GitBranch': return GitBranch;
      case 'ShieldCheck': return ShieldCheck;
      default: return Layers;
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-[#0B0F19] border-y border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-mono font-medium mb-3">
            <span>Engineering Metrics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Capability-Driven Standards
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Our benchmarks are grounded in architectural rigor, test coverage, and repeatable deployment workflows.
          </p>
        </div>

        {/* 4 Capability Metric Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAPABILITY_STATS.map((stat) => {
            const Icon = getIcon(stat.icon);
            return (
              <div 
                key={stat.title}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-600 hover:bg-brand-50/20 dark:hover:bg-brand-950/20 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-brand-600 dark:text-brand-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                      {stat.metricHighlight}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    {stat.title}
                  </h3>

                  <div className="text-xs font-semibold text-brand-700 dark:text-brand-400 font-mono mb-3">
                    {stat.subtitle}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {stat.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500">
                  <span>Standard Status:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Active &amp; Enforced</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
