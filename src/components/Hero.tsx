import React, { useState, useEffect } from 'react';
import { BRAND } from '../data/companyData';
import { 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Cloud, 
  GitBranch, 
  Cpu, 
  Activity,
  Check,
  RefreshCw
} from 'lucide-react';

interface HeroProps {
  onOpenQuoteModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'architecture' | 'telemetry'>('pipeline');
  const [pipelineProgress, setPipelineProgress] = useState(4);
  const [isSimulating, setIsSimulating] = useState(false);

  const trustIndicators = [
    { label: "Web Development", icon: Layers },
    { label: "Cloud", icon: Cloud },
    { label: "DevOps", icon: GitBranch },
    { label: "AI & Automation", icon: Cpu },
  ];

  // Pipeline simulation cycle
  useEffect(() => {
    if (isSimulating) {
      const interval = setInterval(() => {
        setPipelineProgress((prev) => {
          if (prev >= 4) {
            setIsSimulating(false);
            return 4;
          }
          return prev + 1;
        });
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [isSimulating]);

  const triggerSimulation = () => {
    setPipelineProgress(0);
    setIsSimulating(true);
  };

  const pipelineSteps = [
    { name: "Git Commit", cmd: "git push origin main", status: "completed", time: "0.2s" },
    { name: "Typecheck & Lint", cmd: "tsc --noEmit && eslint", status: pipelineProgress >= 1 ? "completed" : "pending", time: "1.4s" },
    { name: "Docker Container Build", cmd: "docker build -t app:latest .", status: pipelineProgress >= 2 ? "completed" : "pending", time: "18.2s" },
    { name: "Automated Test Suite", cmd: "pytest && vitest run", status: pipelineProgress >= 3 ? "completed" : "pending", time: "12.8s" },
    { name: "Zero-Downtime Cloud Deploy", cmd: "aws ecs update-service", status: pipelineProgress >= 4 ? "completed" : "running", time: "24.6s" },
  ];

  return (
    <section 
      id="home" 
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-tech-grid"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-brand-100/60 dark:bg-brand-900/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-sky-100/50 dark:bg-sky-900/20 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, copy, CTAs, trust tags */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200/80 dark:border-brand-800/80 text-brand-700 dark:text-brand-300 text-xs font-mono font-medium mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-600 dark:bg-brand-400 animate-pulse" />
              <span>{BRAND.name} • {BRAND.location}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-5">
              <span className="block text-slate-900 dark:text-white">Build. Deploy.</span>
              <span className="block bg-gradient-to-r from-brand-600 to-sky-500 dark:from-brand-400 dark:to-sky-300 bg-clip-text text-transparent">
                Scale.
              </span>
            </h1>

            {/* Supporting Headline */}
            <p className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4 max-w-2xl leading-snug">
              Modern digital solutions engineered for performance, reliability, and growth.
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl leading-relaxed">
              {BRAND.description}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10">
              <button
                onClick={onOpenQuoteModal}
                id="hero-start-project-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-slate-900 dark:bg-brand-600 hover:bg-brand-600 dark:hover:bg-brand-500 active:bg-brand-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 text-brand-300 dark:text-white group-hover:text-white group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#services"
                id="hero-explore-services-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm transition-all duration-200"
              >
                <span>Explore Services</span>
              </a>
            </div>

            {/* Trust Indicators Strip */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 w-full">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                Core Engineering Capabilities
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {trustIndicators.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={item.label}
                      className="flex items-center gap-2 px-3 py-2 rounded-md bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-subtle text-slate-800 dark:text-slate-200 text-xs font-medium"
                    >
                      <Icon className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Visual Deployment & Cloud Architecture Panel */}
          <div className="lg:col-span-5 w-full">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Decorative behind glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-600 to-sky-400 rounded-2xl blur-lg opacity-25 dark:opacity-40" />

              {/* Main Technical Panel */}
              <div className="relative rounded-xl bg-slate-900 border border-slate-800 text-white shadow-2xl overflow-hidden font-sans">
                
                {/* Panel Header with Window Controls & Status */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="text-xs font-mono text-slate-400 ml-2">devops-tn::prod-cluster</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Live
                    </span>
                  </div>
                </div>

                {/* Subheader Interactive Tabs */}
                <div className="flex items-center justify-between border-b border-slate-800/80 px-3 bg-slate-900/90 text-xs font-mono">
                  <div className="flex gap-1">
                    <button
                      onClick={() => setActiveTab('pipeline')}
                      className={`px-3 py-2 border-b-2 font-medium transition-colors ${
                        activeTab === 'pipeline'
                          ? 'border-brand-500 text-brand-400 bg-slate-800/40'
                          : 'border-transparent text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      CI/CD Pipeline
                    </button>
                    <button
                      onClick={() => setActiveTab('architecture')}
                      className={`px-3 py-2 border-b-2 font-medium transition-colors ${
                        activeTab === 'architecture'
                          ? 'border-brand-500 text-brand-400 bg-slate-800/40'
                          : 'border-transparent text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Cloud Topology
                    </button>
                    <button
                      onClick={() => setActiveTab('telemetry')}
                      className={`px-3 py-2 border-b-2 font-medium transition-colors ${
                        activeTab === 'telemetry'
                          ? 'border-brand-500 text-brand-400 bg-slate-800/40'
                          : 'border-transparent text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Metrics
                    </button>
                  </div>

                  {activeTab === 'pipeline' && (
                    <button
                      onClick={triggerSimulation}
                      disabled={isSimulating}
                      className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded transition-colors disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3 h-3 ${isSimulating ? 'animate-spin text-brand-400' : ''}`} />
                      <span>{isSimulating ? 'Running' : 'Trigger CI'}</span>
                    </button>
                  )}
                </div>

                {/* Tab Content: Pipeline View */}
                {activeTab === 'pipeline' && (
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 pb-1 border-b border-slate-800 font-mono">
                      <span>Workflow: release-prod.yml</span>
                      <span>Branch: main (commit #f8d2a1)</span>
                    </div>

                    <div className="space-y-2.5">
                      {pipelineSteps.map((step, idx) => {
                        const isDone = step.status === 'completed';
                        const isRunning = step.status === 'running';
                        return (
                          <div 
                            key={step.name} 
                            className={`p-2.5 rounded-lg border transition-all duration-200 flex items-center justify-between ${
                              isDone 
                                ? 'bg-slate-950/60 border-slate-800' 
                                : isRunning 
                                  ? 'bg-brand-950/40 border-brand-800/80 shadow-sm' 
                                  : 'bg-slate-950/30 border-slate-900 opacity-60'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="shrink-0">
                                {isDone ? (
                                  <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                                    <Check className="w-3 h-3 stroke-[2.5]" />
                                  </div>
                                ) : isRunning ? (
                                  <div className="w-5 h-5 rounded-full bg-brand-950 border border-brand-500 flex items-center justify-center text-brand-400 animate-spin">
                                    <RefreshCw className="w-3 h-3" />
                                  </div>
                                ) : (
                                  <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 text-[10px] font-mono">
                                    {idx + 1}
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs font-semibold text-slate-200 truncate">
                                  {step.name}
                                </div>
                                <div className="text-[11px] font-mono text-slate-400 truncate">
                                  $ {step.cmd}
                                </div>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500 shrink-0 ml-2">
                              {step.time}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-900/50 rounded-lg p-2.5">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Status: 100% Tests Passing &amp; Deployed</span>
                      </div>
                      <span className="text-slate-400 text-[11px]">Region: ap-south-1</span>
                    </div>
                  </div>
                )}

                {/* Tab Content: Architecture Topology View */}
                {activeTab === 'architecture' && (
                  <div className="p-4 space-y-3 font-mono text-xs">
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2.5">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">1. Edge &amp; DNS Layer</span>
                        <span className="text-brand-400">Cloudflare + TLS 1.3</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">2. Load Balancer</span>
                        <span className="text-sky-400">AWS ALB (Round-Robin)</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">3. Compute Runtime</span>
                        <span className="text-emerald-400">Docker Containers (ECS Fargate)</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">4. API &amp; Backend</span>
                        <span className="text-amber-400">FastAPI Async Workers (x4)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">5. Primary Database</span>
                        <span className="text-purple-400">PostgreSQL (Multi-AZ Replica)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                      <div className="p-2 rounded bg-slate-950/80 border border-slate-800 text-slate-300">
                        <span className="text-slate-500 block text-[10px]">Autoscale Rule</span>
                        CPU &gt; 70% Trigger
                      </div>
                      <div className="p-2 rounded bg-slate-950/80 border border-slate-800 text-slate-300">
                        <span className="text-slate-500 block text-[10px]">Backup Frequency</span>
                        Continuous PITR
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab Content: Real-time Telemetry Metrics View */}
                {activeTab === 'telemetry' && (
                  <div className="p-4 space-y-3 font-mono">
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                        <div className="text-[11px] text-slate-400">API Response P95</div>
                        <div className="text-xl font-bold text-emerald-400 mt-1">24.2 ms</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Target &lt; 50ms</div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                        <div className="text-[11px] text-slate-400">System Uptime</div>
                        <div className="text-xl font-bold text-sky-400 mt-1">99.99%</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Past 30 days</div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                        <div className="text-[11px] text-slate-400">Container Health</div>
                        <div className="text-xl font-bold text-brand-400 mt-1">8 / 8 Active</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">0 Crash Loops</div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                        <div className="text-[11px] text-slate-400">Deploy Duration</div>
                        <div className="text-xl font-bold text-purple-400 mt-1">1m 42s</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Zero Downtime</div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] flex items-center justify-between text-slate-300">
                      <div className="flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 text-brand-400" />
                        <span>Security &amp; Vulnerability Checks:</span>
                      </div>
                      <span className="text-emerald-400 font-semibold">0 Critical Issues</span>
                    </div>
                  </div>
                )}

                {/* Footer Bar */}
                <div className="px-4 py-2 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Stack: TypeScript • FastAPI • Docker • AWS</span>
                  <span className="text-brand-400 font-semibold">DEVOPS TN</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
