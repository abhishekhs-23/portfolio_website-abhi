import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const categories = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", level: 95 },
      { name: "Java", level: 75 },
      { name: "SQL", level: 80 },
      { name: "HTML", level: 70 },
    ],
  },
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "Machine Learning", level: 85 },
      { name: "Artificial Intelligence", level: 80 },
      { name: "Computer Vision (OpenCV)", level: 85 },
      { name: "Data Analytics", level: 75 },
    ],
  },
  {
    title: "Web Development",
    skills: [
      { name: "React / Next.js", level: 80 },
      { name: "Node.js / Express", level: 75 },
      { name: "TailwindCSS", level: 85 },
      { name: "Full Stack Development", level: 80 },
    ],
  },
  {
    title: "Tools & Databases",
    skills: [
      { name: "VS Code", level: 90 },
      { name: "Google Colab", level: 85 },
      { name: "MySQL", level: 80 },
      { name: "MongoDB", level: 70 },
      {name: "Git & GitHub", level: 80 },
      {name: "Docker", level: 65 },

    ],
  },
];

const SkillsSection = () => (
  <SectionWrapper id="skills" title="Skills & Expertise" subtitle="Technologies and tools I work with daily.">
    <div className="grid md:grid-cols-2 gap-8">
      {categories.map((cat, ci) => (
        <motion.div
          key={cat.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: ci * 0.1 }}
          className="glass rounded-xl p-6 hover:glow-primary transition-shadow duration-500"
        >
          <h3 className="text-lg font-semibold mb-5 text-primary">{cat.title}</h3>
          <div className="space-y-4">
            {cat.skills.map((skill, si) => (
              <div key={skill.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-foreground">{skill.name}</span>
                  <span className="text-muted-foreground font-mono text-xs">{skill.level}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: ci * 0.1 + si * 0.05, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);

export default SkillsSection;
