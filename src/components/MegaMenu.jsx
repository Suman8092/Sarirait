import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Terminal, Cpu, Sparkles, BarChart3 } from 'lucide-react';
import { serviceCategories } from '../data/servicesData';
import ServiceIcon from './ServiceIcon';
import { sound } from '../utils/sound';

export default function MegaMenu({ isOpen, onClose, onOpenProjectModal }) {
  const menuRef = useRef(null);

  // Close on Escape or click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        if (!e.target.closest('[data-megamenu-trigger]')) {
          onClose();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const categoryIcons = {
    development: <Terminal className="w-4 h-4 text-cyan-400" />,
    marketing: <BarChart3 className="w-4 h-4 text-sky-400" />,
    creative: <Sparkles className="w-4 h-4 text-violet-400" />,
    business: <Cpu className="w-4 h-4 text-indigo-400" />
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -6, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.99 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-full left-1/2 -translate-x-1/2 w-[94vw] max-w-4xl mt-2 z-50 pointer-events-auto"
        >
          {/* Glassmorphic Mega Menu Card - Balanced 2x2 Layout */}
          <div className="relative rounded-2xl bg-[#090d16]/95 backdrop-blur-2xl border border-cyan-500/20 shadow-2xl shadow-black/80 overflow-hidden glow-border">
            
            {/* Subtle background glow */}
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

            {/* Top Bar Header inside Mega Menu */}
            <div className="px-6 py-2.5 border-b border-white/[0.06] bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[11px] font-mono-code uppercase tracking-wider text-cyan-300">
                  Sarirait Services Directory // 22 Capabilities
                </span>
              </div>
              <Link
                to="/services"
                onClick={() => {
                  sound.click();
                  onClose();
                }}
                className="text-[11px] font-mono-code text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
              >
                <span>View All Services</span>
                <ArrowRight size={11} />
              </Link>
            </div>

            {/* BALANCED 2x2 CATEGORY LAYOUT */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {serviceCategories.map((category) => (
                <div key={category.id} className="space-y-2">
                  
                  {/* Category Header */}
                  <div className="flex items-center gap-2 pb-2 border-b border-white/[0.08]">
                    <span className="font-mono-code text-[10px] font-bold text-cyan-400/90 px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                      {category.number}
                    </span>
                    <div className="flex items-center gap-1.5 min-w-0">
                      {categoryIcons[category.id]}
                      <h4 className="font-display font-bold text-white text-xs tracking-wider uppercase truncate">
                        {category.title}
                      </h4>
                    </div>
                  </div>

                  {/* Compact Service Links List */}
                  <div className="space-y-0.5">
                    {category.services.map((srv) => (
                      <Link
                        key={srv.slug}
                        to={`/services/${srv.slug}`}
                        onClick={() => {
                          sound.click();
                          onClose();
                        }}
                        onMouseEnter={() => sound.hover()}
                        className="group flex items-center justify-between px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-cyan-500/20 transition-all duration-150"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <ServiceIcon
                            name={srv.icon}
                            className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 group-hover:scale-110 transition-all shrink-0"
                          />
                          <span className="text-xs font-medium truncate group-hover:translate-x-0.5 transition-transform">
                            {srv.title}
                          </span>
                        </div>

                        <ArrowRight
                          size={11}
                          className="text-cyan-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0 ml-1"
                        />
                      </Link>
                    ))}
                  </div>

                </div>
              ))}
            </div>

            {/* INTEGRATED SLIM BOTTOM ACTION STRIP */}
            <div className="px-6 py-2.5 bg-white/[0.02] border-t border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                </span>
                <span className="text-xs font-display font-semibold text-white tracking-wide">
                  Build. Grow. Scale.
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  — Custom Technology, Marketing & Creative Solutions
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to="/services"
                  onClick={() => {
                    sound.click();
                    onClose();
                  }}
                  onMouseEnter={() => sound.hover()}
                  className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-white/[0.06] transition-colors"
                >
                  <span>Explore All Services</span>
                  <ArrowUpRight size={12} className="text-cyan-400" />
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    sound.click();
                    onClose();
                    onOpenProjectModal();
                  }}
                  onMouseEnter={() => sound.hover()}
                  className="px-3 py-1 rounded-lg font-semibold text-xs bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-md shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Start a Project</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
