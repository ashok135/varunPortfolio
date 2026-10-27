import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, Film, X } from 'lucide-react';

export interface BentoProject {
  id: string;
  title: string;
  subtitle: string;
  category: 'video' | 'social' | 'print';
  categoryLabel: string;
  year: string;
  video?: string;
  image?: string;
  aspect?: string;
  client?: string;
  role: string;
  deliverables: string[];
  description: string;
  badge?: string;
  stat?: { label: string; value: string };
}

export const HorizontalBentoProjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<BentoProject | null>(null);

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
  const x = useTransform(smoothProgress, [0, 1], ['0%', '-72%']);
  const progressPercent = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  // Real projects downloaded directly from Google Drive
  const projects: BentoProject[] = [
    // --- 1. Commercial Ad Video ---
    {
      id: 'drive-ad-1',
      title: 'Commercial Kinetic Pacing & Advertisement Cut',
      subtitle: 'Dynamic Narrative / Sound-Synced Impact Ramps / Micro-Frame Rhythms',
      category: 'video',
      categoryLabel: 'Commercial Ad',
      year: '2026',
      client: 'Commercial Studio',
      role: 'Lead Video Editor & Colorist',
      deliverables: ['Premiere Pro', 'DaVinci Resolve', 'Sound Design'],
      video: '/portfolio/ads5.mp4',
      badge: 'FEATURED 16:9',
      stat: { label: 'VIEW RETENTION', value: '98.4%' },
      description: 'An exploration of rhythmic pacing, seamless cuts, and immersive audio storytelling crafted for maximum audience retention and emotional resonance.',
    },
    // --- 2. AI Reels ---
    {
      id: 'drive-reel-1',
      title: 'Calorie Buddy — Conversational AI Assistant',
      subtitle: 'Viral Pacing / Dynamic Subtitles / Health AI Retention Hook',
      category: 'social',
      categoryLabel: 'AI Reel 9:16',
      year: '2026',
      client: 'Calorie Buddy AI',
      role: 'Short-Form Reel Editor',
      deliverables: ['Retention Hooks', 'Kinetic Typography', 'Sound Design'],
      video: '/portfolio/calorie_buddy_final.mp4',
      badge: '9:16 REEL',
      stat: { label: 'COMPLETION RATE', value: '96.2%' },
      description: 'Engaging AI conversational assistant reel engineered for viral retention on Instagram Reels and TikTok with sound-synced kinetic subtitles.',
    },
    {
      id: 'drive-reel-2',
      title: 'Coco Panda — Script 11 AI Animation Cut',
      subtitle: 'Character Motion / Sound Ramp FX / High-Energy Rhythm',
      category: 'social',
      categoryLabel: 'AI Reel 9:16',
      year: '2026',
      client: 'Coco Panda',
      role: 'AI Animation Video Editor',
      deliverables: ['Sound Effects', 'Pacing Cuts', 'Visual Grading'],
      video: '/portfolio/coco_panda_script_11.mp4',
      badge: '9:16 REEL',
      stat: { label: 'AUDIENCE REACH', value: '45M+' },
      description: 'Full vertical AI animation promotional video cut to sound-synced rhythm with playful character motion styling and retention hooks.',
    },
    {
      id: 'drive-reel-3',
      title: 'Date Night — Narrative Relationship Hook',
      subtitle: 'Emotional Dynamic / Atmospheric Color / Rapid Jump Cuts',
      category: 'social',
      categoryLabel: 'AI Reel 9:16',
      year: '2026',
      client: 'Date Night Creative',
      role: 'Creative Story Editor',
      deliverables: ['Dynamic Cuts', 'Audio Mixing', 'Color Accent'],
      video: '/portfolio/date_night_oct5.mp4',
      badge: '9:16 REEL',
      stat: { label: 'VIEW VELOCITY', value: '12M+ Views' },
      description: 'High-retention social reel capturing relatable relationship humor, dynamic pacing, and moody cinematic color grading.',
    },
    {
      id: 'drive-reel-4',
      title: 'Lawyer Buddy — Script 5 Legal Advisory',
      subtitle: 'Direct Response / 1x1 Square Video / Crisp Speech Delivery',
      category: 'social',
      categoryLabel: 'AI Video 1:1',
      year: '2026',
      client: 'Lawyer Buddy AI',
      role: 'AI Video Editor',
      deliverables: ['Direct Response', 'Voice Sync', 'Motion Graphics'],
      video: '/portfolio/lawyer_buddy_script5.mp4',
      badge: '1:1 SQUARE',
      stat: { label: 'CTR CONVERSION', value: '8.4%' },
      description: '1x1 square format legal advisory promo with crisp sound mastering, clear visual hierarchy, and retention timing.',
    },
    // --- 3. Posters ---
    {
      id: 'drive-poster-1',
      title: 'Korda Helmet — Aerodynamic Editorial Key Art',
      subtitle: 'Swiss Grid Typography / Technical Precision / Sport Key Visual',
      category: 'print',
      categoryLabel: 'Poster Art',
      year: '2026',
      client: 'Korda Helmets',
      role: 'Key Visual & Graphic Designer',
      deliverables: ['Photoshop', 'Vector Art', 'Print Proofing'],
      image: '/portfolio/korda_helmet_poster.jpg',
      badge: 'POSTER PRINT',
      stat: { label: 'CAMPAIGN', value: 'KORDA HELMET' },
      description: 'High-impact key visual poster design combining Swiss typographic hierarchy and modern sports branding with bold aerodynamic silhouettes.',
    },
    {
      id: 'drive-poster-2',
      title: 'Creative Brand Editorial Poster',
      subtitle: 'Layered Risograph Texture / Graphic Hierarchy / Cultural Editorial',
      category: 'print',
      categoryLabel: 'Graphic Poster',
      year: '2026',
      client: 'Design Collective',
      role: 'Visual Designer',
      deliverables: ['Editorial Layout', 'Risograph Print', 'Typography'],
      image: '/portfolio/creative_poster_2.jpeg',
      badge: 'POSTER PRINT',
      stat: { label: 'PRINT RUN', value: 'LIMITED ARCHIVE' },
      description: 'Editorial graphic poster investigating tactile paper textures, contrast balance, and modern asymmetric Swiss typography.',
    },
  ];

  return (
    <section 
      id="works"
      ref={containerRef} 
      className="relative h-[320vh] sm:h-[360vh] bg-[#f5f2eb] border-t border-[#dfd8c7]"
    >
      {/* Pinned Sticky Viewport Window */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-5 sm:py-7 px-4 sm:px-8">
        
        {/* ======================================================== */}
        {/* 1. TOP HEADER & HUD STATUS BAR                           */}
        {/* ======================================================== */}
        <div className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-[#dfd8c7] shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#706c62] font-semibold">
                INDEX 02 • SELECTED PRODUCTIONS & REELS
              </span>
            </div>
            <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-[#1c1b18] tracking-tight">
              Curated Video & Poster Portfolio
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#706c62]">
            <div className="hidden md:flex items-center gap-2 bg-[#ede8dd] px-3 py-1.5 rounded-full border border-[#dfd8c7]">
              <span>NAVIGATE:</span>
              <strong className="text-[#1c1b18]">SCROLL DOWN TO TRAVERSE</strong>
              <span className="text-red-500 font-bold">⇄</span>
            </div>
            <div className="bg-[#ede8dd] px-3 py-1.5 rounded-full border border-[#dfd8c7] text-[#1c1b18] font-bold">
              7 DRIVE RELEASES • 100% AUTOPLAY
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
            {/* CLUSTER 1: COMMERCIAL ADVERTISEMENT MASTER (16:9)    */}
            {/* ---------------------------------------------------- */}
            <div className="flex gap-4 sm:gap-6 shrink-0 w-[85vw] sm:w-[620px] md:w-[680px] h-[52vh] sm:h-[58vh] min-h-[380px] max-h-[520px]">
              
              <div 
                onClick={() => setSelectedProject(projects[0])}
                className="flex-1 bg-[#ede8dd] rounded-2xl sm:rounded-3xl border border-[#dfd8c7] p-4 sm:p-5 flex flex-col justify-between shadow-paper-sm hover:shadow-paper transition-all duration-300 cursor-pointer group relative overflow-hidden"
              >
                {/* 16:9 Video Frame */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#c5bca7] bg-black">
                  <video
                    src={projects[0].video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-[105%]"
                  />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                    <span className="bg-[#1c1b18]/85 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-white/20">
                      {projects[0].categoryLabel}
                    </span>
                    <span className="bg-red-600/90 text-white text-[9px] font-mono px-2 py-0.5 rounded-full font-bold">
                      {projects[0].badge}
                    </span>
                  </div>

                  {/* Play Action Hover Button */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors z-10">
                    <div className="w-12 h-12 rounded-full bg-[#f5f2eb]/90 backdrop-blur-xs text-[#1c1b18] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5 fill-current" />
                    </div>
                  </div>

                  {/* Bottom Timecode OSD */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[9px] font-mono text-white/90 bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded-lg z-10">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>AUTOPLAYING</span>
                    </span>
                    <span className="text-emerald-400">{projects[0].stat?.label}: {projects[0].stat?.value}</span>
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

            </div>

            {/* ---------------------------------------------------- */}
            {/* CLUSTER 2: AI REELS COLLECTION (4 REELS)             */}
            {/* ---------------------------------------------------- */}
            <div className="flex gap-4 sm:gap-6 shrink-0 h-[52vh] sm:h-[58vh] min-h-[380px] max-h-[520px]">
              
              {/* Reel 1: Calorie Buddy */}
              <div 
                onClick={() => setSelectedProject(projects[1])}
                className="w-[190px] sm:w-[220px] md:w-[240px] bg-[#ede8dd] rounded-2xl sm:rounded-3xl border border-[#dfd8c7] p-3.5 sm:p-4 flex flex-col justify-between shadow-paper-sm hover:shadow-paper transition-all duration-300 cursor-pointer group relative overflow-hidden shrink-0"
              >
                <div className="relative aspect-[9/14] w-full rounded-2xl overflow-hidden border-2 border-[#1c1b18] bg-black shadow-inner">
                  <video
                    src={projects[1].video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-2.5 bg-black rounded-full border border-white/20 flex items-center justify-center z-10">
                    <span className="w-1 h-1 rounded-full bg-blue-400 mr-1" />
                    <span className="text-[6px] font-mono text-white/80">9:16 REEL</span>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-xs p-1.5 rounded-lg border border-white/10 text-white font-mono text-[8px] z-10">
                    <div className="flex justify-between items-center text-emerald-400 font-bold">
                      <span>CALORIE BUDDY</span>
                      <span className="text-white/60 text-[7px]">EXPAND</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#706c62]">
                    <span className="text-amber-900 font-bold">{projects[1].categoryLabel}</span>
                    <span>2026</span>
                  </div>
                  <h4 className="font-serif italic text-sm sm:text-base text-[#1c1b18] mt-0.5 truncate">
                    {projects[1].title}
                  </h4>
                </div>
              </div>

              {/* Reel 2: Coco Panda */}
              <div 
                onClick={() => setSelectedProject(projects[2])}
                className="w-[190px] sm:w-[220px] md:w-[240px] bg-[#ede8dd] rounded-2xl sm:rounded-3xl border border-[#dfd8c7] p-3.5 sm:p-4 flex flex-col justify-between shadow-paper-sm hover:shadow-paper transition-all duration-300 cursor-pointer group relative overflow-hidden shrink-0"
              >
                <div className="relative aspect-[9/14] w-full rounded-2xl overflow-hidden border-2 border-[#1c1b18] bg-black shadow-inner">
                  <video
                    src={projects[2].video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-2.5 bg-black rounded-full border border-white/20 flex items-center justify-center z-10">
                    <span className="w-1 h-1 rounded-full bg-blue-400 mr-1" />
                    <span className="text-[6px] font-mono text-white/80">9:16 REEL</span>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-xs p-1.5 rounded-lg border border-white/10 text-white font-mono text-[8px] z-10">
                    <div className="flex justify-between items-center text-emerald-400 font-bold">
                      <span>COCO PANDA</span>
                      <span className="text-white/60 text-[7px]">EXPAND</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#706c62]">
                    <span className="text-amber-900 font-bold">{projects[2].categoryLabel}</span>
                    <span>2026</span>
                  </div>
                  <h4 className="font-serif italic text-sm sm:text-base text-[#1c1b18] mt-0.5 truncate">
                    {projects[2].title}
                  </h4>
                </div>
              </div>

              {/* Reel 3: Date Night */}
              <div 
                onClick={() => setSelectedProject(projects[3])}
                className="w-[190px] sm:w-[220px] md:w-[240px] bg-[#ede8dd] rounded-2xl sm:rounded-3xl border border-[#dfd8c7] p-3.5 sm:p-4 flex flex-col justify-between shadow-paper-sm hover:shadow-paper transition-all duration-300 cursor-pointer group relative overflow-hidden shrink-0"
              >
                <div className="relative aspect-[9/14] w-full rounded-2xl overflow-hidden border-2 border-[#1c1b18] bg-black shadow-inner">
                  <video
                    src={projects[3].video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-2.5 bg-black rounded-full border border-white/20 flex items-center justify-center z-10">
                    <span className="w-1 h-1 rounded-full bg-blue-400 mr-1" />
                    <span className="text-[6px] font-mono text-white/80">9:16 REEL</span>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-xs p-1.5 rounded-lg border border-white/10 text-white font-mono text-[8px] z-10">
                    <div className="flex justify-between items-center text-emerald-400 font-bold">
                      <span>DATE NIGHT</span>
                      <span className="text-white/60 text-[7px]">EXPAND</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#706c62]">
                    <span className="text-amber-900 font-bold">{projects[3].categoryLabel}</span>
                    <span>2026</span>
                  </div>
                  <h4 className="font-serif italic text-sm sm:text-base text-[#1c1b18] mt-0.5 truncate">
                    {projects[3].title}
                  </h4>
                </div>
              </div>

              {/* Reel 4: Lawyer Buddy (1:1 Square Card) */}
              <div 
                onClick={() => setSelectedProject(projects[4])}
                className="w-[200px] sm:w-[230px] md:w-[250px] bg-[#ede8dd] rounded-2xl sm:rounded-3xl border border-[#dfd8c7] p-3.5 sm:p-4 flex flex-col justify-between shadow-paper-sm hover:shadow-paper transition-all duration-300 cursor-pointer group relative overflow-hidden shrink-0"
              >
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden border-2 border-[#1c1b18] bg-black shadow-inner">
                  <video
                    src={projects[4].video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-[#1c1b18]/85 text-white text-[8px] font-mono px-2 py-0.5 rounded-full z-10 border border-white/20">
                    1:1 FORMAT
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-xs p-1.5 rounded-lg border border-white/10 text-white font-mono text-[8px] z-10">
                    <div className="flex justify-between items-center text-emerald-400 font-bold">
                      <span>LAWYER BUDDY</span>
                      <span className="text-white/60 text-[7px]">EXPAND</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#706c62]">
                    <span className="text-amber-900 font-bold">{projects[4].categoryLabel}</span>
                    <span>2026</span>
                  </div>
                  <h4 className="font-serif italic text-sm sm:text-base text-[#1c1b18] mt-0.5 truncate">
                    {projects[4].title}
                  </h4>
                </div>
              </div>

            </div>

            {/* ---------------------------------------------------- */}
            {/* CLUSTER 3: EDITORIAL POSTERS ARCHIVE (2 PRINTS)      */}
            {/* ---------------------------------------------------- */}
            <div className="flex gap-4 sm:gap-6 shrink-0 h-[52vh] sm:h-[58vh] min-h-[380px] max-h-[520px]">
              
              {/* Poster 1: Korda Helmet */}
              <div 
                onClick={() => setSelectedProject(projects[5])}
                className="w-[190px] sm:w-[220px] md:w-[250px] bg-[#ede8dd] rounded-2xl sm:rounded-3xl border border-[#dfd8c7] p-3.5 sm:p-4 flex flex-col justify-between shadow-paper-sm hover:shadow-paper transition-all duration-300 cursor-pointer group relative overflow-hidden shrink-0"
              >
                <div className="relative aspect-[9/13] w-full rounded-xl overflow-hidden border border-[#c5bca7] bg-white">
                  <img
                    src={projects[5].image}
                    alt={projects[5].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106 filter contrast-[105%]"
                  />
                  <div className="absolute top-2 left-2 bg-[#1c1b18] text-[#f5f2eb] text-[8px] font-mono px-2 py-0.5 rounded">
                    KORDA HELMET
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#706c62]">
                    <span>POSTER SERIES</span>
                    <span>2026</span>
                  </div>
                  <h4 className="font-serif italic text-sm sm:text-base text-[#1c1b18] mt-0.5 truncate">
                    {projects[5].title}
                  </h4>
                </div>
              </div>

              {/* Poster 2: Creative Graphic Poster */}
              <div 
                onClick={() => setSelectedProject(projects[6])}
                className="w-[190px] sm:w-[220px] md:w-[250px] bg-[#ede8dd] rounded-2xl sm:rounded-3xl border border-[#dfd8c7] p-3.5 sm:p-4 flex flex-col justify-between shadow-paper-sm hover:shadow-paper transition-all duration-300 cursor-pointer group relative overflow-hidden shrink-0"
              >
                <div className="relative aspect-[9/13] w-full rounded-xl overflow-hidden border border-[#c5bca7] bg-white">
                  <img
                    src={projects[6].image}
                    alt={projects[6].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106 filter contrast-[105%]"
                  />
                  <div className="absolute top-2 left-2 bg-[#1c1b18] text-[#f5f2eb] text-[8px] font-mono px-2 py-0.5 rounded">
                    GRAPHIC POSTER
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#706c62]">
                    <span>EDITORIAL PRINT</span>
                    <span>2026</span>
                  </div>
                  <h4 className="font-serif italic text-sm sm:text-base text-[#1c1b18] mt-0.5 truncate">
                    {projects[6].title}
                  </h4>
                </div>
              </div>

            </div>

            {/* ---------------------------------------------------- */}
            {/* CLUSTER 4: DIRECT INQUIRY & COMMISSION CTA           */}
            {/* ---------------------------------------------------- */}
            <div className="flex gap-4 sm:gap-6 shrink-0 w-[85vw] sm:w-[280px] md:w-[320px] h-[52vh] sm:h-[58vh] min-h-[380px] max-h-[520px]">
              
              <div className="flex-1 bg-[#1c1b18] text-[#f5f2eb] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl shrink-0 relative overflow-hidden">
                <div className="relative z-10">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#a69e8b] block mb-2">
                    START A PROJECT
                  </span>
                  <h4 className="font-serif italic text-2xl sm:text-3xl text-white leading-tight">
                    Ready for your next cut?
                  </h4>
                  <p className="font-sans text-xs text-[#c5bca7] mt-3 leading-relaxed">
                    Available for commercial edits, AI short-form reels, and graphic editorial posters.
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
              <span>01: COMMERCIAL AD</span>
              <span>•</span>
              <span>02: AI REELS (4 FILMS)</span>
              <span>•</span>
              <span>03: POSTER ART (2 PRINTS)</span>
              <span>•</span>
              <span>04: COMMISSION</span>
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
              <div className="relative aspect-[16/9] bg-black overflow-hidden flex items-center justify-center">
                {selectedProject.video ? (
                  <video
                    src={selectedProject.video}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-contain"
                  />
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1c1b18]/80 hover:bg-[#1c1b18] text-white flex items-center justify-center transition-colors cursor-pointer z-30"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-4 bg-[#1c1b18]/85 text-white font-mono text-xs px-3 py-1 rounded-full z-20">
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
