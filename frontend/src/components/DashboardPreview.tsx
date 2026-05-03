"use client";
import { ShieldCheck, AlertTriangle, Hexagon, TrendingUp } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { MouseEvent, useRef, useState, useEffect } from "react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.372.79 1.102.79 2.222v3.293c0 .317.222.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

export default function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<string[]>([]);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useMotionTemplate`${mouseYSpring}deg`;
  const rotateY = useMotionTemplate`${mouseXSpring}deg`;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) * 15;
    const mouseY = (e.clientY - rect.top) * 15;
    x.set(mouseX / width - 7.5);
    y.set((mouseY / height - 7.5) * -1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Terminal Animation
  useEffect(() => {
    const fullLines = [
      "> Initializing SkillLens Engine...",
      "> Fetching GitHub metadata...",
      "> Repositories scanned: 24",
      "> Analyzing code signals...",
      "> Detecting skills...",
      "> Verifying claims...",
      "> Calculating Trust Score...",
      "> Generating credibility fingerprint...",
      "> Preparing insights...",
      "> Analysis complete! ✓"
    ];

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < fullLines.length) {
        setLines(prev => [...prev, fullLines[currentLine]]);
        setProgress(Math.floor(((currentLine + 1) / fullLines.length) * 100));
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full max-w-[700px] mx-auto rounded-[32px] border border-purple-500/20 bg-[#0B0D17]/80 backdrop-blur-3xl shadow-[0_0_50px_rgba(124,58,237,0.15)] overflow-hidden p-8 font-body"
    >
      {/* Background Gradient */}
      <div style={{ transform: "translateZ(-30px)" }} className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none" />

      {/* Card Title Bar */}
      <div className="flex items-center gap-3 mb-8" style={{ transform: "translateZ(10px)" }}>
        <div className="w-3 h-3 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
        <span className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase">LIVE ANALYSIS</span>
      </div>

      {/* Main Grid: Terminal + Trust Score */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
        {/* Terminal Block */}
        <div 
          className="lg:col-span-3 rounded-2xl border border-white/5 bg-black/40 p-6 flex flex-col justify-between shadow-inner h-[220px]"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="font-mono text-[10px] leading-relaxed text-gray-400 overflow-hidden">
            <AnimatePresence>
              {lines.map((line, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={line && line.includes("complete!") ? "text-[#10b981] font-bold" : line && line.includes("scanned") ? "text-white" : ""}
                >
                  {line}
                </motion.div>
              ))}
            </AnimatePresence>
            {progress < 100 && (
              <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1.5 h-3 bg-white mt-1 inline-block" />
            )}
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center text-[10px] text-gray-500 mb-2 font-mono">
              <span>{progress}% Complete</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>
        </div>

        {/* Trust Score Ring */}
        <div 
          className="lg:col-span-2 flex flex-col items-center justify-center relative py-4"
          style={{ transform: "translateZ(60px)" }}
        >
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Trust Score</h3>
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="none" />
              <motion.circle 
                cx="50" cy="50" r="44" 
                stroke="url(#lens-gradient)" 
                strokeWidth="6" fill="none" 
                strokeDasharray="276.46" 
                initial={{ strokeDashoffset: 276.46 }}
                animate={{ strokeDashoffset: progress === 100 ? 77.41 : 276.46 - (276.46 * (progress * 0.72) / 100) }}
                transition={{ duration: 0.8, type: "spring" as const }}
                strokeLinecap="round" 
              />
              <defs>
                <linearGradient id="lens-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <motion.span className="text-6xl font-display font-black text-white tracking-tight">
                {Math.floor((progress / 100) * 72)}
              </motion.span>
              <span className="text-[10px] text-gray-500 font-bold tracking-widest mt-[-5px]">/100</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[10px] font-black text-[#10b981] bg-[#10b981]/10 px-2 py-1 rounded-full border border-[#10b981]/20">
             <TrendingUp className="w-3 h-3" /> 18 <span className="text-gray-500 font-medium">vs last month</span>
          </div>
        </div>
      </div>

      {/* Metric Boxes Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ transform: "translateZ(20px)" }}>
        <div className="rounded-2xl border border-[#10b981]/20 bg-[#10b981]/5 p-4 flex flex-col items-center group hover:bg-[#10b981]/10 transition-colors">
          <div className="flex items-center gap-2 text-[#10b981] mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[9px] font-black uppercase tracking-wider">Verified Skills</span>
          </div>
          <span className="text-3xl font-black text-white">{progress === 100 ? 8 : 0}</span>
          <span className="text-[9px] text-gray-500 font-bold mt-1">Strong evidence</span>
        </div>

        <div className="rounded-2xl border-[#ef4444]/20 bg-[#ef4444]/5 border p-4 flex flex-col items-center group hover:bg-[#ef4444]/10 transition-colors">
          <div className="flex items-center gap-2 text-[#ef4444] mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-[9px] font-black uppercase tracking-wider">Soft Claims</span>
          </div>
          <span className="text-3xl font-black text-white">{progress === 100 ? 3 : 0}</span>
          <span className="text-[9px] text-gray-500 font-bold mt-1">Low or no proof</span>
        </div>

        <div className="rounded-2xl border-[#a855f7]/20 bg-[#a855f7]/5 border p-4 flex flex-col items-center group hover:bg-[#a855f7]/10 transition-colors">
          <div className="flex items-center gap-2 text-[#a855f7] mb-2">
            <Hexagon className="w-4 h-4" />
            <span className="text-[9px] font-black uppercase tracking-wider">Hidden Strengths</span>
          </div>
          <span className="text-3xl font-black text-white">{progress === 100 ? 4 : 0}</span>
          <span className="text-[9px] text-gray-500 font-bold mt-1">Not in resume</span>
        </div>

        <div className="rounded-2xl border-[#f59e0b]/20 bg-[#f59e0b]/5 border p-4 flex flex-col items-center group hover:bg-[#f59e0b]/10 transition-colors">
          <div className="flex items-center gap-2 text-[#f59e0b] mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-[9px] font-black uppercase tracking-wider">Emerging Skills</span>
          </div>
          <span className="text-3xl font-black text-white">{progress === 100 ? 2 : 0}</span>
          <span className="text-[9px] text-gray-500 font-bold mt-1">Early signals</span>
        </div>
      </div>
    </motion.div>
  );
}
