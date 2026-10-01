import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, CheckCircle2 } from 'lucide-react';
import MaskedHeading from './MaskedHeading';
import MagneticButton from './MagneticButton';
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
      className={`motion-section relative py-16 sm:py-24 transition-colors duration-300 overflow-hidden w-full max-w-full ${
        isDark 
          ? 'text-white' 
          : 'bg-gradient-to-b from-slate-50 via-sky-50/50 to-slate-100 text-slate-900'
      }`}
    >
      {/* High-tech radial background mesh & glowing aura */}
      <div 
        aria-hidden="true"
        data-scroll-depth="-20"
        className={`absolute inset-0 pointer-events-none transition-opacity ${
          isDark 
            ? 'bg-[radial-gradient(circle_at_50%_45%,rgba(0,240,255,0.14),rgba(59,130,246,0.08),rgba(138,43,226,0.05),transparent_75%)]' 
            : 'bg-[radial-gradient(circle_at_50%_45%,rgba(2,132,199,0.10),rgba(14,165,233,0.05),transparent_75%)]'
        }`} 
      />
      
      {/* Subtle ambient blur circles */}
      <div aria-hidden="true" data-scroll-depth="28" className={`ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[110px] pointer-events-none -z-10 ${
        isDark ? 'bg-cyan-500/10' : 'bg-sky-400/12'
      }`} />

      {/* Decorative Grid Lines */}
      <div aria-hidden="true" data-scroll-depth="-14" className="absolute -inset-y-8 inset-x-0 bg-mesh-grid opacity-20 pointer-events-none" />

      <div
        className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
      >
        
        {/* TOP STATUS PILL */}
        <div data-motion-reveal className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono-code mb-5 border shadow-sm ${
          isDark 
            ? 'bg-cyan-500/10 border-cyan-500/35 text-cyan-300 shadow-cyan-500/10' 
            : 'bg-white border-sky-300 text-sky-800 shadow-sky-500/10'
        }`}>
          <span aria-hidden="true" className="motion-status-dot inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          <span className="font-semibold tracking-wide uppercase">ACCEPTING SELECT PROJECTS // 2026 INTAKE</span>
        </div>

        {/* HEADLINE - Compact & Balanced Font Size with Line-by-Line Reveal */}
        <div className="mb-4">
          <MaskedHeading
            as="h2"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-display font-bold tracking-tight leading-tight"
            lines={[
              <span key="lead">Ready for your next</span>,
              <span key="accent" className="text-gradient-cyan">digital chapter?</span>
            ]}
          />
        </div>

        {/* DESCRIPTION - Compact & Readable */}
        <p data-motion-reveal style={{ '--motion-delay': '140ms' }} className={`text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-7 ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Tell us about your business goals. We’ll help you architect the ideal combination of brand identity, high-conversion web engineering, and digital growth.
        </p>

        {/* ASSURANCES BADGES */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8">
          {assurances.map((item, idx) => (
            <div
              key={idx}
              data-motion-reveal
              style={{ '--motion-delay': `${idx * 70}ms` }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono-code border transition-all ${
                isDark 
                  ? 'bg-white/[0.03] border-white/[0.08] text-slate-300 hover:border-cyan-500/30' 
                  : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300 shadow-xs'
              }`}
            >
              <CheckCircle2 size={13} className={isDark ? "text-cyan-400" : "text-sky-600"} />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* CTAS WITH MAGNETIC ATTRACTION */}
        <div data-motion-reveal style={{ '--motion-delay': '120ms' }} className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          {/* Primary CTA */}
          <MagneticButton maxOffset={8}>
            <button
              onClick={() => {
                sound.click();
                onOpenProjectModal();
              }}
              onMouseEnter={() => sound.hover()}
              className="btn-shimmer px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm font-mono-code flex items-center gap-2 shadow-xl shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowUpRight size={16} />
            </button>
          </MagneticButton>

          {/* Secondary CTA: Explore Archive */}
          <MagneticButton maxOffset={8}>
            <Link
              to="/work"
              onClick={() => sound.click()}
              onMouseEnter={() => sound.hover()}
              className={`px-6 py-3.5 rounded-full border text-xs sm:text-sm font-mono-code font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isDark 
                  ? 'bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08] hover:border-cyan-400/40' 
                  : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50 hover:border-sky-400 shadow-sm'
              }`}
            >
              <span>Explore 18+ Deliveries Archive</span>
              <ArrowRight size={15} />
            </Link>
          </MagneticButton>
        </div>

      </div>
    </section>
  );
}
