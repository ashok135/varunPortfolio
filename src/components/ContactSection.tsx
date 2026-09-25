import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Mail, MapPin, Send } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    scope: 'Video Editing & Post-Production',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-6 sm:px-8 bg-[#ede8dd] border-t border-[#dfd8c7]">
      <div className="max-w-4xl mx-auto">

        {/* Section Header */}
        <div className="scroll-reveal text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#706c62] block mb-2">
            Index 04 • Inquiries & Collaborations
          </span>
          <h2 className="font-serif italic font-normal text-4xl sm:text-6xl text-[#1c1b18] mb-4">
            Let's craft something timeless together.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#4a473f] max-w-md mx-auto leading-relaxed">
            Available for select commercial post-production, documentary video editing, and visual identity projects.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="scroll-reveal bg-[#f5f2eb] rounded-2xl border border-[#dfd8c7] p-8 sm:p-12 shadow-paper">
          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#1c1b18] text-[#f5f2eb] flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif italic text-2xl text-[#1c1b18]">
                Inquiry Received
              </h3>
              <p className="font-sans text-xs text-[#706c62] max-w-xs mx-auto">
                Thank you for your note. I will review your project requirements and respond within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-1.5 rounded-full border border-[#1c1b18] text-xs font-sans text-[#1c1b18] hover:bg-[#1c1b18] hover:text-[#f5f2eb] transition-colors"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#706c62] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border-b border-[#c5bca7] py-2 text-xs sm:text-sm text-[#1c1b18] placeholder-[#a69e8b] focus:outline-none focus:border-[#1c1b18] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#706c62] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent border-b border-[#c5bca7] py-2 text-xs sm:text-sm text-[#1c1b18] placeholder-[#a69e8b] focus:outline-none focus:border-[#1c1b18] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#706c62] mb-2">
                  Project Scope
                </label>
                <select
                  value={form.scope}
                  onChange={(e) => setForm({ ...form, scope: e.target.value })}
                  className="w-full bg-transparent border-b border-[#c5bca7] py-2 text-xs sm:text-sm text-[#1c1b18] focus:outline-none focus:border-[#1c1b18] transition-colors cursor-pointer"
                >
                  <option value="Video Editing & Post-Production">Video Editing & Post-Production</option>
                  <option value="Color Grading & Finishing">Color Grading & Finishing</option>
                  <option value="Brand Identity & Typography">Brand Identity & Typography</option>
                  <option value="Commercial / Content Packaging">Commercial / Content Packaging</option>
                  <option value="General Conversation">General Conversation</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#706c62] mb-2">
                  Project Details
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell me about your footage, aesthetic vision, or deadlines..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-transparent border-b border-[#c5bca7] py-2 text-xs sm:text-sm text-[#1c1b18] placeholder-[#a69e8b] focus:outline-none focus:border-[#1c1b18] transition-colors resize-none"
                />
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 text-xs font-mono text-[#706c62] text-center sm:text-left">
                  <a href="mailto:varunp.creates@gmail.com" className="hover:text-[#1c1b18] underline truncate">
                    varunp.creates@gmail.com
                  </a>
                  <span>•</span>
                  <span>Hyderabad, India</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#1c1b18] text-[#f5f2eb] text-xs font-medium hover:bg-[#3d3b36] transition-all duration-200 cursor-pointer shadow-xs"
                >
                  <span>Submit Inquiry</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
