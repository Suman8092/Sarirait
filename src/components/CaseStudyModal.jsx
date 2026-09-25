import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';

export default function CaseStudyModal({ project, isOpen, onClose, onOpenProjectModal }) {
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
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-mono-code uppercase tracking-wider text-cyan-300">
                Case Study // {project.client}
              </span>
            </div>
            <button
              onClick={() => {
                sound.click();
                onClose();
              }}
              onMouseEnter={() => sound.hover()}
              className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.15] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
            {/* Title & Metadata */}
            <div>
              <span className="text-xs font-mono-code text-cyan-400 uppercase tracking-widest block mb-2">
                {project.industry} • {project.year}
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
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
                <span className="text-xs font-mono-code uppercase text-rose-400 block mb-2">
                  01 // The Challenge
                </span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-cyan-500/[0.03] border border-cyan-500/20">
                <span className="text-xs font-mono-code uppercase text-cyan-400 block mb-2">
                  02 // The Sarirait Solution
                </span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Services & Tech Stack */}
            <div>
              <h4 className="text-xs font-mono-code uppercase tracking-widest text-slate-400 mb-3">
                Deployed Technologies &amp; Architecture
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
              Want similar high-velocity results for your organization?
            </span>
            <button
              onClick={() => {
                sound.click();
                onClose();
                onOpenProjectModal();
              }}
              onMouseEnter={() => sound.hover()}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full font-semibold text-xs tracking-wider uppercase bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              <span>Build A Solution Like This</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
