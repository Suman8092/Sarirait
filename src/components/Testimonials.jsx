import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, TrendingUp, Play, Pause } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import MaskedHeading from './MaskedHeading';
import { sound } from '../utils/sound';
import { useTheme } from '../context/ThemeContext';

const clientReviews = [
  {
    quote: "Sarirait elevated our digital atelier to international luxury standards. Our mobile checkout conversion increased by +148% within the first 90 days post-launch. The craftsmanship and attention to detail are exceptional.",
    author: "Rohan & Devina S.",
    role: "Founders & Creative Directors",
    company: "DiaraShine High Jewelry",
    category: "Luxury E-Commerce",
    logo: "/projects/diarashine.jpg",
    metric: "+148% Checkout Velocity",
    metricContext: "First 90 Days Post-Launch",
    deliverables: ["Custom Next.js Storefront", "Luxury UI/UX", "Payment Gateway Optimization"],
    rating: 5
  },
  {
    quote: "The high-concurrency cloud architecture and fluid mobile UI Sarirait delivered handled our multi-city launch flawlessly with sub-second response times. They don't just write code; they understand business scale.",
    author: "Aakash Verma",
    role: "Head of Product",
    company: "Rydap Mobility",
    category: "On-Demand Mobility",
    logo: "/projects/rydap.jpg",
    metric: "100k+ Active Riders",
    metricContext: "Across 4 Metros With Zero Downtime",
    deliverables: ["Real-Time Dispatch Engine", "Driver & Rider iOS/Android Apps", "Cloud Scale SLA"],
    rating: 5
  },
  {
    quote: "Our global couture clientele constantly praises the elegance and responsiveness of our digital runway. Sarirait understands authentic luxury brand aesthetics without sacrificing speed or performance.",
    author: "Archanna Gupta",
    role: "Founder & Creative Director",
    company: "Archanna Gupta Couture",
    category: "Haute Couture",
    logo: "/projects/archanna-gupta.jpg",
    metric: "3.2x Average Order Value",
    metricContext: "Global High-Net-Worth Orders",
    deliverables: ["Atelier Design System", "High-Fidelity Lookbooks", "Private Client Inquiries"],
    rating: 5
  },
  {
    quote: "From hardware-to-cloud UI to enterprise Bluetooth telemetry, Sarirait engineered a world-class interface that directly impressed our tier-1 enterprise customers and venture investors.",
    author: "Sameer N.",
    role: "Chief Technology Officer",
    company: "Chabhi Smart Access",
    category: "IoT Hardware & Cloud",
    logo: "/projects/chabhi.jpg",
    metric: "< 400ms Key Pair Sync",
    metricContext: "Cryptographic Telemetry Speed",
    deliverables: ["IoT Control Dashboard", "SDK & Bluetooth Protocol UI", "Enterprise Access Suite"],
    rating: 5
  }
];

