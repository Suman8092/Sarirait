import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * InteractiveParticles
 * Inspired by Active Theory & Resn:
 * Real-time HTML5 2D canvas particle field with constellation filaments
 * and dynamic elastic cursor repulsion velocity.
 * Pauses automatically when scrolled out of view or if tab is inactive.
 */
export default function InteractiveParticles({ className = '' }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let isVisible = true;
    let width = 0;
    let height = 0;

    // Track mouse with smoothing
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120,
      active: false,
    };

    // Configuration
    const particleCount = window.innerWidth < 768 ? 28 : 55;
    const connectionDistance = 110;
    const particles = [];

    // Particle constructor
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.8 + 0.8;
        this.baseRadius = this.radius;
        this.color = Math.random() > 0.4 ? 'cyan' : 'violet';
        this.alpha = Math.random() * 0.4 + 0.2;
      }

      update() {
        // Move particle
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off canvas edges
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Cursor repulsion physics (Active Theory fluid feel)
        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * 3.5;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force;
            this.y -= Math.sin(angle) * force;
          }
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        const color =
          this.color === 'cyan'
            ? isDark
              ? `rgba(0, 240, 255, ${this.alpha})`
              : `rgba(8, 145, 178, ${this.alpha * 1.2})`
            : isDark
            ? `rgba(168, 85, 247, ${this.alpha})`
            : `rgba(124, 58, 237, ${this.alpha * 1.2})`;

        ctx.fillStyle = color;
        ctx.shadowColor = this.color === 'cyan' ? '#00f0ff' : '#a855f7';
        ctx.shadowBlur = isDark ? 6 : 2;
        ctx.fill();
        ctx.restore();
      }
    }

    const init = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      width = rect?.width || window.innerWidth;
      height = rect?.height || window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    init();

    // Render loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Connect filaments between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * (isDark ? 0.14 : 0.1);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(0, 240, 255, ${alpha})`
              : `rgba(8, 145, 178, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Event listeners
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleResize = () => {
      init();
    };

    // Pause when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
