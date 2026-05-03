"use client";
import PublicLayout from "@/components/PublicLayout";
import { GitBranch, Search, Cpu, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorksPage() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.3 } } };
  const item = { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 80 } } };

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-8 py-32 space-y-24 relative">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent-violet/10 blur-[150px] rounded-full pointer-events-none z-[-1]" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-display font-bold tracking-tight">How <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-violet to-accent-violet-light drop-shadow-[0_0_20px_rgba(124,58,237,0.5)]">SkillLens</span> Works</h1>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto font-light">
            We convert public engineering signals into a trustworthy measurement of skill. No self-reporting, no guesswork.
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="space-y-16 max-w-4xl mx-auto relative before:absolute before:inset-0 before:ml-[31px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-accent-violet/30 before:to-transparent z-10">
          
          <motion.div variants={item} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl border-2 border-accent-violet bg-[#0a0f1c] shadow-[0_0_20px_rgba(124,58,237,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-12">
               <GitBranch className="w-6 h-6 text-accent-violet-light" />
            </div>
            <div className="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] p-8 rounded-3xl border border-white/5 bg-surface-card/60 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-accent-violet/30 hover:shadow-accent-violet/10 group-hover:-translate-y-2">
              <div className="text-accent-violet/50 font-mono font-bold text-4xl absolute -top-4 -right-2 opacity-20">01</div>
              <h3 className="text-2xl font-bold text-white mb-4">Connect Public Signal</h3>
              <p className="text-gray-400 leading-relaxed text-base">
                Provide your GitHub username. We fetch your repository metadata, including languages used, commit frequency, project maturity, and quality markers like CI/CD and tests.
              </p>
            </div>
          </motion.div>

          <motion.div variants={item} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl border-2 border-accent-violet bg-[#0a0f1c] shadow-[0_0_20px_rgba(124,58,237,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:scale-110 transition-transform duration-500 group-hover:-rotate-12">
               <Cpu className="w-6 h-6 text-accent-violet-light" />
            </div>
            <div className="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] p-8 rounded-3xl border border-white/5 bg-surface-card/60 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-accent-violet/30 hover:shadow-accent-violet/10 group-hover:-translate-y-2">
              <div className="text-accent-violet/50 font-mono font-bold text-4xl absolute -top-4 -left-2 md:-right-2 md:-left-auto opacity-20">02</div>
              <h3 className="text-2xl font-bold text-white mb-4">Heuristic Analysis</h3>
              <p className="text-gray-400 leading-relaxed text-base">
                Our engine applies technical heuristics to identify real skill depth. We distinguish between a simple "hello world" and a mature production-ready codebase using precise signal weights.
              </p>
            </div>
          </motion.div>

          <motion.div variants={item} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl border-2 border-accent-violet bg-[#0a0f1c] shadow-[0_0_20px_rgba(124,58,237,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-12">
               <Search className="w-6 h-6 text-accent-violet-light" />
            </div>
            <div className="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] p-8 rounded-3xl border border-white/5 bg-surface-card/60 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-accent-violet/30 hover:shadow-accent-violet/10 group-hover:-translate-y-2">
              <div className="text-accent-violet/50 font-mono font-bold text-4xl absolute -top-4 -right-2 opacity-20">03</div>
              <h3 className="text-2xl font-bold text-white mb-4">Claim Comparison</h3>
              <p className="text-gray-400 leading-relaxed text-base">
                We compare your resume claims against the extracted evidence to build your Credibility Fingerprint—highlighting exactly what's verified and what's missing proof.
              </p>
            </div>
          </motion.div>

          <motion.div variants={item} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
             <div className="flex items-center justify-center w-16 h-16 rounded-2xl border-2 border-accent-violet bg-[#0a0f1c] shadow-[0_0_20px_rgba(124,58,237,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:scale-110 transition-transform duration-500 group-hover:-rotate-12">
               <FileCheck className="w-6 h-6 text-accent-violet-light" />
            </div>
            <div className="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] p-8 rounded-3xl border border-white/5 bg-surface-card/60 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-accent-violet/30 hover:shadow-accent-violet/10 group-hover:-translate-y-2">
              <div className="text-accent-violet/50 font-mono font-bold text-4xl absolute -top-4 -left-2 md:-right-2 md:-left-auto opacity-20">04</div>
              <h3 className="text-2xl font-bold text-white mb-4">Actionable Insights</h3>
              <p className="text-gray-400 leading-relaxed text-base">
                Receive a Trust Score and a specific action plan to bridge your gaps. Whether it's adding a feature to a project or learning a new stack, we guide your next move.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </PublicLayout>
  );
}
