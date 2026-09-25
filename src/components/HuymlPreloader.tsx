import React, { useEffect, useRef, useState } from 'react';
import lottie, { type AnimationItem } from 'lottie-web/build/player/lottie_light';

interface HuymlPreloaderProps {
  onComplete: () => void;
}

// Critical high-res assets to track
const CRITICAL_ASSETS = [
  '/push_character.json',
  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1400&q=85',
  'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
];

export const HuymlPreloader: React.FC<HuymlPreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lottieContainerRef = useRef<HTMLDivElement | null>(null);
  const lottieInstanceRef = useRef<AnimationItem | null>(null);
  const counterRef = useRef<HTMLDivElement | null>(null);
  const curtainRef = useRef<HTMLDivElement | null>(null);
  const pusherWrapperRef = useRef<HTMLDivElement | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);

  const [isDone, setIsDone] = useState(false);
  const [lottieReady, setLottieReady] = useState(false);

  // 1. Initialize Lottie Animation
  useEffect(() => {
    if (!lottieContainerRef.current) return;

    const anim = lottie.loadAnimation({
      container: lottieContainerRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: '/push_character.json',
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet',
      },
    });

    lottieInstanceRef.current = anim;

    anim.addEventListener('DOMLoaded', () => {
      anim.goToAndStop(0, true);
      setLottieReady(true);
    });

    return () => {
      anim.destroy();
      lottieInstanceRef.current = null;
    };
  }, []);

  // 2. Asset-Tracked Loading Engine
  useEffect(() => {
    if (!lottieReady) return;

    let isMounted = true;
    let animFrameId: number;

    const isMobile = window.innerWidth <= 768;
    const finalProgress = isMobile ? 1.4 : 1.28;
    const totalFrames = 116; // 146 - 30 frame span in Lottie

    // Track total real assets
    let loadedCount = 0;
    const totalCount = CRITICAL_ASSETS.length + 1; // +1 for document.fonts
    let targetNormalizedProgress = 0.05; // start with slight 5% cue
    let currentProgress = 0;
    let isExiting = false;

    const onSingleAssetFinished = () => {
      if (!isMounted) return;
      loadedCount++;
      // Calculate real asset progress ratio (from 0.05 to 1.0)
      targetNormalizedProgress = Math.max(targetNormalizedProgress, loadedCount / totalCount);
    };

    // A. Track document fonts
    if (document.fonts) {
      document.fonts.ready
        .then(() => onSingleAssetFinished())
        .catch(() => onSingleAssetFinished());
    } else {
      onSingleAssetFinished();
    }

    // B. Preload all critical image assets
    CRITICAL_ASSETS.forEach((src) => {
      if (src.endsWith('.json')) {
        fetch(src)
          .then(() => onSingleAssetFinished())
          .catch(() => onSingleAssetFinished());
      } else {
        const img = new Image();
        img.src = src;
        if (img.complete) {
          onSingleAssetFinished();
        } else {
          img.onload = () => onSingleAssetFinished();
          img.onerror = () => onSingleAssetFinished();
        }
      }
    });

    // Safety timeout: ensure loader never hangs if user has network drop
    const safetyTimer = setTimeout(() => {
      targetNormalizedProgress = 1.0;
    }, 4500);

    const updateVisuals = (p: number) => {
      const clampedP = Math.max(0, Math.min(finalProgress, p));

      // 1. Move the solid black curtain
      if (curtainRef.current) {
        const leftPct = Math.min(100, Math.max(0, clampedP * 100));
        curtainRef.current.style.left = `${leftPct}%`;
      }

      // 2. Move the character with hands on curtain edge
      if (pusherWrapperRef.current) {
        const leftPct = clampedP * 100;
        pusherWrapperRef.current.style.left = `${leftPct}%`;
      }

      // 3. Step Lottie character push animation
      if (lottieInstanceRef.current) {
        const frameOffset = (clampedP * totalFrames * 1.08) % totalFrames;
        lottieInstanceRef.current.goToAndStop(frameOffset, true);
      }

      // 4. Update numerical percentage counter (0 to 100)
      if (counterRef.current) {
        const displayPercent = Math.min(100, Math.round((clampedP / finalProgress) * 100));
        counterRef.current.textContent = `${displayPercent}`;
      }

      // 5. Update Asset Status label
      if (statusRef.current) {
        const displayPercent = Math.min(100, Math.round((clampedP / finalProgress) * 100));
        if (displayPercent < 100) {
          statusRef.current.textContent = `CACHING ASSETS • ${loadedCount}/${totalCount}`;
        } else {
          statusRef.current.textContent = 'READY • UNLOCKING SUITE';
        }
      }
    };

    const triggerExit = () => {
      if (!isMounted || isExiting) return;
      isExiting = true;

      // Play subtle whoosh sound if possible
      try {
        const audio = new Audio('/push_whoosh.mp3');
        audio.volume = 0.35;
        audio.play().catch(() => {});
      } catch {
        // Audio autoplay policy fallback
      }

      // Smooth slide-up exit transition
      if (containerRef.current) {
        containerRef.current.style.transition = 'transform 0.85s cubic-bezier(0.7, 0, 0.3, 1), opacity 0.85s ease';
        containerRef.current.style.transform = 'translateY(-100%)';
        containerRef.current.style.opacity = '0.98';
      }

      setTimeout(() => {
        if (!isMounted) return;
        setIsDone(true);
        onComplete();
      }, 880);
    };

    // Smooth Lerp loop driven by real asset loading
    const renderLoop = () => {
      if (!isMounted) return;

      const targetProgress = targetNormalizedProgress * finalProgress;
      // Damped spring factor: smooth responsive movement as assets finish
      const lerpSpeed = targetNormalizedProgress >= 1.0 ? 0.07 : 0.055;
      currentProgress += (targetProgress - currentProgress) * lerpSpeed;

      updateVisuals(currentProgress);

      // Check if finished
      if (targetNormalizedProgress >= 1.0 && currentProgress >= finalProgress - 0.015) {
        updateVisuals(finalProgress);
        setTimeout(triggerExit, 240);
      } else {
        animFrameId = requestAnimationFrame(renderLoop);
      }
    };

    animFrameId = requestAnimationFrame(renderLoop);

    return () => {
      isMounted = false;
      clearTimeout(safetyTimer);
      cancelAnimationFrame(animFrameId);
    };
  }, [lottieReady, onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] overflow-hidden select-none pointer-events-auto bg-[#f5f2eb]"
      style={{ willChange: 'transform' }}
    >
      {/* 1. Underlying Cream Canvas with Monumental VARUN + Stylish Video Editor Subtitle */}
      <div className="absolute inset-0 bg-[#f5f2eb] flex flex-col items-center justify-center pointer-events-none z-0 px-4">
        {/* Left and Right Editorial Meta Labels (huyml-inspired) */}
        <div className="absolute top-8 left-8 sm:left-12 flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] text-[#ff4949]/70 uppercase">
          <span className="w-2 h-2 rounded-full bg-[#ff4949] animate-ping" />
          <span>REC ● 24 FPS</span>
        </div>
        <div className="absolute top-8 right-8 sm:right-12 text-[11px] font-mono tracking-[0.25em] text-[#ff4949]/70 uppercase hidden sm:block">
          MASTER 4K DCI
        </div>

        <div className="flex flex-col items-center justify-center text-center select-none">
          {/* Main Monumental Name: VARUN */}
          <div
            className="font-serif font-black tracking-[-0.05em] uppercase text-[#ff4949] leading-[0.82] select-none"
            style={{
              fontSize: 'clamp(95px, 20vw, 320px)',
              textShadow: '0 12px 48px rgba(255, 73, 73, 0.14)',
            }}
          >
            VARUN
          </div>

          {/* Stylish Video Editor Typography Lockup */}
          <div className="flex items-center justify-center gap-3 sm:gap-5 mt-2 sm:mt-4 md:mt-6">
            <div className="h-[1.5px] w-8 sm:w-16 md:w-24 bg-[#ff4949]/40" />
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="font-serif italic font-normal tracking-[0.08em] sm:tracking-[0.14em] text-[#ff4949] text-xl sm:text-3xl md:text-5xl lg:text-6xl lowercase">
                video editor
              </span>
              <span className="text-[10px] sm:text-xs md:text-sm font-mono tracking-[0.2em] uppercase font-bold text-[#ff4949] bg-[#ff4949]/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-[#ff4949]/25">
                COLORIST
              </span>
            </div>
            <div className="h-[1.5px] w-8 sm:w-16 md:w-24 bg-[#ff4949]/40" />
          </div>
        </div>

        {/* Small editorial subtitles matching luxury craft */}
        <div className="absolute bottom-8 left-8 sm:left-12 text-[11px] font-mono tracking-[0.25em] uppercase text-[#1c1b18]/40 hidden md:block">
          EDITORIAL • SOUND DESIGN • PACING
        </div>
        <div className="absolute bottom-8 right-8 sm:right-12 text-[11px] font-mono tracking-[0.25em] uppercase text-[#1c1b18]/40 hidden md:block">
          DAVINCI RESOLVE • PREMIERE PRO
        </div>
      </div>

      {/* 2. Sliding Solid Black Curtain (Starts 100% width, pushed to the right by real assets) */}
      <div
        ref={curtainRef}
        className="absolute inset-y-0 right-0 bg-[#000000] z-10 will-change-[left]"
        style={{ left: '0%' }}
      >
        {/* Dynamic Percentage Counter on the black curtain edge */}
        <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 flex items-baseline gap-1 pointer-events-none text-white select-none">
          <span
            ref={counterRef}
            className="font-serif font-normal text-6xl md:text-8xl lg:text-9xl tracking-tight leading-none text-white/95"
          >
            0
          </span>
          <span className="font-mono text-xs md:text-sm text-white/40 tracking-widest uppercase">
            %
          </span>
        </div>

        {/* Real-time asset download monitor on black panel */}
        <div
          ref={statusRef}
          className="absolute bottom-8 left-8 text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase hidden sm:block"
        >
          INITIALIZING NLE ASSET BUFFER
        </div>
      </div>

      {/* 3. The Pushing Character (Positioned precisely at the curtain divider edge) */}
      <div
        ref={pusherWrapperRef}
        className="absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none will-change-[left]"
        style={{
          left: '0%',
          transform: 'translate(-88%, -50%)', // Positions character's outstretched hands exactly on the curtain boundary
        }}
      >
        <div
          ref={lottieContainerRef}
          className="w-[200px] h-[210px] sm:w-[260px] sm:h-[270px] md:w-[320px] md:h-[330px] lg:w-[380px] lg:h-[390px] drop-shadow-xl"
        />
      </div>

      {/* 4. Skip button */}
      <button
        onClick={() => {
          setIsDone(true);
          onComplete();
        }}
        className="absolute top-6 right-6 z-30 px-3 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-[11px] font-mono tracking-widest text-white/70 hover:text-white hover:border-white/50 transition-colors uppercase cursor-pointer"
      >
        SKIP [ESC]
      </button>
    </div>
  );
};
