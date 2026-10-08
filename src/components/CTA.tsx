import React from 'react';
import { ArrowRight, MessageSquareCode, Sparkles } from 'lucide-react';

interface CTAProps {
  onOpenQuoteModal: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onOpenQuoteModal }) => {
  return (
    <section className="py-24 bg-[#090D16] relative overflow-hidden text-white border-y border-slate-800">
      {/* Background Subtle Tech Grid & Radial Glow */}
      <div className="absolute inset-0 bg-tech-grid-dark opacity-30 pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[300px] h-[300px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-brand-300 text-xs font-mono font-medium mb-6 backdrop-blur-sm shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>Ready for Production</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            Have an idea? Let's build it.
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Tell us what you're building, what problem you're solving, and where you want to go. We'll help turn the idea into a working digital product.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenQuoteModal}
              id="cta-start-project-btn"
              className="px-7 py-3.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-lg hover:shadow-blue-glow transition-all duration-200 flex items-center gap-2 group"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#contact"
              id="cta-contact-btn"
              className="px-7 py-3.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-semibold text-sm transition-colors duration-200 flex items-center gap-2"
            >
              <MessageSquareCode className="w-4 h-4 text-brand-400" />
              <span>Contact DevOps TN</span>
            </a>
          </div>

          {/* Footer Note */}
          <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
            <span>• Free Architecture Consultation</span>
            <span>• Direct Engineer Communication</span>
            <span>• Transparent Timelines</span>
          </div>

        </div>
      </div>
    </section>
  );
};
