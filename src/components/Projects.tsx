import React, { useState } from 'react';
import { FEATURED_PROJECTS } from '../data/companyData';
import { ProjectItem } from '../types';
import { ArrowRight } from 'lucide-react';

interface ProjectsProps {
  onOpenCaseStudy: (project: ProjectItem) => void;
  onOpenQuoteModal?: (projectType?: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ 
  onOpenCaseStudy 
}) => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterCategories = ['All', 'Web Application', 'AI / SaaS', 'DevOps / Cloud'];

  const filteredProjects = selectedFilter === 'All'
    ? FEATURED_PROJECTS
    : FEATURED_PROJECTS.filter(p => p.category === selectedFilter);

  // Render high-fidelity SVG/CSS UI Mockup for each project
  const renderProjectMockup = (type: string) => {
    switch (type) {
      case 'dashboard':
        return (
          <div className="w-full h-48 bg-slate-950 p-3.5 flex flex-col justify-between font-mono text-slate-300 select-none overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-slate-400">telemetry::cluster-analytics</span>
              </div>
              <span className="text-emerald-400 font-bold">LIVE (99.98%)</span>
            </div>
            <div className="grid grid-cols-3 gap-2 my-2">
              <div className="bg-slate-900/90 p-2 rounded border border-slate-800">
                <div className="text-[10px] text-slate-500">THROUGHPUT</div>
                <div className="text-sm font-bold text-white">4.8k req/s</div>
              </div>
              <div className="bg-slate-900/90 p-2 rounded border border-slate-800">
                <div className="text-[10px] text-slate-500">P99 LATENCY</div>
                <div className="text-sm font-bold text-brand-400">18.4 ms</div>
              </div>
              <div className="bg-slate-900/90 p-2 rounded border border-slate-800">
                <div className="text-[10px] text-slate-500">CACHE HIT</div>
                <div className="text-sm font-bold text-emerald-400">96.2%</div>
              </div>
            </div>
            {/* Visual Mini Chart */}
            <div className="flex items-end gap-1.5 h-10 px-1 pt-1 bg-slate-900/50 rounded">
              {[35, 45, 60, 40, 80, 75, 90, 85, 95, 70, 85, 100].map((h, i) => (
                <div 
                  key={i} 
                  style={{ height: `${h}%` }} 
                  className="flex-1 bg-brand-500/80 rounded-t hover:bg-brand-400 transition-all"
                />
              ))}
            </div>
          </div>
        );

      case 'ai-platform':
        return (
          <div className="w-full h-48 bg-slate-950 p-3.5 flex flex-col justify-between font-mono text-slate-300 select-none overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px]">
              <span className="text-brand-400 font-semibold">$ ai-pipeline::extract --schema=v2</span>
              <span className="text-xs text-slate-500">Python 3.12</span>
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] space-y-1 text-slate-400 my-auto">
              <div className="text-emerald-400">✓ Ingestion: invoice_batch_402.pdf (1.8MB)</div>
              <div>⚡ Parsing: 42 fields validated with 0 schema violations</div>
              <div className="text-brand-300">⚡ LLM Processing: OpenAI API / GPT-4o async worker</div>
              <div className="text-emerald-400">✓ Webhook dispatched to ERP: 200 OK (142ms)</div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/80">
              <span>Status: Automated Queue Idle</span>
              <span className="text-emerald-400 font-bold">Accuracy: 99.2%</span>
            </div>
          </div>
        );

      case 'cloud-devops':
        return (
          <div className="w-full h-48 bg-slate-950 p-3.5 flex flex-col justify-between font-mono text-slate-300 select-none overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px]">
              <span className="text-slate-300 font-semibold">aws::ecs::cluster::prod-ap-south</span>
              <span className="text-emerald-400 font-bold">Auto-Scaling OK</span>
            </div>
            <div className="grid grid-cols-2 gap-2 my-2 text-[11px]">
              <div className="bg-slate-900 p-2 rounded border border-slate-800">
                <div className="text-slate-500 text-[10px]">CONTAINER IMAGES</div>
                <div className="text-white font-bold">alpine/node:latest (42MB)</div>
              </div>
              <div className="bg-slate-900 p-2 rounded border border-slate-800">
                <div className="text-slate-500 text-[10px]">CI/CD TRIGGER</div>
                <div className="text-brand-400 font-bold">GitHub Actions #129</div>
              </div>
            </div>
            <div className="p-1.5 rounded bg-emerald-950/40 border border-emerald-900/60 text-[10px] text-emerald-400 flex items-center justify-between">
              <span>✓ Zero Downtime Rolling Update Passed</span>
              <span className="text-slate-400">Target: ALB:443</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-48 bg-slate-950 p-3.5 flex flex-col justify-between font-mono text-slate-300 select-none overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px]">
              <span className="text-slate-300 font-semibold">nextjs::storefront::edge</span>
              <span className="text-brand-400 font-bold">100 Performance</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 my-2 text-center text-[10px]">
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <div className="text-emerald-400 font-bold text-xs">0.4s</div>
                <div className="text-slate-500">LCP</div>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <div className="text-emerald-400 font-bold text-xs">12ms</div>
                <div className="text-slate-500">FID</div>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <div className="text-emerald-400 font-bold text-xs">0.00</div>
                <div className="text-slate-500">CLS</div>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 bg-slate-900/80 p-1.5 rounded text-center">
              PostgreSQL • Stripe Webhooks • Edge CDN Active
            </div>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="py-24 bg-white dark:bg-[#0E1526] border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-mono font-medium mb-3">
              <span>Selected Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Projects
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Engineered for enterprise scale, speed, and real-world business automation.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-1.5 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-150 ${
                  selectedFilter === cat
                    ? 'bg-white dark:bg-[#111827] text-brand-700 dark:text-brand-400 shadow-sm font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-600 overflow-hidden shadow-subtle hover:shadow-card-hover dark:hover:shadow-dark-card-hover transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Technical Mockup Header */}
                <div className="border-b border-slate-200 dark:border-slate-800 relative group-hover:opacity-95 transition-opacity">
                  {renderProjectMockup(project.image)}
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                      {project.timeline}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2">
                    {project.name}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {project.shortDescription}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium border border-slate-200/60 dark:border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="px-6 sm:px-7 pb-6 pt-0">
                <button
                  onClick={() => onOpenCaseStudy(project)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-900 dark:hover:bg-brand-600 text-slate-800 dark:text-slate-200 hover:text-white dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:border-slate-900 dark:hover:border-brand-600 text-xs font-semibold font-mono transition-all duration-200 group/btn"
                >
                  <span>View Case Study &amp; Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-500 dark:text-brand-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Note on customization */}
        <div className="mt-12 text-center">
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Have a custom requirement? We engineer tailored architectures from day one.
          </p>
        </div>

      </div>
    </section>
  );
};
