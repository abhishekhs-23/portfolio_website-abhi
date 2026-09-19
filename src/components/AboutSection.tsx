import { Suspense, lazy, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { GraduationCap, Cpu } from "lucide-react";

// Lazy-load the heavy 3D component
const SkillsOrb = lazy(() => import("./SkillsOrb"));

const PROFILE_IMG = "/abhi-dp.png";

// 3D tilt card hook
const useTilt = (intensity = 15) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(springY, [-1, 1], [intensity, -intensity]);
  const rotateY = useTransform(springX, [-1, 1], [-intensity, intensity]);
  const glowX = useTransform(springX, [-1, 1], ["0%", "100%"]);
  const glowY = useTransform(springY, [-1, 1], ["0%", "100%"]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  }, [x, y]);

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, rotateX, rotateY, glowX, glowY, onMouseMove, onMouseLeave };
};

// Animated counter
const Counter = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  return (
    <motion.p
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
      className="text-3xl md:text-4xl font-serif text-foreground mb-1"
    >
      {value}
    </motion.p>
  );
};

const AboutSection = () => {
  const tilt = useTilt(12);

  return (
    <SectionWrapper id="about" title="About" subtitle="Building at the intersection of AI and software.">
      <div className="relative max-w-6xl mx-auto space-y-20 md:space-y-32">

        {/* ── FIRST SCROLL: Portrait + Narrative ── */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left: 3D Tilt Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-5"
          >
            <div className="sticky top-32">
              <motion.div
                ref={tilt.ref}
                onMouseMove={tilt.onMouseMove}
                onMouseLeave={tilt.onMouseLeave}
                style={{
                  rotateX: tilt.rotateX,
                  rotateY: tilt.rotateY,
                  transformStyle: "preserve-3d",
                }}
                className="cursor-pointer"
              >
                {/* Holographic glow ring */}
                <div className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(99,102,241,0.15), rgba(34,211,238,0.15))",
                    filter: "blur(20px)",
                  }}
                />

                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-foreground/10 shadow-2xl shadow-amber-500/10 bg-foreground/5 p-2 group holographic-border">
                  {/* Animated shimmer border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl z-20 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(245,158,11,0.15) 0%, transparent 40%, rgba(99,102,241,0.1) 60%, transparent 80%, rgba(34,211,238,0.1) 100%)",
                      backgroundSize: "400% 400%",
                    }}
                    animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  />

                  <div className="w-full h-full rounded-xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-foreground/5 group-hover:bg-transparent transition-colors duration-700 z-10" />
                    <img
                      src={PROFILE_IMG}
                      alt="Abhishek H S"
                      className="w-full h-full object-cover transition-transform duration-700 scale-105 group-hover:scale-100"
                    />
                    {/* Depth layer floating in 3D */}
                    <motion.div
                      style={{ transform: "translateZ(40px)" }}
                      className="absolute bottom-4 left-4 right-4 z-30 backdrop-blur-sm bg-background/60 border border-foreground/15 rounded-xl p-4"
                    >
                      <p className="text-xs font-mono text-amber-500 uppercase tracking-widest mb-1">AI/ML Engineer</p>
                      <p className="text-sm font-serif text-foreground">Abhishek H S</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Narrative with glowing sections */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:col-span-7 space-y-10"
          >
            {[
              {
                label: "Who I Am",
                heading: "I'm Abhishek H S, an AI/ML Engineer and Full Stack Developer who enjoys turning ideas into working software.",
                body: "My work combines Python, FastAPI, React, SQL, Generative AI, RAG, NLP, and modern web technologies.",
                isQuote: false,
              },
              {
                label: "What I Explore",
                heading: null,
                body: "I explore Generative AI, LLM applications, RAG systems, NLP, speech technologies, backend development, and intelligent web applications.",
                isQuote: false,
              },
              {
                label: "What I Build",
                heading: null,
                body: "I build practical applications that combine AI with intuitive user experiences—from learning platforms and study tools to full-stack web applications.",
                isQuote: false,
              },
              {
                label: "Why I Build It",
                heading: '"Build useful things. Learn from every iteration."',
                body: "I believe every project is an opportunity to solve a problem, learn something new, and become a better engineer.",
                isQuote: true,
              },
            ].map((item, i) => (
              <motion.section
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="space-y-3 group"
              >
                <div className="relative">
                  <h3 className="text-xs font-mono text-amber-500 tracking-widest uppercase border-b border-foreground/10 pb-3 group-hover:text-amber-400 transition-colors">
                    {item.label}
                  </h3>
                  {/* Hover glow underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-amber-500/60 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                    style={{ originX: 0, width: "40%" }}
                  />
                </div>

                {item.heading && (
                  <p className={`${item.isQuote ? "text-xl md:text-2xl font-serif text-foreground italic leading-relaxed" : "text-xl md:text-2xl font-serif text-foreground/95 leading-relaxed"}`}>
                    {item.heading}
                  </p>
                )}
                <p className="text-base text-muted-foreground leading-relaxed font-light">{item.body}</p>
              </motion.section>
            ))}
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
              <Cpu size={14} className="text-amber-500 animate-pulse" />
              <h3 className="text-xs font-mono text-amber-500 tracking-widest uppercase">Tech Universe</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6 font-light leading-relaxed">
              My core technologies as an interactive 3D constellation. Drag to explore.
            </p>
            <Suspense fallback={
              <div className="w-full h-[420px] md:h-[520px] flex items-center justify-center border border-foreground/5 rounded-2xl">
                <p className="text-xs font-mono text-muted-foreground animate-pulse">Loading 3D...</p>
              </div>
            }>
              <SkillsOrb />
            </Suspense>
          </div>

          {/* Education + Stats */}
          <div className="order-1 lg:order-2 space-y-10">
            {/* Education */}
            <section>
              <h3 className="text-xs font-mono text-amber-500 tracking-widest uppercase mb-6 flex items-center gap-2 border-b border-foreground/10 pb-3">
                <GraduationCap size={14} /> Foundation
              </h3>
              <div className="space-y-4">
                {[
                  { degree: "B.E in AI & ML", college: "Sri Siddhartha Institute of Technology", year: "2022 – 2026" },
                  { degree: "Pre-University (PCMB)", college: "Gnanapriya PU College, Tumakuru", year: "2020 – 2022" },
                ].map((edu, i) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    whileHover={{ x: 4 }}
                    className="relative border border-foreground/8 bg-foreground/[0.02] p-6 hover:border-amber-500/30 transition-all duration-300 group overflow-hidden"
                  >
                    {/* Shimmer on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.03), transparent)" }} />
                    <p className="text-lg font-serif text-foreground mb-1">{edu.degree}</p>
                    <p className="text-sm text-amber-500/70 mb-2">{edu.college}</p>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{edu.year}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Animated Stats */}
            <section>
              <h3 className="text-xs font-mono text-amber-500 tracking-widest uppercase mb-6 border-b border-foreground/10 pb-3">By the Numbers</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: "5+", label: "Projects Built" },
                  { num: "5+", label: "Certifications" },
                  { num: "1", label: "AI Product Internship" },
                  { num: "2022-26", label: "Engineering Journey" },
                ].map(({ num, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, type: "spring", bounce: 0.3 }}
                    whileHover={{ scale: 1.04, y: -2 }}
                    className="relative border border-foreground/8 bg-foreground/[0.02] p-5 overflow-hidden group hover:border-amber-500/30 transition-colors duration-300"
                  >
                    {/* Corner glow */}
                    <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "radial-gradient(circle at top right, rgba(245,158,11,0.15), transparent)" }} />
                    <Counter value={num} />
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{label}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;