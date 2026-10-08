import React, { useState, useEffect } from 'react';
import { BRAND } from '../data/companyData';
import { useTheme } from '../context/ThemeContext';
import { Logo } from './Logo';
import { 
  Menu, 
  X, 
  ArrowRight, 
  ExternalLink,
  Sun,
  Moon,
  Lock
} from 'lucide-react';

interface NavbarProps {
  onOpenQuoteModal: (projectType?: string) => void;
  onOpenPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal, onOpenPortal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = ['home', 'services', 'solutions', 'projects', 'about', 'contact'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm py-3.5' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Wordmark */}
          <a 
            href="#home" 
            className="flex items-center group focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg py-1 px-0.5"
            aria-label="DEVOPS TN Home"
          >
            <Logo className="h-10" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors duration-150 relative ${
                    isActive 
                      ? 'text-brand-600 dark:text-brand-400 bg-brand-50/70 dark:bg-brand-950/40 font-semibold' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-600 dark:bg-brand-400 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right CTA + Theme Toggle + Portal Button */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              type="button"
              className="p-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
              aria-label={theme === 'dark' ? 'Switch to Light theme' : 'Switch to Dark theme'}
              title={theme === 'dark' ? 'Switch to Light theme' : 'Switch to Dark theme'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 animate-spin-once" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Portal Entry Button */}
            <button
              onClick={onOpenPortal}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors shadow-2xs"
              title="Access DEVOPS TN Staff Request Portal"
            >
              <Lock className="w-3.5 h-3.5 text-brand-500" />
              <span>Portal</span>
            </button>

            <button
              onClick={() => onOpenQuoteModal()}
              id="navbar-quote-btn"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-900 dark:bg-brand-600 hover:bg-brand-600 dark:hover:bg-brand-500 active:bg-brand-700 rounded-lg shadow-sm hover:shadow transition-all duration-200 group"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4 text-brand-300 dark:text-white group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Right Controls: Portal + Theme Toggle + Menu Button */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={onOpenPortal}
              type="button"
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
              title="Portal"
            >
              <Lock className="w-4 h-4 text-brand-500" />
            </button>

            <button
              onClick={toggleTheme}
              type="button"
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800 shadow-xl transition-all">
          <div className="px-4 pt-3 pb-6 space-y-2">
            <div className="px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Navigation
            </div>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-slate-800/60 transition-colors"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </a>
            ))}
            
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm"
              >
                <span>Get a Project Quote</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenPortal();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg"
              >
                <Lock className="w-3.5 h-3.5 text-brand-500" />
                <span>Company Staff Portal Login</span>
              </button>
              
              <div className="mt-3 text-center">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {BRAND.location} • {BRAND.tagline}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
