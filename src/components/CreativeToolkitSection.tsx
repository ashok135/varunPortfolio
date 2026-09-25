import React, { useState, useRef } from 'react';
import { Sparkles, Layers, Sliders, Volume2, Cpu, CheckCircle2, Command } from 'lucide-react';

interface KeycapTool {
  id: string;
  name: string;
  badge: string;
  category: string;
  level: string;
  percent: number;
  years: string;
  description: string;
  shortcuts: { key: string; action: string }[];
  primaryColor: string;
  secondaryColor: string;
  shadowColor: string;
  textColor: string;
  borderColor: string;
  gradient: string;
  isTranslucent?: boolean;
}

export const CreativeToolkitSection: React.FC = () => {
  const [activeToolId, setActiveToolId] = useState<string>('pr');
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  // Tools matching Varun's exact post-production & creative skill set
  const tools: KeycapTool[] = [
    {
      id: 'pr',
      name: 'Adobe Premiere Pro',
      badge: 'Pr',
      category: 'PRIMARY NON-LINEAR EDITOR (NLE)',
      level: 'Mastery / Advanced',
      percent: 98,
      years: '3+ Years',
      description: 'Long-form narrative rhythm, speed-ramping, multi-camera sync, dynamic audio ducking, and frame-accurate commercial pacing.',
      shortcuts: [
        { key: 'C', action: 'Razor Cut' },
        { key: 'Q / W', action: 'Ripple Trim to Playhead' },
        { key: 'Cmd + K', action: 'Add Edit to All Tracks' },
        { key: 'Alt + Drag', action: 'Duplicate Clip / Audio Lock' },
      ],
      primaryColor: '#00005b',
      secondaryColor: '#9999ff',
      shadowColor: '#1d0047',
      textColor: '#d9d9ff',
      borderColor: '#382bf0',
      gradient: 'linear-gradient(145deg, #2b1a6e 0%, #15093b 100%)',
    },
    {
      id: 'dv',
      name: 'DaVinci Resolve Studio',
      badge: 'Dv',
      category: 'COLOR SCIENCE & MASTERING',
      level: 'Advanced Colorist',
      percent: 95,
      years: '2+ Years',
      description: 'ACES & YRGB Color Managed pipelines, Log3 to Rec.709 conversions, custom node trees, skin-tone isolation, halation, and film grain emulation.',
      shortcuts: [
        { key: 'Alt + S', action: 'Append Serial Node' },
        { key: 'Alt + P', action: 'Parallel Node Mixer' },
        { key: 'Shift + H', action: 'Highlight Qualified Mask' },
        { key: 'Cmd + D', action: 'Bypass Grade Toggle' },
      ],
      primaryColor: '#18181b',
      secondaryColor: '#ef4444',
      shadowColor: '#09090b',
      textColor: '#ffffff',
      borderColor: '#ef4444',
      gradient: 'linear-gradient(145deg, #27272a 0%, #09090b 100%)',
      isTranslucent: true,
    },
    {
      id: 'ae',
      name: 'Adobe After Effects',
      badge: 'Ae',
      category: 'MOTION DESIGN & VFX COMPOSITING',
      level: 'Proficient Motion Artist',
      percent: 90,
      years: '2.5 Years',
      description: 'Kinetic typography, 3D camera tracking, roto-brushing, matte cleanup, speed-graph curve editing, and bespoke title sequences.',
      shortcuts: [
        { key: 'U', action: 'Reveal Animated Keyframes' },
        { key: 'F9', action: 'Easy Ease Curve' },
        { key: 'J / K', action: 'Jump to Next / Previous Key' },
        { key: 'Cmd + Shift + D', action: 'Split Selected Layer' },
      ],
      primaryColor: '#2b0042',
      secondaryColor: '#d946ef',
      shadowColor: '#160024',
      textColor: '#f5d0fe',
      borderColor: '#a855f7',
      gradient: 'linear-gradient(145deg, #4c1d95 0%, #2e1065 100%)',
      isTranslucent: true,
    },
    {
      id: 'ps',
      name: 'Adobe Photoshop',
      badge: 'Ps',
      category: 'IMAGE MASTERING & MATTE PAINTING',
      level: 'Proficient Retoucher',
      percent: 92,
      years: '4 Years',
      description: 'Thumbnails, key-art poster design, camera raw enhancement, frequency separation, texture grading, and visual storytelling boards.',
      shortcuts: [
        { key: 'P', action: 'Pen Tool Vector Paths' },
        { key: 'Cmd + J', action: 'Duplicate Layer Selection' },
        { key: 'B', action: 'Textured Soft Brush' },
        { key: 'Cmd + Alt + Shift + E', action: 'Stamp Visible Composite' },
      ],
      primaryColor: '#001e36',
      secondaryColor: '#38bdf8',
      shadowColor: '#001020',
      textColor: '#bae6fd',
      borderColor: '#0284c7',
      gradient: 'linear-gradient(145deg, #0369a1 0%, #0c4a6e 100%)',
    },
    {
      id: 'ai',
      name: 'Adobe Illustrator',
      badge: 'Ai',
      category: 'VECTOR ART & BRAND SYSTEMS',
      level: 'Intermediate Designer',
      percent: 82,
      years: '2 Years',
      description: 'Golden-ratio logomarks, vector iconography, scalable typography assets, and graphic overlays tailored for broadcast insertion.',
      shortcuts: [
        { key: 'V / A', action: 'Selection / Direct Sub-Select' },
        { key: 'Shift + M', action: 'Shape Builder Tool' },
        { key: 'P', action: 'Bezier Anchor Pen' },
        { key: 'Cmd + G', action: 'Group Vector Shapes' },
      ],
      primaryColor: '#331500',
      secondaryColor: '#f97316',
      shadowColor: '#1f0d00',
      textColor: '#ffedd5',
      borderColor: '#ea580c',
      gradient: 'linear-gradient(145deg, #ea580c 0%, #9a3412 100%)',
    },
    {
      id: 'blender',
      name: 'Blender 3D Suite',
      badge: '3D',
      category: '3D CAMERA & MOTION VISUALS',
      level: 'Intermediate 3D Artist',
      percent: 78,
      years: '1.5 Years',
      description: '3D asset integration, camera flythroughs, procedural lighting rigs, title extrusions, and Cycles/Eevee realistic materials.',
      shortcuts: [
        { key: 'G / R / S', action: 'Grab / Rotate / Scale' },
        { key: 'Tab', action: 'Toggle Edit / Object Mode' },
        { key: 'Numpad 0', action: 'Snap to Camera View' },
        { key: 'Shift + A', action: 'Add Mesh / Light / Camera' },
      ],
      primaryColor: '#3d2000',
      secondaryColor: '#f59e0b',
      shadowColor: '#1c0f00',
      textColor: '#fef3c7',
      borderColor: '#d97706',
      gradient: 'linear-gradient(145deg, #d97706 0%, #78350f 100%)',
      isTranslucent: true,
    },
  ];

  const activeTool = tools.find((t) => t.id === activeToolId) || tools[0];

  // Synthesize realistic mechanical switch "clack/thock" sound via Web Audio API
  const playMechanicalClick = (pitch = 1) => {
    if (!audioEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      // Noise burst for keycap bottom-out click
      const bufferSize = ctx.sampleRate * 0.04;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.18));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter to sculpt warm mechanical key "thock"
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 650 * pitch;
      filter.Q.value = 3.5;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.28, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // AudioContext could be blocked by browser policy until interaction
    }
  };

  const handleKeyClick = (tool: KeycapTool) => {
    setPressedKey(tool.id);
    setActiveToolId(tool.id);
    playMechanicalClick(tool.id === 'dv' ? 0.9 : tool.id === 'pr' ? 1.05 : 1.15);
    setTimeout(() => {
      setPressedKey(null);
    }, 160);
  };

  return (
    <section id="skills" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#ede8dd] text-[#1c1b18] border-t border-[#dfd8c7] relative overflow-hidden">
      
      {/* Background paper dot grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(rgba(28, 27, 24, 0.08) 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        
        {/* ======================================================== */}
        {/* HEADER: COMING IN FROM OUTSIDE THE SCREEN (FLY-IN)       */}
        {/* ======================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#dfd8c7] mb-12">
          <div className="scroll-reveal-left">
            <div className="font-mono text-xs text-[#706c62] uppercase tracking-widest font-semibold flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#1c1b18] rotate-45 inline-block" />
              INDEX 02 • MECHANICAL ARSENAL
            </div>
            
            {/* Bold headline matching the user reference photo */}
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-[#1c1b18] tracking-tight flex items-baseline gap-3">
              <span>Creative Toolkit</span>
              <span className="font-serif italic font-normal text-2xl sm:text-3xl text-[#706c62]">
                (Artisan Keys)
              </span>
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#4a473f] mt-3 max-w-xl leading-relaxed">
              Tactile, production-tested editing and design software customized for seamless timeline scrubbing, precision color grading, and dynamic motion graphics.
            </p>
          </div>

          {/* Sound Toggle & Instructions */}
          <div className="scroll-reveal-right flex items-center gap-3">
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border border-[#dfd8c7] bg-[#f5f2eb] hover:bg-[#ffffff] transition-all shadow-xs"
              title="Toggle Mechanical Key Switch Sound"
            >
              <Volume2 className={`w-3.5 h-3.5 ${audioEnabled ? 'text-emerald-700' : 'text-[#8c877b]'}`} />
              <span className="text-[#3d3b36]">
                {audioEnabled ? 'Sound: Mechanical On' : 'Sound: Muted'}
              </span>
            </button>
            <span className="font-mono text-[10px] text-[#706c62] uppercase tracking-wider hidden sm:inline">
              [Click keycaps to switch tools]
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* INTERACTIVE 3D KEYBOARD KEYCAP SWITCHBOARD               */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT 7 COLS: 3D MECHANICAL KEYBOARD KEYCAPS */}
          <div className="scroll-reveal-left lg:col-span-7 flex flex-col items-center">
            
            {/* Visual Header Note */}
            <div className="w-full flex items-center justify-between mb-6 px-2">
              <span className="font-mono text-[11px] text-[#706c62] uppercase tracking-wider flex items-center gap-1.5">
                <Command className="w-3 h-3 text-[#1c1b18]" />
                CUSTOM 3D ARTISAN KEYCAPS • PRESS TO ENGAGE
              </span>
              <span className="text-[11px] font-sans text-[#706c62]">
                Profile: OEM Artisan Sculpt
              </span>
            </div>

            {/* Keycap Cluster Grid */}
            <div className="w-full bg-[#dfd8c7]/50 p-6 sm:p-8 rounded-3xl border border-[#c5bca7] shadow-inner relative">
              
              {/* Subtle top acrylic reflection */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/30 to-transparent rounded-t-3xl pointer-events-none" />

              {/* 3x2 Floating Keycap Matrix */}
              <div className="grid grid-cols-3 gap-5 sm:gap-7 relative z-10">
                {tools.map((tool, idx) => {
                  const isActive = activeToolId === tool.id;
                  const isDepressed = pressedKey === tool.id;
                  const floatClass = idx % 3 === 0 ? 'animate-key-float-a' : idx % 3 === 1 ? 'animate-key-float-b' : 'animate-key-float-c';

                  return (
                    <div 
                      key={tool.id} 
                      className={`keycap-3d-wrapper flex flex-col items-center group ${floatClass}`}
                      style={{ animationPlayState: isDepressed ? 'paused' : 'running' }}
                    >
                      {/* 3D Mechanical Keycap Button */}
                      <button
                        onClick={() => handleKeyClick(tool)}
                        className={`keycap-3d w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl sm:rounded-3xl relative border-2 flex flex-col items-center justify-center transition-all duration-150 cursor-pointer ${
                          isDepressed ? 'pressed' : ''
                        }`}
                        style={{
                          background: tool.gradient,
                          borderColor: isActive ? '#1c1b18' : tool.borderColor,
                          boxShadow: isDepressed
                            ? `0 2px 0 ${tool.shadowColor}, 0 4px 10px rgba(0,0,0,0.3)`
                            : isActive
                            ? `0 10px 0 ${tool.shadowColor}, 0 16px 25px rgba(0,0,0,0.25), 0 0 20px ${tool.secondaryColor}40`
                            : `0 8px 0 ${tool.shadowColor}, 0 12px 18px rgba(0,0,0,0.18)`,
                          transform: isDepressed
                            ? 'translateY(6px) scale(0.97)'
                            : isActive
                            ? 'translateY(-4px) scale(1.03)'
                            : undefined,
                        }}
                      >
                        {/* Top Dish / Concave Keycap Surface Inset */}
                        <div 
                          className="w-[84%] h-[82%] rounded-xl sm:rounded-2xl flex flex-col items-center justify-center relative overflow-hidden"
                          style={{
                            background: tool.isTranslucent 
                              ? 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 70%)'
                              : 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.2) 80%)',
                            border: '1px solid rgba(255,255,255,0.35)',
                            boxShadow: 'inset 0 3px 6px rgba(255,255,255,0.3), inset 0 -3px 6px rgba(0,0,0,0.4)',
                          }}
                        >
                          {/* Top Specular Sheen */}
                          <div className="absolute top-1 left-2 right-2 h-2.5 bg-gradient-to-b from-white/40 to-transparent rounded-full pointer-events-none" />

                          {/* Specific Icon / Badge Rendering */}
                          {tool.id === 'dv' ? (
                            /* DaVinci Resolve 3-Way RGB Color Wheel */
                            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                                <circle cx="50" cy="50" r="44" fill="#121212" stroke="#ffffff30" strokeWidth="3" />
                                {/* Red petal */}
                                <circle cx="50" cy="32" r="16" fill="#ef4444" opacity="0.9" />
                                {/* Green petal */}
                                <circle cx="34" cy="60" r="16" fill="#10b981" opacity="0.9" />
                                {/* Blue petal */}
                                <circle cx="66" cy="60" r="16" fill="#3b82f6" opacity="0.9" />
                                <circle cx="50" cy="50" r="8" fill="#ffffff" />
                              </svg>
                            </div>
                          ) : tool.id === 'blender' ? (
                            /* Blender 3D Spiral Eye */
                            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                                <path 
                                  d="M50 20 C68 20 82 34 82 52 C82 70 66 84 48 84 C30 84 18 70 18 52 C18 42 24 32 32 26 L50 48" 
                                  fill="none" 
                                  stroke="#ffffff" 
                                  strokeWidth="9" 
                                  strokeLinecap="round"
                                />
                                <circle cx="50" cy="50" r="10" fill="#f59e0b" />
                              </svg>
                            </div>
                          ) : (
                            /* Classic Bold Adobe Serif / Sans Badge */
                            <span 
                              className="font-display font-black text-2xl sm:text-3xl md:text-4xl tracking-tight drop-shadow-md select-none"
                              style={{ color: tool.textColor }}
                            >
                              {tool.badge}
                            </span>
                          )}

                          {/* Mini Tool Label at bottom of keycap */}
                          <span 
                            className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider font-bold mt-1 opacity-80"
                            style={{ color: tool.textColor }}
                          >
                            {tool.id}
                          </span>
                        </div>

                        {/* Active underglow indicator */}
                        {isActive && (
                          <div 
                            className="absolute -bottom-2 w-8 h-1 rounded-full bg-[#1c1b18] shadow-sm animate-pulse"
                          />
                        )}
                      </button>

                      {/* Keycap Title below */}
                      <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-[#1c1b18] mt-2.5 text-center">
                        {tool.name.split(' ')[1] || tool.name}
                      </span>
                      <span className="font-mono text-[9px] text-[#706c62]">
                        {tool.level.split('/')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Physical Keyboard Deck Rim */}
              <div className="mt-8 pt-4 border-t border-[#c5bca7] flex items-center justify-between font-mono text-[10px] text-[#706c62]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                  <span>HOT-SWAP PCB • CHERRY MX LINEAR PROFILE</span>
                </div>
                <span>HYDERABAD POST LAB</span>
              </div>
            </div>

            {/* Visual reference graphic preview */}
            <div className="mt-6 w-full flex items-center justify-between bg-[#f5f2eb] p-3 rounded-xl border border-[#dfd8c7] shadow-xs">
              <div className="flex items-center gap-3">
                <img 
                  src="/images/creative_toolkit_keycaps.jpg" 
                  alt="3D Creative Keycaps Reference" 
                  className="w-12 h-12 object-cover rounded-lg border border-[#dfd8c7]"
                />
                <div>
                  <div className="font-sans font-bold text-xs text-[#1c1b18]">
                    3D Artisan Sculpt Collection
                  </div>
                  <div className="font-mono text-[10px] text-[#706c62]">
                    High-Res Physical Resin & Matte Keycap Renders
                  </div>
                </div>
              </div>
              <span className="font-mono text-[10px] text-emerald-800 font-semibold bg-emerald-100 px-2 py-0.5 rounded">
                ACTIVE
              </span>
            </div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT 5 COLS: ACTIVE WORKFLOW & SHORTCUT INSPECTOR       */}
          {/* ======================================================== */}
          <div className="scroll-reveal-right lg:col-span-5 flex flex-col">
            
            <div className="bg-[#f5f2eb] rounded-3xl p-6 sm:p-8 border-2 border-[#1c1b18] shadow-paper relative">
              
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-[#dfd8c7] mb-6">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
                    style={{ background: activeTool.secondaryColor }}
                  >
                    ●
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#1c1b18]">
                    {activeTool.category}
                  </span>
                </div>
                <span className="font-mono text-xs font-semibold text-[#706c62]">
                  {activeTool.years}
                </span>
              </div>

              {/* Tool Big Title & Level */}
              <div className="mb-6">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-[#1c1b18]">
                    {activeTool.name}
                  </h3>
                  <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    {activeTool.level}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-3 w-full bg-[#dfd8c7] h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${activeTool.percent}%`,
                      background: activeTool.secondaryColor,
                    }}
                  />
                </div>
                <div className="flex justify-between font-mono text-[10px] text-[#706c62] mt-1">
                  <span>Proficiency Gauge</span>
                  <span className="font-bold text-[#1c1b18]">{activeTool.percent}% Frame Accuracy</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#706c62] font-semibold mb-2">
                  Specialized Workflow
                </h4>
                <p className="font-sans text-xs sm:text-[13px] text-[#3d3b36] leading-relaxed">
                  {activeTool.description}
                </p>
              </div>

              {/* Keyboard Shortcuts Muscle Memory */}
              <div className="pt-4 border-t border-[#dfd8c7]">
                <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#706c62] font-semibold mb-3 flex items-center gap-1.5">
                  <Command className="w-3.5 h-3.5 text-[#1c1b18]" />
                  Muscle Memory & Speed Shortcuts
                </h4>

                <div className="space-y-2">
                  {activeTool.shortcuts.map((sc) => (
                    <div 
                      key={sc.key}
                      className="flex items-center justify-between p-2 rounded-lg bg-[#ede8dd] border border-[#dfd8c7] hover:border-[#1c1b18] transition-colors"
                    >
                      <span className="font-sans text-xs text-[#3d3b36]">
                        {sc.action}
                      </span>
                      <kbd className="font-mono text-xs font-bold text-[#1c1b18] bg-[#f5f2eb] px-2.5 py-1 rounded border border-[#c5bca7] shadow-xs">
                        {sc.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deckle Edge Stamp Note */}
              <div className="mt-6 pt-4 border-t border-dashed border-[#dfd8c7] flex items-center justify-between text-[11px] font-sans text-[#706c62]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Production Verified</span>
                </div>
                <span className="font-mono text-[10px]">
                  ID: KEY-{activeTool.id.toUpperCase()}-2026
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
