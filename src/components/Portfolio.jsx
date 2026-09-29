import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { projectsData } from '../data/projects';
import { DeviceShowcase3D } from './3d/DeviceShowcase3D';
import CaseStudyModal from './CaseStudyModal';
import { sound } from '../utils/sound';

export default function Portfolio({ onOpenProjectModal }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { id: 'All', label: 'Featured (6)' },
    { id: 'E-commerce', label: 'E-commerce' },
    { id: 'Websites & Apps', label: 'Websites & Apps' },
    { id: 'Mobile Apps', label: 'Mobile Apps' },
    { id: 'Branding & Design', label: 'Branding & Design' },
  ];

  // Curated 6 flagship projects representing all key disciplines for home page preview
  const featuredIds = [
    'diarashine-jewelry',
    'rydap-mobility',
    'solaris-motion',
    'archanna-gupta-couture',
    'chabhi-smart-key',
    'anabolic-nutrition'
  ];

  const featuredProjects = projectsData.filter((p) => featuredIds.includes(p.id));

  const filteredProjects = activeCategory === 'All'
    ? featuredProjects
    : projectsData.filter((p) => p.category === activeCategory).slice(0, 4);

  return (
    <section id="work" className="relative py-20 sm:py-28 bg-[#07090e] border-t border-white/[0.06] overflow-hidden w-full max-w-full">
      {/* Background ambient light */}
      <div className="ambient-glow absolute top-1/4 right-0 w-full max-w-[500px] h-[350px] sm:h-[500px] bg-blue-600/10 rounded-full blur-[90px] pointer-events-none -z-10" />
      <div className="ambient-glow absolute bottom-1/4 left-0 w-full max-w-[500px] h-[350px] sm:h-[500px] bg-purple-600/10 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono-code text-cyan-400 mb-4 border border-cyan-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>FEATURED WORK // 18+ DELIVERIES ARCHIVE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-[1.12]">
              Proven work &amp; brand identities <br />
              <span className="text-gradient-cyan">crafted for growing companies.</span>
            </h2>
          </div>
          <div className="flex flex-col sm:items-end gap-3">
            <p className="text-slate-400 text-sm max-w-md sm:text-right leading-relaxed">
              Authentic client deliverables featuring official brand logos, high-conversion e-commerce storefronts, mobile apps, and enterprise web solutions.
            </p>
            <Link
              to="/work"
              onClick={() => sound.click()}
              onMouseEnter={() => sound.hover()}
              className="inline-flex items-center gap-2 text-xs font-mono-code font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group cursor-pointer"
            >
              <span>Explore All 18+ Projects</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* INTERACTIVE CATEGORY FILTER PILLS & ARCHIVE LINK */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {categories.map((cat) => {
              const count = cat.id === 'All' 
                ? featuredProjects.length 
                : projectsData.filter((p) => p.category === cat.id).length;
              const isActive = activeCategory === cat.id;

              return (
                <motion.button
                  key={cat.id}
                  onClick={() => {
                    sound.click();
                    setActiveCategory(cat.id);
                  }}
                  onMouseEnter={() => sound.hover()}
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  className={`px-4 py-2 rounded-full text-xs font-mono-code font-semibold transition-all border flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-lg shadow-cyan-500/15'
                      : 'bg-white/[0.03] text-slate-400 border-white/[0.08] hover:text-white hover:border-white/20'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-cyan-400 text-black font-bold' : 'bg-white/10 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <Link
            to="/work"
            onClick={() => sound.click()}
            onMouseEnter={() => sound.hover()}
            className="text-xs font-mono-code text-slate-400 hover:text-cyan-300 flex items-center gap-1.5 py-1.5 px-3.5 rounded-full border border-white/10 hover:border-cyan-400/40 bg-white/[0.02] transition-colors"
          >
            <span>Full Archive (18 Works)</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* SECTION 11: LARGE PROJECT PRESENTATION CARDS */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => sound.hover()}
                data-cursor="view"
                onClick={() => {
                  sound.click();
                  setSelectedProject(project);
                }}
                className="group relative rounded-3xl glass-card overflow-hidden border border-white/[0.08] hover:border-cyan-500/40 cursor-pointer flex flex-col justify-between shadow-2xl transition-all duration-300"
              >
                {/* Visual Mockup & Logo Header Area */}
                <div className="relative h-72 sm:h-84 w-full overflow-hidden bg-gradient-to-br from-[#0c1220] to-[#07090e] p-5 sm:p-6 flex flex-col justify-between">
                  {/* Real authentic project visual / logo background */}
                  <img
                    src={project.image || project.logo}
                    alt={`${project.client} Logo & Project Showcase`}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.88] group-hover:brightness-100"
                    loading="lazy"
                  />

                  {/* Gradient overlays for contrast and brand tint */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/50 to-black/60 pointer-events-none" />
                  <div className={`absolute inset-0 bg-gradient-to-tr ${project.themeColor} opacity-40 group-hover:opacity-70 transition-opacity duration-500 mix-blend-color-dodge pointer-events-none`} />

                  {/* Top bar with prominent client logo badge */}
                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Authentic client logo container */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/20 p-1 flex items-center justify-center overflow-hidden shadow-2xl group-hover:border-cyan-400 group-hover:scale-105 transition-all shrink-0">
                        <img
                          src={project.logo}
                          alt={`${project.client} Logo`}
                          className="w-full h-full object-cover rounded-xl"
                          loading="lazy"
                          onError={(e) => {
                            // Fallback if image path has issue
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-sm sm:text-base font-bold text-white font-display tracking-wide drop-shadow-md">
                            {project.client}
                          </span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" title="Verified Client" />
                        </div>
                        <span className="text-[11px] font-mono-code text-cyan-300 drop-shadow">
                          {project.industry}
                        </span>
                      </div>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white group-hover:bg-cyan-500 group-hover:text-black group-hover:border-cyan-400 transition-all duration-300 shrink-0 shadow-lg">
                      <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Floating Results & Deliverables Glass Card */}
                  <div className="relative z-10 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/15 p-4 group-hover:border-cyan-500/40 transition-all shadow-2xl">
                    <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/[0.08]">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono-code uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold">
                          Brand Identity &amp; System
                        </span>
                      </div>
                      <span className="text-[10px] font-mono-code text-slate-400 font-semibold tracking-wider">
                        {project.year} // DELIVERED
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {project.results.slice(0, 2).map((res, i) => (
                        <div key={i}>
                          <div className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {res.value}
                          </div>
                          <div className="text-[10px] sm:text-[11px] font-mono-code text-slate-400 uppercase mt-0.5">
                            {res.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Metadata Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono-code text-cyan-400 font-semibold">{project.category}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs font-mono-code text-slate-400">{project.year}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-[11px] font-mono-code text-emerald-400">Authentic Client Work</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm mt-3 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.services.slice(0, 2).map((srv, idx) => (
                        <span key={idx} className="text-xs font-mono-code px-2.5 py-1 rounded bg-white/[0.04] text-slate-300 border border-white/5">
                          {srv}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-bold font-mono-code uppercase text-cyan-400 group-hover:underline flex items-center gap-1 shrink-0">
                      <span>{project.linkText}</span>
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* EXPLORE COMPLETE PORTFOLIO ARCHIVE BANNER */}
        <div className="rounded-3xl p-6 sm:p-8 lg:p-10 mb-20 glass-card border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-[#0a0e18] to-purple-950/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl text-center md:text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono-code mb-3">
              <Sparkles size={13} />
              <span>18+ VERIFIED CASE STUDIES ARCHIVE</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white leading-snug">
              Looking for more industry-specific projects?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
              Explore our complete portfolio page to filter all 18+ projects across E-commerce storefronts, mobile apps, custom SaaS platforms, and brand identities.
            </p>
          </div>
          <Link
            to="/work"
            onClick={() => sound.click()}
            onMouseEnter={() => sound.hover()}
            className="px-7 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold text-xs sm:text-sm font-mono-code flex items-center gap-2 shadow-xl shadow-cyan-500/25 shrink-0 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Explore All 18+ Projects</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* SECTION 12: 3D PROJECT SHOWCASE (FLOATING LAPTOP DEVICE) */}
        <div className="relative rounded-3xl p-4 sm:p-8 lg:p-16 glass-card border border-cyan-500/20 overflow-hidden bg-gradient-to-b from-[#0c1220]/80 via-[#07090e] to-[#07090e] w-full max-w-full">
          
          <div className="relative z-10 text-center max-w-3xl mx-auto mb-6">
            <span className="text-xs font-mono-code uppercase tracking-widest text-cyan-400 mb-2 block">
              Interactive Design Showcase
            </span>
            <h3 className="text-xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight leading-[1.15]">
              “Creative vision, <br className="hidden sm:inline" />engineered for real impact.”
            </h3>
            <p className="text-slate-400 text-xs sm:text-base mt-3">
              Explore how Oreo Digital &amp; Sarirait turn ambitious business concepts into responsive, high-performing digital realities.
            </p>
          </div>

          {/* THE 3D INTERACTIVE DEVICE CANVAS */}
          <DeviceShowcase3D />

          {/* Interactive footer details inside showcase */}
          <div className="relative z-10 mt-8 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-around gap-6 text-center">
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono-code text-cyan-400">Brand</div>
              <div className="text-xs text-slate-400 font-mono-code uppercase">Identity &amp; Packaging</div>
            </div>
            <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono-code text-violet-400">Digital</div>
              <div className="text-xs text-slate-400 font-mono-code uppercase">Web, Store &amp; App</div>
            </div>
            <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono-code text-white">Growth</div>
              <div className="text-xs text-slate-400 font-mono-code uppercase">Marketing &amp; Scale</div>
            </div>
          </div>

        </div>

      </div>

      {/* Case Study Detailed Modal */}
      <CaseStudyModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenProjectModal={onOpenProjectModal}
      />
    </section>
  );
}
