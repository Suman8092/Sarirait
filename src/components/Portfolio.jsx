import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  MousePointer2
} from 'lucide-react';
import { projectsData } from '../data/projects';
import CaseStudyModal from './CaseStudyModal';
import MaskedHeading from './MaskedHeading';
import { sound } from '../utils/sound';
import { useTheme } from '../context/ThemeContext';
import { useLenis } from './SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio({ onOpenProjectModal }) {
  const { isDark } = useTheme();
  const lenis = useLenis();
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPinned, setIsPinned] = useState(false);

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const progressBarRef = useRef(null);
  const counterRef = useRef(null);

  // Curated prominent client brands to showcase
  const featuredIds = [
    'diarashine-jewelry',
    'rydap-mobility',
    'anabolic-nutrition',
    'chabhi-smart-key',
    'archanna-gupta-couture',
    'solaris-motion',
    'scolakidz-learning',
    'lifezila-wellness',
    'mom-made-pickle'
  ];

  const showcaseProjects = featuredIds
    .map(id => projectsData.find(p => p.id === id))
    .filter(Boolean);

  // Setup GSAP Responsive ScrollTrigger Pinning
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    // Desktop & Tablet (>= 768px): Cinematic pinned horizontal scroll driven by vertical scroll
    mm.add('(min-width: 768px)', () => {
      setIsPinned(true);

      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Total horizontal distance to glide through all cards + breathing room at the end
        return Math.max(0, trackWidth - viewportWidth + 100);
      };

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          scrub: 0.75,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${progress * 100}%`;
            }
            const total = showcaseProjects.length;
            const current = Math.min(total - 1, Math.max(0, Math.round(progress * (total - 1))));
            setActiveProjectIndex(current);
            if (counterRef.current) {
              counterRef.current.innerText = `0${current + 1} / 0${total}`;
            }
            setCanScrollLeft(progress > 0.02);
            setCanScrollRight(progress < 0.98);
          },
        }
      });

      scrollTriggerRef.current = tween.scrollTrigger;

      return () => {
        scrollTriggerRef.current = null;
        tween.kill();
      };
    });

    // Mobile (< 768px): Natural horizontal touch swipe
    mm.add('(max-width: 767px)', () => {
      setIsPinned(false);
      return undefined;
    });

    // Refresh after DOM and layout settle
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 250);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      mm.revert();
    };
  }, [showcaseProjects.length]);

  // Navigate to specific project smoothly (syncs vertical scroll when pinned)
  const navigateToProject = useCallback((index) => {
    const trigger = scrollTriggerRef.current;
    if (trigger) {
      const progress = index / Math.max(1, showcaseProjects.length - 1);
      const targetY = trigger.start + progress * (trigger.end - trigger.start);
      if (lenis) {
        lenis.scrollTo(targetY, { duration: 0.9 });
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    } else if (viewportRef.current && trackRef.current) {
      const card = trackRef.current.children[index];
      if (card) {
        viewportRef.current.scrollTo({
          left: card.offsetLeft - 24,
          behavior: 'smooth'
        });
      }
    }
  }, [lenis, showcaseProjects.length]);

  // Handle native scroll on mobile (when not pinned)
  const handleMobileScroll = () => {
    if (isPinned || !viewportRef.current) return;
    const viewport = viewportRef.current;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    if (maxScroll <= 0) return;
    const progress = Math.min(1, Math.max(0, viewport.scrollLeft / maxScroll));
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${progress * 100}%`;
    }
    const current = Math.min(showcaseProjects.length - 1, Math.max(0, Math.round(progress * (showcaseProjects.length - 1))));
    setActiveProjectIndex(current);
    if (counterRef.current) {
      counterRef.current.innerText = `0${current + 1} / 0${showcaseProjects.length}`;
    }
    setCanScrollLeft(viewport.scrollLeft > 10);
    setCanScrollRight(viewport.scrollLeft < maxScroll - 10);
  };

  const handleCardClick = (project) => {
    sound.click();
    setSelectedProject(project);
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className={`relative w-full ${
        isPinned ? 'h-screen min-h-[640px] max-h-[1080px]' : 'h-auto py-12 sm:py-16'
      } overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 pb-4 sm:pb-6 z-20 ${
        isDark ? 'bg-[#07090e] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Background ambient lighting */}
      <div
        className={`ambient-glow absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[450px] rounded-full blur-[140px] pointer-events-none -z-10 ${
          isDark ? 'bg-cyan-500/10' : 'bg-sky-400/15'
        }`}
      />
      <div
        className={`ambient-glow absolute bottom-1/4 right-0 w-full max-w-[700px] h-[450px] rounded-full blur-[140px] pointer-events-none -z-10 ${
          isDark ? 'bg-indigo-600/10' : 'bg-indigo-300/15'
        }`}
      />

      {/* ===================================================================
          1. SECTION HEADER: TITLE, CONTROLS, PROGRESS BAR, ARCHIVE LINK
          =================================================================== */}
      <div data-motion-reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full shrink-0 mb-3 sm:mb-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code mb-2 border ${
              isDark ? 'glass-pill border-cyan-500/30' : 'bg-sky-50 border-sky-200 shadow-xs'
            }`}>
              <span className={`w-2 h-2 rounded-full animate-pulse ${isDark ? 'bg-cyan-400' : 'bg-sky-500'}`} />
              <span className={isDark ? 'text-cyan-300 font-semibold' : 'text-sky-700 font-semibold'}>
                FEATURED WORK // SCROLL-DRIVEN SHOWCASE
              </span>
              <span className="opacity-30">·</span>
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>18+ DELIVERIES ARCHIVE</span>
            </div>

            <MaskedHeading
              as="h2"
              className={`text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight leading-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
              lines={[
                <span key="lead">Work that moves</span>,
                <span key="accent" className="text-gradient-cyan">brands forward.</span>
              ]}
            />
          </div>

          {/* Right: Interaction hint, Progress meter & Navigation arrows */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
            <div className={`hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono-code border ${
              isDark ? 'bg-white/[0.04] border-white/10 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-xs'
            }`}>
              <MousePointer2 size={13} className={isDark ? 'text-cyan-400' : 'text-sky-600'} />
              <span>{isPinned ? 'Scroll down to explore →' : 'Swipe to explore →'}</span>
            </div>

            {/* Live Counter */}
            <div
              ref={counterRef}
              className={`text-xs font-mono-code font-bold px-3 py-1 rounded-full border ${
                isDark
                  ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
                  : 'text-sky-700 bg-sky-50 border-sky-200'
              }`}
            >
              01 / 0{showcaseProjects.length}
            </div>

            {/* Progress bar container */}
            <div className={`w-20 sm:w-28 h-2 rounded-full overflow-hidden relative ${
              isDark ? 'bg-white/10' : 'bg-slate-200'
            }`}>
              <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 rounded-full shadow-sm shadow-cyan-400/50 w-0 transition-all duration-150"
              />
            </div>

            {/* Navigation Arrow Buttons */}
            <div className="flex items-center gap-1.5" aria-label="Browse featured projects">
              <button
                type="button"
                disabled={!canScrollLeft}
                aria-label="Previous featured project"
                onClick={() => {
                  sound.click();
                  const prev = Math.max(0, activeProjectIndex - 1);
                  navigateToProject(prev);
                }}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                  isDark
                    ? 'border-white/10 text-slate-300 hover:border-cyan-400/60 hover:text-cyan-300 hover:bg-cyan-500/10'
                    : 'border-slate-200 text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50'
                }`}
              >
                <ArrowLeft size={14} />
              </button>

              <button
                type="button"
                disabled={!canScrollRight}
                aria-label="Next featured project"
                onClick={() => {
                  sound.click();
                  const next = Math.min(showcaseProjects.length - 1, activeProjectIndex + 1);
                  navigateToProject(next);
                }}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                  isDark
                    ? 'border-white/10 text-slate-300 hover:border-cyan-400/60 hover:text-cyan-300 hover:bg-cyan-500/10'
                    : 'border-slate-200 text-slate-700 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50'
                }`}
              >
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Archive Link */}
            <Link
              to="/work"
              onClick={() => sound.click()}
              onMouseEnter={() => sound.hover()}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono-code font-bold uppercase tracking-wider border transition-all duration-300 group cursor-pointer shadow-sm ${
                isDark
                  ? 'border-white/10 text-slate-200 hover:text-cyan-300 hover:border-cyan-400/50 bg-white/[0.03]'
                  : 'border-slate-200 text-slate-700 hover:text-sky-800 hover:border-sky-300 bg-white'
              }`}
            >
              <span>Archive</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* ===================================================================
          2. HORIZONTAL SCROLL TRACK (PINNED ON DESKTOP, GLIDING AS USER SCROLLS)
          =================================================================== */}
      <div
        ref={viewportRef}
        onScroll={handleMobileScroll}
        className={`w-full relative flex-1 flex items-center my-auto ${
          isPinned ? 'overflow-hidden' : 'overflow-x-auto overflow-y-hidden scrollbar-none py-4'
        }`}
      >
        <div
          ref={trackRef}
          className="flex gap-5 sm:gap-7 px-4 sm:px-8 lg:px-12 w-max items-center will-change-transform select-none"
        >
          {showcaseProjects.map((project, idx) => (
            <div
              key={project.id}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={`View ${project.client} case study`}
              onClick={() => handleCardClick(project)}
              onMouseEnter={() => sound.hover()}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleCardClick(project);
                }
                if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                  event.preventDefault();
                  const nextIndex = Math.min(showcaseProjects.length - 1, Math.max(0, idx + (event.key === 'ArrowRight' ? 1 : -1)));
                  navigateToProject(nextIndex);
                }
              }}
              className={`w-[85vw] sm:w-[370px] md:w-[410px] lg:w-[440px] h-[350px] sm:h-[380px] lg:h-[400px] shrink-0 rounded-3xl p-4 sm:p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-xl hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
                isDark
                  ? 'bg-gradient-to-b from-[#0e1628]/95 via-[#090e1a]/95 to-[#060912] border-white/10 hover:border-cyan-400/50 hover:shadow-cyan-500/10'
                  : 'bg-white border-slate-200/90 hover:border-sky-400/80 shadow-slate-200/60 hover:shadow-2xl hover:shadow-sky-500/10'
              }`}
            >
              {/* HERO LOGO DISPLAY BOX: Rich brand atmosphere, floating emblem plaque */}
              <div className={`relative h-38 sm:h-44 w-full rounded-2xl p-4 flex flex-col justify-between overflow-hidden border transition-all duration-300 ${
                isDark
                  ? 'bg-[#090e1a] border-white/[0.08]'
                  : 'bg-gradient-to-br from-slate-50 via-white to-slate-100/70 border-slate-200/80'
              }`}>
                {/* Dynamic Brand Accent Ambient Radial Glow */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-20 group-hover:opacity-40"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${project.accentColor || '#00f0ff'}40, transparent 70%)`
                  }}
                />

                {/* Subtle Tech Grid Pattern Texture */}
                <div
                  className="absolute inset-0 opacity-[0.06] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
                    backgroundSize: '16px 16px'
                  }}
                />

                {/* Top Floating Row: Category Badge & Project Index */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider backdrop-blur-md border shadow-xs ${
                    isDark
                      ? 'bg-black/60 text-slate-200 border-white/10'
                      : 'bg-white/95 text-slate-800 border-slate-200'
                  }`}>
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: project.accentColor || '#00f0ff' }}
                    />
                    <span>{project.category}</span>
                  </span>

                  <span className={`text-[10px] font-mono-code font-bold px-2 py-0.5 rounded-full border ${
                    isDark ? 'bg-white/[0.05] text-slate-300 border-white/10' : 'bg-white text-slate-600 border-slate-200 shadow-xs'
                  }`}>
                    0{idx + 1} // {project.year}
                  </span>
                </div>

                {/* Center Floating Brand Emblem Plaque */}
                <div className="relative z-10 my-auto flex items-center justify-center">
                  <div className="px-5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-md shadow-slate-900/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={project.logo}
                      alt={`${project.client} Brand Logo`}
                      className="h-10 sm:h-12 w-auto max-w-[150px] object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Bottom Deliverable Chip Inside Preview */}
                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-code pt-1">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] border ${
                    isDark
                      ? 'bg-white/[0.05] text-slate-400 border-white/[0.06]'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {project.techStack?.[0] || 'Enterprise Architecture'}
                  </span>

                  <span className={`text-[10px] font-medium flex items-center gap-1 transition-colors ${
                    isDark ? 'text-cyan-400 group-hover:text-cyan-300' : 'text-sky-600 group-hover:text-sky-700'
                  }`}>
                    <span>Inspect case</span>
                    <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>

              {/* BRAND INFO & IMPACT METRICS */}
              <div className="pt-3 flex flex-col justify-between flex-1 gap-2">
                <div>
                  {/* Client Name + Result Metric */}
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className={`text-lg sm:text-xl font-display font-bold transition-colors ${
                        isDark ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-sky-600'
                      }`}>
                        {project.client}
                      </h3>
                      <CheckCircle2 size={16} className={isDark ? "text-cyan-400 shrink-0" : "text-sky-600 shrink-0"} />
                    </div>

                    {project.results?.[0] && (
                      <span className={`text-[11px] font-mono-code font-bold px-2 py-0.5 rounded-lg border flex items-center gap-1 shrink-0 ${
                        isDark
                          ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25'
                          : 'bg-sky-50 text-sky-700 border-sky-200'
                      }`}>
                        <TrendingUp size={11} className={isDark ? "text-cyan-400" : "text-sky-600"} />
                        <span>{project.results[0].value}</span>
                      </span>
                    )}
                  </div>

                  {/* Industry Title */}
                  <p className={`text-[11px] font-mono-code mb-1 ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {project.industry}
                  </p>

                  {/* Project Headline Summary */}
                  <p className={`text-xs leading-relaxed line-clamp-2 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {project.title}
                  </p>
                </div>

                {/* Clean Services Tags & Case Study CTA */}
                <div className={`pt-2.5 border-t flex items-center justify-between text-xs font-mono-code ${
                  isDark ? 'border-white/[0.08]' : 'border-slate-100'
                }`}>
                  {/* Clean Service Chips */}
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {project.services?.slice(0, 2).map((serviceName, sIdx) => (
                      <span
                        key={sIdx}
                        className={`text-[10px] font-mono-code px-2 py-0.5 rounded-md border font-medium ${
                          isDark
                            ? 'bg-white/[0.04] text-slate-300 border-white/[0.08]'
                            : 'bg-slate-100 text-slate-600 border-slate-200/80'
                        }`}
                      >
                        {serviceName}
                      </span>
                    ))}
                  </div>

                  {/* Case Study CTA */}
                  <span className={`inline-flex items-center gap-1 font-bold uppercase tracking-wider group-hover:underline shrink-0 ${
                    isDark ? 'text-cyan-400 group-hover:text-cyan-300' : 'text-sky-600 group-hover:text-sky-700'
                  }`}>
                    <span>Case Study</span>
                    <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===================================================================
          3. SECTION FOOTER TICKER / REASSURANCE
          =================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full shrink-0">
        <div className={`flex items-center justify-between text-xs font-mono-code border-t pt-3 ${
          isDark ? 'border-white/[0.06] text-slate-400' : 'border-slate-200 text-slate-600'
        }`}>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Scroll vertically to glide through featured work. Next section follows automatically.</span>
          </span>

          <span className={`hidden sm:inline-block ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            Sarirait · Commercial Delivery Showcase
          </span>
        </div>
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
