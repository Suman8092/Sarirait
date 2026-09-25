import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      <CustomCursor />
      
      {/* Global Navbar */}
      <Navbar onOpenProjectModal={() => setProjectModalOpen(true)} />

      <main className="pt-32 pb-24">
        {/* HERO SECTION */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono-code text-cyan-400 mb-6 border border-cyan-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>SARIRAIT CAPABILITIES DIRECTORY</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.08] mb-6">
              Solutions Built for <br />
              <span className="text-gradient-cyan">Digital Growth.</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
              From development and business software to digital marketing, branding and AI, 
              Sarirait delivers integrated solutions designed around your goals.
            </p>

            {/* Quick Filter Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {[
                { id: 'all', label: 'All 22 Capabilities' },
                { id: 'development', label: 'Development' },
                { id: 'marketing', label: 'Digital Marketing' },
                { id: 'creative', label: 'Creative Services' },
                { id: 'business', label: 'Business Solutions' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    sound.click();
                    setActiveTab(tab.id);
                    if (tab.id !== 'all') {
                      const el = document.getElementById(tab.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  onMouseEnter={() => sound.hover()}
                  className={`px-4 py-2 rounded-full text-xs font-mono-code uppercase font-semibold transition-all border ${
                    activeTab === tab.id
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-lg shadow-cyan-500/10'
                      : 'bg-white/[0.03] text-slate-400 border-white/[0.08] hover:text-white hover:border-white/20'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 1: DEVELOPMENT SOLUTIONS */}
        {(activeTab === 'all' || activeTab === 'development') && (
          <section id="development" className="py-16 border-t border-white/[0.06]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 font-mono-code text-xs mb-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">01</span>
                    <span>DEVELOPMENT SOLUTIONS</span>
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
                  <span>Next.js • React • Flutter • Full-Stack</span>
                </div>
              </div>

              {/* 6 Large Service Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {devCat.services.map((srv, idx) => (
                  <div
                    key={srv.slug}
                    className="p-7 rounded-3xl glass-card border border-white/[0.08] hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
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
                          Core Capabilities:
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
                        className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold uppercase text-white hover:text-cyan-300 transition-colors"
                      >
                        <span>Explore Service</span>
                        <ArrowUpRight size={14} className="text-cyan-400" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* SECTION 2: DIGITAL MARKETING */}
        {(activeTab === 'all' || activeTab === 'marketing') && (
          <section id="marketing" className="py-20 border-t border-white/[0.06] bg-[#080c16]/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
                <div className="lg:col-span-6">
                  <div className="flex items-center gap-2 text-sky-400 font-mono-code text-xs mb-2">
                    <span className="px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/30">02</span>
                    <span>DIGITAL MARKETING</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
                    {marketingCat.title}
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
                    {marketingCat.description} We merge predictive audience segmentation with high-frequency creative experimentation to maximize CAC-to-LTV ratios.
                  </p>
                </div>

                {/* MARKETING DASHBOARD-STYLE VISUAL COMPONENT */}
                <div className="lg:col-span-6 rounded-2xl glass-card border border-sky-500/30 p-6 bg-[#0a0f1d] shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2">
                      <Activity size={16} className="text-sky-400" />
                      <span className="text-xs font-mono-code text-white font-semibold">Live Omnichannel Performance Telemetry</span>
                    </div>
                    <span className="text-[10px] font-mono-code text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      ROAS 4.8x // OPTIMIZED
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 my-4">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <span className="text-[10px] font-mono-code text-slate-400 uppercase">Organic Search</span>
                      <div className="text-lg font-bold text-white font-mono-code mt-0.5">+240%</div>
                      <span className="text-[10px] text-emerald-400 font-mono-code">↑ High Intent</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <span className="text-[10px] font-mono-code text-slate-400 uppercase">Blended CPA</span>
                      <div className="text-lg font-bold text-white font-mono-code mt-0.5">-38.5%</div>
                      <span className="text-[10px] text-sky-400 font-mono-code">↓ Cost Savings</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <span className="text-[10px] font-mono-code text-slate-400 uppercase">Retention Rate</span>
                      <div className="text-lg font-bold text-white font-mono-code mt-0.5">88.2%</div>
                      <span className="text-[10px] text-violet-400 font-mono-code">↑ Klaviyo &amp; WA</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs font-mono-code text-slate-400">
                      <span>Campaign Allocation (Meta, Google, SEO)</span>
                      <span className="text-sky-400">99.4% Delivery Efficiency</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden flex">
                      <div className="h-full bg-sky-400 w-2/5" />
                      <div className="h-full bg-blue-500 w-1/3" />
                      <div className="h-full bg-violet-500 w-1/4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Marketing 6 Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {marketingCat.services.map((srv) => (
                  <div
                    key={srv.slug}
                    className="p-7 rounded-3xl glass-card border border-white/[0.08] hover:border-sky-500/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
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
                        className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold uppercase text-white hover:text-sky-300 transition-colors"
                      >
                        <span>Explore Service</span>
                        <ArrowUpRight size={14} className="text-sky-400" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* SECTION 3: CREATIVE SERVICES */}
        {(activeTab === 'all' || activeTab === 'creative') && (
          <section id="creative" className="py-20 border-t border-white/[0.06] bg-[#0a0814]/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-violet-400 font-mono-code text-xs mb-2">
                    <span className="px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/30">03</span>
                    <span>CREATIVE SERVICES</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
                    {creativeCat.title}
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl">
                    {creativeCat.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono-code text-slate-500">
                  <Sparkles size={14} className="text-violet-400" />
                  <span>Branding • Design • Packaging • Video Marketing</span>
                </div>
              </div>

              {/* Creative Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creativeCat.services.map((srv) => (
                  <div
                    key={srv.slug}
                    className="p-7 rounded-3xl glass-card border border-white/[0.08] hover:border-violet-500/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
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
                        className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold uppercase text-white hover:text-violet-300 transition-colors"
                      >
                        <span>Explore Service</span>
                        <ArrowUpRight size={14} className="text-violet-400" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* SECTION 4: BUSINESS SOLUTIONS */}
        {(activeTab === 'all' || activeTab === 'business') && (
          <section id="business" className="py-20 border-t border-white/[0.06]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
                <div className="lg:col-span-6">
                  <div className="flex items-center gap-2 text-indigo-400 font-mono-code text-xs mb-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30">04</span>
                    <span>BUSINESS SOLUTIONS</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
                    {businessCat.title}
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
                    {businessCat.description} From bespoke ERP and CRM systems to multi-tenant SaaS and auto-scaling cloud microservices.
                  </p>
                </div>

                {/* ENTERPRISE DASHBOARD PREVIEW UI */}
                <div className="lg:col-span-6 rounded-2xl glass-card border border-indigo-500/30 p-6 bg-[#0a0d1a] shadow-2xl relative">
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2">
                      <Server size={16} className="text-indigo-400" />
                      <span className="text-xs font-mono-code text-white font-semibold">Sarirait Enterprise Resource Mesh</span>
                    </div>
                    <span className="text-[10px] font-mono-code text-cyan-400">Kubernetes // Multi-Region</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 my-4">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-mono-code mb-1">
                        <Database size={13} className="text-cyan-400" />
                        <span>ERP LEDGER STATUS</span>
                      </div>
                      <div className="text-base font-bold text-white font-mono-code">Synchronized</div>
                      <span className="text-[10px] text-slate-500 font-mono-code">Enterprise Integration</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-mono-code mb-1">
                        <BarChart size={13} className="text-indigo-400" />
                        <span>SaaS SUBSCRIPTIONS</span>
                      </div>
                      <div className="text-base font-bold text-white font-mono-code">$2.4M ARR</div>
                      <span className="text-[10px] text-emerald-400 font-mono-code">+42% YoY Growth</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-slate-300 flex items-center justify-between">
                    <span>Active Microservices: <strong>48 Pods</strong></span>
                    <span className="font-mono-code text-indigo-300">0.00% Error Rate</span>
                  </div>
                </div>
              </div>

              {/* Business Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businessCat.services.map((srv) => (
                  <div
                    key={srv.slug}
                    className="p-7 rounded-3xl glass-card border border-white/[0.08] hover:border-indigo-500/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
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
                        className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold uppercase text-white hover:text-indigo-300 transition-colors"
                      >
                        <span>Explore Service</span>
                        <ArrowUpRight size={14} className="text-indigo-400" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* BOTTOM INVITATION CTA BANNER */}
        <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-10 sm:p-14 rounded-3xl glass-card border border-cyan-500/30 text-center relative overflow-hidden bg-gradient-to-r from-cyan-950/20 via-[#07090e] to-violet-950/20">
            <h3 className="text-2xl sm:text-4xl font-display font-bold text-white mb-4">
              Need a custom multi-discipline engagement?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8">
              We frequently combine engineering, marketing and creative services for high-velocity full-lifecycle project sprints.
            </p>
            <button
              onClick={() => {
                sound.click();
                setProjectModalOpen(true);
              }}
              onMouseEnter={() => sound.hover()}
              className="px-8 py-3.5 rounded-full font-semibold text-xs tracking-wider uppercase bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-xl shadow-cyan-500/25 hover:brightness-110 transition-all inline-flex items-center gap-2"
            >
              <span>Schedule Discovery Briefing</span>
              <ArrowRight size={15} />
            </button>
          </div>
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
