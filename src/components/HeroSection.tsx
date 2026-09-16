import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const HeroSection = () => {
  const { theme } = useTheme();
  const bg = theme === "dark" ? "#101726" : "#f7f3ed";

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
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${bg} 15%, ${bg}cc 20%, ${bg}33 40%, transparent 100%)` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${bg} 0%, transparent 30%, ${bg}88 100%)` }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-16 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start text-left max-w-xl"
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase mb-5 text-amber-500">
            AI / ML Engineer
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-normal mb-6 leading-[1.1] text-foreground/90">
            Welcome to<br />
            <span className="font-semibold text-foreground">My Space</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed font-light border-l-2 border-foreground/20 pl-6">
            I build AI-powered applications, backend systems, and interactive web experiences that turn ideas into useful software.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4 mb-12 w-full">
            <a
              href="#projects"
              className="px-8 py-3 border-b-2 border-amber-500/60 text-foreground text-sm font-medium hover:text-amber-500 hover:border-amber-500 transition-all uppercase tracking-widest"
            >
              View Projects →
            </a>
            <a
              href="#about"
              className="px-8 py-3 border-b border-foreground/20 text-muted-foreground text-sm font-medium hover:text-foreground hover:border-foreground/40 transition-all uppercase tracking-widest"
            >
              More About Me →
            </a>
          </div>

          {/* Identity bar */}
          <div className="pt-8 border-t border-foreground/15 w-full">
            <h3 className="text-lg font-semibold text-foreground tracking-wide mb-1">ABHISHEK H S</h3>
            <p className="text-xs font-mono text-muted-foreground mb-4 tracking-widest uppercase">AI/ML Engineer · Full Stack Developer</p>
            <div className="flex gap-3 text-[10px] font-mono text-muted-foreground/80 uppercase tracking-widest flex-wrap">
              <span>Python</span>
              <span className="text-amber-500/40">•</span>
              <span>FastAPI</span>
              <span className="text-amber-500/40">•</span>
              <span>AI/ML</span>
              <span className="text-amber-500/40">•</span>
              <span>RAG</span>
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground z-10"
      >
        <ArrowDown size={18} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
