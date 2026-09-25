import React, { useState } from 'react';
import { ArrowUpRight, Eye, Play, X } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'video' | 'branding' | 'print' | 'photo';
  categoryLabel: string;
  year: string;
  image: string;
  client?: string;
  role: string;
  deliverables: string[];
  description: string;
}

interface CuratedWorksProps {
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export const CuratedWorks: React.FC<CuratedWorksProps> = ({
  activeCategory = 'all',
  onSelectCategory
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'work-1',
      title: 'Cinematic Rhythm & Dynamic Narrative Reel',
      subtitle: 'Post-Production / Audio Dynamics / Color Grading',
      category: 'video',
      categoryLabel: 'Video Editing',
      year: '2026',
      client: 'Independent Commercial',
      role: 'Lead Video Editor & Colorist',
      deliverables: ['Premiere Pro', 'DaVinci Resolve', 'After Effects'],
      image: '/portfolio/banner_3d_motion.jpg',
      description: 'An exploration of rhythmic pacing, seamless cuts, and immersive audio storytelling crafted for maximum viewer retention and emotional resonance.',
    },
    {
      id: 'work-2',
      title: 'Digital Newsroom & Timely Broadcast Segments',
      subtitle: 'Rapid Assembly / Lower Thirds / Sound Normalization',
      category: 'video',
      categoryLabel: 'Post-Production',
      year: '2025',
      client: 'Speed News Media',
      role: 'Broadcast Video Editor',
      deliverables: ['Premiere Pro', 'DaVinci Resolve', 'Studio FX'],
      image: '/portfolio/banner_2d_motion.jpg',
      description: 'Fast-turnaround daily broadcasting packages with animated lower thirds, footage stabilization, multi-mic audio compression, and color balance.',
    },
    {
      id: 'work-3',
      title: 'DayKnights & Fusun Brand Identity Systems',
      subtitle: 'Visual Identity / Vector Monograms / Collateral',
      category: 'branding',
      categoryLabel: 'Brand Design',
      year: '2025',
      client: 'Design Studio Lab',
      role: 'Brand Designer',
      deliverables: ['Adobe Illustrator', 'Photoshop'],
      image: '/portfolio/banner_branding.jpg',
      description: 'Comprehensive branding systems balancing rigorous Swiss geometric grid logic with tactile paper textures and bespoke typography.',
    },
    {
      id: 'work-4',
      title: 'Golden Ratio Logomark Archive',
      category: 'branding',
      categoryLabel: 'Brand Design',
      year: '2025',
      subtitle: 'Geometric Identity / Typography Marks',
      role: 'Graphic Designer',
      deliverables: ['Vector CAD', 'Illustrator'],
      image: '/portfolio/banner_logos.jpg',
      description: 'A study in geometric balance, negative space harmony, and minimalist monogram silhouettes for modern creative ventures.',
    },
    {
      id: 'work-5',
      title: 'Swiss Grid & Scientific Typography Posters',
      subtitle: 'Screenprint / Halftone Art / Architectural CAD',
      category: 'print',
      categoryLabel: 'Print & Posters',
      year: '2026',
      role: 'Visual Designer',
      deliverables: ['Halftone FX', 'Photoshop', 'Typography'],
      image: '/portfolio/banner_posters.jpg',
      description: 'Archival screenprint poster series investigating technical aerospace blueprints, vintage risograph textures, and modern asymmetric layout.',
    },
    {
      id: 'work-6',
      title: 'High-Retention Editorial Video Assets',
      subtitle: 'Content Pacing / CTR Packaging / Color Science',
      category: 'video',
      categoryLabel: 'Video Editing',
      year: '2025',
      client: 'Tech 4 Billion',
      role: 'Digital Video Editor',
      deliverables: ['Premiere Pro', 'After Effects', 'Lightroom'],
      image: '/portfolio/banner_thumbnails.jpg',
      description: 'Editorial video packages and thumbnail compositions optimized for audience curiosity, visual focal hierarchy, and vibrant contrast.',
    },
  ];

