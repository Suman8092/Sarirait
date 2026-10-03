import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  X,
  Sparkles,
  ShieldCheck,
  Layers,
  ShoppingBag,
  Laptop,
  Smartphone,
  Palette,
  ChevronRight,
  TrendingUp,
  Cpu
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectModal from '../components/ProjectModal';
import CaseStudyModal from '../components/CaseStudyModal';
import { DeviceShowcase3D } from '../components/3d/DeviceShowcase3D';
import { projectsData } from '../data/projects';
import CountUpValue from '../components/CountUpValue';
import MaskedHeading from '../components/MaskedHeading';
import { sound } from '../utils/sound';
import { useTheme } from '../context/ThemeContext';

export default function Work() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const { isDark } = useTheme();
  const reducedMotion = false;

  // Scroll to top and set document title
  useEffect(() => {
    document.title = "Our Work & Case Studies | Sarirait — Brand Design, Websites & Digital Marketing";
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'All', label: 'All Works', icon: <Layers size={14} /> },
    { id: 'E-commerce', label: 'E-commerce', icon: <ShoppingBag size={14} /> },
    { id: 'Websites & Apps', label: 'Websites & Apps', icon: <Laptop size={14} /> },
    { id: 'Mobile Apps', label: 'Mobile Apps', icon: <Smartphone size={14} /> },
    { id: 'Branding & Design', label: 'Branding & Design', icon: <Palette size={14} /> },
  ];

  // Filter & Search Logic
  const filteredProjects = useMemo(() => {
    let result = [...projectsData];

    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) => {
        const clientMatch = p.client?.toLowerCase().includes(q);
        const titleMatch = p.title?.toLowerCase().includes(q);
        const industryMatch = p.industry?.toLowerCase().includes(q);
        const descMatch = p.description?.toLowerCase().includes(q);
        const serviceMatch = p.services?.some((s) => s.toLowerCase().includes(q));
        const techMatch = p.techStack?.some((t) => t.toLowerCase().includes(q));
        return clientMatch || titleMatch || industryMatch || descMatch || serviceMatch || techMatch;
      });
    }

    // Sorting
    if (sortBy === 'newest') {
      result.sort((a, b) => parseInt(b.year || 0) - parseInt(a.year || 0));
    } else if (sortBy === 'client') {
      result.sort((a, b) => a.client.localeCompare(b.client));
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const clearFilters = () => {
    sound.click();
    setActiveCategory('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className={`relative min-h-screen ${
      isDark ? 'bg-[#07090e] text-slate-100' : 'bg-slate-50 text-slate-900'
    } selection:bg-cyan-500/30 selection:text-cyan-200 w-full max-w-full overflow-x-hidden transition-colors duration-200`}>
      {/* Desktop Custom Cursor */}
      {/* Global Navigation */}
      <Navbar onOpenProjectModal={() => setProjectModalOpen(true)} />

      <main className="w-full max-w-full overflow-x-hidden pt-24 sm:pt-32 pb-20">

        {/* ========================================================================= */}
        {/* HERO SECTION */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 sm:mb-20">
          {/* Ambient Lighting */}
          <div className="ambient-glow absolute top-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
          <div className="ambient-glow absolute bottom-0 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono-code mb-6 text-slate-400">
            <Link to="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              Home
            </Link>
            <ChevronRight size={12} className="text-slate-600" />
            <span className="text-cyan-400 font-semibold">Our Work</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-current/10">
            <div data-motion-reveal className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono-code text-cyan-400 mb-4 border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>COMPLETE PORTFOLIO ARCHIVE // 18+ DELIVERIES</span>
              </div>

              <MaskedHeading
                as="h1"
                lines={[
                  'Engineered for scale,',
                  <span key="market-impact" className="text-gradient-cyan">designed for market impact.</span>
                ]}
                className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.1] mb-6"
              />

              <p className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Explore our verified archive of commercial work spanning high-conversion e-commerce storefronts,
                scalable web applications, native mobile apps, and authoritative brand identities delivered by Sarirait.
              </p>
            </div>

            {/* Quick Hero Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4 lg:w-80 shrink-0">
              <div data-motion-reveal style={{ '--motion-delay': '50ms' }} className={`p-4 rounded-2xl border ${
                isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="text-2xl sm:text-3xl font-bold font-display text-cyan-400"><CountUpValue value="18+" /></div>
                <div className="text-xs font-mono-code text-slate-400 uppercase mt-0.5">Verified Works</div>
              </div>
              <div data-motion-reveal style={{ '--motion-delay': '100ms' }} className={`p-4 rounded-2xl border ${
                isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="text-2xl sm:text-3xl font-bold font-display text-violet-400"><CountUpValue value="100%" /></div>
                <div className="text-xs font-mono-code text-slate-400 uppercase mt-0.5">Custom Code</div>
              </div>
              <div data-motion-reveal style={{ '--motion-delay': '150ms' }} className={`p-4 rounded-2xl border ${
                isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="text-2xl sm:text-3xl font-bold font-display text-emerald-400"><CountUpValue value="4.9★" /></div>
                <div className="text-xs font-mono-code text-slate-400 uppercase mt-0.5">Client Rating</div>
              </div>
              <div data-motion-reveal style={{ '--motion-delay': '200ms' }} className={`p-4 rounded-2xl border ${
                isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="text-2xl sm:text-3xl font-bold font-display text-amber-400">₹10Cr+</div>
                <div className="text-xs font-mono-code text-slate-400 uppercase mt-0.5">GMV Impact</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE CONTROLS BAR: CATEGORIES, SEARCH, SORT */}
        {/* ========================================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10 sticky top-[68px] z-30 pointer-events-auto">
          <div className={`p-3 sm:p-4 rounded-2xl backdrop-blur-xl border transition-all shadow-xl ${
            isDark
              ? 'bg-[#0a0e18]/90 border-white/10 shadow-black/40'
              : 'bg-white/95 border-slate-200 shadow-slate-200/60'
          }`}>
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                {categories.map((cat) => {
                  const count = cat.id === 'All'
                    ? projectsData.length
                    : projectsData.filter((p) => p.category === cat.id).length;
                  const isActive = activeCategory === cat.id;

                  return (
                    <motion.button
                      key={cat.id}
                      type="button"
                      aria-pressed={isActive}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        sound.click();
                        setActiveCategory(cat.id);
                      }}
                      onMouseEnter={() => sound.hover()}
                      className={`relative px-3.5 py-2 rounded-xl text-xs font-mono-code font-semibold transition-colors border flex items-center gap-2 whitespace-nowrap cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
                        isActive
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-md shadow-cyan-500/15'
                          : isDark
                            ? 'bg-white/[0.03] text-slate-400 border-white/[0.08] hover:text-white hover:border-white/20'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-200'
                      }`}
                    >
                      {isActive && <motion.span layoutId="work-category-indicator" aria-hidden="true" className="absolute left-3.5 right-3.5 -bottom-px h-0.5 bg-cyan-400 rounded-full" transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} />}
                      <span className={isActive ? 'text-cyan-300' : 'text-slate-400'}>{cat.icon}</span>
                      <span>{cat.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-cyan-400 text-black'
                          : isDark ? 'bg-white/10 text-slate-400' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {count}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Search & Sort Group */}
              <div className="flex items-center gap-3">
                {/* Search Input */}
                <div className={`relative flex-1 sm:w-64 flex items-center rounded-xl border px-3 py-1.5 transition-colors ${
                  isDark ? 'bg-black/40 border-white/10 focus-within:border-cyan-400' : 'bg-slate-100 border-slate-200 focus-within:border-cyan-500'
                }`}>
                  <Search size={14} className="text-slate-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    aria-label="Search projects by client, technology or service"
                    placeholder="Search client, tech, tag..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-xs font-mono-code outline-none placeholder:text-slate-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="p-1 hover:text-cyan-400 text-slate-400 cursor-pointer"
                      title="Clear search"
                      aria-label="Clear project search"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>

                {/* Sort Dropdown */}
                <div className="relative shrink-0">
                  <select
                    aria-label="Sort projects"
                    value={sortBy}
                    onChange={(e) => {
                      sound.click();
                      setSortBy(e.target.value);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-mono-code border outline-none cursor-pointer ${
                      isDark
                        ? 'bg-black/40 text-slate-300 border-white/10 hover:border-white/20'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="newest">Sort: Newest First</option>
                    <option value="client">Sort: Client A-Z</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Search/Filter feedback bar */}
            {(searchQuery || activeCategory !== 'All') && (
              <div className="mt-3 pt-3 border-t border-current/10 flex items-center justify-between text-xs font-mono-code">
                <span className="text-slate-400">
                  Showing <strong className="text-cyan-400">{filteredProjects.length}</strong> of {projectsData.length} projects
                  {searchQuery && <span> matching "<span className={isDark ? 'text-white' : 'text-slate-800'}>{searchQuery}</span>"</span>}
                  {activeCategory !== 'All' && <span> in <span className={isDark ? 'text-white' : 'text-slate-800'}>{activeCategory}</span></span>}
                </span>

                <button
                  onClick={clearFilters}
                  className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <X size={12} />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PROJECTS GRID */}
        {/* ========================================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
          <p className="sr-only" role="status" aria-live="polite">{filteredProjects.length} projects shown{activeCategory !== 'All' ? ` in ${activeCategory}` : ''}{searchQuery ? ` matching ${searchQuery}` : ''}.</p>
          {filteredProjects.length === 0 ? (
            /* Empty State */
            <div className={`text-center py-20 px-6 rounded-3xl border ${
              isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-4">
                <Search size={28} />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">No projects matched your search</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
                Try refining your keyword or explore other disciplines like E-commerce, Mobile Apps, or Branding.
              </p>
              <button
                onClick={clearFilters}
                className="px-5 py-2.5 rounded-full bg-cyan-500 text-black font-semibold text-xs font-mono-code hover:bg-cyan-400 transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                Clear Filters &amp; View All Works
              </button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12, margin: '0px 0px -24px 0px' }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.48, delay: (index % 2) * 0.065, ease: [0.16, 1, 0.3, 1], layout: { duration: 0.35, delay: 0 } }}
                    role="button"
                    tabIndex={0}
                    aria-haspopup="dialog"
                    aria-label={`View ${project.client} case study`}
                    onMouseEnter={() => sound.hover()}
                    data-cursor="view"
                    onClick={() => {
                      sound.click();
                      setSelectedProject(project);
                    }}
                    onKeyDown={(event) => {
                      if (event.key !== 'Enter' && event.key !== ' ') return;
                      event.preventDefault();
                      sound.click();
                      setSelectedProject(project);
                    }}
                    className={`group relative rounded-3xl overflow-hidden border cursor-pointer flex flex-col justify-between shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 ${
                      isDark
                        ? 'glass-card border-white/[0.08] hover:border-cyan-400/60 hover:shadow-cyan-500/15 bg-[#0c1220]/90'
                        : 'bg-white border-slate-200 hover:border-sky-500 shadow-slate-200/80 hover:shadow-2xl hover:shadow-sky-500/15'
                    }`}
                  >
                    {/* Visual Mockup & Logo Header Area */}
                    <div className="relative h-72 sm:h-84 w-full overflow-hidden bg-gradient-to-br from-[#0c1220] to-[#07090e] p-5 sm:p-6 flex flex-col justify-between">
                      {/* Real authentic project visual / logo background with smooth image zoom */}
                      <img
                        src={project.image || project.logo}
                        alt={`${project.client} Showcase`}
                        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 group-focus-visible:scale-108 transition-transform duration-800 ease-out brightness-[0.88] group-hover:brightness-100 group-focus-visible:brightness-100"
                        loading="lazy"
                      />

                      {/* Gradient overlays for contrast and brand tint */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/50 to-black/60 pointer-events-none" />
                      <div className={`absolute inset-0 bg-gradient-to-tr ${project.themeColor} opacity-40 group-hover:opacity-75 transition-opacity duration-500 mix-blend-color-dodge pointer-events-none`} />

                      {/* Top bar with prominent client logo badge */}
                      <div className="relative z-10 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {/* Client logo container */}
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/20 p-1 flex items-center justify-center overflow-hidden shadow-2xl group-hover:border-cyan-400 group-hover:scale-105 transition-all shrink-0">
                            <img
                              src={project.logo}
                              alt={`${project.client} Logo`}
                              className="w-full h-full object-cover rounded-xl"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>

                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="text-sm sm:text-base font-bold text-white font-display tracking-wide drop-shadow-md">
                                {project.client}
                              </span>
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" title="Verified Client Work" />
                            </div>
                            <span className="text-[11px] font-mono-code text-cyan-300 drop-shadow">
                              {project.industry}
                            </span>
                          </div>
                        </div>

                        {/* Arrow Action Badge */}
                        <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white group-hover:bg-cyan-500 group-hover:text-black group-hover:border-cyan-400 transition-all duration-300 shrink-0 shadow-lg">
                          <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>

                      {/* Floating Results Glass Card */}
                      <div className="relative z-10 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/15 p-4 group-hover:border-cyan-500/40 transition-all shadow-2xl">
                        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/[0.08]">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono-code uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold">
                              {project.category}
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
                          <span className="text-slate-500">•</span>
                          <span className="text-xs font-mono-code text-slate-400">{project.year}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-[11px] font-mono-code text-emerald-400">Verified Client</span>
                        </div>
                        <h3 className={`text-xl sm:text-2xl font-display font-bold transition-colors leading-snug group-hover:text-cyan-400 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {project.title}
                        </h3>
                        <p className={`text-sm mt-3 line-clamp-2 leading-relaxed ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {project.description}
                        </p>
                      </div>

                      {/* Tech and Services Pills */}
                      <div className="mt-6 pt-5 border-t border-current/10 flex items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {project.services.slice(0, 2).map((srv, idx) => (
                            <span
                              key={idx}
                              className={`text-xs font-mono-code px-2.5 py-1 rounded border ${
                                isDark
                                  ? 'bg-white/[0.04] text-slate-300 border-white/5'
                                  : 'bg-slate-100 text-slate-700 border-slate-200'
                              }`}
                            >
                              {srv}
                            </span>
                          ))}
                          {project.techStack?.slice(0, 1).map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-xs font-mono-code px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hidden sm:inline-block"
                            >
                              {tech}
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
          )}
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE 3D DEVICE SHOWCASE */}
        {/* ========================================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
            <div data-motion-reveal="scale" className="relative rounded-3xl p-6 sm:p-10 lg:p-16 glass-card border border-cyan-500/20 overflow-hidden bg-gradient-to-b from-[#0c1220]/90 via-[#07090e] to-[#07090e] w-full max-w-full shadow-2xl">
            <div data-motion-reveal className="relative z-10 text-center max-w-3xl mx-auto mb-8">
              <span className="text-xs font-mono-code uppercase tracking-widest text-cyan-400 mb-2 block">
                Interactive Multi-Device Experience
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight leading-[1.15]">
                Seamless responsive architecture across all screens.
              </h2>
              <p className="text-slate-400 text-xs sm:text-base mt-3">
                Explore three featured projects inside the interactive device preview, then open each live website.
              </p>
            </div>

            {/* THE 3D INTERACTIVE DEVICE CANVAS */}
            <DeviceShowcase3D />

            <div className="relative z-10 mt-8 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-around gap-6 text-center">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono-code text-cyan-400">Web &amp; Cloud</div>
                <div className="text-xs text-slate-400 font-mono-code uppercase">Next.js • React • Node</div>
              </div>
              <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono-code text-violet-400">Mobile Apps</div>
                <div className="text-xs text-slate-400 font-mono-code uppercase">Flutter • React Native • iOS</div>
              </div>
              <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono-code text-emerald-400">Commerce</div>
                <div className="text-xs text-slate-400 font-mono-code uppercase">Shopify Plus • Custom D2C</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CLIENT TRUST & DELIVERY STANDARDS */}
        {/* ========================================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div data-motion-reveal style={{ '--motion-delay': '0ms' }} className={`p-6 sm:p-8 rounded-3xl border ${
              isDark ? 'glass-card border-white/10' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-5 border border-cyan-500/20">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-display font-bold mb-2">100% Code &amp; IP Ownership</h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Full source code repositories, design Figma assets, and production credentials are transferred directly to your organization upon project completion.
              </p>
            </div>

            <div data-motion-reveal style={{ '--motion-delay': '90ms' }} className={`p-6 sm:p-8 rounded-3xl border ${
              isDark ? 'glass-card border-white/10' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-5 border border-violet-500/20">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-lg font-display font-bold mb-2">Conversion-First Engineering</h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                We don't build generic brochure sites. Every layout, checkout flow, and call-to-action is meticulously designed to optimize your bottom-line ROI.
              </p>
            </div>

            <div data-motion-reveal style={{ '--motion-delay': '180ms' }} className={`p-6 sm:p-8 rounded-3xl border ${
              isDark ? 'glass-card border-white/10' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 border border-emerald-500/20">
                <Cpu size={24} />
              </div>
              <h3 className="text-lg font-display font-bold mb-2">High-Availability &amp; Scale</h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Engineered on modern cloud architectures (AWS, Vercel, Docker) with sub-second speeds, automated caching, and 99.9% uptime reliability.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* BOTTOM FINAL INQUIRY CTA */}
        {/* ========================================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div data-motion-reveal="scale" className="relative rounded-3xl p-8 sm:p-12 lg:p-16 border border-cyan-500/30 overflow-hidden bg-gradient-to-r from-cyan-950/40 via-[#0c1220] to-purple-950/40 shadow-2xl text-center">
            <div className="ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono-code text-cyan-400 mb-6 border border-cyan-500/30">
              <Sparkles size={13} />
              <span>START A NEW COLLABORATION</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto mb-6">
              Have a project in mind? <br />
              <span className="text-gradient-cyan">Let's engineer something iconic together.</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Schedule an executive briefing with our technical directors. We analyze your requirements and deliver a comprehensive proposal within 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                data-magnetic
                onClick={() => {
                  sound.click();
                  setProjectModalOpen(true);
                }}
                onMouseEnter={() => sound.hover()}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold text-sm font-mono-code shadow-xl shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Initiate Project Consultation</span>
                <ArrowRight size={16} />
              </button>

              <Link
                to="/services"
                onClick={() => sound.click()}
                onMouseEnter={() => sound.hover()}
                className={`w-full sm:w-auto px-6 py-4 rounded-full border text-xs font-mono-code font-semibold transition-all flex items-center justify-center gap-2 ${
                  isDark
                    ? 'border-white/15 bg-white/[0.04] text-white hover:bg-white/10'
                    : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100 shadow-sm'
                }`}
              >
                <span>Browse All Services</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Global Comprehensive Footer */}
      <Footer onOpenProjectModal={() => setProjectModalOpen(true)} />

      {/* Case Study Detailed Modal */}
      <CaseStudyModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenProjectModal={() => {
          setSelectedProject(null);
          setProjectModalOpen(true);
        }}
      />

      {/* Interactive Project Inquiry Briefing Modal */}
      <ProjectModal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </div>
  );
}
