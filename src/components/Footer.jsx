import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2 
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function Footer({ onOpenProjectModal }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      sound.success();
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const socialLinks = [
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78Z"/>
        </svg>
      )
    },
    {
      label: "Instagram",
      href: "https://instagram.com",
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
        </svg>
      )
    },
    {
      label: "Facebook",
      href: "https://facebook.com",
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      label: "X",
      href: "https://x.com",
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      label: "YouTube",
      href: "https://youtube.com",
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    }
  ];

  return (
    <footer id="footer" className="relative border-t border-white/[0.08] bg-[#05070b] text-slate-300 pt-20 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* MAIN 6-COLUMN BALANCED FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-16 border-b border-white/[0.08]">
          
          {/* BRAND COLUMN (2 COLS) */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              onMouseEnter={() => sound.hover()}
              onClick={() => sound.click()}
              className="inline-flex items-center focus:outline-none group"
              aria-label="Sarirait Homepage"
            >
              <img
                src="/logo.png"
                alt="Sarirait"
                className="h-9 w-auto object-contain transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_18px_rgba(0,240,255,0.35)]"
              />
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              Technology, creativity and digital growth for ambitious businesses worldwide.
            </p>

            {/* NEWSLETTER */}
            <div className="pt-1">
              <span className="text-[11px] font-mono-code uppercase text-slate-300 block mb-1.5">
                Stay updated
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-1.5">
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 flex-1 min-w-0"
                />
                <button
                  type="submit"
                  onMouseEnter={() => sound.hover()}
                  className="px-2.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                  aria-label="Subscribe to newsletter"
                >
                  {subscribed ? <CheckCircle2 size={14} /> : <Send size={14} />}
                </button>
              </form>
            </div>
          </div>

          {/* COLUMN 1: COMPANY (2 COLS) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono-code uppercase tracking-widest text-white font-semibold">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/#why-us" className="hover:text-cyan-400 transition-colors">About</Link>
              </li>
              <li>
                <Link to="/#work" className="hover:text-cyan-400 transition-colors">Work</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-400 transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/#process" className="hover:text-cyan-400 transition-colors">Process</Link>
              </li>
              <li>
                <Link to="/#technology" className="hover:text-cyan-400 transition-colors">Insights</Link>
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
          <div className="lg:col-span-2 space-y-3">
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
              <li>
                <Link to="/services/ppc-marketing" className="hover:text-cyan-400 transition-colors">PPC Marketing</Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: MARKETING (2 COLS) */}
          <div className="lg:col-span-2 space-y-3">
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
            </ul>
          </div>

          {/* COLUMN 4: CREATIVE SERVICES (2 COLS) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono-code uppercase tracking-widest text-white font-semibold">
              Creative Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services/branding-solutions" className="hover:text-cyan-400 transition-colors">Branding Solutions</Link>
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
          <div className="lg:col-span-2 space-y-3">
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

        {/* BOTTOM STRIP: SOCIALS & COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono-code">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((soc) => (
              <a
                key={soc.label}
                href={soc.href}
                target="_blank"
                rel="noreferrer"
                aria-label={soc.label}
                onMouseEnter={() => sound.hover()}
                className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 hover:border-cyan-400 hover:text-cyan-300 flex items-center justify-center transition-colors"
              >
                {soc.svg}
              </a>
            ))}
          </div>

          {/* Legal / Copyright */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-500">
            <span>© 2026 Sarirait. All rights reserved.</span>
            <a href="#privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-300 transition-colors">Terms &amp; Conditions</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
