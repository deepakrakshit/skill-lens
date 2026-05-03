"use client";
import { Send, User, Bot, AlertTriangle, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function MentorChatPage() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 100 } } };
  const chatBubble = { hidden: { opacity: 0, scale: 0.9, y: 10 }, show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, bounce: 0.4 } } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="h-[calc(100vh-10rem)] flex gap-6 pb-6">
      {/* Context Sidebar */}
      <motion.div variants={item} className="w-72 shrink-0 flex flex-col gap-4 hidden lg:flex">
        <div className="rounded-2xl border border-white/5 bg-surface-card/80 backdrop-blur-md p-6 shadow-lg group hover:border-white/10 transition-colors">
          <h3 className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-5 flex items-center gap-2"><User className="w-3.5 h-3.5" /> Current Context</h3>
          <div className="space-y-5">
            <div>
              <span className="text-xs text-gray-500 block mb-1 font-medium">Target Role</span>
              <span className="text-sm font-semibold text-white bg-white/5 px-2.5 py-1 rounded-md border border-white/10 inline-block">SDE-1 (Backend)</span>
            </div>
            <div>
              <span className="text-xs text-gray-500 block mb-1 font-medium">Top Gap</span>
              <div className="flex items-center gap-2 text-sm font-bold text-accent-rose bg-accent-rose/10 px-2.5 py-1 rounded-md border border-accent-rose/20 inline-flex">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Redis / Caching</span>
              </div>
            </div>
            <div>
              <span className="text-xs text-gray-500 block mb-1 font-medium">Secondary Gap</span>
              <span className="text-sm font-semibold text-accent-amber bg-accent-amber/10 px-2.5 py-1 rounded-md border border-accent-amber/20 inline-block">System Design</span>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-surface-card/80 backdrop-blur-md p-6 flex-1 shadow-lg flex flex-col">
          <h3 className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-5 flex items-center gap-2"><Bot className="w-3.5 h-3.5" /> Suggested Asks</h3>
          <div className="space-y-3 flex-1">
            <button className="text-left w-full text-xs text-gray-300 hover:text-white p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
              "How important is Redis for this role?"
            </button>
            <button className="text-left w-full text-xs text-gray-300 hover:text-white p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
              "What did alumni focus on before this company?"
            </button>
            <button className="text-left w-full text-xs text-gray-300 hover:text-white p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
              "What should I build this week?"
            </button>
          </div>
        </div>
      </motion.div>

      {/* Chat Area */}
      <motion.div variants={item} className="flex-1 rounded-2xl border border-white/5 bg-surface-card/60 backdrop-blur-md flex flex-col overflow-hidden shadow-2xl relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/5 to-transparent pointer-events-none" />
        
        <div className="h-16 border-b border-white/5 flex items-center px-8 shrink-0 bg-[#0a0f1c]/80 backdrop-blur-xl relative z-10">
          <div className="w-8 h-8 rounded-lg bg-accent-violet/20 flex items-center justify-center mr-3 border border-accent-violet/30">
             <Bot className="w-4 h-4 text-accent-violet-light" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">Alumni Knowledge Base</h2>
            <p className="text-xs text-gray-400 font-medium">Grounded in verified interview experiences</p>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 space-y-8 relative z-10">
          {/* User Message */}
          <motion.div variants={chatBubble} className="flex gap-4 justify-end">
            <div className="bg-gradient-to-br from-accent-violet to-accent-violet-light border border-accent-violet/50 text-white px-5 py-3.5 rounded-2xl rounded-tr-sm text-sm max-w-[80%] shadow-[0_5px_15px_rgba(124,58,237,0.3)] font-medium leading-relaxed">
              How important is Redis for the SDE-1 role at Flipkart?
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-raised flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
              <User className="w-5 h-5 text-gray-300" />
            </div>
          </motion.div>

          {/* Bot Response */}
          <motion.div variants={chatBubble} className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shrink-0 border border-white/10 shadow-lg">
              <Bot className="w-5 h-5 text-accent-violet-light" />
            </div>
            <div className="space-y-3 max-w-[85%]">
              <div className="bg-[#111827]/80 backdrop-blur-sm border border-white/10 text-gray-200 px-6 py-5 rounded-2xl rounded-tl-sm text-sm leading-relaxed shadow-lg">
                <p className="mb-4">Based on recent alumni interview experiences (2025 batch), <span className="font-semibold text-accent-violet-light">Redis is highly critical</span> for backend roles at product companies like Flipkart.</p>
                
                <div className="bg-[#0a0f1c] p-4 rounded-xl border border-white/5 mb-4 shadow-inner relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-amber" />
                  <p className="text-xs italic text-gray-300 leading-relaxed font-serif">
                    "In my technical round, they asked me to design a leaderboard system. Just knowing a relational DB wasn't enough; I had to explain exactly how I'd use Redis sorted sets to handle the read throughput at scale."
                  </p>
                  <p className="text-[10px] text-gray-500 font-mono mt-2 font-semibold tracking-wide uppercase">— Alumni (SDE-1, Joined Aug 2025)</p>
                </div>
                
                <p>Since your current profile shows a gap in caching, I recommend adding a Redis layer to your existing Node.js project. It's the fastest way to generate verifiable evidence before placement season.</p>
              </div>
              <button className="text-xs text-accent-violet-light font-semibold flex items-center gap-1.5 hover:text-accent-violet transition-colors px-4 py-2 rounded-lg bg-accent-violet/10 hover:bg-accent-violet/20 border border-transparent hover:border-accent-violet/30">
                View full alumni interview notes <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Input Area */}
        <div className="p-5 border-t border-white/5 bg-[#0a0f1c]/80 backdrop-blur-xl shrink-0 relative z-10">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Ask about interview experiences or skill gaps..." 
              className="w-full bg-surface-raised border border-white/10 rounded-xl py-4 pl-5 pr-14 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent-violet/50 focus:ring-2 focus:ring-accent-violet/20 transition-all shadow-inner"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-lg bg-gradient-to-r from-accent-violet to-accent-violet-light hover:from-accent-violet-light hover:to-accent-violet transition-all text-white shadow-[0_0_15px_rgba(124,58,237,0.4)] hover:shadow-[0_0_20px_rgba(124,58,237,0.6)] transform hover:scale-105 active:scale-95">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
