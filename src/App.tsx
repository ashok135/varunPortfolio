import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EditorialProfileSection } from './components/EditorialProfileSection';
import { VelocityGallerySection } from './components/VelocityGallerySection';
import { HorizontalBentoProjects } from './components/HorizontalBentoProjects';
import { ExperienceJournal } from './components/ExperienceJournal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { HuymlPreloader } from './components/HuymlPreloader';

export const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isColorfulMode, setIsColorfulMode] = useState<boolean>(true);
  const [isSiteLoaded, setIsSiteLoaded] = useState<boolean>(false);
  const [isHeroFinished, setIsHeroFinished] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.location.hash && window.location.hash !== '#hero') {
      return true;
    }
    return false;
  });

  const lenisRef = useRef<Lenis | null>(null);

  // Initialize smooth inertia scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.75,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.15,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    // Initially lock Lenis while preloader or hero is running
    lenis.stop();

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Synchronize Lenis scrolling with Preloader and Hero completion
  useEffect(() => {
    if (!lenisRef.current) return;
    if (!isSiteLoaded) {
      lenisRef.current.stop();
      return;
    }
    if (isHeroFinished) {
      lenisRef.current.start();
    } else {
      if (window.scrollY <= 10) {
        lenisRef.current.stop();
      }
    }
  }, [isSiteLoaded, isHeroFinished]);

  // Global scroll-reveal observer: brings text in from outside as you scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    const observeAll = () => {
      const revealElements = document.querySelectorAll(
        '.scroll-reveal:not(.revealed), .scroll-reveal-left:not(.revealed), .scroll-reveal-right:not(.revealed)'
      );
      revealElements.forEach((el) => observer.observe(el));
    };

    observeAll();
    const timer = setTimeout(observeAll, 600);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
  };

  const handleToggleColorMode = () => {
    setIsColorfulMode(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-[#f5f2eb] text-[#1c1b18] flex flex-col font-sans selection:bg-[#1c1b18] selection:text-[#f5f2eb]">
      <HuymlPreloader onComplete={() => setIsSiteLoaded(true)} />
      <Navbar />
      <main className="flex-1">
        <HeroSection 
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          isColorfulMode={isColorfulMode}
          onToggleColorMode={handleToggleColorMode}
          isHeroFinished={isHeroFinished}
          onHeroFinishChange={setIsHeroFinished}
        />
        <EditorialProfileSection />
        <VelocityGallerySection />
        <HorizontalBentoProjects />
        <ExperienceJournal />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
