import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonialsData } from '../data/testimonials';
import { sound } from '../utils/sound';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    sound.click();
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const next = () => {
    sound.click();
    setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const activeTestimonial = testimonialsData[currentIndex];

  return (
    <section id="testimonials" className="relative py-28 bg-[#07090e] border-t border-white/[0.06] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono-code text-cyan-400 mb-4 border border-cyan-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>TESTIMONIALS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight">
              Trusted by <br />
              <span className="text-gradient-cyan">ambitious businesses.</span>
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              onMouseEnter={() => sound.hover()}
              aria-label="Previous Testimonial"
              className="w-12 h-12 rounded-full glass-card border border-white/10 hover:border-cyan-400/50 flex items-center justify-center text-slate-300 hover:text-white transition-all active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              onMouseEnter={() => sound.hover()}
              aria-label="Next Testimonial"
              className="w-12 h-12 rounded-full glass-card border border-white/10 hover:border-cyan-400/50 flex items-center justify-center text-slate-300 hover:text-white transition-all active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* ACTIVE FEATURED TESTIMONIAL DISPLAY */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="p-8 sm:p-12 lg:p-16 rounded-3xl glass-card border border-white/[0.08] relative overflow-hidden"
            >
              <Quote className="w-16 h-16 text-cyan-500/15 absolute top-8 right-8 pointer-events-none" />

              <div className="flex items-center gap-1.5 mb-6 text-amber-400">
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
                <span className="text-xs font-mono-code text-slate-400 ml-2">5.0 Verified Outcome</span>
              </div>

              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-display font-medium text-white leading-relaxed mb-10 max-w-4xl">
                “{activeTestimonial.quote}”
              </blockquote>

              <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-white/[0.08]">
                <div className="flex items-center gap-4">
                  <img
                    src={activeTestimonial.avatar}
                    alt={activeTestimonial.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-cyan-400/30"
                  />
                  <div>
                    <div className="text-lg font-display font-bold text-white">
                      {activeTestimonial.name}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400">
                      {activeTestimonial.position} • <span className="text-cyan-300 font-medium">{activeTestimonial.company}</span>
                    </div>
                  </div>
                </div>

                <span className="text-xs font-mono-code px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {activeTestimonial.tag}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  sound.click();
                  setCurrentIndex(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-cyan-400' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
