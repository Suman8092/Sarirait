import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  LayoutGrid, 
  Monitor, 
  Eye, 
  Layers
} from 'lucide-react';
import { projectsData } from '../data/projects';
import { DeviceShowcase3D } from './3d/DeviceShowcase3D';
import SpotlightCard from './SpotlightCard';
import CaseStudyModal from './CaseStudyModal';
import CountUpValue from './CountUpValue';
import { sound } from '../utils/sound';
import { useTheme } from '../context/ThemeContext';

export default function Portfolio({ onOpenProjectModal }) {
  const { isDark } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const portfolioRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPlaying, setIsPlaying] = useState(() => (
    typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ));
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [viewMode, setViewMode] = useState('showcase'); // 'showcase' | 'grid' | 'device3d'

  const categories = [
    { id: 'All', label: 'Featured' },
    { id: 'E-commerce', label: 'E-commerce' },
    { id: 'Websites & Apps', label: 'Websites & Apps' },
    { id: 'Mobile Apps', label: 'Mobile Apps' },
    { id: 'Branding & Design', label: 'Branding & Design' },
  ];

  // Curated flagship projects for the home page preview. Solaris remains in the archive,
  // but is intentionally excluded from this featured work section.
  const featuredIds = [
    'diarashine-jewelry',
    'rydap-mobility',
    'archanna-gupta-couture',
    'chabhi-smart-key',
    'anabolic-nutrition'
  ];

  const featuredProjects = projectsData.filter((p) => featuredIds.includes(p.id));

  const displayProjects = activeCategory === 'All'
    ? featuredProjects
    : projectsData
      .filter((p) => p.category === activeCategory && p.id !== 'solaris-motion')
      .slice(0, 6);

  const handleCategoryChange = (catId) => {
    sound.click();
    setActiveCategory(catId);
    setCurrentIndex(0);
  };

  const activeProject = displayProjects[currentIndex] || displayProjects[0] || featuredProjects[0];

  useEffect(() => {
    if (!portfolioRef.current || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, { threshold: 0, rootMargin: '120px 0px' });
    observer.observe(portfolioRef.current);
    return () => observer.disconnect();
  }, []);

  // Navigation handlers
  const handleNext = useCallback(() => {
    sound.hover();
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % displayProjects.length);
  }, [displayProjects.length]);

  const handlePrev = useCallback(() => {
    sound.hover();
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + displayProjects.length) % displayProjects.length);
  }, [displayProjects.length]);

  const handleSelectSlide = (idx) => {
    if (idx === currentIndex) return;
    sound.click();
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedProject) return; // Don't trigger if modal is open
      if (viewMode !== 'showcase') return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, selectedProject, viewMode]);

  // Keep the showcase still when the visitor asks for reduced motion.
  useEffect(() => {
    if (prefersReducedMotion) setIsPlaying(false);
  }, [prefersReducedMotion]);

  // Slide Animation Variants
  const slideVariants = prefersReducedMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1, transition: { duration: 0.12 } },
        exit: { opacity: 0, transition: { duration: 0.1 } },
      }
    : {
        enter: (dir) => ({
          x: dir > 0 ? 50 : -50,
          opacity: 0,
          scale: 0.98,
          filter: 'blur(4px)',
        }),
        center: {
          x: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          transition: {
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
          },
        },
        exit: (dir) => ({
          x: dir > 0 ? -50 : 50,
          opacity: 0,
          scale: 0.98,
          filter: 'blur(4px)',
          transition: {
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1],
          },
        }),
      };

  return (
    <section 
      ref={portfolioRef}
      id="work" 
      className={`relative min-h-[calc(100svh-4rem)] py-8 sm:py-10 lg:py-12 transition-colors duration-300 overflow-hidden w-full max-w-full ${
        isDark 
          ? 'bg-[#07090e] border-t border-white/[0.06] text-slate-100' 
          : 'bg-slate-50 border-t border-slate-200 text-slate-900'
      }`}
    >
      {/* Background ambient lighting */}
      <div 
        className={`ambient-glow absolute top-1/4 right-0 w-full max-w-[600px] h-[350px] sm:h-[500px] rounded-full blur-[100px] pointer-events-none -z-10 transition-opacity ${
          isDark ? 'bg-cyan-600/10' : 'bg-sky-400/15'
        }`} 
      />
      <div 
        className={`ambient-glow absolute bottom-1/4 left-0 w-full max-w-[600px] h-[350px] sm:h-[500px] rounded-full blur-[100px] pointer-events-none -z-10 transition-opacity ${
          isDark ? 'bg-purple-600/10' : 'bg-indigo-300/15'
        }`} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* ===================================================================
            1. SECTION HEADER: TITLE, BADGE, & QUICK ARCHIVE LINK
            =================================================================== */}
        <div data-motion-reveal className="flex flex-col md:flex-row md:items-end justify-between mb-5 lg:mb-6 gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-2.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.85)]" />
              <span className={`text-[10px] sm:text-[11px] font-mono-code font-semibold tracking-[0.2em] uppercase ${isDark ? 'text-cyan-300' : 'text-sky-700'}`}>
                Featured work
              </span>
              <span className={`h-4 w-px ${isDark ? 'bg-white/15' : 'bg-slate-300'}`} />
              <span className={`text-[10px] sm:text-[11px] font-mono-code tracking-[0.14em] uppercase ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                18+ deliveries archive
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl xl:text-[2.65rem] font-display font-semibold tracking-[-0.04em] leading-[1.08]">
              Work that moves <span className="text-gradient-cyan">brands forward.</span>
            </h2>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4 md:max-w-xs shrink-0">
            <p className={`hidden sm:block text-xs leading-relaxed max-w-[190px] md:text-right ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              A few standouts from the brands we have helped launch and grow.
            </p>
            <Link
              to="/work"
              onClick={() => sound.click()}
              onMouseEnter={() => sound.hover()}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono-code font-semibold border transition-all group cursor-pointer ${isDark ? 'border-white/10 text-slate-200 hover:text-cyan-300 hover:border-cyan-400/40 bg-white/[0.03]' : 'border-slate-200 text-slate-700 hover:text-sky-700 hover:border-sky-300 bg-white'}`}
            >
              <span>View full archive</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ===================================================================
            2. INTERACTIVE CONTROLS BAR: CATEGORIES & VIEW SWITCHER
            =================================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.06] border-slate-200/60">
          
          {/* Category Filter Pills */}
          <div className="flex flex-nowrap items-center gap-1.5 sm:gap-2 overflow-x-auto">
            {categories.map((cat) => {
              const count = cat.id === 'All' 
                ? featuredProjects.length 
                : projectsData.filter((p) => p.category === cat.id).length;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  onMouseEnter={() => sound.hover()}
                  className={`px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono-code font-semibold transition-all border flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? isDark
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-lg shadow-cyan-500/15'
                        : 'bg-sky-100 text-sky-800 border-sky-400 shadow-sm'
                      : isDark
                        ? 'bg-white/[0.03] text-slate-400 border-white/[0.08] hover:text-white hover:border-white/20'
                        : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive 
                      ? isDark ? 'bg-cyan-400 text-black font-bold' : 'bg-sky-600 text-white font-bold'
                      : isDark ? 'bg-white/10 text-slate-400' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher Pills (Showcase vs Grid vs 3D Device) */}
          <div className={`inline-flex items-center p-1 rounded-2xl border self-start lg:self-auto ${
            isDark ? 'bg-[#0c1220] border-white/10' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <button
              onClick={() => {
                sound.click();
                setViewMode('showcase');
              }}
              onMouseEnter={() => sound.hover()}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono-code font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'showcase'
                  ? isDark
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'bg-sky-500 text-white shadow-sm'
                  : isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers size={13} />
              <span>Showcase</span>
            </button>

            <button
              onClick={() => {
                sound.click();
                setViewMode('grid');
              }}
              onMouseEnter={() => sound.hover()}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono-code font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? isDark
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'bg-sky-500 text-white shadow-sm'
                  : isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid size={13} />
              <span>Grid</span>
            </button>

            <button
              onClick={() => {
                sound.click();
                setViewMode('device3d');
              }}
              onMouseEnter={() => sound.hover()}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono-code font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'device3d'
                  ? isDark
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'bg-sky-500 text-white shadow-sm'
                  : isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Monitor size={13} />
              <span>3D</span>
            </button>
          </div>

        </div>

        {/* ===================================================================
            VIEW MODE 1: ANIMATED FLAGSHIP SHOWCASE STAGE (DEFAULT)
            =================================================================== */}
        {viewMode === 'showcase' && activeProject && (
          <div 
            className="relative mb-0"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* The Main Animated Card Stage */}
            <div className={`work-showcase-stage relative rounded-3xl overflow-hidden border shadow-2xl transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-b from-[#0c1220]/95 via-[#080d16] to-[#07090e] border-white/10 shadow-black/80' 
                : 'bg-white border-slate-200/90 shadow-2xl shadow-slate-200/80'
            }`}>
              
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeProject.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="grid grid-cols-1 lg:grid-cols-12 min-h-[390px] sm:min-h-[410px] lg:min-h-[420px]"
                >
                  
                  {/* LEFT COLUMN: PROJECT INTEL & LIVE IMPACT METRICS */}
                  <div className="lg:col-span-5 p-5 sm:p-6 lg:p-5 xl:p-6 flex flex-col justify-between z-10 min-h-0">
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className={`flex items-center gap-2 text-[10px] font-mono-code uppercase tracking-[0.12em] ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span>{activeProject.category}</span>
                          <span className="text-slate-600">/</span>
                          <span>{activeProject.year}</span>
                        </div>

                        {/* Slide Counter Indicator */}
                        <div className="flex items-center gap-2 text-xs font-mono-code font-semibold text-cyan-400">
                          <span>{String(currentIndex + 1).padStart(2, '0')}</span>
                          <span className={isDark ? 'text-slate-600' : 'text-slate-300'}>/</span>
                          <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>{String(displayProjects.length).padStart(2, '0')}</span>
                        </div>
                      </div>

                      {/* Client Brand Avatar & Title */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl p-1 flex items-center justify-center overflow-hidden border shadow-sm shrink-0 ${
                          isDark 
                            ? 'bg-black/70 border-white/10' 
                            : 'bg-white border-slate-200'
                        }`}>
                          <img
                            src={activeProject.logo}
                            alt={`${activeProject.client} Logo`}
                            className="w-full h-full object-cover rounded-xl"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                        <div>
                          <h3 className={`text-lg sm:text-xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {activeProject.client}
                          </h3>
                          <p className="text-xs font-mono-code text-cyan-500 font-semibold">
                            {activeProject.industry}
                          </p>
                        </div>
                      </div>

                      {/* Project Main Pitch Headline */}
                      <h4 className={`work-heading text-lg sm:text-xl xl:text-2xl font-display font-semibold leading-tight mb-2 ${
                        isDark ? 'text-slate-100' : 'text-slate-900'
                      }`}>
                        {activeProject.title}
                      </h4>

                      <p className={`work-text-sub text-[11px] sm:text-xs leading-relaxed mb-3 line-clamp-2 ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {activeProject.description}
                      </p>

                      {/* Live Impact Results Grid */}
                      <div className={`grid grid-cols-2 gap-3 mb-3 py-2.5 border-y ${
                        isDark ? 'border-white/[0.08]' : 'border-slate-200'
                      }`}>
                        {activeProject.results.slice(0, 2).map((res, i) => (
                          <div 
                            key={i} 
                            className={i === 1 ? `pl-3 border-l ${isDark ? 'border-white/[0.08]' : 'border-slate-200'}` : ''}
                          >
                            <div className="text-[9px] font-mono-code uppercase font-semibold text-slate-400 truncate mb-1">
                              {res.label}
                            </div>
                            <div className={`work-metric-title text-base sm:text-xl font-display font-semibold tracking-tight ${
                              isDark ? 'text-white' : 'text-slate-900'
                            }`}>
                              <CountUpValue value={res.value} />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2 text-[10px] font-mono-code">
                        {activeProject.techStack.slice(0, 3).map((tech, idx) => (
                          <React.Fragment key={idx}>
                            {idx > 0 && <span className="text-slate-600">·</span>}
                            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>{tech}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className={`pt-3 border-t flex flex-wrap items-center justify-between gap-3 ${
                      isDark ? 'border-white/[0.08]' : 'border-slate-200'
                    }`}>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            sound.click();
                            setSelectedProject(activeProject);
                          }}
                          onMouseEnter={() => sound.hover()}
                          className="px-3.5 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-[11px] font-mono-code flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <Eye size={14} />
                          <span>View Full Case Study</span>
                          <ArrowUpRight size={14} />
                        </button>
                      </div>

                      {/* Navigation Controls */}
                      <div className="flex items-center gap-2">
                        {/* Play / Pause Toggle */}
                        <button
                          onClick={() => {
                            if (prefersReducedMotion) return;
                            sound.click();
                            setIsPlaying(!isPlaying);
                          }}
                          disabled={prefersReducedMotion}
                          onMouseEnter={() => sound.hover()}
                          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                            isDark 
                              ? 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white hover:border-white/30' 
                              : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm'
                          }`}
                          title={isPlaying ? 'Pause Auto-Play' : 'Resume Auto-Play'}
                        >
                          {isPlaying ? <Pause size={13} /> : <Play size={13} className="translate-x-0.5" />}
                        </button>

                        {/* Prev Button */}
                        <button
                          onClick={handlePrev}
                          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                            isDark 
                              ? 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white hover:border-white/30' 
                              : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm'
                          }`}
                          title="Previous Project"
                        >
                          <ChevronLeft size={16} />
                        </button>

                        {/* Next Button */}
                        <button
                          onClick={handleNext}
                          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                            isDark 
                              ? 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white hover:border-white/30' 
                              : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm'
                          }`}
                          title="Next Project"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* RIGHT COLUMN: HIGH-RES PROJECT VISUAL STAGE WITH 3D AMBIENCE */}
                  <div 
                    onClick={() => {
                      sound.click();
                      setSelectedProject(activeProject);
                    }}
                    className="lg:col-span-7 relative overflow-hidden flex items-center justify-center p-3 sm:p-5 lg:p-5 cursor-pointer group"
                  >
                    {/* Background Dynamic Color Glow */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-tr ${activeProject.themeColor} opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none`} 
                    />
                    
                    {/* Decorative Grid Pattern */}
                    <div className="absolute inset-0 bg-mesh-grid opacity-20 pointer-events-none" />

                    {/* Main Mockup Graphic Wrapper */}
                    <div data-glossy data-scroll-depth="12" className="relative w-full h-[260px] sm:h-[310px] lg:h-[min(40vh,380px)] rounded-2xl overflow-hidden border border-white/20 shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                      <img
                        src={activeProject.image || activeProject.logo}
                        alt={`${activeProject.client} Showcase Mockup`}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />

                      {/* Gradient Overlays for Depth */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${
                        isDark ? 'from-[#07090e] via-transparent to-black/30' : 'from-slate-900/80 via-transparent to-transparent'
                      } pointer-events-none`} />

                      {/* Interactive Hover Indicator (Top-Right) */}
                      <div className="absolute top-4 right-4 z-10">
                        <div className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-cyan-400 group-hover:text-black group-hover:scale-110 transition-all duration-300 shadow-xl">
                          <ArrowUpRight size={18} />
                        </div>
                      </div>

                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* CSS driven autoplay progress stays off the React render loop. */}
              <div key={activeProject.id} className="absolute bottom-0 left-0 right-0 h-1 bg-white/[0.08]" aria-hidden="true">
                <span
                  className="work-autoplay-progress block h-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-sm shadow-cyan-400"
                  style={{ animationPlayState: isPlaying && !isHovered && isInView && !prefersReducedMotion ? 'running' : 'paused' }}
                  onAnimationEnd={() => {
                    if (isPlaying && !isHovered && isInView && !prefersReducedMotion) handleNext();
                  }}
                />
              </div>

            </div>

            {/* ===============================================================
                INTERACTIVE THUMBNAIL DECK / TIMELINE STRIP (BELOW STAGE)
                =============================================================== */}
            <div
              className="work-thumbnail-grid mt-3 grid gap-2"
              style={{ '--work-thumbnail-columns': displayProjects.length }}
            >
              {displayProjects.map((proj, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={proj.id}
                    onClick={() => handleSelectSlide(idx)}
                    onMouseEnter={() => sound.hover()}
                    className={`relative h-12 sm:h-14 px-2.5 sm:px-3 rounded-xl text-left border transition-all duration-300 cursor-pointer overflow-hidden flex items-center gap-2 ${
                      isActive
                        ? isDark
                          ? 'bg-cyan-500/15 border-cyan-400 shadow-lg shadow-cyan-500/20 translate-y-[-2px]'
                          : 'bg-white border-sky-500 shadow-md translate-y-[-2px]'
                        : isDark
                          ? 'bg-[#0c1220]/60 border-white/[0.06] hover:bg-white/[0.04] hover:border-white/20'
                          : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg overflow-hidden border border-white/20 shrink-0 bg-black/60">
                        <img 
                          src={proj.logo} 
                          alt={proj.client} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <span className={`text-[11px] font-bold font-display truncate ${
                        isActive 
                          ? isDark ? 'text-white' : 'text-sky-900' 
                          : isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {proj.client}
                      </span>
                    </div>

                    {/* Active item dynamic progress bar */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500/30">
                        <span
                          className="work-autoplay-progress block h-full bg-cyan-400"
                          style={{ animationPlayState: isPlaying && !isHovered && isInView && !prefersReducedMotion ? 'running' : 'paused' }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

          </div>
        )}

        {/* ===================================================================
            VIEW MODE 2: INTERACTIVE 3D VIRTUAL DEVICE SHOWCASE
            =================================================================== */}
        {viewMode === 'device3d' && (
          <div className="mb-14">
            <div className={`relative rounded-3xl p-6 sm:p-10 lg:p-14 overflow-hidden border shadow-2xl ${
              isDark 
                ? 'bg-gradient-to-b from-[#0c1220] via-[#07090e] to-[#07090e] border-cyan-500/30' 
                : 'bg-white border-slate-200 shadow-2xl'
            }`}>
              <div className="relative z-10 text-center max-w-2xl mx-auto mb-6">
                <span className="text-xs font-mono-code uppercase tracking-widest text-cyan-400 mb-2 block font-semibold">
                  Interactive 3D Studio
                </span>
                <h3 className={`text-xl sm:text-3xl font-display font-bold tracking-tight leading-snug ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Creative vision, engineered for real-world impact.
                </h3>
                <p className={`text-xs sm:text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Switch between three project previews, try their mini interactions, or open each live website.
                </p>
              </div>

              {/* The 3D Laptop Component */}
              <DeviceShowcase3D />
            </div>
          </div>
        )}

        {/* ===================================================================
            VIEW MODE 3: BENTO GRID VIEW OF ALL FLAGSHIP PROJECTS
            =================================================================== */}
        {viewMode === 'grid' && (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <AnimatePresence mode="popLayout">
              {displayProjects.map((project, idx) => (
                <SpotlightCard
                  layout
                  key={project.id}
                  spotlightColor={isDark ? "rgba(0, 240, 255, 0.16)" : "rgba(2, 132, 199, 0.12)"}
                  borderColor={isDark ? "rgba(0, 240, 255, 0.45)" : "rgba(2, 132, 199, 0.4)"}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -6, transition: { type: 'spring', stiffness: 260, damping: 20 } }}
                  onMouseEnter={() => sound.hover()}
                  data-cursor="view"
                  onClick={() => {
                    sound.click();
                    setSelectedProject(project);
                  }}
                  className={`group rounded-3xl overflow-hidden border cursor-pointer flex flex-col justify-between shadow-xl transition-all duration-300 ${
                    isDark 
                      ? 'bg-[#0c1220]/90 border-white/[0.08] hover:border-cyan-500/40' 
                      : 'bg-white border-slate-200 hover:border-sky-400 shadow-md'
                  }`}
                >
                  {/* Top Image Preview & Client Logo */}
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900 p-4 flex flex-col justify-between">
                    <img
                      src={project.image || project.logo}
                      alt={project.client}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50 pointer-events-none" />

                    {/* Logo & Category Bar */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
                          <img src={project.logo} alt={project.client} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white font-display">{project.client}</div>
                          <div className="text-[10px] font-mono-code text-cyan-300">{project.category}</div>
                        </div>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-cyan-400 group-hover:text-black transition-all">
                        <ArrowUpRight size={15} />
                      </div>
                    </div>

                    {/* Floating Deliverable Badge */}
                    <div className="relative z-10 flex items-center justify-between p-2 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-xs text-white">
                      <span className="font-mono-code text-[11px] text-cyan-300 font-semibold">{project.results[0]?.value}</span>
                      <span className="text-[10px] font-mono-code text-slate-300 uppercase">{project.results[0]?.label}</span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className={`text-base font-bold font-display line-clamp-1 mb-2 group-hover:text-cyan-400 transition-colors ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {project.title}
                      </h4>
                      <p className={`text-xs line-clamp-2 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/[0.06] border-slate-100 flex items-center justify-between text-xs font-mono-code">
                      <span className="text-cyan-500 font-bold flex items-center gap-1 group-hover:underline">
                        <span>View Details</span>
                        <ArrowUpRight size={13} />
                      </span>
                      <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>{project.year}</span>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>

      {/* Case Study Detailed Modal */}
      <CaseStudyModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenProjectModal={onOpenProjectModal}
      />
    </section>
  );
}
