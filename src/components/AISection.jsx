import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Brain } from 'lucide-react';
import { NeuralBrain3D } from './3d/NeuralBrain3D';
import SpotlightCard from './SpotlightCard';
import { sound } from '../utils/sound';

export default function AISection({ onOpenProjectModal }) {
  const [selectedWorkload, setSelectedWorkload] = useState('Customer support');
  
  const workloads = [
    { name: 'Customer support', fit: 'Answer common questions', approach: 'Human review available' },
    { name: 'Everyday workflows', fit: 'Reduce repetitive steps', approach: 'Keep people in control' },
    { name: 'Business information', fit: 'Find useful details faster', approach: 'Use approved source material' },
    { name: 'Content planning', fit: 'Organize ideas and drafts', approach: 'Keep your brand voice' }
  ];

  const currentWorkload = workloads.find(w => w.name === selectedWorkload) || workloads[0];

  return (
    <section id="ai-future" className="relative py-28 bg-[#07090e] border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="ambient-glow absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[700px] bg-violet-600/10 rounded-full blur-[90px] pointer-events-none -z-10" />
      <div className="ambient-glow absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: AI NARRATIVE & SIMULATOR */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono-code text-cyan-400 mb-4 border border-cyan-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>AI &amp; AUTOMATION</span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-[1.12]">
                Make room for <br />
                <span className="text-gradient-purple">smarter workflows.</span>
              </h2>
              <p className="text-slate-300 text-base sm:text-lg mt-6 leading-relaxed">
                Explore practical ways AI can support your team—from organizing information to handling repeat tasks. We’ll start with the problem and choose tools only where they fit.
              </p>
            </div>

            {/* INTERACTIVE WORKLOAD BENCHMARK TOOL */}
            <SpotlightCard
              spotlightColor="rgba(138, 43, 226, 0.2)"
              borderColor="rgba(138, 43, 226, 0.5)"
              className="p-6 rounded-2xl glass-card border border-violet-500/30"
            >
              <span className="text-xs font-mono-code uppercase text-violet-400 tracking-wider block mb-3">
                Explore possible starting points
              </span>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                {workloads.map((w) => (
                  <button
                    key={w.name}
                    onClick={() => {
                      sound.click();
                      setSelectedWorkload(w.name);
                    }}
                    onMouseEnter={() => sound.hover()}
                    className={`p-2.5 rounded-xl text-left text-xs font-medium transition-all border ${
                      selectedWorkload === w.name
                        ? 'bg-violet-600/30 border-violet-400 text-white'
                        : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-white'
                    }`}
                  >
                    {w.name}
                  </button>
                ))}
              </div>

              {/* Dynamic simulated impact */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/[0.08]">
                <div className="p-3 rounded-lg bg-white/[0.03]">
                  <span className="text-[10px] font-mono-code text-slate-400 uppercase block">Possible use</span>
                  <span className="text-sm sm:text-base font-bold text-cyan-300 font-mono-code">{currentWorkload.fit}</span>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.03]">
                  <span className="text-[10px] font-mono-code text-slate-400 uppercase block">Design principle</span>
                  <span className="text-sm sm:text-base font-bold text-violet-300 font-mono-code">{currentWorkload.approach}</span>
                </div>
              </div>
            </SpotlightCard>

            {/* CTA */}
            <div>
              <button
                onClick={() => {
                  sound.click();
                  onOpenProjectModal();
                }}
                onMouseEnter={() => sound.hover()}
                className="px-8 py-4 rounded-full font-semibold text-sm sm:text-base tracking-wide bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-xl shadow-violet-600/25 hover:shadow-violet-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore AI Solutions</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: 3D SYNAPTIC NEURAL BRAIN CANVAS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex flex-col items-center justify-center"
          >
            <div className="relative w-full rounded-3xl glass-card border border-white/[0.08] p-4 overflow-hidden">
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-mono-code text-cyan-300">
                <Brain size={14} className="text-violet-400" />
                <span>WORKFLOW EXPLORER</span>
              </div>

              <NeuralBrain3D />

              <div className="p-4 text-center">
                <span className="text-xs font-mono-code text-slate-400">
                  A visual exploration of how connected tools can support everyday work.
                </span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
