import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { ExternalLink, Github, Sparkles } from "lucide-react";

const filters = ["All", "AI / ML", "Web", "Computer Vision"];

const projects = [
  {
    title: "AI Teaching Assistant",
    desc: "An intelligent tutoring system powered by NLP that answers student questions, generates quizzes, and provides personalized learning paths.",
    tags: ["Python", "Transformers", "FastAPI", "React"],
    category: "AI / ML",
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    title: "Face Recognition Security",
    desc: "Real-time face detection and recognition system for secure access control using deep learning and OpenCV.",
    tags: ["Python", "OpenCV", "TensorFlow", "Flask"],
    category: "Computer Vision",
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    title: "Air Drawing with Gestures",
    desc: "Hand gesture recognition system that lets users draw in the air using MediaPipe and real-time video processing.",
    tags: ["Python", "MediaPipe", "OpenCV", "NumPy"],
    category: "Computer Vision",
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    title: "Sentiment Analysis Dashboard",
    desc: "Real-time social media sentiment analyzer with interactive charts and ML-powered classification.",
    tags: ["Python", "NLTK", "React", "D3.js"],
    category: "AI / ML",
    github: "#",
    demo: "#",
  },
  {
    title: "E-Commerce Platform",
    desc: "Full-stack e-commerce application with payment integration, admin dashboard, and responsive design.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    category: "Web",
    github: "#",
    demo: "#",
  },
  {
    title: "Developer Portfolio Generator",
    desc: "A tool that auto-generates portfolio websites from GitHub profiles using AI to write descriptions.",
    tags: ["Next.js", "OpenAI API", "TailwindCSS"],
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
                <a href={p.demo} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm">
                  <ExternalLink size={14} /> Demo
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
