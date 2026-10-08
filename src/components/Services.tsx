import React, { useState } from 'react';
import { PRIMARY_SERVICES, ALL_SERVICES_LIST } from '../data/companyData';
import { ServiceItem } from '../types';
import { 
  Globe, 
  LayoutDashboard, 
  Terminal, 
  Cloud, 
  Palette, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Sparkles,
  Layers
} from 'lucide-react';

interface ServicesProps {
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenQuoteModal }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return Globe;
      case 'LayoutDashboard':
        return LayoutDashboard;
      case 'Terminal':
        return Terminal;
      case 'Cloud':
        return Cloud;
      case 'Palette':
        return Palette;
      case 'Cpu':
        return Cpu;
      default:
        return Layers;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#F8FAFC] dark:bg-[#0B0F19] relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-mono font-medium mb-3">
              <span>Primary Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              What We Build
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              We specialize in engineering robust, high-performance digital products from prototype to global cloud scale.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <button
              onClick={() => onOpenQuoteModal()}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 group"
            >
              <span>Request custom scope</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 6 Premium Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PRIMARY_SERVICES.map((service) => {
            const Icon = getServiceIcon(service.icon);
            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="group relative bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-600 p-7 shadow-subtle hover:shadow-card-hover dark:hover:shadow-dark-card-hover transition-all duration-200 flex flex-col justify-between cursor-pointer"
              >
                {/* Top Corner Badge & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-lg bg-brand-50 dark:bg-brand-950/60 border border-brand-100 dark:border-brand-800/80 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-200">
                      <Icon className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 group-hover:text-brand-600 dark:group-hover:text-brand-400 font-medium transition-colors">
                      {service.technologies[0]} • {service.technologies[1]}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Bullet points summary */}
                  <ul className="space-y-2 mb-6 text-xs text-slate-600 dark:text-slate-400">
                    {service.features.slice(0, 2).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 dark:text-brand-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 group-hover:text-brand-700 dark:group-hover:text-brand-300 inline-flex items-center gap-1.5">
                    <span>View Deliverables</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                    Production Ready
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Specialized Services Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-subtle">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase text-brand-600 dark:text-brand-400 tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Full Technology Scope</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                End-to-End Software Engineering &amp; Operations
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                From high-throughput API design and database partitioning to automated CI/CD pipelines and AI integrations.
              </p>
            </div>

            {/* Tag Badges of all 10 Services */}
            <div className="flex flex-wrap gap-2 max-w-xl">
              {ALL_SERVICES_LIST.map((srv) => (
                <span 
                  key={srv}
                  className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-medium font-mono border border-slate-200/80 dark:border-slate-700 hover:bg-brand-50 dark:hover:bg-brand-950/40 hover:text-brand-700 dark:hover:text-brand-300 hover:border-brand-200 dark:hover:border-brand-700 transition-colors"
                >
                  {srv}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Detail Modal for Selected Service */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-white dark:bg-[#111827] rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close service modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-lg bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 flex items-center justify-center text-brand-600 dark:text-brand-400">
                {React.createElement(getServiceIcon(selectedService.icon), { className: "w-5 h-5" })}
              </div>
              <div>
                <span className="text-xs font-mono font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wide">
                  {selectedService.tagline}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              {selectedService.description}
            </p>

            {/* Features List */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-3">
                Key Technical Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.features.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables List */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-3">
                Included Deliverables
              </h4>
              <div className="space-y-2">
                {selectedService.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-600 dark:bg-brand-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-2.5">
                Primary Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedService.technologies.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono font-medium border border-slate-200 dark:border-slate-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA in Modal */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                DEVOPS TN • Production Ready Engineering
              </span>
              <button
                onClick={() => {
                  const sName = selectedService.title;
                  setSelectedService(null);
                  onOpenQuoteModal(sName);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>Request {selectedService.title} Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
