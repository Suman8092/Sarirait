import React from 'react';
import { Layers, Monitor, Megaphone } from 'lucide-react';

const waysWeHelp = [
  {
    icon: <Layers className="w-6 h-6 text-cyan-300" />,
    title: "Give your brand a clear identity",
    description: "Bring your logo, colors, typography and message together into a system people can recognize."
  },
  {
    icon: <Monitor className="w-6 h-6 text-violet-300" />,
    title: "Make the online experience easier",
    description: "Help customers understand what you offer and find their way through your website, store or app."
  },
  {
    icon: <Megaphone className="w-6 h-6 text-sky-300" />,
    title: "Show up where your audience is",
    description: "Plan useful content and marketing activity that reflects your brand and speaks to the right people."
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 sm:py-28 bg-[#07090e] border-t border-white/[0.06] overflow-hidden">
      <div className="ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono-code text-cyan-400 mb-4 border border-cyan-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>WHAT WE CAN HELP WITH</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Every part of your brand, <br />
            <span className="text-gradient-cyan">working together.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-2xl">
            From the first impression to ongoing communication, we help make the experience feel connected and considered.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {waysWeHelp.map((item) => (
            <article key={item.title} className="p-6 sm:p-8 rounded-3xl glass-card border border-white/[0.08]">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
