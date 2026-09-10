import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { Github, Sparkles, ChevronRight, Mic, Languages, Brain, FileText, Database, Bot } from "lucide-react";

const filters = ["All", "AI / ML", "Web", "Computer Vision"];

const projects = [
  {
    title: "Weather Forecast Web Application",
    desc: "A responsive weather forecasting web application that displays current weather conditions, a 5-day forecast with interactive charts, location-based weather detection, and search history.",
    tags: ["React", "OpenWeather API", "Chart.js", "TailwindCSS"],
    category: "Web",
    github: "https://github.com/abhiahek143/weather",
  },
  {
    title: "Air Drawing Using Hand Gesture Recognition",
    desc: "Developed a real-time interactive drawing system using hand gesture recognition. Implemented colour selection, eraser mode, and two-hand gesture control.",
    tags: ["Python", "OpenCV", "MediaPipe", "NumPy"],
    category: "Computer Vision",
    github: "#",
  },
  {
    title: "LiFi and Chatbot",
    desc: "Designed a data transmission system using light as the communication medium. Successfully transferred data between two communicable devices.",
    tags: ["Arduino Uno", "Light Source", "Embedded Systems"],
    category: "AI / ML",
    github: "#",
  },
  {
    title: "My Portfolio Website",
    desc: "A modern personal portfolio with 3D WebGL background, cinematic design, and smooth animations.",
    tags: ["React", "Three.js", "TailwindCSS"],
    category: "Web",
    github: "#",
  },
];

// IntelLearn pipeline steps
const pipelineSteps = [
  { icon: Mic, label: "Lecture / YouTube / Live Audio", color: "text-amber-400" },
  { icon: Languages, label: "Speech Recognition & Translation", color: "text-blue-400" },
  { icon: Brain, label: "LLM Processing", color: "text-purple-400" },
  { icon: FileText, label: "Notes / Quiz / PPT Generation", color: "text-emerald-400" },
  { icon: Database, label: "RAG Knowledge Base", color: "text-amber-400" },
  { icon: Bot, label: "AI Tutor (Doubt Solver)", color: "text-blue-400" },
];

const ProjectsSection = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <SectionWrapper id="projects" title="Projects" subtitle="Ideas transformed into impact.">

      {/* Featured: IntelLearn */}
      <div className="mb-24">
        <div className="border border-foreground/10 bg-foreground/[0.02] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

          <div className="p-8 md:p-12">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/* Left: Description */}
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 border border-amber-500/20 bg-amber-500/5 text-amber-400 text-[10px] font-mono uppercase tracking-widest">
                  <Sparkles size={12} /> Featured Project
                </div>
                <h3 className="text-3xl md:text-4xl font-serif text-foreground">
                  Intellearn
                </h3>
                <p className="text-sm text-amber-500/60 font-mono uppercase tracking-widest">
                  AI-Powered Interactive Teaching Assistant
                </p>
                <p className="text-muted-foreground leading-relaxed font-light">
                  An AI-based classroom assistant with real-time speech-to-text captions, multilingual translation, automatic lecture note generation, and context-aware doubt solving using Retrieval-Augmented Generation (RAG).
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {["Python", "NLP", "RAG", "Speech-to-Text", "LLMs", "Whisper"].map(t => (
                    <span key={t} className="text-[10px] font-mono px-2.5 py-1 border border-foreground/10 text-muted-foreground uppercase tracking-wider">{t}</span>
                  ))}
                </div>

                <div className="pt-4">
                  <a href="#" className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-amber-500 transition-colors border-b border-amber-500/30 pb-1">
                    <Github size={14} /> View Source Code
                  </a>
                </div>
              </div>

              {/* Right: AI Pipeline */}
              <div className="flex-1 w-full">
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-6">System Architecture</p>
                <div className="space-y-1">
                  {pipelineSteps.map((step, i) => (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="flex items-center gap-4 py-3 px-4 border border-foreground/8 bg-foreground/[0.01] hover:bg-foreground/[0.03] hover:border-foreground/15 transition-all group"
                    >
                      <div className={`${step.color} opacity-60 group-hover:opacity-100 transition-opacity`}>
                        <step.icon size={18} />
                      </div>
                      <span className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors font-light flex-1">
                        {step.label}
                      </span>
                      {i < pipelineSteps.length - 1 && (
                        <ChevronRight size={14} className="text-foreground/15" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-6 mb-12 border-b border-foreground/10 pb-5">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`text-xs font-mono uppercase tracking-widest transition-all duration-300 ${
              active === f
                ? "text-amber-500"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <motion.div layout className="grid md:grid-cols-2 gap-x-12 gap-y-14">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.title}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col group"
            >
              <h3 className="text-lg font-serif text-foreground/90 group-hover:text-foreground transition-colors mb-3">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-5 flex-1 leading-relaxed font-light">{p.desc}</p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {p.tags.map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 border border-foreground/8 text-muted-foreground uppercase tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
              <div className="pt-4 border-t border-foreground/10">
                <a href={p.github} className="text-muted-foreground hover:text-foreground/80 transition-colors flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
                  <Github size={13} /> Repository
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
};

export default ProjectsSection;
