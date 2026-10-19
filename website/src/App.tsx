import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  X, 
  Check, 
  Copy, 
  ShieldCheck, 
  AtSign, 
  Terminal, 
  ExternalLink, 
  CheckCircle2, 
  ChevronDown, 
  IdCard 
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
  
  // Invite Modal States
  const [inviteTab, setInviteTab] = useState<'request' | 'founder'>('request');
  const [identity, setIdentity] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (window.location.hash === '#invite' || window.location.search.includes('invite')) {
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

  const copyFounderEmail = () => {
    navigator.clipboard.writeText('ramanandv722@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
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
            onClick={() => setIsModalOpen(true)}
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
            onClick={() => setIsModalOpen(true)}
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

      {/* CLEAN & STREAMLINED INVITE-ONLY PASS MODAL */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#09090b]/85 backdrop-blur-2xl animate-fade-in font-sans"
          onClick={() => setIsModalOpen(false)}
        >
          {/* FLOATING GLASS CAPSULE */}
          <div 
            className="relative w-full max-w-[540px] rounded-2xl bg-[#0e0e12]/95 backdrop-blur-2xl border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(16,185,129,0.06)] transition-all duration-300 overflow-hidden text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Soft Emerald Neon Glow Accent Aura */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-32 bg-emerald-500/10 blur-[60px] pointer-events-none rounded-full" />

            {/* Clean Close Button in Top-Right */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-[#71717a] hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5 cursor-pointer z-20"
              title="Close modal (Esc)"
              aria-label="Close modal"
            >
              <X className="size-4" />
            </button>

            {/* Modal Capsule Body */}
            <div className="p-6 sm:p-8 space-y-5 relative z-10">
              
              {/* Headline */}
              <div className="pr-8">
                <h2 className="text-[26px] sm:text-[30px] leading-tight text-white font-bold tracking-tight">
                  Weave is invite-only for now
                </h2>
              </div>

              {/* Direct Interactive Toggle Switcher */}
              <div className="p-1 rounded-xl bg-[#09090b]/90 border border-white/[0.08] grid grid-cols-2 gap-1 font-mono">
                <button
                  type="button"
                  onClick={() => {
                    setInviteTab('request');
                    setIsSubmitted(false);
                  }}
                  className={`py-2 px-3 rounded-lg text-center text-[12px] font-medium tracking-wide transition-all cursor-pointer ${
                    inviteTab === 'request'
                      ? 'bg-white/10 text-white shadow-sm border border-white/10'
                      : 'text-[#71717a] hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  Apply for Access
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInviteTab('founder');
                    setIsSubmitted(false);
                  }}
                  className={`py-2 px-3 rounded-lg text-center text-[12px] font-medium tracking-wide transition-all cursor-pointer ${
                    inviteTab === 'founder'
                      ? 'bg-white/10 text-white shadow-sm border border-white/10'
                      : 'text-[#71717a] hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  Contact Founder
                </button>
              </div>

              {/* TAB CONTENT 1: APPLY FOR ACCESS */}
              {inviteTab === 'request' && (
                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                  {/* Work Email or GitHub Handle */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center px-0.5">
                      <label className="font-mono text-[11px] uppercase tracking-wider text-[#d4d4d8]" htmlFor="invite-identity">
                        Work Email or GitHub Handle
                      </label>
                      <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/50 border border-emerald-500/20 px-1.5 py-0.5 rounded tracking-wide flex items-center gap-1">
                        <span className="size-1 rounded-full bg-emerald-400" />
                        <span>VERIFIED GATEWAY</span>
                      </span>
                    </div>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-[#71717a] flex items-center pointer-events-none">
                        <IdCard className="size-4" />
                      </span>
                      <input
                        id="invite-identity"
                        type="text"
                        required
                        disabled={isSubmitted}
                        value={identity}
                        onChange={(e) => setIdentity(e.target.value)}
                        placeholder="name@company.com or @handle"
                        className="w-full h-11 bg-[#09090b]/90 border border-white/10 rounded-lg pl-10 pr-24 font-mono text-sm text-white placeholder:text-[#71717a]/60 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                      />
                      <span className="absolute right-3 font-mono text-[10px] text-[#71717a]/80 bg-white/5 px-2 py-0.5 rounded border border-white/5 uppercase">
                        Required
                      </span>
                    </div>
                  </div>

                  {/* WhatsApp Mobile Number */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center px-0.5">
                      <label className="font-mono text-[11px] uppercase tracking-wider text-[#d4d4d8]" htmlFor="invite-phone">
                        WhatsApp Mobile Number
                      </label>
                      <span className="font-mono text-[10px] text-[#71717a] uppercase tracking-wider">
                        For Signal E2EE Keyring
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Country Code Pill Selector */}
                      <div className="relative shrink-0">
                        <select
                          aria-label="Country Code"
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="h-11 appearance-none bg-[#09090b]/90 border border-white/10 rounded-lg pl-3 pr-7 font-mono text-[12px] text-white focus:outline-none focus:border-white/30 cursor-pointer"
                        >
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+49">🇩🇪 +49</option>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+81">🇯🇵 +81</option>
                          <option value="+65">🇸🇬 +65</option>
                        </select>
                        <ChevronDown className="size-3.5 absolute right-2 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
                      </div>
                      {/* Phone Input */}
                      <div className="relative flex-1">
                        <input
                          id="invite-phone"
                          type="tel"
                          disabled={isSubmitted}
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="(555) 000-0000"
                          className="w-full h-11 bg-[#09090b]/90 border border-white/10 rounded-lg px-3.5 font-mono text-sm text-white placeholder:text-[#71717a]/60 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={`w-full h-12 rounded-full font-mono text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all mt-2 ${
                      isSubmitted
                        ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 cursor-default'
                        : isSubmitting
                        ? 'bg-white/80 text-black cursor-wait'
                        : 'bg-white text-black hover:bg-slate-100 hover:shadow-[0_0_24px_rgba(255,255,255,0.35)] active:scale-[0.99] cursor-pointer'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="size-3.5 border-2 border-black border-t-transparent animate-spin rounded-full inline-block mr-1" />
                        <span>Generating Ticket Key...</span>
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle2 className="size-4 text-emerald-400" />
                        <span>Key Dispatched</span>
                      </>
                    ) : (
                      <>
                        <span>Request Invitation Key</span>
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* TAB CONTENT 2: CONTACT FOUNDER */}
              {inviteTab === 'founder' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#09090b]/90 border border-white/10 space-y-3.5">
                    <div className="space-y-1">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 block font-semibold">
                        Priority Founder Access
                      </span>
                      <p className="text-white text-[13px] leading-relaxed">
                        Building production multi-agent tooling or running local Antigravity orchestrators? Ping the founder directly for instant bypass token provisioning:
                      </p>
                    </div>

                    {/* Founder Ticket Card */}
                    <div className="p-3 rounded-lg bg-[#18181b] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between gap-2 overflow-x-auto">
                        <div className="flex items-center gap-2">
                          <AtSign className="size-4 text-[#71717a]" />
                          <span className="font-mono text-sm text-white font-medium select-all">
                            ramanandv722@gmail.com
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20 uppercase font-semibold">
                          Lead Eng
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
                        <button
                          type="button"
                          onClick={copyFounderEmail}
                          className="h-9 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-xs text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          {copiedEmail ? (
                            <>
                              <Check className="size-3.5 text-emerald-400" />
                              <span className="text-emerald-400 font-semibold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="size-3.5 text-[#71717a]" />
                              <span>Copy Email</span>
                            </>
                          )}
                        </button>

                        <a
                          href="mailto:ramanandv722@gmail.com?subject=Weave%20Private%20Beta%20Access%20Request&body=Hi%20Ramanand%2C%0A%0AWe%20are%20building%20with%3A%20Weave%20Agent%0AOur%20workflow%20use-case%3A%20%0A%0AWhatsApp%20Number%20for%20pairing%3A%20"
                          className="h-9 rounded-lg bg-white text-black text-xs font-semibold flex items-center justify-center gap-1 hover:bg-slate-100 transition-colors shadow-xs"
                        >
                          <span>Direct Dispatch</span>
                          <ExternalLink className="size-3.5" />
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[#71717a] font-mono text-[11px] pt-1">
                      <Terminal className="size-3.5 text-emerald-400 shrink-0" />
                      <span>Direct email to Ramanand for immediate bypass key provisioning.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Success Toast Notification */}
              {isSubmitted && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center justify-between animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                    <span>Token assigned! SMS verification dispatched to WhatsApp.</span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold shrink-0">
                    PASS #85
                  </span>
                </div>
              )}

              {/* Bottom Ticker: Live Counter & E2EE Assurance */}
              <div className="pt-3 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-2 text-[#71717a] font-mono">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                  </span>
                  <span className="text-[11px] text-[#71717a] tracking-tight">
                    <strong className="font-medium text-white">84 engineers</strong> waiting in queue
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-white/70">
                  <ShieldCheck className="size-3.5 text-emerald-400" />
                  <span>Signal E2EE verified</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
