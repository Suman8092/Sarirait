import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, ShieldCheck, Activity, ShoppingBag, Sparkles, Flame, Zap, Wrench, Droplets, Clock3 } from 'lucide-react';
import { sound } from '../../utils/sound';

const previewProjects = [
  {
    id: 'anabolic-nutrition',
    label: 'Anabolic',
    name: 'Anabolic Nutrition',
    domain: 'anabolicnutrition.in',
    url: 'https://anabolicnutrition.in/',
    logo: '/projects/anabolic.jpg',
    accent: '#ed5437',
    accentWash: 'rgba(237, 84, 55, 0.12)',
    accentBorder: 'rgba(237, 84, 55, 0.32)',
    category: 'Sports nutrition',
    headline: 'Trusted quality for true results',
    description: 'Browse training supplements across strength, recovery and fat loss.',
    prompt: 'Choose a goal to preview the range.',
    mode: 'store',
    filters: ['Strength', 'Recovery', 'Fat loss'],
    items: [
      { id: 'mega-mass', category: 'Strength', name: 'Intense Mega Mass 4000', detail: 'Mass building', icon: Activity },
      { id: 'tri-creatine', category: 'Strength', name: 'Tri-Creatine · 300 g', detail: 'Strength support', icon: Activity },
      { id: 'bcaa', category: 'Recovery', name: 'BCAA 2:1:1 · 300 g', detail: 'Recovery', icon: Sparkles },
      { id: 'glutamine', category: 'Recovery', name: 'L-Glutamine · 300 g', detail: 'Recovery support', icon: Sparkles },
      { id: 'slim-lean', category: 'Fat loss', name: 'Slim Lean Pro', detail: 'Fat loss', icon: Flame },
    ],
  },
  {
    id: 'diarashine',
    label: 'DiaraShine',
    name: 'DiaraShine',
    domain: 'diarashine.com',
    url: 'https://diarashine.com/',
    logo: '/projects/diarashine.jpg',
    accent: '#b49142',
    accentWash: 'rgba(180, 145, 66, 0.13)',
    accentBorder: 'rgba(180, 145, 66, 0.34)',
    category: 'Candles & home fragrance',
    headline: 'Candles for every little moment',
    description: 'Explore dessert candles, floral pieces and ready-to-gift collections.',
    prompt: 'Choose a collection to browse.',
    mode: 'store',
    filters: ['Dessert', 'Floral', 'Gift sets'],
    items: [
      { id: 'rasmalai', category: 'Dessert', name: 'Rasmalai Candle', detail: 'Dessert candle', icon: Flame },
      { id: 'choco-cupcake', category: 'Dessert', name: 'Choco-cupcake', detail: 'Dessert candle', icon: Flame },
      { id: 'ice-cream', category: 'Dessert', name: 'Chocolate Ice-cream Cup', detail: 'Dessert candle', icon: Flame },
      { id: 'rose-peony', category: 'Floral', name: 'Rose Big Peony', detail: 'Floral candle', icon: Sparkles },
      { id: 'teddy', category: 'Floral', name: 'Teddy Candle', detail: 'Sculpted candle', icon: Sparkles },
      { id: 'festive-set', category: 'Gift sets', name: 'Festive Glow Set', detail: 'Gift collection', icon: Sparkles },
      { id: 'home-fragrance', category: 'Gift sets', name: 'Heart & Blossom Set', detail: 'Home fragrance', icon: Sparkles },
    ],
  },
  {
    id: 'chabhi',
    label: 'Chabhi',
    name: 'Chabhi',
    domain: 'chabhi.com',
    url: 'https://chabhi.com/',
    logo: '/projects/chabhi.jpg',
    accent: '#31559b',
    accentWash: 'rgba(49, 85, 155, 0.12)',
    accentBorder: 'rgba(49, 85, 155, 0.3)',
    category: 'Home services',
    headline: 'Home services at your doorstep',
    description: 'Pick a service and preview a simple, trusted booking journey.',
    prompt: 'Choose a service to see the demo flow.',
    mode: 'service',
    filters: ['Appliances', 'Electrical', 'Plumbing', 'Cleaning'],
    items: [
      { id: 'ac-clean', category: 'Appliances', name: 'AC deep clean & tuning', detail: 'Cooling and airflow check', icon: Zap },
      { id: 'wiring', category: 'Electrical', name: 'Switchboard & wiring repair', detail: 'Safe home electrical fixes', icon: Wrench },
      { id: 'pipe-fix', category: 'Plumbing', name: 'Leakage and pipe fixing', detail: 'Tap, pipe and drain repair', icon: Droplets },
      { id: 'home-clean', category: 'Cleaning', name: 'Deep home cleaning', detail: 'Room-by-room home care', icon: Sparkles },
    ],
  },
];

