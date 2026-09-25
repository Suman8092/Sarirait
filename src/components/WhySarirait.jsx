import React from 'react';
import { motion } from 'framer-motion';
import { Target, Sparkles, Cpu, BarChart3, ArrowRight } from 'lucide-react';
import { sound } from '../utils/sound';

export default function WhySarirait() {
  const principles = [
    {
      number: "01",
      title: "Strategy First",
      subtitle: "Every project starts with understanding the business.",
      description: "We don't write a single line of code until we have deconstructed your revenue model, audience psychology, and competitive moat. Technology is a lever for market advantage.",
      icon: <Target className="w-6 h-6 text-cyan-400" />,
      accent: "border-cyan-500/30 group-hover:border-cyan-400"
    },
    {
      number: "02",
      title: "Design That Matters",
      subtitle: "Beautiful interfaces with meaningful user experiences.",
      description: "Aesthetics without usability is decoration. Usability without aesthetics is forgettable. We merge bespoke creative direction with cognitive ergonomic rigor.",
      icon: <Sparkles className="w-6 h-6 text-violet-400" />,
      accent: "border-violet-500/30 group-hover:border-violet-400"
    },
    {
      number: "03",
      title: "Technology That Scales",
      subtitle: "Clean architecture designed for future growth.",
      description: "No vendor lock-in. No brittle monolithic dependencies. We engineer modular, type-safe, containerized systems ready for exponential traffic surges.",
      icon: <Cpu className="w-6 h-6 text-blue-400" />,
      accent: "border-blue-500/30 group-hover:border-blue-400"
    },
    {
      number: "04",
      title: "Results Over Noise",
      subtitle: "Every digital product should create measurable value.",
      description: "We hold our craft accountable to real empirical KPIs: conversion lift, retention duration, latency reduction, and bottom-line margin expansion.",
      icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
      accent: "border-emerald-500/30 group-hover:border-emerald-400"
    }
  ];

  return (
    <section id="why-us" className="relative py-28 bg-[#090d16] border-t border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono-code text-cyan-400 mb-4 border border-cyan-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>WHY SARIRAIT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.12]">
            We combine technology, <br />
            <span className="text-gradient-cyan">design and strategy.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-5 leading-relaxed">
            Our operating philosophy is built on four immutable pillars that protect your investment and accelerate time-to-value.
          </p>
        </div>

        {/* 4 CORE PRINCIPLES WITH LARGE TYPOGRAPHY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {principles.map((p, index) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onMouseEnter={() => sound.hover()}
              className={`group p-8 sm:p-10 rounded-3xl glass-card border transition-all duration-300 relative flex flex-col justify-between ${p.accent}`}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono-code text-3xl sm:text-4xl font-extrabold text-white/20 group-hover:text-cyan-400 transition-colors">
                    {p.number}
                  </span>
                  <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:scale-110 transition-transform">
                    {p.icon}
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {p.title}
                </h3>
                <div className="text-sm font-semibold text-cyan-400 font-mono-code mb-4">
                  {p.subtitle}
                </div>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs font-mono-code text-slate-500 uppercase">
                  Pillar {p.number} // Core Tenet
                </span>
                <div className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-cyan-500/20 transition-all">
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
