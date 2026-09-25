import React, { useRef, useState, useEffect } from 'react';

interface HeroSectionProps {
  onSelectCategory?: (category: string) => void;
  selectedCategory?: string;
  isColorfulMode?: boolean;
  onToggleColorMode?: () => void;
  isHeroFinished?: boolean;
  onHeroFinishChange?: (finished: boolean) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onSelectCategory,
  selectedCategory = 'all',
  isHeroFinished: externalIsHeroFinished,
  onHeroFinishChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check if loaded with anchor hash (e.g. #profile, #work)
  const isHashNav = typeof window !== 'undefined' && Boolean(window.location.hash && window.location.hash !== '#hero');

  const [internalIsFinished, setInternalIsFinished] = useState<boolean>(isHashNav);
  const isVideoFinished = externalIsHeroFinished !== undefined ? externalIsHeroFinished : internalIsFinished;

  const [displayProgress, setDisplayProgress] = useState(isVideoFinished ? 1 : 0);
  const isPlayingRef = useRef<boolean>(false);

  const updateFinishedState = (finished: boolean) => {
    setInternalIsFinished(finished);
    onHeroFinishChange?.(finished);
  };

  // Play video fast forward on scroll down trigger
  const startFastVideo = () => {
    if (isPlayingRef.current || isVideoFinished) return;
    isPlayingRef.current = true;

    const video = videoRef.current;
    if (video) {
      // Start from current or 0
      if (video.currentTime >= (video.duration || 1) - 0.1) {
        video.currentTime = 0;
      }
      // Speed up video so it finishes fast in ~1.3 seconds
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        video.playbackRate = Math.max(2.0, Math.min(3.6, video.duration / 1.3));
      } else {
        video.playbackRate = 2.5;
      }

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser restricts playback, complete hero safely so user is never stuck
          finishHero();
        });
      }
    }
  };

  const finishHero = () => {
    const video = videoRef.current;
    if (video && video.duration && !isNaN(video.duration)) {
      try {
        video.currentTime = video.duration;
        video.pause();
      } catch (e) {}
    }
    setDisplayProgress(1.0);
    isPlayingRef.current = false;
    updateFinishedState(true);
  };

  const hasScrolledPastHeroRef = useRef<boolean>(false);

  // Reset back to initial normal position when user scrolls back to the top
  const resetToNormal = () => {
    const video = videoRef.current;
    if (video) {
      try {
        video.pause();
        video.currentTime = 0;
      } catch (e) {}
    }
    isPlayingRef.current = false;
    hasScrolledPastHeroRef.current = false;
    setDisplayProgress(0);
    updateFinishedState(false);
  };

  // Video timeupdate event keeps typography sync 100% accurate to real frame
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration && video.duration > 0) {
      const p = Math.min(1, video.currentTime / video.duration);
      setDisplayProgress(p);
      if (p >= 0.96) {
        finishHero();
      }
    }
  };

  const handleVideoEnded = () => {
    finishHero();
  };

  // Listen for hash navigation clicks (e.g., clicking nav links should immediately unlock)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash && window.location.hash !== '#hero') {
        finishHero();
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // When scrolling back up to the very top (scrollY <= 5), restore the normal initial position
  // ONLY IF the user actually scrolled down away from the hero first (scrollY > 200)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      
      // User has scrolled down into the page
      if (scrollY > 200) {
        hasScrolledPastHeroRef.current = true;
      }

      // Only reset when user was actually down in the page and scrolled all the way back to the top
      if (scrollY <= 5 && isVideoFinished && hasScrolledPastHeroRef.current) {
        hasScrolledPastHeroRef.current = false;
        resetToNormal();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVideoFinished]);

  // Intercept scroll inputs: until video finishes, block scrolling down and trigger fast video
  useEffect(() => {
    if (isVideoFinished) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isVideoFinished) {
        if (e.deltaY > 0) {
          startFastVideo();
        }
        // Strictly prevent downward scroll until video completes
        e.preventDefault();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isVideoFinished) {
        const touchCurrentY = e.touches[0].clientY;
        const diff = touchStartY - touchCurrentY;
        if (diff > 8) {
          startFastVideo();
        }
        // Block mobile touch scroll until video completes
        e.preventDefault();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVideoFinished && ['ArrowDown', 'PageDown', ' ', 'Enter'].includes(e.key)) {
        startFastVideo();
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVideoFinished]);

  // Color transition ratio: 0 is full monochrome, 1 is full vivid color
  const colorRatio = Math.max(0, Math.min(1, (displayProgress - 0.05) / 0.7));
  const isColorActive = colorRatio > 0.1;

  const pillTags = [
    { 
      label: 'Video Editing', 
      category: 'video', 
      colorClass: 'border-rose-500 bg-rose-500/15 text-rose-950 shadow-rose-500/20' 
    },
    { 
      label: 'Post-Production', 
      category: 'video', 
      colorClass: 'border-purple-500 bg-purple-500/15 text-purple-950 shadow-purple-500/20' 
    },
    { 
      label: 'Color Grading', 
      category: 'video', 
      colorClass: 'border-amber-500 bg-amber-500/15 text-amber-950 shadow-amber-500/20' 
    },
    { 
      label: 'Brand Design', 
      category: 'branding', 
      colorClass: 'border-emerald-500 bg-emerald-500/15 text-emerald-950 shadow-emerald-500/20' 
    },
    { 
      label: 'Print & Posters', 
      category: 'print', 
      colorClass: 'border-cyan-600 bg-cyan-600/15 text-cyan-950 shadow-cyan-500/20' 
    },
    { 
      label: 'Photography', 
      category: 'photo', 
      colorClass: 'border-indigo-500 bg-indigo-500/15 text-indigo-950 shadow-indigo-500/20' 
    },
  ];

  return (
    // Single Viewport Clean Hero Section (No awkward dead scroll track)
    <div 
      id="hero" 
      ref={containerRef}
      className="relative min-h-[100dvh] h-screen w-full bg-[#f5f2eb] flex flex-col justify-center items-center text-center px-4 sm:px-6 py-12 overflow-hidden"
    >
      {/* ============================================================ */}
      {/* 1. NATIVE HARDWARE STREAMING VIDEO BACKGROUND                */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/images/form_black_and_whitel_to_slowl.mp4"
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover filter contrast-[106%]"
          style={{
            opacity: 0.96,
            transform: `scale(${1 + displayProgress * 0.04})`,
            transition: 'transform 0.2s ease-out',
          }}
        />

        {/* Dynamic Color Bloom & Light Overlay synchronized with real video frame */}
        <div 
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
          style={{
            opacity: colorRatio * 0.45,
            background: 'radial-gradient(ellipse at 50% 50%, rgba(244, 63, 94, 0.15), rgba(234, 179, 8, 0.12), transparent 75%)',
            mixBlendMode: 'color-dodge',
          }}
        />

        {/* Initial Light White/Paper Veil on Load: hides smoothly as soon as video plays */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 ease-out"
          style={{
            backgroundColor: 'rgba(245, 242, 235, 0.68)',
            opacity: Math.max(0, 1 - displayProgress * 3.5),
          }}
        />

        {/* Vignette & Soft Paper Fiber Texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f2eb]/40 via-transparent to-[#f5f2eb]/85 pointer-events-none" />
      </div>

      {/* ============================================================ */}
      {/* 2. CENTER ICONIC TITLE: PORTfolio (SIGNATURE EDITORIAL STYLE) */}
      {/* ============================================================ */}
      <div className="relative z-10 py-2 sm:py-5 flex flex-col items-center w-full max-w-6xl px-3 sm:px-6 transform -translate-y-2 sm:translate-y-0">
        
        <div className="relative w-full flex flex-col items-center">
          
          {/* Luminous Cursive Script Accent: "Creative" elevated on mobile so C & r graze behind T, eative clearly visible above */}
          <div 
            className="fly-creative absolute -top-7 sm:-top-4 md:-top-6 lg:-top-8 z-0 pointer-events-none select-none"
            style={{
              left: '49%',
            }}
          >
            <span 
              className="inline-block text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide select-none"
              style={{
                fontFamily: "'Caveat', 'Pinyon Script', cursive",
                color: '#facc15',
                textShadow: '0 0 28px rgba(250, 204, 21, 0.85), 0 0 10px rgba(250, 204, 21, 0.6), 0 2px 6px rgba(0,0,0,0.12)',
              }}
            >
              Creative
            </span>
          </div>

          {/* Iconic Headline: PORT (Display Bold) + folio (Italic Serif) — Rendered IN FRONT at z-10 */}
          <h1 className="relative z-10 flex items-baseline justify-center tracking-tight">
            {/* PORT Letters */}
            <span 
              className="inline-flex items-baseline font-display font-black text-[80px] sm:text-[112px] md:text-[148px] lg:text-[180px] leading-[0.88] uppercase transition-all duration-300"
              style={{
                letterSpacing: '-0.04em',
                color: isColorActive ? 'transparent' : '#121210',
                backgroundImage: isColorActive 
                  ? `linear-gradient(135deg, rgba(234, 88, 12, ${0.4 + colorRatio * 0.6}) 0%, rgba(225, 29, 72, ${0.4 + colorRatio * 0.6}) 45%, rgba(124, 58, 237, ${0.4 + colorRatio * 0.6}) 100%)`
                  : 'none',
                WebkitBackgroundClip: isColorActive ? 'text' : 'border-box',
                textShadow: isColorActive 
                  ? `0 10px 30px rgba(225, 29, 72, ${colorRatio * 0.35})` 
                  : '0.5px 0.5px 0px rgba(0,0,0,0.15)',
              }}
            >
              <span className="fly-letter-1">P</span>
              <span className="fly-letter-2">O</span>
              <span className="fly-letter-3">R</span>
              <span className="fly-letter-4">T</span>
            </span>

            {/* folio Letters */}
            <span 
              className="inline-flex items-baseline font-script italic font-normal text-[92px] sm:text-[128px] md:text-[168px] lg:text-[205px] leading-[0.88] -ml-1 sm:-ml-2 transform -translate-y-1 sm:-translate-y-2 transition-all duration-300"
              style={{
                fontFamily: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif",
                color: isColorActive ? 'transparent' : '#121210',
                backgroundImage: isColorActive 
                  ? `linear-gradient(135deg, rgba(225, 29, 72, ${0.5 + colorRatio * 0.5}) 0%, rgba(147, 51, 234, ${0.5 + colorRatio * 0.5}) 60%, rgba(67, 56, 202, ${0.5 + colorRatio * 0.5}) 100%)`
                  : 'none',
                WebkitBackgroundClip: isColorActive ? 'text' : 'border-box',
                textShadow: isColorActive 
                  ? `0 10px 30px rgba(147, 51, 234, ${colorRatio * 0.35})` 
                  : 'none',
              }}
            >
              <span className="fly-letter-5">f</span>
              <span className="fly-letter-6">o</span>
              <span className="fly-letter-7">l</span>
              <span className="fly-letter-8">i</span>
              <span className="fly-letter-9">o</span>
            </span>
          </h1>

          {/* Bottom Subtext Row — Framed cleanly under the title width */}
          <div className="w-full max-w-[330px] sm:max-w-3xl md:max-w-4xl flex items-center justify-between px-1 sm:px-6 mt-3 sm:mt-2 z-10 pointer-events-auto">
            <div className="fly-subtext-left flex items-center gap-1.5 sm:gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse hidden sm:inline-block" />
              <span 
                className={`text-[11px] sm:text-xs md:text-sm font-sans font-bold tracking-widest uppercase transition-colors duration-300 ${
                  isColorActive ? 'text-rose-900' : 'text-[#524e44]'
                }`}
              >
                Video Editor
              </span>
            </div>

            <div className="fly-subtext-right flex items-center gap-1.5 sm:gap-2">
              <span 
                className={`text-[11px] sm:text-xs md:text-sm font-sans font-bold tracking-widest uppercase transition-colors duration-300 ${
                  isColorActive ? 'text-purple-900' : 'text-[#524e44]'
                }`}
              >
                Presented By: Varun P
              </span>
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* 3. PILL TAGS                                                 */}
        {/* ============================================================ */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 sm:gap-3.5 mt-8 sm:mt-12 max-w-[340px] sm:max-w-2xl px-1 sm:px-2">
          {pillTags.map((tag, idx) => {
            const isSelected = selectedCategory === tag.category;
            const tagFlyClass = `fly-tag-${(idx % 5) + 1}`;
            return (
              <a
                key={tag.label}
                href="#profile"
                onClick={() => {
                  finishHero();
                  onSelectCategory && onSelectCategory(tag.category);
                }}
                className={`pill-tag ${tagFlyClass} px-4 sm:px-5 py-2 sm:py-2 rounded-full border text-xs sm:text-[13px] font-sans font-medium tracking-wide transition-all duration-300 cursor-pointer shadow-xs ${
                  isSelected
                    ? 'border-[#1c1b18] bg-[#1c1b18] text-[#f5f2eb] shadow-md'
                    : isColorActive
                      ? `${tag.colorClass} shadow-md`
                      : 'border-[#1c1b18]/30 bg-white/60 backdrop-blur-xs text-[#1c1b18] hover:border-[#1c1b18] hover:bg-[#1c1b18] hover:text-[#f5f2eb]'
                }`}
                style={{
                  transform: isColorActive ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                {tag.label}
              </a>
            );
          })}
        </div>

        {/* Subtle Luxury Scroll Cue (Mobile Only - fills bottom void and cues scroll action) */}
        <div className="flex sm:hidden flex-col items-center gap-2 mt-8 opacity-75 pointer-events-none">
          <span className="text-[10px] tracking-[0.22em] uppercase font-sans font-semibold text-[#706c62]">
            Scroll to begin
          </span>
          <div className="w-[1.5px] h-6 bg-gradient-to-b from-[#706c62] to-transparent animate-pulse" />
        </div>

      </div>

      {/* ============================================================ */}
      {/* 4. BOTTOM HANDLE                                             */}
      {/* ============================================================ */}
      <div className="fly-in-bottom delay-500 absolute bottom-6 left-0 right-0 z-10 flex justify-center pointer-events-auto">
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noreferrer"
          className={`text-xs sm:text-[13px] font-sans tracking-tight transition-colors duration-300 ${
            isColorActive ? 'text-rose-900 font-semibold' : 'text-[#706c62] hover:text-[#1c1b18]'
          }`}
        >
          @varunp.creates
        </a>
      </div>

    </div>
  );
};
