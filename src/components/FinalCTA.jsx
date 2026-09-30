import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';
import { useTheme } from '../context/ThemeContext';

export default function FinalCTA({ onOpenProjectModal }) {
  const { isDark } = useTheme();

  const assurances = [
    "Direct Founder & Technical Lead Attention",
    "Milestone-Based Delivery & Weekly Demos",
    "100% Intellectual Property & Code Ownership"
  ];

  return (
    <section
      id="final-cta"
      className={`relative py-24 sm:py-32 transition-colors duration-300 overflow-hidden w-full max-w-full ${
        isDark 
          ? 'bg-[#07090e] border-t border-white/[0.06] text-white' 
          : 'bg-gradient-to-b from-slate-50 via-sky-50/40 to-slate-100 border-t border-slate-200 text-slate-900'
      }`}
    >
      {/* High-tech radial background mesh & glowing aura */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity ${
          isDark 
            ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.12),rgba(138,43,226,0.08),transparent_70%)]' 
            : 'bg-[radial-gradient(circle_at_50%_50%,rgba(2,132,199,0.1),rgba(147,51,234,0.06),transparent_70%)]'
        }`} 
      />
      
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-mesh-grid opacity-30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
      >
        
        {/* TOP STATUS PILL */}
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono-code mb-8 border shadow-xl ${
          isDark 
            ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-cyan-500/10' 
            : 'bg-white border-sky-300 text-sky-800 shadow-sky-500/10'
        }`}>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-semibold">HAVE A PROJECT IN MIND? // READY TO BUILD</span>
        </div>

        {/* HEADLINE */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.08] mb-6">
          Ready for your next <br />
          <span className="text-gradient-cyan">digital chapter?</span>
        </h2>

        {/* DESCRIPTION */}
        <p className={`text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-8 ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Tell us about your business goals. We’ll help you architect the ideal combination of brand identity, high-conversion web development, and digital growth.
        </p>

        {/* ASSURANCES BADGES */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          {assurances.map((item, idx) => (
            <div
              key={idx}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono-code border shadow-sm ${
                isDark 
                  ? 'bg-white/[0.03] border-white/[0.08] text-slate-300' 
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <CheckCircle2 size={13} className={isDark ? "text-cyan-400" : "text-sky-600"} />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* CTAS */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          {/* Primary CTA */}
          <button
            data-magnetic
            onClick={() => {
              sound.click();
              onOpenProjectModal();
            }}
            onMouseEnter={() => sound.hover()}
            className="px-8 py-4 sm:px-9 sm:py-4.5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 hover:from-cyan-300 hover:to-violet-500 text-black font-extrabold text-xs sm:text-sm font-mono-code flex items-center gap-2.5 shadow-2xl shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowUpRight size={17} />
          </button>

          {/* Secondary CTA: Explore Archive */}
          <Link
            data-magnetic
            to="/work"
            onClick={() => sound.click()}
            onMouseEnter={() => sound.hover()}
            className={`px-7 py-4 rounded-full border text-xs sm:text-sm font-mono-code font-bold flex items-center gap-2 transition-all cursor-pointer ${
              isDark 
                ? 'bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08] hover:border-cyan-400/40' 
                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50 hover:border-sky-400 shadow-sm'
            }`}
          >
            <span>Explore 18+ Deliveries Archive</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </motion.div>
    </section>
  );
}
