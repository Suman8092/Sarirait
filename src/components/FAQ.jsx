import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus, Minus, HelpCircle, MessageSquare, ArrowRight } from 'lucide-react';
import { faqsData } from '../data/faqs';
import MaskedHeading from './MaskedHeading';
import { sound } from '../utils/sound';
import { useTheme } from '../context/ThemeContext';

export default function FAQ({ onOpenProjectModal }) {
  const { isDark } = useTheme();
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState(1);

  const toggle = (id) => {
    sound.click();
    setOpenId((currentId) => currentId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className={`motion-section relative py-20 sm:py-28 transition-colors duration-300 overflow-hidden w-full max-w-full ${
        isDark
          ? 'text-slate-100'
          : 'bg-white text-slate-900'
      }`}
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        data-scroll-depth="24"
        className={`ambient-glow absolute bottom-10 left-0 sm:left-10 w-full max-w-[500px] h-[350px] sm:h-[500px] rounded-full blur-[90px] pointer-events-none -z-10 ${
          isDark ? 'bg-cyan-500/5' : 'bg-sky-300/10'
        }`}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* SECTION HEADER */}
        <div
          className="text-center mb-12 sm:mb-16"
        >
          <div data-motion-reveal className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono-code mb-4 border border-cyan-500/30">
            <HelpCircle size={14} className={isDark ? "text-cyan-400" : "text-sky-600"} />
            <span className={isDark ? 'text-cyan-400 font-semibold' : 'text-sky-700 font-semibold'}>
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>
          <MaskedHeading
            as="h2"
            className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-[1.12]"
            lines={[
              <span key="lead">Clear answers to</span>,
              <span key="accent" className="text-gradient-cyan">common inquiries.</span>
            ]}
          />
          <p data-motion-reveal style={{ '--motion-delay': '140ms' }} className={`text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Everything you need to know about our project timelines, pricing models, technology choices, and post-launch partnership.
          </p>
        </div>

        {/* ACCORDION LIST */}
        <div data-motion-reveal data-motion-stagger="70" className="space-y-3.5">
          {faqsData.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                data-motion-reveal
                style={{ '--motion-delay': `${idx * 60}ms` }}
                className={`rounded-2xl border transition-all duration-400 overflow-hidden ${
                  isOpen
                    ? isDark
                      ? 'bg-[#0c1220] border-cyan-500/40 shadow-xl shadow-cyan-500/10 border-l-4 border-l-cyan-400'
                      : 'bg-sky-50/90 border-sky-400 shadow-md border-l-4 border-l-sky-500'
                    : isDark
                      ? 'bg-white/[0.02] border-white/[0.08] hover:border-white/20'
                      : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <button
                  type="button"
                  id={`faq-question-${faq.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  onClick={() => toggle(faq.id)}
                  onMouseEnter={() => sound.hover()}
                  className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer group"
                >
                  <span className={`text-base sm:text-lg font-display font-bold transition-colors duration-300 ${
                    isOpen
                      ? isDark ? 'text-cyan-300' : 'text-sky-950 font-extrabold'
                      : isDark ? 'text-white group-hover:text-cyan-300' : 'text-slate-800 group-hover:text-sky-700'
                  }`}>
                    {faq.question}
                  </span>
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-400 ease-out ${
                    isOpen
                      ? isDark 
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 rotate-180 shadow-[0_0_12px_rgba(0,240,255,0.25)]' 
                        : 'bg-sky-600 text-white border-sky-600 rotate-180 shadow-md shadow-sky-600/20'
                      : isDark
                        ? 'bg-white/[0.04] text-slate-400 border-white/10 group-hover:border-cyan-400/40 group-hover:text-cyan-300'
                        : 'bg-white text-slate-600 border-slate-200 group-hover:border-sky-300 group-hover:text-sky-700'
                  }`}>
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-question-${faq.id}`}
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: reduceMotion ? 'auto' : 0, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.36, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className={`px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm leading-relaxed border-t pt-4 ${
                        isDark 
                          ? 'border-white/[0.06] text-slate-300' 
                          : 'border-sky-200/60 text-slate-700'
                      }`}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* BOTTOM HELP BANNER */}
        <div
          data-motion-reveal
          style={{ '--motion-delay': '100ms' }}
          className={`mt-10 p-5 sm:p-7 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left transition-all ${
            isDark 
              ? 'bg-[#0c1220]/80 border-white/[0.08] shadow-xl' 
              : 'bg-slate-50 border-slate-200 shadow-md'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
              isDark ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-sky-100 border-sky-300 text-sky-700'
            }`}>
              <MessageSquare size={18} />
            </div>
            <div>
              <div className={`text-sm font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Have a specific question about your project?
              </div>
              <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Talk directly with our lead architects and engineers.
              </div>
            </div>
          </div>

          <button
            data-magnetic
            onClick={() => {
              sound.click();
              onOpenProjectModal();
            }}
            onMouseEnter={() => sound.hover()}
            className="btn-shimmer px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold text-xs font-mono-code flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <span>Ask Us Directly</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}