const availableSlots = ['10:30 AM', '1:15 PM', '4:45 PM'];

export function DeviceShowcase3D() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [activeProjectId, setActiveProjectId] = useState('anabolic-nutrition');
  const [activeFilter, setActiveFilter] = useState('Strength');
  const [selectedItemId, setSelectedItemId] = useState('mega-mass');
  const [previewBagCount, setPreviewBagCount] = useState(0);
  const [showSlots, setShowSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');

  const activeProject = previewProjects.find((project) => project.id === activeProjectId) || previewProjects[0];
  const visibleItems = activeProject.items.filter((item) => item.category === activeFilter);
  const selectedItem = visibleItems.find((item) => item.id === selectedItemId) || visibleItems[0];

  const chooseProject = (project) => {
    setActiveProjectId(project.id);
    setActiveFilter(project.filters[0]);
    setSelectedItemId(project.items[0]?.id || '');
    setPreviewBagCount(0);
    setShowSlots(false);
    setSelectedSlot('');
    sound.click();
  };

  const chooseFilter = (filter) => {
    setActiveFilter(filter);
    setSelectedItemId(activeProject.items.find((item) => item.category === filter)?.id || '');
    setShowSlots(false);
    setSelectedSlot('');
    sound.click();
  };

  // Mouse tilt position
  const tiltRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const rafRef = useRef(null);
  const isLoopRunning = useRef(false);
  const isHovered = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (
      !container ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) return undefined;

    // Smooth RAF loop with automatic idle sleep
    const updateTilt = () => {
      const { x, y, targetX, targetY } = tiltRef.current;
      const dx = targetX - x;
      const dy = targetY - y;

      // When settled back to rest or hover target, stop the RAF loop completely
      if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) {
        tiltRef.current.x = targetX;
        tiltRef.current.y = targetY;
        if (cardRef.current) {
          cardRef.current.style.transform = `perspective(1200px) rotateX(${targetX + 2}deg) rotateY(${targetY}deg) translateZ(0)`;
        }
        isLoopRunning.current = false;
        return;
      }

      tiltRef.current.x += dx * 0.14;
      tiltRef.current.y += dy * 0.14;

      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1200px) rotateX(${tiltRef.current.x + 2}deg) rotateY(${tiltRef.current.y}deg) translateZ(0)`;
      }

      rafRef.current = requestAnimationFrame(updateTilt);
    };

    const wakeTiltLoop = () => {
      if (!isLoopRunning.current) {
        isLoopRunning.current = true;
        rafRef.current = requestAnimationFrame(updateTilt);
      }
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate subtle degrees (-6 to 6 deg)
      tiltRef.current.targetY = ((x - centerX) / centerX) * 6;
      tiltRef.current.targetX = -((y - centerY) / centerY) * 5;
      isHovered.current = true;
      wakeTiltLoop();
    };

    const handleMouseLeave = () => {
      tiltRef.current.targetX = 0;
      tiltRef.current.targetY = 0;
      isHovered.current = false;
      wakeTiltLoop();
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full py-6 sm:py-10 flex items-center justify-center select-none"
      style={{ perspective: '1200px' }}
    >
      {/* 3D TILT LAPTOP CONTAINER - NO transition-transform to prevent animation collision */}
      <div
        ref={cardRef}
        className="relative w-full max-w-4xl flex flex-col items-center"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'perspective(1200px) rotateX(2deg) rotateY(0deg)'
        }}
      >
        {/* 1. LAPTOP SCREEN (LID) */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-[#2a3447] via-[#161d2b] to-[#0d121c] border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
          {/* Top Notch / Camera Bezel */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full bg-black/60 flex items-center justify-center gap-1.5 z-20">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1e293b] border border-white/10" />
            <div className="w-1 h-1 rounded-full bg-cyan-500/60" />
          </div>

          {/* SCREEN DISPLAY SURFACE */}
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#080d19] border border-white/10 shadow-inner flex flex-col">
            {/* Screen Header / Browser Bar */}
            <div className="px-3 sm:px-4 py-2.5 bg-[#0d1424] border-b border-white/[0.08] flex items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
              </div>
              <a
                href={activeProject.url}
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-w-0 max-w-xl mx-auto px-2 sm:px-3 py-1 rounded-lg bg-black/40 border border-white/[0.06] flex items-center justify-center gap-2 text-[9px] sm:text-xs font-mono-code text-slate-400 hover:text-white transition-colors"
                aria-label={`Open ${activeProject.name} live website in a new tab`}
              >
                <ShieldCheck size={13} className="text-cyan-400 shrink-0" />
                <span className="truncate">https://{activeProject.domain}</span>
                <ArrowUpRight size={12} className="shrink-0" />
              </a>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[9px] sm:text-[10px] font-mono-code text-emerald-400 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">PROJECT PREVIEW</span>
                <span className="sm:hidden">PREVIEW</span>
              </div>
            </div>

            {/* Interactive project preview */}
            <div className="p-3 sm:p-5 md:p-7 bg-gradient-to-b from-[#101827] via-[#090e18] to-[#070a11]">
              <div className="flex items-center justify-between gap-2 mb-4 sm:mb-5">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0" role="tablist" aria-label="Choose a project preview">
                  {previewProjects.map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      role="tab"
                      aria-selected={activeProject.id === project.id}
                      onClick={() => chooseProject(project)}
                      className={`inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg border text-[10px] sm:text-xs font-semibold transition-all min-w-0 ${
                        activeProject.id === project.id
                          ? 'text-white shadow-[0_0_24px_var(--project-wash)]'
                          : 'text-slate-400 border-white/[0.08] bg-white/[0.025] hover:text-white hover:bg-white/[0.06]'
                      }`}
                      style={activeProject.id === project.id ? {
                        color: project.accent,
                        borderColor: project.accentBorder,
                        backgroundColor: project.accentWash,
                        '--project-wash': project.accentWash,
                      } : undefined}
                    >
                      <img src={project.logo} alt="" className="w-5 h-5 sm:w-6 sm:h-6 rounded-md object-contain bg-white p-0.5 shrink-0" />
                      <span className="truncate">{project.label}</span>
                    </button>
                  ))}
                </div>
                {activeProject.mode === 'store' && (
                  <div className="hidden sm:flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400 px-2.5 py-1.5 rounded-lg bg-white/[0.035] border border-white/[0.08] shrink-0">
                    <ShoppingBag size={13} className="text-cyan-300" />
                    Preview bag <span className="text-white font-bold">{previewBagCount}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.5fr)] gap-3 sm:gap-4">
                <section className="relative overflow-hidden p-4 sm:p-5 rounded-xl border bg-gradient-to-br from-white/[0.055] to-white/[0.015] min-h-[165px] sm:min-h-[205px] flex flex-col justify-between" style={{ borderColor: activeProject.accentBorder }}>
                  <div className="absolute -right-8 -top-10 w-36 h-36 rounded-full blur-3xl opacity-30 pointer-events-none" style={{ backgroundColor: activeProject.accent }} />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-4">
                      <img src={activeProject.logo} alt={`${activeProject.name} logo`} className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg object-contain bg-white p-1.5" />
                      <div className="min-w-0">
                        <p className="text-white text-xs sm:text-sm font-bold truncate">{activeProject.name}</p>
                        <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.12em]" style={{ color: activeProject.accent }}>{activeProject.category}</p>
                      </div>
                    </div>
                    <h4 className="text-lg sm:text-xl lg:text-2xl font-display font-bold text-white tracking-tight leading-tight">{activeProject.headline}</h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-2 leading-relaxed">{activeProject.description}</p>
                  </div>
                  <a href={activeProject.url} target="_blank" rel="noreferrer" className="relative inline-flex items-center gap-1.5 text-[11px] font-semibold mt-4 hover:gap-2.5 transition-all" style={{ color: activeProject.accent }}>
                    Open live site <ArrowUpRight size={13} />
                  </a>
                </section>

                <section className="p-3 sm:p-4 rounded-xl bg-black/25 border border-white/[0.09] min-w-0">
                  <div className="flex items-start sm:items-center justify-between gap-2 mb-3">
                    <div className="min-w-0">
                      <p className="text-[9px] sm:text-[10px] font-mono-code uppercase tracking-wider text-slate-400">{activeProject.mode === 'service' ? 'Choose a service' : 'Explore the collection'}</p>
                      <p className="text-xs sm:text-sm font-bold text-white mt-1 truncate">{selectedItem?.name || activeProject.prompt}</p>
                    </div>
                    <span className="text-[9px] font-mono-code text-slate-500 shrink-0">{String(visibleItems.length).padStart(2, '0')} OPTIONS</span>
                  </div>

                  <div className="flex gap-1.5 overflow-x-auto pb-2 mb-2 scrollbar-hide" role="tablist" aria-label="Filter preview items">
                    {activeProject.filters.map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        role="tab"
                        aria-selected={activeFilter === filter}
                        onClick={() => chooseFilter(filter)}
                        className={`px-2.5 py-1.5 rounded-full whitespace-nowrap text-[9px] sm:text-[10px] font-semibold border transition-colors ${activeFilter === filter ? 'text-white' : 'text-slate-400 border-white/[0.08] bg-white/[0.025] hover:text-white'}`}
                        style={activeFilter === filter ? { color: activeProject.accent, borderColor: activeProject.accentBorder, backgroundColor: activeProject.accentWash } : undefined}
                      >{filter}</button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {visibleItems.map((item) => {
                      const ItemIcon = item.icon;
                      const isSelected = selectedItem?.id === item.id;
                      return (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => { setSelectedItemId(item.id); setSelectedSlot(''); sound.click(); }}
                          aria-pressed={isSelected}
                          className={`text-left flex items-start gap-2 p-2.5 rounded-lg border transition-all ${isSelected ? 'bg-white/[0.075]' : 'bg-white/[0.02] border-white/[0.07] hover:bg-white/[0.05]'}`}
                          style={isSelected ? { borderColor: activeProject.accentBorder, backgroundColor: activeProject.accentWash } : undefined}
                        >
                          <span className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ color: activeProject.accent, backgroundColor: activeProject.accentWash }}><ItemIcon size={14} /></span>
                          <span className="min-w-0">
                            <span className="block text-[10px] sm:text-[11px] font-semibold text-white leading-snug">{item.name}</span>
                            <span className="block text-[9px] text-slate-500 mt-0.5">{item.detail}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-white/[0.07]">
                    {activeProject.mode === 'store' ? (
                      <>
                        <p className="text-[9px] sm:text-[10px] text-slate-500 flex items-center gap-1.5"><Sparkles size={12} style={{ color: activeProject.accent }} /> {activeProject.prompt}</p>
                        <button type="button" onClick={() => { setPreviewBagCount((count) => count + 1); sound.click(); }} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold text-[#081019] transition-transform hover:scale-[1.03] active:scale-[0.98]" style={{ backgroundColor: activeProject.accent }}>
                          <ShoppingBag size={13} /> Add to bag ({previewBagCount})
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="text-[9px] sm:text-[10px] text-slate-500">{selectedSlot ? `Preview slot selected: ${selectedSlot}` : activeProject.prompt}</p>
                        {!showSlots ? (
                          <button type="button" onClick={() => { setShowSlots(true); sound.click(); }} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold text-[#081019] transition-transform hover:scale-[1.03]" style={{ backgroundColor: activeProject.accent }}><Clock3 size={13} /> Check slots</button>
                        ) : (
                          <div className="flex flex-wrap gap-1.5" aria-label="Demo appointment slots">
                            {availableSlots.map((slot) => <button type="button" key={slot} onClick={() => { setSelectedSlot(slot); sound.click(); }} className={`px-2 py-1.5 rounded-md border text-[9px] font-semibold transition-colors ${selectedSlot === slot ? 'text-white' : 'text-slate-300 border-white/10 bg-white/[0.04]'}`} style={selectedSlot === slot ? { color: activeProject.accent, borderColor: activeProject.accentBorder, backgroundColor: activeProject.accentWash } : undefined}>{slot}</button>)}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </section>
              </div>
            </div>

            {/* Specular Screen Gloss Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none" />
          </div>
        </div>

        {/* 2. LAPTOP LOWER CHASSIS & KEYBOARD BASE */}
        <div className="w-[104%] h-5 sm:h-7 bg-gradient-to-b from-[#222b3b] via-[#18202d] to-[#0c111a] rounded-b-2xl border-t border-white/20 border-b border-white/5 shadow-2xl relative flex items-center justify-center -mt-1 z-10">
          {/* Subtle Front Lip Notch */}
          <div className="w-20 sm:w-28 h-1 rounded-full bg-cyan-500/40 shadow-sm shadow-cyan-500/50" />
        </div>

        {/* 3. SOFT AMBIENT CYAN CONTACT GLOW */}
        <div className="w-3/4 h-10 bg-cyan-500/20 rounded-full blur-[40px] pointer-events-none -mt-4 -z-10" />
      </div>
    </div>
  );
}
