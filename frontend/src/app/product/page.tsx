"use client";
import PublicLayout from "@/components/PublicLayout";
import { Zap, Shield, BarChart, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductPage() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const item = { hidden: { opacity: 0, y: 30, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 100 } } };

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-8 py-32 space-y-24 relative">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-[500px] bg-accent-violet/10 blur-[150px] rounded-full pointer-events-none z-[-1]" />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-display font-bold tracking-tight">The Science of <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-violet to-accent-violet-light drop-shadow-[0_0_20px_rgba(124,58,237,0.5)]">Skill Verification.</span></h1>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto font-light">
            SkillLens isn't another portfolio builder. It's a precision instrument designed to measure, verify, and prove engineering depth with absolute certainty.
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={item} className="p-10 rounded-3xl border border-white/5 bg-surface-card/40 backdrop-blur-xl space-y-6 shadow-2xl hover:border-white/10 hover:bg-surface-card/60 transition-all duration-500 group transform-gpu hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-accent-violet/10 flex items-center justify-center border border-accent-violet/20 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]">
              <Zap className="w-8 h-8 text-accent-violet-light" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Instant Analysis</h3>
            <p className="text-gray-400 text-base leading-relaxed group-hover:text-gray-300 transition-colors">
              Connect your GitHub and get a comprehensive skill profile in under 8 seconds. No manual data entry required.
            </p>
          </motion.div>
          <motion.div variants={item} className="p-10 rounded-3xl border border-white/5 bg-surface-card/40 backdrop-blur-xl space-y-6 shadow-2xl hover:border-white/10 hover:bg-surface-card/60 transition-all duration-500 group transform-gpu hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-accent-emerald/10 flex items-center justify-center border border-accent-emerald/20 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <Shield className="w-8 h-8 text-accent-emerald" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Evidence-First</h3>
            <p className="text-gray-400 text-base leading-relaxed group-hover:text-gray-300 transition-colors">
              Every score we generate is backed by public code evidence. We don't just take your word for it—we prove it.
            </p>
          </motion.div>
          <motion.div variants={item} className="p-10 rounded-3xl border border-white/5 bg-surface-card/40 backdrop-blur-xl space-y-6 shadow-2xl hover:border-white/10 hover:bg-surface-card/60 transition-all duration-500 group transform-gpu hover:-translate-y-2">
             <div className="w-16 h-16 rounded-2xl bg-accent-amber/10 flex items-center justify-center border border-accent-amber/20 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]">
              <BarChart className="text-accent-amber w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Credibility Fingerprint</h3>
            <p className="text-gray-400 text-base leading-relaxed group-hover:text-gray-300 transition-colors">
              Identify the gap between your resume claims and your actual verifiable proof. Optimize for trust.
            </p>
          </motion.div>
          <motion.div variants={item} className="p-10 rounded-3xl border border-white/5 bg-surface-card/40 backdrop-blur-xl space-y-6 shadow-2xl hover:border-white/10 hover:bg-surface-card/60 transition-all duration-500 group transform-gpu hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-accent-rose/10 flex items-center justify-center border border-accent-rose/20 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]">
              <Target className="w-8 h-8 text-accent-rose" />
            </div>
            <h3 className="text-2xl font-semibold text-white">JD Matching</h3>
            <p className="text-gray-400 text-base leading-relaxed group-hover:text-gray-300 transition-colors">
              Match any job description against your profile to see exactly what's blocking you from your dream role.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
