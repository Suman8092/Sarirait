import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  ChevronDown, 
  Layers, 
  Sparkles, 
  Clock, 
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import ProjectModal from '../components/ProjectModal';
import ServiceIcon from '../components/ServiceIcon';
import { getServiceBySlug } from '../data/servicesData';
import { sound } from '../utils/sound';

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const service = getServiceBySlug(slug);

  // Scroll to top upon navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#07090e] text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-display font-bold mb-4">Service Not Found</h2>
        <p className="text-slate-400 mb-8 max-w-md">
          The requested service capability could not be located in our directory.
        </p>
        <Link
          to="/services"
          className="px-6 py-3 rounded-full bg-cyan-500 text-black font-semibold text-sm"
        >
          View All Services →
        </Link>
      </div>
    );
  }

  const category = service.categoryData;

  const faqs = [
    {
      q: `What is the typical timeframe for ${service.title}?`,
      a: `Sprint timelines typically range from 2 to 6 weeks for focused implementations, and 8 to 16 weeks for complex enterprise-wide deployments with phased milestone rollouts.`
    },
    {
      q: `How does Sarirait ensure high performance and quality?`,
      a: `Every deliverable adheres to our strict engineering standards: 100/100 Core Web Vitals, automated test coverage, type-safe clean code architecture, and strict security compliance checks.`
    },
    {
      q: `Do we own 100% of the code, IP, and assets created?`,
      a: `Yes, absolutely. Upon project signoff, all proprietary code, design source files, repositories, and documentation are transferred 100% to your organization without recurring licensing fees.`
    },
    {
      q: `Do you provide post-launch maintenance and technical support?`,
      a: `Yes. Every deployment includes post-launch warranty support, followed by optional enterprise retainer tiers covering 24/7 uptime monitoring, security patching, and ongoing feature expansion.`
    }
  ];

  const processSteps = [
    { step: "01", title: "Discovery & Technical Audit", desc: "We evaluate your existing infrastructure, competitive landscape, and key metrics to establish architectural requirements." },
    { step: "02", title: "Strategy & Systems Design", desc: "Interactive wireframes, data schemas, tech-stack selection, and sprint roadmaps are codified before execution." },
    { step: "03", title: "Agile Development Sprint", desc: "Bi-weekly sprint demos, staging preview URLs, automated continuous integration, and rapid stakeholder feedback loops." },
    { step: "04", title: "Launch & Performance Scaling", desc: "Zero-downtime deployment, telemetry monitoring, team onboarding documentation, and ongoing conversion optimization." }
  ];

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      <CustomCursor />
      
      {/* Global Sticky Navbar */}
      <Navbar onOpenProjectModal={() => setProjectModalOpen(true)} />

      <main className="pt-32 pb-24">
        {/* BREADCRUMB STRIP */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <nav className="flex items-center gap-2 text-xs font-mono-code text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/services" className="hover:text-slate-300 transition-colors">Services</Link>
            <ChevronRight size={12} />
            <Link to={`/services#${category.id}`} className="hover:text-slate-300 transition-colors">{category.title}</Link>
            <ChevronRight size={12} />
            <span className="text-cyan-400 font-semibold">{service.title}</span>
          </nav>
        </div>

        {/* HERO SECTION */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline & Value Proposition */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono-code text-cyan-400 mb-6 border border-cyan-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>CATEGORY {category.number} // {category.title.toUpperCase()}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.12] mb-6 max-w-3xl">
                {service.title}
              </h1>

              <p className="text-slate-300 text-base sm:text-xl leading-relaxed max-w-2xl mb-8">
                {service.shortDesc} Built with modern technology, strategic precision, and relentless focus on commercial performance.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    sound.click();
                    setProjectModalOpen(true);
                  }}
                  onMouseEnter={() => sound.hover()}
                  className="px-8 py-4 rounded-full font-semibold text-xs tracking-wider uppercase bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white shadow-xl shadow-cyan-500/25 hover:brightness-110 flex items-center gap-2 group cursor-pointer"
                >
                  <span>Start This Project</span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                <Link
                  to="/services"
                  onClick={() => sound.click()}
                  className="px-7 py-4 rounded-full font-semibold text-xs tracking-wider uppercase text-slate-300 glass-card hover:text-white hover:border-cyan-400/40 transition-all flex items-center gap-2"
                >
                  <span>Explore Other Services</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right Column: Key Metric Highlight Card */}
            <div className="lg:col-span-4 p-8 rounded-3xl glass-card border border-cyan-500/30 bg-[#0a0f1d] shadow-2xl relative">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6">
                <ServiceIcon name={service.icon} className="w-6 h-6" />
              </div>

              <div className="text-xs font-mono-code uppercase text-cyan-300 tracking-wider mb-2">
                Proven Target Impact
              </div>

              <div className="space-y-4 pt-2">
                {service.benefits.map((b, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-2xl font-bold font-mono-code text-white text-gradient-cyan">
                      {b.value}
                    </div>
                    <div className="text-xs font-mono-code text-slate-400 uppercase mt-0.5">
                      {b.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* THE CHALLENGE & THE SARIRAIT SOLUTION */}
        <section className="py-20 border-t border-white/[0.06] bg-[#090d16]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Challenge */}
              <div className="p-8 sm:p-10 rounded-3xl glass-card border border-rose-500/20 bg-rose-500/[0.02]">
                <span className="text-xs font-mono-code uppercase text-rose-400 tracking-widest block mb-4">
                  01 // The Industry Challenge
                </span>
                <h3 className="text-2xl font-display font-bold text-white mb-4">
                  Common Pitfalls Most Companies Face
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Most legacy solutions in this space suffer from brittle architecture, bloated dependencies, slow turnaround times, and lack of real commercial accountability.
                </p>
                <div className="space-y-2.5">
                  {[
                    "Unpredictable project delays & scope creep",
                    "Slow page speeds causing high user bounce rates",
                    "Vendor lock-in with closed, expensive ecosystems",
                    "Disjointed design systems that don't scale across viewports"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solution */}
              <div className="p-8 sm:p-10 rounded-3xl glass-card border border-cyan-500/30 bg-cyan-500/[0.02]">
                <span className="text-xs font-mono-code uppercase text-cyan-400 tracking-widest block mb-4">
                  02 // The Sarirait Solution
                </span>
                <h3 className="text-2xl font-display font-bold text-white mb-4">
                  Engineering Precision &amp; Strategic Execution
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  We engineer modern, modular architectures with strict type-safety, 100% IP ownership, and continuous testing to ensure zero failure at production scale.
                </p>
                <div className="space-y-2.5">
                  {[
                    "Transparent weekly sprint milestones & staging preview environments",
                    "Hardware-accelerated sub-second latency performance",
                    "Clean open-source foundation with zero proprietary vendor lock-in",
                    "Empirical business KPIs measured with live telemetry"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 6 KEY CAPABILITIES & DELIVERABLES */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono-code uppercase tracking-widest text-cyan-400 mb-3 block">
                Deliverables &amp; Scope
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
                What’s Included in {service.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-7 rounded-3xl glass-card border border-white/[0.08] hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono-code text-cyan-400 font-bold">
                        0{idx + 1}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-colors">
                        <Zap size={14} />
                      </div>
                    </div>
                    <h4 className="text-lg font-display font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                      {feat}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Engineered according to modern industry best practices, ensuring reliability, maintainability, and seamless scalability.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-white/[0.05] flex items-center gap-1.5 text-[11px] font-mono-code text-slate-500">
                    <ShieldCheck size={12} className="text-cyan-400" />
                    <span>Included in scope</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4-PHASE EXECUTION FRAMEWORK */}
        <section className="py-20 border-t border-white/[0.06] bg-[#080c16]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono-code uppercase tracking-widest text-cyan-400 mb-3 block">
                Agile Sprint Framework
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
                How We Deliver {service.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step) => (
                <div
                  key={step.step}
                  className="p-6 rounded-2xl glass-card border border-white/[0.08] hover:border-cyan-500/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono-code text-3xl font-extrabold text-cyan-400/40 block mb-3">
                      {step.step}
                    </span>
                    <h4 className="text-base font-display font-bold text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-white/[0.05] flex items-center gap-1.5 text-[11px] font-mono-code text-slate-500">
                    <Clock size={12} className="text-cyan-400" />
                    <span>Sprint Milestone</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SPECIFIC SERVICE FAQS ACCORDION */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-mono-code uppercase tracking-widest text-cyan-400 mb-2 block">
                Questions &amp; Clarity
              </span>
              <h3 className="text-2xl sm:text-4xl font-display font-bold text-white">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => {
                const isOpen = activeFaq === i;
                return (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/[0.08] glass-card overflow-hidden"
                  >
                    <button
                      onClick={() => {
                        sound.click();
                        setActiveFaq(isOpen ? null : i);
                      }}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="font-display font-semibold text-white text-base sm:text-lg">
                        {faq.q}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-slate-400 transition-transform duration-300 shrink-0 ${
                          isOpen ? 'rotate-180 text-cyan-400' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-slate-300 leading-relaxed border-t border-white/[0.04] pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* BOTTOM INVITATION CTA */}
        <section className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-10 sm:p-16 rounded-3xl glass-card border border-cyan-500/30 text-center relative overflow-hidden bg-gradient-to-r from-cyan-950/20 via-[#07090e] to-violet-950/20">
            <h3 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4">
              Ready to launch your {service.title}?
            </h3>
            <p className="text-slate-300 text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              Let's review your exact operational requirements and outline a transparent timeline and technical proposal.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  sound.click();
                  setProjectModalOpen(true);
                }}
                onMouseEnter={() => sound.hover()}
                className="px-9 py-4 rounded-full font-semibold text-xs tracking-wider uppercase bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white shadow-xl shadow-cyan-500/25 hover:brightness-110 flex items-center gap-2 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowUpRight size={16} />
              </button>
              <Link
                to="/services"
                onClick={() => sound.click()}
                className="px-8 py-4 rounded-full font-semibold text-xs tracking-wider uppercase text-slate-300 glass-card hover:text-white hover:border-cyan-400/40 transition-all flex items-center gap-2"
              >
                <span>View All Services</span>
                <ArrowRight size={14} />
              </Link>
            </div>
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
