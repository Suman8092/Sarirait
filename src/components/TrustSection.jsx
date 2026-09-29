import React from 'react';
import SpotlightCard from './SpotlightCard';
import { sound } from '../utils/sound';
import TiltCard from './effects/TiltCard';
import TextScramble from './effects/TextScramble';

export default function TrustSection() {
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
    <section id="trust" className="relative py-16 sm:py-20 border-y border-white/[0.06] bg-[#070a10] overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <TextScramble
            text="A CONNECTED DIGITAL PRESENCE // SARIRAIT"
            triggerOnHover={true}
            className="text-xs font-mono-code uppercase tracking-widest text-cyan-400 mb-3 block"
          />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
            “Make every digital touchpoint feel like your brand.”
          </h2>
          <p className="text-slate-400 text-xs sm:text-base mt-4">
            Bring your identity, website and marketing into one clear experience—from the first impression to the next customer action.
          </p>
        </div>

        {/* 4 CORE STATS GRID WITH LUSION 3D PERSPECTIVE TILT & UTSUBO CROSSHAIRS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-16">
          {stats.map((stat, i) => (
            <TiltCard
              key={i}
              maxTilt={10}
              glare={true}
              crosshairs={true}
              onMouseEnter={() => sound.hover()}
              className="p-4 sm:p-8 rounded-2xl glass-card border border-white/[0.08] hover:border-cyan-500/40 group transition-colors h-full flex flex-col justify-center"
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
            </TiltCard>
          ))}
        </div>

        {/* AUTHENTIC CLIENT BRAND LOGOS MARQUEE */}
        <div className="relative overflow-hidden py-6 border-t border-white/[0.05]">
          <div className="text-center mb-4">
            <span className="text-[11px] font-mono-code uppercase tracking-widest text-slate-500">
              Trusted by Ambitious Brands Across India &amp; Globally // Sarirait
            </span>
          </div>

          {/* Gradient fade edge masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#070a10] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#070a10] to-transparent z-10 pointer-events-none" />

          {/* Infinite Seamless Looping Marquee Track */}
          <div className="flex w-max animate-marquee-infinite">
            {/* Primary Track */}
            <div className="flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6">
              {[...clientBrands, ...clientBrands].map((client, idx) => (
                <div
                  key={`client-track1-${idx}`}
                  onMouseEnter={() => sound.hover()}
                  className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/40 hover:bg-white/[0.08] transition-all cursor-default group"
                >
                  <div className="w-8 h-8 rounded-xl bg-black/80 border border-white/10 p-0.5 overflow-hidden shrink-0 group-hover:border-cyan-400/60 transition-colors">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-display font-bold text-sm tracking-wide text-slate-200 group-hover:text-white transition-colors">
                    {client.name}
                  </span>
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-400 group-hover:text-cyan-300 transition-colors">
                    {client.category}
                  </span>
                </div>
              ))}
            </div>

            {/* Seamless Clone Track */}
            <div className="flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6" aria-hidden="true">
              {[...clientBrands, ...clientBrands].map((client, idx) => (
                <div
                  key={`client-track2-${idx}`}
                  onMouseEnter={() => sound.hover()}
                  className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/40 hover:bg-white/[0.08] transition-all cursor-default group"
                >
                  <div className="w-8 h-8 rounded-xl bg-black/80 border border-white/10 p-0.5 overflow-hidden shrink-0 group-hover:border-cyan-400/60 transition-colors">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-display font-bold text-sm tracking-wide text-slate-200 group-hover:text-white transition-colors">
                    {client.name}
                  </span>
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-400 group-hover:text-cyan-300 transition-colors">
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
