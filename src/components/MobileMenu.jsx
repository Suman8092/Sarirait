import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowUpRight, ArrowRight, Phone, Mail, Sparkles } from 'lucide-react';
import { serviceCategories } from '../data/servicesData';
import ServiceIcon from './ServiceIcon';
import { sound } from '../utils/sound';
import { useTheme } from '../context/ThemeContext';

export default function MobileMenu({ isOpen, onClose, onOpenProjectModal }) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const { isDark } = useTheme();

  // Lock background body scroll when mobile menu is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const toggleCategory = (catId) => {
    sound.click();
    setExpandedCategory(expandedCategory === catId ? null : catId);
  };

  const handleNavClick = (to) => {
    sound.click();
    onClose();
    if (to.includes('#')) {
      const id = to.split('#')[1];
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    }
  };

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Work', to: '/#work' },
    { name: 'About', to: '/#why-us' },
    { name: 'Process', to: '/#process' },
    { name: 'Insights', to: '/#technology' },
    { name: 'Contact', to: '/#footer' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`fixed inset-x-0 bottom-0 top-[52px] sm:top-[60px] z-40 px-4 sm:px-6 py-5 flex flex-col justify-between overflow-y-auto overscroll-contain backdrop-blur-2xl transition-colors duration-200 ${
            isDark
              ? 'bg-[#07090e]/98 text-white border-t border-white/[0.08]'
              : 'bg-white/98 text-slate-900 border-t border-slate-200 shadow-2xl'
          }`}
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="space-y-6 max-w-lg mx-auto w-full">
            
            {/* SERVICES ACCORDIONS SECTION */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-current/10">
                <span className="text-xs font-mono-code uppercase tracking-wider text-cyan-500 font-semibold flex items-center gap-1.5">
                  <Sparkles size={13} />
                  Services Directory (22 Capabilities)
                </span>
                <Link
                  to="/services"
                  onClick={() => {
                    sound.click();
                    onClose();
                  }}
                  className={`text-xs font-mono-code transition-colors ${
                    isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  View All →
                </Link>
              </div>

              {serviceCategories.map((category) => {
                const isExpanded = expandedCategory === category.id;
                return (
                  <div
                    key={category.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isDark
                        ? isExpanded
                          ? 'border-cyan-500/40 bg-white/[0.04]'
                          : 'border-white/[0.07] bg-white/[0.02]'
                        : isExpanded
                          ? 'border-cyan-300 bg-cyan-50/40 shadow-xs'
                          : 'border-slate-200 bg-slate-50/70'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleCategory(category.id)}
                      className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className={`font-mono-code text-[11px] px-2 py-0.5 rounded font-semibold ${
                          isDark ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-500/20' : 'text-cyan-800 bg-cyan-100/80 border border-cyan-200'
                        }`}>
                          {category.number}
                        </span>
                        <span className={`font-display font-bold text-sm sm:text-base ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {category.title}
                        </span>
                      </div>
                      <ChevronDown
                        size={17}
                        className={`transition-transform duration-200 ${
                          isExpanded
                            ? 'rotate-180 text-cyan-400'
                            : isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`px-3.5 sm:px-4 pb-3.5 space-y-1 border-t ${
                            isDark ? 'border-white/[0.05]' : 'border-slate-200/60'
                          }`}
                        >
                          <p className={`text-xs pt-2 pb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            {category.description}
                          </p>
                          <div className="space-y-1">
                            {category.services.map((srv) => (
                              <Link
                                key={srv.slug}
                                to={`/services/${srv.slug}`}
                                onClick={() => {
                                  sound.click();
                                  onClose();
                                }}
                                className={`flex items-center justify-between p-2.5 rounded-xl transition-all ${
                                  isDark
                                    ? 'hover:bg-white/[0.06] text-slate-300 hover:text-cyan-300'
                                    : 'hover:bg-cyan-50 text-slate-700 hover:text-cyan-800'
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <ServiceIcon name={srv.icon} className="w-4 h-4 text-cyan-400 shrink-0" />
                                  <span className="text-xs sm:text-sm font-medium">{srv.title}</span>
                                </div>
                                <ArrowRight size={13} className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* GENERAL NAVIGATION LINKS */}
            <div className="pt-2 border-t border-current/10 space-y-2">
              <span className={`text-[11px] font-mono-code uppercase tracking-wider block mb-2 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Quick Navigation
              </span>
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.to}
                    onClick={() => handleNavClick(link.to)}
                    className={`p-3 rounded-xl text-center text-xs sm:text-sm font-semibold transition-all border ${
                      isDark
                        ? 'bg-white/[0.03] border-white/[0.07] text-slate-200 hover:text-white hover:border-cyan-500/40 hover:bg-white/[0.06]'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:text-slate-950 hover:border-cyan-500/50 hover:bg-white shadow-xs'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* DIRECT CONTACT SHORTCUTS */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href="tel:+919153835687"
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-colors ${
                  isDark
                    ? 'border-white/[0.08] bg-white/[0.02] text-slate-300 hover:text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:text-slate-900'
                }`}
              >
                <Phone size={14} className="text-emerald-400" />
                <span>+91 9153835687</span>
              </a>
              <a
                href="mailto:contact@sarirait.com"
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-colors ${
                  isDark
                    ? 'border-white/[0.08] bg-white/[0.02] text-slate-300 hover:text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:text-slate-900'
                }`}
              >
                <Mail size={14} className="text-cyan-400" />
                <span>contact@sarirait.com</span>
              </a>
            </div>

          </div>

          {/* BOTTOM CTA BUTTON */}
          <div className="pt-5 border-t border-current/10 space-y-3 max-w-lg mx-auto w-full mt-4">
            <button
              type="button"
              onClick={() => {
                sound.click();
                onClose();
                onOpenProjectModal();
              }}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowUpRight size={17} />
            </button>
            <div className={`text-center text-[10px] font-mono-code ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`}>
              © 2026 Sarirait. All rights reserved.
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
