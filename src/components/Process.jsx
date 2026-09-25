import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock } from 'lucide-react';
import { processSteps } from '../data/process';
import { sound } from '../utils/sound';

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="relative py-28 bg-[#07090e] border-t border-white/[0.06]">
      {/* Background ambient gradient */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono-code text-cyan-400 mb-4 border border-cyan-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>HOW WE WORK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.12]">
            From idea <br />
            <span className="text-gradient-cyan">to impact.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-5 leading-relaxed">
            Our disciplined 6-stage delivery framework eliminates guesswork, guarantees code reliability, and turns ambitious visions into high-performing reality.
          </p>
        </div>

        {/* PROCESS TIMELINE STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onMouseEnter={() => {
                sound.hover();
                setActiveStep(index);
              }}
              className={`p-8 rounded-3xl glass-card border transition-all duration-300 relative flex flex-col justify-between ${
                activeStep === index 
                  ? 'border-cyan-500/50 bg-white/[0.04] shadow-xl shadow-cyan-500/10 -translate-y-1' 
                  : 'border-white/[0.07] hover:border-white/[0.2]'
              }`}
            >
              <div>
                {/* Step Top Bar */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-mono-code font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    {step.step}
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono-code text-slate-400">
                    <Clock size={12} className="text-cyan-400" />
                    <span>{step.duration}</span>
                  </div>
                </div>

                {/* Phase & Title */}
                <div className="text-xs font-mono-code text-cyan-400 uppercase tracking-widest mb-1.5">
                  Phase // {step.phase}
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {step.summary}
                </p>
              </div>

              {/* Deliverables Checklist */}
              <div className="pt-6 border-t border-white/[0.06]">
                <div className="text-[11px] font-mono-code uppercase text-slate-500 mb-3 tracking-wider">
                  Key Deliverables
                </div>
                <div className="space-y-2">
                  {step.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Tagline */}
              <div className="mt-6 pt-4 border-t border-white/[0.04] text-[11px] font-mono-code italic text-slate-500">
                "{step.tagline}"
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
