import React from 'react';
import { BRAND, PRIMARY_SERVICES } from '../data/companyData';
import { ArrowUp, ArrowRight } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, InstagramIcon, YouTubeIcon } from './SocialIcons';
import { Logo } from './Logo';

interface FooterProps {
  onOpenQuoteModal: (projectType?: string) => void;
  onOpenPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuoteModal, onOpenPortal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'GitHub', href: BRAND.socials.github, icon: GitHubIcon },
    { name: 'LinkedIn', href: BRAND.socials.linkedin, icon: LinkedInIcon },
    { name: 'Instagram', href: BRAND.socials.instagram, icon: InstagramIcon },
    { name: 'YouTube', href: BRAND.socials.youtube, icon: YouTubeIcon },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center">
              <Logo className="h-10" />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Technology and software development company based in {BRAND.location}. Modern digital solutions engineered for performance, reliability, and scale.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onOpenQuoteModal()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold font-mono transition-colors shadow-sm"
              >
                <span>Request Project Scope</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-100">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenPortal}
                  className="text-brand-400 hover:text-brand-300 font-mono text-[11px] flex items-center gap-1 transition-colors"
                >
                  <span>Company Staff Portal</span>
                  <span>→</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Primary Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-100">
              Services
            </h4>
            <ul className="space-y-2 text-xs">
              {PRIMARY_SERVICES.map((srv) => (
                <li key={srv.id}>
                  <a
                    href="#services"
                    className="text-slate-400 hover:text-white transition-colors block truncate"
                  >
                    {srv.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-100">
              Connect
            </h4>
            
            <div className="text-xs text-slate-400 space-y-1.5 font-mono">
              <p className="text-slate-200">{BRAND.location}</p>
              <p>Email: <a href={`mailto:${BRAND.contactEmail}`} className="text-brand-400 hover:underline">{BRAND.contactEmail}</a></p>
              <p>Phone: <a href={`tel:${BRAND.contactPhoneRaw || '+917550319164'}`} className="text-brand-400 hover:underline">{BRAND.contactPhone}</a></p>
              <p>Hours: {BRAND.workingHours}</p>
            </div>

            <div className="pt-2">
              <div className="text-[11px] font-mono text-slate-500 uppercase mb-2">Social Channels</div>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                      aria-label={social.name}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © 2026 DevOps TN. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-600">Built with React, TypeScript &amp; Tailwind CSS</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors p-1"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
