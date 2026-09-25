import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { faqsData } from '../data/faqs';
import { sound } from '../utils/sound';

export default function FAQ({ onOpenProjectModal }) {
  const [openId, setOpenId] = useState(1);

  const toggle = (id) => {
    sound.click();
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-28 bg-[#090d16] border-t border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono-code text-cyan-400 mb-4 border border-cyan-500/30">
            <HelpCircle size={14} />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Clear answers to <br />
            <span className="text-gradient-cyan">common inquiries.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-xl mx-auto">
            Everything you need to know about partnering with Sarirait, our delivery process, technical standards, and commitments.
          </p>
        </div>

        {/* ACCORDION LIST */}
        <div className="space-y-3">
          {faqsData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white/[0.04] border-cyan-500/40 shadow-lg shadow-cyan-500/5'
                    : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.15]'
                }`}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  onMouseEnter={() => sound.hover()}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-base sm:text-lg text-white">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all shrink-0 ${
                    isOpen
                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                      : 'border-white/10 bg-white/[0.03] text-slate-400'
                  }`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-300/90 leading-relaxed border-t border-white/[0.04]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* EXTRA HELP FOOTER */}
        <div className="mt-12 text-center p-6 rounded-2xl glass-card border border-white/[0.06]">
          <span className="text-sm text-slate-400">
            Have a unique technical inquiry or custom enterprise requirement?
          </span>
          <div className="mt-3">
            <button
              onClick={() => {
                sound.click();
                onOpenProjectModal();
              }}
              onMouseEnter={() => sound.hover()}
              className="text-xs font-mono-code uppercase font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
            >
              Speak directly with a Solutions Architect →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
