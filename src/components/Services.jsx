import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layout, 
  Code2, 
  Smartphone, 
  Globe, 
  Palette, 
  Cpu, 
  TrendingUp, 
  Search, 
  ArrowUpRight, 
  CheckCircle2,
  Sparkles,
  Layers,
  Terminal,
  Activity
} from 'lucide-react';
import { servicesData } from '../data/services';
import { sound } from '../utils/sound';

export default function Services({ onOpenProjectModal }) {
  const [activeServiceId, setActiveServiceId] = useState(servicesData[0].id);
  const activeService = servicesData.find(s => s.id === activeServiceId) || servicesData[0];

  const getIcon = (name) => {
    switch (name) {
      case 'Layout': return <Layout className="w-5 h-5" />;
      case 'Code2': return <Code2 className="w-5 h-5" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'Palette': return <Palette className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Search': return <Search className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="relative py-28 overflow-hidden bg-[#07090e]">
      {/* Background cyber radial glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono-code text-cyan-400 mb-4 border border-cyan-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>WHAT WE DO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.12]">
            Digital solutions designed to create <br />
            <span className="text-gradient-cyan">real business impact.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-5 leading-relaxed">
            We operate at the intersection of aesthetic brilliance and engineering discipline. Explore our specialized practice areas.
          </p>
        </div>

        {/* SECTION 10: INTERACTIVE SERVICES DUAL-PANE SHOWCASE (Desktop & Responsive) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* LEFT COLUMN: INTERACTIVE SERVICE SELECTOR LIST */}
          <div className="lg:col-span-6 space-y-3">
            {servicesData.map((service) => {
              const isActive = activeServiceId === service.id;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => {
                    sound.hover();
                    setActiveServiceId(service.id);
                  }}
                  onClick={() => {
                    sound.click();
                    setActiveServiceId(service.id);
                  }}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 relative border ${
                    isActive
                      ? 'bg-gradient-to-r from-white/[0.08] to-white/[0.02] border-cyan-500/50 shadow-xl shadow-cyan-500/10 -translate-y-0.5'
                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.15]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Service Number */}
                      <span className={`font-mono-code text-xs font-bold transition-colors ${
                        isActive ? 'text-cyan-400' : 'text-slate-500'
                      }`}>
                        {service.number}
                      </span>
                      {/* Icon */}
                      <div className={`p-2 rounded-xl transition-colors ${
                        isActive 
                          ? 'bg-cyan-500/20 text-cyan-300' 
                          : 'bg-white/[0.05] text-slate-400'
                      }`}>
                        {getIcon(service.icon)}
                      </div>
                      {/* Title */}
                      <h3 className={`text-base sm:text-lg font-display font-semibold transition-colors ${
                        isActive ? 'text-white' : 'text-slate-300'
                      }`}>
                        {service.title}
                      </h3>
                    </div>

                    {/* Arrow */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                      isActive 
                        ? 'border-cyan-400/60 bg-cyan-500/20 text-cyan-300 translate-x-1' 
                        : 'border-white/[0.08] text-slate-500'
                    }`}>
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  {/* Active snippet preview for mobile / accordion expand */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 pt-3 border-t border-white/[0.06] text-xs sm:text-sm text-slate-400"
                    >
                      {service.shortDesc}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: DYNAMIC ANIMATED VISUAL CANVAS */}
          <div className="lg:col-span-6 sticky top-28">
            <div className="relative p-6 sm:p-8 rounded-3xl glass-card border border-white/[0.1] overflow-hidden min-h-[460px] flex flex-col justify-between">
              
              {/* Background ambient mesh */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-violet-600/10 to-transparent pointer-events-none -z-10" />

              {/* Header inside visual card */}
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                    {getIcon(activeService.icon)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-code text-cyan-400 uppercase tracking-wider block">
                      Active Capability // {activeService.number}
                    </span>
                    <h4 className="text-xl font-display font-bold text-white">
                      {activeService.title}
                    </h4>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-mono-code bg-white/[0.06] text-slate-300 border border-white/[0.1]">
                  PRODUCTION READY
                </span>
              </div>

              {/* Dynamic Interactive Visual Preview based on active service */}
              <div className="py-6 flex-1 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.id}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="w-full"
                  >
                    {/* Visual 1: Browser Window (Web Dev) */}
                    {activeService.visualType === 'browser' && (
                      <div className="rounded-xl border border-cyan-500/30 bg-[#0b0f19] p-4 shadow-2xl shadow-cyan-500/10">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/[0.08]">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          <span className="text-[11px] font-mono-code text-slate-500 ml-2">sarirait.web/dynamic-render</span>
                        </div>
                        <div className="space-y-2">
                          <div className="h-6 w-3/4 rounded bg-cyan-500/20 animate-pulse" />
                          <div className="h-4 w-1/2 rounded bg-white/[0.08]" />
                          <div className="grid grid-cols-3 gap-2 pt-3">
                            <div className="h-16 rounded-lg bg-white/[0.04] border border-white/[0.06] p-2 flex flex-col justify-end">
                              <span className="text-[10px] text-cyan-400 font-mono-code">60 FPS</span>
                            </div>
                            <div className="h-16 rounded-lg bg-white/[0.04] border border-white/[0.06] p-2 flex flex-col justify-end">
                              <span className="text-[10px] text-emerald-400 font-mono-code">0.4s LCP</span>
                            </div>
                            <div className="h-16 rounded-lg bg-white/[0.04] border border-white/[0.06] p-2 flex flex-col justify-end">
                              <span className="text-[10px] text-violet-400 font-mono-code">PWA Ready</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Visual 2: Cloud Infrastructure Topology */}
                    {activeService.visualType === 'cloud' && (
                      <div className="rounded-xl border border-violet-500/30 bg-[#0b0f19] p-5">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-mono-code text-violet-400">MICROSERVICES TOPOLOGY</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        </div>
                        <div className="flex items-center justify-around py-4">
                          <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                            <Layers className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
                            <span className="text-[10px] font-mono-code text-slate-300">API Gateway</span>
                          </div>
                          <div className="w-8 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-500" />
                          <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                            <Cpu className="w-6 h-6 text-violet-400 mx-auto mb-1" />
                            <span className="text-[10px] font-mono-code text-slate-300">Compute Mesh</span>
                          </div>
                          <div className="w-8 h-[2px] bg-gradient-to-r from-violet-500 to-emerald-400" />
                          <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-center">
                            <Activity className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                            <span className="text-[10px] font-mono-code text-slate-300">Distributed DB</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Visual 3: Mobile Phone Prototype */}
                    {activeService.visualType === 'mobile' && (
                      <div className="w-48 mx-auto rounded-3xl border-2 border-white/20 bg-[#0b0f19] p-3 shadow-2xl">
                        <div className="w-16 h-3 rounded-full bg-white/20 mx-auto mb-3" />
                        <div className="h-40 rounded-2xl bg-gradient-to-b from-cyan-500/20 to-transparent p-3 flex flex-col justify-between">
                          <div className="space-y-1.5">
                            <div className="w-12 h-2 rounded bg-cyan-400" />
                            <div className="w-20 h-2 rounded bg-white/40" />
                          </div>
                          <div className="p-2 rounded-xl bg-white/[0.08] backdrop-blur-md">
                            <div className="text-[9px] font-mono-code text-cyan-300">Biometric Sync OK</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Visual 4: AI & Neural Network Visual */}
                    {activeService.visualType === 'ai' && (
                      <div className="rounded-xl border border-cyan-500/30 bg-[#0b0f19] p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Terminal className="w-4 h-4 text-cyan-400" />
                          <span className="text-xs font-mono-code text-cyan-300">LLM AGENT STREAM // RUNTIME ACTIVE</span>
                        </div>
                        <div className="space-y-2 font-mono-code text-xs">
                          <div className="text-slate-400">» [INFERENCE] Vector query latency: 18ms</div>
                          <div className="text-emerald-400">» [AUTONOMOUS] Orchestrating 4 background sub-tasks</div>
                          <div className="text-cyan-300">» [SUCCESS] Model convergence at 99.4% accuracy</div>
                        </div>
                      </div>
                    )}

                    {/* Fallback visual for WordPress / UIUX / Marketing / SEO */}
                    {!['browser', 'cloud', 'mobile', 'ai'].includes(activeService.visualType) && (
                      <div className="rounded-xl border border-white/10 bg-[#0b0f19] p-5">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-mono-code text-slate-400">CORE DELIVERABLES</span>
                          <span className="text-xs font-mono-code text-cyan-400">100% TAILORED</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {activeService.tags.map((tag, i) => (
                            <div key={i} className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center gap-2">
                              <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                              <span className="text-xs font-medium text-slate-300">{tag}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Card Summary & CTA */}
              <div className="pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400">Key Performance Metric</div>
                  <div className="text-lg font-bold font-mono-code text-white">
                    {Object.values(activeService.stats)[0]} <span className="text-xs font-normal text-slate-400 font-sans">measured benchmark</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.click();
                    onOpenProjectModal();
                  }}
                  onMouseEnter={() => sound.hover()}
                  className="px-5 py-2.5 rounded-full font-semibold text-xs tracking-wider uppercase bg-white/[0.06] hover:bg-cyan-500 hover:text-black border border-white/10 hover:border-cyan-400 transition-all flex items-center gap-2"
                >
                  <span>Inquire for {activeService.title.split(' ')[0]}</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
