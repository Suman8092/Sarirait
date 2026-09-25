import React from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';

export default function TrustSection() {
  const stats = [
    { value: "20+", label: "Completed Projects", detail: "Across Web, Cloud & AI" },
    { value: "15+", label: "Global Clients", detail: "Startups to Enterprise" },
    { value: "5+", label: "Years Experience", detail: "Next-Gen Engineering" },
    { value: "98%", label: "Client Satisfaction", detail: "Verified NPS Score" }
  ];

  // Marquee client partner logos
  const partners = [
    { name: "Aetheria Systems", tag: "AI Cloud" },
    { name: "NovaFin Capital", tag: "Fintech" },
    { name: "Kinetics Health", tag: "Biosensors" },
    { name: "Aura Atelier", tag: "Luxury Goods" },
    { name: "Vortex Labs", tag: "Cybersecurity" },
    { name: "Synapse Digital", tag: "Automation" },
    { name: "Nexus Quantum", tag: "High-Freq Infra" },
    { name: "Stratum Dynamics", tag: "Enterprise SaaS" }
  ];

  return (
    <section id="trust" className="relative py-20 border-y border-white/[0.06] bg-[#070a10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono-code uppercase tracking-widest text-cyan-400 mb-3 block">
            Impact &amp; Reliability
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            “Technology built around your business goals.”
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4">
            We don't just write code; we partner with visionary leadership teams to deliver compound enterprise value.
          </p>
        </div>

        {/* 4 CORE STATS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onMouseEnter={() => sound.hover()}
              className="p-6 sm:p-8 rounded-2xl glass-card border border-white/[0.06] hover:border-cyan-500/30 group"
            >
              <div className="text-4xl sm:text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300 group-hover:to-cyan-400 transition-colors">
                {stat.value}
              </div>
              <div className="text-base font-semibold text-white mt-2 font-display">
                {stat.label}
              </div>
              <div className="text-xs text-slate-400 font-mono-code mt-1">
                {stat.detail}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CLIENT-LOGO MARQUEE */}
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
