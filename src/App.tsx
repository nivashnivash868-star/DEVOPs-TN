import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechnologyStrip } from './components/TechnologyStrip';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { Process } from './components/Process';
import { Projects } from './components/Projects';
import { TechStack } from './components/TechStack';
import { About } from './components/About';
import { Stats } from './components/Stats';
import { CTA } from './components/CTA';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { AdminLogin } from './components/Portal/AdminLogin';
import { AdminPortal } from './components/Portal/AdminPortal';
import { ProjectItem } from './types';

const MainLayout: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState<string | undefined>(undefined);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectItem | null>(null);

  // View state: 'site' | 'login' | 'portal'
  const [view, setView] = useState<'site' | 'login' | 'portal'>('site');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('devopstn_auth') === 'true';
  });

  // Check URL hash for direct portal navigation (e.g. #portal or #admin)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#portal' || window.location.hash === '#admin') {
        if (sessionStorage.getItem('devopstn_auth') === 'true') {
          setView('portal');
        } else {
          setView('login');
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenPortal = () => {
    if (isAuthenticated || sessionStorage.getItem('devopstn_auth') === 'true') {
      setIsAuthenticated(true);
      setView('portal');
      window.location.hash = 'portal';
    } else {
      setView('login');
      window.location.hash = 'portal';
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setView('portal');
    window.location.hash = 'portal';
  };

  const handleLogout = () => {
    sessionStorage.removeItem('devopstn_auth');
    setIsAuthenticated(false);
    setView('site');
    window.location.hash = '';
  };

  const handleBackToSite = () => {
    setView('site');
    if (window.location.hash === '#portal' || window.location.hash === '#admin') {
      window.location.hash = '';
    }
  };

  const handleOpenQuoteModal = (projectType?: string) => {
    setSelectedProjectType(projectType);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

  const handleOpenCaseStudy = (project: ProjectItem) => {
    setSelectedCaseStudy(project);
  };

  const handleCloseCaseStudy = () => {
    setSelectedCaseStudy(null);
  };

  // Render Admin Portal View
  if (view === 'portal' && isAuthenticated) {
    return (
      <AdminPortal 
        onBackToSite={handleBackToSite} 
        onLogout={handleLogout} 
      />
    );
  }

  // Render Admin Login View
  if (view === 'login' || (view === 'portal' && !isAuthenticated)) {
    return (
      <AdminLogin 
        onLoginSuccess={handleLoginSuccess} 
        onBackToSite={handleBackToSite} 
      />
    );
  }

  // Render Public Website View
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 font-sans selection:bg-brand-600 selection:text-white transition-colors duration-200">
      {/* 1. Navbar */}
      <Navbar 
        onOpenQuoteModal={handleOpenQuoteModal} 
        onOpenPortal={handleOpenPortal} 
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero onOpenQuoteModal={() => handleOpenQuoteModal()} />

        {/* 3. Trust / Technology Strip */}
        <TechnologyStrip />

        {/* 4. Services Section ("What We Build") */}
        <Services onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 5. Why DEVOPS TN ("Engineering, not just development.") */}
        <WhyUs />

        {/* 6. Development Process (7-step timeline) */}
        <Process />

        {/* 7. Featured Projects */}
        <Projects 
          onOpenCaseStudy={handleOpenCaseStudy} 
          onOpenQuoteModal={handleOpenQuoteModal} 
        />

        {/* 8. Technology Stack Ecosystem */}
        <TechStack />

        {/* 9. About DEVOPS TN */}
        <About onOpenQuoteModal={() => handleOpenQuoteModal()} />

        {/* 10. Capability Stats Section */}
        <Stats />

        {/* 11. Client CTA Section (Dark Theme) */}
        <CTA onOpenQuoteModal={() => handleOpenQuoteModal()} />

        {/* 12. Contact Section */}
        <Contact initialProjectType={selectedProjectType} />
      </main>

      {/* 13. Footer */}
      <Footer 
        onOpenQuoteModal={handleOpenQuoteModal} 
        onOpenPortal={handleOpenPortal} 
      />

      {/* Modals */}
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={handleCloseQuoteModal} 
        defaultProjectType={selectedProjectType} 
      />

      <CaseStudyModal 
        project={selectedCaseStudy} 
        onClose={handleCloseCaseStudy} 
        onOpenQuoteModal={handleOpenQuoteModal} 
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
};

export default App;
