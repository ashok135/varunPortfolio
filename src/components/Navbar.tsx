import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  // Optional navigation hooks
  onContactClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#hero' },
    { label: 'Profile', href: '#profile' },
    { label: '3D Gallery', href: '#velocity-gallery' },
    { label: 'Works', href: '#works' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'glass-paper-nav py-3 shadow-paper-sm'
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        
        {/* Brand */}
        <a href="#hero" className="flex items-baseline gap-2 group">
          <span className="font-display font-extrabold text-base tracking-tight text-[#1c1b18] group-hover:opacity-70 transition-opacity">
            VARUN P.
          </span>
          <span className="font-serif italic text-xs text-[#706c62] hidden sm:inline">
            — video editor
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-[#4a473f]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#1c1b18] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#1c1b18] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Controls: Inquire & Mobile Menu */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#1c1b18] text-xs font-medium text-[#1c1b18] hover:bg-[#1c1b18] hover:text-[#f5f2eb] transition-all duration-200"
          >
            <span>Inquire</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#1c1b18]"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#ede8dd] border-b border-[#dfd8c7] px-6 py-6 space-y-4">

          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#1c1b18] hover:opacity-70"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[#dfd8c7]">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-full bg-[#1c1b18] text-[#f5f2eb] text-xs font-medium"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
