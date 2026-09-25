import React, { useRef, useState } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
import { Sparkles, ArrowUpRight, X } from 'lucide-react';

interface GalleryPlaneItem {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  client: string;
  description: string;
}

const galleryPlanes: GalleryPlaneItem[] = [
  {
    id: 1,
    title: "Chromatic Euphoria",
    category: "Post-Production",
    year: "2026",
    client: "Vogue Visuals",
    image: "/portfolio/preview_section_0.jpg",
    description: "Vibrant color blooming & dynamic contrast grading for international fashion editorial."
  },
  {
    id: 2,
    title: "Artisan Dimension",
    category: "3D Spatial Design",
    year: "2025",
    client: "Studio Kanso",
    image: "/portfolio/motion_3d_bakery.jpg",
    description: "Photorealistic 3D environment rendering with physical material dispersion and volumetric light."
  },
  {
    id: 3,
    title: "Kinetic Future",
    category: "Motion Graphics",
    year: "2026",
    client: "CyberPulse Media",
    image: "/portfolio/banner_3d_motion.jpg",
    description: "High-octane typographic motion and generative particle flows for futuristic product release."
  },
  {
    id: 4,
    title: "Botanical Ephemera",
    category: "Print & Posters",
    year: "2025",
    client: "Atelier Flora",
    image: "/portfolio/posters_gallery.jpg",
    description: "Hand-crafted typography combined with pressed floral scans and textured risograph paper."
  },
  {
    id: 5,
    title: "Fusun Aesthetics",
    category: "Brand Identity",
    year: "2025",
    client: "Fusun Skincare",
    image: "/portfolio/fusun_mockups.jpg",
    description: "Comprehensive visual identity and minimalist packaging system for organic beauty label."
  },
  {
    id: 6,
    title: "Elysian Bloom",
    category: "Color Grading",
    year: "2026",
    client: "Aether Records",
    image: "/portfolio/preview_section_2.jpg",
    description: "Delicate pastel hues and high-dynamic-range film emulation for music video narrative."
  },
  {
    id: 7,
    title: "Neo Character",
    category: "2D Animation",
    year: "2025",
    client: "Mascot Collective",
    image: "/portfolio/motion_2d_mascot.jpg",
    description: "Expressive frame-by-frame character animation with fluid hand-drawn line textures."
  },
  {
    id: 8,
    title: "Dayknights Noir",
    category: "Art Direction",
    year: "2025",
    client: "Midnight Studio",
    image: "/portfolio/dayknights_mockups.jpg",
    description: "Cinematic noir editorial concept exploring shadows, monolithic structures, and film grain."
  },
  {
    id: 9,
    title: "Vivid Nocturne",
    category: "Video Editing",
    year: "2026",
    client: "Pulse Synthetics",
    image: "/portfolio/preview_section_6.jpg",
    description: "Fast-paced rhythm montage synchronizing rapid jump cuts with analog synthesizer score."
  },
  {
    id: 10,
    title: "Buena Vista",
    category: "Commercial Film",
    year: "2025",
    client: "Solara Living",
    image: "/portfolio/social_buenavista.jpg",
    description: "Lifestyle brand showcase featuring natural sunlight capture and golden hour palettes."
  },
  {
    id: 11,
    title: "Spirit Revengers",
    category: "Film Direction",
    year: "2026",
    client: "Ghostlight Films",
    image: "/portfolio/spirit_revengers_header.jpg",
    description: "Dark fantasy action sequence with bespoke title sequences and stylized color grading."
  },
  {
    id: 12,
    title: "Solaris Drift",
    category: "Visual Effects",
    year: "2025",
    client: "Orbit Sci-Fi Lab",
    image: "/portfolio/part2_section_2.jpg",
    description: "Cosmic visual effects blending macro liquid photography with celestial 3D simulations."
  }
];

