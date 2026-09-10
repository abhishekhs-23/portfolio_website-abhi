import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const HeroSection = () => {
  const { theme } = useTheme();
  const bg = theme === "dark" ? "#050d1a" : "#f7f3ed";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full hero background image — the workspace desk shot */}
      <div className="absolute inset-0 z-0">
        <img
          src="/ffedaf9f-10a4-4365-9f5c-f96f490c0a82.png"
          alt="Abhishek H S workspace"
          className="w-full h-full object-cover"
          style={{ objectPosition: '65% center' }}
        />
        {/* Left overlay — always dark so white text is readable */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${bg} 18%, ${bg}cc 30%, ${bg}33 85%, transparent 100%)` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${bg} 0%, transparent 30%, ${bg}88 100%)` }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-16 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start text-left max-w-xl"
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase mb-5 text-amber-400/80">
            AI / ML Engineer
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-normal mb-6 leading-[1.1] text-[#f5f0e8]">
            Welcome to<br />
            <span className="font-semibold text-white">My Space</span>
          </h1>

          <p className="text-base md:text-lg text-gray-300 mb-10 leading-relaxed font-light border-l-2 border-white/20 pl-6">
            "A place where curiosity meets code,<br className="hidden md:block" />
            where ideas become experiments,<br className="hidden md:block" />
            and experiments become real systems."
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4 mb-12 w-full">
            <a
              href="#solar-system"
              className="px-8 py-3 border-b-2 border-amber-500/60 text-white text-sm font-medium hover:text-amber-400 hover:border-amber-400 transition-all uppercase tracking-widest"
            >
              Enter My World →
            </a>
            <a
              href="#about"
              className="px-8 py-3 border-b border-white/20 text-gray-400 text-sm font-medium hover:text-white hover:border-white/40 transition-all uppercase tracking-widest"
            >
              More About Me →
            </a>
          </div>

          {/* Identity bar */}
          <div className="pt-8 border-t border-white/15 w-full">
            <h3 className="text-lg font-semibold text-white tracking-wide mb-1">ABHISHEK H S</h3>
            <p className="text-xs font-mono text-gray-400 mb-4 tracking-widest uppercase">AI/ML Engineer · Full Stack Developer</p>
            <div className="flex gap-3 text-[10px] font-mono text-gray-500 uppercase tracking-widest flex-wrap">
              <span>Generative AI</span>
              <span className="text-amber-500/40">•</span>
              <span>RAG</span>
              <span className="text-amber-500/40">•</span>
              <span>Computer Vision</span>
              <span className="text-amber-500/40">•</span>
              <span>Python</span>
              <span className="text-amber-500/40">•</span>
              <span>React</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 z-10"
      >
        <ArrowDown size={18} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
