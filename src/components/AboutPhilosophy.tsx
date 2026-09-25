import React from 'react';
import { Camera, Film, Monitor, Sliders, Scissors } from 'lucide-react';

export const AboutPhilosophy: React.FC = () => {
  const tools = [
    { name: 'Premiere Pro', desc: 'Narrative assembly, pacing & rhythm' },
    { name: 'DaVinci Resolve', desc: 'Color science, LUT grading & nodes' },
    { name: 'After Effects', desc: 'Title cards, lower-thirds & motion' },
    { name: 'Adobe Photoshop', desc: 'Image manipulation & visual textures' },
    { name: 'Illustrator', desc: 'Vector marks & Swiss typographic systems' },
    { name: 'Lightroom', desc: 'Stills curation & cinematic tonal curves' },
  ];

  return (
    <section id="about" className="py-24 px-6 sm:px-8 bg-[#ede8dd] border-t border-[#dfd8c7]">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Portrait & Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/5] bg-[#dfd8c7] rounded-lg overflow-hidden border border-[#c5bca7] shadow-paper">
              <img
                src="/portfolio/hero_fullbody_exact.jpg"
                alt="Varun P"
                className="w-full h-full object-cover filter contrast-[103%]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/portfolio/hero_fullbody.jpg';
                }}
              />
              <div className="absolute bottom-3 left-3 bg-[#f5f2eb]/90 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-mono text-[#1c1b18] border border-[#dfd8c7]">
                Varun P. • Creative Editor
              </div>
            </div>

            <div className="p-5 bg-[#f5f2eb] rounded-lg border border-[#dfd8c7] space-y-2">
              <div className="font-mono text-[10px] text-[#706c62] uppercase tracking-wider">
                ACADEMIC FORMATION
              </div>
              <div className="font-serif italic text-lg text-[#1c1b18]">
                Bachelor of Design in Graphic Design
              </div>
              <div className="font-sans text-xs text-[#706c62]">
                Lovely Professional University • 2024–2028
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Philosophy (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#706c62] block mb-2">
                Index 02 • Perspective & Approach
              </span>
              <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-[#1c1b18] leading-[1.15] mb-6">
                "Pacing is emotion. Every cut dictates the heartbeat of the narrative."
              </h2>
              <div className="font-sans text-xs sm:text-sm text-[#4a473f] leading-relaxed space-y-4">
                <p>
                  I am a Video Editor and Visual Designer based in India, dedicated to the delicate balance between technical precision and emotional storytelling. With hands-on experience in high-pressure newsrooms, commercial studios, and independent creative labs, I view editing not merely as trimming footage, but as composing visual music.
                </p>
                <p>
                  My workflow bridges industry-standard post-production systems—DaVinci Resolve and Adobe Premiere Pro—with camera workflows including Sony FX series and Canon cinema lines. Whether calibrating color nodes or structuring micro-retention rhythms for digital audiences, the goal remains singular: to leave an indelible impression.
                </p>
              </div>
            </div>

            {/* Tool Matrix */}
            <div className="pt-6 border-t border-[#dfd8c7]">
              <span className="font-mono text-xs uppercase tracking-widest text-[#706c62] block mb-4">
                TECHNICAL SUITE & POST-PRODUCTION ARSENAL
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tools.map((t) => (
                  <div key={t.name} className="p-3.5 bg-[#f5f2eb] rounded-lg border border-[#dfd8c7]">
                    <div className="font-display font-bold text-xs text-[#1c1b18]">
                      {t.name}
                    </div>
                    <div className="font-sans text-[11px] text-[#706c62] mt-0.5">
                      {t.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
