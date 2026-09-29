import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  Cpu, 
  Sparkles, 
  Database, 
  Activity, 
  BarChart, 
  Server, 
  Globe 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import ProjectModal from '../components/ProjectModal';
import ServiceIcon from '../components/ServiceIcon';
import { serviceCategories } from '../data/servicesData';
import { sound } from '../utils/sound';

export default function Services() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const devCat = serviceCategories[0];
  const marketingCat = serviceCategories[1];
  const creativeCat = serviceCategories[2];
  const businessCat = serviceCategories[3];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.07,
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 w-full max-w-full overflow-x-hidden">
      <CustomCursor />
      
      {/* Global Navbar */}
      <Navbar onOpenProjectModal={() => setProjectModalOpen(true)} />

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24 w-full max-w-full overflow-x-hidden">
        {/* HERO SECTION */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 sm:mb-20 overflow-hidden w-full max-w-full">
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.16, 0.08] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none -z-10" 
          />

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono-code text-cyan-400 mb-6 border border-cyan-500/30 shadow-lg shadow-cyan-500/5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>DESIGN • DEVELOPMENT • MARKETING</span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.08] mb-6"
            >
              Everything your brand needs <br />
              <span className="text-gradient-cyan">to show up online.</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed mb-10"
            >
              Explore branding and design, websites and apps, e-commerce, marketing and digital tools. Choose one service or start with a wider brief.
            </motion.p>

            {/* Quick Filter Category Pills */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
            >
              {[
                { id: 'all', label: 'All Services' },
                { id: 'development', label: 'Web, Apps & E-commerce' },
                { id: 'marketing', label: 'Marketing' },
                { id: 'creative', label: 'Brand & Design' },
                { id: 'business', label: 'Digital Tools' }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => {
                      sound.click();
                      setActiveTab(tab.id);
                      if (tab.id !== 'all') {
                        const el = document.getElementById(tab.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => sound.hover()}
                    className={`relative px-4 py-2 rounded-full text-xs font-mono-code uppercase font-semibold transition-all border cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-lg shadow-cyan-500/15'
                        : 'bg-white/[0.03] text-slate-400 border-white/[0.08] hover:text-white hover:border-white/20'
                    }`}
                  >
                    {tab.label}
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        </section>

        {/* CATEGORY SECTIONS CONTAINER WITH SMOOTH ANIMATION */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* SECTION 1: DEVELOPMENT SOLUTIONS */}
            {(activeTab === 'all' || activeTab === 'development') && (
              <section id="development" className="py-16 border-t border-white/[0.06] relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-cyan-400 font-mono-code text-xs mb-2">
                        <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">01</span>
                        <span>WE DEVELOP</span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                        {devCat.title}
                      </h2>
                      <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
                        {devCat.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono-code text-slate-500">
                      <Globe size={14} className="text-cyan-400" />
                      <span>Websites • Apps • Online stores</span>
                    </div>
                  </motion.div>

                  {/* 5 Development Service Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {devCat.services.map((srv, idx) => (
                      <motion.div
                        key={srv.slug}
                        custom={idx}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        whileHover={{ y: -7, transition: { duration: 0.22, ease: "easeOut" } }}
                        className="p-7 rounded-3xl glass-card border border-white/[0.08] hover:border-cyan-500/40 transition-colors flex flex-col justify-between group shadow-xl"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-5">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                              <ServiceIcon name={srv.icon} className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-mono-code text-cyan-400 px-2.5 py-1 rounded-full bg-black/40 border border-cyan-500/20">
                              {srv.badge}
                            </span>
                          </div>

                          <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-200 transition-colors">
                            {srv.title}
                          </h3>
                          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                            {srv.shortDesc}
                          </p>

                          {/* Key capabilities list */}
                          <div className="mt-5 pt-4 border-t border-white/[0.06] space-y-2">
                            <span className="text-[11px] font-mono-code uppercase tracking-wider text-slate-500 block">
                              Possible project elements:
                            </span>
                            {srv.features.slice(0, 3).map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                                <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                          <div className="text-[11px] font-mono-code text-cyan-400 font-bold">
                            {srv.benefits[0].value} {srv.benefits[0].label}
                          </div>
                          <Link
                            to={`/services/${srv.slug}`}
                            onClick={() => sound.click()}
                            onMouseEnter={() => sound.hover()}
                            className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold uppercase text-white hover:text-cyan-300 transition-colors group/link"
                          >
                            <span>Explore Service</span>
                            <ArrowUpRight size={14} className="text-cyan-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                </div>
              </section>
            )}

            {/* SECTION 2: DIGITAL MARKETING */}
            {(activeTab === 'all' || activeTab === 'marketing') && (
              <section id="marketing" className="py-20 border-t border-white/[0.06] bg-[#080c16]/50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
                    <motion.div 
                      initial={{ opacity: 0, x: -25 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="lg:col-span-6"
                    >
                      <div className="flex items-center gap-2 text-sky-400 font-mono-code text-xs mb-2">
                        <span className="px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/30">02</span>
                        <span>WE MARKET</span>
                      </div>
                      <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                        {marketingCat.title}
                      </h2>
                      <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
                        {marketingCat.description}
                      </p>
                    </motion.div>

                    {/* MARKETING DASHBOARD-STYLE VISUAL COMPONENT */}
                    <motion.div 
                      initial={{ opacity: 0, x: 25 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="lg:col-span-6 rounded-2xl glass-card border border-sky-500/30 p-6 bg-[#0a0f1d] shadow-2xl relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                        <div className="flex items-center gap-2">
                          <Activity size={16} className="text-sky-400 animate-pulse" />
                          <span className="text-xs font-mono-code text-white font-semibold">A marketing plan can include</span>
                        </div>
                        <span className="text-[10px] font-mono-code text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                          GOALS // AUDIENCE // CHANNELS
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-3 my-4">
                        <motion.div whileHover={{ scale: 1.03 }} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] transition-transform">
                          <span className="text-[10px] font-mono-code text-slate-400 uppercase">Search</span>
                          <div className="text-lg font-bold text-white font-mono-code mt-0.5">Be found</div>
                          <span className="text-[10px] text-emerald-400 font-mono-code">Useful pages</span>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.03 }} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] transition-transform">
                          <span className="text-[10px] font-mono-code text-slate-400 uppercase">Social</span>
                          <div className="text-lg font-bold text-white font-mono-code mt-0.5">Show up</div>
                          <span className="text-[10px] text-sky-400 font-mono-code">Good content</span>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.03 }} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] transition-transform">
                          <span className="text-[10px] font-mono-code text-slate-400 uppercase">Email</span>
                          <div className="text-lg font-bold text-white font-mono-code mt-0.5">Stay in touch</div>
                          <span className="text-[10px] text-violet-400 font-mono-code">Timely updates</span>
                        </motion.div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <div className="flex justify-between text-xs font-mono-code text-slate-400">
                          <span>Choose channels to suit your audience</span>
                          <span className="text-sky-400">Plan • Publish • Learn</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden flex">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '40%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full bg-sky-400" 
                          />
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '33%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full bg-blue-500" 
                          />
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '27%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full bg-violet-500" 
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Marketing Services Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {marketingCat.services.map((srv, idx) => (
                      <motion.div
                        key={srv.slug}
                        custom={idx}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        whileHover={{ y: -7, transition: { duration: 0.22, ease: "easeOut" } }}
                        className="p-7 rounded-3xl glass-card border border-white/[0.08] hover:border-sky-500/40 transition-colors flex flex-col justify-between group shadow-xl"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                              <ServiceIcon name={srv.icon} className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-mono-code text-sky-300 px-2.5 py-1 rounded-full bg-black/40 border border-sky-500/20">
                              {srv.badge}
                            </span>
                          </div>

                          <h3 className="text-xl font-display font-bold text-white group-hover:text-sky-200 transition-colors">
                            {srv.title}
                          </h3>
                          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                            {srv.shortDesc}
                          </p>

                          <div className="mt-5 pt-4 border-t border-white/[0.06] space-y-2">
                            {srv.features.slice(0, 3).map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                                <CheckCircle2 size={13} className="text-sky-400 shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                          <div className="text-[11px] font-mono-code text-sky-400 font-bold">
                            {srv.benefits[0].value} {srv.benefits[0].label}
                          </div>
                          <Link
                            to={`/services/${srv.slug}`}
                            onClick={() => sound.click()}
                            onMouseEnter={() => sound.hover()}
                            className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold uppercase text-white hover:text-sky-300 transition-colors group/link"
                          >
                            <span>Explore Service</span>
                            <ArrowUpRight size={14} className="text-sky-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                </div>
              </section>
            )}

            {/* SECTION 3: CREATIVE SERVICES */}
            {(activeTab === 'all' || activeTab === 'creative') && (
              <section id="creative" className="py-20 border-t border-white/[0.06] bg-[#0a0814]/50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-violet-400 font-mono-code text-xs mb-2">
                        <span className="px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/30">03</span>
                        <span>WE DESIGN</span>
                      </div>
                      <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                        {creativeCat.title}
                      </h2>
                      <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl">
                        {creativeCat.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono-code text-slate-500">
                      <Sparkles size={14} className="text-violet-400 animate-pulse" />
                      <span>Identity • Graphics • Packaging • Video</span>
                    </div>
                  </motion.div>

                  {/* Creative Services Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {creativeCat.services.map((srv, idx) => (
                      <motion.div
                        key={srv.slug}
                        custom={idx}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        whileHover={{ y: -7, transition: { duration: 0.22, ease: "easeOut" } }}
                        className="p-7 rounded-3xl glass-card border border-white/[0.08] hover:border-violet-500/40 transition-colors flex flex-col justify-between group shadow-xl"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                              <ServiceIcon name={srv.icon} className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-mono-code text-violet-300 px-2.5 py-1 rounded-full bg-black/40 border border-violet-500/20">
                              {srv.badge}
                            </span>
                          </div>

                          <h3 className="text-xl font-display font-bold text-white group-hover:text-violet-200 transition-colors">
                            {srv.title}
                          </h3>
                          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                            {srv.shortDesc}
                          </p>

                          <div className="mt-5 pt-4 border-t border-white/[0.06] space-y-2">
                            {srv.features.slice(0, 3).map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                                <CheckCircle2 size={13} className="text-violet-400 shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                          <div className="text-[11px] font-mono-code text-violet-400 font-bold">
                            {srv.benefits[0].value} {srv.benefits[0].label}
                          </div>
                          <Link
                            to={`/services/${srv.slug}`}
                            onClick={() => sound.click()}
                            onMouseEnter={() => sound.hover()}
                            className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold uppercase text-white hover:text-violet-300 transition-colors group/link"
                          >
                            <span>Explore Service</span>
                            <ArrowUpRight size={14} className="text-violet-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                </div>
              </section>
            )}

            {/* SECTION 4: BUSINESS SOLUTIONS */}
            {(activeTab === 'all' || activeTab === 'business') && (
              <section id="business" className="py-20 border-t border-white/[0.06] relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
                    <motion.div 
                      initial={{ opacity: 0, x: -25 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="lg:col-span-6"
                    >
                      <div className="flex items-center gap-2 text-indigo-400 font-mono-code text-xs mb-2">
                        <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30">04</span>
                        <span>DIGITAL BUSINESS TOOLS</span>
                      </div>
                      <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                        {businessCat.title}
                      </h2>
                      <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
                        {businessCat.description}
                      </p>
                    </motion.div>

                    {/* ENTERPRISE DASHBOARD PREVIEW UI */}
                    <motion.div 
                      initial={{ opacity: 0, x: 25 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="lg:col-span-6 rounded-2xl glass-card border border-indigo-500/30 p-6 bg-[#0a0d1a] shadow-2xl relative"
                    >
                      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                        <div className="flex items-center gap-2">
                          <Server size={16} className="text-indigo-400" />
                          <span className="text-xs font-mono-code text-white font-semibold">Plan tools around your team</span>
                        </div>
                        <span className="text-[10px] font-mono-code text-cyan-400">WORKFLOW // PEOPLE // TOOLS</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 my-4">
                        <motion.div whileHover={{ scale: 1.03 }} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] transition-transform">
                          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono-code mb-1">
                            <Database size={13} className="text-cyan-400" />
                            <span>TEAM WORKFLOW</span>
                          </div>
                          <div className="text-base font-bold text-white font-mono-code">Understand</div>
                          <span className="text-[10px] text-slate-500 font-mono-code">Map current steps</span>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.03 }} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] transition-transform">
                          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono-code mb-1">
                            <BarChart size={13} className="text-indigo-400" />
                            <span>USEFUL SOFTWARE</span>
                          </div>
                          <div className="text-base font-bold text-white font-mono-code">Choose tools</div>
                          <span className="text-[10px] text-emerald-400 font-mono-code">Fit the real need</span>
                        </motion.div>
                      </div>

                      <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-slate-300 flex items-center justify-between">
                        <span>Agree the scope before implementation</span>
                        <span className="font-mono-code text-indigo-300">Clear next steps</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Business Services Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {businessCat.services.map((srv, idx) => (
                      <motion.div
                        key={srv.slug}
                        custom={idx}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        whileHover={{ y: -7, transition: { duration: 0.22, ease: "easeOut" } }}
                        className="p-7 rounded-3xl glass-card border border-white/[0.08] hover:border-indigo-500/40 transition-colors flex flex-col justify-between group shadow-xl"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                              <ServiceIcon name={srv.icon} className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-mono-code text-indigo-300 px-2.5 py-1 rounded-full bg-black/40 border border-indigo-500/20">
                              {srv.badge}
                            </span>
                          </div>

                          <h3 className="text-xl font-display font-bold text-white group-hover:text-indigo-200 transition-colors">
                            {srv.title}
                          </h3>
                          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                            {srv.shortDesc}
                          </p>

                          <div className="mt-5 pt-4 border-t border-white/[0.06] space-y-2">
                            {srv.features.slice(0, 3).map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                                <CheckCircle2 size={13} className="text-indigo-400 shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                          <div className="text-[11px] font-mono-code text-indigo-400 font-bold">
                            {srv.benefits[0].value} {srv.benefits[0].label}
                          </div>
                          <Link
                            to={`/services/${srv.slug}`}
                            onClick={() => sound.click()}
                            onMouseEnter={() => sound.hover()}
                            className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold uppercase text-white hover:text-indigo-300 transition-colors group/link"
                          >
                            <span>Explore Service</span>
                            <ArrowUpRight size={14} className="text-indigo-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>

        {/* BOTTOM INVITATION CTA BANNER */}
        <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="p-10 sm:p-14 rounded-3xl glass-card border border-cyan-500/30 text-center relative overflow-hidden bg-gradient-to-r from-cyan-950/20 via-[#07090e] to-violet-950/20 shadow-2xl"
          >
            <div className="ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none -z-10" />

            <h3 className="text-xl sm:text-3xl font-display font-bold text-white mb-4">
              Need a mix of services?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8">
              We can discuss how brand, website and marketing work could fit together around your goals.
            </p>
            <motion.button
              onClick={() => {
                sound.click();
                setProjectModalOpen(true);
              }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onMouseEnter={() => sound.hover()}
              className="px-8 py-3.5 rounded-full font-semibold text-xs tracking-wider uppercase bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-xl shadow-cyan-500/25 hover:brightness-110 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Tell Us About Your Project</span>
              <ArrowRight size={15} />
            </motion.button>
          </motion.div>
        </section>

      </main>

      {/* Global Footer */}
      <Footer onOpenProjectModal={() => setProjectModalOpen(true)} />

      {/* Interactive Modal */}
      <ProjectModal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </div>
  );
}
