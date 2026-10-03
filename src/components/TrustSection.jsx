import React from 'react';
import SpotlightCard from './SpotlightCard';
import { sound } from '../utils/sound';
import MaskedHeading from './MaskedHeading';
import { useTheme } from '../context/ThemeContext';

export default function TrustSection() {
  const { isDark } = useTheme();

  const stats = [
    { value: "01", label: "Shape the brand", detail: "Identity, design and content" },
    { value: "02", label: "Build the experience", detail: "Websites, apps and stores" },
    { value: "03", label: "Reach the audience", detail: "Search, social and campaigns" },
    { value: "04", label: "Keep improving", detail: "Learn from real feedback" }
  ];

  // Verified client brand logos delivered by Sarirait
  const clientBrands = [
    { name: "DiaraShine", logo: "/projects/diarashine.jpg", category: "Luxury Jewelry" },
    { name: "Rydap", logo: "/projects/rydap.jpg", category: "Mobility App" },
    { name: "AnabolicNutrition", logo: "/projects/anabolic.jpg", category: "Sports Nutrition" },
    { name: "Chabhi", logo: "/projects/chabhi.jpg", category: "IoT Smart Access" },
    { name: "SolarisMotion", logo: "/projects/solaris.jpg", category: "CleanTech" },
    { name: "ScolaKidz", logo: "/projects/scolakidz.jpg", category: "EdTech Platform" },
    { name: "LifeZila", logo: "/projects/lifezila.jpg", category: "Health & Habits" },
    { name: "Mom Made Pickle", logo: "/projects/mommade.jpg", category: "Artisanal FMCG" },
    { name: "Archanna Gupta", logo: "/projects/archanna-gupta.jpg", category: "Haute Couture" },
    { name: "Workpunkt", logo: "/projects/workpunkt.jpg", category: "Coworking Tech" },
    { name: "ShineFood", logo: "/projects/shinefood.jpg", category: "Packaged Foods" },
    { name: "TheStoreyTellers", logo: "/projects/thestoreytellers.jpg", category: "Media Studio" },
    { name: "Uniora", logo: "/projects/uniora.jpg", category: "Enterprise Cloud" },
    { name: "Printmadly", logo: "/projects/printmadly.jpg", category: "Custom Merch" }
  ];

  return (
    <section id="trust" className="motion-section relative py-20 sm:py-28 overflow-hidden w-full max-w-full">
      {/* Seamless Ambient Transition Glow */}
      <div aria-hidden="true" data-scroll-depth="22" className={`ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] rounded-full blur-[130px] pointer-events-none -z-10 ${
        isDark ? 'bg-cyan-500/[0.04]' : 'bg-sky-400/[0.08]'
      }`} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* SECTION HEADER */}
        <div
          className="text-center max-w-5xl mx-auto mb-12 sm:mb-16"
        >
          <div data-motion-reveal className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code mb-4 border ${
            isDark 
              ? 'glass-pill border-cyan-500/30 text-cyan-400' 
              : 'bg-sky-50 border-sky-200 text-sky-700 shadow-xs'
          }`}>
            <span className={`motion-status-dot w-1.5 h-1.5 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-sky-500'}`} />
            <span className="tracking-widest uppercase">Connected Digital Presence</span>
          </div>
          <MaskedHeading
            as="h2"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl font-display font-bold tracking-tight leading-tight"
            lines={[
              <span key="lead" className={`block ${isDark ? 'text-white' : 'text-slate-900'}`}>“Make every digital touchpoint</span>,
              <span key="accent" className="text-gradient-cyan block sm:whitespace-nowrap">feel unmistakably like your brand.”</span>
            ]}
          />
          <p data-motion-reveal style={{ '--motion-delay': '140ms' }} className={`text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Bring your identity, web application, and marketing into one clear, high-performing experience—from the first impression to the final conversion.
          </p>
        </div>

        {/* 4 CORE STATS GRID */}
        <div data-motion-stagger="95" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-16">
          {stats.map((stat, i) => (
            <SpotlightCard
              key={i}
              spotlightColor={isDark ? "rgba(0, 240, 255, 0.16)" : "rgba(2, 132, 199, 0.12)"}
              borderColor={isDark ? "rgba(0, 240, 255, 0.45)" : "rgba(2, 132, 199, 0.45)"}
              tiltIntensity={4.2}
              elevation={10}
              data-motion-reveal
              style={{ '--motion-delay': `${i * 90}ms` }}
              onMouseEnter={() => sound.hover()}
              className={`motion-card p-5 sm:p-8 rounded-2xl group relative overflow-hidden flex flex-col justify-between border transition-all duration-500 ease-out hover:-translate-y-2 ${
                isDark
                  ? 'glass-card border-white/[0.08] hover:border-cyan-400/50 hover:shadow-cyan-500/10'
                  : 'bg-white border-slate-200 shadow-sm hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/10'
              }`}
            >
              {/* Subtle top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-3xl sm:text-5xl font-display font-extrabold text-transparent bg-clip-text transition-colors ${
                    isDark
                      ? 'bg-gradient-to-r from-white via-slate-100 to-cyan-300 group-hover:to-cyan-400'
                      : 'bg-gradient-to-r from-slate-900 via-sky-800 to-sky-600'
                  }`}>
                    {stat.value}
                  </span>
                  <span className={`text-[10px] font-mono-code uppercase px-2 py-0.5 rounded-full border transition-colors ${
                    isDark 
                      ? 'bg-white/[0.04] text-slate-400 border-white/[0.06] group-hover:border-cyan-500/30 group-hover:text-cyan-300' 
                      : 'bg-slate-100 text-slate-600 border-slate-200 group-hover:border-sky-300 group-hover:text-sky-700'
                  }`}>
                    Phase {stat.value}
                  </span>
                </div>
                <div className={`text-sm sm:text-base font-semibold mt-1.5 sm:mt-2 font-display ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {stat.label}
                </div>
                <div className={`text-xs font-mono-code mt-1 leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {stat.detail}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* AUTHENTIC CLIENT BRAND LOGOS MARQUEE */}
        <div
          data-motion-reveal
          className="relative overflow-hidden py-8 mt-6"
        >
          <div className="text-center mb-5">
            <span className={`text-[11px] font-mono-code uppercase tracking-widest ${
              isDark ? 'text-slate-400' : 'text-slate-500 font-semibold'
            }`}>
              Trusted by Ambitious Brands Across India &amp; Globally // Sarirait
            </span>
          </div>

          {/* Gradient fade edge masks - Seamless matching theme */}
          <div className={`absolute left-0 top-0 bottom-0 w-24 sm:w-36 z-10 pointer-events-none transition-colors duration-300 ${
            isDark 
              ? 'bg-gradient-to-r from-[#07090e] via-[#07090e]/80 to-transparent' 
              : 'bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent'
          }`} />
          <div className={`absolute right-0 top-0 bottom-0 w-24 sm:w-36 z-10 pointer-events-none transition-colors duration-300 ${
            isDark 
              ? 'bg-gradient-to-l from-[#07090e] via-[#07090e]/80 to-transparent' 
              : 'bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent'
          }`} />

          {/* Infinite Seamless Looping Marquee Track */}
          <div className="flex w-max animate-marquee-infinite">
            {/* Primary Track */}
            <div className="flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6">
              {clientBrands.map((client, idx) => (
                <div
                  key={`client-track1-${idx}`}
                  onMouseEnter={() => sound.hover()}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all cursor-default group border ${
                    isDark
                      ? 'glass-card border-white/[0.08] hover:border-cyan-500/40 hover:bg-white/[0.08]'
                      : 'bg-white border-slate-200/90 shadow-sm hover:border-sky-400 hover:shadow-md'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl p-0.5 overflow-hidden shrink-0 transition-colors flex items-center justify-center border ${
                    isDark 
                      ? 'bg-black/80 border-white/10 group-hover:border-cyan-400/60' 
                      : 'bg-white border-slate-200 group-hover:border-sky-400 shadow-xs'
                  }`}>
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <span className={`font-display font-bold text-sm tracking-wide transition-colors ${
                    isDark ? 'text-slate-200 group-hover:text-white' : 'text-slate-800 group-hover:text-sky-900'
                  }`}>
                    {client.name}
                  </span>
                  <span className={`text-[10px] font-mono-code px-2 py-0.5 rounded-full transition-colors ${
                    isDark 
                      ? 'bg-white/[0.04] text-slate-400 group-hover:text-cyan-300' 
                      : 'bg-slate-100 text-slate-600 group-hover:text-sky-700'
                  }`}>
                    {client.category}
                  </span>
                </div>
              ))}
            </div>

            {/* Seamless Clone Track */}
            <div className="flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6" aria-hidden="true">
              {clientBrands.map((client, idx) => (
                <div
                  key={`client-track2-${idx}`}
                  onMouseEnter={() => sound.hover()}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all cursor-default group border ${
                    isDark
                      ? 'glass-card border-white/[0.08] hover:border-cyan-500/40 hover:bg-white/[0.08]'
                      : 'bg-white border-slate-200/90 shadow-sm hover:border-sky-400 hover:shadow-md'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl p-0.5 overflow-hidden shrink-0 transition-colors flex items-center justify-center border ${
                    isDark 
                      ? 'bg-black/80 border-white/10 group-hover:border-cyan-400/60' 
                      : 'bg-white border-slate-200 group-hover:border-sky-400 shadow-xs'
                  }`}>
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <span className={`font-display font-bold text-sm tracking-wide transition-colors ${
                    isDark ? 'text-slate-200 group-hover:text-white' : 'text-slate-800 group-hover:text-sky-900'
                  }`}>
                    {client.name}
                  </span>
                  <span className={`text-[10px] font-mono-code px-2 py-0.5 rounded-full transition-colors ${
                    isDark 
                      ? 'bg-white/[0.04] text-slate-400 group-hover:text-cyan-300' 
                      : 'bg-slate-100 text-slate-600 group-hover:text-sky-700'
                  }`}>
                    {client.category}
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
