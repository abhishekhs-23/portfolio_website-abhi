import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { Award, BookOpen } from "lucide-react";

const experiences = [
  {
    role: "AI Product Intern",
    company: "Innerverse Technologies",
    desc: "Contributed to AI product development and integration. Explored practical applications of generative models to improve internal tools and user-facing features.",
    period: "Recent",
  },
  {
    role: "AI Research Intern",
    company: "Tech AI Lab",
    desc: "Developed computer vision models for object detection. Improved model accuracy by 15% through data augmentation and transfer learning techniques.",
    period: "June 2025 – Aug 2025",
  },
];

const interests = [
  "Artificial Intelligence",
  "Machine Learning",
  "Computer Vision",
  "Generative AI",
  "Web Development",
  "Human-Computer Interaction",
];

const achievements = [
  "2nd Place – Robo Race Competition (2022)",
  "National Level Project Competition – Line Follower Bot (2023)",
  "Inspire Award (District Level) – Agriculture Fertilizer Spraying Drone (2020)",
  "Computer Vision Using Python (2025)",
  "NPTEL – Introduction to Intellectual Property (2025)",
  "HTML Certification & Oracle Database Course (2024)",
];

const ExperienceSection = () => (
  <SectionWrapper id="experience" title="Experience" subtitle="Learning, growing, and building.">
    <div className="grid lg:grid-cols-3 gap-16 relative">
      {/* Left: Experience Timeline + Interests */}
      <div className="lg:col-span-2 space-y-14">
        {/* Timeline */}
        <div className="relative border-l border-foreground/12 ml-3 space-y-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative pl-8 group"
            >
              {/* Timeline dot */}
              <div className="absolute w-2.5 h-2.5 bg-background border-2 border-amber-500/50 rounded-full -left-[5.5px] top-2 group-hover:bg-amber-500 group-hover:shadow-[0_0_12px_rgba(245,158,11,0.35)] transition-all duration-500" />

              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2 gap-1">
                <h4 className="text-xl font-serif text-foreground group-hover:text-foreground/100 transition-colors">{exp.role}</h4>
                <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">{exp.period}</span>
              </div>
              <p className="text-xs font-mono text-amber-500/80 mb-4 uppercase tracking-widest">{exp.company}</p>
              <p className="text-sm text-muted-foreground leading-relaxed font-light max-w-xl">{exp.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Research Interests */}
        <div>
          <h3 className="text-xs font-mono text-amber-500 tracking-widest uppercase mb-5 flex items-center gap-2 border-b border-foreground/10 pb-3">
            <BookOpen size={14} /> Research Interests
          </h3>
          <div className="flex flex-wrap gap-4">
            {interests.map((item) => (
              <span
                key={item}
                className="border-b border-foreground/15 pb-0.5 text-sm text-muted-foreground hover:text-foreground hover:border-amber-500/40 transition-all duration-300 cursor-default"
              >
                {item}
              </span>
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
              key={item}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="py-4 border-b border-foreground/6 text-sm text-muted-foreground flex items-start gap-3 group hover:border-foreground/12 transition-colors"
            >
              <Award size={13} className="text-amber-500/50 mt-0.5 shrink-0" />
              <span className="leading-relaxed group-hover:text-foreground/80 transition-colors">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export default ExperienceSection;
