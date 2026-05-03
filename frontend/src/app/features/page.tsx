"use client";
import PublicLayout from "@/components/PublicLayout";
import { List, Check, Zap, Map, MessageSquare, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturesPage() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const item = { hidden: { opacity: 0, scale: 0.8, y: 30 }, show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, bounce: 0.4 } } };

  const features = [
    { title: "Trust Score Engine", desc: "A deterministic score calculated from your public engineering signals. No more relying on self-reported '5-star' skill bars.", icon: ShieldCheck },
    { title: "Credibility Fingerprint", desc: "A powerful 2x2 matrix separating your verified skills, soft claims, hidden strengths, and emerging potential.", icon: Zap },
    { title: "JD Gap Analysis", desc: "Real-time comparison against specific job descriptions. Paste a JD and instantly see your exact blocking gaps.", icon: List },
    { title: "4-Week Action Plan", desc: "Personalized algorithmic roadmaps to help you bridge your skill gaps quickly with specific project suggestions.", icon: Map },
    { title: "Alumni Mentor Chat", desc: "Ask questions and get grounded advice based on a curated database of real alumni interview experiences.", icon: MessageSquare },
    { title: "Evidence Trail", desc: "Transparent proof chains for every single skill score we generate. Click any skill to see exactly why you earned that score.", icon: Check },
  ];

  return (
    <PublicLayout>
      <div className="max-w-7xl mx-auto px-8 py-32 space-y-24 relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-violet/5 blur-[200px] rounded-full pointer-events-none z-[-1]" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-display font-bold tracking-tight">Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-violet to-accent-violet-light drop-shadow-[0_0_20px_rgba(124,58,237,0.5)]">Features.</span></h1>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto font-light">
            An entire suite of tools engineered to expose truth, measure capability, and accelerate your path to employability.
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div key={i} variants={item} className="p-10 rounded-3xl border border-white/5 bg-surface-card/60 backdrop-blur-xl shadow-xl hover:border-white/10 hover:bg-surface-card/80 transition-all duration-500 group transform-gpu hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-violet/20 flex flex-col items-start text-left">
              <div className="w-16 h-16 rounded-2xl bg-accent-violet/10 flex items-center justify-center border border-white/5 mb-8 group-hover:scale-110 group-hover:bg-accent-violet group-hover:border-accent-violet-light/50 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]">
                <f.icon className="w-8 h-8 text-accent-violet-light group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent-violet-light transition-colors">{f.title}</h3>
              <p className="text-gray-400 text-base leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PublicLayout>
  );
}