  const categories = [
    { key: 'all', label: 'All Works' },
    { key: 'video', label: 'Video & Post-Production' },
    { key: 'branding', label: 'Brand & Identity' },
    { key: 'print', label: 'Print & Posters' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="works" className="py-24 px-6 sm:px-8 border-t border-[#dfd8c7] bg-[#f5f2eb]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#dfd8c7] mb-12">
          <div className="scroll-reveal-left">
            <span className="font-mono text-xs uppercase tracking-widest text-[#706c62] block mb-1">
              Index 01 • Selected Works
            </span>
            <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-[#1c1b18] tracking-tight">
              Curated Projects & Visual Direction
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="scroll-reveal-right flex items-center gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => onSelectCategory && onSelectCategory(c.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-sans transition-all duration-200 cursor-pointer ${
                  activeCategory === c.key
                    ? 'bg-[#1c1b18] text-[#f5f2eb] font-medium shadow-sm'
                    : 'bg-[#ede8dd] text-[#4a473f] hover:text-[#1c1b18] hover:bg-[#dfd8c7]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Project Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`group cursor-pointer flex flex-col justify-between ${idx % 2 === 0 ? 'scroll-reveal-left' : 'scroll-reveal-right'}`}
            >
              {/* Image with subtle paper border */}
              <div className="relative aspect-[16/10] bg-[#ede8dd] rounded-lg overflow-hidden border border-[#dfd8c7] shadow-paper-sm transition-all duration-500 group-hover:shadow-paper group-hover:-translate-y-1">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 filter contrast-[102%]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/portfolio/preview_section_0.jpg';
                  }}
                />
                
                {/* Floating pill badge */}
                <div className="absolute top-3.5 left-3.5 bg-[#f5f2eb]/90 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-[#1c1b18] border border-[#dfd8c7]">
                  {project.categoryLabel}
                </div>

                <div className="absolute bottom-3.5 right-3.5 w-8 h-8 rounded-full bg-[#1c1b18]/80 text-[#f5f2eb] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Text Info */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 border-b border-[#dfd8c7] pb-3">
                <div>
                  <h3 className="font-serif italic font-normal text-xl sm:text-2xl text-[#1c1b18] group-hover:text-[#4a473f] transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="font-sans text-xs text-[#706c62] mt-1">
                    {project.subtitle}
                  </p>
                </div>
                <span className="font-mono text-xs text-[#8c877b] sm:ml-4 shrink-0">
                  {project.year}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {selectedProject && (
          <div 
            className="fixed inset-0 z-50 bg-[#1c1b18]/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <div 
              className="bg-[#f5f2eb] border border-[#dfd8c7] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/9] bg-[#ede8dd] overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1c1b18]/70 text-[#f5f2eb] flex items-center justify-center hover:bg-[#1c1b18] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-[#706c62] uppercase tracking-wider">
                    {selectedProject.categoryLabel} • {selectedProject.year}
                  </span>
                  {selectedProject.client && (
                    <span className="font-sans text-xs text-[#706c62]">
                      Client: {selectedProject.client}
                    </span>
                  )}
                </div>

                <h3 className="font-serif italic font-normal text-3xl text-[#1c1b18] mb-2">
                  {selectedProject.title}
                </h3>
                <p className="font-sans text-xs font-medium text-[#4a473f] mb-4">
                  Role: {selectedProject.role}
                </p>

                <p className="font-sans text-xs sm:text-sm text-[#4a473f] leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#dfd8c7]">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {selectedProject.deliverables.map((d) => (
                      <span key={d} className="px-2.5 py-0.5 rounded-full bg-[#ede8dd] text-[11px] font-mono text-[#1c1b18]">
                        {d}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-1.5 rounded-full bg-[#1c1b18] text-[#f5f2eb] text-xs font-medium hover:bg-[#3d3b36] transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
