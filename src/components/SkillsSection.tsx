import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const categories = [
  {
    title: "Programming",
    icon: "💻",
    color: "#3b82f6",
    skills: [
      { name: "Python", level: 90 },
      { name: "SQL", level: 80 },
      { name: "JavaScript", level: 78 },
      { name: "TypeScript", level: 72 },
      { name: "HTML", level: 85 },
      { name: "CSS", level: 78 },
    ],
  },
  {
    title: "AI & ML",
    icon: "🤖",
    color: "#f59e0b",
    skills: [
      { name: "AI/ML", level: 85 },
      { name: "Generative AI", level: 82 },
      { name: "LLMs", level: 80 },
      { name: "RAG", level: 78 },
      { name: "NLP", level: 75 },
      { name: "Computer Vision", level: 70 },
      { name: "Speech-to-Text", level: 72 },
    ],
  },
  {
    title: "Backend",
    icon: "⚡",
    color: "#10b981",
    skills: [
      { name: "FastAPI", level: 85 },
      { name: "Flask", level: 80 },
      { name: "REST APIs", level: 88 },
      { name: "API Integration", level: 82 },
      { name: "CRUD", level: 85 },
      { name: "Authentication", level: 78 },
    ],
  },
  {
    title: "Web",
    icon: "🌐",
    color: "#22d3ee",
    skills: [
      { name: "React", level: 82 },
      { name: "Vite", level: 78 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Full Stack", level: 80 },
      { name: "Responsive UI", level: 85 },
    ],
  },
  {
    title: "Database & Tools",
    icon: "🗄️",
    color: "#a78bfa",
    skills: [
      { name: "MySQL", level: 82 },
      { name: "PostgreSQL", level: 75 },
      { name: "Supabase", level: 78 },
      { name: "Git", level: 85 },
      { name: "Docker", level: 68 },
      { name: "Vercel", level: 80 },
    ],
  },
];

const SkillBar = ({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) => (
  <div className="space-y-1.5 group">
    <div className="flex justify-between items-center">
      <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors duration-300">{name}</span>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: delay + 0.5 }}
        className="text-[10px] font-mono text-muted-foreground/60"
      >
        {level}%
      </motion.span>
    </div>
    <div className="h-1 w-full bg-foreground/8 rounded-full overflow-hidden relative">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{
          originX: 0,
          width: `${level}%`,
          background: `linear-gradient(90deg, ${color}80, ${color})`,
        }}
        className="h-full rounded-full skill-bar relative"
      />
    </div>
  </div>
);

const SkillsSection = () => (
  <SectionWrapper id="skills" title="Skills" subtitle="Tools and technologies powering my work.">
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((cat, ci) => (
        <motion.div
          key={cat.title}
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: ci * 0.1 }}
          whileHover={{ y: -6, scale: 1.01 }}
          className="group"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="relative p-6 border border-foreground/8 bg-foreground/[0.02] h-full flex flex-col overflow-hidden transition-all duration-500 hover:border-opacity-60"
            style={{
              // Dynamic border glow color on hover
              "--glow-color": cat.color,
            } as React.CSSProperties}
          >
            {/* Animated top gradient bar */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)` }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: ci * 0.1 + 0.3 }}
            />

            {/* Hover glow background */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 50% 0%, ${cat.color}10, transparent 70%)` }}
            />

            {/* Corner accent */}
            <div
              className="absolute top-0 right-0 w-12 h-12 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at top right, ${cat.color}, transparent)` }}
            />

            {/* Header */}
            <div className="flex items-center gap-3 mb-5 pb-3 border-b border-foreground/10">
              <motion.span
                className="text-xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: ci * 0.5 }}
              >
                {cat.icon}
              </motion.span>
              <h3 className="text-[10px] font-mono tracking-widest uppercase" style={{ color: cat.color }}>
                {cat.title}
              </h3>
            </div>

            {/* Skill bars */}
            <div className="flex flex-col gap-3.5 flex-1">
              {cat.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={cat.color}
                  delay={ci * 0.08 + si * 0.05}
                />
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);

export default SkillsSection;