export default function Testimonials() {
  const { isDark } = useTheme();
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef, { amount: 0.15 });
  const [activeReview, setActiveReview] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const canPlay = isPlaying && isVisible && pageVisible && !isHovered && !hasFocus;

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    if (!canPlay) return undefined;
    const timer = window.setTimeout(() => {
      setActiveReview((prev) => (prev + 1) % clientReviews.length);
    }, 6500);
    return () => window.clearTimeout(timer);
  }, [canPlay, activeReview]);

  const selectReview = (index) => {
    sound.click();
    setActiveReview(index);
  };

  const handlePrev = () => {
    sound.click();
    setActiveReview((prev) => (prev - 1 + clientReviews.length) % clientReviews.length);
  };

  const handleNext = () => {
    sound.click();
    setActiveReview((prev) => (prev + 1) % clientReviews.length);
  };

  const current = clientReviews[activeReview];

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      aria-label="Client stories"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setHasFocus(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false);
      }}
      className={`motion-section relative py-20 sm:py-28 transition-colors duration-300 overflow-hidden w-full max-w-full ${
        isDark 
          ? 'text-slate-100' 
          : 'bg-white text-slate-900'
      }`}
    >
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true"
        data-scroll-depth="-22"
        className={`ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] rounded-full blur-[110px] pointer-events-none -z-10 ${
          isDark ? 'bg-cyan-500/5' : 'bg-sky-400/10'
        }`} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* SECTION HEADER */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6"
        >
          <div className="max-w-3xl">
            <div data-motion-reveal className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono-code mb-4 border border-cyan-500/30">
              <span className="motion-status-dot w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className={isDark ? 'text-cyan-400 font-semibold' : 'text-sky-700 font-semibold'}>
                CLIENT ENDORSEMENTS // MEASURABLE OUTCOMES
              </span>
            </div>
            <MaskedHeading
              as="h2"
              className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-[1.12]"
              lines={[
                <span key="lead">Trusted by ambitious founders.</span>,
                <span key="accent" className="text-gradient-cyan">Validated by real metrics.</span>
              ]}
            />
          </div>

          <div data-motion-reveal style={{ '--motion-delay': '120ms' }} className="flex items-center gap-3">
            {/* Play/Pause Autoplay Controls */}
            <button
              type="button"
              aria-pressed={isPlaying}
              aria-label={isPlaying ? 'Pause testimonial autoplay' : 'Start testimonial autoplay'}
              onClick={() => {
                sound.click();
                setIsPlaying(!isPlaying);
              }}
              className={`motion-selector inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono-code border transition-colors cursor-pointer ${
                isDark 
                  ? 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white' 
                  : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              {isPlaying ? <Pause size={12} className="text-cyan-400" /> : <Play size={12} className="text-emerald-400" />}
              <span>{isPlaying ? 'Auto-play Active' : 'Paused'}</span>
            </button>
          </div>
        </div>

        {/* HERO TESTIMONIAL SHOWCASE CARD */}
          <div
            data-motion-reveal
            id="client-story-panel"
            aria-live={canPlay ? 'off' : 'polite'}
            className="mb-8 sm:mb-12"
          >
            <SpotlightCard
              spotlightColor="rgba(0, 240, 255, 0.16)"
              borderColor="rgba(0, 240, 255, 0.45)"
              className={`p-7 sm:p-12 rounded-3xl glass-card border transition-all duration-300 shadow-2xl relative overflow-hidden ${
                isDark 
                  ? 'bg-[#0c1220]/95 border-white/[0.08]' 
                  : 'bg-white border-slate-200 shadow-xl'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left: Client Quote & Attribution */}
                <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.company}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-8 space-y-6"
                >
                  {/* Star Rating & Category */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5 text-amber-400">
                      {[...Array(current.rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs font-mono-code font-bold ml-2 text-slate-400">
                        5.0 VERIFIED REVIEW
                      </span>
                    </div>

                    <span className={`text-xs font-mono-code px-3 py-1 rounded-full border ${
                      isDark ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300' : 'bg-sky-50 border-sky-200 text-sky-700'
                    }`}>
                      {current.category}
                    </span>
                  </div>

                  {/* Quote */}
                  <div className="relative">
                    <Quote className="absolute -top-2.5 -left-2 w-6 h-6 text-cyan-500/15 pointer-events-none" />
                    <p className={`text-sm sm:text-base lg:text-lg font-display font-medium leading-relaxed italic ${
                      isDark ? 'text-slate-100' : 'text-slate-900'
                    }`}>
                      “{current.quote}”
                    </p>
                  </div>

                  {/* Author Attribution */}
                  <div className="flex items-center gap-4 pt-4 border-t border-current/10">
                    <div className={`w-12 h-12 rounded-2xl p-1 overflow-hidden shrink-0 flex items-center justify-center border ${
                      isDark ? 'bg-black/80 border-white/10' : 'bg-white border-slate-200 shadow-xs'
                    }`}>
                      <img 
                        src={current.logo} 
                        alt={current.company} 
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>
                    <div>
                      <div className={`font-display font-bold text-base sm:text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {current.author}
                      </div>
                      <div className={`text-xs font-mono-code ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {current.role} • <span className="text-cyan-400">{current.company}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                </AnimatePresence>

                {/* Right: Quantifiable Business Impact Card */}
                <div className={`lg:col-span-4 p-6 sm:p-8 rounded-2xl border flex flex-col justify-between space-y-6 ${
                  isDark ? 'bg-white/[0.02] border-white/[0.08]' : 'bg-slate-50 border-slate-200'
                }`}>
                  <motion.div
                    key={current.company}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-cyan-400 font-bold mb-3">
                      <TrendingUp size={15} />
                      <span>Commercial Impact</span>
                    </div>

                    <div className="text-3xl sm:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                      {current.metric}
                    </div>

                    <div className={`text-xs mt-1 font-mono-code ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {current.metricContext}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-current/10">
                    <div className="text-[11px] font-mono-code uppercase tracking-wider text-slate-500 mb-2.5 font-bold">
                      Delivered Capabilities:
                    </div>
                    <div className="space-y-1.5">
                      {current.deliverables.map((d, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                          <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  </motion.div>

                  {/* Prev / Next controls */}
                  <div className="flex items-center justify-between pt-4 border-t border-current/10">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className={`motion-selector p-2 rounded-full border transition-colors cursor-pointer ${
                        isDark ? 'bg-white/[0.04] border-white/10 hover:border-cyan-400/50 text-white' : 'bg-white border-slate-300 text-slate-700 shadow-sm'
                      }`}
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    <span className="text-xs font-mono-code text-slate-400">
                      {activeReview + 1} / {clientReviews.length}
                    </span>

                    <button
                      type="button"
                      onClick={handleNext}
                      className={`motion-selector p-2 rounded-full border transition-colors cursor-pointer ${
                        isDark ? 'bg-white/[0.04] border-white/10 hover:border-cyan-400/50 text-white' : 'bg-white border-slate-300 text-slate-700 shadow-sm'
                      }`}
                      aria-label="Next testimonial"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

              </div>
            </SpotlightCard>
          </div>

        {/* 4 CLIENT STORY THUMBNAIL SELECTORS */}
        <div data-motion-reveal className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4" aria-label="Choose a client story">
          {clientReviews.map((item, idx) => {
            const isSelected = activeReview === idx;

            return (
              <button
                key={item.company}
                type="button"
                aria-pressed={isSelected}
                aria-controls="client-story-panel"
                onClick={() => selectReview(idx)}
                onMouseEnter={() => sound.hover()}
                className={`motion-selector relative overflow-hidden p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex items-center gap-3.5 ${
                  isSelected
                    ? isDark
                      ? 'bg-cyan-500/15 border-cyan-400 shadow-lg shadow-cyan-500/10'
                      : 'bg-sky-50 border-sky-400 shadow-md'
                    : isDark
                      ? 'bg-white/[0.02] border-white/[0.06] hover:border-white/20'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                {isSelected && (
                  <motion.span
                    key={`progress-${activeReview}-${canPlay}`}
                    aria-hidden="true"
                    initial={{ scaleX: canPlay ? 0 : 1 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: canPlay ? 6.5 : 0, ease: 'linear' }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-cyan-400 to-blue-500"
                  />
                )}
                <div className={`w-10 h-10 rounded-xl p-0.5 overflow-hidden shrink-0 flex items-center justify-center border ${
                  isDark ? 'bg-black/80 border-white/10' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <img src={item.logo} alt={item.company} className="w-full h-full object-contain rounded-lg" />
                </div>
                <div className="min-w-0">
                  <div className={`text-xs sm:text-sm font-display font-bold truncate ${
                    isSelected ? isDark ? 'text-cyan-300' : 'text-sky-900' : isDark ? 'text-white' : 'text-slate-800'
                  }`}>
                    {item.company}
                  </div>
                  <div className="text-[10px] font-mono-code text-cyan-400 font-semibold truncate mt-0.5">
                    {item.metric}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
