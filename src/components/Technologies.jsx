import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Activity } from 'lucide-react';
import { technologiesData, techCategories } from '../data/technologies';
import TechIcon from './TechIcons';
import { sound } from '../utils/sound';
import { useTheme } from '../context/ThemeContext';

export default function Technologies() {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredTech, setHoveredTech] = useState(null);

  // Divide into two balanced streams for dual-direction animated flow
  const stream1 = technologiesData.filter(
    (t) => t.category === "Frontend & 3D" || t.category === "AI & Automation"
  );
  const stream2 = technologiesData.filter(
    (t) => t.category === "Backend & Cloud" || t.category === "Databases & Storage"
  );

  // Repeat for continuous seamless marquee loop
  const row1 = [...stream1, ...stream1, ...stream1, ...stream1];
  const row2 = [...stream2, ...stream2, ...stream2, ...stream2];

  const handleChipHover = (tech) => {
    setHoveredTech(tech);
    sound.hover();
  };

  const handleChipLeave = () => {
    setHoveredTech(null);
  };

  const isMatched = (tech) => {
    if (selectedCategory === "All") return true;
    return tech.category === selectedCategory;
  };

  return (
    <section
      id="technology"
      className={`relative py-12 sm:py-16 border-t transition-colors duration-300 overflow-hidden w-full max-w-full ${
        isDark
          ? 'bg-[#090d16] border-white/[0.06] text-slate-100'
          : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      {/* Background ambient lighting */}
      <div
        className={`ambient-glow absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[350px] rounded-full blur-[140px] pointer-events-none -z-10 ${
          isDark ? 'bg-cyan-500/10' : 'bg-cyan-500/8'
        }`}
      />
      <div
        className={`ambient-glow absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[300px] rounded-full blur-[120px] pointer-events-none -z-10 ${
          isDark ? 'bg-violet-600/10' : 'bg-blue-500/6'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* COMPACT SECTION HEADER ROW */}
        <div data-motion-reveal className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code mb-2.5 shadow-sm backdrop-blur-md transition-colors ${
                isDark
                  ? 'bg-white/[0.04] border border-cyan-500/30 text-cyan-400'
                  : 'bg-slate-50 border border-cyan-500/30 text-cyan-700 shadow-slate-200/50'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full animate-pulse shadow-sm ${
                  isDark ? 'bg-cyan-400 shadow-cyan-400' : 'bg-cyan-600 shadow-cyan-600'
                }`}
              />
              <span className="tracking-widest font-medium">(&nbsp;TECH RADAR // MODERN STACK&nbsp;)</span>
            </div>

            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight leading-tight ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}
            >
              Engineered with modern tools. <span className="text-gradient-cyan">Built to perform.</span>
            </h2>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
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
                  className={`px-3 py-1 rounded-full text-xs font-mono-code transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? isDark
                        ? 'bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-400/25 scale-105'
                        : 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/25 scale-105'
                      : isDark
                        ? 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/5'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 border border-slate-200 shadow-sm'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* DUAL REVERSE ANIMATED MARQUEE CONTAINER */}
        <div className="relative overflow-hidden py-3 my-2 rounded-2xl sm:rounded-3xl border border-current/5">
          {/* Edge Vignette Masks for cinematic fade */}
          <div
            className={`tech-vignette-left absolute left-0 top-0 bottom-0 w-16 sm:w-28 pointer-events-none z-10 transition-colors duration-300 ${
              isDark
                ? 'bg-gradient-to-r from-[#090d16] to-transparent'
                : 'bg-gradient-to-r from-white to-transparent'
            }`}
          />
          <div
            className={`tech-vignette-right absolute right-0 top-0 bottom-0 w-16 sm:w-28 pointer-events-none z-10 transition-colors duration-300 ${
              isDark
                ? 'bg-gradient-to-l from-[#090d16] to-transparent'
                : 'bg-gradient-to-l from-white to-transparent'
            }`}
          />

          {/* STREAM 1: GLIDES LEFT (Frontend, 3D, Languages, AI) */}
          <div className="flex w-max animate-marquee-infinite py-1.5" style={{ animationDuration: '40s' }}>
            <div className="flex shrink-0 items-center gap-3 sm:gap-4 pr-3 sm:pr-4">
              {row1.map((tech, idx) => {
                const match = isMatched(tech);
                const isHovered = hoveredTech?.name === tech.name;

                return (
                  <div
                    key={`stream1-${tech.name}-${idx}`}
                    onMouseEnter={() => handleChipHover(tech)}
                    onMouseLeave={handleChipLeave}
                    className={`tech-chip-item group relative flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
                      isDark
                        ? 'bg-[#0d121c]/90 border-white/[0.08] shadow-lg shadow-black/40'
                        : 'bg-white border-slate-200 shadow-sm shadow-slate-200/60'
                    } ${
                      match ? 'opacity-100' : 'opacity-30 hover:opacity-100'
                    } ${
                      isHovered ? 'scale-105 -translate-y-1' : ''
                    }`}
                    style={{
                      borderColor: isHovered ? tech.accent : undefined,
                      boxShadow: isHovered
                        ? `0 10px 25px -5px ${tech.accent}33, 0 0 15px ${tech.accent}22`
                        : undefined,
                    }}
                  >
                    {/* Tech Brand Icon */}
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center p-1.5 transition-transform duration-200 group-hover:scale-110 shrink-0 ${
                        isDark ? 'bg-white/[0.06] border border-white/10' : 'bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <TechIcon
                        name={tech.name}
                        className="w-4 h-4 sm:w-5 sm:h-5 transition-transform"
                        style={{ color: tech.accent }}
                      />
                    </div>

                    {/* Tech Name & Tag */}
                    <div className="text-left whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-display font-bold text-sm sm:text-base tracking-wide transition-colors ${
                            isDark
                              ? 'text-white group-hover:text-cyan-300'
                              : 'text-slate-900 group-hover:text-cyan-700'
                          }`}
                        >
                          {tech.name}
                        </span>
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: tech.accent }}
                        />
                      </div>
                      <div
                        className={`text-[10px] font-mono-code uppercase tracking-wider ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {tech.tag}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STREAM 2: GLIDES RIGHT (Backend, Cloud, Databases, DevOps) */}
          <div className="flex w-max animate-marquee-reverse py-1.5" style={{ animationDuration: '44s' }}>
            <div className="flex shrink-0 items-center gap-3 sm:gap-4 pr-3 sm:pr-4">
              {row2.map((tech, idx) => {
                const match = isMatched(tech);
                const isHovered = hoveredTech?.name === tech.name;

                return (
                  <div
                    key={`stream2-${tech.name}-${idx}`}
                    onMouseEnter={() => handleChipHover(tech)}
                    onMouseLeave={handleChipLeave}
                    className={`tech-chip-item group relative flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
                      isDark
                        ? 'bg-[#0d121c]/90 border-white/[0.08] shadow-lg shadow-black/40'
                        : 'bg-white border-slate-200 shadow-sm shadow-slate-200/60'
                    } ${
                      match ? 'opacity-100' : 'opacity-30 hover:opacity-100'
                    } ${
                      isHovered ? 'scale-105 -translate-y-1' : ''
                    }`}
                    style={{
                      borderColor: isHovered ? tech.accent : undefined,
                      boxShadow: isHovered
                        ? `0 10px 25px -5px ${tech.accent}33, 0 0 15px ${tech.accent}22`
                        : undefined,
                    }}
                  >
                    {/* Tech Brand Icon */}
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center p-1.5 transition-transform duration-200 group-hover:scale-110 shrink-0 ${
                        isDark ? 'bg-white/[0.06] border border-white/10' : 'bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <TechIcon
                        name={tech.name}
                        className="w-4 h-4 sm:w-5 sm:h-5 transition-transform"
                        style={{ color: tech.accent }}
                      />
                    </div>

                    {/* Tech Name & Tag */}
                    <div className="text-left whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-display font-bold text-sm sm:text-base tracking-wide transition-colors ${
                            isDark
                              ? 'text-white group-hover:text-cyan-300'
                              : 'text-slate-900 group-hover:text-cyan-700'
                          }`}
                        >
                          {tech.name}
                        </span>
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: tech.accent }}
                        />
                      </div>
                      <div
                        className={`text-[10px] font-mono-code uppercase tracking-wider ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {tech.tag}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* INTERACTIVE LIVE TELEMETRY HUD BAR (Compact Animation Display) */}
        <div
          className={`tech-hud-panel mt-4 px-4 py-3 sm:px-6 sm:py-3.5 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
            isDark
              ? 'bg-white/[0.02] border-white/[0.07] text-slate-300'
              : 'bg-slate-50 border-slate-200 text-slate-700 shadow-sm'
          }`}
        >
          <AnimatePresence mode="wait">
            {hoveredTech ? (
              <motion.div
                key={hoveredTech.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-3 w-full sm:w-auto"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full animate-ping shrink-0"
                  style={{ backgroundColor: hoveredTech.accent }}
                />
                <span className="font-display font-bold text-sm text-cyan-400">
                  {hoveredTech.name}
                </span>
                <span className="hidden sm:inline font-mono-code text-[11px] opacity-60">
                  // {hoveredTech.category}
                </span>
                <span className="text-xs text-slate-300 truncate max-w-md">
                  {hoveredTech.description}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="default-telemetry"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-2 sm:gap-3 flex-wrap font-mono-code text-[11px] sm:text-xs"
              >
                <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  <span className="text-cyan-400 font-semibold">●</span> Sub-Second Performance
                </span>
                <span className="opacity-30">•</span>
                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  <span className="text-violet-400 font-semibold">●</span> 100% Type-Safe Architecture
                </span>
                <span className="opacity-30 hidden md:inline">•</span>
                <span className={`hidden md:inline ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <span className="text-emerald-400 font-semibold">●</span> Cloud-Native Scalability
                </span>
                <span className="opacity-30 hidden lg:inline">•</span>
                <span className={`hidden lg:inline ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <span className="text-amber-400 font-semibold">●</span> Production Hardened
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Status Badge */}
          <div className="flex items-center gap-2 font-mono-code text-[10px] sm:text-[11px] uppercase tracking-wider text-cyan-400 shrink-0">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>PROJECT-MATCHED STACK</span>
          </div>
        </div>
      </div>
    </section>
  );
}
