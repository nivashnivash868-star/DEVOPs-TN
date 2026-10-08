import React, { useState } from 'react';
import { TECH_ECOSYSTEM } from '../data/companyData';
import { 
  Code2, 
  Terminal, 
  Database, 
  Boxes, 
  Cloud, 
  Cpu, 
  CheckCircle2, 
  Sparkles,
  Layers
} from 'lucide-react';

export const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'Cloud', 'AI'];

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Frontend': return Code2;
      case 'Backend': return Terminal;
      case 'Database': return Database;
      case 'DevOps': return Boxes;
      case 'Cloud': return Cloud;
      case 'AI': return Cpu;
      default: return Layers;
    }
  };

  const displayedCategories = activeCategory === 'All'
    ? TECH_ECOSYSTEM
    : TECH_ECOSYSTEM.filter(c => c.category === activeCategory);

  return (
    <section className="py-24 bg-[#F8FAFC] dark:bg-[#0B0F19] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-mono font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modern Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Technology Ecosystem
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            We build exclusively with modern, battle-tested, and developer-approved tools designed for speed, type safety, and global scalability.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2 bg-white dark:bg-[#111827] p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-4xl">
            {categories.map((cat) => {
              const Icon = getCategoryIcon(cat);
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-slate-900 dark:bg-brand-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-400 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories & Cards */}
        <div className="space-y-12">
          {displayedCategories.map((group) => {
            const Icon = getCategoryIcon(group.category);
            return (
              <div key={group.category} className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-subtle transition-colors">
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 dark:border-slate-800 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 flex items-center justify-center text-brand-600 dark:text-brand-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {group.category}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500 self-start sm:self-auto">
                    {group.items.length} Production Technologies
                  </span>
                </div>

                {/* Grid of Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {group.items.map((tech) => (
                    <div
                      key={tech.name}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 hover:bg-brand-50/50 dark:hover:bg-brand-950/30 border border-slate-200/80 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-600 transition-all duration-150 flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold font-mono text-slate-900 dark:text-white group-hover:text-brand-700 dark:group-hover:text-brand-400">
                            {tech.name}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 group-hover:border-brand-200 dark:group-hover:border-brand-700 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                            {tech.categoryBadge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                          {tech.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-200/50 dark:border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500">
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Enterprise Verified</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
