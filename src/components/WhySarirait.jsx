import React from 'react';
import { Target, Sparkles, Cpu, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import MaskedHeading from './MaskedHeading';
import { sound } from '../utils/sound';
import { useTheme } from '../context/ThemeContext';

export default function WhySarirait() {
  const { isDark } = useTheme();

  const principles = [
    {
      number: "01",
      title: "Strategy First",
      subtitle: "Every project starts with understanding the business.",
      description: "We start by learning about your business, your audience and what you want to achieve. That context guides the design and build decisions that follow.",
      icon: <Target className="w-6 h-6 text-cyan-400" />,
      accent: isDark ? "border-cyan-500/30 group-hover:border-cyan-400" : "border-slate-200 group-hover:border-sky-400",
      spotlight: isDark ? "rgba(0, 240, 255, 0.16)" : "rgba(2, 132, 199, 0.12)",
      glowBorder: isDark ? "rgba(0, 240, 255, 0.45)" : "rgba(2, 132, 199, 0.4)",
      deliverables: ["Audience & Market Mapping", "Tech Stack Architecture", "Roadmap & Scope Lock"]
    },
    {
      number: "02",
      title: "Design That Matters",
      subtitle: "Beautiful interfaces with meaningful user experiences.",
      description: "A strong identity and a clear, easy-to-use experience help people understand what you offer and feel confident taking the next step.",
      icon: <Sparkles className="w-6 h-6 text-violet-400" />,
      accent: isDark ? "border-violet-500/30 group-hover:border-violet-400" : "border-slate-200 group-hover:border-purple-400",
      spotlight: isDark ? "rgba(138, 43, 226, 0.18)" : "rgba(147, 51, 234, 0.12)",
      glowBorder: isDark ? "rgba(138, 43, 226, 0.45)" : "rgba(147, 51, 234, 0.4)",
      deliverables: ["Visual Identity Systems", "High-Fidelity Wireframes", "Design Tokens & UI Kit"]
    },
    {
      number: "03",
      title: "Technology That Scales",
      subtitle: "Clean architecture designed for future growth.",
      description: "We choose practical tools for your needs and build with performance, accessibility and future updates in mind.",
      icon: <Cpu className="w-6 h-6 text-blue-400" />,
      accent: isDark ? "border-blue-500/30 group-hover:border-blue-400" : "border-slate-200 group-hover:border-blue-400",
      spotlight: isDark ? "rgba(59, 130, 246, 0.16)" : "rgba(37, 99, 235, 0.12)",
      glowBorder: isDark ? "rgba(59, 130, 246, 0.45)" : "rgba(37, 99, 235, 0.4)",
      deliverables: ["Sub-Second Load Times", "Modern Headless Stacks", "Accessible & SEO-Engineered"]
    },
    {
      number: "04",
      title: "Results Over Noise",
      subtitle: "Every digital product should create measurable value.",
      description: "We agree on the project scope and priorities with you, then use feedback and real-world results to decide what to improve next.",
      icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
      accent: isDark ? "border-emerald-500/30 group-hover:border-emerald-400" : "border-slate-200 group-hover:border-emerald-400",
      spotlight: isDark ? "rgba(16, 185, 129, 0.16)" : "rgba(5, 150, 105, 0.12)",
      glowBorder: isDark ? "rgba(16, 185, 129, 0.45)" : "rgba(5, 150, 105, 0.4)",
      deliverables: ["Conversion-Optimized Flow", "Platform Telemetry & KPIs", "Ongoing Maintenance Sprints"]
    }
  ];

  return (
    <section 
      id="why-us" 
      className={`motion-section relative py-20 sm:py-28 transition-colors duration-300 overflow-hidden w-full max-w-full ${
        isDark 
          ? 'text-slate-100' 
          : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true"
        data-scroll-depth="-24"
        className={`ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[350px] sm:h-[400px] rounded-full blur-[100px] pointer-events-none -z-10 ${
          isDark ? 'bg-cyan-500/5' : 'bg-sky-400/10'
        }`} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* SECTION HEADER */}
        <div
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <div data-motion-reveal className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono-code mb-4 border border-cyan-500/30">
            <span className="motion-status-dot w-2 h-2 rounded-full bg-cyan-400" />
            <span className={isDark ? 'text-cyan-400 font-semibold' : 'text-sky-700 font-semibold'}>
              WHY SARIRAIT // 4 CORE PILLARS
            </span>
          </div>
          <MaskedHeading
            as="h2"
            className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-[1.12]"
            lines={[
              <span key="lead">Thoughtful design.</span>,
              <span key="accent" className="text-gradient-cyan">Useful digital work.</span>
            ]}
          />
          <p data-motion-reveal style={{ '--motion-delay': '140ms' }} className={`text-sm sm:text-base lg:text-lg mt-4 leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            We connect every dimension of your online presence so your brand looks world-class, operates friction-free, and converts visitors into loyal clients.
          </p>
        </div>

        {/* 4 CORE PRINCIPLES WITH STAGGERED ENTRANCE & SPOTLIGHT CARDS */}
        <div data-motion-stagger="110" className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {principles.map((p, index) => (
            <SpotlightCard
              key={p.number}
              spotlightColor={p.spotlight}
              borderColor={p.glowBorder}
              tiltIntensity={4.8}
              elevation={12}
              data-motion-reveal
              style={{ '--motion-delay': `${index * 110}ms` }}
              onMouseEnter={() => sound.hover()}
              className={`motion-card group p-6 sm:p-9 rounded-3xl transition-all duration-500 ease-out hover:-translate-y-2 relative flex flex-col justify-between border shadow-xl ${
                isDark 
                  ? 'bg-[#0c1220]/80 border-white/[0.08] hover:border-cyan-400/50 shadow-black/40' 
                  : 'bg-white border-slate-200/90 hover:border-sky-400 shadow-slate-200/70 hover:shadow-xl hover:shadow-sky-500/10'
              } ${p.accent}`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* Large Stylized Number with Theme Contrast */}
                  <span className={`font-mono-code text-3xl sm:text-4xl font-extrabold tracking-tight transition-colors ${
                    isDark 
                      ? 'text-white/20 group-hover:text-cyan-400' 
                      : 'text-slate-300 group-hover:text-sky-600'
                  }`}>
                    {p.number}
                  </span>

                  {/* Icon Container with Theme Contrast */}
                  <div className={`p-3 rounded-2xl border transition-all duration-400 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg ${
                    isDark 
                      ? 'bg-white/[0.04] border-white/10 group-hover:border-cyan-400/40' 
                      : 'bg-slate-100 border-slate-200 group-hover:border-sky-400 shadow-sm'
                  }`}>
                    {p.icon}
                  </div>
                </div>

                <h3 className={`text-2xl sm:text-3xl font-display font-bold mb-2 transition-colors ${
                  isDark ? 'text-white group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-sky-700'
                }`}>
                  {p.title}
                </h3>

                <div className={`text-xs sm:text-sm font-semibold font-mono-code mb-3.5 ${
                  isDark ? 'text-cyan-400' : 'text-sky-600'
                }`}>
                  {p.subtitle}
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {p.description}
                </p>

                {/* Micro-deliverables badges */}
                <div className="flex flex-wrap gap-2 pt-2 mb-4">
                  {p.deliverables.map((item, idx) => (
                    <span 
                      key={idx}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono-code border ${
                        isDark 
                          ? 'bg-white/[0.03] text-slate-300 border-white/[0.06]' 
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <CheckCircle2 size={11} className={isDark ? "text-cyan-400" : "text-sky-600"} />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className={`pt-5 border-t flex items-center justify-between ${
                isDark ? 'border-white/[0.06]' : 'border-slate-100'
              }`}>
                <span className={`text-[11px] font-mono-code uppercase font-semibold ${
                  isDark ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  Pillar {p.number} // Core Standard
                </span>

                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isDark 
                    ? 'bg-white/[0.04] text-slate-400 group-hover:text-white group-hover:bg-cyan-500/20' 
                    : 'bg-slate-100 text-slate-500 group-hover:text-sky-700 group-hover:bg-sky-100'
                }`}>
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
}
