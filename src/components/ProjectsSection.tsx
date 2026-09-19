import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { Github, Sparkles, ChevronRight, Mic, Languages, Brain, FileText, Database, Bot, ExternalLink } from "lucide-react";

const filters = ["All", "AI / ML", "Web", "Computer Vision", "Hardware"];

const projects = [
  {
    title: "Intellearn",
    desc: "AI-powered teaching platform with real-time speech-to-text, multilingual translation, lecture notes, quiz generation, and RAG-based AI tutoring.",
    tags: ["Python", "FastAPI", "RAG", "LLMs", "Whisper", "React", "Supabase", "Docker"],
    category: "AI / ML",
    github: "https://github.com/abhishekhs-23/intellearn._.ai_powered_interactive_teaching_assistant",
    color: "#f59e0b",
  },
  {
    title: "Study Help",
    desc: "An AI-powered study application designed to help students understand topics, learn concepts, and get interactive study assistance.",
    tags: ["Python", "AI/ML", "LLM", "NLP", "React"],
    category: "AI / ML",
    github: "https://github.com/abhishekhs-23/study-help",
    color: "#6366f1",
  },
  {
    title: "English Learn",
    desc: "An interactive learning platform designed to help users improve their English through structured learning and practice.",
    tags: ["React", "JavaScript", "AI", "NLP"],
    category: "Web",
    github: "https://github.com/abhishekhs-23/abhi-s-english-learn-application",
    color: "#22d3ee",
  },
  {
    title: "E-Commerce Platform",
    desc: "Full-stack e-commerce application with product management, authentication, REST APIs, database integration, and order management.",
    tags: ["Python", "Flask", "MySQL", "JavaScript"],
    category: "Web",
    github: "https://github.com/abhishekhs-23/e-commerce-website",
    color: "#10b981",
  },
  {
    title: "Weather Forecast Website",
    desc: "Weather application using external APIs with location search, live weather information, and a responsive dashboard.",
    tags: ["Python", "REST APIs", "JavaScript", "HTML", "CSS"],
    category: "Web",
    github: "https://github.com/abhishekhs-23/weather",
    color: "#f97316",
  },
  {
    title: "LiFi Data Transmission System",
    desc: "Designed a wireless communication system using light as the transmission medium to successfully transfer data between communicable devices.",
    tags: ["Arduino Uno", "Embedded Systems", "Hardware"],
    category: "Hardware",
    github: "#",
    color: "#a78bfa",
  }
];

// IntelLearn pipeline steps
const pipelineSteps = [
  { icon: Mic, label: "Lecture / YouTube / Live Audio", color: "#f59e0b" },
  { icon: Languages, label: "Speech Recognition & Translation", color: "#3b82f6" },
  { icon: Brain, label: "LLM Processing", color: "#a78bfa" },
  { icon: FileText, label: "Notes / Quiz / PPT Generation", color: "#10b981" },
  { icon: Database, label: "RAG Knowledge Base", color: "#f59e0b" },
  { icon: Bot, label: "AI Tutor (Doubt Solver)", color: "#22d3ee" },
];

// 3D Tilt Featured Card
const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(springY, [-1, 1], [8, -8]);
  const rotateY = useTransform(springX, [-1, 1], [-8, 8]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="cursor-default"
    >
      {children}
    </motion.div>
  );
};

