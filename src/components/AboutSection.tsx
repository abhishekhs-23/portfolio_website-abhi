import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { BellElectric, Brain, CloudAlertIcon, Code, GraduationCap } from "lucide-react";

const timeline = [
  { year: "2022-2026", title: "B.E in AI & ML", desc: "Sri Siddhartha Institute of Technology, Tumakuru | CGPA: 6.65", icon: GraduationCap },
  { year: "2019", title: "Schooling", desc: "Mount View Public School, Madhugiri : 88%", icon: GraduationCap },
  { year: "2020-2022", title: "PUC", desc: "Gnanapriya PU College, Madhugiri | KSEE: 66%", icon: GraduationCap },
  { year: "2024", title: "Hardware project", desc: "LiFi Communication Systems", icon: BellElectric },
  { year: "2024", title: "AI Projects", desc: "Built Air Drawing using webcam & hand geusture", icon: Code },
  { year: "2025", title: "AI Teaching Assistant", desc: "on going project", icon: Brain },
  { year: "2026", title: "Weather Forecast Web Application", desc: " Forecast  using weather API.", icon: CloudAlertIcon }
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
          I'm an AI/ML Engineer and Full Stack Web Developer with a deep passion for artificial intelligence, 
          machine learning, and modern web technologies. Currently pursuing my B.E. in Artificial Intelligence 
          and Machine Learning at Sri Siddhartha Institute of Technology, Tumakuru.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          I have hands-on experience building real-time AI applications including hand gesture recognition systems, 
          LiFi communication, and AI-powered teaching assistants. I'm passionate about creating innovative solutions 
          that leverage cutting-edge AI technologies.
        </p>
        
        {/* Education Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-primary">Education</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <GraduationCap size={16} className="text-primary mt-1" />
              <div>
                <p className="text-sm font-medium">B.E - Artificial Intelligence and Machine Learning</p>
                <p className="text-xs text-muted-foreground">Sri Siddhartha Institute of Technology, Tumakuru</p>
                <p className="text-xs text-muted-foreground">2022-2026 | CGPA: 6.62</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <GraduationCap size={16} className="text-primary mt-1" />
              <div>
                <p className="text-sm font-medium">PUC</p>
                <p className="text-xs text-muted-foreground">Gnanapriya PU College, Madhugiri</p>
                <p className="text-xs text-muted-foreground">2020-2022 | KSEE: 88%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Projects Completed", value: "3+" },
            { label: "Technologies", value: "15+" },
            { label: "Certifications", value: "4+" },
        
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