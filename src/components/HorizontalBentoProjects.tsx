import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Play, Film, ExternalLink } from 'lucide-react';

const GOOGLE_DRIVE_URL = 'https://drive.google.com/drive/folders/1Iw96jLL406pFcSOZYTMkzANU4WYX663P';

export interface BentoProject {
  id: string;
  title: string;
  subtitle: string;
  category: 'video' | 'social' | 'print';
  categoryLabel: string;
  year: string;
  image: string;
  aspect?: string;
  client?: string;
  role: string;
  deliverables: string[];
  description: string;
  badge?: string;
  stat?: { label: string; value: string };
  driveUrl: string;
}

export const HorizontalBentoProjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-driven horizontal translation for Desktop
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

  // Map 0 -> 1 scroll progress to horizontal translation percentage on desktop
  const x = useTransform(smoothProgress, [0, 1], ['0%', '-72%']);
  const progressPercent = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  // Real projects pointing directly to Google Drive
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
      image: '/videos/posters/ads_poster.jpg',
      badge: 'FEATURED 16:9',
      stat: { label: 'VIEW RETENTION', value: '98.4%' },
      driveUrl: GOOGLE_DRIVE_URL,
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
      image: '/videos/posters/calorie_buddy_poster.jpg',
      badge: '9:16 REEL',
      stat: { label: 'COMPLETION RATE', value: '96.2%' },
      driveUrl: GOOGLE_DRIVE_URL,
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
      image: '/videos/posters/coco_panda_poster.jpg',
      badge: '9:16 REEL',
      stat: { label: 'AUDIENCE REACH', value: '45M+' },
      driveUrl: GOOGLE_DRIVE_URL,
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
      image: '/videos/posters/date_night_poster.jpg',
      badge: '9:16 REEL',
      stat: { label: 'VIEW VELOCITY', value: '12M+ Views' },
      driveUrl: GOOGLE_DRIVE_URL,
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
      image: '/videos/posters/lawyer_buddy_poster.jpg',
      badge: '1:1 SQUARE',
      stat: { label: 'CTR CONVERSION', value: '8.4%' },
      driveUrl: GOOGLE_DRIVE_URL,
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
      driveUrl: GOOGLE_DRIVE_URL,
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
      driveUrl: GOOGLE_DRIVE_URL,
      description: 'Editorial graphic poster investigating tactile paper textures, contrast balance, and modern asymmetric Swiss typography.',
    },
  ];

  return (
    <section id="works" className="relative bg-[#f5f2eb] border-t border-[#dfd8c7]">
      
      {/* =================================================================== */}
      {/* 1. DESKTOP ONLY: PINNED HORIZONTAL BENTO TIMELINE (md: and up)       */}
      {/* =================================================================== */}
      <div 
        ref={containerRef}
        className="hidden md:block relative h-[320vh] lg:h-[360vh]"
      >
        {/* Pinned Sticky Viewport Window */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 px-8">
          
          {/* Header & HUD Status Bar */}
          <div className="max-w-7xl w-full mx-auto flex items-end justify-between gap-4 pb-4 border-b border-[#dfd8c7] shrink-0">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#706c62] font-semibold">
                  INDEX 02 • SELECTED PRODUCTIONS & REELS
                </span>
              </div>
              <h2 className="font-serif italic font-normal text-4xl lg:text-5xl text-[#1c1b18] tracking-tight">
                Curated Video & Poster Portfolio
              </h2>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-[#706c62]">
              <div className="flex items-center gap-2 bg-[#ede8dd] px-3.5 py-1.5 rounded-full border border-[#dfd8c7]">
                <span>NAVIGATE:</span>
                <strong className="text-[#1c1b18]">SCROLL DOWN TO TRAVERSE</strong>
                <span className="text-red-500 font-bold">⇄</span>
              </div>
              <a 
                href={GOOGLE_DRIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1c1b18] hover:bg-[#383732] text-[#f5f2eb] px-3.5 py-1.5 rounded-full border border-[#1c1b18] font-bold transition-all shadow-sm group"
              >
                <span>OPEN GOOGLE DRIVE ARCHIVE</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Horizontal Bento Scroll Canvas */}
          <div className="relative flex-1 w-full flex items-center overflow-hidden my-auto py-2">
            
            <motion.div 
              style={{ x }}
              className="flex items-stretch gap-6 lg:gap-8 will-change-transform pr-16 lg:pr-32"
            >
              
              {/* CLUSTER 1: COMMERCIAL ADVERTISEMENT MASTER (16:9) */}
              <div className="flex gap-6 shrink-0 w-[640px] lg:w-[700px] h-[54vh] lg:h-[58vh] min-h-[400px] max-h-[530px]">
                <a 
                  href={projects[0].driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#ede8dd] rounded-3xl border border-[#dfd8c7] p-5 flex flex-col justify-between shadow-paper-sm hover:shadow-paper hover:border-stone-400 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                >
                  {/* 16:9 Thumbnail Poster Frame */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#c5bca7] bg-black">
                    <img
                      src={projects[0].image}
                      alt={projects[0].title}
                      loading="lazy"
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

                    {/* Centered Play & Drive Overlay Button */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/35 transition-colors z-10">
                      <div className="px-4 py-2 rounded-full bg-[#f5f2eb]/95 backdrop-blur-xs text-[#1c1b18] flex items-center gap-2 shadow-xl group-hover:scale-110 transition-transform border border-stone-300">
                        <Play className="w-4 h-4 fill-current text-rose-600" />
                        <span className="font-mono text-xs font-bold tracking-wider">OPEN IN DRIVE</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-stone-600" />
                      </div>
                    </div>

                    {/* Bottom Status Bar */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[9px] font-mono text-white/95 bg-black/75 backdrop-blur-xs px-3 py-1.5 rounded-xl z-10 border border-white/10">
                      <span className="flex items-center gap-1.5 text-amber-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>GOOGLE DRIVE 4K MASTER</span>
                      </span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <span>WATCH 4K CUT</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  {/* Card Text & Tags */}
                  <div className="pt-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif italic font-normal text-2xl text-[#1c1b18] group-hover:text-rose-700 transition-colors leading-tight">
                        {projects[0].title}
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-[#1c1b18] text-[#f5f2eb] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                        <ArrowUpRight className="w-4 h-4" />
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
                </a>
              </div>

              {/* CLUSTER 2: AI REELS COLLECTION (4 REELS) */}
              <div className="flex gap-5 shrink-0 h-[54vh] lg:h-[58vh] min-h-[400px] max-h-[530px]">
                
                {/* Reel 1: Calorie Buddy */}
                <a 
                  href={projects[1].driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[210px] lg:w-[235px] bg-[#ede8dd] rounded-3xl border border-[#dfd8c7] p-4 flex flex-col justify-between shadow-paper-sm hover:shadow-paper hover:border-stone-400 transition-all duration-300 cursor-pointer group relative overflow-hidden shrink-0"
                >
                  <div className="relative aspect-[9/14] w-full rounded-2xl overflow-hidden border-2 border-[#1c1b18] bg-black shadow-inner">
                    <img
                      src={projects[1].image}
                      alt={projects[1].title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full border border-white/20 flex items-center justify-center z-10">
                      <span className="w-1 h-1 rounded-full bg-blue-400 mr-1" />
                      <span className="text-[7px] font-mono text-white/90">9:16 REEL</span>
                    </div>

                    {/* Centered Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/45 transition-colors z-10">
                      <div className="w-11 h-11 rounded-full bg-[#f5f2eb]/95 text-[#1c1b18] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 ml-0.5 fill-current text-rose-600" />
                      </div>
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 bg-black/85 backdrop-blur-xs p-1.5 rounded-lg border border-white/10 text-white font-mono text-[8px] z-10">
                      <div className="flex justify-between items-center text-emerald-400 font-bold">
                        <span>CALORIE BUDDY</span>
                        <span className="text-white/80 text-[7px] flex items-center gap-0.5">DRIVE ↗</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#706c62]">
                      <span className="text-amber-900 font-bold">{projects[1].categoryLabel}</span>
                      <span>2026</span>
                    </div>
                    <h4 className="font-serif italic text-sm lg:text-base text-[#1c1b18] mt-0.5 truncate group-hover:text-rose-700 transition-colors">
                      {projects[1].title}
                    </h4>
                  </div>
                </a>

                {/* Reel 2: Coco Panda */}
                <a 
                  href={projects[2].driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[210px] lg:w-[235px] bg-[#ede8dd] rounded-3xl border border-[#dfd8c7] p-4 flex flex-col justify-between shadow-paper-sm hover:shadow-paper hover:border-stone-400 transition-all duration-300 cursor-pointer group relative overflow-hidden shrink-0"
                >
                  <div className="relative aspect-[9/14] w-full rounded-2xl overflow-hidden border-2 border-[#1c1b18] bg-black shadow-inner">
                    <img
                      src={projects[2].image}
                      alt={projects[2].title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full border border-white/20 flex items-center justify-center z-10">
                      <span className="w-1 h-1 rounded-full bg-blue-400 mr-1" />
                      <span className="text-[7px] font-mono text-white/90">9:16 REEL</span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/45 transition-colors z-10">
                      <div className="w-11 h-11 rounded-full bg-[#f5f2eb]/95 text-[#1c1b18] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 ml-0.5 fill-current text-rose-600" />
                      </div>
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 bg-black/85 backdrop-blur-xs p-1.5 rounded-lg border border-white/10 text-white font-mono text-[8px] z-10">
                      <div className="flex justify-between items-center text-emerald-400 font-bold">
                        <span>COCO PANDA</span>
                        <span className="text-white/80 text-[7px] flex items-center gap-0.5">DRIVE ↗</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#706c62]">
                      <span className="text-amber-900 font-bold">{projects[2].categoryLabel}</span>
                      <span>2026</span>
                    </div>
                    <h4 className="font-serif italic text-sm lg:text-base text-[#1c1b18] mt-0.5 truncate group-hover:text-rose-700 transition-colors">
                      {projects[2].title}
                    </h4>
                  </div>
                </a>

                {/* Reel 3: Date Night */}
                <a 
                  href={projects[3].driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[210px] lg:w-[235px] bg-[#ede8dd] rounded-3xl border border-[#dfd8c7] p-4 flex flex-col justify-between shadow-paper-sm hover:shadow-paper hover:border-stone-400 transition-all duration-300 cursor-pointer group relative overflow-hidden shrink-0"
                >
                  <div className="relative aspect-[9/14] w-full rounded-2xl overflow-hidden border-2 border-[#1c1b18] bg-black shadow-inner">
                    <img
                      src={projects[3].image}
                      alt={projects[3].title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full border border-white/20 flex items-center justify-center z-10">
                      <span className="w-1 h-1 rounded-full bg-blue-400 mr-1" />
                      <span className="text-[7px] font-mono text-white/90">9:16 REEL</span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/45 transition-colors z-10">
                      <div className="w-11 h-11 rounded-full bg-[#f5f2eb]/95 text-[#1c1b18] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 ml-0.5 fill-current text-rose-600" />
                      </div>
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 bg-black/85 backdrop-blur-xs p-1.5 rounded-lg border border-white/10 text-white font-mono text-[8px] z-10">
                      <div className="flex justify-between items-center text-emerald-400 font-bold">
                        <span>DATE NIGHT</span>
                        <span className="text-white/80 text-[7px] flex items-center gap-0.5">DRIVE ↗</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#706c62]">
                      <span className="text-amber-900 font-bold">{projects[3].categoryLabel}</span>
                      <span>2026</span>
                    </div>
                    <h4 className="font-serif italic text-sm lg:text-base text-[#1c1b18] mt-0.5 truncate group-hover:text-rose-700 transition-colors">
                      {projects[3].title}
                    </h4>
                  </div>
                </a>

                {/* Reel 4: Lawyer Buddy (1:1 Square Card) */}
                <a 
                  href={projects[4].driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[220px] lg:w-[245px] bg-[#ede8dd] rounded-3xl border border-[#dfd8c7] p-4 flex flex-col justify-between shadow-paper-sm hover:shadow-paper hover:border-stone-400 transition-all duration-300 cursor-pointer group relative overflow-hidden shrink-0"
                >
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden border-2 border-[#1c1b18] bg-black shadow-inner">
                    <img
                      src={projects[4].image}
                      alt={projects[4].title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 bg-[#1c1b18]/85 text-white text-[8px] font-mono px-2 py-0.5 rounded-full z-10 border border-white/20">
                      1:1 FORMAT
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/45 transition-colors z-10">
                      <div className="w-11 h-11 rounded-full bg-[#f5f2eb]/95 text-[#1c1b18] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 ml-0.5 fill-current text-rose-600" />
                      </div>
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 bg-black/85 backdrop-blur-xs p-1.5 rounded-lg border border-white/10 text-white font-mono text-[8px] z-10">
                      <div className="flex justify-between items-center text-emerald-400 font-bold">
                        <span>LAWYER BUDDY</span>
                        <span className="text-white/80 text-[7px] flex items-center gap-0.5">DRIVE ↗</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#706c62]">
                      <span className="text-amber-900 font-bold">{projects[4].categoryLabel}</span>
                      <span>2026</span>
                    </div>
                    <h4 className="font-serif italic text-sm lg:text-base text-[#1c1b18] mt-0.5 truncate group-hover:text-rose-700 transition-colors">
                      {projects[4].title}
                    </h4>
                  </div>
                </a>

              </div>

              {/* CLUSTER 3: EDITORIAL POSTERS ARCHIVE (2 PRINTS) */}
              <div className="flex gap-5 shrink-0 h-[54vh] lg:h-[58vh] min-h-[400px] max-h-[530px]">
                
                {/* Poster 1: Korda Helmet */}
                <a 
                  href={projects[5].driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[210px] lg:w-[240px] bg-[#ede8dd] rounded-3xl border border-[#dfd8c7] p-4 flex flex-col justify-between shadow-paper-sm hover:shadow-paper hover:border-stone-400 transition-all duration-300 cursor-pointer group relative overflow-hidden shrink-0"
                >
                  <div className="relative aspect-[9/13] w-full rounded-2xl overflow-hidden border border-[#c5bca7] bg-white">
                    <img
                      src={projects[5].image}
                      alt={projects[5].title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106 filter contrast-[105%]"
                    />
                    <div className="absolute top-2 left-2 bg-[#1c1b18] text-[#f5f2eb] text-[8px] font-mono px-2 py-0.5 rounded">
                      KORDA HELMET
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/75 text-white text-[8px] font-mono px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                      <span>DRIVE</span>
                      <ArrowUpRight className="w-2.5 h-2.5" />
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#706c62]">
                      <span>POSTER SERIES</span>
                      <span>2026</span>
                    </div>
                    <h4 className="font-serif italic text-sm lg:text-base text-[#1c1b18] mt-0.5 truncate group-hover:text-rose-700 transition-colors">
                      {projects[5].title}
                    </h4>
                  </div>
                </a>

                {/* Poster 2: Creative Graphic Poster */}
                <a 
                  href={projects[6].driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[210px] lg:w-[240px] bg-[#ede8dd] rounded-3xl border border-[#dfd8c7] p-4 flex flex-col justify-between shadow-paper-sm hover:shadow-paper hover:border-stone-400 transition-all duration-300 cursor-pointer group relative overflow-hidden shrink-0"
                >
                  <div className="relative aspect-[9/13] w-full rounded-2xl overflow-hidden border border-[#c5bca7] bg-white">
                    <img
                      src={projects[6].image}
                      alt={projects[6].title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106 filter contrast-[105%]"
                    />
                    <div className="absolute top-2 left-2 bg-[#1c1b18] text-[#f5f2eb] text-[8px] font-mono px-2 py-0.5 rounded">
                      GRAPHIC POSTER
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/75 text-white text-[8px] font-mono px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                      <span>DRIVE</span>
                      <ArrowUpRight className="w-2.5 h-2.5" />
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#706c62]">
                      <span>EDITORIAL PRINT</span>
                      <span>2026</span>
                    </div>
                    <h4 className="font-serif italic text-sm lg:text-base text-[#1c1b18] mt-0.5 truncate group-hover:text-rose-700 transition-colors">
                      {projects[6].title}
                    </h4>
                  </div>
                </a>

              </div>

              {/* CLUSTER 4: DIRECT INQUIRY & COMMISSION CTA */}
              <div className="flex gap-6 shrink-0 w-[290px] lg:w-[320px] h-[54vh] lg:h-[58vh] min-h-[400px] max-h-[530px]">
                <div className="flex-1 bg-[#1c1b18] text-[#f5f2eb] rounded-3xl p-7 flex flex-col justify-between shadow-xl shrink-0 relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#a69e8b] block mb-2">
                      START A PROJECT
                    </span>
                    <h4 className="font-serif italic text-2xl lg:text-3xl text-white leading-tight">
                      Ready for your next cut?
                    </h4>
                    <p className="font-sans text-xs text-[#c5bca7] mt-3 leading-relaxed">
                      Available for commercial cuts, viral AI reels, and high-impact poster visual direction.
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

                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl from-amber-500/20 to-red-500/20 rounded-full blur-2xl pointer-events-none" />
                </div>
              </div>

            </motion.div>

          </div>

          {/* Bottom Timeline Ruler & Scrubber */}
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

            <div className="relative h-2 bg-[#dfd8c7] rounded-full overflow-hidden">
              <motion.div 
                className="absolute top-0 bottom-0 left-0 bg-[#1c1b18] rounded-full"
                style={{ width: progressPercent }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. MOBILE ONLY: CLEAN NATURAL VERTICAL FEED (NO HORIZONTAL SCROLL)   */}
      {/* =================================================================== */}
      <div className="block md:hidden py-10 px-4 sm:px-6">
        
        {/* Mobile Section Header */}
        <div className="mb-7 pb-4 border-b border-[#dfd8c7]">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#706c62] font-semibold">
              INDEX 02 • SELECTED PRODUCTIONS & REELS
            </span>
          </div>
          <h2 className="font-serif italic font-normal text-3xl text-[#1c1b18] tracking-tight">
            Curated Video & Poster Portfolio
          </h2>
          <p className="font-sans text-xs text-[#706c62] mt-1.5 leading-relaxed">
            Click any thumbnail card to open and watch the 4K cut directly in Google Drive.
          </p>

          <div className="mt-3.5">
            <a
              href={GOOGLE_DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c1b18] text-[#f5f2eb] text-[11px] font-mono font-semibold"
            >
              <span>Browse All in Google Drive</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* --- Card 1: Featured 16:9 Commercial Ad --- */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#706c62] font-bold">
              01 / COMMERCIAL FILM
            </span>
            <span className="text-[10px] font-mono text-red-600 font-bold bg-red-100 px-2 py-0.5 rounded-full">
              FEATURED
            </span>
          </div>

          <a
            href={projects[0].driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-[#ede8dd] rounded-2xl border border-[#dfd8c7] p-3.5 shadow-sm active:scale-[0.99] transition-transform"
          >
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#c5bca7] bg-black">
              <img
                src={projects[0].image}
                alt={projects[0].title}
                loading="lazy"
                className="w-full h-full object-cover filter contrast-[104%]"
              />

              {/* Play Badge */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="px-3.5 py-1.5 rounded-full bg-white/95 text-[#1c1b18] flex items-center gap-1.5 shadow-md">
                  <Play className="w-3.5 h-3.5 fill-current text-rose-600" />
                  <span className="font-mono text-[11px] font-bold">Open in Drive</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>

              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[8px] font-mono text-white/90 bg-black/75 px-2 py-1 rounded-md">
                <span className="text-amber-300">4K PRORES MASTER</span>
                <span className="text-emerald-400">WATCH ON DRIVE ↗</span>
              </div>
            </div>

            <div className="pt-2.5">
              <h3 className="font-serif italic font-normal text-lg text-[#1c1b18] leading-snug">
                {projects[0].title}
              </h3>
              <p className="font-sans text-[11px] text-[#706c62] mt-1 leading-snug">
                {projects[0].subtitle}
              </p>
              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                {projects[0].deliverables.map((d) => (
                  <span key={d} className="px-2 py-0.5 rounded bg-[#f5f2eb] text-[9px] font-mono text-[#1c1b18] border border-[#dfd8c7]">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </a>
        </div>

        {/* --- Card 2: AI Short-Form Reels (2-Column Vertical Grid) --- */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#706c62] font-bold">
              02 / AI SHORT-FORM REELS (4 FILMS)
            </span>
            <span className="text-[10px] font-mono text-[#706c62]">
              9:16 & 1:1
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[projects[1], projects[2], projects[3], projects[4]].map((item) => (
              <a
                key={item.id}
                href={item.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#ede8dd] rounded-2xl border border-[#dfd8c7] p-2.5 flex flex-col justify-between shadow-xs active:scale-[0.98] transition-transform"
              >
                <div className={`relative ${item.badge?.includes('1:1') ? 'aspect-square' : 'aspect-[9/14]'} w-full rounded-xl overflow-hidden border border-[#1c1b18] bg-black`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover filter contrast-[104%]"
                  />
                  
                  {/* Reel Badge */}
                  <div className="absolute top-1.5 left-1.5 bg-[#1c1b18]/85 text-white text-[7px] font-mono px-1.5 py-0.5 rounded">
                    {item.badge}
                  </div>

                  {/* Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-8 h-8 rounded-full bg-white/95 text-[#1c1b18] flex items-center justify-center shadow-md">
                      <Play className="w-3.5 h-3.5 ml-0.5 fill-current text-rose-600" />
                    </div>
                  </div>

                  <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-black/80 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-[7px] flex items-center justify-between">
                    <span>DRIVE</span>
                    <ArrowUpRight className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[9px] font-mono text-amber-900 font-bold block truncate">
                    {item.categoryLabel}
                  </span>
                  <h4 className="font-serif italic text-xs text-[#1c1b18] leading-tight line-clamp-2 mt-0.5">
                    {item.title}
                  </h4>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* --- Card 3: Editorial Posters (2-Column Vertical Grid) --- */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#706c62] font-bold">
              03 / EDITORIAL POSTERS (2 PRINTS)
            </span>
            <span className="text-[10px] font-mono text-[#706c62]">
              HIGH-RES
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[projects[5], projects[6]].map((item) => (
              <a
                key={item.id}
                href={item.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#ede8dd] rounded-2xl border border-[#dfd8c7] p-2.5 flex flex-col justify-between shadow-xs active:scale-[0.98] transition-transform"
              >
                <div className="relative aspect-[9/13] w-full rounded-xl overflow-hidden border border-[#c5bca7] bg-white">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover filter contrast-[105%]"
                  />
                  <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[7px] font-mono px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    <span>DRIVE</span>
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[9px] font-mono text-[#706c62] block truncate">
                    {item.categoryLabel}
                  </span>
                  <h4 className="font-serif italic text-xs text-[#1c1b18] leading-tight line-clamp-2 mt-0.5">
                    {item.title}
                  </h4>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* --- Card 4: Commission CTA Card --- */}
        <div className="bg-[#1c1b18] text-[#f5f2eb] rounded-2xl p-6 shadow-md relative overflow-hidden">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#a69e8b] block mb-1">
            START A PROJECT
          </span>
          <h4 className="font-serif italic text-2xl text-white leading-tight">
            Ready for your next cut?
          </h4>
          <p className="font-sans text-xs text-[#c5bca7] mt-2 leading-relaxed">
            Available for commercial edits, viral AI reels, and key art graphic posters.
          </p>
          <div className="mt-4 pt-4 border-t border-[#383732]">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#f5f2eb] text-[#1c1b18] text-xs font-mono font-bold transition-all shadow"
            >
              <span>Inquire Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

    </section>
  );
};
