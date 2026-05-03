"use client";
import { ShieldCheck, ArrowRight, Shield, Zap, Lock, Code, CheckCircle, Activity, Briefcase, FileSearch, MessageSquare, GraduationCap, RefreshCw, Map, Search, Fingerprint, Rocket, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { type FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Scene3D from "@/components/Scene3D";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 20 } }
};

const stagger = {
  show: { transition: { staggerChildren: 0.1 } }
};

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.372.79 1.102.79 2.222v3.293c0 .317.222.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LeetCodeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.483 0a1.374 1.374 0 00-.961.55l-5.016 5.67a1.357 1.37 0 00-.273.457l-2.69 3.509a1.32 1.32 0 001.731 1.917l.001-.002 3.031-1.432v6.95a1.355 1.355 0 001.355 1.355h2.152a1.355 1.355 0 001.355-1.355V9.43L19.39 12.1a1.32 1.32 0 001.731-1.917l-2.69-3.51a1.357 1.37 0 00-.273-.457L13.483.55a1.374 1.374 0 00-.961-.55zM7.33 13.273a1.321 1.321 0 01-1.84.44l-4.17-2.757a1.32 1.32 0 01.127-2.19l4.17-2.757a1.321 1.321 0 011.84.44l.873 1.317a1.32 1.32 0 01-.44 1.84L6.155 10.36l1.735 1.144a1.32 1.32 0 01.44 1.84l-.873 1.317l.001-.001-.128-.188z" />
  </svg>
);

const CodeforcesIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 7.5a1.5 1.5 0 011.5 1.5v13.5a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 010 22.5V9A1.5 1.5 0 011.5 7.5h3zm9-7.5a1.5 1.5 0 011.5 1.5v21a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5V1.5A1.5 1.5 0 0110.5 0h3zm9 11.25a1.5 1.5 0 011.5 1.5v9.75a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-9.75a1.5 1.5 0 011.5-1.5h3z" />
  </svg>
);

const HuggingFaceIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const DevToIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V7.94h1.4c1.67 0 2.1.14 2.78.86.71.73.88 1.58.89 3.13 0 1.31-.13 2.01-.72 3.37zm5.05-2.1c-.06.19-.13.35-.17.35-.06 0-.07-.11-.04-.25.04-.18.1-.2.15-.05.03.09.05.02.06-.05 0-.09 0-.11-.1-.13-.1-.02-.11-.05-.03-.21.02-.05.05-.2.07-.33.02-.14.05-.3.07-.33.01-.03.13-.07.24-.07.13 0 .2.02.2.06 0 .03-.12.28-.26.56zm-1.21 1.45c0 .11-.03.15-.1.15-.15 0-.11-.15-.1-.15.11 0 .2.02.2.15zM12.1 12.7c0 .12-.11.23-.25.23-.14 0-.25-.11-.25-.23 0-.14.11-.25.25-.25.14 0 .25.11.25.25zm.42-7.22c-.15-.07-.29-.12-.46-.15-.15-.02-.41-.03-1.02-.03h-.62v5.48h.54c.58 0 .77-.01.95-.08.38-.15.71-.48.81-.86.05-.16.06-.9.06-2.25 0-1.39-.01-2.05-.08-2.22-.08-.37-.39-.73-.73-.86zM20.94 11.53c0 .79-.04 1.06-.22 1.33-.23.35-.61.39-3.41.39h-2.62v1.15c0 .72.01 1.2.03 1.52.03.33.1.6.14.6h1.35c.75 0 1.13-.04 1.33-.14.11-.05.2-.14.22-.25.04-.14.05-1.05.05-2.82V12.7h.39c.33 0 .39.02.39.15 0 .09 0 .12-.1.12h-.26v1.94c0 1.62-.01 2-.11 2.31-.14.43-.51.7-.94.71h-2.31c-.51-.01-.9-.17-1.1-.44-.1-.13-.15-.47-.15-1.32V10.6c0-.88.05-1.17.21-1.4.23-.34.6-.37 3.4-.37h2.62V7.7c0-.73-.01-1.2-.03-1.52-.03-.33-.1-.6-.14-.6h-1.35c-.75 0-1.13.04-1.33.14-.11.05-.2.14-.22.25-.04.14-.05 1.05-.05 2.82v1.92h-.39c-.33 0-.39-.02-.39-.15 0-.09 0-.12.1-.12h.26V8.5c0-1.62.01-2 .11-2.31.14-.43.51-.7.94-.71h2.31c.51.01.9.17 1.1.44.1.13.15.47.15 1.32v4.29z" />
  </svg>
);

const StackOverflowIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.986 21.865v-6.404h2.134V24H1.844v-8.539h2.13v6.404h15.012zM6.117 14.27l12.03 2.512.419-2.007-12.03-2.512-.419 2.007zm2.256-5.831l11.464 4.474.774-1.904-11.463-4.474-.775 1.904zm3.946-5.092l9.582 7.701 1.332-1.615-9.583-7.701-1.331 1.615zM18.013 0l-1.621 1.381 7.203 8.448 1.621-1.381L18.013 0zM5.145 18.454l12.153.064-.027-2.134-12.153-.064.027 2.134z" />
  </svg>
);

export default function Home() {
  const containerRef = useRef(null);
  const router = useRouter();
  const [githubUsername, setGithubUsername] = useState("");

  const handleAnalyze = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const username = githubUsername.trim();
    if (!username) {
      return;
    }

    router.push(`/dashboard?username=${encodeURIComponent(username)}`);
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-[#02040a] text-white selection:bg-accent-violet/30 overflow-x-hidden relative">
      <Scene3D />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#02040a_120%)] pointer-events-none z-10" />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto relative z-50 border-b border-white/5 backdrop-blur-xl bg-black/20 sticky top-0"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.4)]">
             <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-display font-black tracking-tight leading-none">SkillLens</span>
            <span className="text-[9px] font-mono text-gray-500 font-bold tracking-[0.2em] mt-1 uppercase opacity-60">v2.0_PLATFORM</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-gray-400">
          {["Product", "How It Works", "Features", "For Students", "For Colleges", "For Recruiters", "About"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase().replace(/ /g, "-")}`} className="hover:text-white transition-all relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#a855f7] transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <button className="px-6 py-2 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Login</button>
          <Link href="/dashboard" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-black text-[10px] uppercase tracking-widest shadow-[0_0_25px_rgba(124,58,237,0.3)] hover:scale-105 transition-transform active:scale-95">
            Analyze Profile →
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-20 max-w-7xl mx-auto px-10 pt-20 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/20 text-[#a855f7] text-[10px] font-black tracking-[0.1em] mb-10 backdrop-blur-md shadow-lg">
             <div className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse" />
             EVIDENCE-BASED. NOT JUST CLAIMS. REAL PROOF.
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-7xl md:text-8xl font-display font-black leading-[0.85] tracking-[-0.06em] uppercase mb-10">
            Verify Skills.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">Build Trust.</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-lg text-gray-400 leading-relaxed max-w-xl mb-12 font-medium">
            SkillLens analyzes your real coding footprint, separates signals from noise, and shows you <span className="text-[#a855f7] font-bold">exactly</span> where you stand for any role.
          </motion.p>

          <motion.form onSubmit={handleAnalyze} variants={fadeInUp} className="w-full max-w-md relative flex items-center gap-4 mb-8">
            <div className="flex-1 relative group">
               <GithubIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#a855f7] transition-colors" />
               <input 
                 type="text" 
                 placeholder="Enter your GitHub username" 
                 value={githubUsername}
                 onChange={(event) => setGithubUsername(event.target.value)}
                 className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-8 text-sm font-medium text-white placeholder-gray-600 focus:outline-none focus:border-[#a855f7]/50 focus:ring-4 focus:ring-[#a855f7]/10 transition-all backdrop-blur-xl"
               />
            </div>
            <button type="submit" className="px-8 py-5 rounded-2xl bg-[#581c87] hover:bg-[#6b21a8] text-white font-black text-xs uppercase tracking-widest shadow-[0_10px_30px_rgba(88,28,135,0.4)] transition-all active:scale-95 flex items-center gap-3">
               Analyze Now <ArrowRight className="w-4 h-4" />
            </button>
          </motion.form>

          <motion.div variants={fadeInUp} className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Real-time GitHub analysis:</span>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-6 border-t border-white/5">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white uppercase">Evidence-First</span>
                    <span className="text-[9px] text-gray-500">Real commit history</span>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-purple-400" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white uppercase">Latest 30 Commits</span>
                    <span className="text-[9px] text-gray-500">Per repository analyzed</span>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-blue-400" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white uppercase">Privacy Focused</span>
                    <span className="text-[9px] text-gray-500">100% public data only</span>
                 </div>
               </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Live Analysis Card */}
        <motion.div 
          initial={{ opacity: 0, x: 100, rotateY: -10 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="perspective-2000"
        >
          <div className="rounded-[32px] border border-white/10 bg-black/40 backdrop-blur-2xl p-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#a855f7] mb-4">Real Inputs Only</p>
            <h2 className="text-3xl font-display font-black tracking-tight mb-4">Analyze GitHub or upload a resume</h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              No sample profiles, no placeholder scores, no fake evidence. The dashboard and resume flow are driven by live GitHub and backend file parsing only.
            </p>

            <div className="space-y-4">
              <Link href="/dashboard" className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 hover:border-[#a855f7]/50 hover:bg-[#a855f7]/10 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-white">GitHub profile analysis</p>
                  <p className="text-xs text-gray-500">Enter a username and inspect real commits.</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#a855f7]" />
              </Link>
              <Link href="/upload" className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 hover:border-[#10b981]/50 hover:bg-[#10b981]/10 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-white">Resume upload</p>
                  <p className="text-xs text-gray-500">Upload PDF, DOCX, PPTX, TXT, or MD files.</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#10b981]" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 5-Column Feature Strip */}
      <section className="relative z-20 border-y border-white/5 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-10 py-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          {[
            { icon: GraduationCap, title: "Built for learners", desc: "Designed to help students prove skills and grow faster." },
            { icon: Search, title: "Transparent & Explainable", desc: "Every score is backed by clear, verifiable evidence." },
            { icon: Activity, title: "Role-Ready Insights", desc: "Know your gaps for any job and how to close them." },
            { icon: Map, title: "Actionable Roadmap", desc: "Get a personalized 4-week plan tailored to your goals." },
            { icon: RefreshCw, title: "Continuously Improving", desc: "We evolve with your feedback and new data signals." }
          ].map((feat, i) => (
            <div key={i} className="flex gap-4 items-start max-w-[200px]">
               <div className="w-10 h-10 rounded-full bg-[#1e1b4b] border border-white/10 flex items-center justify-center shrink-0 shadow-lg">
                  <feat.icon className="w-5 h-5 text-indigo-400" />
               </div>
               <div className="space-y-1">
                  <h4 className="text-[11px] font-black text-white leading-tight">{feat.title}</h4>
                  <p className="text-[9px] text-gray-500 font-medium leading-relaxed">{feat.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted Sources Strip */}
      <section className="relative z-20 py-20 text-center">
         <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mb-12">
            We use only <span className="text-[#a855f7]">public data</span> and proven signals from <span className="text-[#6366f1]">trusted sources</span>.
         </motion.p>
         <div className="max-w-6xl mx-auto px-10 flex flex-wrap justify-center items-center gap-x-20 gap-y-10 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
            <div className="flex items-center gap-3 font-display font-black tracking-tighter text-xl text-white">
               <GithubIcon className="w-7 h-7" /> GitHub
            </div>
            <div className="flex items-center gap-3 font-display font-black tracking-tighter text-xl hover:text-orange-500 transition-colors">
               <LeetCodeIcon className="w-7 h-7" /> LeetCode
            </div>
            <div className="flex items-center gap-3 font-display font-black tracking-tighter text-xl hover:text-blue-400 transition-colors">
               <CodeforcesIcon className="w-7 h-7" /> Codeforces
            </div>
            <div className="flex items-center gap-3 font-display font-black tracking-tighter text-xl hover:text-amber-400 transition-colors">
               <HuggingFaceIcon className="w-7 h-7" /> Hugging Face
            </div>
            <div className="flex items-center gap-3 font-display font-black tracking-tighter text-xl hover:text-gray-100 transition-colors">
               <DevToIcon className="w-7 h-7" /> Dev.to
            </div>
            <div className="flex items-center gap-3 font-display font-black tracking-tighter text-xl hover:text-orange-600 transition-colors">
               <StackOverflowIcon className="w-7 h-7" /> Stack Overflow
            </div>
         </div>
      </section>

      {/* Bottom 6 Glow Cards */}
      <section className="relative z-20 max-w-7xl mx-auto px-10 pb-48 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Evidence-Based Scoring", desc: "AI analyzes real engineering signals from GitHub and beyond.", icon: Activity, color: "hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]", border: "hover:border-[#10b981]/40", iconCol: "text-[#10b981]" },
            { title: "Credibility Fingerprint", desc: "See what you really know, what's exaggerated, and what you're missing.", icon: Fingerprint, color: "hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]", border: "hover:border-blue-500/40", iconCol: "text-blue-400" },
            { title: "JD Match & Gap Analysis", desc: "Match any job description and get a personalized gap breakdown.", icon: Briefcase, color: "hover:shadow-[0_0_40px_rgba(124,58,237,0.15)]", border: "hover:border-[#a855f7]/40", iconCol: "text-[#a855f7]" },
            { title: "Actionable Roadmap", desc: "Get a 4-week action plan with projects, milestones and resources.", icon: Rocket, color: "hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]", border: "hover:border-amber-500/40", iconCol: "text-amber-500" },
            { title: "Mentor Guidance", desc: "Learn from alumni who've been there. Real stories, real advice.", icon: MessageSquare, color: "hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]", border: "hover:border-cyan-500/40", iconCol: "text-cyan-400" },
            { title: "Share & Verify", desc: "Share your verified profile or certificates with anyone, anywhere.", icon: ShieldCheck, color: "hover:shadow-[0_0_40px_rgba(236,72,153,0.15)]", border: "hover:border-pink-500/40", iconCol: "text-pink-400" }
          ].map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`p-10 rounded-3xl border border-white/5 bg-[#05070a]/60 backdrop-blur-xl transition-all duration-500 ${card.color} ${card.border} group`}
            >
              <card.icon className={`w-12 h-12 ${card.iconCol} mb-8 group-hover:scale-110 transition-transform duration-500`} />
              <h3 className="text-xl font-display font-black tracking-tight uppercase mb-4 text-white group-hover:text-white transition-colors">{card.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium mb-10">{card.desc}</p>
              <button className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] ${card.iconCol} opacity-60 group-hover:opacity-100 transition-opacity`}>
                 Explore <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 py-32 bg-black border-t border-white/5 overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(124,58,237,0.05),transparent_70%)] pointer-events-none" />
         <div className="max-w-7xl mx-auto px-10 relative flex flex-col items-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.1 }} className="text-[12vw] font-display font-black tracking-[-0.1em] italic leading-none mb-32 select-none">
               TEAM VOID
            </motion.div>
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-12 pt-20 border-t border-white/10">
               <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#a855f7] shadow-[0_0_20px_rgba(168,85,247,0.5)]" />
                  <span className="text-xl font-display font-black italic">SkillLens</span>
               </div>
               <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                  <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
                  <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                  <Link href="#" className="hover:text-white transition-colors">Discord</Link>
                  <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
               </div>
            </div>
         </div>
      </footer>
    </main>
  );
}
