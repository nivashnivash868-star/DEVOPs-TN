import React from 'react';
import { ProjectItem } from '../types';
import { 
  X, 
  CheckCircle2, 
  GitBranch, 
  ArrowRight 
} from 'lucide-react';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenQuoteModal: (projectType?: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ 
  project, 
  onClose, 
  onOpenQuoteModal 
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-[#111827] rounded-2xl max-w-3xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Bar */}
        <div className="sticky top-0 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
              {project.category}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Case Study Breakdown</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close case study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Project Title & Summary */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {project.name}
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Metadata Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200/80 dark:border-slate-800 font-mono text-xs">
            <div>
              <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase">Industry / Scope</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{project.clientType}</span>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase">Delivery Timeline</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{project.timeline}</span>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase">Engineering Unit</span>
              <span className="font-semibold text-brand-600 dark:text-brand-400">DEVOPS TN</span>
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-2">
              Technologies Utilized
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono font-medium border border-slate-200 dark:border-slate-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40">
              <h4 className="text-xs font-mono uppercase font-bold text-amber-800 dark:text-amber-400 mb-2">
                Business &amp; Technical Challenge
              </h4>
              <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-brand-50/50 dark:bg-brand-950/20 border border-brand-200/80 dark:border-brand-900/40">
              <h4 className="text-xs font-mono uppercase font-bold text-brand-800 dark:text-brand-400 mb-2">
                DEVOPS TN Engineering Solution
              </h4>
              <p className="text-xs sm:text-sm text-brand-950 dark:text-brand-200 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* System Architecture Points */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-3">
              System Architecture &amp; Implementation Details
            </h3>
            <div className="space-y-2.5">
              {project.architecture.map((arch, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <GitBranch className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                  <span>{arch}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Measurable Results */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-3">
              Key Measurable Outcomes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.results.map((res, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-2" />
                  <p className="text-xs font-medium text-emerald-950 dark:text-emerald-200 leading-relaxed">
                    {res}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Looking for similar engineering?
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenQuoteModal(project.category);
                }}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 dark:bg-brand-600 hover:bg-brand-600 dark:hover:bg-brand-500 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>Build a Project Like This</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
