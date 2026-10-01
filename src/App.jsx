import React from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';
import MotionSystem from './components/MotionSystem';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import Work from './pages/Work';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import { ThemeProvider } from './context/ThemeContext';

function AnimatedRoutes() {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const enterState = { opacity: 0 };
  const exitState = { opacity: 0 };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        className="route-motion-shell w-full"
        initial={prefersReducedMotion ? false : enterState}
        animate={{ opacity: 1 }}
        exit={prefersReducedMotion ? { opacity: 1 } : exitState}
        transition={{ duration: prefersReducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <ScrollToTop location={location} />
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/portfolio" element={<Navigate to="/work" replace />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <MotionConfig reducedMotion="user">
          <SmoothScroll>
            <CustomCursor />
            <MotionSystem />
            <AnimatedRoutes />
          </SmoothScroll>
        </MotionConfig>
      </BrowserRouter>
    </ThemeProvider>
  );
}
