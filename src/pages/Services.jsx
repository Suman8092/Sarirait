import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  ArrowUpRight, 
  CheckCircle2, 
  Search,
  Sparkles, 
  Cpu, 
  Plus, 
  Check, 
  Sliders, 
  Clock, 
  ShieldCheck,
  Send,
  X
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectModal from '../components/ProjectModal';
import ServiceIcon from '../components/ServiceIcon';
import SpotlightCard from '../components/SpotlightCard';
import MaskedHeading from '../components/MaskedHeading';
import { serviceCategories } from '../data/servicesData';
import { sound } from '../utils/sound';
import { useTheme } from '../context/ThemeContext';

export default function Services() {
  const { isDark } = useTheme();
  const { hash } = useLocation();
  const hashCategory = serviceCategories.find(category => `#${category.id}` === hash)?.id;
  const reducedMotion = false;
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [directoryFilters, setDirectoryFilters] = useState(() => ({
    hash,
    category: hashCategory || 'all',
    query: ''
  }));
  // Sync before anchors commit, while keeping manual filters for non-category hashes.
  const filters = directoryFilters.hash !== hash
    ? { hash, category: hashCategory || directoryFilters.category, query: hashCategory ? '' : directoryFilters.query }
    : directoryFilters;
  if (directoryFilters.hash !== hash) setDirectoryFilters(filters);
  const activeTab = filters.category;
  const searchQuery = filters.query;
  const setActiveTab = category => setDirectoryFilters({ ...filters, hash, category });
  const setSearchQuery = query => setDirectoryFilters({ ...filters, hash, query });
  const [scopeFeedback, setScopeFeedback] = useState('');
  const [scopeServices, setScopeServices] = useState([
    'Website Development',
    'Brand Strategy & Branding'
  ]);

  // Flattened all services with category metadata
  const allServices = useMemo(() => {
    return serviceCategories.flatMap(cat => 
      cat.services.map(srv => ({
        ...srv,
        category: cat.id,
        categoryTitle: cat.title,
        categoryNumber: cat.number
      }))
    );
  }, []);

  // Filtered services based on category and search
  const filteredServices = useMemo(() => {
    return allServices.filter(srv => {
      const matchesTab = activeTab === 'all' || srv.category === activeTab;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        srv.title.toLowerCase().includes(q) || 
        srv.shortDesc.toLowerCase().includes(q) ||
        srv.badge.toLowerCase().includes(q) ||
        srv.features.some(f => f.toLowerCase().includes(q));

      return matchesTab && matchesSearch;
    });
  }, [allServices, activeTab, searchQuery]);

  const toggleScope = (title) => {
    sound.click();
    if (scopeServices.includes(title) && scopeServices.length === 1) {
      setScopeFeedback('Keep at least one capability in your project scope.');
      return;
    }
    setScopeFeedback(`${title} ${scopeServices.includes(title) ? 'removed from' : 'added to'} your scope.`);
    setScopeServices(prev => 
      prev.includes(title) 
        ? (prev.length > 1 ? prev.filter(t => t !== title) : prev) 
        : [...prev, title]
    );
  };

  const categoryMeta = {
    development: {
      color: "#00f0ff",
      badge: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
      spotlight: "rgba(0, 240, 255, 0.16)",
      glowBorder: "rgba(0, 240, 255, 0.45)"
    },
    marketing: {
      color: "#38bdf8",
      badge: "text-sky-400 border-sky-500/30 bg-sky-500/10",
      spotlight: "rgba(56, 189, 248, 0.16)",
      glowBorder: "rgba(56, 189, 248, 0.45)"
    },
    creative: {
      color: "#a855f7",
      badge: "text-violet-400 border-violet-500/30 bg-violet-500/10",
      spotlight: "rgba(168, 85, 247, 0.18)",
      glowBorder: "rgba(168, 85, 247, 0.45)"
    },
    business: {
      color: "#6366f1",
      badge: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
      spotlight: "rgba(99, 102, 241, 0.16)",
      glowBorder: "rgba(99, 102, 241, 0.45)"
    }
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-300 w-full max-w-full overflow-x-hidden ${
      isDark 
        ? 'bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200' 
        : 'bg-slate-50 text-slate-900 selection:bg-sky-500/30 selection:text-sky-900'
    }`}>
      {/* Global Navbar */}
      <Navbar onOpenProjectModal={() => setProjectModalOpen(true)} />

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24 w-full max-w-full overflow-x-hidden">
        
        {/* HERO SECTION */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-14 sm:mb-18 text-center">
          {/* Animated Ambient Glow */}
          <div data-scroll-depth="22" aria-hidden="true" className="ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[350px] bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none -z-10" />

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono-code mb-5 border border-cyan-500/30">
              <span className={`w-1.5 h-1.5 rounded-full bg-cyan-400 ${reducedMotion ? '' : 'animate-pulse'}`} />
              <span className={isDark ? 'text-cyan-400 font-semibold' : 'text-sky-700 font-semibold'}>
                FULL-SERVICE DIGITAL STUDIO // 20+ CAPABILITIES
              </span>
            </div>

            <MaskedHeading
              as="h1"
              lines={['Everything your brand needs', <span key="accent" className="text-gradient-cyan">to dominate online.</span>]}
              className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.08] mb-6"
            />

            <p className={`text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-8 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              From bespoke identity and high-performance web engineering to multi-channel customer acquisition and custom cloud tools.
            </p>

            {/* SEARCH & QUICK DISCOVERY BAR */}
            <div className="max-w-xl mx-auto relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                aria-label="Search service capabilities"
                aria-controls="service-capabilities"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search capabilities (e.g. Next.js, SEO, Branding, E-Commerce, Mobile)..."
                className={`w-full pl-11 pr-16 py-3 rounded-full text-xs sm:text-sm font-mono-code transition-all border outline-none ${
                  isDark 
                    ? 'bg-white/[0.04] border-white/10 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:bg-white/[0.07] focus:shadow-lg focus:shadow-cyan-500/10' 
                    : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:shadow-md'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono-code text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}
                >
                  Clear
                </button>
              )}
            </div>

            {/* CATEGORY SELECTOR PILLS */}
            <div role="group" aria-label="Filter service capabilities by category" className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {[
                { id: 'all', label: 'All Capabilities', count: allServices.length },
                { id: 'development', label: 'Web & Apps', count: serviceCategories[0].services.length },
                { id: 'marketing', label: 'Digital Marketing', count: serviceCategories[1].services.length },
                { id: 'creative', label: 'Brand & Creative', count: serviceCategories[2].services.length },
                { id: 'business', label: 'Business Tools', count: serviceCategories[3].services.length }
              ].map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                  <motion.button
                    key={tab.id}
                    aria-pressed={isActive}
                    aria-controls="service-capabilities"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      sound.click();
                      setActiveTab(tab.id);
                    }}
                    onMouseEnter={() => sound.hover()}
                    className={`relative px-4 py-2 rounded-full text-xs font-mono-code font-bold transition-colors duration-300 flex items-center gap-2 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 ${
                      isActive
                        ? isDark
                          ? 'text-white border-cyan-400/60 shadow-lg shadow-cyan-500/20'
                          : 'text-slate-900 border-sky-500 shadow-md shadow-sky-500/10'
                        : isDark
                          ? 'bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20'
                          : 'bg-white border-slate-200 text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="servicesTabGlider"
                        className={`absolute inset-0 rounded-full ${
                          isDark ? 'bg-cyan-500/25 border-cyan-400' : 'bg-sky-100 border-sky-400'
                        }`}
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                    <span className={`relative z-10 text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? isDark ? 'bg-white/20 text-white' : 'bg-sky-200 text-sky-800' : isDark ? 'bg-white/[0.06] text-slate-400' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {tab.count}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
          <p className="sr-only" role="status" aria-live="polite">{scopeFeedback}</p>
        </section>

        {/* DYNAMIC SERVICE CARDS GRID */}
        <section id={activeTab === 'all' ? 'service-directory' : activeTab} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28 scroll-mt-24">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <span role="status" aria-live="polite" className={`text-xs font-mono-code uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Showing {filteredServices.length} of {allServices.length} Capabilities
            </span>

            {searchQuery && (
              <span className="text-xs font-mono-code text-cyan-400 font-bold">
                Filtered by: “{searchQuery}”
              </span>
            )}
            <a href="#project-scope" className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-mono-code transition-colors hover:border-cyan-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${isDark ? 'border-white/10 text-cyan-300' : 'border-sky-200 text-sky-700'}`}>
              <Sliders size={13} />
              <span>Your scope</span>
              <motion.span key={scopeServices.length} initial={{ scale: 0.75 }} animate={{ scale: 1 }} className="rounded-full bg-cyan-500/15 px-2 py-0.5 font-bold">{scopeServices.length}</motion.span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          <motion.div 
            id="service-capabilities"
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((srv, idx) => {
                const meta = categoryMeta[srv.category] || categoryMeta.development;
                const isInScope = scopeServices.includes(srv.title);

                return (
                  <motion.div
                    key={srv.slug}
                    layout="position"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12, margin: '0px 0px -28px 0px' }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.55, delay: (idx % 3) * 0.055, ease: [0.22, 1, 0.36, 1], layout: { duration: 0.35 } }}
                  >
                    <SpotlightCard
                      spotlightColor={meta.spotlight}
                      borderColor={meta.glowBorder}
                      onMouseEnter={() => sound.hover()}
                      className={`p-7 rounded-3xl glass-card border transition-all duration-300 flex flex-col justify-between group h-full ${
                        isDark 
                          ? 'bg-[#090d16] border-white/[0.08] hover:border-cyan-500/40' 
                          : 'bg-white border-slate-200 hover:border-sky-400 shadow-sm'
                      }`}
                    >
                      <div>
                        {/* Top Row: Icon + Badge + Scope Add Button */}
                        <div className="flex items-center justify-between gap-3 mb-5">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 ${
                            isDark 
                              ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
                              : 'bg-sky-50 border-sky-200 text-sky-600'
                          }`}>
                            <ServiceIcon name={srv.icon} className="w-6 h-6" />
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-mono-code px-2.5 py-1 rounded-full border ${meta.badge}`}>
                              {srv.badge}
                            </span>
                            
                            {/* Toggle in interactive scope builder */}
                            <motion.button
                              onClick={() => toggleScope(srv.title)}
                              aria-pressed={isInScope}
                              aria-label={`${isInScope ? 'Remove' : 'Add'} ${srv.title} ${isInScope ? 'from' : 'to'} project scope`}
                              whileTap={reducedMotion ? undefined : { scale: 0.88 }}
                              title={isInScope ? "Remove from my project scope" : "Add to my project scope"}
                              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 ${
                                isInScope
                                  ? 'bg-cyan-400 border-cyan-400 text-black font-bold shadow-md shadow-cyan-400/30 scale-105'
                                  : isDark
                                    ? 'bg-white/[0.04] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                                    : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900'
                              }`}
                            >
                              <motion.span key={isInScope ? 'selected' : 'available'} initial={reducedMotion ? false : { opacity: 0, rotate: -45, scale: 0.7 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} transition={{ duration: 0.2 }}>
                                {isInScope ? <Check size={13} /> : <Plus size={13} />}
                              </motion.span>
                            </motion.button>
                          </div>
                        </div>

                        {/* Title & Short Description */}
                        <h3 className={`text-xl font-display font-bold mb-2 group-hover:text-cyan-400 transition-colors ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {srv.title}
                        </h3>

                        <p className={`text-xs sm:text-sm leading-relaxed mb-5 ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {srv.shortDesc}
                        </p>

                        {/* Key deliverables pills */}
                        <div className="space-y-2 pt-4 border-t border-current/5 mb-6">
                          <span className={`text-[10px] font-mono-code uppercase tracking-wider block font-bold ${
                            isDark ? 'text-slate-500' : 'text-slate-500'
                          }`}>
                            What we engineer:
                          </span>
                          {srv.features.slice(0, 3).map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2 text-xs">
                              <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer Link */}
                      <div className="pt-4 border-t border-current/5 flex items-center justify-between">
                        <span className="text-[11px] font-mono-code text-cyan-400 font-bold">
                          {srv.benefits[0]?.value || 'Proven Impact'}
                        </span>
                        
                        <Link
                          to={`/services/${srv.slug}`}
                          onClick={() => sound.click()}
                          className={`btn-shimmer inline-flex items-center gap-1.5 text-xs font-mono-code font-bold uppercase transition-colors group/link px-3 py-1.5 rounded-full border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${isDark ? 'text-white hover:text-cyan-300 bg-white/[0.04] border-white/10 hover:border-cyan-400/40' : 'text-sky-700 hover:text-sky-900 bg-sky-50 border-sky-200 hover:border-sky-400'}`}
                        >
                          <span>Explore Deeply</span>
                          <ArrowUpRight size={13} className="text-cyan-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
              {filteredServices.length === 0 && (
                <motion.div key="no-capabilities" initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`col-span-full rounded-3xl border px-6 py-14 text-center ${isDark ? 'border-white/10 bg-white/[0.02]' : 'border-slate-200 bg-white'}`}>
                  <Search className="mx-auto mb-4 text-cyan-400" size={28} />
                  <h2 className="font-display text-xl font-bold mb-2">No capabilities match yet.</h2>
                  <p className={`mb-6 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Try a different keyword or explore the full directory.</p>
                  <button onClick={() => setDirectoryFilters({ hash, category: 'all', query: '' })} className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">Reset filters</button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* INTERACTIVE "BUILD YOUR PROJECT SCOPE" SPRINT CALCULATOR */}
        <section id="project-scope" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-24 scroll-mt-24">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7 }}
            className={`p-8 sm:p-12 rounded-3xl border relative overflow-hidden shadow-2xl ${
              isDark 
                ? 'bg-gradient-to-br from-[#0c1222] via-[#070a12] to-[#120e24] border-cyan-500/30' 
                : 'bg-gradient-to-br from-white via-sky-50 to-slate-50 border-sky-300 shadow-xl'
            }`}
          >
            {/* Ambient Background Aura */}
            <div data-scroll-depth="-18" aria-hidden="true" className="ambient-glow absolute top-0 right-0 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Scope Overview */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code mb-3 border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-bold">
                    <Sliders size={13} />
                    <span>INTERACTIVE SPRINT PLANNER</span>
                  </div>
                  <MaskedHeading lines={['Custom-built scope', <span key="accent" className="text-gradient-cyan">for your commercial milestones.</span>]} className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold tracking-tight" />
                  <p className={`text-xs sm:text-sm mt-3 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Select capabilities from the directory above or customize your project brief below. We engineer unified teams around your exact stack and timeline.
                  </p>
                </div>

                {/* Selected Scope Badges */}
                <div className="space-y-2">
                  <div className="text-xs font-mono-code uppercase tracking-wider text-slate-400 font-bold">
                    Active Sprint Scope ({scopeServices.length} Selected):
                  </div>
                  <motion.div layout={!reducedMotion} className="flex flex-wrap gap-2">
                    <AnimatePresence initial={false} mode="popLayout">
                    {scopeServices.map((title) => (
                      <motion.button
                        key={title}
                        layout={!reducedMotion}
                        initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => toggleScope(title)}
                        aria-label={`Remove ${title} from project scope`}
                        title={`Remove ${title} from project scope`}
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-mono-code border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                          isDark 
                            ? 'bg-cyan-500/10 border-cyan-400/40 text-cyan-300' 
                            : 'bg-white border-sky-400 text-sky-800 shadow-xs'
                        }`}
                      >
                        <Check size={12} className="text-cyan-400 font-bold" />
                        <span>{title}</span>
                        <X size={12} className="opacity-60" />
                      </motion.button>
                    ))}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Scope Estimations Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-white/[0.02] border-white/[0.08]' : 'bg-white border-slate-200'}`}>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono-code text-cyan-400 uppercase font-bold mb-1">
                      <Clock size={12} />
                      <span>Sprint Velocity</span>
                    </div>
                    <motion.div key={scopeServices.length <= 2 ? 'short' : scopeServices.length <= 4 ? 'medium' : 'long'} initial={reducedMotion ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-base sm:text-lg font-display font-bold">
                      {scopeServices.length <= 2 ? '2 - 3 Weeks' : scopeServices.length <= 4 ? '4 - 6 Weeks' : '6 - 9 Weeks'}
                    </motion.div>
                  </div>

                  <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-white/[0.02] border-white/[0.08]' : 'bg-white border-slate-200'}`}>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono-code text-violet-400 uppercase font-bold mb-1">
                      <Cpu size={12} />
                      <span>Architecture</span>
                    </div>
                    <div className="text-base sm:text-lg font-display font-bold">
                      100% Custom
                    </div>
                  </div>

                  <div className={`p-3.5 rounded-2xl border col-span-2 sm:col-span-1 ${isDark ? 'bg-white/[0.02] border-white/[0.08]' : 'bg-white border-slate-200'}`}>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono-code text-emerald-400 uppercase font-bold mb-1">
                      <ShieldCheck size={12} />
                      <span>Ownership</span>
                    </div>
                    <div className="text-base sm:text-lg font-display font-bold">
                      Full IP &amp; Code
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Instant Action Callout */}
              <div className={`lg:col-span-5 p-7 sm:p-8 rounded-3xl border flex flex-col justify-between text-center ${
                isDark 
                  ? 'bg-black/60 border-white/[0.08] shadow-2xl' 
                  : 'bg-white border-slate-200 shadow-xl'
              }`}>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4">
                    <Sparkles size={22} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold mb-2">
                    Ready to build this scope?
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    We will convert your selected services into a milestone-based project proposal with transparent deliverables.
                  </p>
                </div>

                <button
                  data-magnetic
                  onClick={() => {
                    sound.click();
                    setProjectModalOpen(true);
                  }}
                  onMouseEnter={() => sound.hover()}
                  className="btn-shimmer w-full py-4 rounded-full font-mono-code font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
                >
                  <span>Start Project With This Scope</span>
                  <Send size={14} />
                </button>
              </div>

            </div>
          </motion.div>
        </section>

      </main>

      {/* Global Footer */}
      <Footer onOpenProjectModal={() => setProjectModalOpen(true)} />

      {/* Interactive Modal */}
      <ProjectModal
        isOpen={projectModalOpen}
        initialServices={scopeServices}
        onClose={() => setProjectModalOpen(false)}
      />
    </div>
  );
}
