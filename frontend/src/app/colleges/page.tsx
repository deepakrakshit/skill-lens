"use client";
import PublicLayout from "@/components/PublicLayout";
import { School, BarChart2, ShieldCheck, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function CollegesPage() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } } };

  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto px-8 py-32 space-y-24 relative">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-accent-amber/5 blur-[200px] rounded-full pointer-events-none z-[-1]" />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-display font-bold tracking-tight">For <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-amber to-orange-400 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]">Colleges.</span></h1>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto font-light">
            Scale your placement cell's impact with cold, hard, evidence-based student readiness data. Stop relying on self-reported CGPAs.
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={item} className="p-10 rounded-3xl border border-white/5 bg-surface-card/60 backdrop-blur-xl space-y-6 shadow-2xl hover:border-accent-amber/30 transition-all duration-500 group transform-gpu hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-accent-amber/10 flex items-center justify-center border border-accent-amber/20 group-hover:bg-accent-amber group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]">
              <School className="w-8 h-8 text-accent-amber group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-accent-amber transition-colors">Institutional Dashboard</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Get a bird's-eye view of your entire batch's technical readiness. See the distribution of Verified vs Soft Claims across hundreds of students instantly.
            </p>
          </motion.div>
          <motion.div variants={item} className="p-10 rounded-3xl border border-white/5 bg-surface-card/60 backdrop-blur-xl space-y-6 shadow-2xl hover:border-accent-amber/30 transition-all duration-500 group transform-gpu hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-accent-amber/10 flex items-center justify-center border border-accent-amber/20 group-hover:bg-accent-amber group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]">
              <ShieldCheck className="w-8 h-8 text-accent-amber group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-accent-amber transition-colors">Early Intervention</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Identify "High Risk" students who are falling behind in technical activity before the placement season even begins. Schedule targeted workshops based on data.
            </p>
          </motion.div>
          <motion.div variants={item} className="p-10 rounded-3xl border border-white/5 bg-surface-card/60 backdrop-blur-xl space-y-6 shadow-2xl hover:border-accent-amber/30 transition-all duration-500 group transform-gpu hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-accent-amber/10 flex items-center justify-center border border-accent-amber/20 group-hover:bg-accent-amber group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]">
              <BarChart2 className="w-8 h-8 text-accent-amber group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-accent-amber transition-colors">Outcome Prediction</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Use evidence-based Trust Scores to predict placement outcomes and allocate your placement cell's resources more effectively to those who need it most.
            </p>
          </motion.div>
          <motion.div variants={item} className="p-10 rounded-3xl border border-white/5 bg-surface-card/60 backdrop-blur-xl space-y-6 shadow-2xl hover:border-accent-amber/30 transition-all duration-500 group transform-gpu hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-accent-amber/10 flex items-center justify-center border border-accent-amber/20 group-hover:bg-accent-amber group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]">
              <Users className="w-8 h-8 text-accent-amber group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-accent-amber transition-colors">Benchmarking</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Compare your students' aggregated skills against actual industry standards and top-tier product company requirements parsed directly from real JDs.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
