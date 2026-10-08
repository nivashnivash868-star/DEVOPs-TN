import React from 'react';
import { BRAND } from '../data/companyData';
import { 
  MapPin, 
  Globe2, 
  Cpu, 
  Users, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

interface AboutProps {
  onOpenQuoteModal: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenQuoteModal }) => {
  const pillars = [
    {
      title: "Based in Tamil Nadu, India",
      description: "Rooted in Tamil Nadu's thriving technology ecosystem, providing accessible and dependable software engineering services.",
      icon: MapPin,
      badge: "Local Presence"
    },
    {
      title: "Remote Collaboration Available",
      description: "Seamless global communication with structured async workflows, sprint updates, version control, and clear milestones.",
      icon: Globe2,
      badge: "Worldwide Reach"
    },
    {
      title: "Modern Engineering Practices",
      description: "Committed to strong type safety, automated CI/CD pipelines, containerization, and zero-downtime cloud infrastructure.",
      icon: Cpu,
      badge: "Engineering Rigor"
    },
    {
      title: "Client-Focused Development",
      description: "Direct engineering collaboration without bureaucratic layers—building real software designed around actual business goals.",
      icon: Users,
      badge: "Outcome Driven"
    }
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-[#0E1526] border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Company Story & Values */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left: Heading & Description */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-mono font-medium">
              <span>About DevOps TN</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Technology built with purpose.
            </h2>

            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {BRAND.description}
            </p>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-600 dark:text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Engineered for startups, small businesses, colleges, and enterprises.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-500" />
                <span>Direct developer collaboration with transparent sprint demos.</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenQuoteModal}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-slate-900 dark:bg-brand-600 hover:bg-brand-600 dark:hover:bg-brand-500 text-white text-sm font-semibold transition-colors shadow-sm"
              >
                <span>Partner with DevOps TN</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: 4 Foundation Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={pillar.title}
                  className="p-5 rounded-xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-600 hover:bg-white dark:hover:bg-slate-900/60 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-brand-600 dark:text-brand-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                      {pillar.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-1.5 text-[10px] font-mono text-brand-600 dark:text-brand-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Operating Principle</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
