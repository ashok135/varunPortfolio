import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, Volume2, Film, Zap, X } from 'lucide-react';

interface BentoProject {
  id: string;
  cluster: number;
  title: string;
  subtitle: string;
  category: 'video' | 'color' | 'social' | 'broadcast' | 'print';
  categoryLabel: string;
  year: string;
  image: string;
  client?: string;
  role: string;
  deliverables: string[];
  description: string;
  stat?: { label: string; value: string };
  badge?: string;
}

export const HorizontalBentoProjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<BentoProject | null>(null);

  // Interactive states inside bento cards
  const [activeGradeSplit, setActiveGradeSplit] = useState<number>(50);
  const [activeSpeedRate, setActiveSpeedRate] = useState<number>(1.0);
  const [isCutFlashed, setIsCutFlashed] = useState<boolean>(false);

  // Scroll-driven horizontal translation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Butter-smooth spring physics for horizontal track gliding
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 35,
    stiffness: 180,
    mass: 0.12,
  });

  // Map 0 -> 1 scroll progress to horizontal translation percentage
  const x = useTransform(smoothProgress, [0, 1], ['0%', '-68%']);
  const progressPercent = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  const projects: BentoProject[] = [
    {
      id: 'bento-1',
      cluster: 1,
      title: 'Commercial Kinetic Pacing & Sound-Synced Cuts',
      subtitle: 'Dynamic Narrative / Impact Ramps / Micro-Frame Rhythms',
      category: 'video',
      categoryLabel: 'Commercial Edit',
      year: '2026',
      client: 'Independent Commercial Studio',
      role: 'Lead Video Editor & Colorist',
      deliverables: ['Premiere Pro', 'DaVinci Resolve', 'After Effects'],
      image: '/portfolio/banner_3d_motion.jpg',
      stat: { label: 'VIEW RETENTION', value: '98.4%' },
      badge: 'FEATURED 4K DCI',
      description: 'An exploration of rhythmic pacing, seamless cuts, and immersive audio storytelling crafted for maximum audience retention and emotional resonance.',
    },
    {
      id: 'bento-2',
      cluster: 1,
      title: 'Dual-Node Color Science: S-Log3 to Kodak 2383',
      subtitle: 'ACEScc Color Space / Rich Halation / Kodak Film Print',
      category: 'color',
      categoryLabel: 'Color Science',
      year: '2026',
      role: 'Senior Colorist',
      deliverables: ['ACES 2065-1', 'DaVinci Studio', 'Film Emulation'],
      image: '/portfolio/banner_2d_motion.jpg',
      stat: { label: 'COLOR PIPELINE', value: 'ACES 1.3' },
      badge: 'INTERACTIVE A/B WIPE',
      description: 'Custom node tree converting flat Sony S-Log3 footage into a rich cinematic print emulation with roll-off highlights and organic skin tones.',
    },
    {
      id: 'bento-3',
      cluster: 1,
      title: 'Viral 9:16 Vertical Reel Reframe',
      subtitle: 'Mobile Curated Pacing / Split Eye-Lines / Retention Hooks',
      category: 'social',
      categoryLabel: 'Vertical 9:16',
      year: '2025',
      role: 'Short-Form Editor',
      deliverables: ['Auto-Reframe', 'CapCut Pro', 'Sound Design'],
      image: '/portfolio/banner_social.jpg',
      stat: { label: 'AGGREGATE VIEWS', value: '45M+' },
      badge: '9:16 REELS',
      description: 'Reframing anamorphic 2.39:1 cinema footage into engaging 9:16 vertical storytelling for Instagram Reels and YouTube Shorts.',
    },
    {
      id: 'bento-4',
      cluster: 2,
      title: 'Broadcast Breaking News & Live Studio Segments',
      subtitle: 'Tight Deadlines / Multi-Cam Switching / EBU R128 Audio',
      category: 'broadcast',
      categoryLabel: 'Broadcast TV',
      year: '2025',
      client: 'Speed News Media',
      role: 'Broadcast Editor',
      deliverables: ['Live Multi-Cam', 'Lower-Thirds', 'Studio Bus'],
      image: '/portfolio/motion_3d_bakery.jpg',
      stat: { label: 'TURNAROUND', value: '< 30 MIN' },
      badge: 'NEWSROOM ARCHIVE',
      description: 'High-pressure daily broadcast editing packages with synced animated lower-thirds, footage stabilization, and broadcast compliance.',
    },
    {
      id: 'bento-5',
      cluster: 2,
      title: 'Swiss Typographic & Aerospace Blueprint Posters',
      subtitle: 'Screenprint / Halftone Art / Architectural CAD Silhouettes',
      category: 'print',
      categoryLabel: 'Editorial Print',
      year: '2026',
      role: 'Visual Designer',
      deliverables: ['Halftone Grain', 'Vector CAD', 'Risograph'],
      image: '/portfolio/banner_posters.jpg',
      stat: { label: 'POSTER SERIES', value: '12 PRINTS' },
      badge: 'LIMITED ARCHIVE',
      description: 'Archival screenprint poster series investigating technical aerospace blueprints, vintage risograph textures, and modern asymmetric Swiss grids.',
    },
    {
      id: 'bento-6',
      cluster: 2,
      title: 'High-Retention Editorial Video Assets & Thumbnails',
      subtitle: 'Content Pacing / CTR Packaging / Color Science',
      category: 'video',
      categoryLabel: 'Digital Packaging',
      year: '2025',
      client: 'Tech 4 Billion',
      role: 'Digital Video Editor',
      deliverables: ['Premiere Pro', 'After Effects', 'Lightroom'],
      image: '/portfolio/banner_thumbnails.jpg',
      stat: { label: 'AVG CTR BOOST', value: '+34%' },
      badge: 'YOUTUBE PRO',
      description: 'Editorial video packages and thumbnail compositions optimized for audience curiosity, visual focal hierarchy, and vibrant contrast.',
    },
  ];

  return (
    <section 
      id="works"
      ref={containerRef} 
      className="relative h-[280vh] sm:h-[320vh] bg-[#f5f2eb] border-t border-[#dfd8c7]"
    >
      {/* Pinned Sticky Viewport Window */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-5 sm:py-7 px-4 sm:px-8">
        
        {/* ======================================================== */}
        {/* 1. TOP HEADER & INTERACTION STATUS HUD                   */}
        {/* ======================================================== */}
        <div className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-[#dfd8c7] shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#706c62] font-semibold">
                INDEX 02 • BENTO HORIZONTAL TIMELINE
              </span>
            </div>
            <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-[#1c1b18] tracking-tight">
              Curated Productions & Motion Bento
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#706c62]">
            <div className="hidden md:flex items-center gap-2 bg-[#ede8dd] px-3 py-1.5 rounded-full border border-[#dfd8c7]">
              <span>NAVIGATE:</span>
              <strong className="text-[#1c1b18]">SCROLL WHEEL TO TRAVERSE</strong>
              <span className="text-red-500 font-bold">⇄</span>
            </div>
            <div className="bg-[#ede8dd] px-3 py-1.5 rounded-full border border-[#dfd8c7] text-[#1c1b18] font-bold">
              24 FPS • 4K PRORES
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. THE HORIZONTAL BENTO SCROLL CANVAS                     */}
        {/* ======================================================== */}
        <div className="relative flex-1 w-full flex items-center overflow-hidden my-auto py-2">
          
          <motion.div 
            style={{ x }}
            className="flex items-stretch gap-6 sm:gap-8 will-change-transform pr-16 sm:pr-32"
          >
            
            {/* ---------------------------------------------------- */}
            {/* CLUSTER 1: COMMERCIAL MASTER REEL & LIVE REFRAME     */}
            {/* ---------------------------------------------------- */}
            <div className="flex gap-4 sm:gap-6 shrink-0 w-[85vw] sm:w-[720px] md:w-[820px] h-[52vh] sm:h-[58vh] min-h-[380px] max-h-[520px]">
              
              {/* Card 1A: Wide Hero 16:9 Commercial Video Card */}
              <div 
                onClick={() => setSelectedProject(projects[0])}
                className="flex-1 bg-[#ede8dd] rounded-2xl sm:rounded-3xl border border-[#dfd8c7] p-4 sm:p-5 flex flex-col justify-between shadow-paper-sm hover:shadow-paper transition-all duration-300 cursor-pointer group relative overflow-hidden"
              >
                {/* Image & Video Frame */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#c5bca7] bg-black">
                  <img
                    src={projects[0].image}
                    alt={projects[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-[105%]"
                  />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-[#1c1b18]/85 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-white/20">
                      {projects[0].categoryLabel}
                    </span>
                    <span className="bg-red-600/90 text-white text-[9px] font-mono px-2 py-0.5 rounded-full font-bold">
                      {projects[0].badge}
                    </span>
                  </div>

                  {/* Play Action Hover Button */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#f5f2eb] text-[#1c1b18] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Timecode OSD */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[9px] font-mono text-white/90 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                    <span>TC: 01:00:14:08</span>
                    <span className="text-emerald-400">RETENTION: 98.4%</span>
                  </div>
                </div>

                {/* Card Text & Tags */}
                <div className="pt-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif italic font-normal text-xl sm:text-2xl text-[#1c1b18] group-hover:text-[#4a473f] transition-colors leading-tight">
                      {projects[0].title}
                    </h3>
                    <div className="w-7 h-7 rounded-full bg-[#1c1b18] text-[#f5f2eb] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <p className="font-sans text-xs text-[#706c62] mt-1 line-clamp-1">
                    {projects[0].subtitle}
                  </p>

                  <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                    {projects[0].deliverables.map((d) => (
                      <span key={d} className="px-2 py-0.5 rounded-md bg-[#f5f2eb] text-[10px] font-mono text-[#1c1b18] border border-[#dfd8c7]">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 1B: Vertical 9:16 Social Reel Card */}
              <div 
                onClick={() => setSelectedProject(projects[2])}
                className="w-[180px] sm:w-[220px] md:w-[260px] bg-[#ede8dd] rounded-2xl sm:rounded-3xl border border-[#dfd8c7] p-3.5 sm:p-4 flex flex-col justify-between shadow-paper-sm hover:shadow-paper transition-all duration-300 cursor-pointer group relative overflow-hidden shrink-0"
              >
                {/* Phone Viewport Frame */}
                <div className="relative aspect-[9/14] w-full rounded-2xl overflow-hidden border-2 border-[#1c1b18] bg-black shadow-inner">
                  <img
                    src={projects[2].image}
                    alt={projects[2].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    style={{
                      transform: `scale(${1.2 + activeSpeedRate * 0.1})`,
                    }}
                  />

                  {/* Top Phone Notch */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-2.5 bg-black rounded-full border border-white/20 flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-blue-400 mr-1" />
                    <span className="text-[6px] font-mono text-white/80">9:16 REEL</span>
                  </div>

                  {/* Cut flash effect */}
                  {isCutFlashed && (
                    <div className="absolute inset-0 bg-white/70 animate-in fade-in duration-100" />
                  )}

                  {/* Center Speed Badge */}
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsCutFlashed(true);
                      setActiveSpeedRate(prev => prev === 1 ? 2 : prev === 2 ? 0.5 : 1);
                      setTimeout(() => setIsCutFlashed(false), 300);
                    }}
                    className="absolute top-8 right-2.5 bg-black/75 hover:bg-red-600 text-white px-2 py-1 rounded-full text-[9px] font-mono border border-white/20 transition-colors flex items-center gap-1 shadow-md"
                    title="Click to toggle speed ramp"
                  >
                    <Zap className="w-2.5 h-2.5 text-amber-300" />
                    <span>{activeSpeedRate}x</span>
                  </div>

                  {/* Bottom Stats */}
                  <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-xs p-1.5 rounded-lg border border-white/10 text-white font-mono text-[8px]">
                    <div className="flex justify-between items-center text-emerald-400 font-bold">
                      <span>45M+ VIEWS</span>
                      <span>VIRAL HOOK</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-amber-900 font-bold">
                      {projects[2].categoryLabel}
                    </span>
                    <span className="font-mono text-[10px] text-[#706c62]">2025</span>
                  </div>
                  <h4 className="font-serif italic text-base text-[#1c1b18] mt-0.5 truncate">
                    {projects[2].title}
                  </h4>
                </div>
              </div>

            </div>

            {/* ---------------------------------------------------- */}
            {/* CLUSTER 2: COLOR SCIENCE SPLIT & SONIC SYNC          */}
            {/* ---------------------------------------------------- */}
            <div className="flex gap-4 sm:gap-6 shrink-0 w-[85vw] sm:w-[720px] md:w-[820px] h-[52vh] sm:h-[58vh] min-h-[380px] max-h-[520px]">
              
              {/* Card 2A: Interactive Color Grade Wipe Card */}
              <div 
                className="flex-1 bg-[#ede8dd] rounded-2xl sm:rounded-3xl border border-[#dfd8c7] p-4 sm:p-5 flex flex-col justify-between shadow-paper-sm relative overflow-hidden"
              >
                {/* A/B Split Viewer */}
                <div 
                  className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#c5bca7] bg-black select-none cursor-ew-resize group"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const xPos = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100));
                    setActiveGradeSplit(xPos);
                  }}
                >
                  {/* Base Flat S-Log3 Image */}
                  <img
                    src={projects[1].image}
                    alt="S-Log3 Raw Rushes"
                    className="absolute inset-0 w-full h-full object-cover filter contrast-[90%] brightness-[110%] grayscale"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/75 text-white text-[9px] font-mono px-2 py-0.5 rounded">
                    S-LOG3 FLAT
                  </div>

                  {/* Graded Rec.709 Image (Clipped) */}
                  <div 
                    className="absolute inset-0 overflow-hidden pointer-events-none"
                    style={{
                      clipPath: `polygon(${activeGradeSplit}% 0, 100% 0, 100% 100%, ${activeGradeSplit}% 100%)`,
                    }}
                  >
                    <img
                      src={projects[1].image}
                      alt="Kodak 2383 Graded Print"
                      className="absolute inset-0 w-full h-full object-cover filter contrast-[118%] saturate-[130%]"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-amber-600/90 text-white text-[9px] font-mono px-2 py-0.5 rounded font-bold">
                      KODAK 2383 GRADED
                    </div>
                  </div>

                  {/* Split Needle */}
                  <div 
                    className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] pointer-events-none"
                    style={{ left: `${activeGradeSplit}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -left-2.5 w-5 h-5 rounded-full bg-[#1c1b18] border-2 border-white flex items-center justify-center text-[8px] text-white font-mono shadow-md">
                      ⇄
                    </div>
                  </div>

                  {/* Hover Hint */}
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-black/60 text-white/90 text-[8px] font-mono px-2.5 py-0.5 rounded-full pointer-events-none">
                    DRAG HORIZONTALLY TO GRADE
                  </div>
                </div>

                {/* Text & Scope Readout */}
                <div className="pt-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif italic font-normal text-xl sm:text-2xl text-[#1c1b18] leading-tight">
                      {projects[1].title}
                    </h3>
                    <span className="font-mono text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
                      ACES 1.3
                    </span>
                  </div>

                  <p className="font-sans text-xs text-[#706c62] mt-1 line-clamp-1">
                    {projects[1].subtitle}
                  </p>

                  <div className="flex items-center gap-2 mt-2 font-mono text-[10px] text-[#4a473f]">
                    <span>LUT: Kodak 2383 D65</span>
                    <span>•</span>
                    <span>Roll-Off: Arri LogC Curve</span>
                    <span>•</span>
                    <span>Halation: 35mm</span>
                  </div>
                </div>
              </div>

              {/* Card 2B: Pro Sonic Sync & Audio VU Meter Card */}
              <div 
                className="w-[180px] sm:w-[220px] md:w-[260px] bg-[#ede8dd] rounded-2xl sm:rounded-3xl border border-[#dfd8c7] p-4 flex flex-col justify-between shadow-paper-sm shrink-0"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#706c62] mb-1">
                    <Volume2 className="w-3.5 h-3.5 text-[#1c1b18]" />
                    <span>AUDIO BUS • 96kHz</span>
                  </div>
                  <h4 className="font-serif italic text-lg sm:text-xl text-[#1c1b18] leading-snug">
                    Sonic Synchronization
                  </h4>
                  <p className="font-sans text-[11px] text-[#706c62] mt-1">
                    Audio-driven beat markers with -14.2 LUFS broadcast normalization.
                  </p>
                </div>

                {/* Audio VU Meter (Exact green signal + red peak styling user loved!) */}
                <div className="bg-[#0e0e0c] p-3 rounded-xl border border-[#24231f] shadow-inner my-2">
                  <div className="flex items-center justify-between text-[8px] font-mono text-[#8c877b] mb-1.5">
                    <span>-24dB</span>
                    <span>-14dB (LUFS)</span>
                    <span className="text-red-400">0dB PK</span>
                  </div>

                  <div className="flex items-end gap-[3px] h-9">
                    {[
                      { h: 18, isPeak: false },
                      { h: 14, isPeak: false },
                      { h: 8, isPeak: false },
                      { h: 6, isPeak: false },
                      { h: 12, isPeak: false },
                      { h: 19, isPeak: false },
                      { h: 22, isPeak: false },
                      { h: 15, isPeak: false },
                      { h: 8, isPeak: false },
                      { h: 14, isPeak: false },
                      { h: 20, isPeak: false },
                      { h: 24, isPeak: true },
                      { h: 18, isPeak: true },
                      { h: 10, isPeak: true },
                    ].map((bar, bi) => (
                      <span
                        key={bi}
                        className={`w-1 rounded-xs animate-pulse ${
                          bar.isPeak
                            ? 'bg-[#ef4444] shadow-[0_0_6px_rgba(239,68,68,0.7)]'
                            : 'bg-[#22c55e] shadow-[0_0_6px_rgba(34,197,94,0.6)]'
                        }`}
                        style={{
                          height: `${bar.h}px`,
                          animationDelay: `${(bi % 4) * 0.12}s`,
                          animationDuration: '0.8s',
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#dfd8c7] flex justify-between items-center text-[10px] font-mono text-[#706c62]">
                  <span>STEREO MASTER</span>
                  <span className="text-emerald-700 font-bold">L/R LOCKED</span>
                </div>
              </div>

            </div>

            {/* ---------------------------------------------------- */}
            {/* CLUSTER 3: BROADCAST NEWSROOM & POSTERS ARCHIVE      */}
            {/* ---------------------------------------------------- */}
            <div className="flex gap-4 sm:gap-6 shrink-0 w-[85vw] sm:w-[720px] md:w-[820px] h-[52vh] sm:h-[58vh] min-h-[380px] max-h-[520px]">
              
              {/* Card 3A: Broadcast TV Monitor */}
              <div 
                onClick={() => setSelectedProject(projects[3])}
                className="flex-1 bg-[#ede8dd] rounded-2xl sm:rounded-3xl border border-[#dfd8c7] p-4 sm:p-5 flex flex-col justify-between shadow-paper-sm hover:shadow-paper transition-all duration-300 cursor-pointer group relative overflow-hidden"
              >
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#c5bca7] bg-black">
                  <img
                    src={projects[3].image}
                    alt={projects[3].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#1c1b18]/85 text-white text-[10px] font-mono px-2.5 py-0.5 rounded-full">
                    {projects[3].categoryLabel}
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/75 p-2 rounded-lg text-white font-mono text-[9px] flex items-center justify-between">
                    <span className="text-red-400 font-bold">● LIVE AIRING</span>
                    <span>TURNAROUND: &lt; 30 MIN</span>
                  </div>
                </div>

                <div className="pt-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif italic font-normal text-xl sm:text-2xl text-[#1c1b18] group-hover:text-[#4a473f] transition-colors leading-tight">
                      {projects[3].title}
                    </h3>
                    <div className="w-7 h-7 rounded-full bg-[#1c1b18] text-[#f5f2eb] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <p className="font-sans text-xs text-[#706c62] mt-1 line-clamp-1">
                    {projects[3].subtitle}
                  </p>

                  <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                    {projects[3].deliverables.map((d) => (
                      <span key={d} className="px-2 py-0.5 rounded-md bg-[#f5f2eb] text-[10px] font-mono text-[#1c1b18] border border-[#dfd8c7]">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 3B: Swiss Poster CAD Card */}
              <div 
                onClick={() => setSelectedProject(projects[4])}
                className="w-[180px] sm:w-[220px] md:w-[260px] bg-[#ede8dd] rounded-2xl sm:rounded-3xl border border-[#dfd8c7] p-3.5 sm:p-4 flex flex-col justify-between shadow-paper-sm hover:shadow-paper transition-all duration-300 cursor-pointer group relative overflow-hidden shrink-0"
              >
                <div className="relative aspect-[9/13] w-full rounded-xl overflow-hidden border border-[#c5bca7] bg-white">
                  <img
                    src={projects[4].image}
                    alt={projects[4].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106 filter contrast-[105%]"
                  />
                  <div className="absolute top-2 left-2 bg-[#1c1b18] text-[#f5f2eb] text-[8px] font-mono px-2 py-0.5 rounded">
                    SWISS CAD
                  </div>
                </div>

                <div className="pt-2.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#706c62]">
                    <span>PRINT & POSTERS</span>
                    <span>2026</span>
                  </div>
                  <h4 className="font-serif italic text-base text-[#1c1b18] mt-0.5 truncate">
                    {projects[4].title}
                  </h4>
                </div>
              </div>

            </div>

            {/* ---------------------------------------------------- */}
            {/* CLUSTER 4: YOUTUBE PACKAGING & DIRECT INQUIRY CTA    */}
            {/* ---------------------------------------------------- */}
            <div className="flex gap-4 sm:gap-6 shrink-0 w-[85vw] sm:w-[680px] md:w-[760px] h-[52vh] sm:h-[58vh] min-h-[380px] max-h-[520px]">
              
              {/* Card 4A: YouTube Packaging Card */}
              <div 
                onClick={() => setSelectedProject(projects[5])}
                className="flex-1 bg-[#ede8dd] rounded-2xl sm:rounded-3xl border border-[#dfd8c7] p-4 sm:p-5 flex flex-col justify-between shadow-paper-sm hover:shadow-paper transition-all duration-300 cursor-pointer group relative overflow-hidden"
              >
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#c5bca7] bg-black">
                  <img
                    src={projects[5].image}
                    alt={projects[5].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold">
                    YOUTUBE PACKAGING
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 bg-black/80 px-2 py-1 rounded text-white font-mono text-[9px]">
                    CTR BOOST: +34% AVERAGE
                  </div>
                </div>

                <div className="pt-3">
                  <h3 className="font-serif italic font-normal text-xl sm:text-2xl text-[#1c1b18] group-hover:text-[#4a473f] transition-colors leading-tight">
                    {projects[5].title}
                  </h3>
                  <p className="font-sans text-xs text-[#706c62] mt-1 line-clamp-1">
                    {projects[5].subtitle}
                  </p>
                </div>
              </div>

              {/* Card 4B: Timeless Inquire / Collab Card */}
              <div className="w-[180px] sm:w-[220px] md:w-[250px] bg-[#1c1b18] text-[#f5f2eb] rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-xl shrink-0 relative overflow-hidden">
                <div className="relative z-10">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#a69e8b] block mb-2">
                    START A PROJECT
                  </span>
                  <h4 className="font-serif italic text-2xl sm:text-3xl text-white leading-tight">
                    Ready for your next cut?
                  </h4>
                  <p className="font-sans text-xs text-[#c5bca7] mt-3 leading-relaxed">
                    Available for commercial edits, documentarian narratives, and cinematic color finishing.
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-[#383732]">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#f5f2eb] hover:bg-white text-[#1c1b18] text-xs font-mono font-bold transition-all shadow-md group"
                  >
                    <span>Inquire Now</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>

                {/* Subtle Luxury Gradient Background Bloom */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl from-amber-500/20 to-red-500/20 rounded-full blur-2xl pointer-events-none" />
              </div>

            </div>

          </motion.div>

        </div>

        {/* ======================================================== */}
        {/* 3. BOTTOM TIMELINE RULER & SCRUBBER NEEDLE               */}
        {/* ======================================================== */}
        <div className="max-w-7xl w-full mx-auto pt-3 border-t border-[#dfd8c7] shrink-0">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#706c62] mb-1.5">
            <div className="flex items-center gap-2">
              <Film className="w-3.5 h-3.5 text-[#1c1b18]" />
              <span>TIMELINE SCRUBBER</span>
            </div>
            <div className="flex items-center gap-4">
              <span>01: COMMERCIAL</span>
              <span>•</span>
              <span>02: COLOR SCIENCE</span>
              <span>•</span>
              <span>03: BROADCAST</span>
              <span>•</span>
              <span>04: PACKAGING</span>
            </div>
          </div>

          {/* Timeline Track with Red Needle */}
          <div className="relative h-2 bg-[#dfd8c7] rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 bottom-0 left-0 bg-[#1c1b18] rounded-full"
              style={{ width: progressPercent }}
            />
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 4. LIGHTBOX DETAIL MODAL FOR SELECTED BENTO PROJECT     */}
      {/* ======================================================== */}
      <AnimatePresence>
        {selectedProject && (
          <div 
            className="fixed inset-0 z-50 bg-[#1c1b18]/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-[#f5f2eb] border border-[#dfd8c7] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Media Preview Header */}
              <div className="relative aspect-[16/9] bg-black overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1c1b18]/80 hover:bg-[#1c1b18] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-4 bg-[#1c1b18]/85 text-white font-mono text-xs px-3 py-1 rounded-full">
                  {selectedProject.categoryLabel} • {selectedProject.year}
                </div>
              </div>

              {/* Text & Deliverables Breakdown */}
              <div className="p-6 sm:p-8">
                {selectedProject.client && (
                  <span className="font-mono text-xs text-[#706c62] block mb-1">
                    CLIENT: {selectedProject.client}
                  </span>
                )}
                <h3 className="font-serif italic font-normal text-2xl sm:text-3xl text-[#1c1b18] mb-2">
                  {selectedProject.title}
                </h3>
                <p className="font-sans text-xs font-semibold text-[#4a473f] mb-4">
                  Directorial Role: {selectedProject.role}
                </p>

                <p className="font-sans text-xs sm:text-sm text-[#4a473f] leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                {/* Deliverables Tags */}
                <div className="flex items-center justify-between pt-4 border-t border-[#dfd8c7] flex-wrap gap-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {selectedProject.deliverables.map((d) => (
                      <span key={d} className="px-3 py-1 rounded-md bg-[#ede8dd] text-xs font-mono text-[#1c1b18] border border-[#dfd8c7]">
                        {d}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    onClick={() => setSelectedProject(null)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1c1b18] text-[#f5f2eb] text-xs font-mono hover:bg-[#383732] transition-colors"
                  >
                    <span>Commission Similar Work</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
