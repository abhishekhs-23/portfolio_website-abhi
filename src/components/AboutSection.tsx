import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { GraduationCap, Cpu } from "lucide-react";

// Lazy-load the heavy 3D component
const SkillsOrb = lazy(() => import("./SkillsOrb"));

const PROFILE_IMG = "/abhi-dp.png";

const AboutSection = () => (
  <SectionWrapper id="about" title="About" subtitle="Exploring the space between people and systems.">
    <div className="relative max-w-6xl mx-auto space-y-28">

      {/* ── FIRST SCROLL: Portrait + Narrative ── */}
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

        {/* Left: Portrait */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5"
        >
          <div className="sticky top-32">
            <div className="aspect-[3/4] overflow-hidden border border-foreground/8 relative group shadow-2xl shadow-black/30">
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/5 transition-colors duration-700 z-10" />
              <img
                src={PROFILE_IMG}
                alt="Abhishek H S"
                className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-100"
              />
              <div className="absolute bottom-5 left-5 z-20">
                <p className="text-[10px] font-mono text-white/50 tracking-widest uppercase mb-1">Status</p>
                <p className="text-xs text-white tracking-widest uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Building
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="lg:col-span-7 space-y-12"
        >
          <section className="space-y-4">
            <h3 className="text-xs font-mono text-amber-500 tracking-widest uppercase border-b border-foreground/10 pb-3">Who I Am</h3>
            <p className="text-2xl md:text-3xl font-serif text-foreground/95 leading-relaxed">
              I am an AI/ML Engineer with a deep passion for artificial intelligence,
              machine learning, and modern web technologies.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed font-light">
              Currently pursuing my B.E. in AI & ML at Sri Siddhartha Institute of Technology, Tumakuru.
              I view software engineering not just as writing code — but as crafting intelligent systems
              that interact smoothly with the real world.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-mono text-amber-500 tracking-widest uppercase border-b border-foreground/10 pb-3">What I Explore</h3>
            <p className="text-base text-muted-foreground leading-relaxed font-light">
              My curiosity lives at the intersection of Generative AI, computer vision, and high-performance
              backend architecture. I experiment with RAG pipelines, real-time speech translation, and pushing
              the limits of what browser-based interfaces can do.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-mono text-amber-500 tracking-widest uppercase border-b border-foreground/10 pb-3">What I Build</h3>
            <p className="text-base text-muted-foreground leading-relaxed font-light">
              From real-time hand gesture recognition to AI-powered teaching assistants — I build interactive,
              intelligent experiences that bridge complex ML models with intuitive human-computer interaction.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-mono text-amber-500 tracking-widest uppercase border-b border-foreground/10 pb-3">Why I Build It</h3>
            <p className="text-2xl font-serif text-foreground italic leading-relaxed">
              "To create ideas that turn into impact."
            </p>
            <p className="text-base text-muted-foreground leading-relaxed font-light">
              Technology is most powerful when it empowers others. Whether it's Intellearn or LiFi data
              transmission — my goal is to architect solutions that solve real problems and build a better tomorrow.
            </p>
          </section>
        </motion.div>
      </div>

      {/* ── SECOND SCROLL: 3D Tech Universe + Education ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
      >
        {/* 3D Skill Orb */}
        <div className="order-2 lg:order-1">
          <div className="mb-5 flex items-center gap-2">
            <Cpu size={14} className="text-amber-500" />
            <h3 className="text-xs font-mono text-amber-500 tracking-widest uppercase">Tech Universe</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6 font-light leading-relaxed">
            My core technologies as an interactive 3D constellation. Drag to explore.
          </p>
          <Suspense fallback={
            <div className="w-full h-[420px] flex items-center justify-center border border-foreground/5 rounded-2xl">
              <p className="text-xs font-mono text-muted-foreground animate-pulse">Loading 3D...</p>
            </div>
          }>
            <SkillsOrb />
          </Suspense>
        </div>

        {/* Education + Philosophy */}
        <div className="order-1 lg:order-2 space-y-10">
          {/* Education */}
          <section>
            <h3 className="text-xs font-mono text-amber-500 tracking-widest uppercase mb-6 flex items-center gap-2 border-b border-foreground/10 pb-3">
              <GraduationCap size={14} /> Foundation
            </h3>
            <div className="space-y-4">
              <div className="border border-foreground/8 bg-foreground/[0.02] p-6 hover:border-amber-500/25 transition-colors duration-300">
                <p className="text-lg font-serif text-foreground mb-1">B.E in AI & ML</p>
                <p className="text-sm text-amber-500/70 mb-2">Sri Siddhartha Institute of Technology</p>
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">2022 – 2026</p>
              </div>
              <div className="border border-foreground/8 bg-foreground/[0.02] p-6 hover:border-amber-500/25 transition-colors duration-300">
                <p className="text-lg font-serif text-foreground mb-1">Pre-University (PCMB)</p>
                <p className="text-sm text-amber-500/70 mb-2">Gnanapriya PU College, Tumakuru</p>
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">2020 – 2022</p>
              </div>
            </div>
          </section>

          {/* Quick stats */}
          <section>
            <h3 className="text-xs font-mono text-amber-500 tracking-widest uppercase mb-6 border-b border-foreground/10 pb-3">By the Numbers</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "10+", label: "Projects Built" },
                { num: "5+", label: "Certifications" },
                { num: "3", label: "Hackathons" },
                { num: "2+", label: "Internships" },
              ].map(({ num, label }) => (
                <div key={label} className="border border-foreground/8 bg-foreground/[0.02] p-5">
                  <p className="text-3xl font-serif text-foreground mb-1">{num}</p>
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{label}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  </SectionWrapper>
);

export default AboutSection;