import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-6 sm:px-8 bg-[#ede8dd] border-t border-[#dfd8c7] text-[#706c62] text-xs font-mono">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        <div>
          <span className="font-display font-extrabold text-sm text-[#1c1b18] tracking-tight block">
            VARUN P.
          </span>
          <span className="text-[11px] text-[#8c877b]">
            Botanical Editorial Portfolio • 2026 Archive
          </span>
        </div>

        <div className="flex items-center gap-6 text-[11px]">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#1c1b18] transition-colors">
            INSTAGRAM
          </a>
          <a href="https://behance.net" target="_blank" rel="noreferrer" className="hover:text-[#1c1b18] transition-colors">
            BEHANCE
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#1c1b18] transition-colors">
            YOUTUBE
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#1c1b18] transition-colors">
            LINKEDIN
          </a>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#c5bca7] text-[#1c1b18] hover:bg-[#dfd8c7] transition-colors text-[11px]"
        >
          <span>TOP</span>
          <ArrowUp className="w-3 h-3" />
        </button>

      </div>
    </footer>
  );
};
