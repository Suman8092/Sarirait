import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowUpRight, ArrowRight } from 'lucide-react';
import { serviceCategories } from '../data/servicesData';
import ServiceIcon from './ServiceIcon';
import { sound } from '../utils/sound';

export default function MobileMenu({ isOpen, onClose, onOpenProjectModal }) {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (catId) => {
    sound.click();
    setExpandedCategory(expandedCategory === catId ? null : catId);
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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 top-[72px] z-50 bg-[#07090e]/98 backdrop-blur-2xl border-b border-white/10 px-5 py-6 flex flex-col justify-between overflow-y-auto"
        >
          <div className="space-y-6">
            
            {/* SERVICES ACCORDIONS SECTION */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                <span className="text-xs font-mono-code uppercase tracking-wider text-cyan-400">
                  Services Directory (22 Capabilities)
                </span>
                <Link
                  to="/services"
                  onClick={() => {
                    sound.click();
                    onClose();
                  }}
                  className="text-xs font-mono-code text-slate-400 hover:text-white"
                >
                  View All →
                </Link>
              </div>

              {serviceCategories.map((category) => {
                const isExpanded = expandedCategory === category.id;
                return (
                  <div
                    key={category.id}
                    className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => toggleCategory(category.id)}
                      className="w-full p-4 flex items-center justify-between text-left focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono-code text-xs text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10">
                          {category.number}
                        </span>
                        <span className="font-display font-bold text-white text-base">
                          {category.title}
                        </span>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`text-slate-400 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180 text-cyan-400' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="px-4 pb-4 space-y-1.5 border-t border-white/[0.04]"
                        >
                          <p className="text-xs text-slate-400 pt-2 pb-1">
                            {category.description}
                          </p>
                          {category.services.map((srv) => (
                            <Link
                              key={srv.slug}
                              to={`/services/${srv.slug}`}
                              onClick={() => {
                                sound.click();
                                onClose();
                              }}
                              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.05] text-slate-300 hover:text-cyan-300 transition-colors"
                            >
                              <div className="flex items-center gap-2.5">
                                <ServiceIcon name={srv.icon} className="w-4 h-4 text-cyan-400" />
                                <span className="text-sm font-medium">{srv.title}</span>
                              </div>
                              <ArrowRight size={14} className="text-slate-500" />
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* GENERAL NAVIGATION LINKS */}
            <div className="pt-2 border-t border-white/[0.08] space-y-2">
              <span className="text-xs font-mono-code uppercase tracking-wider text-slate-500 block mb-2">
                Company Navigation
              </span>
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.to}
                    onClick={() => {
                      sound.click();
                      onClose();
                    }}
                    className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-sm font-medium text-slate-300 hover:text-white hover:border-cyan-500/30 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* BOTTOM CTAS */}
          <div className="pt-6 border-t border-white/[0.08] space-y-3">
            <button
              type="button"
              onClick={() => {
                sound.click();
                onClose();
                onOpenProjectModal();
              }}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2"
            >
              <span>Start a Project</span>
              <ArrowUpRight size={18} />
            </button>
            <div className="text-center text-[11px] font-mono-code text-slate-500">
              © 2026 Sarirait. Technology • Business • Creativity • Growth.
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
