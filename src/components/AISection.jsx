import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Cpu, Sparkles, CheckCircle2, Activity } from 'lucide-react';
import { NeuralBrain3D } from './3d/NeuralBrain3D';
import SpotlightCard from './SpotlightCard';
import MaskedHeading from './MaskedHeading';
import { sound } from '../utils/sound';
import { useTheme } from '../context/ThemeContext';

export default function AISection({ onOpenProjectModal }) {
  const { isDark } = useTheme();
  const reduceMotion = useReducedMotion();
  const [selectedWorkload, setSelectedWorkload] = useState('Customer support');
  
  const workloads = [
    { 
      name: 'Customer support', 
      fit: 'Answer common questions with RAG', 
      approach: 'Human review & safety fallback',
      metric: '< 450ms Response Time',
      accuracy: '99.4% Verified Accuracy'
    },
    { 
      name: 'Everyday workflows', 
      fit: 'Automate repetitive data tasks', 
      approach: 'Deterministic logic & human control',
      metric: '85% Manual Step Reduction',
      accuracy: 'Zero Hallucination Guardrails'
    },
    { 
      name: 'Business intelligence', 
      fit: 'Query proprietary data in plain English', 
      approach: 'Vector search with role-based auth',
      metric: 'Real-time Cross-Doc Analytics',
      accuracy: 'Enterprise Cloud Compliance'
    },
    { 
      name: 'Content & campaigns', 
      fit: 'Draft product descriptions & copies', 
      approach: 'Strict adherence to brand voice guidelines',
      metric: '5x Content Production Velocity',
      accuracy: 'Tone & Style Enforced'
    }
  ];

  const currentWorkload = workloads.find(w => w.name === selectedWorkload) || workloads[0];

  return (
    <section 
      id="ai-future" 
      className={`motion-section relative py-20 sm:py-28 transition-colors duration-300 overflow-hidden w-full max-w-full ${
        isDark 
          ? 'text-slate-100' 
          : 'bg-white text-slate-900'
      }`}
    >
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true"
        data-scroll-depth="-28"
        className={`ambient-glow absolute top-1/2 left-1/3 -translate-y-1/2 w-full max-w-[700px] h-[700px] rounded-full blur-[110px] pointer-events-none -z-10 ${
          isDark ? 'bg-violet-600/10' : 'bg-purple-300/15'
        }`} 
      />
      <div 
        aria-hidden="true"
        data-scroll-depth="24"
        className={`ambient-glow absolute bottom-10 right-10 w-full max-w-[500px] h-[500px] rounded-full blur-[90px] pointer-events-none -z-10 ${
          isDark ? 'bg-cyan-500/10' : 'bg-sky-300/15'
        }`} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: AI NARRATIVE & SIMULATOR */}
          <div
            className="lg:col-span-6 space-y-6 sm:space-y-8"
          >
            <div>
              <div data-motion-reveal className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono-code mb-4 border border-violet-500/30">
                <span className="motion-status-dot w-2 h-2 rounded-full bg-violet-400" />
                <span className={isDark ? 'text-violet-300 font-semibold' : 'text-purple-700 font-semibold'}>
                  AI &amp; WORKFLOW AUTOMATION
                </span>
              </div>
              <MaskedHeading
                as="h2"
                className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-[1.12]"
                lines={[
                  <span key="lead">Make room for</span>,
                  <span key="accent" className="text-gradient-purple">smarter workflows.</span>
                ]}
              />
              <p data-motion-reveal style={{ '--motion-delay': '140ms' }} className={`text-sm sm:text-base lg:text-lg mt-4 leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Explore practical ways modern AI can empower your team—from automated customer support to intelligent internal knowledge retrieval. We engineer tools built on your real data with human guardrails.
              </p>
            </div>

            {/* INTERACTIVE WORKLOAD BENCHMARK TOOL */}
            <SpotlightCard
              data-motion-reveal
              spotlightColor={isDark ? "rgba(138, 43, 226, 0.2)" : "rgba(147, 51, 234, 0.12)"}
              borderColor={isDark ? "rgba(138, 43, 226, 0.5)" : "rgba(147, 51, 234, 0.35)"}
              className={`p-5 sm:p-7 rounded-3xl border transition-all duration-300 shadow-xl ${
                isDark 
                  ? 'bg-[#0c1220]/90 border-violet-500/30 shadow-violet-950/20' 
                  : 'bg-slate-50 border-slate-200/90 shadow-slate-200/60'
              }`}
            >
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-xs font-mono-code uppercase text-violet-500 font-bold tracking-wider flex items-center gap-1.5">
                  <Cpu size={14} />
                  <span>Explore Practical Workflows</span>
                </span>
                <span className={`text-[11px] font-mono-code ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  Interactive Simulator
                </span>
              </div>
              
              {/* Selectable Workload Buttons */}
              <div className="grid grid-cols-2 gap-2.5 mb-4" aria-label="AI workflow examples">
                {workloads.map((w) => {
                  const isSelected = selectedWorkload === w.name;
                  return (
                    <button
                      key={w.name}
                      type="button"
                      aria-pressed={isSelected}
                      aria-controls="ai-workload-result"
                      onClick={() => {
                        sound.click();
                        setSelectedWorkload(w.name);
                      }}
                      onMouseEnter={() => sound.hover()}
                      className={`motion-selector p-2.5 sm:p-3 rounded-xl text-left text-xs font-mono-code font-semibold transition-all border flex items-center justify-between gap-1.5 cursor-pointer ${
                        isSelected
                          ? isDark
                            ? 'bg-violet-600/30 border-violet-400 text-white shadow-lg shadow-violet-500/20'
                            : 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/20'
                          : isDark
                            ? 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-white hover:border-white/20'
                            : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 shadow-sm'
                      }`}
                    >
                      <span className="truncate">{w.name}</span>
                      {isSelected && <CheckCircle2 size={13} className={isDark ? "text-violet-300 shrink-0" : "text-white shrink-0"} />}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Simulated Impact Grid */}
              <div id="ai-workload-result" aria-live="polite" aria-atomic="true" className={`pt-3.5 border-t ${
                isDark ? 'border-white/[0.08]' : 'border-slate-200'
              }`}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={selectedWorkload}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
                    transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                <div className={`p-3 rounded-xl border ${
                  isDark ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-white border-slate-200/80 shadow-sm'
                }`}>
                  <span className={`text-[10px] font-mono-code uppercase font-semibold block mb-1 ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Implementation Fit
                  </span>
                  <span className={`text-xs sm:text-sm font-bold font-mono-code ${
                    isDark ? 'text-cyan-300' : 'text-sky-700'
                  }`}>
                    {currentWorkload.fit}
                  </span>
                  <div className={`text-[11px] font-mono-code mt-1.5 pt-1.5 border-t ${
                    isDark ? 'border-white/5 text-slate-400' : 'border-slate-100 text-slate-600'
                  }`}>
                    ⚡ {currentWorkload.metric}
                  </div>
                </div>

                <div className={`p-3 rounded-xl border ${
                  isDark ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-white border-slate-200/80 shadow-sm'
                }`}>
                  <span className={`text-[10px] font-mono-code uppercase font-semibold block mb-1 ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Safety &amp; Guardrails
                  </span>
                  <span className={`text-xs sm:text-sm font-bold font-mono-code ${
                    isDark ? 'text-violet-300' : 'text-purple-700'
                  }`}>
                    {currentWorkload.approach}
                  </span>
                  <div className={`text-[11px] font-mono-code mt-1.5 pt-1.5 border-t ${
                    isDark ? 'border-white/5 text-slate-400' : 'border-slate-100 text-slate-600'
                  }`}>
                    🛡️ {currentWorkload.accuracy}
                  </div>
                </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </SpotlightCard>

            {/* CTA Button */}
            <div data-motion-reveal style={{ '--motion-delay': '120ms' }}>
              <button
                data-magnetic
                onClick={() => {
                  sound.click();
                  onOpenProjectModal();
                }}
                onMouseEnter={() => sound.hover()}
                className="btn-shimmer px-6 py-3.5 sm:px-7 sm:py-4 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm font-mono-code flex items-center gap-2 shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Sparkles size={16} />
                <span>Consult on AI Integration</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D INTERACTIVE NEURAL BRAIN VISUALIZER */}
          <div
            data-motion-reveal="scale"
            style={{ '--motion-delay': '100ms' }}
            className="lg:col-span-6 w-full"
          >
            <div className={`relative rounded-3xl p-4 sm:p-6 border overflow-hidden shadow-2xl transition-all ${
              isDark 
                ? 'bg-gradient-to-b from-[#0c1220]/90 to-[#07090e] border-violet-500/30 shadow-violet-950/20' 
                : 'bg-slate-50/90 border-slate-200/90 shadow-xl shadow-slate-200/70'
            }`}>
              
              {/* Telemetry Header Badge */}
              <div className="flex items-center justify-between mb-3 px-2">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono-code border ${
                  isDark ? 'bg-violet-500/15 border-violet-500/30 text-violet-300' : 'bg-purple-100 border-purple-200 text-purple-800'
                }`}>
                  <Activity size={12} className="motion-status-dot text-violet-400" />
                  <span>3D NEURAL TOPOLOGY // LIVE WORKFLOW CANVAS</span>
                </div>
                <span className={`text-[11px] font-mono-code ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  WebGL 3D
                </span>
              </div>

              {/* The 3D Canvas */}
              <div className="relative w-full h-[360px] sm:h-[440px] rounded-2xl overflow-hidden">
                <NeuralBrain3D />
              </div>

              {/* Footer caption */}
              <div className={`mt-3 pt-3 border-t text-center text-xs font-mono-code ${
                isDark ? 'border-white/[0.06] text-slate-400' : 'border-slate-200 text-slate-500'
              }`}>
                Interactive 3D representation of interconnected neural nodes and automated workflows.
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