// Single 3D Plane Card
// Botanical Editorial White Theme + Silky Smooth 120fps GPU Motion + 100% Hoverable & Clickable across all viewport cards
const DiagonalPlaneCard: React.FC<{
  item: GalleryPlaneItem;
  index: number;
  total: number;
  smoothProgress: any;
  springVelocity: any;
  onSelect: (item: GalleryPlaneItem) => void;
}> = ({ item, index, total, smoothProgress, springVelocity, onSelect }) => {
  // Position along the continuous trajectory
  // Normalized offset based on scroll progress and item index
  const planeOffset = useTransform(smoothProgress, (p: number) => {
    const step = 1 / (total - 1);
    const itemCenter = index * step;
    return (p - itemCenter) * (total * 0.9);
  });

  // 1. REDUCED GAP: Tighter, elegant diagonal cascade (220px X, -130px Y)
  const x = useTransform(planeOffset, (offset: number) => {
    return offset * 220; // Tighter pitch for continuous rhythmic flow
  });

  const y = useTransform([planeOffset, springVelocity], ([offset, vel]: [number, number]) => {
    const diagonalY = -offset * 130; // Diagonal ascent: bottom to top
    const wave = Math.sin((offset * 2.2) + (index * 0.4)) * Math.min(100, Math.max(-100, vel * 60));
    return diagonalY + wave;
  });

  // 2. DEPTH: Gentle falloff without burying outer cards so EVERY card remains easily hovered
  const z = useTransform([planeOffset, springVelocity], ([offset, vel]: [number, number]) => {
    const dist = Math.abs(offset);
    const baseDepth = -dist * 18; // Very gentle depth so cards don't get trapped behind
    const waveDepth = Math.cos((offset * 2.2) + (index * 0.4)) * Math.min(60, Math.max(-60, vel * 40));
    return baseDepth + waveDepth;
  });

  // 3. DRAMATIC 3D PERSPECTIVE TILT (Original isometric angles)
  // Pitch (rotateX)
  const rotateX = useTransform(springVelocity, (vel: number) => {
    const tilt = Math.min(16, Math.max(-16, vel * 10));
    return -18 + tilt;
  });

  // Yaw (rotateY)
  const rotateY = useTransform([planeOffset, springVelocity], ([offset, vel]: [number, number]) => {
    const baseRot = -28 + (offset * 2.2);
    const waveRot = Math.sin(offset * 1.6) * Math.min(12, Math.max(-12, vel * 7));
    return baseRot + waveRot;
  });

  // Roll (rotateZ)
  const rotateZ = useTransform([planeOffset, springVelocity], ([offset, vel]: [number, number]) => {
    const basePitch = 12 + (offset * 0.6);
    const wavePitch = Math.cos(offset) * Math.min(6, Math.max(-6, vel * 4));
    return basePitch + wavePitch;
  });

  // 4. OPACITY (Soft fade at outer periphery)
  const opacity = useTransform(planeOffset, (offset: number) => {
    const dist = Math.abs(offset);
    if (dist > 4.2) return 0;
    if (dist > 3.2) return Math.max(0, 1 - (dist - 3.2) / 1.0);
    return 1;
  });

  // 5. STACKING ORDER & HOVER ELEVATION
  // Cards closer to center naturally sit higher, but ANY hovered card leaps to zIndex 999 via whileHover
  const zIndex = useTransform(planeOffset, (offset: number) => {
    const dist = Math.abs(offset);
    if (dist > 3.8) return 0;
    return Math.max(1, Math.round(80 - dist * 10));
  });

  const pointerEvents = useTransform(planeOffset, (offset: number) => {
    return Math.abs(offset) < 3.8 ? 'auto' : 'none';
  });

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`Open project: ${item.title}`}
      className="absolute top-1/2 left-1/2 w-[240px] sm:w-[280px] md:w-[305px] aspect-[3/4] cursor-pointer select-none origin-center rounded-3xl"
      style={{
        x,
        y,
        z,
        rotateX,
        rotateY,
        rotateZ,
        opacity,
        zIndex,
        pointerEvents,
        marginLeft: '-150px',
        marginTop: '-195px',
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSelect(item);
      }}
      whileHover={{
        scale: 1.06,
        zIndex: 999,
        transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] }
      }}
      whileTap={{ scale: 0.97 }}
    >
      {/* 3D Plane Card Shell - Botanical Editorial White Theme */}
      <div 
        className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-[0_20px_45px_-10px_rgba(28,25,23,0.18)] border border-stone-200/90 transition-all duration-300 hover:border-rose-500 hover:shadow-[0_30px_60px_-10px_rgba(225,29,72,0.3)] group cursor-pointer"
      >
        
        {/* Artwork Image */}
        <img
          src={item.image}
          alt={item.title}
          draggable={false}
          className="w-full h-full object-cover filter contrast-[104%] transition-transform duration-500 ease-out group-hover:scale-106 pointer-events-none"
        />

        {/* Ambient Dark Bottom Vignette so Title & Category are Always Ultra-Readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent pointer-events-none" />

        {/* Top Header Row: Index & Year */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-white pointer-events-none z-10">
          <span className="font-mono text-[11px] sm:text-xs font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-stone-900/80 backdrop-blur-md border border-white/20 text-amber-300 shadow-sm">
            {String(item.id).padStart(2, '0')}
          </span>
          <span className="font-sans text-[10px] sm:text-[11px] font-medium tracking-widest uppercase bg-stone-900/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 text-white/90">
            {item.year}
          </span>
        </div>

        {/* Bottom Metadata & Title */}
        <div className="absolute bottom-3.5 sm:bottom-4 left-3.5 sm:left-4 right-3.5 sm:right-4 z-10 pointer-events-none">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="inline-block text-[10px] font-sans font-bold tracking-widest uppercase text-amber-300">
              {item.category}
            </span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-[10px] font-sans text-white/80 tracking-wide truncate">
              {item.client}
            </span>
          </div>

          <h3 className="text-base sm:text-lg md:text-xl font-display font-black text-white tracking-tight leading-snug drop-shadow-md">
            {item.title}
          </h3>

          {/* Micro-Interaction CTA */}
          <div className="flex items-center gap-1 text-[11px] text-rose-300 font-sans font-semibold mt-1.5 opacity-90 group-hover:text-rose-200 transition-colors">
            <span>Click to inspect</span>
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* 3D Border Glow */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/20 group-hover:border-rose-400/50 pointer-events-none transition-colors duration-300" />
      </div>
    </motion.div>
  );
};

