import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  X,
  Check,
  Copy,
  AtSign,
  ShieldCheck,
  ChevronDown,
  Terminal,
  CheckCircle2,
  ArrowUpRight,
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

  // Modal Interactive States
  const [activeTab, setActiveTab] = useState<'request' | 'founder'>('request');
  const [identity, setIdentity] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('');
  const [runtimeTarget, setRuntimeTarget] = useState<'antigravity' | 'gemini'>('antigravity');
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

      {/* Stitch-Engineered "Invite Only" Capsule Pass Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-2xl animate-fade-in font-sans overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Glass Capsule Ticket Container */}
          <div
            className="relative w-full max-w-[580px] my-auto rounded-2xl bg-[#0e0e12]/95 backdrop-blur-2xl border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(16,185,129,0.06)] overflow-hidden transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Soft Emerald Neon Glow Accent Aura */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-32 bg-emerald-500/10 blur-[60px] pointer-events-none rounded-full" />

            {/* Top Bar: Monospace Ticket Badge with Live Status Beacon */}
            <div className="px-5 py-3.5 bg-white/[0.02] border-b border-white/[0.08] flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/25">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  </span>
                  <span className="font-mono text-[11px] font-medium tracking-widest text-emerald-300/90 uppercase">
                    ACCESS PASS // BATCH #14
                  </span>
                </div>
                <span className="hidden sm:inline-block font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
                  GATEWAY: LIVE
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-zinc-400/60 px-1.5 py-0.5 rounded border border-white/5 hidden sm:inline-block">
                  ESC
                </span>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-zinc-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/5 cursor-pointer"
                  title="Close modal"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Modal Capsule Body */}
            <div className="p-6 sm:p-7 space-y-5 relative z-10 text-left">
              {/* Headline & Punchy Subtitle */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-xs bg-white inline-block" />
                  <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                    Private Beta Access Protocol
                  </span>
                </div>
                <h2 className="text-[26px] sm:text-[30px] leading-tight text-white font-semibold tracking-tight">
                  Weave is invite-only for now
                </h2>
                <p className="text-zinc-400 text-[13px] sm:text-[14px] leading-relaxed">
                  Connect WhatsApp directly to your local runtime. Deploying weekly tranches to preserve latency and verifiable cryptographic peer pairing.
                </p>
              </div>

              {/* Direct Interactive Toggle Switcher */}
              <div className="p-1 rounded-xl bg-[#09090b]/90 border border-white/[0.08] grid grid-cols-2 gap-1">
                <button
                  type="button"
                  onClick={() => { setActiveTab('request'); setIsSubmitted(false); }}
                  className={`py-2 px-3 rounded-lg text-center font-mono text-[12px] font-medium tracking-wide transition-all cursor-pointer ${
                    activeTab === 'request'
                      ? 'bg-white/10 text-white shadow-xs border border-white/10'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  Apply for Access
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('founder')}
                  className={`py-2 px-3 rounded-lg text-center font-mono text-[12px] font-medium tracking-wide transition-all cursor-pointer ${
                    activeTab === 'founder'
                      ? 'bg-white/10 text-white shadow-xs border border-white/10'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  Contact Founder
                </button>
              </div>

              {/* TAB 1: APPLY FOR ACCESS */}
              {activeTab === 'request' && (
                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                  {/* Segmented Work Email or GitHub with Validation Badge */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center px-0.5">
                      <label htmlFor="invite-identity" className="font-mono text-[11px] uppercase tracking-wider text-zinc-200">
                        Work Email or GitHub Handle
                      </label>
                      <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/50 border border-emerald-500/20 px-1.5 py-0.5 rounded tracking-wide flex items-center gap-1">
                        <span className="size-1 rounded-full bg-emerald-400" /> VERIFIED GATEWAY
                      </span>
                    </div>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-zinc-400 flex items-center pointer-events-none">
                        <AtSign className="size-4" />
                      </span>
                      <input
                        id="invite-identity"
                        type="text"
                        required
                        disabled={isSubmitted}
                        value={identity}
                        onChange={(e) => setIdentity(e.target.value)}
                        placeholder="name@company.com or @handle"
                        className="w-full h-11 bg-[#09090b]/90 border border-white/10 rounded-lg pl-10 pr-24 font-mono text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all disabled:opacity-60"
                      />
                      <span className="absolute right-3 font-mono text-[10px] text-zinc-400/80 bg-white/5 px-2 py-0.5 rounded border border-white/5 uppercase">
                        Required
                      </span>
                    </div>
                  </div>

                  {/* WhatsApp Number with Country Code */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center px-0.5">
                      <label htmlFor="invite-phone" className="font-mono text-[11px] uppercase tracking-wider text-zinc-200">
                        WhatsApp Mobile Number
                      </label>
                      <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                        For Signal E2EE Keyring
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative shrink-0">
                        <select
                          aria-label="Country Code"
                          value={countryCode}
                          disabled={isSubmitted}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="h-11 appearance-none bg-[#09090b]/90 border border-white/10 rounded-lg pl-3 pr-7 font-mono text-[12px] text-white focus:outline-none focus:border-white/30 cursor-pointer disabled:opacity-60"
                        >
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+49">🇩🇪 +49</option>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+81">🇯🇵 +81</option>
                          <option value="+65">🇸🇬 +65</option>
                        </select>
                        <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 size-3.5 text-zinc-400 pointer-events-none" />
                      </div>
                      <div className="relative flex-1">
                        <input
                          id="invite-phone"
                          type="tel"
                          disabled={isSubmitted}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(555) 000-0000"
                          className="w-full h-11 bg-[#09090b]/90 border border-white/10 rounded-lg px-3.5 font-mono text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all disabled:opacity-60"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Primary Runtime Target Cards */}
                  <div className="space-y-1.5 pt-0.5">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 px-0.5">
                      Primary Runtime Target
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {/* Card 1: Antigravity CLI */}
                      <label
                        onClick={() => !isSubmitted && setRuntimeTarget('antigravity')}
                        className={`runtime-card group relative flex items-start gap-3 p-3 rounded-xl bg-[#09090b]/90 border cursor-pointer transition-all select-none ${
                          runtimeTarget === 'antigravity'
                            ? 'border-white/20 ring-1 ring-white/10'
                            : 'border-white/5 hover:border-white/20'
                        }`}
                      >
                        <input
                          type="radio"
                          name="target-model"
                          value="antigravity"
                          checked={runtimeTarget === 'antigravity'}
                          onChange={() => setRuntimeTarget('antigravity')}
                          className="sr-only"
                        />
                        <div className={`size-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          runtimeTarget === 'antigravity' ? 'border-emerald-400 bg-emerald-400/20' : 'border-white/30'
                        }`}>
                          {runtimeTarget === 'antigravity' && <div className="size-2 rounded-full bg-emerald-400" />}
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[12px] font-semibold text-white">Local CLI</span>
                            <span className="font-mono text-[9px] px-1 py-0.5 rounded bg-white/10 text-white/80 uppercase">
                              Offline
                            </span>
                          </div>
                          <p className="font-mono text-[11px] text-zinc-400 leading-tight">
                            Antigravity daemon (Zero cloud)
                          </p>
                        </div>
                      </label>

                      {/* Card 2: Cloud API */}
                      <label
                        onClick={() => !isSubmitted && setRuntimeTarget('gemini')}
                        className={`runtime-card group relative flex items-start gap-3 p-3 rounded-xl bg-[#09090b]/90 border cursor-pointer transition-all select-none ${
                          runtimeTarget === 'gemini'
                            ? 'border-white/20 ring-1 ring-white/10'
                            : 'border-white/5 hover:border-white/20'
                        }`}
                      >
                        <input
                          type="radio"
                          name="target-model"
                          value="gemini"
                          checked={runtimeTarget === 'gemini'}
                          onChange={() => setRuntimeTarget('gemini')}
                          className="sr-only"
                        />
                        <div className={`size-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          runtimeTarget === 'gemini' ? 'border-emerald-400 bg-emerald-400/20' : 'border-white/30'
                        }`}>
                          {runtimeTarget === 'gemini' && <div className="size-2 rounded-full bg-emerald-400" />}
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[12px] font-semibold text-white">Cloud API</span>
                            <span className="font-mono text-[9px] px-1 py-0.5 rounded bg-emerald-500/10 text-emerald-400 uppercase">
                              Fast
                            </span>
                          </div>
                          <p className="font-mono text-[11px] text-zinc-400 leading-tight">
                            Gemini 2.5 Flash hybrid pipeline
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  {isSubmitted ? (
                    <div className="w-full h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-sm font-semibold tracking-wide flex items-center justify-center gap-2 cursor-default">
                      <CheckCircle2 className="size-4 text-emerald-400" />
                      <span>Key Dispatched</span>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-full bg-white text-[#09090b] font-mono text-sm font-semibold tracking-wide flex items-center justify-center gap-2 hover:bg-slate-100 hover:shadow-[0_0_24px_rgba(255,255,255,0.35)] active:scale-[0.99] transition-all cursor-pointer mt-1"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          <span>Generating Ticket Key...</span>
                        </>
                      ) : (
                        <>
                          <span>Request Invitation Key</span>
                          <ArrowRight className="size-4 font-bold" />
                        </>
                      )}
                    </button>
                  )}

                  {/* Success Toast */}
                  {isSubmitted && (
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center justify-between animate-fadeIn">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                        <span>Token assigned! SMS verification dispatched to WhatsApp.</span>
                      </div>
                      <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 shrink-0">
                        PASS #85
                      </span>
                    </div>
                  )}
                </form>
              )}

              {/* TAB 2: CONTACT FOUNDER */}
              {activeTab === 'founder' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#09090b]/90 border border-white/10 space-y-3.5">
                    <div className="space-y-1">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 block">
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
                          <AtSign className="size-4 text-zinc-400" />
                          <span className="font-mono text-sm text-white font-medium select-all">
                            ramanandv722@gmail.com
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20 uppercase shrink-0">
                          Lead Eng
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={copyFounderEmail}
                          className="h-9 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 font-mono text-xs text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          {copiedFounderEmail ? (
                            <>
                              <Check className="size-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="size-3.5 text-zinc-400" />
                              <span>Copy Email</span>
                            </>
                          )}
                        </button>

                        <a
                          href="mailto:ramanandv722@gmail.com?subject=Weave%20Private%20Beta%20Access%20Request&body=Hi%20Ramanand%2C%0A%0AWe%20are%20building%20with%3A%20%5BAntigravity%20CLI%20%2F%20Gemini%202.5%20Flash%5D%0AOur%20workflow%20use-case%3A%20%0A%0AWhatsApp%20Number%20for%20pairing%3A%20"
                          className="h-9 rounded-lg bg-white text-[#09090b] font-mono text-xs font-semibold flex items-center justify-center gap-1 hover:bg-slate-100 transition-colors shadow-xs"
                        >
                          <span>Direct Dispatch</span>
                          <ArrowUpRight className="size-3.5" />
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-zinc-400 font-mono text-[11px] pt-1">
                      <Terminal className="size-3.5 text-emerald-400 shrink-0" />
                      <span>Include your deployment target (Antigravity CLI or Gemini) for immediate response.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Ticker: Live Counter & E2EE Assurance */}
              <div className="pt-3 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-2 text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                  </span>
                  <span className="font-mono text-[11px] text-zinc-400 tracking-tight">
                    <strong className="font-medium text-white">84 engineers</strong> waiting in queue
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-white/70">
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
