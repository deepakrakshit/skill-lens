"use client";
import { ShieldCheck, ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

function BackgroundAmbient() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none opacity-30">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: "/product", label: "Product" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/features", label: "Features" },
    { href: "/students", label: "For Students" },
    { href: "/colleges", label: "For Colleges" },
    { href: "/recruiters", label: "For Recruiters" },
    { href: "/about", label: "About" },
  ];

  return (
    <div className="min-h-screen bg-bg-deep text-white selection:bg-accent-violet/30 flex flex-col font-body relative">
      <BackgroundAmbient />
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent-violet/10 blur-[150px] pointer-events-none z-[-1]" />
      
      <nav className="flex items-center justify-between px-6 md:px-8 py-5 max-w-7xl mx-auto w-full relative z-50 border-b border-white/5 backdrop-blur-xl bg-bg-deep/80 sticky top-0">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-accent-violet flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.4)] group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-display font-bold tracking-tight">SkillLens</span>
        </Link>
        
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`transition-colors relative ${pathname === link.href ? "text-white" : "text-gray-400 hover:text-gray-200"}`}
            >
              {link.label}
              {pathname === link.href && (
                <motion.div layoutId="underline" className="absolute -bottom-6 left-0 right-0 h-0.5 bg-accent-violet" />
              )}
            </Link>
          ))}
        </div>
        
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/upload" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:border-accent-violet/50 hover:bg-accent-violet/10 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all text-sm font-medium">
            Resume Upload <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/dashboard" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:border-accent-violet/50 hover:bg-accent-violet/10 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all text-sm font-medium">
            Analyze Profile <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden p-2 text-gray-400 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
           {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-0 z-40 bg-bg-deep/95 backdrop-blur-2xl pt-24 px-6 flex flex-col gap-6"
          >
             {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className={`text-xl font-display font-semibold border-b border-white/5 pb-4 ${pathname === link.href ? "text-accent-violet-light" : "text-gray-300"}`}
              >
                {link.label}
              </Link>
            ))}
             <Link href="/upload" onClick={() => setIsMenuOpen(false)} className="mt-4 flex justify-center items-center gap-2 px-6 py-4 rounded-xl bg-white/5 text-white font-semibold border border-white/10">
               Resume Upload <ArrowRight className="w-5 h-5" />
            </Link>
             <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="mt-2 flex justify-center items-center gap-2 px-6 py-4 rounded-xl bg-accent-violet text-white font-semibold shadow-[0_0_20px_rgba(124,58,237,0.4)]">
               Analyze Profile <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.main 
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex-1 relative z-10 w-full max-w-7xl mx-auto"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <footer className="border-t border-white/5 py-12 bg-[#080d1a]/80 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
            <div className="w-6 h-6 rounded bg-accent-violet flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-semibold">SkillLens</span>
          </div>
          <p className="text-sm text-gray-500">
            © 2026 SkillLens. Built with <span className="text-accent-rose">♥</span> by TEAM VOID.
          </p>
          <div className="flex gap-6 text-sm text-gray-500 font-medium">
            <Link href="#" className="hover:text-accent-violet-light transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-accent-violet-light transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-accent-violet-light transition-colors">Discord</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
