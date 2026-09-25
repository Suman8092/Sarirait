import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import Hero3D from './Hero3D';
import { sound } from '../utils/sound';

export default function Hero({ onOpenProjectModal }) {
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
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex flex-col justify-between overflow-hidden bg-mesh-grid">
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-violet-600/12 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: HERO COPY & CTAS */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 xl:col-span-7 2xl:col-span-7 flex flex-col items-start z-10"
          >
            {/* STATUS / TRUST PILL */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill border border-cyan-500/30 text-xs sm:text-sm font-mono-code text-cyan-300 mb-6 shadow-lg shadow-cyan-500/5"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span className="font-semibold tracking-wider text-[11px] sm:text-xs uppercase">
                DIGITAL TECHNOLOGY • BUSINESS • CREATIVITY
              </span>
            </motion.div>

            {/* MAIN HEADLINE */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.35rem] xl:text-[2.85rem] 2xl:text-[3.4rem] font-display font-extrabold tracking-tight text-white leading-[1.14] mb-6"
            >
              <span className="inline sm:whitespace-nowrap">
                We Build <span className="text-gradient-cyan">Digital Experiences</span>
              </span>{' '}
              <br className="hidden sm:inline" />
              <span className="inline sm:whitespace-nowrap">
                That Move Businesses Forward.
              </span>
            </motion.h1>

            {/* SUPPORTING TEXT */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-slate-300/90 font-normal leading-relaxed max-w-2xl mb-8"
            >
              From websites and software to digital marketing, business solutions, creative services and AI-powered experiences, Sarirait helps ambitious businesses build, grow and scale.
            </motion.p>

            {/* CTAS */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto"
            >
              {/* Primary CTA */}
              <button
                onClick={() => {
                  sound.click();
                  onOpenProjectModal();
                }}
                onMouseEnter={() => sound.hover()}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-sm sm:text-base tracking-wide bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

              {/* Secondary CTA */}
              <Link
                to="/services"
                onClick={() => sound.click()}
                onMouseEnter={() => sound.hover()}
                className="w-full sm:w-auto px-7 py-4 rounded-full font-semibold text-sm sm:text-base text-slate-200 glass-card hover:text-white hover:border-cyan-400/40 hover:bg-white/[0.06] transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Services</span>
                <ArrowRight size={16} className="text-cyan-400" />
              </Link>
            </motion.div>

            {/* TRUST MICRO-BADGES */}
            <motion.div
              variants={itemVariants}
              className="mt-12 pt-8 border-t border-white/[0.08] w-full grid grid-cols-3 gap-4"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  20<span className="text-cyan-400">+</span>
                </div>
                <div className="text-xs text-slate-400 font-mono-code uppercase mt-0.5">
                  Enterprise Deployments
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  98<span className="text-violet-400">%</span>
                </div>
                <div className="text-xs text-slate-400 font-mono-code uppercase mt-0.5">
                  Client Retention
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  100<span className="text-cyan-400">%</span>
                </div>
                <div className="text-xs text-slate-400 font-mono-code uppercase mt-0.5">
                  Bespoke Code
                </div>
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
            <Hero3D />
          </motion.div>

        </div>
      </div>

      {/* SECTION 7: SCROLL INDICATOR */}
      <div className="w-full flex justify-center pt-8">
        <a
          href="#trust"
          onClick={() => sound.click()}
          onMouseEnter={() => sound.hover()}
          className="group flex flex-col items-center gap-2 text-xs font-mono-code text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <span className="tracking-widest uppercase text-[11px]">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border border-white/20 group-hover:border-cyan-400/60 p-1 flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1.5 h-2 rounded-full bg-cyan-400"
            />
          </div>
        </a>
      </div>
    </section>
  );
}
