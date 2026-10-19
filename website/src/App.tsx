import React, { useState } from 'react';
import { ArrowRight, Download, X, QrCode, Laptop, Check, Terminal, Copy, CheckCircle2, Monitor, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

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
  const [downloadTab, setDownloadTab] = useState<'linux' | 'mac' | 'windows' | 'qr'>('linux');
  const [detectedOS, setDetectedOS] = useState<'linux' | 'mac' | 'windows'>('linux');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLinuxCmd, setCopiedLinuxCmd] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState<string | null>(null);

  const detectOS = (): 'linux' | 'mac' | 'windows' => {
    if (typeof window === 'undefined') return 'linux';
    const ua = navigator.userAgent.toLowerCase();
    const platform = (navigator as any).userAgentData?.platform?.toLowerCase() || navigator.platform?.toLowerCase() || '';
    if (ua.includes('linux') || platform.includes('linux') || ua.includes('x11')) return 'linux';
    if (ua.includes('win') || platform.includes('win')) return 'windows';
    if (ua.includes('mac') || platform.includes('mac') || platform.includes('darwin')) return 'mac';
    return 'linux';
  };

  const openDownloadModal = () => {
    const os = detectOS();
    setDetectedOS(os);
    setDownloadTab(os);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ff5100', '#ffffff', '#34d399', '#f97316']
    });
    setIsModalOpen(true);
  };

  const handleDownload = (filename: string) => {
    setDownloadStarted(filename);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ff5100', '#22c55e', '#ffffff']
    });
    setTimeout(() => setDownloadStarted(null), 5000);
  };

  const copyQuickInstall = () => {
    navigator.clipboard.writeText('npm i -g weave-agent');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyLinuxCmd = () => {
    navigator.clipboard.writeText('chmod +x Weave.AppImage && ./Weave.AppImage');
    setCopiedLinuxCmd(true);
    setTimeout(() => setCopiedLinuxCmd(false), 2000);
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

        {/* Primary Call to Action Button (Crisp White on Black with Orange Hover) */}
        <div className="pt-2 sm:pt-4">
          <button
            onClick={openDownloadModal}
            className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white text-[#09090b] hover:bg-[#ff5100] hover:text-white text-base sm:text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-98"
          >
            <span>Get Weave</span>
            <ArrowRight className="size-4 sm:size-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex flex-wrap items-center gap-4 pt-3 text-xs sm:text-sm text-[#71717a]">
            <span>✓ 100% Free</span>
            <span>•</span>
            <span>✓ Runs privately on your laptop</span>
            <span>•</span>
            <span>✓ Pairs with WhatsApp in 1 scan</span>
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
            onClick={openDownloadModal}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Download
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
            href="mailto:hello@weave.run"
            className="hover:text-white transition-colors"
          >
            hello@weave.run
          </a>
        </nav>
      </footer>

      {/* 1-Click Multi-Platform Download Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-sans">
          <div
            className="relative w-full max-w-lg bg-[#121214] rounded-3xl border border-[#27272a] p-6 sm:p-7 shadow-2xl flex flex-col gap-5 text-white max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-[#71717a] hover:text-white hover:bg-[#27272a] transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col gap-1.5 pr-8">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#ff5100]" />
                <span className="text-xs font-semibold tracking-wider uppercase text-[#ff5100]">
                  Get Weave // Desktop &amp; CLI
                </span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white">
                Set up in 60 seconds
              </h3>
              <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
                Download Weave for Linux, macOS, or Windows PC. Link WhatsApp with a quick scan, and your assistant is ready to help.
              </p>
            </div>

            {/* Platform Selector Tabs */}
            <div className="flex rounded-xl bg-[#1c1c1f] p-1 text-xs font-medium">
              <button
                onClick={() => setDownloadTab('linux')}
                className={`flex-1 py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  downloadTab === 'linux'
                    ? 'bg-[#27272a] text-white shadow-xs font-semibold'
                    : 'text-[#a1a1aa] hover:text-white'
                }`}
              >
                <span>Linux</span>
                {detectedOS === 'linux' && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#ff5100]/20 text-[#ff5100] border border-[#ff5100]/30 font-bold">
                    Detected
                  </span>
                )}
              </button>
              <button
                onClick={() => setDownloadTab('mac')}
                className={`flex-1 py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  downloadTab === 'mac'
                    ? 'bg-[#27272a] text-white shadow-xs font-semibold'
                    : 'text-[#a1a1aa] hover:text-white'
                }`}
              >
                <span>macOS</span>
                {detectedOS === 'mac' && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#ff5100]/20 text-[#ff5100] border border-[#ff5100]/30 font-bold">
                    Detected
                  </span>
                )}
              </button>
              <button
                onClick={() => setDownloadTab('windows')}
                className={`flex-1 py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  downloadTab === 'windows'
                    ? 'bg-[#27272a] text-white shadow-xs font-semibold'
                    : 'text-[#a1a1aa] hover:text-white'
                }`}
              >
                <span>Windows</span>
                {detectedOS === 'windows' && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#ff5100]/20 text-[#ff5100] border border-[#ff5100]/30 font-bold">
                    Detected
                  </span>
                )}
              </button>
              <button
                onClick={() => setDownloadTab('qr')}
                className={`flex-1 py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  downloadTab === 'qr'
                    ? 'bg-[#27272a] text-white shadow-xs font-semibold'
                    : 'text-[#a1a1aa] hover:text-white'
                }`}
              >
                <QrCode className="size-3.5" />
                <span>Pair Phone</span>
              </button>
            </div>

            {/* Download started alert banner */}
            {downloadStarted && (
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs animate-fadeIn">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
                <span>Downloading <strong>{downloadStarted}</strong>! Check your browser downloads folder.</span>
              </div>
            )}

            {/* Tab Contents: LINUX */}
            {downloadTab === 'linux' && (
              <div className="flex flex-col gap-3">
                <a
                  href="https://github.com/darthnihilus01/weave/releases/download/Downloadables/Weave.AppImage"
                  download="Weave.AppImage"
                  onClick={() => handleDownload('Weave.AppImage')}
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#18181b] border border-[#27272a] hover:border-[#ff5100] hover:shadow-sm transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Terminal className="size-5 text-[#ff5100]" />
                    <div className="text-left">
                      <div className="text-sm font-semibold text-white flex items-center gap-2">
                        <span>Weave for Linux (AppImage)</span>
                        <span className="text-[10px] bg-[#ff5100]/20 text-[#ff5100] px-2 py-0.5 rounded-full font-bold">
                          Recommended
                        </span>
                      </div>
                      <div className="text-xs text-[#a1a1aa]">
                        Universal x86_64 standalone binary (.AppImage) • 129 MB
                      </div>
                    </div>
                  </div>
                  <Download className="size-4 text-[#a1a1aa] group-hover:text-[#ff5100] group-hover:translate-y-0.5 transition-all" />
                </a>

                {/* Linux Terminal One-Liner */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#1c1c1f] border border-[#27272a] text-xs font-mono">
                  <div className="flex items-center gap-2 overflow-x-auto text-[#d4d4d8]">
                    <span className="text-[#ff5100] select-none">$</span>
                    <span className="truncate">chmod +x Weave.AppImage &amp;&amp; ./Weave.AppImage</span>
                  </div>
                  <button
                    onClick={copyLinuxCmd}
                    className="ml-2 px-2.5 py-1 rounded bg-[#27272a] hover:bg-[#3f3f46] text-white flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                  >
                    {copiedLinuxCmd ? (
                      <>
                        <Check className="size-3 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold text-[11px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3 text-[#ff5100]" />
                        <span className="text-[11px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href="https://github.com/darthnihilus01/weave/releases/download/Downloadables/Weave-Linux.AppImage"
                  download="Weave-Linux.AppImage"
                  onClick={() => handleDownload('Weave-Linux.AppImage')}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-[#ff5100] transition-all text-xs text-[#a1a1aa] hover:text-white"
                >
                  <span>Alternative Mirror (Weave-Linux.AppImage)</span>
                  <Download className="size-3.5" />
                </a>
              </div>
            )}

            {/* Tab Contents: MACOS */}
            {downloadTab === 'mac' && (
              <div className="flex flex-col gap-3">
                <a
                  href="https://github.com/darthnihilus01/weave/releases/download/Downloadables/Weave.dmg"
                  download="Weave.dmg"
                  onClick={() => handleDownload('Weave.dmg')}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#18181b] border border-[#27272a] hover:border-[#ff5100] hover:shadow-sm transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Laptop className="size-5 text-[#ff5100]" />
                    <div className="text-left">
                      <div className="text-sm font-semibold text-white">
                        Apple Silicon Mac
                      </div>
                      <div className="text-xs text-[#a1a1aa]">M1, M2, M3, M4 (.dmg) • 150 MB</div>
                    </div>
                  </div>
                  <Download className="size-4 text-[#a1a1aa] group-hover:text-[#ff5100] group-hover:translate-y-0.5 transition-all" />
                </a>

                <a
                  href="https://github.com/darthnihilus01/weave/releases/download/Downloadables/Weave-macOS.zip"
                  download="Weave-macOS.zip"
                  onClick={() => handleDownload('Weave-macOS.zip')}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#18181b] border border-[#27272a] hover:border-[#ff5100] hover:shadow-sm transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Laptop className="size-5 text-[#a1a1aa]" />
                    <div className="text-left">
                      <div className="text-sm font-semibold text-white">
                        Intel Mac / Universal ZIP
                      </div>
                      <div className="text-xs text-[#a1a1aa]">Legacy Intel &amp; Portable (.zip) • 150 MB</div>
                    </div>
                  </div>
                  <Download className="size-4 text-[#a1a1aa] group-hover:text-[#ff5100] group-hover:translate-y-0.5 transition-all" />
                </a>
              </div>
            )}

            {/* Tab Contents: WINDOWS */}
            {downloadTab === 'windows' && (
              <div className="flex flex-col gap-3">
                <a
                  href="https://github.com/darthnihilus01/weave/releases/download/Downloadables/Weave.exe"
                  download="Weave.exe"
                  onClick={() => handleDownload('Weave.exe')}
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#18181b] border border-[#27272a] hover:border-[#ff5100] hover:shadow-sm transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Monitor className="size-5 text-[#ff5100]" />
                    <div className="text-left">
                      <div className="text-sm font-semibold text-white">
                        Windows 10 / 11 Installer
                      </div>
                      <div className="text-xs text-[#a1a1aa]">Standard 64-bit installer (.exe) • 246 MB</div>
                    </div>
                  </div>
                  <Download className="size-4 text-[#a1a1aa] group-hover:text-[#ff5100] group-hover:translate-y-0.5 transition-all" />
                </a>

                <a
                  href="https://github.com/darthnihilus01/weave/releases/download/Downloadables/Weave-Windows-x64.zip"
                  download="Weave-Windows-x64.zip"
                  onClick={() => handleDownload('Weave-Windows-x64.zip')}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#18181b] border border-[#27272a] hover:border-[#ff5100] transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Monitor className="size-5 text-[#a1a1aa]" />
                    <div className="text-left">
                      <div className="text-sm font-semibold text-white">
                        Windows Portable ZIP
                      </div>
                      <div className="text-xs text-[#a1a1aa]">No installation required (.zip) • 181 MB</div>
                    </div>
                  </div>
                  <Download className="size-4 text-[#a1a1aa] group-hover:text-[#ff5100] group-hover:translate-y-0.5 transition-all" />
                </a>
              </div>
            )}

            {/* Tab Contents: PAIR PHONE */}
            {downloadTab === 'qr' && (
              <div className="flex flex-col gap-4 p-4 rounded-2xl bg-[#18181b] border border-[#27272a]">
                <div className="flex items-center gap-4">
                  <div className="size-24 bg-white rounded-xl flex items-center justify-center p-2 shrink-0">
                    <QrCode className="size-20 text-black" />
                  </div>
                  <div className="text-xs text-[#a1a1aa] space-y-2">
                    <div className="font-semibold text-white text-sm">How to pair WhatsApp:</div>
                    <ol className="list-decimal list-inside space-y-1 text-[#d4d4d8]">
                      <li>Open WhatsApp on your phone</li>
                      <li>Go to <strong>Linked Devices</strong></li>
                      <li>Tap <strong>Link a Device</strong> and scan the QR code on your PC screen</li>
                    </ol>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-[#27272a] text-[11px] text-[#71717a]">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  <span>End-to-end encrypted • Runs 100% locally on your computer</span>
                </div>
              </div>
            )}

            {/* Quick terminal install note & Releases link */}
            <div className="pt-2 border-t border-[#27272a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#71717a]">
              <div className="flex items-center gap-2">
                <span>CLI:</span>
                <button
                  onClick={copyQuickInstall}
                  className="font-mono bg-[#18181b] text-white px-2.5 py-1 rounded border border-[#27272a] hover:border-[#ff5100] flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  {copiedCode ? (
                    <>
                      <Check className="size-3 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold text-[11px]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <span className="text-[#ff5100]">$</span>
                      <span>npm i -g weave-agent</span>
                      <Copy className="size-3 text-[#71717a] ml-1" />
                    </>
                  )}
                </button>
              </div>

              <a
                href="https://github.com/darthnihilus01/weave/releases/tag/Downloadables"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1 text-[11px]"
              >
                <span>All release assets</span>
                <ExternalLink className="size-3" />
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
