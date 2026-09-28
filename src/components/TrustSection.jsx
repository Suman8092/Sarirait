import React from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';

export default function TrustSection() {
  const stats = [
    { value: "01", label: "Shape the brand", detail: "Identity, design and content" },
    { value: "02", label: "Build the experience", detail: "Websites, apps and stores" },
    { value: "03", label: "Reach the audience", detail: "Search, social and campaigns" },
    { value: "04", label: "Keep improving", detail: "Learn from real feedback" }
  ];

  // Marquee client partner logos
  const partners = [
    { name: "Brand identity", tag: "Design" },
    { name: "Print & packaging", tag: "Creative" },
    { name: "Websites & stores", tag: "Development" },
    { name: "Mobile applications", tag: "Product" },
    { name: "Search visibility", tag: "Marketing" },
    { name: "Social content", tag: "Marketing" },
    { name: "Email campaigns", tag: "Growth" },
    { name: "Lead generation", tag: "Growth" }
  ];

  return (
    <section id="trust" className="relative py-16 sm:py-20 border-y border-white/[0.06] bg-[#070a10] overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-mono-code uppercase tracking-widest text-cyan-400 mb-3 block">
            A connected digital presence
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
            “Make every digital touchpoint feel like your brand.”
          </h2>
          <p className="text-slate-400 text-xs sm:text-base mt-4">
            Bring your identity, website and marketing into one clear experience—from the first impression to the next customer action.
          </p>
        </div>

        {/* 4 CORE STATS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onMouseEnter={() => sound.hover()}
              className="p-4 sm:p-8 rounded-2xl glass-card border border-white/[0.06] hover:border-cyan-500/30 group"
            >
              <div className="text-3xl sm:text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300 group-hover:to-cyan-400 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs sm:text-base font-semibold text-white mt-1.5 sm:mt-2 font-display">
                {stat.label}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 font-mono-code mt-0.5 sm:mt-1">
                {stat.detail}
              </div>
            </motion.div>
          ))}
        </div>

        {/* SERVICE AREAS MARQUEE */}
        <div className="relative overflow-hidden py-6 border-t border-white/[0.05]">
          {/* Gradient fade edge masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#070a10] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#070a10] to-transparent z-10 pointer-events-none" />

          {/* Infinite Seamless Looping Marquee Track */}
          <div className="flex w-max animate-marquee-infinite">
            {/* Primary Track */}
            <div className="flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6">
              {[...partners, ...partners].map((partner, idx) => (
                <div
                  key={`track1-${idx}`}
                  onMouseEnter={() => sound.hover()}
                  className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/40 hover:bg-white/[0.06] transition-all cursor-default group"
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-500/60 group-hover:bg-cyan-400 group-hover:scale-125 transition-all" />
                  <span className="font-display font-bold text-sm tracking-wider text-slate-300 group-hover:text-white transition-colors">
                    {partner.name}
                  </span>
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 group-hover:text-cyan-300 transition-colors">
                    {partner.tag}
                  </span>
                </div>
              ))}
            </div>

            {/* Seamless Clone Track */}
            <div className="flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6" aria-hidden="true">
              {[...partners, ...partners].map((partner, idx) => (
                <div
                  key={`track2-${idx}`}
                  onMouseEnter={() => sound.hover()}
                  className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/40 hover:bg-white/[0.06] transition-all cursor-default group"
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-500/60 group-hover:bg-cyan-400 group-hover:scale-125 transition-all" />
                  <span className="font-display font-bold text-sm tracking-wider text-slate-300 group-hover:text-white transition-colors">
                    {partner.name}
                  </span>
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 group-hover:text-cyan-300 transition-colors">
                    {partner.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
