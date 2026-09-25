import React from 'react';

export const ExperienceJournal: React.FC = () => {
  const experiences = [
    {
      period: '2023 — Present',
      role: 'Video Editor & Visual Designer',
      organization: 'Independent Commissions & Freelance',
      description: 'Partnering directly with content creators, agencies, and brands on long-form YouTube documentaries, commercial shorts, and high-CTR visual identity packages.',
      tags: ['Commercial Edit', 'Color Grading', 'Brand Systems'],
    },
    {
      period: '7 Months',
      role: 'Video Editor',
      organization: 'Tech 4 Billion',
      description: 'Orchestrated end-to-end video editing pipelines for digital media initiatives. Collaborated with creative leads to optimize storytelling rhythm, visual pacing, and multi-format exports.',
      tags: ['Digital Media', 'Fast Pacing', 'Footage Curation'],
    },
    {
      period: '4 Months',
      role: 'Broadcast Video Editor',
      organization: 'Speed News',
      description: 'Edited rapid-turnaround breaking news packages and studio broadcasts under strict live television deadlines. Ensured audio normalization and television lower-third compliance.',
      tags: ['Newsroom', 'Multi-Cam Sync', 'Live Broadcast'],
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 sm:px-8 bg-[#f5f2eb] border-t border-[#dfd8c7]">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="pb-8 border-b border-[#dfd8c7] mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="scroll-reveal-left">
            <span className="font-mono text-xs uppercase tracking-widest text-[#706c62] block mb-1">
              Index 03 • Professional Record
            </span>
            <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-[#1c1b18] tracking-tight">
              Work History & Production Credits
            </h2>
          </div>
          <span className="scroll-reveal-right font-mono text-xs text-[#706c62]">
            2023 — 2026 ARCHIVE
          </span>
        </div>

        {/* Editorial Table / List */}
        <div className="divide-y divide-[#dfd8c7]">
          {experiences.map((item, idx) => (
            <div key={idx} className="scroll-reveal py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline group">
              {/* Period */}
              <div className="md:col-span-3 font-mono text-xs text-[#706c62]">
                {item.period}
              </div>

              {/* Role & Org */}
              <div className="md:col-span-4">
                <h3 className="font-serif italic font-normal text-2xl text-[#1c1b18] group-hover:text-[#4a473f] transition-colors">
                  {item.role}
                </h3>
                <div className="font-sans text-xs font-medium text-[#706c62] mt-0.5">
                  {item.organization}
                </div>
              </div>

              {/* Description & Tags */}
              <div className="md:col-span-5 space-y-3">
                <p className="font-sans text-xs sm:text-sm text-[#4a473f] leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {item.tags.map((t) => (
                    <span key={t} className="px-2.5 py-0.5 rounded-full bg-[#ede8dd] text-[10px] font-mono text-[#706c62]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
