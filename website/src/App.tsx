import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  X,
  ChevronDown,
  CheckCircle2,
  Loader2
} from 'lucide-react';

interface TaskReaction {
  id: string;
  label: string;
  emoji: string;
  detail: string;
}

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

  // Clean Modal States
  const [identity, setIdentity] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedFounderEmail, setCopiedFounderEmail] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const copyFounderEmail = () => {
    navigator.clipboard.writeText('ramanandv722@gmail.com');
    setCopiedFounderEmail(true);
    setTimeout(() => setCopiedFounderEmail(false), 2000);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            onClick={() => { setIsModalOpen(true); setIsSubmitted(false); }}
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
            onClick={() => { setIsModalOpen(true); setIsSubmitted(false); }}
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

      {/* Clean, Human, Authentic Invite-Only Modal (Zero Slop) */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in font-sans"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-[480px] my-auto rounded-3xl bg-[#121214] border border-[#27272a] p-6 sm:p-8 shadow-2xl overflow-hidden transition-all text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-1.5 rounded-full text-[#71717a] hover:text-white hover:bg-[#27272a] transition-colors cursor-pointer"
              title="Close modal"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>

            {/* Header */}
            <div className="space-y-2 pr-8">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#ff5100]" />
                <span className="text-xs font-semibold tracking-wider uppercase text-[#ff5100]">
                  Private Beta
                </span>
              </div>
              <h2 className="text-2xl sm:text-[28px] font-bold text-white tracking-tight leading-snug">
                Weave is invite-only for now
              </h2>
              <p className="text-sm text-[#a1a1aa] leading-relaxed">
                We're onboarding new users in small groups to make sure everything runs fast and private on your computer.
              </p>
            </div>

            {/* Main Action: Request Access Form */}
            {isSubmitted ? (
              <div className="my-6 p-4 rounded-2xl bg-[#18181b] border border-[#27272a] space-y-2 animate-fade-in">
                <div className="flex items-center gap-2 text-white font-medium text-sm">
                  <CheckCircle2 className="size-4 text-emerald-400" />
                  <span>You're on the list</span>
                </div>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  We received your request for <strong className="text-white">{identity || 'your account'}</strong>. We'll text your WhatsApp as soon as your access is unlocked.
                </p>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="space-y-3.5 my-6">
                <div className="space-y-1.5">
                  <label htmlFor="invite-email" className="text-xs font-medium text-[#d4d4d8]">
                    Email or GitHub
                  </label>
                  <input
                    id="invite-email"
                    type="text"
                    required
                    value={identity}
                    onChange={(e) => setIdentity(e.target.value)}
                    placeholder="name@company.com or @handle"
                    className="w-full h-11 bg-[#18181b] border border-[#27272a] rounded-xl px-3.5 text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:border-[#ff5100] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="invite-phone" className="text-xs font-medium text-[#d4d4d8] flex items-center justify-between">
                    <span>WhatsApp Number</span>
                    <span className="text-[11px] text-[#71717a] font-normal">For pairing invite</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative shrink-0">
                      <select
                        aria-label="Country Code"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="h-11 appearance-none bg-[#18181b] border border-[#27272a] rounded-xl pl-3 pr-7 text-xs text-white focus:outline-none focus:border-[#ff5100] cursor-pointer"
                      >
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+49">🇩🇪 +49</option>
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+81">🇯🇵 +81</option>
                        <option value="+65">🇸🇬 +65</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-3 text-[#71717a] pointer-events-none" />
                    </div>
                    <input
                      id="invite-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full h-11 bg-[#18181b] border border-[#27272a] rounded-xl px-3.5 text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:border-[#ff5100] transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 rounded-full bg-white text-[#09090b] hover:bg-[#ff5100] hover:text-white text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98 mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Saving your spot...</span>
                    </>
                  ) : (
                    <>
                      <span>Request Invitation</span>
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Direct Founder Email Line */}
            <div className="pt-4 border-t border-[#27272a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#a1a1aa]">
              <div>
                <span>Need immediate access for a project?</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="mailto:ramanandv722@gmail.com?subject=Weave%20Invite%20Access%20Request"
                  className="text-white hover:text-[#ff5100] transition-colors font-medium underline underline-offset-4 decoration-[#3f3f46] hover:decoration-[#ff5100]"
                >
                  Email Founder
                </a>
                <span>•</span>
                <button
                  type="button"
                  onClick={copyFounderEmail}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {copiedFounderEmail ? <span className="text-emerald-400">Copied!</span> : 'Copy email'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
