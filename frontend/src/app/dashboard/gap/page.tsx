"use client";
import { ArrowRight, AlertCircle, CheckCircle2, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, PolarRadiusAxis } from "recharts";

const data = [
  { subject: 'Node.js', A: 75, fullMark: 100 },
  { subject: 'PostgreSQL', A: 68, fullMark: 100 },
  { subject: 'System Design', A: 24, fullMark: 100 },
  { subject: 'Redis', A: 0, fullMark: 100 },
  { subject: 'Docker', A: 12, fullMark: 100 },
  { subject: 'REST APIs', A: 82, fullMark: 100 },
];

export default function GapAnalysisPage() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 max-w-5xl mx-auto pb-12">
      <motion.div variants={item} className="flex flex-col gap-2">
        <h1 className="text-3xl font-display font-bold text-white tracking-tight">Gap Analysis</h1>
        <p className="text-sm text-gray-400">Match your profile against a job description to find blocking gaps.</p>
      </motion.div>

      {/* JD Input Area */}
      <motion.div variants={item} className="rounded-2xl border border-white/5 bg-surface-card/60 backdrop-blur-md p-6 shadow-lg group hover:border-white/10 transition-colors">
        <h3 className="text-sm font-semibold text-gray-200 mb-4 uppercase tracking-wider">Target Job Description</h3>
        <textarea 
          className="w-full h-32 bg-[#060a12]/80 backdrop-blur-xl border border-white/10 rounded-xl p-5 text-sm text-gray-300 focus:outline-none focus:border-accent-violet/50 focus:ring-2 focus:ring-accent-violet/20 resize-none font-mono shadow-inner transition-all"
          placeholder="Paste job description here..."
          defaultValue="Backend Engineer (SDE-1) at Flipkart. Requirements: Strong in Java or Node.js. Experience with PostgreSQL and Redis. Knowledge of System Design and microservices architecture..."
        />
        <div className="mt-5 flex justify-end">
          <button className="bg-gradient-to-r from-accent-violet to-accent-violet-light hover:from-accent-violet-light hover:to-accent-violet shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all text-white px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2">
            Analyze Match <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Results Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Match Score & Radar Chart */}
        <motion.div variants={item} className="col-span-1 rounded-2xl border border-white/5 bg-surface-card/60 backdrop-blur-md p-6 flex flex-col items-center shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent-amber/5 to-transparent pointer-events-none" />
          <div className="text-6xl font-mono font-bold text-accent-amber drop-shadow-[0_0_15px_rgba(245,158,11,0.4)] mb-2 relative z-10 mt-4">65%</div>
          <span className="text-sm text-white font-semibold uppercase tracking-wider relative z-10">Match Score</span>
          <span className="text-xs text-gray-400 font-medium mt-1 mb-8 relative z-10 bg-white/5 px-3 py-1 rounded-full border border-white/10">Borderline for SDE-1</span>
          
          <div className="w-full h-48 -mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Skills" dataKey="A" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.4} />
                <Tooltip contentStyle={{ backgroundColor: '#0f1929', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Skills Breakdown */}
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={item} className="rounded-2xl border border-white/5 bg-surface-card/60 backdrop-blur-md p-6 shadow-lg">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-6 uppercase tracking-wider">
              <CheckCircle2 className="w-5 h-5 text-accent-emerald drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" /> Matched Skills
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                <span className="text-gray-300">Node.js</span>
                <span className="text-accent-emerald font-mono bg-accent-emerald/10 px-2 py-1 rounded text-xs border border-accent-emerald/20">75</span>
              </li>
              <li className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                <span className="text-gray-300">PostgreSQL</span>
                <span className="text-accent-emerald font-mono bg-accent-emerald/10 px-2 py-1 rounded text-xs border border-accent-emerald/20">68</span>
              </li>
            </ul>
          </motion.div>
          <motion.div variants={item} className="rounded-2xl border border-accent-rose/30 bg-gradient-to-br from-accent-rose/10 to-surface-card/60 backdrop-blur-md p-6 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <AlertCircle className="w-24 h-24 text-accent-rose" />
            </div>
            <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-6 uppercase tracking-wider relative z-10">
              <AlertCircle className="w-5 h-5 text-accent-rose drop-shadow-[0_0_5px_rgba(244,63,94,0.5)]" /> Blocking Gaps
            </h4>
            <ul className="space-y-4 text-sm font-medium relative z-10">
              <li className="flex justify-between items-center bg-[#0a0f1c]/50 backdrop-blur-sm p-3 rounded-lg border border-accent-rose/20">
                <span className="text-gray-200">Redis</span>
                <span className="text-accent-rose font-mono text-xs font-bold uppercase tracking-wide bg-accent-rose/10 px-2 py-1 rounded border border-accent-rose/20">Missing</span>
              </li>
              <li className="flex justify-between items-center bg-[#0a0f1c]/50 backdrop-blur-sm p-3 rounded-lg border border-accent-amber/20">
                <span className="text-gray-200">System Design</span>
                <span className="text-accent-amber font-mono text-xs font-bold bg-accent-amber/10 px-2 py-1 rounded border border-accent-amber/20">Weak (24)</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Action Plan */}
      <motion.div variants={item} className="rounded-2xl border border-accent-violet/30 bg-gradient-to-b from-accent-violet/10 to-surface-card/60 backdrop-blur-md p-8 shadow-2xl shadow-accent-violet/10 relative overflow-hidden">
        <h3 className="text-lg font-display font-bold text-white flex items-center gap-3 mb-8 relative z-10">
          <div className="p-2 rounded-lg bg-accent-violet/20 border border-accent-violet/30"><Zap className="w-5 h-5 text-accent-violet-light" /></div> 
          4-Week Action Plan
        </h3>
        
        <div className="relative z-10 before:absolute before:inset-0 before:ml-[23px] md:before:ml-[27px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-8">
            <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-accent-violet bg-[#0a0f1c] text-accent-violet-light shadow-[0_0_15px_rgba(124,58,237,0.4)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-mono font-bold text-sm">W1</div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 rounded-xl border border-accent-violet/20 bg-[#0a0f1c]/80 backdrop-blur-md shadow-lg transition-transform hover:-translate-y-1">
              <h5 className="text-base font-bold text-white mb-2">Implement Redis Caching</h5>
              <p className="text-sm text-gray-400 leading-relaxed">Add a Redis layer to your existing Node.js API to cache database queries. This proves you can handle caching strategies.</p>
            </div>
          </div>

          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-8">
            <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-white/10 bg-[#0a0f1c] text-gray-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-mono font-bold text-sm transition-colors group-hover:border-accent-violet group-hover:text-accent-violet">W2</div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 rounded-xl border border-white/5 bg-[#0a0f1c]/50 backdrop-blur-md transition-all hover:border-white/20 hover:bg-[#0a0f1c]/80">
              <h5 className="text-base font-bold text-gray-300 mb-2">System Design: Rate Limiting</h5>
              <p className="text-sm text-gray-500 leading-relaxed">Build a custom rate limiter middleware in Express using Redis. Document the architecture in the README.</p>
            </div>
          </div>

          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-8">
            <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-white/10 bg-[#0a0f1c] text-gray-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-mono font-bold text-sm transition-colors group-hover:border-accent-violet group-hover:text-accent-violet">W3</div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 rounded-xl border border-white/5 bg-[#0a0f1c]/50 backdrop-blur-md transition-all hover:border-white/20 hover:bg-[#0a0f1c]/80">
              <h5 className="text-base font-bold text-gray-300 mb-2">Microservices Basics</h5>
              <p className="text-sm text-gray-500 leading-relaxed">Split one of your monolithic repo endpoints into a separate worker service and communicate via message queue.</p>
            </div>
          </div>

          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-white/10 bg-[#0a0f1c] text-gray-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-mono font-bold text-sm transition-colors group-hover:border-accent-emerald group-hover:text-accent-emerald">W4</div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 rounded-xl border border-white/5 bg-[#0a0f1c]/50 backdrop-blur-md transition-all hover:border-accent-emerald/30 hover:bg-[#0a0f1c]/80">
              <h5 className="text-base font-bold text-gray-300 mb-2 group-hover:text-white transition-colors">Update Golden Path Demo</h5>
              <p className="text-sm text-gray-500 leading-relaxed">Push all code to GitHub, ensure CI/CD runs pass, and update the READMEs to highlight these specific new skills.</p>
            </div>
          </div>
          
        </div>
      </motion.div>
    </motion.div>
  );
}
