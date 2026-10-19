import React, { useState } from 'react';
import { ArrowRight, X, Check, Copy } from 'lucide-react';

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
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('ramanandv722@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const currentTask = TASKS.find(t => t.id === (hoveredTask || activeTask));

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col justify-between selection:bg-[#ff5100] selection:text-white px-6 sm:px-12 md:px-20 lg:px-28 py-10 sm:py-16 transition-colors duration-300 font-sans">
      
      {/* Top Header / Emblem */}
      <header className="w-full max-w-3xl mx-auto flex items-center pb-12 sm:pb-20">
        <a href="/" className="inline-flex items-center gap-3 group">
          {/* Weave custom woven companion emblem in dark mode */}
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

      {/* Minimalist Invite-Only Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-sans"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-[#121214] rounded-2xl border border-[#27272a] p-6 sm:p-8 shadow-2xl flex flex-col gap-6 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-[#71717a] hover:text-white hover:bg-[#27272a] transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>

            {/* Content */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#ff5100]" />
                <span className="text-xs font-semibold tracking-wider uppercase text-[#ff5100]">
                  Private Beta
                </span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Weave is invite only for now
              </h3>
              
              <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed">
                To get access, email us:
              </p>
            </div>

            {/* Email Box with One-Click Actions */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#18181b] border border-[#27272a]">
                <span className="font-mono text-sm sm:text-base text-white select-all">
                  ramanandv722@gmail.com
                </span>
                <button
                  onClick={copyEmail}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#27272a] hover:bg-[#3f3f46] text-white flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="size-3 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3 text-[#a1a1aa]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href="mailto:ramanandv722@gmail.com?subject=Weave%20Invite%20Access&body=Hi%2C%20I'd%20love%20to%20get%20access%20to%20Weave."
                className="w-full py-3 rounded-full bg-white text-[#09090b] hover:bg-[#ff5100] hover:text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Email Us</span>
                <ArrowRight className="size-4" />
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
