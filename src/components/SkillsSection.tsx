import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const categories = [
  {
    title: "Programming",
    skills: ["Python", "SQL", "JavaScript", "TypeScript", "HTML", "CSS"],
  },
  {
    title: "AI & ML",
    skills: ["AI/ML", "Generative AI", "LLMs", "RAG", "NLP", "Computer Vision", "Speech-to-Text"],
  },
  {
    title: "Backend",
    skills: ["FastAPI", "Flask", "REST APIs", "API Integration", "CRUD", "Authentication"],
  },
  {
    title: "Web",
    skills: ["React", "Vite", "Tailwind CSS", "Full Stack Development", "Responsive UI"],
  },
  {
    title: "Database & Tools",
    skills: ["MySQL", "PostgreSQL", "Supabase", "Git", "GitHub", "Docker", "Vercel"],
  }
];

const SkillsSection = () => (
  <SectionWrapper id="skills" title="Skills" subtitle="Tools and technologies powering my work.">
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((cat, ci) => (
        <motion.div
          key={cat.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: ci * 0.1 }}
          className="group"
        >
          <div className="p-6 border border-foreground/8 bg-foreground/[0.02] hover:border-amber-500/30 transition-colors duration-500 h-full flex flex-col">
            <h3 className="text-[10px] font-mono text-amber-500 mb-5 tracking-widest uppercase border-b border-foreground/10 pb-3">
              {cat.title}
            </h3>
            <div className="flex flex-wrap gap-2 mt-auto">
              {cat.skills.map((skill, si) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: ci * 0.08 + si * 0.04 }}
                  className="px-2.5 py-1 border border-foreground/10 bg-foreground/[0.03] text-xs text-muted-foreground font-mono hover:bg-amber-500/15 hover:text-foreground hover:border-amber-500/40 transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);

export default SkillsSection;
