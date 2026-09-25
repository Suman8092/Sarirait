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
import CustomCursor from '../components/CustomCursor';
import ProjectModal from '../components/ProjectModal';

export default function Home() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  const handleOpenProjectModal = () => {
    setProjectModalOpen(true);
  };

  const handleCloseProjectModal = () => {
    setProjectModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Premium Desktop Custom Cursor */}
      <CustomCursor />

      {/* Global Navigation */}
      <Navbar onOpenProjectModal={handleOpenProjectModal} />

      {/* Main Page Flow */}
      <main>
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

        {/* 8. AI Labs & 3D Neural Synapse */}
        <AISection onOpenProjectModal={handleOpenProjectModal} />

        {/* 9. Verified Client Testimonials */}
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
