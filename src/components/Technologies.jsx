import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Terminal, Activity, Pause, Play, X } from 'lucide-react';
import { technologiesData, techCategories } from '../data/technologies';
import TechIcon from './TechIcons';
import MaskedHeading from './MaskedHeading';
import { sound } from '../utils/sound';
import { useTheme } from '../context/ThemeContext';

export default function Technologies() {
  const { isDark } = useTheme();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.15 });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredTech, setHoveredTech] = useState(null);
  const [selectedTech, setSelectedTech] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(() => !document.hidden);

  useEffect(() => {
    const handleVisibility = () => setIsDocumentVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const detailTech = hoveredTech || selectedTech;
  const paused = isPaused || isInteracting || isFocused || !!selectedTech || !isInView || !isDocumentVisible;
  const streams = [
    technologiesData.filter((tech) => tech.category === 'Frontend & 3D' || tech.category === 'AI & Automation'),
    technologiesData.filter((tech) => tech.category === 'Backend & Cloud' || tech.category === 'Databases & Storage'),
  ];

  const renderChip = (tech, duplicate = false) => {
    const matched = selectedCategory === 'All' || tech.category === selectedCategory;
    const active = detailTech?.name === tech.name;
    const Chip = duplicate ? 'div' : 'button';
    return (
      <Chip
        key={tech.name}
        type={duplicate ? undefined : 'button'}
        aria-pressed={duplicate ? undefined : selectedTech?.name === tech.name}
        aria-label={duplicate ? undefined : `${tech.name}: ${tech.tag}. Show technology details`}
        aria-describedby={duplicate ? undefined : 'technology-detail'}
        onMouseEnter={() => {
          setHoveredTech(tech);
          sound.hover();
        }}
        onMouseLeave={() => setHoveredTech(null)}
        onFocus={() => setHoveredTech(tech)}
        onBlur={() => setHoveredTech(null)}
        onClick={() => {
          sound.click();
          setSelectedTech((current) => current?.name === tech.name ? null : tech);
        }}
        className={`tech-chip-item group relative flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl border transition-all duration-300 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
          isDark
            ? 'bg-[#0d121c]/90 border-white/[0.08] shadow-lg shadow-black/40'
            : 'bg-white border-slate-200 shadow-sm shadow-slate-200/60'
        } ${matched ? 'opacity-100' : 'opacity-30 hover:opacity-100 focus-visible:opacity-100'}`}
        style={{
          borderColor: active ? tech.accent : undefined,
          boxShadow: active ? `0 8px 24px -8px ${tech.accent}33` : undefined,
        }}
      >
        <span className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center p-1.5 transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105 shrink-0 ${
          isDark ? 'bg-white/[0.06] border border-white/10' : 'bg-slate-100 border border-slate-200'
        }`}>
          <TechIcon name={tech.name} className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: tech.accent }} />
        </span>
        <span className="text-left whitespace-nowrap">
          <span className="flex items-center gap-2">
            <span className={`font-display font-bold text-sm sm:text-base tracking-wide transition-colors ${
              isDark ? 'text-white group-hover:text-cyan-300 group-focus-visible:text-cyan-300' : 'text-slate-900 group-hover:text-cyan-700 group-focus-visible:text-cyan-700'
            }`}>{tech.name}</span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tech.accent }} />
          </span>
          <span className={`block text-[10px] font-mono-code uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {tech.tag}
          </span>
        </span>
      </Chip>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="technology"
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false);
      }}
      className={`relative py-16 sm:py-20 transition-colors duration-300 overflow-hidden w-full max-w-full ${isDark ? 'text-slate-100' : 'bg-white text-slate-900'}`}
    >
      <div className={`ambient-glow absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[350px] rounded-full blur-[140px] pointer-events-none -z-10 ${isDark ? 'bg-cyan-500/10' : 'bg-cyan-500/8'}`} />
      <div className={`ambient-glow absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[300px] rounded-full blur-[120px] pointer-events-none -z-10 ${isDark ? 'bg-violet-600/10' : 'bg-blue-500/6'}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4"
        >
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code mb-2.5 shadow-sm backdrop-blur-md transition-colors ${
              isDark ? 'bg-white/[0.04] border border-cyan-500/30 text-cyan-400' : 'bg-slate-50 border border-cyan-500/30 text-cyan-700 shadow-slate-200/50'
            }`}>
              <span className={`w-2 h-2 rounded-full animate-pulse shadow-sm ${isDark ? 'bg-cyan-400 shadow-cyan-400' : 'bg-cyan-600 shadow-cyan-600'}`} />
              <span className="tracking-widest font-medium">(&nbsp;TECH RADAR // MODERN STACK&nbsp;)</span>
            </div>
            <MaskedHeading
              as="h2"
              className={`text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-950'}`}
              lines={[<span key="lead">Engineered with modern tools.</span>, <span key="accent" className="text-gradient-cyan">Built to perform.</span>]}
            />
          </div>

          <div className="flex flex-col md:items-end gap-3">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2" role="group" aria-label="Highlight technologies by category">
              {techCategories.map((category) => {
                const selected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      sound.click();
                      setSelectedCategory(category);
                    }}
                    onMouseEnter={() => sound.hover()}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-all duration-200 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 ${
                      selected
                        ? isDark ? 'text-slate-950 font-bold' : 'text-white font-bold'
                        : isDark ? 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/5' : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 border border-slate-200 shadow-sm'
                    }`}
                  >
                    {selected && <motion.span layoutId="activeTechFilter" className={`absolute inset-0 rounded-full shadow-md ${isDark ? 'bg-cyan-400 shadow-cyan-400/25' : 'bg-cyan-600 shadow-cyan-600/25'}`} transition={{ duration: reducedMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }} />}
                    <span className="relative z-10">{category}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono-code text-slate-400">
              <span>Hover, focus or tap a tool to explore.</span>
              {!reducedMotion && (
                <button type="button" aria-pressed={isPaused} aria-label={isPaused ? 'Resume moving technology rows' : 'Pause moving technology rows'} onClick={() => setIsPaused((current) => !current)} className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 cursor-pointer">
                  {isPaused ? <Play size={12} /> : <Pause size={12} />}
                  {isPaused ? 'Resume motion' : 'Pause motion'}
                </button>
              )}
            </div>
          </div>
        </motion.div>

        <div
          data-motion-reveal
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          className="relative overflow-hidden py-3 my-2 rounded-2xl sm:rounded-3xl border border-current/5"
        >
          {reducedMotion ? (
            <div className="flex flex-wrap justify-center gap-3 px-3 py-2">{technologiesData.map((tech) => renderChip(tech))}</div>
          ) : (
            <>
              <div className={`tech-vignette-left absolute left-0 inset-y-0 w-8 sm:w-20 pointer-events-none z-10 ${isDark ? 'bg-gradient-to-r from-[#090d16] to-transparent' : 'bg-gradient-to-r from-white to-transparent'}`} />
              <div className={`tech-vignette-right absolute right-0 inset-y-0 w-8 sm:w-20 pointer-events-none z-10 ${isDark ? 'bg-gradient-to-l from-[#090d16] to-transparent' : 'bg-gradient-to-l from-white to-transparent'}`} />
              {streams.map((stream, row) => (
                <div key={row} className={`flex w-max py-1.5 ${row === 0 ? 'animate-marquee-infinite' : 'animate-marquee-reverse'}`} style={{ animationDuration: row === 0 ? '40s' : '44s', animationPlayState: paused ? 'paused' : 'running' }}>
                  {[false, true].map((duplicate) => (
                    <div key={String(duplicate)} aria-hidden={duplicate || undefined} className="flex shrink-0 items-center gap-3 sm:gap-4 pr-3 sm:pr-4">
                      {stream.map((tech) => renderChip(tech, duplicate))}
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>

        <div data-motion-reveal style={{ '--motion-delay': '80ms' }} className={`tech-hud-panel mt-4 px-4 py-3 sm:px-6 sm:py-3.5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
          isDark ? 'bg-white/[0.02] border-white/[0.07] text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700 shadow-sm'
        }`}>
          <div id="technology-detail" className="min-h-10 sm:min-h-8 flex items-center flex-1 min-w-0">
            <AnimatePresence mode="wait" initial={false}>
              {detailTech ? (
                <motion.div key={detailTech.name} initial={{ opacity: 0, y: reducedMotion ? 0 : 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -5 }} transition={{ duration: reducedMotion ? 0 : 0.18 }} className="flex items-start gap-3 w-full">
                  <span className="w-2 h-2 mt-1.5 rounded-full shrink-0" style={{ backgroundColor: detailTech.accent }} />
                  <div>
                    <span className={`font-display font-bold text-sm ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>{detailTech.name}</span>
                    <span className="hidden sm:inline font-mono-code text-[11px] opacity-60"> // {detailTech.category}</span>
                    <p className={`text-xs leading-relaxed mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{detailTech.description}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="default-telemetry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.18 }} className="flex items-center gap-2 sm:gap-3 flex-wrap font-mono-code text-[11px] sm:text-xs">
                  <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className={isDark ? 'text-slate-400' : 'text-slate-600'}><span className="text-cyan-400">●</span> Sub-Second Performance</span>
                  <span className="opacity-30">•</span>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-600'}><span className="text-violet-400">●</span> 100% Type-Safe Architecture</span>
                  <span className="opacity-30 hidden md:inline">•</span>
                  <span className={`hidden md:inline ${isDark ? 'text-slate-400' : 'text-slate-600'}`}><span className="text-emerald-400">●</span> Cloud-Native Scalability</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {selectedTech && <button type="button" aria-label="Clear selected technology details" onClick={() => { setSelectedTech(null); setHoveredTech(null); }} className="flex items-center gap-1.5 text-cyan-400 text-[11px] font-mono-code cursor-pointer hover:text-cyan-300 shrink-0"><X size={12} />Clear details</button>}
          <div className="flex items-center gap-2 font-mono-code text-[10px] sm:text-[11px] uppercase tracking-wider text-cyan-400 shrink-0"><Activity className="w-3.5 h-3.5 animate-pulse" /><span>PROJECT-MATCHED STACK</span></div>
        </div>
      </div>
    </section>
  );
}
