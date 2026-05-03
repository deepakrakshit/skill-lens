"use client";
import PublicLayout from "@/components/PublicLayout";
import { Users, Heart, Globe, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-8 py-32 space-y-24 relative z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent-violet/5 blur-[200px] rounded-full pointer-events-none z-[-1]" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8 text-center">
          <h1 className="text-6xl md:text-7xl font-display font-bold tracking-tight">About <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-violet to-accent-violet-light drop-shadow-[0_0_20px_rgba(124,58,237,0.5)]">SkillLens.</span></h1>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light max-w-3xl mx-auto">
            SkillLens was born out of a simple observation: <span className="text-white font-medium">resumes are broken.</span> In an era of AI-generated claims and inflated bullet points, technical trust is harder to establish than ever.
          </p>
        </motion.div>

        <div className="space-y-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-8 items-start group">
             <div className="w-16 h-16 rounded-2xl bg-accent-violet/10 flex items-center justify-center shrink-0 border border-accent-violet/20 group-hover:bg-accent-violet transition-colors duration-500 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]">
                <Users className="w-8 h-8 text-accent-violet-light group-hover:text-white transition-colors" />
             </div>
             <div className="space-y-3 pt-2">
                <h3 className="text-3xl font-bold text-white group-hover:text-accent-violet-light transition-colors">Our Mission</h3>
                <p className="text-gray-400 text-lg leading-relaxed font-light">
                  We are on a mission to democratize technical opportunity by making engineering skill measurable and verifiable. We believe that your background shouldn't matter as much as the code you can prove you've written.
                </p>
             </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-8 items-start group">
             <div className="w-16 h-16 rounded-2xl bg-accent-rose/10 flex items-center justify-center shrink-0 border border-accent-rose/20 group-hover:bg-accent-rose transition-colors duration-500 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.5)]">
                <Terminal className="w-8 h-8 text-accent-rose group-hover:text-white transition-colors" />
             </div>
             <div className="space-y-3 pt-2">
                <h3 className="text-3xl font-bold text-white group-hover:text-accent-rose transition-colors">Built by TEAM VOID</h3>
                <p className="text-gray-400 text-lg leading-relaxed font-light">
                  SkillLens is built with passion and precision by <span className="text-white font-medium tracking-wide">TEAM VOID</span>. We are engineers who believe in transparency, evidence-based hiring, and helping the next generation of developers find their place in the industry based on merit, not just marketing.
                </p>
             </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-8 items-start group">
             <div className="w-16 h-16 rounded-2xl bg-accent-emerald/10 flex items-center justify-center shrink-0 border border-accent-emerald/20 group-hover:bg-accent-emerald transition-colors duration-500 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                <Globe className="w-8 h-8 text-accent-emerald group-hover:text-white transition-colors" />
             </div>
             <div className="space-y-3 pt-2">
                <h3 className="text-3xl font-bold text-white group-hover:text-accent-emerald transition-colors">Open & Transparent</h3>
                <p className="text-gray-400 text-lg leading-relaxed font-light">
                  We believe that the systems that judge us should be transparent. That's why we use open heuristics and explicit evidence trails to explain every score we generate. No black-box AI rejections.
                </p>
             </div>
          </motion.div>
        </div>
      </div>
    </PublicLayout>
  );
}
