import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Volume2, VolumeX, ChevronDown, Sun, Moon } from 'lucide-react';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import { sound } from '../utils/sound';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onOpenProjectModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const closeTimerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleTheme = () => {
    sound.click();
    toggleTheme();
  };

  // Auto-close mega menu on route changes
  useEffect(() => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleSound = () => {
    const newState = sound.toggle();
    setAudioActive(newState);
  };

  const handleMouseEnterServices = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setMegaMenuOpen(true);
  };

  const handleMouseLeaveServices = () => {
    closeTimerRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 220);
  };

  const navLinks = [
    { name: 'Work', to: '/#work' },
    { name: 'About', to: '/#why-us' },
    { name: 'Process', to: '/#process' },
    { name: 'Insights', to: '/#technology' },
    { name: 'Contact', to: '/#footer' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled || megaMenuOpen
            ? isDark
              ? 'py-3.5 bg-[#07090e]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/50'
              : 'py-3.5 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-md shadow-slate-200/50'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* BRAND LOGO */}
            <Link
              to="/"
              onMouseEnter={() => sound.hover()}
              onClick={() => sound.click()}
              className="group flex items-center relative focus:outline-none shrink-0"
              aria-label="Sarirait Homepage"
            >
              <img
                src="/logo.png"
                alt="Sarirait"
                className={`h-8 sm:h-9 md:h-10 w-auto object-contain transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_15px_rgba(0,240,255,0.4)] ${
                  !isDark ? 'brand-logo-light' : ''
                }`}
              />
            </Link>

            {/* DESKTOP NAVIGATION LINKS */}
            <nav className={`hidden lg:flex items-center gap-1 p-1.5 rounded-full backdrop-blur-md transition-all duration-200 ${
              isDark
                ? 'bg-white/[0.03] border border-white/[0.07]'
                : 'bg-slate-100/90 border border-slate-200/90 shadow-sm'
            }`}>
              <Link
                to="/"
                onMouseEnter={() => sound.hover()}
                onClick={() => sound.click()}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isDark
                    ? 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                Home
              </Link>

              {/* SERVICES TRIGGER WITH MEGA MENU */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnterServices}
                onMouseLeave={handleMouseLeaveServices}
              >
                <button
                  type="button"
                  data-megamenu-trigger="true"
                  onClick={() => {
                    sound.click();
                    setMegaMenuOpen(!megaMenuOpen);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    megaMenuOpen
                      ? isDark
                        ? 'text-cyan-300 bg-white/[0.08] shadow-sm'
                        : 'text-cyan-700 bg-white shadow-sm font-semibold'
                      : isDark
                        ? 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                  aria-expanded={megaMenuOpen}
                >
                  <span>Services</span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${
                      megaMenuOpen
                        ? 'rotate-180 text-cyan-400'
                        : isDark
                          ? 'text-slate-400'
                          : 'text-slate-500'
                    }`}
                  />
                </button>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  onMouseEnter={() => sound.hover()}
                  onClick={() => sound.click()}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isDark
                      ? 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* RIGHT SIDE ACTIONS */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Theme Mode Toggle */}
              <button
                onClick={handleToggleTheme}
                onMouseEnter={() => sound.hover()}
                aria-label="Toggle Dark / Light Theme"
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors cursor-pointer ${
                  isDark
                    ? 'border-white/10 hover:border-cyan-400/50 bg-white/[0.04] text-slate-400 hover:text-cyan-300'
                    : 'border-slate-200 hover:border-cyan-500 bg-white text-slate-700 hover:text-cyan-700 shadow-sm'
                }`}
              >
                {isDark ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-cyan-600" />}
              </button>

              {/* Micro-Sound Ambient Toggle */}
              <button
                onClick={toggleSound}
                onMouseEnter={() => sound.hover()}
                aria-label="Toggle interaction audio"
                title={audioActive ? "Mute interactive audio" : "Enable futuristic sound effects"}
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors cursor-pointer ${
                  isDark
                    ? 'border-white/10 hover:border-cyan-400/50 bg-white/[0.04] text-slate-400 hover:text-cyan-300'
                    : 'border-slate-200 hover:border-cyan-500 bg-white text-slate-700 hover:text-cyan-700 shadow-sm'
                }`}
              >
                {audioActive ? <Volume2 size={15} className="text-cyan-400" /> : <VolumeX size={15} />}
              </button>

              {/* Primary CTA */}
              <button
                onClick={() => {
                  sound.click();
                  onOpenProjectModal();
                }}
                onMouseEnter={() => sound.hover()}
                className="relative group px-5 py-2.5 rounded-full font-semibold text-xs tracking-wider uppercase overflow-hidden flex items-center gap-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Start a Project
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>

            {/* MOBILE MENU TOGGLE */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={handleToggleTheme}
                className={`p-2 rounded-lg ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-cyan-600" />}
              </button>
              <button
                onClick={toggleSound}
                className={`p-2 rounded-lg ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                aria-label="Toggle Sound"
              >
                {audioActive ? <Volume2 size={18} className="text-cyan-400" /> : <VolumeX size={18} />}
              </button>
              <button
                onClick={() => {
                  sound.click();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className={`p-2 rounded-xl border focus:outline-none cursor-pointer ${
                  isDark
                    ? 'bg-white/[0.05] border-white/10 text-white'
                    : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                }`}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>

        {/* SERVICES MEGA MENU CONTAINER */}
        <div
          onMouseEnter={handleMouseEnterServices}
          onMouseLeave={handleMouseLeaveServices}
        >
          <MegaMenu
            isOpen={megaMenuOpen}
            onClose={() => setMegaMenuOpen(false)}
            onOpenProjectModal={onOpenProjectModal}
          />
        </div>
      </header>

      {/* MOBILE ACCORDION MENU */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenProjectModal={onOpenProjectModal}
      />
    </>
  );
}
