import React from 'react';
import { TECH_STRIP } from '../data/companyData';
import { 
  Code2, 
  Terminal, 
  Database, 
  Cloud, 
  GitPullRequest, 
  Server, 
  Boxes 
} from 'lucide-react';

export const TechnologyStrip: React.FC = () => {
  // Category icon mapping
  const getIconForCategory = (cat: string) => {
    switch (cat) {
      case 'Frontend':
      case 'Framework':
        return Code2;
      case 'Language':
        return Terminal;
      case 'Database':
        return Database;
      case 'Cloud':
      case 'Deployment':
        return Cloud;
      case 'Container':
        return Boxes;
      case 'VCS':
      case 'CI/CD':
        return GitPullRequest;
      default:
        return Server;
    }
  };

  return (
    <section className="py-10 border-y border-slate-200/90 dark:border-slate-800/80 bg-white/70 dark:bg-[#0E1526]/80 backdrop-blur-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Label */}
          <div className="shrink-0 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-600 dark:bg-brand-400" />
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Battle-Tested Technologies
            </span>
          </div>

          {/* Grid / Flow of Technologies */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {TECH_STRIP.map((tech) => {
              const Icon = getIconForCategory(tech.category);
              return (
                <div
                  key={tech.name}
                  className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-50 dark:bg-slate-900/90 hover:bg-brand-50 dark:hover:bg-brand-950/40 border border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-600 text-slate-700 dark:text-slate-200 hover:text-brand-700 dark:hover:text-brand-300 transition-all duration-150 cursor-default"
                >
                  <Icon className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" />
                  <span className="text-xs font-semibold font-mono tracking-tight text-slate-800 dark:text-slate-200 group-hover:text-brand-900 dark:group-hover:text-white">
                    {tech.name}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 group-hover:text-brand-500 dark:group-hover:text-brand-400 bg-white dark:bg-slate-950 px-1.5 py-0.5 rounded border border-slate-200/60 dark:border-slate-800">
                    {tech.category}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
