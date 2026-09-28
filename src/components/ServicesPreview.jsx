import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Terminal, BarChart3, Cpu, Sparkles } from 'lucide-react';
import { serviceCategories } from '../data/servicesData';
import ServiceIcon from './ServiceIcon';
import { sound } from '../utils/sound';

export default function ServicesPreview() {
  const categoryMeta = {
    development: {
      icon: <Terminal className="w-4 h-4 text-cyan-400" />,
      badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      accentBorder: "border-cyan-500/20 hover:border-cyan-500/50",
      accentGradient: "from-cyan-500/10 via-transparent to-transparent",
      iconColor: "text-cyan-400 group-hover/srv:text-cyan-300",
      iconBg: "bg-cyan-500/10 text-cyan-400",
      lineGradient: "from-cyan-500/40 via-cyan-500/10 to-transparent",
      glowColor: "rgba(0, 240, 255, 0.15)"
    },
    marketing: {
      icon: <BarChart3 className="w-4 h-4 text-sky-400" />,
      badgeBg: "bg-sky-500/10 text-sky-400 border-sky-500/30",
      accentBorder: "border-sky-500/20 hover:border-sky-500/50",
      accentGradient: "from-sky-500/10 via-transparent to-transparent",
      iconColor: "text-sky-400 group-hover/srv:text-sky-300",
      iconBg: "bg-sky-500/10 text-sky-400",
      lineGradient: "from-sky-500/40 via-sky-500/10 to-transparent",
      glowColor: "rgba(56, 189, 248, 0.15)"
    },
    creative: {
      icon: <Sparkles className="w-4 h-4 text-violet-400" />,
      badgeBg: "bg-violet-500/10 text-violet-400 border-violet-500/30",
      accentBorder: "border-violet-500/20 hover:border-violet-500/50",
      accentGradient: "from-violet-500/10 via-transparent to-transparent",
      iconColor: "text-violet-400 group-hover/srv:text-violet-300",
      iconBg: "bg-violet-500/10 text-violet-400",
      lineGradient: "from-violet-500/40 via-violet-500/10 to-transparent",
      glowColor: "rgba(138, 43, 226, 0.15)"
    },
    business: {
      icon: <Cpu className="w-4 h-4 text-indigo-400" />,
      badgeBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      accentBorder: "border-indigo-500/20 hover:border-indigo-500/50",
      accentGradient: "from-indigo-500/10 via-transparent to-transparent",
      iconColor: "text-indigo-400 group-hover/srv:text-indigo-300",
      iconBg: "bg-indigo-500/10 text-indigo-400",
      lineGradient: "from-indigo-500/40 via-indigo-500/10 to-transparent",
      glowColor: "rgba(99, 102, 241, 0.15)"
    }
  };

  return (
    <section id="services" className="relative py-20 sm:py-28 bg-[#07090e] border-t border-white/[0.06] overflow-hidden w-full max-w-full">
      {/* Background ambient lighting */}
      <div className="ambient-glow absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[350px] sm:h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="ambient-glow absolute bottom-1/4 right-1/4 w-[600px] h-[400px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono-code text-cyan-400 mb-4 border border-cyan-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>DESIGN • DEVELOPMENT • MARKETING</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-[1.12]">
              One team for your <br />
              <span className="text-gradient-cyan">brand, website and growth.</span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-slate-400 text-sm sm:text-base max-w-sm">
              From a new identity to a better website and a stronger marketing plan, choose the support that fits your next step.
            </p>
            <Link
              to="/services"
              onMouseEnter={() => sound.hover()}
              onClick={() => sound.click()}
              className="inline-flex items-center gap-2 text-xs font-mono-code uppercase font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
              <span>Explore Our Services</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 4 MAJOR CATEGORY SHOWCASE CARDS (2x2 Balanced Layout Matching Services Spec) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {serviceCategories.map((cat, index) => {
            const meta = categoryMeta[cat.id] || categoryMeta.development;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onMouseEnter={() => sound.hover()}
                className={`group relative p-6 sm:p-8 rounded-3xl glass-card border bg-gradient-to-br ${meta.accentGradient} ${meta.accentBorder} transition-all duration-300 flex flex-col justify-between shadow-xl`}
              >
                <div>
                  {/* Category Header with Pill, Icon, Title and Horizontal Divider Line */}
                  <div className="flex items-center gap-3 pb-4 mb-4 border-b border-white/[0.08] relative">
                    {/* Number Badge */}
                    <span className={`font-mono-code text-xs font-bold px-2 py-0.5 rounded border ${meta.badgeBg}`}>
                      {cat.number}
                    </span>

                    {/* Category Title & Icon */}
                    <div className="flex items-center gap-2 min-w-0">
                      {meta.icon}
                      <h3 className="text-base sm:text-lg font-display font-extrabold uppercase tracking-wider text-white">
                        {cat.title}
                      </h3>
                    </div>

                    {/* Decorative gradient horizontal line extending across */}
                    <div className={`hidden sm:block flex-1 h-px bg-gradient-to-r ${meta.lineGradient} ml-2`} />
                  </div>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {cat.description}
                  </p>

                  {/* ALL SERVICES LIST WITH ICONS (Shows all services per category) */}
                  <div className="space-y-1.5 mb-6">
                    {cat.services.map((srv) => (
                      <Link
                        key={srv.slug}
                        to={`/services/${srv.slug}`}
                        onClick={() => sound.click()}
                        onMouseEnter={() => sound.hover()}
                        className="group/srv flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.03] hover:border-white/10 transition-all duration-200"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`p-1.5 rounded-lg ${meta.iconBg} transition-transform group-hover/srv:scale-110 shrink-0`}>
                            <ServiceIcon name={srv.icon} className="w-4 h-4" />
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-slate-300 group-hover/srv:text-white transition-colors truncate">
                            {srv.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 opacity-60 group-hover/srv:opacity-100 transition-opacity">
                          <span className="text-[11px] font-mono-code text-slate-500 group-hover/srv:text-cyan-300 hidden sm:inline">
                            Explore
                          </span>
                          <ArrowUpRight
                            size={14}
                            className="text-slate-400 group-hover/srv:text-cyan-300 group-hover/srv:translate-x-0.5 group-hover/srv:-translate-y-0.5 transition-transform"
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs font-mono-code text-slate-500">
                    {cat.services.length} Capabilities
                  </span>
                  <Link
                    to={`/services#${cat.id}`}
                    onClick={() => sound.click()}
                    onMouseEnter={() => sound.hover()}
                    className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold uppercase text-cyan-400 hover:text-cyan-300 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>View Category Details</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
