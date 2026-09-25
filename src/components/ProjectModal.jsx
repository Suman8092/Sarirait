import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, Send, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

export default function ProjectModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState(['Web Design & Development']);
  const [budget, setBudget] = useState('$15,000 - $35,000');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const servicesList = [
    'Web Design & Development',
    'Custom Software Development',
    'Mobile App (iOS/Android)',
    'Enterprise WordPress / Headless',
    'UI/UX & Design Systems',
    'AI Solutions & Automation',
    'Technical SEO & Growth'
  ];

  const budgetTiers = [
    '< $10,000',
    '$15,000 - $35,000',
    '$35,000 - $75,000',
    '$75,000+'
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0a0e1a] border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-500/20 overflow-hidden z-10 my-8 p-6 sm:p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Sarirait" className="h-6 sm:h-7 w-auto object-contain" />
              <span className="text-[11px] sm:text-xs font-mono-code uppercase tracking-wider text-cyan-300 border-l border-white/10 pl-3">
                Project Briefing
              </span>
            </div>
            <button
              onClick={handleClose}
              onMouseEnter={() => sound.hover()}
              className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.15] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="pt-6 space-y-6">
              {/* Step indicator */}
              <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
                <span>{step === 1 ? 'Step 1 of 2: Scope & Budget' : 'Step 2 of 2: Contact Details'}</span>
                <span className="text-cyan-400">{step === 1 ? '50% Complete' : 'Almost There'}</span>
              </div>

              {step === 1 ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 font-display">
                      Which services are you looking to architect?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {servicesList.map((srv) => {
                        const isSelected = selectedServices.includes(srv);
                        return (
                          <button
                            type="button"
                            key={srv}
                            onClick={() => toggleService(srv)}
                            onMouseEnter={() => sound.hover()}
                            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all border ${
                              isSelected
                                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10'
                                : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                            }`}
                          >
                            {isSelected && <span className="mr-1.5">✓</span>}
                            {srv}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2 font-display">
                      Estimated Project Investment Tier
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetTiers.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => {
                            sound.click();
                            setBudget(b);
                          }}
                          onMouseEnter={() => sound.hover()}
                          className={`p-2.5 rounded-xl text-xs font-mono-code transition-all border text-center ${
                            budget === b
                              ? 'bg-violet-600/30 border-violet-400 text-white'
                              : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        sound.click();
                        setStep(2);
                      }}
                      onMouseEnter={() => sound.hover()}
                      className="px-6 py-3 rounded-full font-semibold text-xs tracking-wider uppercase bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                    >
                      <span>Continue to Brief</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono-code text-slate-300 uppercase mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Mercer"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono-code text-slate-300 uppercase mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-slate-300 uppercase mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Tech Labs"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-slate-300 uppercase mb-1.5">
                      Tell us about your project vision
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your objectives, existing stack, and ideal timeline..."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 resize-none"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        sound.click();
                        setStep(1);
                      }}
                      onMouseEnter={() => sound.hover()}
                      className="text-xs font-mono-code text-slate-400 hover:text-white"
                    >
                      ← Back
                    </button>

                    <button
                      type="submit"
                      onMouseEnter={() => sound.hover()}
                      className="px-7 py-3 rounded-full font-semibold text-xs tracking-wider uppercase bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white shadow-xl shadow-cyan-500/25 flex items-center gap-2"
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
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-400/40 flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Brief Received Successfully
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-cyan-300 font-semibold">{formData.name || 'Partner'}</span>. Our technical leadership team will review your specifications and reach out to <span className="text-cyan-300">{formData.email}</span> within 24 hours with architectural suggestions and a discovery timeline.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-full text-xs font-mono-code uppercase bg-white/[0.06] hover:bg-white/[0.12] text-white transition-colors"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          )}

          {/* Privacy Note */}
          <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-center gap-2 text-[11px] font-mono-code text-slate-500">
            <ShieldCheck size={14} className="text-cyan-400" />
            <span>Encrypted transmission. Your information remains strictly confidential under NDA.</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
