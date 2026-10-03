import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { sound } from '../utils/sound';
import { useTheme } from '../context/ThemeContext';
import { useReducedMotion } from 'framer-motion';
import { useLenis } from './SmoothScroll';

export default function Footer({ onOpenProjectModal }) {
  const { isDark } = useTheme();
  const reducedMotion = false;
  const lenis = useLenis();

  const scrollToTop = () => {
    sound.click();
    if (lenis) lenis.scrollTo(0, { duration: 1.1 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="relative border-t border-white/[0.08] bg-[#05070b] text-slate-300 pt-16 sm:pt-20 pb-12 overflow-hidden w-full max-w-full">
      {/* Background ambient lighting */}
      <div className="ambient-glow absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[250px] sm:h-[300px] bg-cyan-500/5 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* MAIN 6-COLUMN BALANCED FOOTER GRID */}
        <div data-motion-stagger="70" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-16 border-b border-white/[0.08]">
          
          {/* BRAND COLUMN (2 COLS) */}
          <div data-motion-reveal className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              onMouseEnter={() => sound.hover()}
              onClick={() => sound.click()}
              className="inline-flex items-center focus:outline-none group"
              aria-label="Sarirait Homepage"
            >
              <img
                src={isDark ? "/logo.png" : "/logo-light.png"}
                alt="Sarirait"
                className="h-9 w-auto object-contain transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_18px_rgba(0,240,255,0.35)]"
              />
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              Brand design, digital experiences and marketing for businesses ready to grow.
            </p>

            <div className="space-y-1.5 text-xs text-slate-400 pt-1">
              <div className="flex items-start gap-2">
                <MapPin size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-snug">1601, 16th floor, Fairfox, EON, Noida Sector 140A</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-emerald-400 shrink-0" />
                <a href="tel:+918709901636" className="hover:text-cyan-300 transition-colors">+91 8709901636</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-cyan-400 shrink-0" />
                <a href="mailto:info@sarirait.com" className="hover:text-cyan-300 transition-colors">info@sarirait.com</a>
              </div>
            </div>

            <button
              data-magnetic
              type="button"
              onClick={() => {
                sound.click();
                onOpenProjectModal();
              }}
              onMouseEnter={() => sound.hover()}
              className={`inline-flex items-center gap-2 text-xs font-semibold transition-colors cursor-pointer ${
                isDark ? 'text-cyan-300 hover:text-white' : 'text-cyan-700 hover:text-cyan-900 font-bold'
              }`}
            >
              Tell us about your project <ArrowUpRight size={14} />
            </button>
          </div>

          {/* COLUMN 1: COMPANY (2 COLS) */}
          <div data-motion-reveal style={{ '--motion-delay': '45ms' }} className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono-code uppercase tracking-widest text-white font-semibold">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/#why-us" className="hover:text-cyan-400 transition-colors">About</Link>
              </li>
              <li>
                <Link to="/work" className="hover:text-cyan-400 transition-colors">Work</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-400 transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/#process" className="hover:text-cyan-400 transition-colors">Process</Link>
              </li>
              <li>
                <Link to="/#technology" className="hover:text-cyan-400 transition-colors">Technology</Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    sound.click();
                    onOpenProjectModal();
                  }}
                  className="hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 2: DEVELOPMENT (2 COLS) */}
          <div data-motion-reveal style={{ '--motion-delay': '90ms' }} className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono-code uppercase tracking-widest text-white font-semibold">
              Development
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services/website-development" className="hover:text-cyan-400 transition-colors">Website Development</Link>
              </li>
              <li>
                <Link to="/services/mobile-app-development" className="hover:text-cyan-400 transition-colors">Mobile App Development</Link>
              </li>
              <li>
                <Link to="/services/web-applications" className="hover:text-cyan-400 transition-colors">Web Applications</Link>
              </li>
              <li>
                <Link to="/services/ecommerce-solutions" className="hover:text-cyan-400 transition-colors">E-Commerce Solutions</Link>
              </li>
              <li>
                <Link to="/services/website-maintenance" className="hover:text-cyan-400 transition-colors">Website Maintenance</Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: MARKETING (2 COLS) */}
          <div data-motion-reveal style={{ '--motion-delay': '135ms' }} className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono-code uppercase tracking-widest text-white font-semibold">
              Digital Marketing
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services/seo-services" className="hover:text-cyan-400 transition-colors">SEO Services</Link>
              </li>
              <li>
                <Link to="/services/google-business-profile" className="hover:text-cyan-400 transition-colors">Google Business Profile</Link>
              </li>
              <li>
                <Link to="/services/social-media-marketing" className="hover:text-cyan-400 transition-colors">Social Media Marketing</Link>
              </li>
              <li>
                <Link to="/services/google-meta-ads" className="hover:text-cyan-400 transition-colors">Google &amp; Meta Ads</Link>
              </li>
              <li>
                <Link to="/services/email-marketing" className="hover:text-cyan-400 transition-colors">Email Marketing</Link>
              </li>
              <li>
                <Link to="/services/whatsapp-marketing" className="hover:text-cyan-400 transition-colors">WhatsApp Marketing</Link>
              </li>
              <li>
                <Link to="/services/ppc-marketing" className="hover:text-cyan-400 transition-colors">Lead Generation &amp; Paid Campaigns</Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: CREATIVE SERVICES (2 COLS) */}
          <div data-motion-reveal style={{ '--motion-delay': '180ms' }} className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono-code uppercase tracking-widest text-white font-semibold">
              Creative Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services/branding-solutions" className="hover:text-cyan-400 transition-colors">Brand Strategy &amp; Branding</Link>
              </li>
              <li>
                <Link to="/services/graphic-design" className="hover:text-cyan-400 transition-colors">Graphic Design</Link>
              </li>
              <li>
                <Link to="/services/packaging-product-design" className="hover:text-cyan-400 transition-colors">Packaging &amp; Product Design</Link>
              </li>
              <li>
                <Link to="/services/reels-video-marketing" className="hover:text-cyan-400 transition-colors">Reels &amp; Video Marketing</Link>
              </li>
              <li>
                <Link to="/services/logo-branding" className="hover:text-cyan-400 transition-colors">Logo &amp; Branding</Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 5: BUSINESS SOLUTIONS (2 COLS) */}
          <div data-motion-reveal style={{ '--motion-delay': '225ms' }} className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono-code uppercase tracking-widest text-white font-semibold">
              Business Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services/erp-solutions" className="hover:text-cyan-400 transition-colors">ERP Solutions</Link>
              </li>
              <li>
                <Link to="/services/crm-software" className="hover:text-cyan-400 transition-colors">CRM Software</Link>
              </li>
              <li>
                <Link to="/services/saas-solutions" className="hover:text-cyan-400 transition-colors">SaaS Solutions</Link>
              </li>
              <li>
                <Link to="/services/cloud-solutions" className="hover:text-cyan-400 transition-colors">Cloud Solutions</Link>
              </li>
              <li>
                <Link to="/services/custom-software-development" className="hover:text-cyan-400 transition-colors">Custom Software</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM STRIP: SOCIALS & COPYRIGHT & BACK TO TOP */}
        <div data-motion-reveal className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono-code">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-slate-400">
            <a href="mailto:info@sarirait.com" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
              <Mail size={12} className="text-cyan-400" />
              <span>info@sarirait.com</span>
            </a>
            <a href="tel:+918709901636" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
              <Phone size={12} className="text-emerald-400" />
              <span>+91 8709901636</span>
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-cyan-400 shrink-0" />
              <span>1601, 16th floor, Fairfox, EON, Noida Sector 140A</span>
            </span>
          </div>

          {/* Legal / Copyright & Back to Top */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <span>© 2026 Sarirait. All rights reserved.</span>
            <button
              onClick={scrollToTop}
              onMouseEnter={() => sound.hover()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-cyan-400/40 bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-cyan-300 transition-all cursor-pointer group"
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <ArrowUp size={12} className="transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
