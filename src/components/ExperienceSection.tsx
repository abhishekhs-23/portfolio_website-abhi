import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { Briefcase, Award, BookOpen } from "lucide-react";

const experiences = [
  {
    role: "AI Research Intern",
    company: "Tech AI Lab",
    desc: "Developed computer vision models for object detection. Improved model accuracy by 15% through data augmentation and transfer learning techniques.",
    icon: Briefcase,
    period: "June 2025 - Aug 2025",
  }
  ];

const interests = [
  "Artificial Intelligence", "Machine Learning", "Computer Vision",
  "Generative AI", "Web Development", "Human-Computer Interaction",
];

const achievements = [
  "2nd Place – Robo Race Competition (2022)",
  "National Level Project Competition – Line Follower Bot (2023)",
  "Inspire Award (District Level) – Agriculture Fertilizer Spraying Drone (2020)",
  "Computer Vision Using Python (2025)",
  "NPTEL – Introduction to Intellectual Property (2025)",
  "HTML Certification & Oracle Database Course (2024)"
];

const ExperienceSection = () => (
  <SectionWrapper id="experience" title="Experience & Achievements" subtitle="My professional journey and accomplishments.">
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Experience */}
      <div className="lg:col-span-2 space-y-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Briefcase size={18} className="text-primary" /> Experience
        </h3>
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.role}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h4 className="font-semibold text-foreground">{exp.role}</h4>
              <span className="text-xs font-mono text-primary">{exp.period}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{exp.company}</p>
            <p className="text-sm text-muted-foreground">{exp.desc}</p>
          </motion.div>
        ))}

        {/* Interests */}
        <h3 className="text-xl font-semibold flex items-center gap-2 pt-6">
          <BookOpen size={18} className="text-primary" /> Research Interests
        </h3>
        <div className="flex flex-wrap gap-3">
          {interests.map((item) => (
            <span key={item} className="glass px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-primary transition-colors">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-xl font-semibold flex items-center gap-2 mb-6">
          <Award size={18} className="text-primary" /> Achievements
        </h3>
        <div className="space-y-3">
          {achievements.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 5, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-lg p-4 text-sm text-muted-foreground flex items-start gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export default ExperienceSection;
