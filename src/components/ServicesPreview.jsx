import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Terminal, BarChart3, Cpu, Sparkles } from 'lucide-react';
import { serviceCategories } from '../data/servicesData';
import ServiceIcon from './ServiceIcon';
import { sound } from '../utils/sound';

export default function ServicesPreview() {
  const categoryIcons = {
    development: <Terminal className="w-5 h-5 text-cyan-400" />,
    marketing: <BarChart3 className="w-5 h-5 text-sky-400" />,
    business: <Cpu className="w-5 h-5 text-indigo-400" />,
    creative: <Sparkles className="w-5 h-5 text-violet-400" />
  };

  const accentBorders = {
    development: "border-cyan-500/30 group-hover:border-cyan-400/70",
    marketing: "border-sky-500/30 group-hover:border-sky-400/70",
    business: "border-indigo-500/30 group-hover:border-indigo-400/70",
    creative: "border-violet-500/30 group-hover:border-violet-400/70"
  };

  const accentGradients = {
    development: "from-cyan-500/10 via-transparent to-transparent",
    marketing: "from-sky-500/10 via-transparent to-transparent",
    business: "from-indigo-500/10 via-transparent to-transparent",
    creative: "from-violet-500/10 via-transparent to-transparent"
  };

  return (
    <section id="services" className="relative py-28 bg-[#07090e] border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-cyan-500/5 rounded-full blur-[200px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono-code text-cyan-400 mb-4 border border-cyan-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>OUR SERVICES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.12]">
              Everything you need to <br />
              <span className="text-gradient-cyan">build, grow and scale.</span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-slate-400 text-sm sm:text-base max-w-sm">
              Integrated engineering, marketing and creative systems designed to create unfair market advantage.
            </p>
            <Link
              to="/services"
              onMouseEnter={() => sound.hover()}
              onClick={() => sound.click()}
              className="inline-flex items-center gap-2 text-xs font-mono-code uppercase font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
              <span>Explore All 22 Services</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 4 MAJOR CATEGORY SHOWCASE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceCategories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onMouseEnter={() => sound.hover()}
              className={`group relative p-8 sm:p-10 rounded-3xl glass-card border bg-gradient-to-br ${accentGradients[cat.id]} ${accentBorders[cat.id]} transition-all duration-300 flex flex-col justify-between`}
            >
              <div>
                {/* Card Top Strip */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:scale-110 transition-transform">
                      {categoryIcons[cat.id]}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono-code text-cyan-400 uppercase tracking-widest block">
                        Category {cat.number}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-cyan-200 transition-colors">
                        {cat.title}
                      </h3>
                    </div>
                  </div>
                  <span className="font-mono-code text-3xl font-extrabold text-white/10 group-hover:text-white/20 transition-colors">
                    {cat.number}
                  </span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {cat.description}
                </p>

                {/* Highlighted Services List */}
                <div className="space-y-2 mb-8">
                  {cat.services.slice(0, 4).map((srv) => (
                    <Link
                      key={srv.slug}
                      to={`/services/${srv.slug}`}
                      onClick={() => sound.click()}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04] hover:border-cyan-500/30 transition-all group/item"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <ServiceIcon name={srv.icon} className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="text-sm font-medium text-slate-300 group-hover/item:text-white truncate">
                          {srv.title}
                        </span>
                      </div>
                      <span className="text-xs font-mono-code text-slate-500 group-hover/item:text-cyan-300 flex items-center gap-1 shrink-0">
                        <span className="hidden sm:inline">Details</span>
                        <ArrowUpRight size={14} className="group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-transform" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs font-mono-code text-slate-500">
                  {cat.services.length} Total Capabilities
                </span>
                <Link
                  to={`/services#${cat.id}`}
                  onClick={() => sound.click()}
                  className="inline-flex items-center gap-2 text-xs font-mono-code font-bold uppercase text-cyan-400 group-hover:text-cyan-300 group-hover:underline"
                >
                  <span>View All Services</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
