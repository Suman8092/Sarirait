import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Play, Pause } from 'lucide-react';
import { processSteps } from '../data/process';
import { sound } from '../utils/sound';
import { useTheme } from '../context/ThemeContext';
import SpotlightCard from './SpotlightCard';
import MaskedHeading from './MaskedHeading';

export default function Process() {
  const { isDark } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.25 });
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(() => !document.hidden);
  const timerRef = useRef(null);
  const shouldAutoAdvance = isPlaying && isInView && isDocumentVisible && !isInteracting && !isFocused;

  useEffect(() => {
    const handleVisibility = () => setIsDocumentVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Allow a full reading interval after returning to the section.
  useEffect(() => {
    if (!shouldAutoAdvance) return undefined;
    timerRef.current = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 6000);
    return () => clearTimeout(timerRef.current);
  }, [shouldAutoAdvance, activeStep]);

  const goToStep = (index) => {
    sound.click();
    setIsPlaying(false);
    setActiveStep(index);
  };

  const handlePrev = () => {
    sound.click();
    setIsPlaying(false);
    setActiveStep((prev) => (prev - 1 + processSteps.length) % processSteps.length);
  };

  const handleNext = () => {
    sound.click();
    setIsPlaying(false);
    setActiveStep((prev) => (prev + 1) % processSteps.length);
  };

  const handleStepKeyDown = (event, index) => {
    let nextIndex;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % processSteps.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + processSteps.length) % processSteps.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = processSteps.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    goToStep(nextIndex);
    event.currentTarget.parentElement.querySelectorAll('[role="tab"]')[nextIndex]?.focus();
  };

  const currentStep = processSteps[activeStep];

  return (
    <section
      ref={sectionRef}
      id="process"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false);
      }}
      className={`relative py-20 sm:py-28 transition-colors duration-300 overflow-hidden w-full max-w-full ${
        isDark
          ? 'text-slate-100'
          : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Background ambient lighting */}
      <div
        className={`ambient-glow absolute top-1/2 left-1/3 -translate-y-1/2 w-full max-w-[700px] h-[400px] rounded-full blur-[110px] pointer-events-none -z-10 ${
          isDark ? 'bg-cyan-500/5' : 'bg-sky-400/10'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono-code mb-4 border border-cyan-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className={isDark ? 'text-cyan-400 font-semibold' : 'text-sky-700 font-semibold'}>
                DELIVERY ROADMAP // 6 AGILE SPRINTS
              </span>
            </div>
            <MaskedHeading
              as="h2"
              className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-[1.12]"
              lines={[
                <span key="lead">From first conversation</span>,
                <span key="accent" className="text-gradient-cyan">to a confident launch.</span>
              ]}
            />
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <p className={`text-xs sm:text-sm max-w-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              A transparent, sprint-based process keeping priorities visible, weekly progress demonstrable, and code production-grade.
            </p>
            {/* Play/Pause Autoplay Controls */}
            <button
              onClick={() => {
                sound.click();
                setIsPlaying(!isPlaying);
              }}
              aria-pressed={isPlaying}
              aria-label={isPlaying ? 'Pause automatic process steps' : 'Play automatic process steps'}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white'
                  : 'bg-white border-slate-200 text-slate-700 shadow-sm'
              }`}
            >
              {isPlaying ? <Pause size={12} className="text-cyan-400" /> : <Play size={12} className="text-emerald-400" />}
              <span>{isPlaying ? 'Auto-play · pauses while you explore' : 'Auto-play Paused'}</span>
            </button>
          </div>
        </motion.div>

        {/* STEPPER PROGRESS NAVIGATION BAR */}
        <div data-motion-reveal className="relative mb-8 sm:mb-12">
          {/* Connecting Line */}
          <div className={`hidden md:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 ${
            isDark ? 'bg-white/10' : 'bg-slate-200'
          }`} />

          {/* Active Fill Line */}
          <div
            className="hidden md:block absolute top-1/2 left-0 h-0.5 -translate-y-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
            style={{ width: `${(activeStep / (processSteps.length - 1)) * 100}%` }}
          />

          {/* 6 Step Nodes */}
          <div role="tablist" aria-label="Delivery process steps" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3 relative z-10">
            {processSteps.map((step, idx) => {
              const isSelected = activeStep === idx;
              const isPast = activeStep > idx;

              return (
                <button
                  key={step.step}
                  id={`process-step-${step.step}`}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls="process-step-panel"
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => goToStep(idx)}
                  onKeyDown={(event) => handleStepKeyDown(event, idx)}
                  onMouseEnter={() => sound.hover()}
                  className={`relative overflow-hidden p-3 sm:p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 ${
                    isSelected
                      ? isDark
                        ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 scale-[1.03]'
                        : 'bg-sky-100 border-sky-500 text-sky-950 shadow-md scale-[1.03]'
                      : isPast
                        ? isDark
                          ? 'bg-white/[0.04] border-cyan-500/30 text-cyan-300'
                          : 'bg-slate-100 border-sky-300 text-sky-800'
                        : isDark
                          ? 'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:border-white/20 hover:text-white'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono-code font-bold">
                      Step {step.step}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-display font-bold truncate">
                    {step.title}
                  </div>
                  <div className="text-[10px] font-mono-code opacity-70 mt-1 truncate">
                    {step.duration}
                  </div>
                  {isSelected && (
                    <motion.span
                      key={`${activeStep}-${shouldAutoAdvance}`}
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-cyan-400"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: shouldAutoAdvance ? 1 : 0 }}
                      transition={{ duration: shouldAutoAdvance ? 6 : 0, ease: 'linear' }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE STEP SPOTLIGHT STAGE */}
        <div data-motion-reveal>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep.step}
            id="process-step-panel"
            role="tabpanel"
            aria-labelledby={`process-step-${currentStep.step}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <SpotlightCard
              spotlightColor="rgba(0, 240, 255, 0.16)"
              borderColor="rgba(0, 240, 255, 0.45)"
              className={`p-6 sm:p-10 rounded-3xl glass-card border transition-all duration-300 shadow-2xl ${
                isDark
                  ? 'bg-[#0c1220]/95 border-white/[0.08]'
                  : 'bg-white border-slate-200 shadow-xl'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                {/* Left: Step Details */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-4xl sm:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                      {currentStep.step}
                    </span>
                    <div className={`h-8 w-px ${isDark ? 'bg-white/10' : 'bg-slate-300'}`} />
                    <div className="space-y-0.5">
                      <div className="text-xs font-mono-code uppercase tracking-wider text-cyan-400 font-bold">
                        Phase {currentStep.step} // {currentStep.phase}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono-code text-slate-400">
                        <Clock size={12} className="text-cyan-400" />
                        <span>Duration: {currentStep.duration}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {currentStep.title}
                  </h3>

                  <p className={`text-sm sm:text-base leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {currentStep.summary}
                  </p>

                  <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-mono-code leading-relaxed ${
                    isDark ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-300' : 'bg-sky-50 border-sky-200 text-sky-800'
                  }`}>
                    “{currentStep.tagline}”
                  </div>
                </div>

                {/* Right: Key Deliverables Checklist */}
                <div className={`lg:col-span-5 p-6 rounded-2xl border ${
                  isDark ? 'bg-white/[0.02] border-white/[0.08]' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="text-xs font-mono-code uppercase tracking-wider text-slate-400 mb-4 font-bold flex items-center justify-between">
                    <span>What We Align On</span>
                    <span className="text-cyan-400">{currentStep.deliverables.length} Key Outputs</span>
                  </div>

                  <div className="space-y-3">
                    {currentStep.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        data-motion-reveal
                        style={{ '--motion-delay': `${Math.min(idx, 3) * 55}ms` }}
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                          isDark
                            ? 'bg-white/[0.02] border-white/[0.04] text-slate-200 hover:border-cyan-500/30'
                            : 'bg-white border-slate-200 text-slate-800 hover:border-sky-300 shadow-xs'
                        }`}
                      >
                        <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Nav Buttons */}
                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-current/5">
                    <button
                      onClick={handlePrev}
                      className={`p-2.5 rounded-full border transition-colors cursor-pointer ${
                        isDark ? 'bg-white/[0.04] border-white/10 hover:border-cyan-400/50 text-white' : 'bg-white border-slate-300 text-slate-700 shadow-sm'
                      }`}
                      aria-label="Previous step"
                    >
                      <ArrowLeft size={16} />
                    </button>

                    <div className="text-xs font-mono-code text-slate-400 font-bold">
                      {activeStep + 1} / {processSteps.length}
                    </div>

                    <button
                      onClick={handleNext}
                      className={`p-2.5 rounded-full border transition-colors cursor-pointer ${
                        isDark ? 'bg-white/[0.04] border-white/10 hover:border-cyan-400/50 text-white' : 'bg-white border-slate-300 text-slate-700 shadow-sm'
                      }`}
                      aria-label="Next step"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

              </div>
            </SpotlightCard>
          </motion.div>
        </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
