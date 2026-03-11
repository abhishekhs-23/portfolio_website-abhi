import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { Brain, Code, Cpu, GraduationCap } from "lucide-react";

const timeline = [
  { year: "2019", title: "Started CS Degree", desc: "Began studying Computer Science with a focus on algorithms and data structures.", icon: GraduationCap },
  { year: "2021", title: "Discovered AI & ML", desc: "Deep dive into machine learning, neural networks, and computer vision.", icon: Brain },
  { year: "2022", title: "First AI Project", desc: "Built a face recognition security system using OpenCV and deep learning.", icon: Cpu },
  { year: "2023", title: "Full-Stack + AI", desc: "Combined web development with AI to create intelligent applications.", icon: Code },
];

const AboutSection = () => (
  <SectionWrapper id="about" title="About Me" subtitle="Passionate about building intelligent systems that make a difference.">
    <div className="grid md:grid-cols-2 gap-12 items-start">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-muted-foreground leading-relaxed mb-6">
          I'm an AI Developer and Software Engineer with a deep passion for artificial intelligence, 
          machine learning, and modern web technologies. My journey into tech started with curiosity 
          about how machines learn and evolved into building real-world applications that leverage 
          cutting-edge AI.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Currently focused on computer vision, generative AI, and creating seamless human-computer 
          interaction experiences. I believe in writing clean, scalable code and crafting solutions 
          that are both technically sound and user-friendly.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Projects Completed", value: "15+" },
            { label: "Technologies", value: "20+" },
            { label: "Certifications", value: "8+" },
            { label: "Hackathons", value: "5+" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="space-y-6">
        {timeline.map((item, i) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-primary shrink-0">
                <item.icon size={18} />
              </div>
              {i < timeline.length - 1 && <div className="w-px h-full bg-border mt-2" />}
            </div>
            <div className="pb-6">
              <span className="text-xs font-mono text-primary">{item.year}</span>
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </SectionWrapper>
);

export default AboutSection;
