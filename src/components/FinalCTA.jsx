import React from 'react';
import { ArrowUpRight, MessageSquare, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { sound } from '../utils/sound';

export default function FinalCTA({ onOpenProjectModal }) {
  return (
    <section className="relative py-32 bg-[#07090e] border-t border-white/[0.06] overflow-hidden">
      {/* High-tech radial background mesh & glowing aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.12),rgba(138,43,226,0.08),transparent_70%)] pointer-events-none" />
      
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-mesh-grid opacity-40 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        
        {/* TOP STATUS PILL */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-mono-code text-cyan-300 mb-8 border border-cyan-500/40 shadow-xl shadow-cyan-500/10">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>CURRENT AVAILABILITY // ACCEPTING Q2 PROJECTS</span>
        </div>

        {/* HEADLINE */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.08] mb-6">
          Have an idea? <br />
          <span className="text-gradient-cyan">Let’s build it.</span>
        </h2>

        {/* DESCRIPTION */}
        <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          Tell us what you're building, and let's turn your vision into a digital experience people remember.
        </p>

        {/* CTAS */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          {/* Primary CTA */}
          <button
            onClick={() => {
              sound.click();
              onOpenProjectModal();
            }}
            onMouseEnter={() => sound.hover()}
            className="px-9 py-4 rounded-full font-semibold text-sm sm:text-base tracking-wide bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 group"
          >
            <span>Start a Project</span>
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => {
              sound.click();
              onOpenProjectModal();
            }}
            onMouseEnter={() => sound.hover()}
            className="px-8 py-4 rounded-full font-semibold text-sm sm:text-base text-slate-200 glass-card hover:text-white hover:border-cyan-400/50 hover:bg-white/[0.08] transition-all flex items-center gap-2"
          >
            <MessageSquare size={18} className="text-cyan-400" />
            <span>Talk to Us</span>
          </button>
        </div>

        {/* TRUST COMMITMENT */}
        <div className="mt-14 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-8 text-xs font-mono-code text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-cyan-400" />
            <span>Full NDA Protection</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-cyan-400" />
            <span>24-Hour Proposal Turnaround</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-cyan-400" />
            <span>100% Intellectual Property Ownership</span>
          </div>
        </div>

      </div>
    </section>
  );
}
