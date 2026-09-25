import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projectsData } from '../data/projects';
import { DeviceShowcase3D } from './3d/DeviceShowcase3D';
import CaseStudyModal from './CaseStudyModal';
import { sound } from '../utils/sound';

export default function Portfolio({ onOpenProjectModal }) {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="work" className="relative py-28 bg-[#07090e] border-t border-white/[0.06]">
      {/* Background ambient light */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono-code text-cyan-400 mb-4 border border-cyan-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>SELECTED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight">
              Ideas transformed into <br />
              <span className="text-gradient-cyan">digital experiences.</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md">
            A curated selection of modern applications, bespoke digital flagships, and autonomous AI systems built for ambitious category leaders.
          </p>
        </div>

        {/* SECTION 11: LARGE PROJECT PRESENTATION CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              onMouseEnter={() => sound.hover()}
              data-cursor="view"
              onClick={() => {
                sound.click();
                setSelectedProject(project);
              }}
              className="group relative rounded-3xl glass-card overflow-hidden border border-white/[0.08] hover:border-cyan-500/40 cursor-pointer flex flex-col justify-between"
            >
              {/* Visual Mockup Header Area */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-gradient-to-br from-[#0c1220] to-[#07090e] p-6 flex flex-col justify-between">
                {/* Background glowing gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${project.themeColor} opacity-50 group-hover:opacity-80 transition-opacity duration-500`} />
                
                {/* Top tags */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-mono-code px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-cyan-300">
                    {project.industry}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-cyan-500 group-hover:text-black group-hover:border-cyan-400 transition-all duration-300">
                    <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Simulated High-Tech UI Mockup Inside Project Card */}
                <div className="relative z-10 rounded-2xl bg-black/60 backdrop-blur-lg border border-white/10 p-5 group-hover:scale-[1.02] transition-transform duration-500 shadow-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[10px] font-mono-code text-slate-400">{project.client} // LIVE</span>
                  </div>

                  <div className="pt-4 grid grid-cols-2 gap-4">
                    {project.results.slice(0, 2).map((res, i) => (
                      <div key={i}>
                        <div className="text-2xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {res.value}
                        </div>
                        <div className="text-[11px] font-mono-code text-slate-400 uppercase mt-0.5">
                          {res.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Metadata Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono-code text-cyan-400">{project.category}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs font-mono-code text-slate-400">{project.year}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mt-3 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {project.services.slice(0, 2).map((srv, idx) => (
                      <span key={idx} className="text-xs font-mono-code px-2.5 py-1 rounded bg-white/[0.04] text-slate-300">
                        {srv}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-bold font-mono-code uppercase text-cyan-400 group-hover:underline flex items-center gap-1">
                    <span>{project.linkText}</span>
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SECTION 12: 3D PROJECT SHOWCASE (FLOATING LAPTOP DEVICE) */}
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 glass-card border border-cyan-500/20 overflow-hidden bg-gradient-to-b from-[#0c1220]/80 via-[#07090e] to-[#07090e]">
          
          <div className="relative z-10 text-center max-w-3xl mx-auto mb-6">
            <span className="text-xs font-mono-code uppercase tracking-widest text-cyan-400 mb-2 block">
              3D Interactive Device Experience
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-[1.15]">
              “Built for performance. <br className="hidden sm:inline" />Designed for impact.”
            </h3>
            <p className="text-slate-400 text-sm sm:text-base mt-3">
              Rotate, inspect, and experience how our architectures translate into responsive, lightning-fast digital flagship software.
            </p>
          </div>

          {/* THE 3D INTERACTIVE DEVICE CANVAS */}
          <DeviceShowcase3D />

          {/* Interactive footer details inside showcase */}
          <div className="relative z-10 mt-8 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-around gap-6 text-center">
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono-code text-cyan-400">WebGL 2.0</div>
              <div className="text-xs text-slate-400 font-mono-code uppercase">Hardware Accelerated</div>
            </div>
            <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono-code text-violet-400">Zero Framedrops</div>
              <div className="text-xs text-slate-400 font-mono-code uppercase">60FPS Smooth Parallax</div>
            </div>
            <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono-code text-white">Full Responsive</div>
              <div className="text-xs text-slate-400 font-mono-code uppercase">Fluid Across Viewports</div>
            </div>
          </div>

        </div>

      </div>

      {/* Case Study Detailed Modal */}
      <CaseStudyModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenProjectModal={onOpenProjectModal}
      />
    </section>
  );
}
