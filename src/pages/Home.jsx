import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustSection from '../components/TrustSection';
import ServicesPreview from '../components/ServicesPreview';
import Portfolio from '../components/Portfolio';
import WhySarirait from '../components/WhySarirait';
import Process from '../components/Process';
import Technologies from '../components/Technologies';
import AISection from '../components/AISection';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import ProjectModal from '../components/ProjectModal';
import { useTheme } from '../context/ThemeContext';

export default function Home() {
  const { isDark } = useTheme();
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  const handleOpenProjectModal = () => {
    setProjectModalOpen(true);
  };

  const handleCloseProjectModal = () => {
    setProjectModalOpen(false);
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-300 w-full max-w-full overflow-x-clip ${
      isDark
        ? 'bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200'
        : 'bg-slate-50 text-slate-900 selection:bg-sky-500/30 selection:text-sky-900'
    }`}>
      {/* Global Navigation */}
      <Navbar onOpenProjectModal={handleOpenProjectModal} />

      {/* Main Page Flow */}
      <main className="w-full max-w-full overflow-x-clip">
        {/* 1. Hero with Interactive 3D Digital Core */}
        <Hero onOpenProjectModal={handleOpenProjectModal} />

        {/* 2. Trust & Metrics & Partner Marquee */}
        <TrustSection />

        {/* 3. Services Preview: 4 Categories Showcase */}
        <ServicesPreview />

        {/* 4. Selected Work & 3D Laptop Showcase */}
        <Portfolio onOpenProjectModal={handleOpenProjectModal} />

        {/* 5. Why Sarirait: 4 Core Principles */}
        <WhySarirait />

        {/* 6. Agile 6-Step Process */}
        <Process />

        {/* 7. Technology Stack Matrix */}
        <Technologies />

        {/* 8. AI and workflow ideas */}
        <AISection onOpenProjectModal={handleOpenProjectModal} />

        {/* 9. Connected brand, web and marketing services */}
        <Testimonials />

        {/* 10. Frequently Asked Questions */}
        <FAQ onOpenProjectModal={handleOpenProjectModal} />

        {/* 11. Final Immersive CTA */}
        <FinalCTA onOpenProjectModal={handleOpenProjectModal} />
      </main>

      {/* Global Comprehensive Footer */}
      <Footer onOpenProjectModal={handleOpenProjectModal} />

      {/* Interactive Project Inquiry Briefing Modal */}
      <ProjectModal
        isOpen={projectModalOpen}
        onClose={handleCloseProjectModal}
      />
    </div>
  );
}

