import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { technologiesData, techCategories } from '../data/technologies';
import { sound } from '../utils/sound';

export default function Technologies() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTech = selectedCategory === "All"
    ? technologiesData
    : technologiesData.filter(t => t.category === selectedCategory);

  return (
    <section id="technology" className="relative py-28 bg-[#090d16] border-t border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[500px] bg-cyan-500/10 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono-code text-cyan-400 mb-4 border border-cyan-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>INFRASTRUCTURE &amp; STACK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight">
              Built with <br />
              <span className="text-gradient-cyan">modern technology.</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md">
            We operate at the leading edge of open-source standards and battle-tested cloud frameworks, ensuring zero obsolescence and infinite scale.
          </p>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-12">
          {techCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  sound.click();
                  setSelectedCategory(cat);
                }}
                onMouseEnter={() => sound.hover()}
                className={`px-5 py-2.5 rounded-full text-xs font-mono-code uppercase tracking-wider transition-all duration-200 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white border-transparent shadow-lg shadow-cyan-500/25'
                    : 'bg-white/[0.03] text-slate-400 border-white/[0.07] hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* FLOATING TECHNOLOGY BADGES MATRIX */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <AnimatePresence>
            {filteredTech.map((tech) => (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => sound.hover()}
                className="group p-6 rounded-2xl glass-card border border-white/[0.08] hover:border-cyan-500/40 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Subtle colored glow corner */}
                <div 
                  className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-60 transition-opacity pointer-events-none"
                  style={{ backgroundColor: tech.accent }}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {tech.name}
                    </span>
                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/[0.05] text-slate-400 border border-white/[0.06]">
                      {tech.tag}
                    </span>
                  </div>

                  <div className="text-xs font-mono-code text-cyan-400/90 mb-2">
                    {tech.level}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {tech.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono-code text-slate-500">
                  <span>{tech.category}</span>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tech.accent }} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ECOSYSTEM BOTTOM NOTICE */}
        <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-cyan-400 shrink-0" />
            <span className="text-xs sm:text-sm text-slate-300">
              Need a bespoke stack not listed above? We support custom Rust, Go, Python microservices, and hybrid on-prem topologies.
            </span>
          </div>
          <span className="text-xs font-mono-code text-cyan-400 whitespace-nowrap">
            100% TECH AGNOSTIC
          </span>
        </div>

      </div>
    </section>
  );
}
