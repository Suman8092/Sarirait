import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import Hero3D from './Hero3D';
import CountUpValue from './CountUpValue';
import MaskedHeading from './MaskedHeading';
import SplitWordReveal from './SplitWordReveal';
import MagneticButton from './MagneticButton';
import { sound } from '../utils/sound';
import { useTheme } from '../context/ThemeContext';
import usePageVisibility from '../hooks/usePageVisibility';

export default function Hero({ onOpenProjectModal }) {
  const { isDark } = useTheme();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);
  const pageVisible = usePageVisibility();

  // Quiet depth as the hero leaves the viewport.
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -60]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.45]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.97]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-[90vh] sm:min-h-screen pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-20 flex flex-col justify-between overflow-hidden bg-mesh-grid w-full max-w-full">
      {/* Background ambient lighting glows - GPU accelerated & animated */}
      <div className={`ambient-glow animate-aurora absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[680px] h-[380px] sm:h-[520px] rounded-full blur-[100px] pointer-events-none -z-10 ${
        isDark ? 'bg-cyan-500/15' : 'bg-sky-400/20'
      }`} />
      <div className={`ambient-glow animate-pulse-glow absolute top-1/3 right-0 sm:right-10 w-full max-w-[500px] h-[380px] sm:h-[480px] rounded-full blur-[110px] pointer-events-none -z-10 ${
        isDark ? 'bg-violet-600/16' : 'bg-purple-300/20'
      }`} />
      <div className={`ambient-glow animate-float-slow absolute bottom-12 left-6 w-[350px] h-[300px] rounded-full blur-[90px] pointer-events-none -z-10 ${
        isDark ? 'bg-indigo-600/12' : 'bg-blue-300/15'
      }`} />

      <motion.div 
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: HERO COPY & CTAS */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 xl:col-span-7 2xl:col-span-7 flex flex-col items-start z-10 w-full"
          >
            {/* STATUS / TRUST PILL */}
            <motion.div
              variants={itemVariants}
              className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[11px] sm:text-xs font-mono-code mb-6 shadow-lg max-w-full border ${
                isDark 
                  ? 'glass-pill border-cyan-500/30 text-cyan-300 shadow-cyan-500/10' 
                  : 'bg-white border-sky-300 text-sky-800 shadow-sky-500/10'
              }`}
            >
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span className={`font-semibold tracking-wider uppercase ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                Digital Agency &amp; Studio
              </span>
              <span className="text-cyan-400/40">•</span>
              <span className={`font-medium tracking-wide uppercase truncate ${isDark ? 'text-cyan-300' : 'text-sky-700'}`}>
                Brand • Web • Growth
              </span>
            </motion.div>

            {/* MAIN HEADLINE WITH LINE-BY-LINE MASKED REVEAL & SPLIT WORDS */}
            <div className="mb-6 w-full">
              <MaskedHeading
                as="h1"
                className={`text-3xl sm:text-5xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-display font-extrabold tracking-tight leading-[1.08] ${
                  isDark ? 'text-white' : 'text-slate-950'
                }`}
                lines={[
                  <span key="brand">Make Your Brand</span>,
                  <span key="online" className="text-gradient-cyan">Stand Out Online.</span>
                ]}
                stagger={0.14}
              />

              <div className={`mt-3 text-xl sm:text-2xl md:text-3xl lg:text-[2.1rem] xl:text-[2.4rem] font-medium tracking-tight ${
                isDark ? 'text-slate-300/90' : 'text-slate-700'
              }`}>
                <SplitWordReveal 
                  text="From First Impression to Commercial Scale." 
                  delay={0.28}
                  stagger={0.045}
                />
              </div>
            </div>

            {/* SUPPORTING TEXT */}
            <motion.p
              variants={itemVariants}
              className={`text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mb-8 ${
                isDark ? 'text-slate-300/85' : 'text-slate-600'
              }`}
            >
              Sarirait combines brand strategy, high-conversion web development, and performance marketing—giving your business an authentic and commanding presence across every digital touchpoint.
            </motion.p>

            {/* CTAS WITH MAGNETIC INTERACTION */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto"
            >
              {/* Primary CTA */}
              <MagneticButton maxOffset={8}>
                <button
                  onClick={() => {
                    sound.click();
                    onOpenProjectModal();
                  }}
                  onMouseEnter={() => sound.hover()}
                  className="btn-shimmer w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-sm sm:text-base tracking-wide bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </MagneticButton>

              {/* Secondary CTA */}
              <MagneticButton maxOffset={8}>
                <Link
                  to="/services"
                  onClick={() => sound.click()}
                  onMouseEnter={() => sound.hover()}
                  className={`w-full sm:w-auto px-7 py-4 rounded-full font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 group cursor-pointer border ${
                    isDark
                      ? 'text-slate-200 glass-card hover:text-white hover:border-cyan-400/50 hover:bg-white/[0.08] border-white/10'
                      : 'bg-white text-slate-800 border-slate-300 hover:border-sky-500 hover:text-sky-900 shadow-sm hover:shadow-md'
                  }`}
                >
                  <span>Explore Services</span>
                  <ArrowRight size={16} className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>
            </motion.div>

            {/* TRUST MICRO-PILLARS WITH INTERACTIVE ACCENT */}
            <motion.div
              variants={itemVariants}
              className={`mt-8 sm:mt-12 pt-6 sm:pt-8 border-t w-full grid grid-cols-3 gap-3 sm:gap-5 ${
                isDark ? 'border-white/[0.08]' : 'border-slate-200'
              }`}
            >
              <div className="group cursor-default">
                <div className={`text-lg sm:text-xl md:text-2xl font-display font-bold tracking-tight transition-colors ${
                  isDark ? 'text-white group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-sky-700'
                }`}>
                  Brand &amp; Identity
                </div>
                <div className={`text-[10px] sm:text-xs font-mono-code uppercase mt-1 leading-tight ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Design Systems • Strategy
                </div>
                <div className="h-0.5 w-8 bg-cyan-500/30 group-hover:w-16 group-hover:bg-cyan-400 transition-all duration-300 mt-2 rounded-full" />
              </div>
              <div className="group cursor-default">
                <div className={`text-lg sm:text-xl md:text-2xl font-display font-bold tracking-tight transition-colors ${
                  isDark ? 'text-white group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-sky-700'
                }`}>
                  Web &amp; Apps
                </div>
                <div className={`text-[10px] sm:text-xs font-mono-code uppercase mt-1 leading-tight ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  React • Headless • Speed
                </div>
                <div className="h-0.5 w-8 bg-blue-500/30 group-hover:w-16 group-hover:bg-blue-400 transition-all duration-300 mt-2 rounded-full" />
              </div>
              <div className="group cursor-default">
                <div className={`text-lg sm:text-xl md:text-2xl font-display font-bold tracking-tight transition-colors ${
                  isDark ? 'text-white group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-sky-700'
                }`}>
                  Growth &amp; Reach
                </div>
                <div className={`text-[10px] sm:text-xs font-mono-code uppercase mt-1 leading-tight ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  SEO • Campaigns • ROI
                </div>
                <div className="h-0.5 w-8 bg-violet-500/30 group-hover:w-16 group-hover:bg-violet-400 transition-all duration-300 mt-2 rounded-full" />
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: 3D INTERACTIVE DIGITAL CORE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-5 2xl:col-span-5 relative w-full flex items-center justify-center"
          >
            {/* Ambient Floating Metric Badge - Top Left */}
            <motion.div
              data-scroll-depth="22"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className={`hidden md:flex absolute -top-2 -left-2 sm:-left-4 z-20 items-center gap-3 px-3.5 py-2.5 rounded-2xl shadow-2xl animate-float pointer-events-none backdrop-blur-xl border ${
                isDark 
                  ? 'glass-card border-cyan-500/30 shadow-cyan-500/10' 
                  : 'bg-white/95 border-sky-300 shadow-sky-500/10'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm border ${
                isDark ? 'bg-cyan-500/15 border-cyan-400/40 text-cyan-400' : 'bg-sky-50 border-sky-300 text-sky-600'
              }`}>
                <Sparkles size={15} />
              </div>
              <div className="text-left">
                <div className={`text-xs font-bold font-display leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <CountUpValue value="99.4%" /> Client Score
                </div>
                <div className={`text-[10px] font-mono-code leading-tight ${isDark ? 'text-cyan-300' : 'text-sky-700'}`}>
                  Delivered Excellence
                </div>
              </div>
            </motion.div>

            {/* Ambient Floating Metric Badge - Bottom Right */}
            <motion.div
              data-scroll-depth="-18"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className={`hidden md:flex absolute -bottom-2 -right-2 sm:-right-4 z-20 items-center gap-3 px-3.5 py-2.5 rounded-2xl shadow-2xl animate-float-reverse pointer-events-none backdrop-blur-xl border ${
                isDark 
                  ? 'glass-card border-violet-500/30 shadow-violet-500/10' 
                  : 'bg-white/95 border-purple-300 shadow-purple-500/10'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm border ${
                isDark ? 'bg-violet-500/15 border-violet-400/40 text-violet-400' : 'bg-purple-50 border-purple-300 text-purple-600'
              }`}>
                <CheckCircle2 size={15} />
              </div>
              <div className="text-left">
                <div className={`text-xs font-bold font-display leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  18+ Client Launches
                </div>
                <div className={`text-[10px] font-mono-code leading-tight ${isDark ? 'text-violet-300' : 'text-purple-700'}`}>
                  Design • Web • Marketing
                </div>
              </div>
            </motion.div>

            {/* Ambient Floating Metric Badge - Middle Right */}
            <motion.div
              data-scroll-depth="15"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className={`hidden xl:flex absolute top-1/2 -translate-y-1/2 -right-6 z-20 items-center gap-2.5 px-3 py-2 rounded-xl shadow-xl animate-float pointer-events-none backdrop-blur-xl border ${
                isDark 
                  ? 'glass-card border-emerald-500/30 shadow-emerald-500/10' 
                  : 'bg-white/95 border-emerald-300 shadow-emerald-500/10'
              }`}
            >
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className={`text-[11px] font-mono-code font-bold uppercase tracking-wider ${
                isDark ? 'text-emerald-300' : 'text-emerald-700'
              }`}>
                60 FPS WebGL
              </span>
            </motion.div>

            <Hero3D />
          </motion.div>

        </div>
      </motion.div>

      {/* SECTION 7: SCROLL INDICATOR */}
      <div className="w-full justify-center pt-8 hidden sm:flex">
        <a
          href="#trust"
          onClick={() => sound.click()}
          onMouseEnter={() => sound.hover()}
          className={`group flex flex-col items-center gap-2 text-xs font-mono-code transition-colors ${
            isDark ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-500 hover:text-sky-600'
          }`}
        >
          <span className="tracking-widest uppercase text-[11px]">Scroll to explore</span>
          <div className={`w-6 h-10 rounded-full p-1 flex justify-center border ${
            isDark ? 'border-white/20 group-hover:border-cyan-400/60' : 'border-slate-300 group-hover:border-sky-500'
          }`}>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className={`w-1.5 h-2 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-sky-600'}`}
            />
          </div>
        </a>
      </div>
    </section>
  );
}

