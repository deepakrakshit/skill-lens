"use client";
import PublicLayout from "@/components/PublicLayout";
import { GraduationCap, Code, Rocket, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function StudentsPage() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } } };

  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto px-8 py-32 space-y-24 relative">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent-emerald/5 blur-[200px] rounded-full pointer-events-none z-[-1]" />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-display font-bold tracking-tight">For <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-emerald to-teal-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]">Students.</span></h1>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto font-light">
            Stop guessing what recruiters want. Start proving what you know. Get the brutal, honest feedback you need to land your first product company role.
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={item} className="p-10 rounded-3xl border border-white/5 bg-surface-card/60 backdrop-blur-xl space-y-6 shadow-2xl hover:border-accent-emerald/30 transition-all duration-500 group transform-gpu hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-accent-emerald/10 flex items-center justify-center border border-accent-emerald/20 group-hover:bg-accent-emerald group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]">
              <GraduationCap className="w-8 h-8 text-accent-emerald group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-accent-emerald transition-colors">Placement Prep</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Understand exactly where you stand against SDE-1 requirements before the placement season starts. Don't wait for a rejection letter to find out your resume claims weren't believed.
            </p>
          </motion.div>
          <motion.div variants={item} className="p-10 rounded-3xl border border-white/5 bg-surface-card/60 backdrop-blur-xl space-y-6 shadow-2xl hover:border-accent-emerald/30 transition-all duration-500 group transform-gpu hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-accent-emerald/10 flex items-center justify-center border border-accent-emerald/20 group-hover:bg-accent-emerald group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]">
              <Code className="w-8 h-8 text-accent-emerald group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-accent-emerald transition-colors">Project Guidance</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Find out what specific features you should add to your existing repositories to demonstrate technical depth and code quality to automated screening systems.
            </p>
          </motion.div>
          <motion.div variants={item} className="p-10 rounded-3xl border border-white/5 bg-surface-card/60 backdrop-blur-xl space-y-6 shadow-2xl hover:border-accent-emerald/30 transition-all duration-500 group transform-gpu hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-accent-emerald/10 flex items-center justify-center border border-accent-emerald/20 group-hover:bg-accent-emerald group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]">
              <Rocket className="w-8 h-8 text-accent-emerald group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-accent-emerald transition-colors">Career Acceleration</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Identify hidden strengths you didn't even know you had (like that Dockerfile you wrote 6 months ago) and highlight them confidently to recruiters.
            </p>
          </motion.div>
          <motion.div variants={item} className="p-10 rounded-3xl border border-white/5 bg-surface-card/60 backdrop-blur-xl space-y-6 shadow-2xl hover:border-accent-emerald/30 transition-all duration-500 group transform-gpu hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-accent-emerald/10 flex items-center justify-center border border-accent-emerald/20 group-hover:bg-accent-emerald group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]">
              <Award className="w-8 h-8 text-accent-emerald group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-accent-emerald transition-colors">Verified Proof</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Share your mathematically verified SkillLens profile and certificates directly with potential employers to instantly bypass their trust filter.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
