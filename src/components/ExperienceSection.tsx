import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import { Award, BookOpen, Zap } from "lucide-react";

const experiences = [
  {
    role: "AI Product Intern",
    company: "Innerverse Technologies",
    desc: "Worked on AI-powered products involving LLM workflows, prompt engineering, speech-to-text, NLP, chatbot integration, and REST APIs. Contributed to data validation, AI response testing, debugging, rapid prototyping, and feature development across 3 live projects.",
    period: "Feb 2026 – May 2026",
    color: "#f59e0b",
  }
];

const interests = [
  { label: "Generative AI", color: "#f59e0b" },
  { label: "LLM Applications", color: "#6366f1" },
  { label: "RAG Systems", color: "#22d3ee" },
  { label: "AI/ML", color: "#10b981" },
  { label: "NLP", color: "#f97316" },
  { label: "Speech AI", color: "#a78bfa" },
  { label: "Backend Engineering", color: "#f43f5e" },
  { label: "Human-Computer Interaction", color: "#3b82f6" },
];

const achievements = [
  { text: "2nd Place — Robo Race Competition (2022)", icon: "🏆" },
  { text: "National Level Project Competition — Line Follower Bot (2023)", icon: "🤖" },
  { text: "Inspire Award — Agriculture Fertilizer Spraying Drone (District Level, 2020)", icon: "🌱" },
  { text: "Artificial Intelligence Course — Adverk (2023)", icon: "🧠" },
  { text: "NPTEL — Introduction to Intellectual Property (2025)", icon: "📜" },
  { text: "Computer Vision Using Python (2025)", icon: "👁️" },
  { text: "HTML Certification (2024)", icon: "🌐" },
  { text: "Oracle Database Course (2024)", icon: "🗄️" },
];

// Animated energy timeline beam
const TimelineBeam = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="absolute left-0 top-0 w-px h-full bg-foreground/8 overflow-hidden">
      <motion.div
        initial={{ height: "0%" }}
        animate={inView ? { height: "100%" } : {}}
        transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
        className="w-full absolute top-0"
        style={{
          background: "linear-gradient(to bottom, #f59e0b, #6366f1, #22d3ee)",
          boxShadow: "0 0 8px rgba(245,158,11,0.5)",
        }}
      />
      {/* Moving particle along beam */}
      <motion.div
        initial={{ top: "0%" }}
        animate={inView ? { top: ["0%", "100%"] } : {}}
        transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
        className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
        style={{
          background: "#f59e0b",
          boxShadow: "0 0 12px #f59e0b, 0 0 24px rgba(245,158,11,0.5)",
        }}
      />
    </div>
  );
};

const ExperienceSection = () => (
  <SectionWrapper id="experience" title="Experience" subtitle="Learning, growing, and building.">
    <div className="grid lg:grid-cols-3 gap-16 relative">

      {/* Left: Experience Timeline + Interests */}
      <div className="lg:col-span-2 space-y-12 md:space-y-16">

        {/* Timeline */}
        <div className="relative border-l border-foreground/12 ml-3 space-y-10 pb-6">
          <TimelineBeam />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className="relative pl-8 group"
            >
              {/* Glowing timeline dot */}
              <div className="absolute -left-[5.5px] top-2 w-3 h-3">
                <div
                  className="w-full h-full rounded-full border-2 border-amber-500 bg-background group-hover:bg-amber-500 transition-colors duration-400"
                  style={{ boxShadow: "0 0 0 0 rgba(245,158,11,0)" }}
                />
                {/* Pulse rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-amber-500"
                  animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border border-amber-500"
                  animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.7 }}
                />
              </div>

              <motion.div
                whileHover={{ x: 4 }}
                className="relative border border-foreground/6 bg-foreground/[0.015] p-6 overflow-hidden group/card hover:border-amber-500/20 transition-all duration-400"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group/card:hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(245,158,11,0.04), transparent 60%)" }} />

                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group/card:hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, ${exp.color}60, transparent)` }} />

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2 gap-1">
                  <h4 className="text-xl font-serif text-foreground flex items-center gap-2">
                    <Zap size={16} className="text-amber-500" />
                    {exp.role}
                  </h4>
                  <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">{exp.period}</span>
                </div>
                <p className="text-xs font-mono mb-4 uppercase tracking-widest" style={{ color: exp.color }}>{exp.company}</p>
                <p className="text-sm text-muted-foreground leading-relaxed font-light max-w-xl">{exp.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Research Interests — 3D chip style */}
        <div>
          <h3 className="text-xs font-mono text-amber-500 tracking-widest uppercase mb-6 flex items-center gap-2 border-b border-foreground/10 pb-3">
            <BookOpen size={14} /> Research Interests
          </h3>
          <div className="flex flex-wrap gap-3">
            {interests.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="relative cursor-default group"
              >
                <span
                  className="block px-3 py-1.5 text-xs font-mono tracking-wide border transition-all duration-300"
                  style={{
                    borderColor: `${item.color}25`,
                    color: "hsl(var(--muted-foreground))",
                  }}
                >
                  {item.label}
                </span>
                {/* Hover glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: `0 0 12px ${item.color}30, inset 0 0 12px ${item.color}08`,
                    borderColor: item.color,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Achievements */}
      <div>
        <h3 className="text-xs font-mono text-amber-500 tracking-widest uppercase mb-7 flex items-center gap-2 border-b border-foreground/10 pb-3">
          <Award size={14} /> Achievements & Certifications
        </h3>
        <div className="space-y-0">
          {achievements.map((item, i) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ x: 4 }}
              className="py-4 border-b border-foreground/6 text-sm text-muted-foreground flex items-start gap-3 group hover:border-foreground/15 transition-all cursor-default"
            >
              <span className="text-base shrink-0 mt-0.5">{item.icon}</span>
              <span className="leading-relaxed group-hover:text-foreground/80 transition-colors flex-1">{item.text}</span>
              <motion.div
                className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500/50"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export default ExperienceSection;
