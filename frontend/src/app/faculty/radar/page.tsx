"use client";
import { AlertTriangle, TrendingDown, Users, Search, Activity, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Week 1', score: 30, risk: 20 },
  { name: 'Week 2', score: 35, risk: 18 },
  { name: 'Week 3', score: 42, risk: 15 },
  { name: 'Week 4', score: 48, risk: 18 },
];

export default function FacultyRadarPage() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-bg-deep text-white font-body p-8 selection:bg-accent-rose/30">
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <motion.div variants={item} className="flex items-center justify-between bg-surface-card/50 p-6 rounded-2xl border border-white/5 backdrop-blur-md shadow-lg">
          <div>
            <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent-rose/20 border border-accent-rose/30"><ShieldAlert className="w-6 h-6 text-accent-rose" /></div>
              Faculty Risk Radar
            </h1>
            <p className="text-sm text-gray-400 mt-2 font-medium tracking-wide">Batch 2026 • SDE Readiness Monitoring</p>
          </div>
          <div className="flex gap-4 text-sm">
             <button className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all font-medium shadow-sm hover:shadow-md">
               Export Report
             </button>
             <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-violet to-accent-violet-light hover:from-accent-violet-light hover:to-accent-violet shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transform hover:-translate-y-0.5 transition-all text-white font-semibold">
               Schedule Interventions
             </button>
          </div>
        </motion.div>

        {/* Charts & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={item} className="col-span-1 lg:col-span-2 rounded-2xl border border-white/5 bg-surface-card/60 backdrop-blur-md p-6 shadow-lg h-80 flex flex-col">
            <h3 className="text-sm font-semibold text-gray-200 mb-4 uppercase tracking-wider flex items-center gap-2"><Activity className="w-4 h-4 text-accent-violet-light" /> Batch Readiness Trend</h3>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f1929', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="score" stroke="#7c3aed" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" name="Avg Trust Score" />
                  <Area type="monotone" dataKey="risk" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorRisk)" name="High Risk Students" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div variants={container} className="col-span-1 grid grid-rows-3 gap-4">
            <motion.div variants={item} className="rounded-2xl border border-white/5 bg-surface-card/60 backdrop-blur-md p-5 flex items-center justify-between shadow-lg group hover:border-white/10 transition-colors">
              <div>
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Users className="w-4 h-4" /> <span className="text-xs uppercase font-bold tracking-wide">Total Monitored</span>
                </div>
                <div className="text-3xl font-mono font-bold text-white drop-shadow-md">142</div>
              </div>
            </motion.div>
            <motion.div variants={item} className="rounded-2xl border border-accent-rose/30 bg-gradient-to-br from-accent-rose/10 to-surface-card/60 backdrop-blur-md p-5 flex items-center justify-between shadow-lg relative overflow-hidden group hover:border-accent-rose/50 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><AlertTriangle className="w-16 h-16 text-accent-rose" /></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-accent-rose mb-1">
                  <AlertTriangle className="w-4 h-4" /> <span className="text-xs uppercase font-bold tracking-wide">High Risk</span>
                </div>
                <div className="flex items-end gap-2">
                  <div className="text-3xl font-mono font-bold text-accent-rose drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]">18</div>
                  <div className="text-xs text-accent-rose/80 font-medium pb-1 mb-1">Critical JD gaps</div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={item} className="rounded-2xl border border-accent-amber/30 bg-gradient-to-br from-accent-amber/10 to-surface-card/60 backdrop-blur-md p-5 flex items-center justify-between shadow-lg group hover:border-accent-amber/50 transition-colors relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><TrendingDown className="w-16 h-16 text-accent-amber" /></div>
               <div className="relative z-10">
                <div className="flex items-center gap-2 text-accent-amber mb-1">
                  <TrendingDown className="w-4 h-4" /> <span className="text-xs uppercase font-bold tracking-wide">Skill Decay</span>
                </div>
                <div className="text-3xl font-mono font-bold text-accent-amber drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">34</div>
               </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Risk Table */}
        <motion.div variants={item} className="rounded-2xl border border-white/5 bg-surface-card/60 backdrop-blur-xl overflow-hidden shadow-2xl relative">
           <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
           <div className="p-5 border-b border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between bg-[#0a0f1c]/80 relative z-10 gap-4">
             <h3 className="text-base font-semibold text-white uppercase tracking-wider flex items-center gap-2"><Users className="w-4 h-4 text-accent-violet-light" /> At-Risk Students</h3>
             <div className="relative group w-full md:w-auto">
                <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-accent-violet-light transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search student ID..." 
                  className="bg-surface-raised border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-accent-violet/50 focus:ring-2 focus:ring-accent-violet/20 w-full md:w-72 transition-all shadow-inner"
                />
             </div>
           </div>
           
           <div className="overflow-x-auto relative z-10">
             <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#111827]/50 text-xs text-gray-400 uppercase font-bold tracking-wider border-b border-white/5">
                  <tr>
                    <th className="px-6 py-4 font-medium">Anon ID</th>
                    <th className="px-6 py-4 font-medium">Risk Level</th>
                    <th className="px-6 py-4 font-medium">Trust Score</th>
                    <th className="px-6 py-4 font-medium">Critical Gaps</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300 font-medium">
                  <tr className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-5 font-mono text-sm text-white group-hover:text-accent-violet-light transition-colors">STU-8892</td>
                    <td className="px-6 py-5"><span className="px-3 py-1.5 bg-accent-rose/10 text-accent-rose rounded-md border border-accent-rose/20 text-xs font-bold uppercase tracking-wide">High</span></td>
                    <td className="px-6 py-5 font-mono text-base font-bold text-white">24</td>
                    <td className="px-6 py-5 text-gray-400">System Design, AWS</td>
                    <td className="px-6 py-5"><span className="flex items-center gap-1.5 text-accent-amber text-xs font-bold uppercase tracking-wide"><TrendingDown className="w-4 h-4" /> Decay</span></td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-accent-violet-light hover:text-white hover:bg-accent-violet/20 px-3 py-1.5 rounded-lg transition-colors text-xs font-bold border border-transparent hover:border-accent-violet/30">View</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-5 font-mono text-sm text-white group-hover:text-accent-violet-light transition-colors">STU-1044</td>
                    <td className="px-6 py-5"><span className="px-3 py-1.5 bg-accent-rose/10 text-accent-rose rounded-md border border-accent-rose/20 text-xs font-bold uppercase tracking-wide">High</span></td>
                    <td className="px-6 py-5 font-mono text-base font-bold text-white">31</td>
                    <td className="px-6 py-5 text-gray-400">Data Structures, Redis</td>
                    <td className="px-6 py-5"><span className="flex items-center gap-1.5 text-gray-500 text-xs font-bold uppercase tracking-wide"><Activity className="w-4 h-4" /> Active</span></td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-accent-violet-light hover:text-white hover:bg-accent-violet/20 px-3 py-1.5 rounded-lg transition-colors text-xs font-bold border border-transparent hover:border-accent-violet/30">View</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-5 font-mono text-sm text-white group-hover:text-accent-violet-light transition-colors">STU-5521</td>
                    <td className="px-6 py-5"><span className="px-3 py-1.5 bg-accent-amber/10 text-accent-amber rounded-md border border-accent-amber/20 text-xs font-bold uppercase tracking-wide">Borderline</span></td>
                    <td className="px-6 py-5 font-mono text-base font-bold text-white">45</td>
                    <td className="px-6 py-5 text-gray-400">Docker, CI/CD</td>
                    <td className="px-6 py-5"><span className="flex items-center gap-1.5 text-accent-amber text-xs font-bold uppercase tracking-wide"><TrendingDown className="w-4 h-4" /> Decay</span></td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-accent-violet-light hover:text-white hover:bg-accent-violet/20 px-3 py-1.5 rounded-lg transition-colors text-xs font-bold border border-transparent hover:border-accent-violet/30">View</button>
                    </td>
                  </tr>
                </tbody>
             </table>
           </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
