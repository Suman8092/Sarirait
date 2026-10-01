import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Terminal, 
  BarChart3, 
  Sparkles, 
  Cpu
} from 'lucide-react';
import { serviceCategories } from '../data/servicesData';
import ServiceIcon from './ServiceIcon';
import SpotlightCard from './SpotlightCard';
import MaskedHeading from './MaskedHeading';
import { sound } from '../utils/sound';
import { useTheme } from '../context/ThemeContext';

export default function ServicesPreview() {
  const { isDark } = useTheme();
  const reduceMotion = useReducedMotion();
  const [activeCategoryId, setActiveCategoryId] = useState(serviceCategories[0].id);

  const activeCategory = serviceCategories.find((c) => c.id === activeCategoryId) || serviceCategories[0];

  const categoryIcons = {
    development: <Terminal className="w-4 h-4" />,
    marketing: <BarChart3 className="w-4 h-4" />,
    creative: <Sparkles className="w-4 h-4" />,
    business: <Cpu className="w-4 h-4" />
  };

  const categoryMeta = {
    development: {
      color: "#00f0ff",
      badgeText: "text-cyan-400",
      badgeBg: "bg-cyan-500/10 border-cyan-500/30",
      accentBorder: "hover:border-cyan-500/40",
      spotlight: "rgba(0, 240, 255, 0.16)",
      glowBorder: "rgba(0, 240, 255, 0.45)"
    },
    marketing: {
      color: "#38bdf8",
      badgeText: "text-sky-400",
      badgeBg: "bg-sky-500/10 border-sky-500/30",
      accentBorder: "hover:border-sky-500/40",
      spotlight: "rgba(56, 189, 248, 0.16)",
      glowBorder: "rgba(56, 189, 248, 0.45)"
    },
    creative: {
      color: "#a855f7",
      badgeText: "text-violet-400",
      badgeBg: "bg-violet-500/10 border-violet-500/30",
      accentBorder: "hover:border-violet-500/40",
      spotlight: "rgba(168, 85, 247, 0.18)",
      glowBorder: "rgba(168, 85, 247, 0.45)"
    },
    business: {
      color: "#6366f1",
      badgeText: "text-indigo-400",
      badgeBg: "bg-indigo-500/10 border-indigo-500/30",
      accentBorder: "hover:border-indigo-500/40",
      spotlight: "rgba(99, 102, 241, 0.16)",
      glowBorder: "rgba(99, 102, 241, 0.45)"
    }
  };

  const meta = categoryMeta[activeCategoryId] || categoryMeta.development;

  return (
    <section 
      id="services" 
      className={`motion-section relative py-20 sm:py-28 transition-colors duration-300 overflow-hidden w-full max-w-full ${
        isDark 
          ? 'text-slate-100' 
          : 'bg-white text-slate-900'
      }`}
    >
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true"
        data-scroll-depth="28"
        className={`ambient-glow absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-[850px] h-[350px] sm:h-[450px] rounded-full blur-[110px] pointer-events-none -z-10 ${
          isDark ? 'bg-cyan-500/5' : 'bg-sky-400/10'
        }`} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* SECTION HEADER */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6"
        >
          <div className="max-w-3xl">
            <div data-motion-reveal className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono-code mb-4 border border-cyan-500/30">
              <span className="motion-status-dot w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className={isDark ? 'text-cyan-400 font-semibold' : 'text-sky-700 font-semibold'}>
                SERVICES &amp; CAPABILITIES // 4 DISCIPLINES
              </span>
            </div>
            <MaskedHeading
              as="h2"
              className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-[1.12]"
              lines={[
                <span key="lead">One dedicated studio for your</span>,
                <span key="accent" className="text-gradient-cyan">brand, website, and growth.</span>
              ]}
            />
          </div>

          <div data-motion-reveal style={{ '--motion-delay': '120ms' }} className="flex flex-col items-start md:items-end gap-3">
            <p className={`text-xs sm:text-sm max-w-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Select a discipline below to preview our core capabilities, deliverables, and architecture frameworks.
            </p>
            <Link
              to="/services"
              onMouseEnter={() => sound.hover()}
              onClick={() => sound.click()}
              className="inline-flex items-center gap-2 text-xs font-mono-code uppercase font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
              <span>Explore All 20+ Capabilities</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* INTERACTIVE CATEGORY SELECTOR TABS */}
        <div data-motion-reveal className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-3 sm:pb-0 mb-8 sm:mb-10 no-scrollbar" aria-label="Service disciplines">
          {serviceCategories.map((cat) => {
            const isSelected = activeCategoryId === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={isSelected}
                aria-controls="services-preview-stage"
                onClick={() => {
                  sound.click();
                  setActiveCategoryId(cat.id);
                }}
                onMouseEnter={() => sound.hover()}
                className={`motion-selector relative px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-mono-code font-bold transition-all duration-300 flex items-center gap-2.5 shrink-0 cursor-pointer border ${
                  isSelected
                    ? isDark
                      ? 'text-white border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                      : 'text-slate-900 border-sky-500 shadow-md shadow-sky-500/10'
                    : isDark
                      ? 'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20'
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-950'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeServiceCategoryPill"
                    className={`absolute inset-0 rounded-2xl ${
                      isDark 
                        ? 'bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-violet-500/10 border-cyan-400/50' 
                        : 'bg-sky-100/80 border-sky-400'
                    }`}
                    transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                
                <span className="relative z-10 opacity-70">{cat.number}</span>
                <span className="relative z-10 flex items-center gap-1.5">
                  {categoryIcons[cat.id]}
                  <span>{cat.title}</span>
                </span>
                <span className={`relative z-10 px-2 py-0.5 rounded-full text-[10px] ${
                  isSelected ? isDark ? 'bg-white/10 text-white' : 'bg-sky-200/70 text-sky-900' : 'bg-white/[0.04] text-slate-400'
                }`}>
                  {cat.services.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* ACTIVE CATEGORY SHOWCASE STAGE */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeCategory.id}
            id="services-preview-stage"
            role="region"
            aria-label={`${activeCategory.title} capabilities`}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Category Context Banner */}
            <div data-motion-reveal className={`p-5 sm:p-7 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
              isDark 
                ? 'bg-[#0c1220]/80 border-white/[0.08]' 
                : 'bg-slate-50 border-slate-200 shadow-sm'
            }`}>
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono-code font-bold uppercase tracking-wider border ${meta.badgeBg} ${meta.badgeText}`}>
                    Discipline {activeCategory.number}
                  </span>
                  <span className={`text-xs font-mono-code ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    // {activeCategory.services.length} Focused Capabilities
                  </span>
                </div>
                <h3 className={`text-lg sm:text-xl font-display font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {activeCategory.title}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {activeCategory.description}
                </p>
              </div>

              <Link
                to={`/services#${activeCategory.id}`}
                onClick={() => sound.click()}
                onMouseEnter={() => sound.hover()}
                className="btn-shimmer px-5 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-cyan-400/40 text-xs font-mono-code font-bold inline-flex items-center gap-2 self-start md:self-auto transition-all"
              >
                <span>View All In Services</span>
                <ArrowRight size={13} className="text-cyan-400" />
              </Link>
            </div>

            {/* Clean Grid of Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {activeCategory.services.map((srv, idx) => (
                <SpotlightCard
                  key={srv.slug}
                  spotlightColor={meta.spotlight}
                  borderColor={meta.glowBorder}
                  tiltIntensity={4.8}
                  elevation={12}
                  data-motion-reveal
                  style={{ '--motion-delay': `${Math.min(idx, 4) * 65}ms` }}
                  onMouseEnter={() => sound.hover()}
                  className={`motion-card p-6 sm:p-7 rounded-2xl sm:rounded-3xl glass-card border transition-all duration-300 flex flex-col justify-between group ${
                    isDark 
                      ? 'bg-[#090d16] border-white/[0.08] hover:border-cyan-500/40' 
                      : 'bg-white border-slate-200 hover:border-sky-400 shadow-sm'
                  }`}
                >
                  <div>
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 ${
                        isDark 
                          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
                          : 'bg-sky-50 border-sky-200 text-sky-600'
                      }`}>
                        <ServiceIcon name={srv.icon} className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-mono-code px-2.5 py-1 rounded-full border ${
                        isDark 
                          ? 'bg-white/[0.03] border-white/10 text-slate-300' 
                          : 'bg-slate-100 border-slate-200 text-slate-600'
                      }`}>
                        {srv.badge}
                      </span>
                    </div>

                    {/* Title & Short Description */}
                    <h4 className={`text-base sm:text-lg font-display font-bold mb-2 group-hover:text-cyan-400 transition-colors ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {srv.title}
                    </h4>
                    <p className={`text-xs leading-relaxed mb-4 line-clamp-2 ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {srv.shortDesc}
                    </p>

                    {/* Key Deliverable Pills */}
                    <div className="space-y-1.5 pt-3 border-t border-current/5">
                      {srv.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-[11px]">
                          <CheckCircle2 size={12} className={isDark ? "text-cyan-400 shrink-0" : "text-sky-600 shrink-0"} />
                          <span className={`truncate ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Link */}
                  <div className="pt-4 mt-4 border-t border-current/5 flex items-center justify-between">
                    <span className="text-[10px] font-mono-code text-cyan-400 font-semibold">
                      {srv.benefits[0]?.value || 'Proven Impact'}
                    </span>
                    <Link
                      to={`/services/${srv.slug}`}
                      onClick={() => sound.click()}
                      className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold uppercase text-slate-300 group-hover:text-cyan-300 transition-colors"
                    >
                      <span>Explore</span>
                      <ArrowUpRight size={13} className="text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
