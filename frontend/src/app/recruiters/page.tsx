"use client";
import PublicLayout from "@/components/PublicLayout";
import { Search, ShieldAlert, FileSearch, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function RecruitersPage() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } } };

  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto px-8 py-32 space-y-24 relative">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[200px] rounded-full pointer-events-none z-[-1]" />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-display font-bold tracking-tight">For <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">Recruiters.</span></h1>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto font-light">
            Cut through the noise of AI-generated resumes. Verify technical signal before you ever schedule the first interview.
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={item} className="p-10 rounded-3xl border border-white/5 bg-surface-card/60 backdrop-blur-xl space-y-6 shadow-2xl hover:border-blue-500/30 transition-all duration-500 group transform-gpu hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              <Search className="w-8 h-8 text-blue-400 group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">Signal Discovery</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Find high-signal candidates who might not have "tier-1" college names but have the raw, verified code to prove their depth. Stop filtering by proxy.
            </p>
          </motion.div>
          <motion.div variants={item} className="p-10 rounded-3xl border border-white/5 bg-surface-card/60 backdrop-blur-xl space-y-6 shadow-2xl hover:border-blue-500/30 transition-all duration-500 group transform-gpu hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              <ShieldAlert className="w-8 h-8 text-blue-400 group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">Verify Claims</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Instantly check if a candidate's resume claims are actually backed by their public engineering footprint. Spot "Soft Claims" before wasting engineering time.
            </p>
          </motion.div>
          <motion.div variants={item} className="p-10 rounded-3xl border border-white/5 bg-surface-card/60 backdrop-blur-xl space-y-6 shadow-2xl hover:border-blue-500/30 transition-all duration-500 group transform-gpu hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              <FileSearch className="w-8 h-8 text-blue-400 group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">Technical Auditing</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Get an automated, heuristic-based technical summary of a candidate's GitHub profile without manually digging through dozens of unorganized repos.
            </p>
          </motion.div>
          <motion.div variants={item} className="p-10 rounded-3xl border border-white/5 bg-surface-card/60 backdrop-blur-xl space-y-6 shadow-2xl hover:border-blue-500/30 transition-all duration-500 group transform-gpu hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              <CheckCircle className="w-8 h-8 text-blue-400 group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">Hiring Confidence</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Make faster, more informed hiring decisions based on verifiable evidence instead of self-reported claims and keyword-stuffed PDFs.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