// Flip Project Card
const FlipCard = ({ project }: { project: typeof projects[0] }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="relative h-64"
      style={{ perspective: "1000px" }}
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
    >
      {/* Card container */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d", width: "100%", height: "100%", position: "relative" }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 border border-foreground/8 bg-foreground/[0.02] p-6 flex flex-col justify-between overflow-hidden group"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${project.color}50, transparent)` }} />

          <div>
            {/* Color dot */}
            <div className="w-2 h-2 rounded-full mb-4 neon-glow" style={{ background: project.color }} />
            <h3 className="text-lg font-serif text-foreground mb-2">{project.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-light line-clamp-3">{project.desc}</p>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">
            <span>Hover to explore</span>
            <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 border p-6 flex flex-col justify-between overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, ${project.color}10, hsl(var(--card) / 0.9))`,
            borderColor: `${project.color}30`,
          }}
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: project.color }}>
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map(t => (
                <span
                  key={t}
                  className="text-[10px] font-mono px-2 py-0.5 rounded"
                  style={{
                    border: `1px solid ${project.color}40`,
                    color: project.color,
                    background: `${project.color}10`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest transition-all"
              style={{ color: project.color }}
              onClick={e => e.stopPropagation()}
            >
              <Github size={13} /> View Repository <ExternalLink size={11} />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter(p => p.category === active);

  return (
    <SectionWrapper id="projects" title="Projects" subtitle="Ideas transformed into impact.">

      {/* Featured: IntelLearn — 3D Tilt */}
      <div className="mb-28">
        <TiltCard>
          <div className="relative border border-foreground/10 bg-foreground/[0.02] overflow-hidden group"
            style={{ transformStyle: "preserve-3d" }}>
            {/* Animated top border */}
            <motion.div
              className="absolute top-0 left-0 w-full h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent)" }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Background glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(245,158,11,0.04), transparent 60%)" }} />

            <div className="p-8 md:p-12">
              <div className="flex flex-col lg:flex-row gap-12 items-start">
                {/* Left: Description */}
                <div className="flex-1 space-y-6" style={{ transform: "translateZ(20px)" }}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 border border-amber-500/20 bg-amber-500/5 text-amber-400 text-[10px] font-mono uppercase tracking-widest">
                    <Sparkles size={12} className="animate-pulse" /> Featured Project
                  </div>

                  <motion.h3
                    className="text-3xl md:text-4xl font-serif text-foreground"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Intellearn
                  </motion.h3>

                  <p className="text-sm text-amber-500/60 font-mono uppercase tracking-widest">
                    AI-Powered Teaching Platform
                  </p>
                  <p className="text-muted-foreground leading-relaxed font-light">
                    AI-powered teaching platform with real-time speech-to-text, multilingual translation, lecture notes, quiz generation, and RAG-based AI tutoring.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {["Python", "FastAPI", "RAG", "LLMs", "Whisper", "React", "Supabase", "Docker"].map(t => (
                      <motion.span
                        key={t}
                        whileHover={{ scale: 1.08, y: -1 }}
                        className="text-[10px] font-mono px-2.5 py-1 border border-foreground/10 text-muted-foreground uppercase tracking-wider hover:border-amber-500/40 hover:text-amber-500 transition-colors cursor-default"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>

                  <a
                    href="https://github.com/abhishekhs-23/intellearn._.ai_powered_interactive_teaching_assistant"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-amber-500 transition-colors border-b border-amber-500/30 pb-1 group/link"
                  >
                    <Github size={14} />
                    <span>View Source Code</span>
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </a>
                </div>

                {/* Right: AI Pipeline */}
                <div className="flex-1 w-full">
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-6">System Architecture</p>
                  <div className="space-y-1">
                    {pipelineSteps.map((step, i) => (
                      <motion.div
                        key={step.label}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        whileHover={{ x: 4, scale: 1.01 }}
                        className="flex items-center gap-4 py-3 px-4 border border-foreground/8 bg-foreground/[0.01] hover:bg-foreground/[0.04] transition-all group relative overflow-hidden"
                      >
                        {/* Hover glow */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: `linear-gradient(90deg, ${step.color}08, transparent)` }} />

                        <div style={{ color: step.color }} className="opacity-60 group-hover:opacity-100 transition-opacity z-10">
                          <step.icon size={18} />
                        </div>
                        <span className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors font-light flex-1 z-10">
                          {step.label}
                        </span>
                        {i < pipelineSteps.length - 1 && (
                          <motion.div
                            animate={{ opacity: [0.2, 0.7, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                          >
                            <ChevronRight size={14} className="text-foreground/20" />
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TiltCard>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-6 mb-12 border-b border-foreground/10 pb-5">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className="relative text-xs font-mono uppercase tracking-widest transition-all duration-300"
            style={{ color: active === f ? "#f59e0b" : undefined }}
          >
            <span className={active === f ? "text-amber-500" : "text-muted-foreground hover:text-foreground"}>
              {f}
            </span>
            {active === f && (
              <motion.div
                layoutId="filter-underline"
                className="absolute -bottom-1 left-0 right-0 h-px bg-amber-500"
                style={{ background: "linear-gradient(90deg, #f59e0b, #f97316)" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* 3D Flip Project Grid */}
      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map(p => (
            <FlipCard key={p.title} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
};

export default ProjectsSection;
