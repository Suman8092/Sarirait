import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import Hero3D from './Hero3D';
import { sound } from '../utils/sound';
import InteractiveParticles from './effects/InteractiveParticles';
import TextScramble from './effects/TextScramble';
import MagneticButton from './effects/MagneticButton';
import CyberHUD from './effects/CyberHUD';
import BorderBeam from './effects/BorderBeam';

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
    <section id="hero" className="relative min-h-[90vh] sm:min-h-screen pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-20 flex flex-col justify-between overflow-hidden bg-mesh-grid w-full max-w-full">
      {/* Active Theory & Resn: Real-time Interactive Canvas Particle Field */}
      <InteractiveParticles className="opacity-80" />

      {/* Background ambient lighting glows - GPU accelerated */}
      <div className="ambient-glow absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[350px] sm:h-[500px] bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none -z-10" />
      <div className="ambient-glow absolute top-1/3 right-0 sm:right-10 w-full max-w-[450px] h-[350px] sm:h-[450px] bg-violet-600/12 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: HERO COPY & CTAS */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 xl:col-span-7 2xl:col-span-7 flex flex-col items-start z-10 w-full"
          >
            {/* STATUS / TRUST PILL WITH ACTIVE THEORY TEXT SCRAMBLE */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-pill border border-cyan-500/30 text-[10px] sm:text-xs font-mono-code text-cyan-300 mb-6 shadow-lg shadow-cyan-500/5 max-w-full"
            >
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <TextScramble
                text="BRANDING • DESIGN • DEVELOPMENT • DIGITAL MARKETING"
                triggerOnHover={true}
                className="font-semibold tracking-wider uppercase truncate"
              />
            </motion.div>

            {/* MAIN HEADLINE */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-[2.35rem] lg:text-[2.5rem] xl:text-[2.7rem] 2xl:text-[3rem] font-display font-extrabold tracking-tight text-white leading-[1.14] mb-6"
            >
              <span className="inline sm:whitespace-nowrap">
                Make Your Brand <span className="text-gradient-cyan">Stand Out Online</span>
              </span>{' '}
              <br className="hidden sm:inline" />
              <span className="inline sm:whitespace-nowrap">
                From First Impression to First Sale.
              </span>
            </motion.h1>

            {/* SUPPORTING TEXT */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-slate-300/90 font-normal leading-relaxed max-w-2xl mb-8"
            >
              Sarirait brings branding, design, websites, apps and digital marketing together, giving your business a clear and consistent presence across every digital touchpoint.
            </motion.p>

            {/* CTAS WITH LOCOMOTIVE / 14ISLANDS MAGNETIC INERTIA */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto"
            >
              {/* Primary Magnetic CTA */}
              <MagneticButton
                strength={0.28}
                textStrength={0.14}
                onClick={() => {
                  sound.click();
                  onOpenProjectModal();
                }}
                onMouseEnter={() => sound.hover()}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-sm sm:text-base tracking-wide bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </MagneticButton>

              {/* Secondary Magnetic CTA */}
              <MagneticButton
                strength={0.22}
                textStrength={0.1}
                as={Link}
                to="/services"
                onClick={() => sound.click()}
                onMouseEnter={() => sound.hover()}
                className="w-full sm:w-auto px-7 py-4 rounded-full font-semibold text-sm sm:text-base text-slate-200 glass-card hover:text-white hover:border-cyan-400/40 hover:bg-white/[0.06] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Services</span>
                <ArrowRight size={16} className="text-cyan-400" />
              </MagneticButton>
            </motion.div>

            {/* TRUST MICRO-BADGES */}
            <motion.div
              variants={itemVariants}
              className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/[0.08] w-full grid grid-cols-3 gap-2 sm:gap-4"
            >
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                  Brand
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-mono-code uppercase mt-0.5 leading-tight">
                  &amp; Design
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                  Web
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-mono-code uppercase mt-0.5 leading-tight">
                  &amp; Apps
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                  Growth
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-mono-code uppercase mt-0.5 leading-tight">
                  &amp; Marketing
                </div>
              </div>
            </motion.div>

            {/* CYBERNETIC LIVE TELEMETRY HUD (Inspired by Why Zero & Fantik) */}
            <motion.div variants={itemVariants} className="mt-8 sm:mt-10 w-full">
              <CyberHUD />
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: 3D INTERACTIVE DIGITAL CORE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-5 2xl:col-span-5 relative w-full flex items-center justify-center rounded-3xl"
          >
            {/* Unseen & Fantik: Border Beam Halo around 3D core */}
            <BorderBeam size={260} duration={9} colorFrom="#00f0ff" colorTo="#8a2be2" className="hidden lg:block rounded-3xl" />

            {/* Ambient Floating Metric Badge - Top Left */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="hidden md:flex absolute -top-2 -left-2 sm:-left-4 z-20 items-center gap-3 px-3.5 py-2 rounded-2xl glass-card border border-cyan-500/30 shadow-xl shadow-cyan-500/10 animate-float pointer-events-none"
            >
              <div className="w-7 h-7 rounded-xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shrink-0">
                <Sparkles size={14} />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white font-display leading-tight">99.4% Client Score</div>
                <div className="text-[10px] text-cyan-300 font-mono-code leading-tight">Delivered Excellence</div>
              </div>
            </motion.div>

            {/* Ambient Floating Metric Badge - Bottom Right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="hidden md:flex absolute -bottom-2 -right-2 sm:-right-4 z-20 items-center gap-3 px-3.5 py-2 rounded-2xl glass-card border border-violet-500/30 shadow-xl shadow-violet-500/10 animate-float-reverse pointer-events-none"
            >
              <div className="w-7 h-7 rounded-xl bg-violet-500/15 border border-violet-400/40 flex items-center justify-center text-violet-400 shrink-0">
                <CheckCircle2 size={14} />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white font-display leading-tight">Production Grade</div>
                <div className="text-[10px] text-violet-300 font-mono-code leading-tight">Design • Web • Marketing</div>
              </div>
            </motion.div>

            <Hero3D />
          </motion.div>

        </div>
      </div>

      {/* SECTION 7: SCROLL INDICATOR */}
      <div className="w-full justify-center pt-8 hidden sm:flex">
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