export const VelocityGallerySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<GalleryPlaneItem | null>(null);

  // Track scroll progress across a comfortable runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Calculate velocity of scroll
  const scrollVelocity = useVelocity(scrollYProgress);

  // Spring physics for responsive, liquid wave inertia
  const springVelocity = useSpring(scrollVelocity, {
    damping: 24,
    stiffness: 140,
    restDelta: 0.001,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 26,
    stiffness: 130,
    restDelta: 0.001,
  });

  return (
    <section 
      id="velocity-gallery"
      ref={containerRef}
      className="relative h-[160vh] bg-[#faf8f5] text-[#1c1917] overflow-clip"
    >
      {/* Sticky 3D Viewport Screen */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center overflow-hidden py-6 sm:py-8 px-4 sm:px-8">
        
        {/* Botanical Editorial Ambient Glow & Paper Texture */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/6 left-1/5 w-[550px] h-[550px] rounded-full bg-amber-200/35 blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/5 w-[550px] h-[550px] rounded-full bg-rose-200/30 blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#1c19170e_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f5] via-transparent to-[#faf8f5] pointer-events-none" />
        </div>

        {/* Section Header */}
        <div className="relative z-30 text-center max-w-3xl pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900/5 border border-stone-300 text-stone-800 backdrop-blur-md mb-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase text-stone-800">
              03 / 3D Velocity Carousel
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-stone-900 uppercase">
            Planes in <span className="font-script italic font-normal text-rose-600 capitalize">Velocity</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1.5 max-w-lg mx-auto">
            Horizontal-diagonal 3D flow with velocity wave dynamics. Every card on screen is instantly hoverable & clickable to inspect.
          </p>
        </div>

        {/* ============================================================ */}
        {/* 3D CAROUSEL PERSPECTIVE VIEWPORT                             */}
        {/* ============================================================ */}
        <div 
          className="relative w-full flex-1 flex items-center justify-center pointer-events-auto my-auto"
          style={{
            perspective: '1300px',
            perspectiveOrigin: '50% 50%',
          }}
        >
          {/* Individual 2.5D/3D card layer without shared preserve-3d so CSS zIndex & hover work 100% on every card */}
          <div 
            className="relative w-full h-full flex items-center justify-center pointer-events-auto"
          >
            {galleryPlanes.map((item, idx) => (
              <DiagonalPlaneCard
                key={item.id}
                item={item}
                index={idx}
                total={galleryPlanes.length}
                smoothProgress={smoothProgress}
                springVelocity={springVelocity}
                onSelect={(selected) => setSelectedItem(selected)}
              />
            ))}
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* LIGHTBOX MODAL (Click any plane to inspect full artwork)     */}
      {/* ============================================================ */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xl animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-[#faf8f5] border border-stone-300 rounded-3xl overflow-hidden shadow-[0_40px_90px_rgba(28,25,23,0.35)] flex flex-col md:flex-row transform transition-all duration-300 text-stone-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/90 text-stone-800 hover:text-stone-950 hover:bg-white transition-all border border-stone-300 cursor-pointer shadow-md"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image View */}
            <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto relative overflow-hidden bg-stone-900">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Information - White Theme */}
            <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-b from-[#faf8f5] to-[#f4f0e8]">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-amber-500/15 text-amber-800 border border-amber-500/30">
                    {selectedItem.category}
                  </span>
                  <span className="text-xs text-stone-500 font-mono">
                    {selectedItem.year}
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="text-xs text-stone-600 font-sans">
                    {selectedItem.client}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-black text-stone-900 tracking-tight mt-1">
                  {selectedItem.title}
                </h3>

                <p className="text-sm sm:text-base text-stone-700 font-sans leading-relaxed mt-4">
                  {selectedItem.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-stone-300/80 text-xs">
                  <div>
                    <span className="text-stone-500 block font-mono text-[10px] uppercase">Format</span>
                    <span className="text-stone-900 font-medium">4K ProRes Master</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block font-mono text-[10px] uppercase">Role</span>
                    <span className="text-stone-900 font-medium">Lead Video Editor</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-300/80 mt-8 flex items-center justify-between">
                <span className="text-xs text-stone-500 font-mono">
                  REF / #VARUN-0{selectedItem.id}
                </span>
                <a
                  href="#contact"
                  onClick={() => setSelectedItem(null)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer"
                >
                  <span>Inquire About Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
