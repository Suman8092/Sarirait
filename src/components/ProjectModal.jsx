import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, Send, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { serviceCategories } from '../data/servicesData';
import { useTheme } from '../context/ThemeContext';
import { useLenis } from './SmoothScroll';

export default function ProjectModal({ isOpen, onClose }) {
  const { isDark } = useTheme();
  const lenis = useLenis();
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState(['Website Development']);
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');
  const [budget, setBudget] = useState('Not decided yet');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [isOpen, lenis]);

  if (!isOpen) return null;

  const budgetTiers = [
    'Not decided yet',
    'Please suggest a range',
    'Budget is set',
    'Prefer to discuss'
  ];

  const toggleService = (srv) => {
    sound.click();
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== srv));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.success();

    const subject = encodeURIComponent(`Sarirait project enquiry from ${formData.name}`);
    const body = encodeURIComponent([
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Company: ${formData.company || 'Not provided'}`,
      `Services: ${selectedServices.join(', ')}`,
      `Budget: ${budget}`,
      '',
      formData.details || 'Project details not provided yet.'
    ].join('\n'));
    window.location.href = `mailto:info@sarirait.com?subject=${subject}&body=${body}`;
    
    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    setSubmitted(true);
    setTimeout(() => {
      // Keep submitted confirmation or allow reset
    }, 4000);
  };

  const handleClose = () => {
    sound.click();
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setStep(1);
    }, 400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={`relative w-full max-w-2xl max-h-[92dvh] sm:max-h-[88vh] flex flex-col rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 border ${
            isDark
              ? 'bg-[#0a0e1a] border-cyan-500/30 shadow-cyan-500/20'
              : 'bg-white border-slate-200 shadow-slate-900/20'
          }`}
        >
          {/* Header - Pinned at top so it is always visible on phone view */}
          <div className={`shrink-0 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b ${
            isDark ? 'border-white/[0.08] bg-[#0c1222]/90' : 'border-slate-200 bg-slate-50/90'
          } backdrop-blur-md z-20`}>
            <div className="flex items-center gap-2.5 sm:gap-3">
              <img 
                src={isDark ? "/logo.png" : "/logo-light.png"} 
                alt="Sarirait" 
                className="h-6 sm:h-7 w-auto object-contain" 
              />
              <span className={`text-[10px] sm:text-xs font-mono-code uppercase tracking-wider border-l pl-2.5 sm:pl-3 font-semibold ${
                isDark ? 'text-cyan-300 border-white/10' : 'text-cyan-700 border-slate-200'
              }`}>
                Project Briefing
              </span>
            </div>
            <button
              type="button"
              onClick={handleClose}
              onMouseEnter={() => sound.hover()}
              aria-label="Close modal"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                isDark
                  ? 'bg-white/[0.06] hover:bg-white/[0.15] text-slate-300 hover:text-white'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700 hover:text-slate-950'
              }`}
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            onWheel={(e) => e.stopPropagation()}
            className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-7 space-y-4 sm:space-y-6 custom-scrollbar"
            style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Step indicator */}
                <div className={`flex items-center justify-between text-xs font-mono-code ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  <span>{step === 1 ? 'Step 1 of 2: Scope & Budget' : 'Step 2 of 2: Contact Details'}</span>
                  <span className={isDark ? 'text-cyan-400 font-semibold' : 'text-cyan-700 font-bold'}>
                    {step === 1 ? '50% Complete' : 'Almost There'}
                  </span>
                </div>

                {step === 1 ? (
                  <div className="space-y-4 sm:space-y-5">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className={`block text-xs sm:text-sm font-semibold font-display ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          Select Services ({selectedServices.length} selected)
                        </label>
                        <span className={`text-[10px] sm:text-[11px] font-mono-code font-semibold ${
                          isDark ? 'text-cyan-400' : 'text-cyan-700'
                        }`}>
                          {serviceCategories.reduce((total, category) => total + category.services.length, 0)} Services Available
                        </span>
                      </div>

                      {/* Category quick-filter tabs - scrollable horizontally on phone */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 sm:flex-wrap no-scrollbar">
                        {[
                          { id: 'all', label: 'All' },
                          { id: 'development', label: 'Development' },
                          { id: 'marketing', label: 'Digital Marketing' },
                          { id: 'creative', label: 'Creative' },
                          { id: 'business', label: 'Business' }
                        ].map((tab) => (
                          <button
                            type="button"
                            key={tab.id}
                            onClick={() => {
                              sound.click();
                              setActiveCategoryTab(tab.id);
                            }}
                            className={`shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-mono-code transition-all border cursor-pointer ${
                              activeCategoryTab === tab.id
                                ? isDark
                                  ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200 font-semibold shadow-sm'
                                  : 'bg-cyan-600 border-cyan-600 text-white font-bold shadow-sm'
                                : isDark
                                  ? 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      {/* Scrollable list of categorized pills */}
                      <div
                        data-lenis-prevent="true"
                        data-lenis-prevent-wheel="true"
                        data-lenis-prevent-touch="true"
                        onWheel={(e) => e.stopPropagation()}
                        className="max-h-48 sm:max-h-60 overflow-y-auto pr-1 space-y-2.5 custom-scrollbar"
                        style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
                      >
                        {serviceCategories
                          .filter(cat => activeCategoryTab === 'all' || cat.id === activeCategoryTab)
                          .map(cat => (
                            <div key={cat.id} className="space-y-1">
                              <div className={`text-[10px] font-mono-code uppercase tracking-wider flex items-center gap-1.5 ${
                                isDark ? 'text-slate-400' : 'text-slate-700 font-semibold'
                              }`}>
                                <span className={isDark ? 'text-cyan-400 font-bold' : 'text-cyan-700 font-bold'}>
                                  {cat.number}
                                </span>
                                <span>{cat.title}</span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {cat.services.map((srv) => {
                                  const isSelected = selectedServices.includes(srv.title);
                                  return (
                                    <button
                                      type="button"
                                      key={srv.slug}
                                      onClick={() => toggleService(srv.title)}
                                      onMouseEnter={() => sound.hover()}
                                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border cursor-pointer ${
                                        isSelected
                                          ? isDark
                                            ? 'bg-cyan-500/25 border-cyan-400 text-cyan-100 shadow-sm shadow-cyan-500/20 font-semibold'
                                            : 'bg-cyan-600 border-cyan-600 text-white shadow-md shadow-cyan-600/25 font-semibold'
                                          : isDark
                                            ? 'bg-white/[0.03] border-white/10 text-slate-300 hover:text-white hover:border-white/20'
                                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-950'
                                      }`}
                                    >
                                      {isSelected && (
                                        <span className={`mr-1 font-bold ${isDark ? 'text-cyan-300' : 'text-white'}`}>
                                          ✓
                                        </span>
                                      )}
                                      {srv.title}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs sm:text-sm font-semibold mb-1.5 font-display ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        Budget planning
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                        {budgetTiers.map((b) => (
                          <button
                            type="button"
                            key={b}
                            onClick={() => {
                              sound.click();
                              setBudget(b);
                            }}
                            onMouseEnter={() => sound.hover()}
                            className={`p-2 sm:p-2.5 rounded-xl text-xs font-mono-code transition-all border text-center cursor-pointer ${
                              budget === b
                                ? isDark
                                  ? 'bg-violet-600/35 border-violet-400 text-violet-100 font-semibold shadow-sm shadow-violet-500/20'
                                  : 'bg-violet-600 border-violet-600 text-white font-semibold shadow-md shadow-violet-600/25'
                                : isDark
                                  ? 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 sm:pt-3 flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          sound.click();
                          setStep(2);
                        }}
                        onMouseEnter={() => sound.hover()}
                        className="w-full sm:w-auto px-6 py-3 rounded-full font-semibold text-xs tracking-wider uppercase bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-transform"
                      >
                        <span>Continue to Brief</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className={`block text-xs font-mono-code uppercase mb-1.5 ${
                          isDark ? 'text-slate-300' : 'text-slate-700 font-semibold'
                        }`}>
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex Mercer"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                            isDark
                              ? 'bg-white/[0.04] border-white/10 text-white placeholder:text-slate-500 focus:border-cyan-400'
                              : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-cyan-600'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-mono-code uppercase mb-1.5 ${
                          isDark ? 'text-slate-300' : 'text-slate-700 font-semibold'
                        }`}>
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="alex@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                            isDark
                              ? 'bg-white/[0.04] border-white/10 text-white placeholder:text-slate-500 focus:border-cyan-400'
                              : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-cyan-600'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-mono-code uppercase mb-1.5 ${
                        isDark ? 'text-slate-300' : 'text-slate-700 font-semibold'
                      }`}>
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Acme Tech Labs"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                          isDark
                            ? 'bg-white/[0.04] border-white/10 text-white placeholder:text-slate-500 focus:border-cyan-400'
                            : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-cyan-600'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-mono-code uppercase mb-1.5 ${
                        isDark ? 'text-slate-300' : 'text-slate-700 font-semibold'
                      }`}>
                        Tell us about your project vision
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Briefly describe your objectives, existing stack, and ideal timeline..."
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors resize-none ${
                          isDark
                            ? 'bg-white/[0.04] border-white/10 text-white placeholder:text-slate-500 focus:border-cyan-400'
                            : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-cyan-600'
                        }`}
                      />
                    </div>

                    <div className="pt-2 sm:pt-3 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          sound.click();
                          setStep(1);
                        }}
                        onMouseEnter={() => sound.hover()}
                        className={`px-3 py-2 text-xs font-mono-code transition-colors cursor-pointer ${
                          isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950 font-semibold'
                        }`}
                      >
                        ← Back
                      </button>

                      <button
                        type="submit"
                        onMouseEnter={() => sound.hover()}
                        className="flex-1 sm:flex-none justify-center px-6 py-3 rounded-full font-semibold text-xs tracking-wider uppercase bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white shadow-xl shadow-cyan-500/25 flex items-center gap-2 cursor-pointer active:scale-95 transition-transform"
                      >
                        <span>Transmit Project Brief</span>
                        <Send size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </form>
            ) : (
              /* SUBMITTED SUCCESS STATE */
              <div className="py-8 sm:py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-400/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className={`text-xl sm:text-2xl md:text-3xl font-display font-bold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Your project brief is ready
                </h3>
                <p className={`text-xs sm:text-sm max-w-md mx-auto leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Thank you, <span className={isDark ? 'text-cyan-300 font-semibold' : 'text-cyan-700 font-bold'}>{formData.name || 'there'}</span>. Your email app should open with this brief addressed to <span className={isDark ? 'text-cyan-300' : 'text-cyan-700 font-semibold'}>info@sarirait.com</span>. Review it and press Send to complete your enquiry. If no email app opens, you can write to us directly.
                </p>
                <div className="pt-2 sm:pt-4">
                  <button
                    onClick={handleClose}
                    className={`px-6 py-2.5 rounded-full text-xs font-mono-code uppercase transition-colors cursor-pointer ${
                      isDark
                        ? 'bg-white/[0.06] hover:bg-white/[0.12] text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-semibold'
                    }`}
                  >
                    Return to Homepage
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Privacy Note - Pinned at bottom */}
          <div className={`shrink-0 px-4 py-2.5 sm:py-3 border-t flex items-center justify-center gap-2 text-[10px] sm:text-[11px] font-mono-code ${
            isDark ? 'border-white/[0.06] bg-[#0c1222]/80 text-slate-500' : 'border-slate-200 bg-slate-50/80 text-slate-600'
          }`}>
            <ShieldCheck size={14} className={isDark ? 'text-cyan-400' : 'text-cyan-700'} />
            <span className="truncate">Your details are for discussing this project enquiry.</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
