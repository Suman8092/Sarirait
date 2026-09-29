import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/sound';
import { useLenis } from './SmoothScroll';
import { useTheme } from '../context/ThemeContext';

export default function CaseStudyModal({ project, isOpen, onClose, onOpenProjectModal }) {
  const { isDark } = useTheme();
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [isOpen, lenis]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.click();
            onClose();
          }}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#0a0e1a] border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-500/20 overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Top Bar with Client Logo Badge */}
          <div className={`px-6 py-4 border-b flex items-center justify-between ${
            isDark ? 'border-white/[0.08] bg-white/[0.02]' : 'border-slate-200 bg-slate-50'
          }`}>
            <div className="flex items-center gap-3.5">
              {/* Logo icon */}
              <div className="w-11 h-11 rounded-2xl bg-black/80 border border-cyan-400/40 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-lg shadow-cyan-500/10">
                <img
                  src={project.logo}
                  alt={`${project.client} Logo`}
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-base font-bold font-display ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {project.client}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
                    <ShieldCheck size={12} />
                    Verified Project
                  </span>
                </div>
                <span className={`text-[11px] font-mono-code ${
                  isDark ? 'text-cyan-300' : 'text-cyan-700 font-semibold'
                }`}>
                  {project.industry} // {project.year}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                sound.click();
                onClose();
              }}
              onMouseEnter={() => sound.hover()}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                isDark
                  ? 'bg-white/[0.06] hover:bg-white/[0.15] text-slate-300 hover:text-white'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700 hover:text-slate-950'
              }`}
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
            
            {/* OFFICIAL LOGO & BRAND ARTWORK HERO SHOWCASE */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0c1220] to-[#07090e] shadow-2xl group">
              <div className="relative h-64 sm:h-96 w-full overflow-hidden bg-black/40">
                <img
                  src={project.image || project.logo}
                  alt={`${project.client} Official Brand Identity & Deliverable`}
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Subtle scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/30 to-transparent pointer-events-none" />

                {/* Bottom floating logo watermark badge */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 z-10">
                  <div className="flex items-center gap-3 bg-black/85 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-white/15 shadow-2xl">
                    <div className="w-10 h-10 rounded-xl bg-black border border-cyan-400/60 p-1 overflow-hidden shrink-0">
                      <img
                        src={project.logo}
                        alt={`${project.client} Logo`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white font-display">
                        {project.client} Official Brand Logo
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-mono-code text-cyan-400">
                        Designed &amp; Developed by Sarirait
                      </div>
                    </div>
                  </div>

                  <span className="px-3.5 py-1.5 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-400/30 text-xs font-mono-code text-cyan-300 font-bold">
                    {project.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Title & Metadata */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono-code text-cyan-400 uppercase tracking-widest font-semibold">
                  {project.industry}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono-code text-slate-400">{project.year}</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono-code text-emerald-400">Verified Client Case Study</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                {project.title}
              </h3>
              <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              {project.results.map((res, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    {res.value}
                  </div>
                  <div className="text-xs font-mono-code text-slate-400 uppercase mt-1">
                    {res.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-rose-500/[0.03] border border-rose-500/20">
                <span className="text-xs font-mono-code uppercase text-rose-400 block mb-2 font-semibold">
                  01 // Client Challenge
                </span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-cyan-500/[0.03] border border-cyan-500/20">
                <span className="text-xs font-mono-code uppercase text-cyan-400 block mb-2 font-semibold">
                  02 // Delivered Solution
                </span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Services & Tech Stack */}
            <div>
              <h4 className="text-xs font-mono-code uppercase tracking-widest text-slate-400 mb-3">
                Technologies &amp; Scope Delivered
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-mono-code bg-white/[0.04] text-slate-300 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar CTA */}
          <div className="px-6 py-4 border-t border-white/[0.08] bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono-code text-slate-400">
              Want to build something similar for your brand?
            </span>
            <button
              onClick={() => {
                sound.click();
                onClose();
                onOpenProjectModal();
              }}
              onMouseEnter={() => sound.hover()}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full font-semibold text-xs tracking-wider uppercase bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 active:scale-95 transition-all"
            >
              <span>Start a Similar Project</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
