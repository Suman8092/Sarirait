import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const faqs = [
    {
      q: `What is the typical timeframe for ${service.title}?`,
      a: `Timing depends on the agreed scope, content and review process. We can suggest a schedule after learning more about what you need.`
    },
    {
      q: `How do you approach quality?`,
      a: `We agree on the goals and scope first, review the work at key points, and check the finished experience across relevant devices before handoff.`
    },
    {
      q: `What happens to the finished work?`,
      a: `Ownership, source files, third-party assets and handoff details are agreed as part of the project scope and contract.`
    },
    {
      q: `Do you provide post-launch maintenance and technical support?`,
      a: `We can discuss maintenance and future updates when we plan your project. The support options depend on the platform and the work involved.`
    }
  ];

  const processSteps = [
    { step: "01", title: "Understand the brief", desc: "We talk through your goals, audience, current setup and priorities." },
    { step: "02", title: "Agree the plan", desc: "We outline the scope, deliverables, schedule and review points." },
    { step: "03", title: "Create and review", desc: "We develop the agreed work and share it with you for feedback." },
    { step: "04", title: "Launch and hand over", desc: "We make the agreed refinements and prepare the final files or site handoff." }
  ];

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 w-full max-w-full overflow-x-hidden">
      {/* Global Sticky Navbar */}
      <Navbar onOpenProjectModal={() => setProjectModalOpen(true)} />

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24 w-full max-w-full overflow-x-hidden">
        {/* BREADCRUMB STRIP */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 w-full"
        >
          <nav className="flex items-center gap-2 text-xs font-mono-code text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/services" className="hover:text-slate-300 transition-colors">Services</Link>
            <ChevronRight size={12} />
            <Link to={`/services#${category.id}`} className="hover:text-slate-300 transition-colors">{category.title}</Link>
            <ChevronRight size={12} />
            <span className="text-cyan-400 font-semibold">{service.title}</span>
          </nav>
        </motion.div>

        {/* HERO SECTION */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20 overflow-hidden w-full max-w-full">
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.16, 0.08] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="ambient-glow absolute top-1/3 left-1/4 w-full max-w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none -z-10" 
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline & Value Proposition */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-8"
            >
              <motion.div 
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono-code text-cyan-400 mb-6 border border-cyan-500/30 shadow-lg shadow-cyan-500/5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>CATEGORY {category.number} // {category.title.toUpperCase()}</span>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.12] mb-6 max-w-3xl"
              >
                {service.title}
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-slate-300 text-base sm:text-xl leading-relaxed max-w-2xl mb-8"
              >
                {service.shortDesc}
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
                <motion.button
                  data-magnetic
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    sound.click();
                    setProjectModalOpen(true);
                  }}
                  onMouseEnter={() => sound.hover()}
                  className="px-8 py-4 rounded-full font-semibold text-xs tracking-wider uppercase bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white shadow-xl shadow-cyan-500/25 hover:brightness-110 flex items-center gap-2 group cursor-pointer"
                >
                  <span>Start This Project</span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.button>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/services"
                    onClick={() => sound.click()}
                    className="px-7 py-4 rounded-full font-semibold text-xs tracking-wider uppercase text-slate-300 glass-card hover:text-white hover:border-cyan-400/40 transition-all flex items-center gap-2"
                  >
                    <span>Explore Other Services</span>
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column: Key Metric Highlight Card with Micro-Animations */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="lg:col-span-4 p-8 rounded-3xl glass-card border border-cyan-500/30 bg-[#0a0f1d] shadow-2xl relative overflow-hidden"
            >
              <div className="ambient-glow absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none -z-10" />

              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <ServiceIcon name={service.icon} className="w-6 h-6" />
              </div>

              <div className="text-xs font-mono-code uppercase text-cyan-300 tracking-wider mb-2">
                Project considerations
              </div>

              <div className="space-y-4 pt-2">
                {service.benefits.map((b, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                    transition={{ duration: 0.2 }}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] transition-colors cursor-default"
                  >
                    <div className="text-2xl font-bold font-mono-code text-white text-gradient-cyan">
                      {b.value}
                    </div>
                    <div className="text-xs font-mono-code text-slate-400 uppercase mt-0.5">
                      {b.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>

        {/* THE CHALLENGE & THE SARIRAIT SOLUTION (Dual Cards with Staggered Entrance) */}
        <section className="py-20 border-t border-white/[0.06] bg-[#090d16]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Challenge */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="p-8 sm:p-10 rounded-3xl glass-card border border-rose-500/20 bg-rose-500/[0.02] shadow-xl"
              >
                <span className="text-xs font-mono-code uppercase text-rose-400 tracking-widest block mb-4">
                  01 // Common considerations
                </span>
                <h3 className="text-2xl font-display font-bold text-white mb-4">
                  What to think through
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  The right approach depends on your audience, existing materials, budget and the outcome you want from this work.
                </p>
                <div className="space-y-2.5">
                  {[
                    "Who the work needs to reach",
                    "What information or features matter most",
                    "Which content and materials are ready",
                    "How the finished work will be maintained"
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-2.5 text-xs text-slate-400"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Solution */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="p-8 sm:p-10 rounded-3xl glass-card border border-cyan-500/30 bg-cyan-500/[0.02] shadow-xl"
              >
                <span className="text-xs font-mono-code uppercase text-cyan-400 tracking-widest block mb-4">
                  02 // A considered approach
                </span>
                <h3 className="text-2xl font-display font-bold text-white mb-4">
                  Clear goals, then thoughtful work
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  We use the brief to shape an appropriate design and delivery plan, then review key decisions with you as the work takes shape.
                </p>
                <div className="space-y-2.5">
                  {[
                    "A scope and schedule agreed before work begins",
                    "Design reviews at useful decision points",
                    "Tools selected to fit the project",
                    "A handoff that explains the finished work"
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-2.5 text-xs text-slate-300"
                    >
                      <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 6 KEY CAPABILITIES & DELIVERABLES */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="text-xs font-mono-code uppercase tracking-widest text-cyan-400 mb-3 block">
                Deliverables &amp; Scope
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                What’s Included in {service.title}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: idx * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -7, transition: { duration: 0.22 } }}
                  className="p-7 rounded-3xl glass-card border border-white/[0.08] hover:border-cyan-500/40 transition-colors flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono-code text-cyan-400 font-bold">
                        0{idx + 1}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:rotate-12 transition-all duration-300">
                        <Zap size={14} />
                      </div>
                    </div>
                    <h4 className="text-lg font-display font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                      {feat}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      We’ll confirm whether this item is needed for your project and include it in the agreed scope.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-white/[0.05] flex items-center gap-1.5 text-[11px] font-mono-code text-slate-500">
                    <ShieldCheck size={12} className="text-cyan-400" />
                    <span>Included in scope</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4-PHASE EXECUTION FRAMEWORK */}
        <section className="py-20 border-t border-white/[0.06] bg-[#080c16]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="text-xs font-mono-code uppercase tracking-widest text-cyan-400 mb-3 block">
                Project steps
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                How We Deliver {service.title}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, sIdx) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: sIdx * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -7, transition: { duration: 0.22 } }}
                  className="p-6 rounded-2xl glass-card border border-white/[0.08] hover:border-cyan-500/30 transition-colors flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    <span className="font-mono-code text-3xl font-extrabold text-cyan-400/40 group-hover:text-cyan-400/80 transition-colors block mb-3">
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
                    <span>Project step</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SPECIFIC SERVICE FAQS ACCORDION WITH ANIMATEPRESENCE */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-xs font-mono-code uppercase tracking-widest text-cyan-400 mb-2 block">
                Questions &amp; Clarity
              </span>
              <h3 className="text-xl sm:text-3xl font-display font-bold text-white">
                Frequently Asked Questions
              </h3>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((faq, i) => {
                const isOpen = activeFaq === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className={`rounded-2xl border transition-all duration-300 glass-card overflow-hidden ${
                      isOpen ? 'border-cyan-500/40 bg-white/[0.04] shadow-lg shadow-cyan-500/5' : 'border-white/[0.08]'
                    }`}
                  >
                    <button
                      onClick={() => {
                        sound.click();
                        setActiveFaq(isOpen ? null : i);
                      }}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                    >
                      <span className={`font-display font-semibold text-base sm:text-lg transition-colors ${
                        isOpen ? 'text-cyan-300' : 'text-white'
                      }`}>
                        {faq.q}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="shrink-0"
                      >
                        <ChevronDown
                          size={18}
                          className={`transition-colors ${isOpen ? 'text-cyan-400' : 'text-slate-400'}`}
                        />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 text-sm text-slate-300 leading-relaxed border-t border-white/[0.04] pt-3">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* RELATED CAPABILITIES IN SAME CATEGORY */}
        <section className="py-16 border-t border-white/[0.06] bg-[#070a12]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
            >
              <div>
                <span className="text-xs font-mono-code uppercase tracking-wider text-cyan-400 block mb-1">
                  Category {category.number} // {category.title}
                </span>
                <h3 className="text-2xl font-display font-bold text-white">
                  Other Services in This Category
                </h3>
              </div>
              <Link
                to="/services"
                onClick={() => sound.click()}
                className="text-xs font-mono-code text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
              >
                <span>Explore All Services</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.services
                .filter(s => s.slug !== service.slug)
                .map((rel, rIdx) => (
                  <motion.div
                    key={rel.slug}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: rIdx * 0.06, duration: 0.4 }}
                    whileHover={{ y: -4, scale: 1.015 }}
                  >
                    <Link
                      to={`/services/${rel.slug}`}
                      onClick={() => sound.click()}
                      onMouseEnter={() => sound.hover()}
                      className="p-5 rounded-2xl glass-card border border-white/[0.06] hover:border-cyan-500/40 hover:bg-white/[0.04] transition-all flex items-center justify-between group h-full shadow-lg"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                          <ServiceIcon name={rel.icon} className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold text-white group-hover:text-cyan-200 transition-colors truncate">
                          {rel.title}
                        </span>
                      </div>
                      <ArrowUpRight size={15} className="text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                    </Link>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>

        {/* BOTTOM INVITATION CTA */}
        <section className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="p-10 sm:p-16 rounded-3xl glass-card border border-cyan-500/30 text-center relative overflow-hidden bg-gradient-to-r from-cyan-950/20 via-[#07090e] to-violet-950/20 shadow-2xl"
          >
            <div className="ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none -z-10" />

            <h3 className="text-2xl sm:text-4xl font-display font-bold text-white mb-4">
              Ready to launch your {service.title}?
            </h3>
            <p className="text-slate-300 text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              Let's review your exact operational requirements and outline a transparent timeline and technical proposal.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.button
                data-magnetic
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  sound.click();
                  setProjectModalOpen(true);
                }}
                onMouseEnter={() => sound.hover()}
                className="px-9 py-4 rounded-full font-semibold text-xs tracking-wider uppercase bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white shadow-xl shadow-cyan-500/25 hover:brightness-110 flex items-center gap-2 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowUpRight size={16} />
              </motion.button>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/services"
                  onClick={() => sound.click()}
                  className="px-8 py-4 rounded-full font-semibold text-xs tracking-wider uppercase text-slate-300 glass-card hover:text-white hover:border-cyan-400/40 transition-all flex items-center gap-2"
                >
                  <span>View All Services</span>
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            </div>
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
