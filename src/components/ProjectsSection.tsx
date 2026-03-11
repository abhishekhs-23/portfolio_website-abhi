import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { ExternalLink, Github, Sparkles } from "lucide-react";

const filters = ["All", "AI / ML", "Web", "Computer Vision"];

const projects = [
  {
    title: "AI-Powered Interactive Teaching Assistant",
    desc: "Developed an AI-based classroom assistant with real-time speech-to-text captions and multilingual translation. Implemented automatic lecture note generation and context-aware doubt solving using Retrieval-Augmented Generation (RAG).",
    tags: ["Python", "NLP", "RAG", "Speech-to-Text"],
    category: "AI / ML",
    github: "#",
    demo: "#",
    featured: true,
  },
  {
  title: "Weather Forecast Web Application",
  desc: "A responsive weather forecasting web application that displays current weather conditions, a 5-day forecast with interactive charts, location-based weather detection, and search history for previously searched cities.",
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
    demo: "#",
    featured: true,
  },
  {
    title: "LiFi and Chatbot",
    desc: "Designed a data transmission system using light as the communication medium. Successfully transferred data between two communicable devices.",
    tags: ["Arduino Uno", "Light Source", "Communicable Devices", "Embedded Systems"],
    category: "AI / ML",
    github: "#",
    demo: "#",
    featured: true,
  },
 {
  title: "My Portfolio Website",
  desc: "A modern and responsive personal portfolio website showcasing my projects, technical skills, achievements, and contact information with smooth animations and a professional UI.",
  tags: ["React", "Node.js", "TailwindCSS"],
  category: "Web",
  github: "#",
  demo: "#",
},
];

const ProjectsSection = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <SectionWrapper id="projects" title="Projects" subtitle="A selection of work I'm proud of.">
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
              active === f
                ? "bg-primary text-primary-foreground"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-xl p-6 flex flex-col group hover:glow-primary transition-shadow duration-500 relative overflow-hidden"
            >
              {p.featured && (
                <div className="absolute top-3 right-3 text-primary">
                  <Sparkles size={16} />
                </div>
              )}
              <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs font-mono px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a href={p.github} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm">
                  <Github size={14} /> Code
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
