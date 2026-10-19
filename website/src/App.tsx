import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  X, 
  CheckCircle2, 
  ChevronDown 
} from 'lucide-react';

interface TaskReaction {
  id: string;
  label: string;
  emoji: string;
  detail: string;
}

const COUNTRIES = [
  { code: 'IN', dial: '+91', flag: '🇮🇳', name: 'India' },
  { code: 'US', dial: '+1', flag: '🇺🇸', name: 'United States' },
  { code: 'GB', dial: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'DE', dial: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: 'JP', dial: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: 'SG', dial: '+65', flag: '🇸🇬', name: 'Singapore' },
  { code: 'AE', dial: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: 'CA', dial: '+1', flag: '🇨🇦', name: 'Canada' },
  { code: 'AU', dial: '+61', flag: '🇦🇺', name: 'Australia' },
];

const TASKS: TaskReaction[] = [
  {
    id: 'apps',
    label: 'spin up full-stack apps',
    emoji: '🚀',
    detail: 'Scaffolds complete frontend and backend applications from a single prompt'
  },
  {
    id: 'code',
    label: 'write or fix code',
    emoji: '💻',
    detail: 'Detects bugs, refactors syntax, and edits files across your entire repository'
  },
  {
    id: 'deploy',
    label: 'test and deploy projects',
    emoji: '⚡',
    detail: 'Runs automated test suites and deploys live preview and production builds'
  },
  {
    id: 'manage',
    label: 'manage repositories',
    emoji: '📂',
    detail: 'Handles git branches, tracks project milestones, and commits changes remotely'
  },
  {
    id: 'messages',
    label: 'draft messages that secure meetings',
    emoji: '🤝',
    detail: 'Polishes outreach, pitches, and emails to get appointments confirmed'
  }
];

