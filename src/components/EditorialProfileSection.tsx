import React, { useRef, useState, useEffect } from 'react';
import { Mail, MapPin, Copy, Check, Clock, Volume2, Sparkles, Film, Award, Command, ChevronRight } from 'lucide-react';

interface Milestone {
  id: string;
  timecode: string;
  year: string;
  company: string;
  role: string;
  duration: string;
  summary: string;
  tools: string[];
}

interface Keycap {
  id: string;
  badge: string;
  name: string;
  level: string;
  percent: number;
  shortcut: string;
  primaryColor: string;
  secondaryColor: string;
  shadowColor: string;
  gradient: string;
  textColor: string;
  isTranslucent?: boolean;
  baseRotate: number;
  zDepth: number;
}

export const EditorialProfileSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const filmCellRef = useRef<HTMLDivElement>(null);

  // 3D Scroll Progress Tracking (0 to 1)
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // 3D Mouse Tilt State for Film Cell
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [splitWipe, setSplitWipe] = useState<number>(55);
  const [isPortraitHovered, setIsPortraitHovered] = useState<boolean>(false);

  // 3D Mouse Parallax for Keycaps Container
  const [keycapMouseTilt, setKeycapMouseTilt] = useState({ x: 0, y: 0 });

  // Clipboard copy state
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  // Active Keycap state
  const [activeKeyId, setActiveKeyId] = useState<string>('pr');
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  // Active Milestone Scrubber State
  const [activeMilestoneIdx, setActiveMilestoneIdx] = useState<number>(2);

  // Scroll listener for 3D perspective dynamics
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far section has scrolled into view (0 when entering bottom, 1 when exiting top)
      const totalDist = rect.height + windowHeight;
      const currentDist = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentDist / totalDist));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse tilt for the 35mm film cell
  const handleFilmCellMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!filmCellRef.current) return;
    const rect = filmCellRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -12;
    const rY = ((x - centerX) / centerX) * 12;

    setMouseTilt({ x: rX, y: rY });

    const wipe = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSplitWipe(wipe);
  };

  const handleFilmCellMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
    setIsPortraitHovered(false);
    setSplitWipe(50);
  };

  // Mouse tilt for floating keycap orbit
  const handleKeycapsMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setKeycapMouseTilt({ x: x * 15, y: -y * 15 });
  };

  const handleKeycapsMouseLeave = () => {
    setKeycapMouseTilt({ x: 0, y: 0 });
  };

  // Clipboard copy with bulletproof fallback
  const handleCopyEmail = async () => {
    const textToCopy = 'varunp.creates@gmail.com';
    let copied = false;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        copied = true;
      } catch {
        copied = false;
      }
    }

    if (!copied) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '-9999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        copied = true;
      } catch (err) {
        console.error('Fallback copy failed', err);
      }
    }

    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  // Synthesize realistic mechanical switch "clack"
  const playMechanicalClick = (pitch = 1) => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      const bufferSize = ctx.sampleRate * 0.038;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 740 * pitch;
      filter.Q.value = 4.0;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.038);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // AudioContext could be blocked by browser policy until interaction
    }
  };

  const handleKeycapClick = (key: Keycap) => {
    setPressedKey(key.id);
    setActiveKeyId(key.id);
    playMechanicalClick(key.id === 'dv' ? 0.88 : key.id === 'pr' ? 1.05 : 1.18);
    setTimeout(() => setPressedKey(null), 160);
  };

  // 6 Artisan Floating Keycaps
  const keycaps: Keycap[] = [
    {
      id: 'pr',
      badge: 'Pr',
      name: 'Adobe Premiere Pro',
      level: 'Lead NLE Editor',
      percent: 98,
      shortcut: 'C (Razor) • Q/W (Ripple Trim)',
      primaryColor: '#2b1a6e',
      secondaryColor: '#7c3aed',
      shadowColor: '#15093b',
      gradient: 'linear-gradient(145deg, #37208c 0%, #1a0b45 100%)',
      textColor: '#ffffff',
      baseRotate: -7,
      zDepth: 40,
    },
    {
      id: 'dv',
      badge: 'Dv',
      name: 'DaVinci Resolve Studio',
      level: 'Colorist & Grading',
      percent: 95,
      shortcut: 'Alt+S (Serial Node) • Shift+H (Mask)',
      primaryColor: '#18181b',
      secondaryColor: '#ef4444',
      shadowColor: '#09090b',
      gradient: 'linear-gradient(145deg, #27272a 0%, #09090b 100%)',
      textColor: '#ffffff',
      isTranslucent: true,
      baseRotate: 8,
      zDepth: 25,
    },
    {
      id: 'ae',
      badge: 'Ae',
      name: 'Adobe After Effects',
      level: 'Motion & VFX',
      percent: 90,
      shortcut: 'U (Keyframes) • F9 (Easy Ease)',
      primaryColor: '#3b0764',
      secondaryColor: '#c026d3',
      shadowColor: '#1e0338',
      gradient: 'linear-gradient(145deg, #581c87 0%, #2e1065 100%)',
      textColor: '#ffffff',
      isTranslucent: true,
      baseRotate: -5,
      zDepth: 35,
    },
    {
      id: 'ps',
      badge: 'Ps',
      name: 'Adobe Photoshop',
      level: 'Key Art & Posters',
      percent: 92,
      shortcut: 'P (Pen Tool) • Cmd+J (Duplicate)',
      primaryColor: '#0c4a6e',
      secondaryColor: '#0284c7',
      shadowColor: '#082f49',
      gradient: 'linear-gradient(145deg, #0284c7 0%, #082f49 100%)',
      textColor: '#ffffff',
      baseRotate: 9,
      zDepth: 30,
    },
    {
      id: 'ai',
      badge: 'Ai',
      name: 'Adobe Illustrator',
      level: 'Vector Marks',
      percent: 82,
      shortcut: 'V (Select) • Shift+M (Shape Builder)',
      primaryColor: '#9a3412',
      secondaryColor: '#ea580c',
      shadowColor: '#431407',
      gradient: 'linear-gradient(145deg, #ea580c 0%, #9a3412 100%)',
      textColor: '#ffffff',
      baseRotate: -8,
      zDepth: 20,
    },
    {
      id: 'blender',
      badge: '3D',
      name: 'Blender 3D Suite',
      level: 'Camera & Assets',
      percent: 78,
      shortcut: 'G/R/S • Numpad 0 (Camera Angle)',
      primaryColor: '#b45309',
      secondaryColor: '#d97706',
      shadowColor: '#78350f',
      gradient: 'linear-gradient(145deg, #d97706 0%, #78350f 100%)',
      textColor: '#ffffff',
      isTranslucent: true,
      baseRotate: 6,
      zDepth: 45,
    },
  ];

  const activeKey = keycaps.find(k => k.id === activeKeyId) || keycaps[0];

  // Career milestones
  const milestones: Milestone[] = [
    {
      id: 'm1',
      timecode: '00:04:12',
      year: '7 MONTHS',
      company: 'Tech 4 Billion',
      role: 'Video Editor',
      duration: 'Digital Media Post-Production',
      summary: 'Engineered high-retention footage cuts, pacing curves, dynamic title inserts, and multi-platform aspect ratio deliverables.',
      tools: ['Premiere Pro', 'After Effects', 'Audition'],
    },
    {
      id: 'm2',
      timecode: '00:11:18',
      year: '4 MONTHS',
      company: 'Speed News Media',
      role: 'Broadcast Video Editor',
      duration: 'Live Television Newsroom',
      summary: 'Mastered live breaking-news packages, speed-turnaround multi-camera timelines, audio normalization to -14 LUFS, and lower-third overlays.',
      tools: ['Premiere Pro', 'DaVinci Resolve', 'Broadcast FX'],
    },
    {
      id: 'm3',
      timecode: '00:19:42',
      year: '2023 — PRESENT',
      company: 'Independent Post-Lab',
      role: 'Lead Video Editor & Designer',
      duration: 'Commercials & YouTube Docs',
      summary: 'Directing post-production workflows for narrative documentaries, commercial brand spots, cinematic color grades, and bespoke visual identity design.',
      tools: ['DaVinci Studio', 'Premiere Pro', 'After Effects', 'Photoshop'],
    },
    {
      id: 'm4',
      timecode: '00:24:00',
      year: '2024 — 2028',
      company: 'Lovely Professional Univ.',
      role: 'Bachelor of Design (B.Des)',
      duration: 'Graphic & Narrative Systems',
      summary: 'Academic foundation in Swiss typography, visual composition grids, cinematic color harmony, and motion narrative storytelling.',
      tools: ['Design Theory', 'Visual Hierarchy', 'Brand Systems'],
    },
  ];

  const currentMilestone = milestones[activeMilestoneIdx] || milestones[2];

  // Dynamic 3D scroll rotation angles
  const filmCellScrollRotateY = (scrollProgress - 0.5) * 16;
  const filmCellScrollRotateX = (0.5 - scrollProgress) * 8;
  const filmCellScrollTranslateY = (scrollProgress - 0.5) * -40;

  return (
    <section
      id="profile"
      ref={sectionRef}
      className="w-full bg-[#f5f2eb] text-[#1c1b18] py-24 sm:py-32 relative overflow-hidden border-t border-[#dfd8c7]"
      style={{
        backgroundImage: 'radial-gradient(rgba(28, 27, 24, 0.04) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* ======================================================== */}
        {/* 1. ASYMMETRIC 3D EDITORIAL HERO SPREAD                   */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* LEFT 7 COLS: BOLD EDITORIAL PHILOSOPHY & CREDENTIALS */}
          <div className="scroll-reveal-left lg:col-span-7 flex flex-col items-start space-y-7">
            
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#706c62] font-semibold block mb-3">
                DIRECTOR'S EDITORIAL PHILOSOPHY
              </span>
              
              {/* Fluid, massive editorial headline */}
              <h2 className="font-serif italic font-normal text-4xl sm:text-6xl xl:text-7xl leading-[1.04] tracking-tight text-[#1c1b18]">
                "The edit is where the film is truly born."
              </h2>
            </div>

            <p className="font-sans text-sm sm:text-base text-[#3d3b36] max-w-2xl leading-relaxed">
              Cutting footage isn't mere assembly—it is <strong className="text-[#1c1b18] font-bold">sculpting human emotion through micro-frame rhythm</strong>. Over 3+ years, I have shaped raw rushes into high-retention commercial stories, broadcast television segments, and viral narrative videos.
            </p>

            {/* Live Audio Equalizer Waveform (Styled exactly like pro audio meters in user photo) */}
            <div className="w-full max-w-xl bg-[#ede8dd] p-3 sm:p-4 rounded-xl border border-[#dfd8c7] flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <Volume2 className="w-4 h-4 text-[#1c1b18] shrink-0" />
                <span className="font-mono text-[11px] sm:text-xs text-[#4a473f] truncate">
                  <strong className="text-[#1c1b18]">SONIC SYNCHRONIZATION</strong> • Audio-Driven Cut Points
                </span>
              </div>

              {/* Pro Audio VU Meter Pocket (Dark background with glowing green bars & red peaks matching photo) */}
              <div className="bg-[#0e0e0c] px-2.5 py-1.5 rounded-lg border border-[#24231f] flex items-end gap-[3px] h-7 shadow-inner shrink-0 ml-2">
                {[
                  { h: 16, isPeak: false },
                  { h: 14, isPeak: false },
                  { h: 9, isPeak: false },
                  { h: 5, isPeak: false },
                  { h: 5, isPeak: false },
                  { h: 11, isPeak: false },
                  { h: 16, isPeak: false },
                  { h: 16, isPeak: false },
                  { h: 10, isPeak: false },
                  { h: 6, isPeak: false },
                  { h: 6, isPeak: false },
                  { h: 9, isPeak: false },
                  { h: 14, isPeak: false },
                  { h: 17, isPeak: true },
                  { h: 13, isPeak: true },
                  { h: 8, isPeak: true },
                ].map((bar, i) => (
                  <span
                    key={i}
                    className={`w-[3px] rounded-xs transition-all duration-150 animate-pulse ${
                      bar.isPeak
                        ? 'bg-[#ef4444] shadow-[0_0_6px_rgba(239,68,68,0.7)]'
                        : 'bg-[#22c55e] shadow-[0_0_6px_rgba(34,197,94,0.6)]'
                    }`}
                    style={{
                      height: `${bar.h}px`,
                      animationDelay: `${(i % 5) * 0.12}s`,
                      animationDuration: '0.85s',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Directorial Credentials Cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-xl font-mono text-xs">
              <div className="p-2.5 sm:p-3.5 rounded-xl bg-[#ede8dd] border border-[#dfd8c7] shadow-xs text-center sm:text-left">
                <div className="text-[#1c1b18] font-bold text-sm sm:text-base">3+ YEARS</div>
                <div className="text-[#706c62] text-[9px] sm:text-[10px] mt-0.5 truncate">Post-Production</div>
              </div>
              <div className="p-2.5 sm:p-3.5 rounded-xl bg-[#ede8dd] border border-[#dfd8c7] shadow-xs text-center sm:text-left">
                <div className="text-emerald-800 font-bold text-sm sm:text-base">100+ CUTS</div>
                <div className="text-[#706c62] text-[9px] sm:text-[10px] mt-0.5 truncate">Timeline Exports</div>
              </div>
              <div className="p-2.5 sm:p-3.5 rounded-xl bg-[#ede8dd] border border-[#dfd8c7] shadow-xs text-center sm:text-left">
                <div className="text-amber-900 font-bold text-sm sm:text-base">ACES / LOG</div>
                <div className="text-[#706c62] text-[9px] sm:text-[10px] mt-0.5 truncate">Color Pipeline</div>
              </div>
            </div>

            {/* Clean Direct Contact Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 max-w-full">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-[#1c1b18] hover:bg-[#33322d] text-[#f5f2eb] transition-all cursor-pointer text-[11px] sm:text-xs font-mono shadow-xs max-w-full"
                title="Copy Email"
              >
                <Mail className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span className="truncate">varunp.creates@gmail.com</span>
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 ml-1 shrink-0" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[#a69e8b] ml-1 shrink-0" />
                )}
              </button>
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#706c62]">
                <MapPin className="w-3.5 h-3.5 text-[#1c1b18] shrink-0" />
                <span>Hyderabad, India</span>
              </div>
            </div>

          </div>

          {/* RIGHT 5 COLS: 3D SCROLL-DRIVEN 35MM FILM CELL */}
          <div className="scroll-reveal-right lg:col-span-5 flex flex-col items-center w-full">
            
            {/* 3D Perspective Wrapper */}
            <div 
              className="w-full max-w-full sm:max-w-[420px] bg-[#ede8dd] rounded-2xl border-2 border-[#1c1b18] shadow-2xl p-2.5 sm:p-3 relative cursor-crosshair transition-transform duration-150"
              style={{
                perspective: '1200px',
                transformStyle: 'preserve-3d',
                transform: `perspective(1200px) rotateY(${filmCellScrollRotateY + mouseTilt.y}deg) rotateX(${filmCellScrollRotateX + mouseTilt.x}deg) translateY(${filmCellScrollTranslateY}px)`,
                boxShadow: '0 20px 40px -15px rgba(28, 27, 24, 0.18), 0 0 0 1px rgba(28, 27, 24, 0.05)',
              }}
              onMouseMove={handleFilmCellMouseMove}
              onMouseLeave={handleFilmCellMouseLeave}
              onMouseEnter={() => setIsPortraitHovered(true)}
            >
              {/* Top 35mm Sprocket Holes */}
              <div 
                className="h-5 w-full mb-2 opacity-60"
                style={{
                  backgroundImage: 'radial-gradient(circle at 10px 50%, #1c1b18 4px, transparent 4.5px)',
                  backgroundSize: '20px 100%',
                }}
              />

              {/* Viewfinder Screen */}
              <div 
                ref={filmCellRef}
                className="relative aspect-[4/4.8] w-full rounded-xl overflow-hidden border border-[#c5bca7] bg-[#dfd8c7] shadow-inner"
              >
                {/* 1. Raw S-Log3 Monochrome Base */}
                <img
                  src="/portfolio/hero_fullbody_exact.jpg"
                  alt="Varun P Director Portrait"
                  className="absolute inset-0 w-full h-full object-cover filter contrast-[105%] grayscale"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/portfolio/hero_fullbody.jpg';
                  }}
                />

                {/* 2. Color Graded Kodak 2383 Film Print Reveal */}
                <div 
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{
                    clipPath: `polygon(${splitWipe}% 0, 100% 0, 100% 100%, ${splitWipe}% 100%)`,
                  }}
                >
                  <img
                    src="/portfolio/hero_fullbody_exact.jpg"
                    alt="Varun P Color Graded"
                    className="absolute inset-0 w-full h-full object-cover filter contrast-[110%] saturate-[120%]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/portfolio/hero_fullbody.jpg';
                    }}
                  />
                  {/* Subtle golden film print tint */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/10 via-transparent to-transparent" />
                </div>

                {/* Split Wipe Divider Bar */}
                <div 
                  className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] pointer-events-none"
                  style={{ left: `${splitWipe}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 rounded-full bg-[#1c1b18] border-2 border-white flex items-center justify-center text-[9px] font-mono text-white shadow-lg">
                    ⇄
                  </div>
                </div>

                {/* HUD Viewfinder Labels */}
                <div className="absolute top-3 left-3 flex items-center gap-2 text-[9px] font-mono bg-[#1c1b18]/85 backdrop-blur-xs px-2 py-0.5 rounded text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>S-LOG3 ⇄ KODAK 2383</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[9px] font-mono bg-[#1c1b18]/85 backdrop-blur-xs px-2 py-1 rounded text-white">
                  <span>ISO 800 • 24.00 FPS</span>
                  <span className="text-amber-300 font-semibold">HOVER TO GRADE</span>
                </div>
              </div>

              {/* Bottom 35mm Sprocket Holes */}
              <div 
                className="h-5 w-full mt-2 opacity-60"
                style={{
                  backgroundImage: 'radial-gradient(circle at 10px 50%, #1c1b18 4px, transparent 4.5px)',
                  backgroundSize: '20px 100%',
                }}
              />
            </div>

            {/* Bottom Cell Label */}
            <div className="mt-3 font-mono text-[10px] text-[#706c62] flex items-center gap-2">
              <Film className="w-3.5 h-3.5 text-[#1c1b18]" />
              <span>35MM FILM CELL • 3D PARALLAX DEPTH • VARUN P.</span>
            </div>

          </div>

        </div>

        {/* ======================================================== */}
        {/* 2. PROPER 3D FLOATING ARTISAN KEYCAPS ORBIT              */}
        {/* ======================================================== */}
        <div id="skills" className="scroll-reveal my-16 pt-12 border-t border-[#dfd8c7]">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#706c62] font-semibold block mb-1">
                KINETIC SWITCHBOARD • PRODUCTION SHORTCUTS
              </span>
              <h3 className="font-serif italic font-normal text-3xl sm:text-5xl text-[#1c1b18]">
                Artisan 3D Keycaps & Mastered Tools
              </h3>
            </div>
            <p className="font-mono text-xs text-[#706c62]">
              [Click any 3D key to engage tactile inspector]
            </p>
          </div>

          {/* 3D Keycaps Orbit Canvas */}
          <div 
            className="w-full bg-[#ede8dd] rounded-3xl p-6 sm:p-10 border border-[#dfd8c7] shadow-sm relative overflow-hidden"
            onMouseMove={handleKeycapsMouseMove}
            onMouseLeave={handleKeycapsMouseLeave}
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Organic Floating Keycaps Wave (Not a flat grid, floating in 3D perspective) */}
            <div 
              className="flex flex-wrap items-center justify-around gap-6 sm:gap-8 relative z-10 py-6 transition-transform duration-300"
              style={{
                transform: `rotateX(${keycapMouseTilt.y}deg) rotateY(${keycapMouseTilt.x}deg)`,
              }}
            >
              {keycaps.map((k) => {
                const isSelected = activeKeyId === k.id;
                const isDepressed = pressedKey === k.id;

                // 3D dynamic scroll rotation + base tilt
                const scrollTilt = (scrollProgress - 0.5) * 12;

                return (
                  <div
                    key={k.id}
                    className="keycap-3d-wrapper flex flex-col items-center"
                    style={{
                      transform: `rotate(${k.baseRotate + scrollTilt}deg) translateZ(${k.zDepth}px)`,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* 3D Tactile Mechanical Keycap Button */}
                    <button
                      onClick={() => handleKeycapClick(k)}
                      className={`keycap-3d w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl sm:rounded-3xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                        isDepressed ? 'pressed' : ''
                      }`}
                      style={{
                        background: k.gradient,
                        borderColor: isSelected ? '#1c1b18' : k.primaryColor,
                        boxShadow: isDepressed
                          ? `0 2px 0 ${k.shadowColor}, 0 4px 8px rgba(0,0,0,0.3)`
                          : isSelected
                          ? `0 10px 0 ${k.shadowColor}, 0 16px 25px rgba(0,0,0,0.25), 0 0 20px ${k.secondaryColor}40`
                          : `0 8px 0 ${k.shadowColor}, 0 12px 18px rgba(0,0,0,0.18)`,
                        transform: isDepressed
                          ? 'translateY(6px) scale(0.96)'
                          : isSelected
                          ? 'translateY(-6px) scale(1.06)'
                          : undefined,
                      }}
                      title={`Click to inspect ${k.name}`}
                    >
                      {/* Concave Key Surface */}
                      <div
                        className="w-[84%] h-[82%] rounded-xl sm:rounded-2xl flex flex-col items-center justify-center relative overflow-hidden"
                        style={{
                          background: k.isTranslucent
                            ? 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.06) 70%)'
                            : 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.3) 80%)',
                          border: '1px solid rgba(255,255,255,0.35)',
                          boxShadow: 'inset 0 3px 5px rgba(255,255,255,0.35), inset 0 -3px 5px rgba(0,0,0,0.4)',
                        }}
                      >
                        {/* DaVinci RGB or Bold Typo Badge */}
                        {k.id === 'dv' ? (
                          <div className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center">
                            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                              <circle cx="50" cy="50" r="44" fill="#121212" stroke="#ffffff30" strokeWidth="3" />
                              <circle cx="50" cy="32" r="16" fill="#ef4444" opacity="0.9" />
                              <circle cx="34" cy="60" r="16" fill="#10b981" opacity="0.9" />
                              <circle cx="66" cy="60" r="16" fill="#3b82f6" opacity="0.9" />
                              <circle cx="50" cy="50" r="8" fill="#ffffff" />
                            </svg>
                          </div>
                        ) : (
                          <span
                            className="font-display font-black text-2xl sm:text-3xl md:text-4xl tracking-tight select-none drop-shadow-md"
                            style={{ color: k.textColor }}
                          >
                            {k.badge}
                          </span>
                        )}

                        <span 
                          className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider font-bold mt-1 opacity-80"
                          style={{ color: k.textColor }}
                        >
                          {k.id}
                        </span>
                      </div>

                      {/* Underglow dot */}
                      {isSelected && (
                        <div className="absolute -bottom-2 w-6 h-1 rounded-full bg-[#1c1b18] shadow-sm animate-pulse" />
                      )}
                    </button>

                    <span className="font-mono text-[11px] font-bold text-[#1c1b18] mt-2.5">
                      {k.badge}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Active Tool Dynamic Inspector */}
            <div className="mt-8 pt-6 border-t border-[#dfd8c7] flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#f5f2eb] p-6 rounded-2xl border border-[#c5bca7] shadow-xs">
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold font-display shadow-sm text-white"
                  style={{ background: activeKey.secondaryColor }}
                >
                  {activeKey.badge}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-display font-bold text-lg sm:text-xl text-[#1c1b18]">
                      {activeKey.name}
                    </h4>
                    <span className="font-mono text-[10px] text-emerald-800 font-bold bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                      {activeKey.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#706c62] mt-1">
                    <Command className="w-3.5 h-3.5 text-[#1c1b18]" />
                    <span>Speed Hotkeys: <strong className="text-[#1c1b18]">{activeKey.shortcut}</strong></span>
                  </div>
                </div>
              </div>

              {/* Mastery Gauge */}
              <div className="w-full md:w-64 flex flex-col gap-1.5 font-mono text-xs">
                <div className="flex justify-between text-[#706c62]">
                  <span>Timeline Mastery</span>
                  <span className="text-[#1c1b18] font-bold">{activeKey.percent}% Frame Accuracy</span>
                </div>
                <div className="w-full bg-[#dfd8c7] h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${activeKey.percent}%`,
                      background: activeKey.secondaryColor,
                    }}
                  />
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ======================================================== */}
        {/* 3. 3D PERSPECTIVE CAREER MILESTONES DECK                 */}
        {/* ======================================================== */}
        <div className="scroll-reveal my-12 pt-10 border-t border-[#dfd8c7]">
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#706c62] font-semibold block mb-1">
                MAGNETIC TIMELINE SCRUBBER • PRODUCTION CHRONICLE
              </span>
              <h3 className="font-serif italic font-normal text-3xl sm:text-5xl text-[#1c1b18]">
                Work Milestones & Career Reels
              </h3>
            </div>
            <div className="font-mono text-xs text-[#706c62] hidden sm:block">
              ACTIVE NODE: {currentMilestone.company}
            </div>
          </div>

          {/* Magnetic Timeline Track */}
          <div className="w-full bg-[#ede8dd] rounded-2xl p-4 sm:p-6 border border-[#dfd8c7] shadow-xs">
            
            {/* Scrubber Nodes */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
              {milestones.map((m, idx) => {
                const isActive = activeMilestoneIdx === idx;
                return (
                  <button
                    key={m.id}
                    onClick={() => setActiveMilestoneIdx(idx)}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#f5f2eb] border-[#1c1b18] shadow-md shadow-[#1c1b18]/5 scale-[1.02]'
                        : 'bg-[#ede8dd] border-[#dfd8c7] hover:border-[#1c1b18]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] mb-1.5">
                      <span className={isActive ? 'text-[#1c1b18] font-bold' : 'text-[#706c62]'}>
                        TC: {m.timecode}
                      </span>
                      <span className="text-[#8c877b]">{m.year}</span>
                    </div>
                    <div className="font-display font-bold text-sm text-[#1c1b18] truncate">
                      {m.company}
                    </div>
                    <div className="font-sans text-xs text-[#706c62] mt-0.5">
                      {m.role}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Milestone Expanded Detail Card */}
            <div className="bg-[#f5f2eb] p-6 rounded-xl border border-[#dfd8c7] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#1c1b18] font-bold">
                    {currentMilestone.duration}
                  </span>
                  <span className="text-[#c5bca7]">•</span>
                  <span className="font-mono text-xs text-[#706c62]">
                    {currentMilestone.year}
                  </span>
                </div>
                <h4 className="font-serif italic text-2xl text-[#1c1b18]">
                  {currentMilestone.company} — <span className="font-sans font-normal text-sm text-[#706c62]">{currentMilestone.role}</span>
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#4a473f] leading-relaxed">
                  {currentMilestone.summary}
                </p>
              </div>

              {/* Tools Tags */}
              <div className="flex flex-wrap gap-2 md:max-w-xs">
                {currentMilestone.tools.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-md bg-[#ede8dd] border border-[#dfd8c7] text-xs font-mono text-[#1c1b18]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
