import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, SkipBack, SkipForward, Sliders, Film, Layers, Monitor } from 'lucide-react';

interface Scene {
  id: number;
  title: string;
  category: string;
  duration: number; // in seconds
  startFrame: number;
  image: string;
  gradeBeforeImage?: string;
  description: string;
  colorGrade: string;
}

export const CinematicShowreel: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'timeline' | 'grade' | 'specs'>('timeline');
  const [splitPosition, setSplitPosition] = useState<number>(50); // Color grade split wipe (0 - 100%)
  const [currentSceneIdx, setCurrentSceneIdx] = useState<number>(0);

  const totalDuration = 24.0; // 24 seconds total showreel
  const fps = 24;

  const scenes: Scene[] = [
    {
      id: 1,
      title: '01. Commercial Rhythm & Kinetic Pacing',
      category: 'COMMERCIAL POST-PRODUCTION',
      duration: 6.0,
      startFrame: 0,
      image: '/portfolio/banner_3d_motion.jpg',
      description: 'High-energy cuts with sound-synced transition points, speed ramping, and micro-frame impact.',
      colorGrade: 'Kodak 2383 D65 Film Print Emulation',
    },
    {
      id: 2,
      title: '02. Dual-Node Color Grading Breakdown',
      category: 'COLOR SCIENCE (LOG vs REC.709)',
      duration: 6.0,
      startFrame: 144,
      image: '/portfolio/banner_2d_motion.jpg',
      description: 'Dynamic LUT conversion from flat S-Log3 to high-contrast rich cinematic saturation with split wipe.',
      colorGrade: 'Arri Alexa 709 Curve • Warm Skin Halation',
    },
    {
      id: 3,
      title: '03. Fast-Paced Broadcast & Studio Editing',
      category: 'NEWSROOM & BROADCAST TIMELINE',
      duration: 6.0,
      startFrame: 288,
      image: '/portfolio/motion_3d_bakery.jpg',
      description: 'Clean lower-thirds integration, audio normalization at -14 LUFS, and fluid narrative sequencing.',
      colorGrade: 'Broadcast Linear EBU R128 Compliant',
    },
    {
      id: 4,
      title: '04. Title Design & Motion Graphics Craft',
      category: 'MOTION DESIGN & EDITORIAL',
      duration: 6.0,
      startFrame: 432,
      image: '/portfolio/banner_posters.jpg',
      description: 'Swiss typographic overlays, custom film grain matte, and anamorphic aspect ratio bars (2.39:1).',
      colorGrade: 'Monochrome Halftone & Silver Halide Film',
    },
  ];

  // Helper to format timecode: HH:MM:SS:FF
  const formatTimecode = (timeInSeconds: number) => {
    const totalFrames = Math.floor(timeInSeconds * fps);
    const ff = String(totalFrames % fps).padStart(2, '0');
    const ss = String(Math.floor(timeInSeconds) % 60).padStart(2, '0');
    const mm = String(Math.floor(timeInSeconds / 60) % 60).padStart(2, '0');
    const hh = '01';
    return `${hh}:${mm}:${ss}:${ff}`;
  };

  // Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let loadedImages: { [key: string]: HTMLImageElement } = {};
    scenes.forEach(s => {
      const img = new Image();
      img.src = s.image;
      loadedImages[s.image] = img;
    });

    let startTime = performance.now() - (currentTime * 1000);

    const render = (now: number) => {
      if (isPlaying) {
        const elapsed = ((now - startTime) / 1000) % totalDuration;
        setCurrentTime(elapsed);
      }

      // Determine active scene
      const sceneIndex = Math.max(
        0,
        Math.min(
          Math.floor((currentTime / totalDuration) * scenes.length),
          scenes.length - 1
        )
      );
      setCurrentSceneIdx(sceneIndex);
      const activeScene = scenes[sceneIndex] || scenes[0];

      const w = canvas.width;
      const h = canvas.height;

      // Clear Canvas
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, w, h);

      // 1. Draw Active Scene Image
      const img = loadedImages[activeScene.image];
      if (img && img.complete) {
        // Draw image cover with subtle cinematic slow zoom (Ken Burns)
        const sceneProgress = (currentTime % activeScene.duration) / activeScene.duration;
        const zoom = 1 + sceneProgress * 0.05;

        ctx.save();
        ctx.translate(w / 2, h / 2);
        ctx.scale(zoom, zoom);
        ctx.drawImage(img, -w / 2, -h / 2, w, h);
        ctx.restore();
      } else {
        // Fallback gradient if loading
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, '#1c1b18');
        grad.addColorStop(1, '#0d0d0b');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // 2. Color Grading Split Wipe Effect (For Scene 2 or when activeTab === 'grade')
      if (sceneIndex === 1 || activeTab === 'grade') {
        const splitX = (splitPosition / 100) * w;

        // Left side: Flat S-Log3 desaturated / low contrast
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, splitX, h);
        ctx.clip();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.fillRect(0, 0, splitX, h);
        ctx.fillStyle = 'rgba(180, 180, 180, 0.25)';
        ctx.fillRect(0, 0, splitX, h);

        // Label on left
        ctx.fillStyle = '#ffffff';
        ctx.font = '600 11px monospace';
        ctx.fillText('RAW S-LOG3 (BEFORE)', 20, 36);
        ctx.restore();

        // Right side: Graded Rec.709 with film warmth
        ctx.save();
        ctx.beginPath();
        ctx.rect(splitX, 0, w - splitX, h);
        ctx.clip();
        ctx.fillStyle = 'rgba(255, 120, 40, 0.04)'; // warm highlight tint
        ctx.fillRect(splitX, 0, w - splitX, h);

        // Label on right
        ctx.fillStyle = '#ffffff';
        ctx.font = '600 11px monospace';
        ctx.fillText('REC.709 GRADED (AFTER)', splitX + 20, 36);
        ctx.restore();

        // Split Divider Needle
        ctx.strokeStyle = '#e63946';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(splitX, 0);
        ctx.lineTo(splitX, h);
        ctx.stroke();

        // Handle knob
        ctx.fillStyle = '#e63946';
        ctx.beginPath();
        ctx.arc(splitX, h / 2, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(splitX, h / 2, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Film Grain & Celluloid Stipple
      ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
      for (let i = 0; i < 400; i++) {
        const gx = Math.random() * w;
        const gy = Math.random() * h;
        ctx.fillRect(gx, gy, 1.2, 1.2);
      }

      // 4. Anamorphic 2.39:1 Letterbox Bars (Top & Bottom)
      const barHeight = h * 0.08;
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, w, barHeight);
      ctx.fillRect(0, h - barHeight, w, barHeight);

      // 5. On-Screen Display (OSD) Overlays
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = '600 11px monospace';
      // Top Left: Timecode + FPS
      ctx.fillText(`REC ● ${formatTimecode(currentTime)}`, 24, barHeight - 10);
      // Top Right: Specs
      ctx.textAlign = 'right';
      ctx.fillText('4K DCI 24FPS • PRORES 422 HQ', w - 24, barHeight - 10);
      ctx.textAlign = 'left';

      // Bottom Overlay: Scene Info
      ctx.font = '700 12px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(activeScene.title.toUpperCase(), 24, h - 14);

      // Bottom Right: Audio wave simulation indicator
      const waveBars = 16;
      for (let b = 0; b < waveBars; b++) {
        const bh = isPlaying ? Math.sin(currentTime * 8 + b) * 8 + 10 : 4;
        ctx.fillStyle = b > 12 ? '#e63946' : '#22c55e';
        ctx.fillRect(w - 24 - (waveBars - b) * 5, h - 14 - bh, 3, bh);
      }

      if (isPlaying) {
        animationFrameRef.current = requestAnimationFrame(render);
      }
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, currentTime, splitPosition, activeTab]);

  // Scrubbing handler
  const handleTimelineScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const newProgress = x / rect.width;
    setCurrentTime(newProgress * totalDuration);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    setCurrentTime(prev => Math.min(prev + 1 / fps, totalDuration));
  };

  const handleStepBack = () => {
    setIsPlaying(false);
    setCurrentTime(prev => Math.max(prev - 1 / fps, 0));
  };

  return (
    <section id="showreel" className="py-24 px-6 sm:px-8 bg-[#141412] text-[#e5e5e0] border-t border-[#262521] relative">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#2a2924] mb-10">
          <div className="scroll-reveal-left">
            <div className="font-mono text-xs text-red-500 uppercase tracking-widest font-semibold flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              INTERACTIVE NLE SUITE • SHOWREEL ENGINE
            </div>
            <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-[#f5f2eb] tracking-tight">
              Cinematic Showreel & Timeline Editor
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#9c9789] mt-2 max-w-xl">
              An interactive editing timeline simulation demonstrating real-time pacing, color grade nodes, audio levels, and cut points.
            </p>
          </div>

          {/* Suite Mode Tabs */}
          <div className="scroll-reveal-right flex items-center gap-1.5 bg-[#1c1b18] p-1 rounded-lg border border-[#2a2924]">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                activeTab === 'timeline' ? 'bg-[#f5f2eb] text-[#1c1b18] font-bold' : 'text-[#8c877b] hover:text-[#f5f2eb]'
              }`}
            >
              Timeline
            </button>
            <button
              onClick={() => setActiveTab('grade')}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                activeTab === 'grade' ? 'bg-[#f5f2eb] text-[#1c1b18] font-bold' : 'text-[#8c877b] hover:text-[#f5f2eb]'
              }`}
            >
              A/B Grade Wipe
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                activeTab === 'specs' ? 'bg-[#f5f2eb] text-[#1c1b18] font-bold' : 'text-[#8c877b] hover:text-[#f5f2eb]'
              }`}
            >
              Project Nodes
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* PROGRAM MONITOR (HTML5 CANVAS WITH REAL-TIME RENDERING)  */}
        {/* ======================================================== */}
        <div className="scroll-reveal bg-[#0d0d0b] rounded-2xl border-2 border-[#262521] overflow-hidden shadow-2xl relative">
          
          {/* Top Titlebar */}
          <div className="bg-[#181816] px-4 py-2.5 border-b border-[#262521] flex items-center justify-between text-xs font-mono text-[#8c877b]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span className="ml-2 font-bold text-[#e5e5e0]">PROGRAM: VARUN_P_MASTER_REEL_2026.mov</span>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <span className="text-emerald-400">FPS: 24.00 (Sync)</span>
              <span>RENDER: Metal 4K DCI</span>
            </div>
          </div>

          {/* Canvas Display */}
          <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden">
            <canvas
              ref={canvasRef}
              width={960}
              height={540}
              className="w-full h-full object-contain cursor-pointer"
              onClick={togglePlay}
            />

            {/* Floating Color Grade Split Slider (Visible when activeTab === 'grade') */}
            {activeTab === 'grade' && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-700 flex items-center gap-3 text-xs font-mono text-white">
                <span>LOG</span>
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={splitPosition}
                  onChange={(e) => setSplitPosition(Number(e.target.value))}
                  className="w-36 sm:w-48 accent-red-600 cursor-pointer"
                />
                <span>REC.709</span>
              </div>
            )}
          </div>

          {/* Transport Controls Bar */}
          <div className="bg-[#181816] px-4 py-3 border-t border-[#262521] flex items-center justify-between gap-4">
            
            {/* Playback Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleStepBack}
                title="Previous Frame (J)"
                className="w-8 h-8 rounded-lg bg-[#22221f] hover:bg-[#2c2b27] text-[#c5bca7] flex items-center justify-center transition-colors"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                title="Play/Pause (Space)"
                className="w-10 h-10 rounded-lg bg-red-600 hover:bg-red-500 text-white flex items-center justify-center transition-colors shadow-lg shadow-red-600/30"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>

              <button
                onClick={handleStepForward}
                title="Next Frame (L)"
                className="w-8 h-8 rounded-lg bg-[#22221f] hover:bg-[#2c2b27] text-[#c5bca7] flex items-center justify-center transition-colors"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentTime(0)}
                title="Reset Timeline"
                className="w-8 h-8 rounded-lg bg-[#22221f] hover:bg-[#2c2b27] text-[#c5bca7] flex items-center justify-center transition-colors ml-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Timecode Readout */}
            <div className="font-mono text-sm sm:text-base font-bold bg-[#0d0d0b] px-3.5 py-1.5 rounded-lg border border-[#262521] text-red-500 tracking-wider">
              {formatTimecode(currentTime)}
            </div>

            {/* Right Tools */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setVolume(!volume)}
                className="text-[#8c877b] hover:text-white transition-colors"
                title="Mute/Unmute"
              >
                {volume ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-400" />}
              </button>
              <div className="font-mono text-xs text-[#8c877b] hidden sm:block">
                TOTAL: 00:00:24:00
              </div>
            </div>

          </div>

          {/* ======================================================== */}
          {/* NLE MULTI-TRACK TIMELINE (Interactive Drag & Scrub)      */}
          {/* ======================================================== */}
          <div className="bg-[#121210] p-4 border-t border-[#262521]">
            
            {/* Timeline Ruler with Seconds Markers */}
            <div 
              onClick={handleTimelineScrub}
              className="relative h-6 bg-[#1a1917] rounded-t border border-[#2a2924] cursor-pointer mb-1 select-none"
            >
              <div className="absolute inset-0 flex justify-between px-2 text-[9px] font-mono text-[#706c62] items-center pointer-events-none">
                <span>00:00</span>
                <span>00:06</span>
                <span>00:12</span>
                <span>00:18</span>
                <span>00:24</span>
              </div>

              {/* Red Scrub Playhead Needle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-red-600 z-30 pointer-events-none"
                style={{ left: `${(currentTime / totalDuration) * 100}%` }}
              >
                <div className="w-2.5 h-2.5 bg-red-600 rotate-45 -translate-x-[4px] -top-1" />
              </div>
            </div>

            {/* Video Track V2 (B-Roll / Motion Titles) */}
            <div 
              onClick={handleTimelineScrub}
              className="relative h-8 bg-[#151513] rounded border border-[#22211e] mb-1.5 flex items-center px-2 cursor-pointer overflow-hidden"
            >
              <span className="font-mono text-[10px] text-[#706c62] w-8 flex-shrink-0">V2</span>
              <div className="flex-1 flex gap-1 h-5">
                <div className="w-1/4 bg-violet-900/60 border border-violet-700/70 rounded text-[9px] font-mono text-violet-200 px-2 flex items-center truncate">
                  3D_Motion_Ramp.mov
                </div>
                <div className="w-1/4 bg-blue-900/60 border border-blue-700/70 rounded text-[9px] font-mono text-blue-200 px-2 flex items-center truncate">
                  LUT_Conversion_Node
                </div>
                <div className="w-1/4 bg-amber-900/60 border border-amber-700/70 rounded text-[9px] font-mono text-amber-200 px-2 flex items-center truncate">
                  Lower_Thirds_Sync
                </div>
                <div className="w-1/4 bg-emerald-900/60 border border-emerald-700/70 rounded text-[9px] font-mono text-emerald-200 px-2 flex items-center truncate">
                  Cinematic_Letterbox_Out
                </div>
              </div>

              {/* Playhead marker through V2 */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-red-600 z-30 pointer-events-none"
                style={{ left: `${(currentTime / totalDuration) * 100}%` }}
              />
            </div>

            {/* Video Track V1 (Master Footage Clips) */}
            <div 
              onClick={handleTimelineScrub}
              className="relative h-9 bg-[#151513] rounded border border-[#22211e] mb-1.5 flex items-center px-2 cursor-pointer overflow-hidden"
            >
              <span className="font-mono text-[10px] text-[#706c62] w-8 flex-shrink-0">V1</span>
              <div className="flex-1 flex gap-1 h-6">
                {scenes.map((s, idx) => (
                  <div
                    key={s.id}
                    className={`flex-1 rounded border px-2 flex items-center justify-between text-[10px] font-mono truncate transition-colors ${
                      currentSceneIdx === idx
                        ? 'bg-neutral-800 border-red-500/80 text-white font-semibold'
                        : 'bg-[#1e1d1a] border-[#2e2d28] text-[#8c877b]'
                    }`}
                  >
                    <span className="truncate">{s.title}</span>
                    <span className="text-[9px] text-[#605c53] ml-1">06s</span>
                  </div>
                ))}
              </div>

              {/* Playhead marker through V1 */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-red-600 z-30 pointer-events-none"
                style={{ left: `${(currentTime / totalDuration) * 100}%` }}
              />
            </div>

            {/* Audio Track A1 (Dialogue & Music Waveform) */}
            <div 
              onClick={handleTimelineScrub}
              className="relative h-8 bg-[#151513] rounded border border-[#22211e] flex items-center px-2 cursor-pointer overflow-hidden"
            >
              <span className="font-mono text-[10px] text-[#706c62] w-8 flex-shrink-0">A1</span>
              <div className="flex-1 h-5 bg-teal-950/50 border border-teal-800/60 rounded px-2 flex items-center justify-between text-[9px] font-mono text-teal-300">
                <span>SOUND_DESIGN_MASTER_MIX_96kHz.wav</span>
                <span className="text-[8px] text-teal-400/80">-14.2 LUFS</span>
              </div>

              {/* Playhead marker through A1 */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-red-600 z-30 pointer-events-none"
                style={{ left: `${(currentTime / totalDuration) * 100}%` }}
              />
            </div>

          </div>

        </div>

        {/* Scene Breakdown Cards Underneath */}
        <div className="scroll-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {scenes.map((scene, idx) => {
            const isCurrent = currentSceneIdx === idx;
            return (
              <div
                key={scene.id}
                onClick={() => {
                  setCurrentTime(scene.duration * idx);
                  setIsPlaying(true);
                }}
                className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#1e1d1a] border-red-500 shadow-md'
                    : 'bg-[#151513] border-[#262521] hover:border-[#383732]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-red-400 mb-1">
                  <span>SCENE 0{scene.id}</span>
                  <span className="text-[#706c62]">24 FPS</span>
                </div>
                <h4 className="font-sans font-bold text-xs text-[#f5f2eb] mb-1.5 line-clamp-1">
                  {scene.title}
                </h4>
                <p className="font-sans text-[11px] text-[#8c877b] leading-relaxed line-clamp-2">
                  {scene.description}
                </p>
                <div className="mt-3 pt-2 border-t border-[#262521] text-[10px] font-mono text-[#a69e8b] flex items-center justify-between">
                  <span className="truncate">{scene.colorGrade}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
