import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MessageSquare, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { sound } from '../utils/sound';
import MagneticButton from './effects/MagneticButton';
import TextScramble from './effects/TextScramble';

export default function FinalCTA({ onOpenProjectModal }) {
  return (
    <section className="relative py-32 bg-[#07090e] border-t border-white/[0.06] overflow-hidden">
      {/* High-tech radial background mesh & glowing aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.12),rgba(138,43,226,0.08),transparent_70%)] pointer-events-none" />
      
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-mesh-grid opacity-40 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
      >
        
        {/* TOP STATUS PILL WITH ACTIVE THEORY TEXT SCRAMBLE */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-mono-code text-cyan-300 mb-8 border border-cyan-500/40 shadow-xl shadow-cyan-500/10">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <TextScramble text="HAVE A PROJECT IN MIND? // LET'S TALK" triggerOnHover={true} />
        </div>

        {/* HEADLINE */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.08] mb-6">
          Ready for your next <br />
          <span className="text-gradient-cyan">digital chapter?</span>
        </h2>

        {/* DESCRIPTION */}
        <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          Tell us what your business needs. We’ll help you explore the right mix of branding, design, development and marketing.
        </p>

        {/* CTAS WITH LOCOMOTIVE / 14ISLANDS MAGNETIC INERTIA */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          {/* Primary Magnetic CTA */}
          <MagneticButton
            strength={0.28}
            textStrength={0.14}
            onClick={() => {
              sound.click();
              onOpenProjectModal();
            }}
            onMouseEnter={() => sound.hover()}
            className="px-9 py-4 rounded-full font-semibold text-sm sm:text-base tracking-wide bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 group cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </MagneticButton>

          {/* Secondary Magnetic CTA */}
          <MagneticButton
            strength={0.22}
            textStrength={0.1}
            onClick={() => {
              sound.click();
              onOpenProjectModal();
            }}
            onMouseEnter={() => sound.hover()}
            className="px-8 py-4 rounded-full font-semibold text-sm sm:text-base text-slate-200 glass-card hover:text-white hover:border-cyan-400/50 hover:bg-white/[0.08] transition-all flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare size={18} className="text-cyan-400" />
            <span>Talk to Us</span>
          </MagneticButton>
        </div>

        {/* TRUST COMMITMENT */}
        <div className="mt-14 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-8 text-xs font-mono-code text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-cyan-400" />
            <span>Clear scope and next steps</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-cyan-400" />
            <span>Work shaped around your goals</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-cyan-400" />
            <span>One connected digital presence</span>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
