import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
