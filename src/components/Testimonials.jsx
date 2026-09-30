import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Monitor, Megaphone, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import { sound } from '../utils/sound';
import { useTheme } from '../context/ThemeContext';

const waysWeHelp = [
  {
    icon: <Layers className="w-6 h-6 text-cyan-400" />,
    number: "01",
    title: "Give your brand a clear identity",
    description: "Bring your logo, colors, typography and core value proposition together into an authentic design system that people instantly recognize.",
    deliverables: ["Visual Identity Systems", "Logo Guidelines & Tokens", "Brand Strategy Roadmaps"],
    spotlight: "rgba(0, 240, 255, 0.16)",
    glowBorder: "rgba(0, 240, 255, 0.45)"
  },
  {
    icon: <Monitor className="w-6 h-6 text-violet-400" />,
    number: "02",
    title: "Make the online experience easier",
    description: "Help customers understand what you offer and navigate friction-free through high-performance websites, e-commerce storefronts, or mobile apps.",
    deliverables: ["Headless Web & Apps", "Rapid Mobile Checkouts", "Accessibility & Core Vitals"],
    spotlight: "rgba(138, 43, 226, 0.18)",
    glowBorder: "rgba(138, 43, 226, 0.45)"
  },
  {
    icon: <Megaphone className="w-6 h-6 text-sky-400" />,
    number: "03",
    title: "Show up where your audience is",
    description: "Execute targeted campaigns, search engine optimization, and thoughtful content that reflects your brand and converts real prospective customers.",
    deliverables: ["Search Engine SEO", "High-ROI Paid Campaigns", "Targeted Content Sprints"],
    spotlight: "rgba(56, 189, 248, 0.16)",
    glowBorder: "rgba(56, 189, 248, 0.45)"
  }
];

export default function Testimonials() {
  const { isDark } = useTheme();

  return (
    <section 
      id="testimonials" 
      className={`relative py-20 sm:py-28 transition-colors duration-300 overflow-hidden w-full max-w-full ${
        isDark 
          ? 'bg-[#07090e] border-t border-white/[0.06] text-slate-100' 
          : 'bg-slate-50 border-t border-slate-200 text-slate-900'
      }`}
    >
      {/* Background ambient lighting */}
      <div 
        className={`ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] h-[400px] rounded-full blur-[100px] pointer-events-none -z-10 ${
          isDark ? 'bg-cyan-500/5' : 'bg-sky-400/10'
        }`} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* SECTION HEADER */}
        <div data-motion-reveal className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono-code mb-4 border border-cyan-500/30">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className={isDark ? 'text-cyan-400 font-semibold' : 'text-sky-700 font-semibold'}>
              WHAT WE CAN HELP WITH // 3 DISCIPLINE PILLARS
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-[1.12]">
            Every part of your brand, <br />
            <span className="text-gradient-cyan">working seamlessly together.</span>
          </h2>
          <p className={`text-sm sm:text-base lg:text-lg mt-4 max-w-2xl leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            From the very first impression to ongoing customer retention, we architect digital experiences that feel unified, intuitive, and built for commercial scale.
          </p>
        </div>

        {/* 3 DISCIPLINE PILLARS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {waysWeHelp.map((item, index) => (
            <SpotlightCard
              key={item.title}
              spotlightColor={isDark ? item.spotlight : "rgba(2, 132, 199, 0.12)"}
              borderColor={isDark ? item.glowBorder : "rgba(2, 132, 199, 0.4)"}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 260, damping: 20 } }}
              onMouseEnter={() => sound.hover()}
              className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between shadow-xl ${
                isDark 
                  ? 'bg-[#0c1220]/80 border-white/[0.08] hover:border-cyan-500/40 shadow-black/40' 
                  : 'bg-white border-slate-200/90 hover:border-sky-400 shadow-slate-200/70'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-transform group-hover:scale-110 ${
                    isDark 
                      ? 'bg-white/[0.04] border-white/10' 
                      : 'bg-slate-100 border-slate-200 shadow-sm'
                  }`}>
                    {item.icon}
                  </div>
                  <span className={`font-mono-code text-2xl font-extrabold ${
                    isDark ? 'text-white/20' : 'text-slate-300'
                  }`}>
                    {item.number}
                  </span>
                </div>

                <h3 className={`text-xl sm:text-2xl font-display font-bold mb-3 transition-colors ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {item.title}
                </h3>

                <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {item.description}
                </p>

                {/* Deliverables badges */}
                <div className="space-y-2 mb-6">
                  {item.deliverables.map((deliv, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-center gap-2 text-xs font-mono-code px-3 py-1.5 rounded-xl border ${
                        isDark 
                          ? 'bg-white/[0.03] text-slate-300 border-white/[0.05]' 
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <CheckCircle2 size={12} className={isDark ? "text-cyan-400 shrink-0" : "text-sky-600 shrink-0"} />
                      <span className="truncate">{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className={`pt-4 border-t flex items-center justify-between ${
                isDark ? 'border-white/[0.06]' : 'border-slate-100'
              }`}>
                <span className={`text-[11px] font-mono-code font-semibold ${
                  isDark ? 'text-cyan-400' : 'text-sky-600'
                }`}>
                  Integrated Capability
                </span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                  isDark ? 'text-slate-400 group-hover:text-white' : 'text-slate-500 group-hover:text-sky-700'
                }`}>
                  <ArrowUpRight size={15} />
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
}