export function App() {
  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Early Access Instinct-Style Form States
  const [identity, setIdentity] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]); // Defaults to India 🇮🇳 +91
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (window.location.hash === '#invite' || window.location.hash === '#access' || window.location.search.includes('invite')) {
      setIsModalOpen(true);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleEarlyAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim() || !identity.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const currentTask = TASKS.find(t => t.id === (hoveredTask || activeTask));

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col justify-between selection:bg-[#ff5100] selection:text-white px-6 sm:px-12 md:px-20 lg:px-28 py-10 sm:py-16 transition-colors duration-300 font-sans">
      
      {/* Top Header / Emblem */}
      <header className="w-full max-w-3xl mx-auto flex items-center pb-12 sm:pb-20">
        <a href="/" className="inline-flex items-center gap-3 group">
          <div className="relative size-10 rounded-full border border-[#27272a] bg-[#18181b] flex items-center justify-center shadow-xs group-hover:border-[#ff5100] group-hover:scale-105 transition-all">
            <svg
              className="size-5 text-white group-hover:text-[#ff5100] transition-colors"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4 21l3.5-.96A8.93 8.93 0 0 0 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z" />
              <path d="M8 12h.01M12 12h.01M16 12h.01" strokeWidth="2.5" />
            </svg>
            <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-[#ff5100] ring-2 ring-[#09090b]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-[#ff5100] transition-colors">
            weave
          </span>
        </a>
      </header>

      {/* Main Editorial Body with White Text on Black */}
      <main className="w-full max-w-3xl mx-auto my-auto flex flex-col gap-8 sm:gap-10">
        
        {/* Core Big Statement */}
        <h1 className="text-2xl sm:text-4xl md:text-[2.65rem] font-bold leading-[1.28] tracking-[-0.02em] text-white">
          Send a WhatsApp message. Watch your computer take care of the rest.
        </h1>

        {/* Unique Weave Explanation */}
        <p className="text-lg sm:text-2xl font-normal leading-[1.55] text-[#a1a1aa]">
          Weave connects your computer directly to WhatsApp so you can get things done from anywhere. Speak or type naturally in chat, and your laptop handles the task in the background—privately, safely, and without needing your attention.
        </p>

        {/* Interactive Tasks with Popup Reactions */}
        <div className="relative text-lg sm:text-2xl font-normal leading-[1.7] text-[#d4d4d8]">
          <span>You can message it to </span>

          {TASKS.map((task, index) => {
            const isLast = index === TASKS.length - 1;
            const isPenultimate = index === TASKS.length - 2;
            const isHovered = hoveredTask === task.id || activeTask === task.id;

            return (
              <React.Fragment key={task.id}>
                <span
                  onMouseEnter={() => setHoveredTask(task.id)}
                  onMouseLeave={() => setHoveredTask(null)}
                  onClick={() => setActiveTask(activeTask === task.id ? null : task.id)}
                  className="relative inline cursor-pointer underline decoration-[#3f3f46] underline-offset-4 decoration-1 hover:decoration-[#ff5100] hover:text-white transition-all group select-none"
                ><span className={isHovered ? 'text-[#ff5100] font-medium' : ''}>{task.label}</span><span
                    className={`absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-300 ease-out flex items-center justify-center ${
                      isHovered
                        ? 'opacity-100 -translate-y-2 scale-110'
                        : 'opacity-0 translate-y-1 scale-75'
                    }`}
                  ><span className="size-8 rounded-full bg-[#18181b] border border-[#27272a] shadow-lg flex items-center justify-center text-lg">{task.emoji}</span></span></span>{isPenultimate ? ', or ' : isLast ? '.' : ', '}
              </React.Fragment>
            );
          })}
        </div>

        {/* Dynamic Detail Pill when a task is hovered/tapped */}
        <div className="h-8 flex items-center">
          {currentTask ? (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18181b] border border-[#27272a] shadow-sm text-xs sm:text-sm text-[#d4d4d8] animate-fade-in">
              <span className="text-base">{currentTask.emoji}</span>
              <span>{currentTask.detail}</span>
            </div>
          ) : (
            <div className="text-xs sm:text-sm text-[#71717a]">
              Hover or tap any highlighted task above
            </div>
          )}
        </div>

        {/* Primary Call to Action Button */}
        <div className="pt-2 sm:pt-4">
          <button
            onClick={() => {
              setIsSubmitted(false);
              setIsModalOpen(true);
            }}
            className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white text-[#09090b] hover:bg-[#ff5100] hover:text-white text-base sm:text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-98"
          >
            <span>Get Weave</span>
            <ArrowRight className="size-4 sm:size-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex flex-wrap items-center gap-4 pt-3 text-xs sm:text-sm text-[#71717a]">
            <span>Invite only for now</span>
            <span>•</span>
            <span>Runs privately on your laptop</span>
            <span>•</span>
            <span>Pairs with WhatsApp in 1 scan</span>
          </div>
        </div>

      </main>

      {/* Minimal Editorial Footer */}
      <footer className="w-full max-w-3xl mx-auto pt-16 sm:pt-24 border-t border-[#27272a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-[#71717a]">
        <div>
          Copyright © 2026 Weave
        </div>

        <nav className="flex flex-wrap items-center gap-6">
          <button
            onClick={() => {
              setIsSubmitted(false);
              setIsModalOpen(true);
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Get Weave
          </button>
          <a
            href="https://github.com/darthnihilus01/weave"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:ramanandv722@gmail.com"
            className="hover:text-white transition-colors"
          >
            ramanandv722@gmail.com
          </a>
        </nav>
      </footer>

      {/* INSTINCT-STYLE MINIMAL EARLY ACCESS MODAL / PAGE */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#09090b]/90 backdrop-blur-xl animate-fade-in font-sans"
          onClick={() => setIsModalOpen(false)}
        >
          {/* CENTERED INSTINCT-STYLE DIALOG CARD */}
          <div 
            className="relative w-full max-w-[460px] rounded-2xl bg-[#0f0f12] border border-[#27272a] p-7 sm:p-9 shadow-2xl text-white transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Clean Close Button in Top-Right */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-[#71717a] hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
              title="Close (Esc)"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>

            {/* Title */}
            <div className="pr-6">
              <h2 className="text-2xl sm:text-[26px] font-semibold text-white tracking-tight leading-tight">
                Weave is invite-only for now
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleEarlyAccessSubmit} className="mt-6 space-y-4">
              {/* Field 1: Work Email or GitHub Handle */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#a1a1aa] block px-0.5" htmlFor="early-access-identity">
                  Work Email or GitHub Handle
                </label>
                <div className="flex items-center border border-[#27272a] focus-within:border-white/40 rounded-xl bg-[#141417] transition-all">
                  <input
                    id="early-access-identity"
                    type="text"
                    required
                    disabled={isSubmitted}
                    value={identity}
                    onChange={(e) => setIdentity(e.target.value)}
                    placeholder="name@company.com or @handle"
                    className="w-full bg-transparent px-3.5 py-3 text-sm text-white placeholder:text-[#52525b] focus:outline-none font-sans"
                  />
                </div>
              </div>

              {/* Field 2: WhatsApp Mobile Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#a1a1aa] block px-0.5" htmlFor="early-access-phone">
                  WhatsApp Mobile Number
                </label>
                <div className="flex items-center border border-[#27272a] focus-within:border-white/40 rounded-xl bg-[#141417] transition-all">
                  {/* Country Flag Selector */}
                  <div className="relative flex items-center pl-3.5 pr-2 py-3 shrink-0 cursor-pointer">
                    <span className="text-lg mr-1.5 select-none">{selectedCountry.flag}</span>
                    <ChevronDown className="size-3.5 text-[#71717a] pointer-events-none" />
                    <select
                      value={selectedCountry.code}
                      onChange={(e) => {
                        const c = COUNTRIES.find((x) => x.code === e.target.value);
                        if (c) setSelectedCountry(c);
                      }}
                      aria-label="Country Code"
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.code} className="bg-[#18181b] text-white">
                          {c.flag} {c.name} ({c.dial})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Vertical Divider */}
                  <div className="w-px h-6 bg-[#27272a] shrink-0" />

                  {/* Phone Input */}
                  <input
                    id="early-access-phone"
                    type="tel"
                    required
                    disabled={isSubmitted}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder={`${selectedCountry.dial} 5550 000 000`}
                    className="w-full bg-transparent px-3.5 py-3 text-sm text-white placeholder:text-[#52525b] focus:outline-none font-sans"
                  />
                </div>
              </div>

              {/* Terms & Privacy Disclaimer */}
              <p className="text-[12px] text-[#71717a] leading-relaxed pt-1">
                By clicking "Request Early Access", I agree to Weave's{' '}
                <a href="#" className="underline hover:text-white transition-colors">Terms of Service</a>{' '}
                and acknowledge the{' '}
                <a href="#" className="underline hover:text-white transition-colors">Privacy Policy</a>.
              </p>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full h-12 rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all mt-6 cursor-pointer ${
                  isSubmitted
                    ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 cursor-default'
                    : isSubmitting
                    ? 'bg-white/80 text-black cursor-wait'
                    : 'bg-white text-black hover:bg-[#ff5100] hover:text-white shadow-sm active:scale-[0.99]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="size-3.5 border-2 border-black border-t-transparent animate-spin rounded-full inline-block mr-1" />
                    <span>Submitting request...</span>
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle2 className="size-4 text-emerald-400" />
                    <span>Request received</span>
                  </>
                ) : (
                  <>
                    <span>Request Early Access</span>
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </form>

            {/* Success Toast */}
            {isSubmitted && (
              <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 animate-fadeIn">
                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                <span>You're on the early access list! We'll notify you on WhatsApp as invites roll out.</span>
              </div>
            )}

            {/* Email Support Fallback */}
            <div className="mt-6 pt-4 border-t border-[#27272a] text-center text-xs text-[#71717a]">
              <span>Direct founder inquiry: </span>
              <a href="mailto:ramanandv722@gmail.com" className="text-white hover:text-[#ff5100] transition-colors underline underline-offset-2">
                ramanandv722@gmail.com
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
