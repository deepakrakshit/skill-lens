"use client";
import { GitBranch as Github, LayoutGrid, BarChart2, CheckCircle2, MessageSquare, Shield, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
    { href: "/dashboard/gap", label: "Gap Analysis", icon: BarChart2 },
    { href: "/dashboard/mentor", label: "Mentor Chat", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen flex bg-bg-deep text-white font-body selection:bg-accent-violet/30 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#080d1a]/80 backdrop-blur-2xl flex flex-col hidden md:flex z-20 shrink-0">
        <Link href="/" className="p-6 flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-accent-violet flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.4)] group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-display font-bold tracking-tight">SkillLens</span>
        </Link>
        
        <nav className="flex-1 px-4 space-y-2 py-4">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-sm transition-all duration-300 relative group ${isActive ? "text-white" : "text-gray-400 hover:text-gray-200"}`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active" 
                    className="absolute inset-0 bg-accent-violet/15 border border-accent-violet/30 rounded-xl"
                    initial={false}
                    transition={{ type: "spring" as const, bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <link.icon className={`w-5 h-5 relative z-10 transition-colors ${isActive ? "text-accent-violet-light" : "group-hover:text-gray-300"}`} />
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
          
          <div className="pt-4 mt-4 border-t border-white/5 space-y-2">
            <Link href="#" className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-500 hover:text-gray-300 hover:bg-white/5 font-medium text-sm transition-all">
              <CheckCircle2 className="w-5 h-5" /> Certificates
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-500 hover:text-gray-300 hover:bg-white/5 font-medium text-sm transition-all">
              <Settings className="w-5 h-5" /> Settings
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 font-medium text-sm w-full transition-all">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col max-h-screen relative bg-[#060a12]">
        {/* Background Gradients */}
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-accent-violet/5 blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-accent-emerald/5 blur-[100px] pointer-events-none z-0" />

        {/* Top Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0f1c]/80 backdrop-blur-xl shrink-0 z-10">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="font-semibold text-gray-200 tracking-wide">Active Analysis</span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono">SDE-1 Track</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-9 h-9 rounded-full bg-surface-card flex items-center justify-center overflow-hidden border border-white/10 shadow-inner">
               <Github className="w-5 h-5 text-gray-300" />
             </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 relative z-10">
           <div className="max-w-6xl mx-auto w-full">
             <AnimatePresence mode="wait">
               <motion.div
                 key={pathname}
                 initial={{ opacity: 0, y: 20, scale: 0.98 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, y: -20, scale: 0.98 }}
                 transition={{ duration: 0.4, type: "spring" as const, bounce: 0 }}
               >
                 {children}
               </motion.div>
             </AnimatePresence>
           </div>
        </div>
      </main>
    </div>
  );
}
