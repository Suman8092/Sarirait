import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { processSteps } from '../data/process';
import { useTheme } from '../context/ThemeContext';
import { useLenis } from './SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const { isDark } = useTheme();
  const lenis = useLenis();
  const stageRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const stepRefs = useRef([]);
  const triggerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const stage = stageRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!stage || !viewport || !track) return undefined;

    const media = gsap.matchMedia();
    media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: stage,
          start: 'top top+=120',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const nextStep = Math.min(
              processSteps.length - 1,
              Math.floor(self.progress * processSteps.length),
            );
            setActiveStep((currentStep) => currentStep === nextStep ? currentStep : nextStep);
          },
        },
      });

      triggerRef.current = tween.scrollTrigger;
      return () => {
        triggerRef.current = null;
      };
    });

    ScrollTrigger.refresh();
    return () => {
      media.revert();
      triggerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const cards = stepRefs.current.filter(Boolean);
    if (!cards.length || window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)').matches) return undefined;

    const observer = new IntersectionObserver((entries) => {
      const mostVisible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (mostVisible) setActiveStep(Number(mostVisible.target.dataset.processStep));
    }, { threshold: [0.35, 0.6, 0.85], rootMargin: '-12% 0px -12% 0px' });

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const goToStep = (index) => {
    const boundedIndex = Math.max(0, Math.min(processSteps.length - 1, index));
    const trigger = triggerRef.current;

    if (trigger && window.matchMedia('(min-width: 1024px)').matches) {
      const progress = boundedIndex / (processSteps.length - 1);
      const targetY = trigger.start + (trigger.end - trigger.start) * progress;
      if (lenis) lenis.scrollTo(targetY, { duration: 0.85 });
      else window.scrollTo({ top: targetY, behavior: 'smooth' });
      return;
    }

    stepRefs.current[boundedIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const sectionClass = isDark
    ? 'bg-[#07090e] border-t border-white/[0.06] text-slate-100'
    : 'bg-[#f8fafc] border-t border-slate-200 text-slate-900';

  return (
    <section id="process" className={`relative py-20 sm:py-28 overflow-hidden w-full max-w-full transition-colors duration-300 ${sectionClass}`}>
      <div className={`ambient-glow absolute top-1/3 left-1/4 w-full max-w-[600px] h-[350px] sm:h-[600px] rounded-full blur-[100px] pointer-events-none -z-10 ${isDark ? 'bg-violet-600/10' : 'bg-violet-300/20'}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <header data-motion-reveal="left" className="max-w-3xl mb-10 sm:mb-14 lg:mb-12">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-dm-mono mb-4 border ${isDark ? 'text-cyan-300 border-cyan-400/30 bg-cyan-400/[0.06]' : 'text-sky-700 border-sky-600/20 bg-sky-600/[0.05]'}`}>
            <span className={`w-2 h-2 rounded-full animate-pulse ${isDark ? 'bg-cyan-400' : 'bg-sky-600'}`} />
            <span>HOW WE WORK // 6 CLEAR STEPS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bebas font-bold tracking-tight leading-[1.08]">
            From first conversation<br />
            <span className="text-gradient-cyan">to a confident launch.</span>
          </h2>
          <p className={`text-sm sm:text-base lg:text-lg mt-4 max-w-2xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            A collaborative process keeps priorities visible, feedback useful, and each decision connected to the goals we agree on together.
          </p>
        </header>

        <div ref={stageRef} className="relative">
          <div ref={viewportRef} className="relative overflow-hidden">
            <div className={`process-vignette-left hidden lg:block absolute z-10 inset-y-0 left-0 w-20 pointer-events-none bg-gradient-to-r ${isDark ? 'from-[#07090e]' : 'from-[#f8fafc]'} to-transparent`} />
            <div className={`process-vignette-right hidden lg:block absolute z-10 inset-y-0 right-0 w-20 pointer-events-none bg-gradient-to-l ${isDark ? 'from-[#07090e]' : 'from-[#f8fafc]'} to-transparent`} />

            <div ref={trackRef} className="process-track flex flex-col lg:flex-row gap-5 lg:gap-7 lg:w-max will-change-transform">
              {processSteps.map((step, index) => (
                <article
                  key={step.step}
                  ref={(node) => { stepRefs.current[index] = node; }}
                  data-process-step={index}
                  className={`process-card-item ${index % 2 === 1 ? 'card-alt' : ''} group relative shrink-0 w-full lg:w-[min(70vw,820px)] min-h-[420px] sm:min-h-[390px] lg:min-h-[440px] p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border flex flex-col justify-between transition-colors duration-300 ${
                    isDark
                      ? index % 2 === 1 ? 'bg-[#111827] text-slate-100 border-white/[0.08]' : 'bg-[#0c1220] text-slate-100 border-white/[0.08]'
                      : index % 2 === 1 ? 'bg-slate-100 text-slate-900 border-slate-200' : 'bg-white text-slate-900 border-slate-200'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-7">
                    <div className="flex items-center gap-4 sm:gap-5">
                      <span className={`font-bebas text-5xl sm:text-6xl leading-none tracking-wide ${isDark ? 'text-cyan-300' : 'text-sky-700'}`}>
                        {step.step}
                      </span>
                      <div className={`h-12 w-px ${isDark ? 'bg-white/10' : 'bg-slate-300'}`} />
                      <div>
                        <div className={`font-dm-mono text-[11px] uppercase tracking-[0.18em] mb-1 ${isDark ? 'text-cyan-300' : 'text-sky-700'}`}>
                          Step {step.step} / {step.phase}
                        </div>
                        <div className={`card-meta-badge inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-dm-mono ${isDark ? 'bg-white/[0.04] border-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                          <Clock size={12} className={isDark ? 'text-cyan-300' : 'text-sky-700'} />
                          <span>{step.duration}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`font-dm-mono text-xs ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>SARIRAIT / PROCESS</span>
                  </div>

                  <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-10 flex-1">
                    <div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-4">{step.title}</h3>
                      <p className={`text-sm sm:text-base leading-relaxed max-w-xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {step.summary}
                      </p>
                    </div>
                    <div className={`lg:pl-8 lg:border-l ${isDark ? 'lg:border-white/[0.08]' : 'lg:border-slate-200'}`}>
                      <div className={`font-dm-mono text-[11px] uppercase tracking-[0.16em] mb-4 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                        What we align on
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                        {step.deliverables.map((item) => (
                          <li key={item} className={`card-deliverable-text flex items-start gap-2.5 text-xs sm:text-sm leading-snug ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            <CheckCircle2 size={15} className={`mt-0.5 shrink-0 ${isDark ? 'text-cyan-300' : 'text-sky-700'}`} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={`card-tagline mt-7 pt-4 border-t text-xs sm:text-sm font-dm-mono ${isDark ? 'text-slate-400 border-white/[0.08]' : 'text-sky-800 border-slate-200'}`}>
                    “{step.tagline}”
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <div className="flex items-center gap-2" aria-label="Choose a process step">
              {processSteps.map((step, index) => (
                <button
                  key={step.step}
                  type="button"
                  onClick={() => goToStep(index)}
                  aria-label={`Go to step ${step.step}: ${step.title}`}
                  aria-current={activeStep === index ? 'step' : undefined}
                  className={`w-9 h-9 rounded-full border text-xs font-dm-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 ${isDark ? 'focus-visible:ring-offset-[#07090e]' : 'focus-visible:ring-offset-[#f8fafc]'} ${
                    activeStep === index
                      ? isDark ? 'bg-cyan-400 text-slate-950 border-cyan-300' : 'bg-sky-700 text-white border-sky-700'
                      : `step-btn-inactive ${isDark ? 'bg-white/[0.04] text-slate-400 border-white/10' : 'bg-white text-slate-600 border-slate-300'}`
                  }`}
                >
                  {step.step}
                </button>
              ))}
            </div>

            <div className="process-border flex-1 h-px bg-white/10 relative" aria-hidden="true">
              <span className={`absolute left-0 top-0 h-px transition-[width] duration-300 ${isDark ? 'bg-cyan-300' : 'bg-sky-700'}`} style={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }} />
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-4">
              <span className={`font-dm-mono text-xs min-w-[58px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {processSteps[activeStep].step} <span className={isDark ? 'text-slate-600' : 'text-slate-400'}>/ 06</span>
              </span>
              <button
                type="button"
                onClick={() => goToStep(activeStep - 1)}
                disabled={activeStep === 0}
                aria-label="Previous process step"
                className={`arrow-btn-enabled w-10 h-10 rounded-full border flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed ${isDark ? 'bg-white/[0.04] border-white/10 text-slate-300 hover:border-cyan-300/50 hover:text-white focus-visible:ring-offset-[#07090e]' : 'bg-white border-slate-300 text-slate-600 hover:border-sky-600 hover:text-sky-800 focus-visible:ring-offset-[#f8fafc]'}`}
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => goToStep(activeStep + 1)}
                disabled={activeStep === processSteps.length - 1}
                aria-label="Next process step"
                className={`arrow-btn-enabled w-10 h-10 rounded-full border flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed ${isDark ? 'bg-white/[0.04] border-white/10 text-slate-300 hover:border-cyan-300/50 hover:text-white focus-visible:ring-offset-[#07090e]' : 'bg-white border-slate-300 text-slate-600 hover:border-sky-600 hover:text-sky-800 focus-visible:ring-offset-[#f8fafc]'}`}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
