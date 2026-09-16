import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown, BookOpen, GraduationCap, Languages, ShoppingCart, CloudSun } from 'lucide-react';

const projects = [
  {
    id: 1,
    name: 'Intellearn',
    role: 'AI-Powered Teaching Platform',
    desc: 'An intelligent platform utilizing Generative AI and RAG to create an interactive learning experience with dynamic curriculum generation and automated assessments.',
    tags: ['Python', 'FastAPI', 'React', 'Generative AI', 'RAG'],
    link: 'https://github.com/abhishekhs-23/intellearn._.ai_powered_interactive_teaching_assistant',
    icon: <BookOpen size={16} />
  },
  {
    id: 2,
    name: 'Study Help',
    role: 'AI Study Assistant',
    desc: 'A comprehensive study assistant leveraging AI to help students organize, summarize, and query their learning materials efficiently.',
    tags: ['Next.js', 'TypeScript', 'LLMs', 'Tailwind', 'Supabase'],
    link: 'https://github.com/abhishekhs-23/study-help',
    icon: <GraduationCap size={16} />
  },
  {
    id: 3,
    name: 'English Learn',
    role: 'English Learning Platform',
    desc: 'An interactive application designed to improve English proficiency through AI-driven conversational practice and vocabulary building.',
    tags: ['React', 'Node.js', 'NLP', 'Speech-to-Text'],
    link: 'https://github.com/abhishekhs-23/abhi-s-english-learn-application',
    icon: <Languages size={16} />
  },
  {
    id: 4,
    name: 'E-Commerce Platform',
    role: 'Full-Stack E-Commerce Application',
    desc: 'A robust online shopping platform featuring real-time inventory, secure payments, and a responsive modern user interface.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux'],
    link: 'https://github.com/abhishekhs-23/e-commerce-website',
    icon: <ShoppingCart size={16} />
  },
  {
    id: 5,
    name: 'Weather Forecast Website',
    role: 'Weather Forecast Application',
    desc: 'A responsive weather dashboard providing real-time forecasts, interactive maps, and detailed meteorological data using external APIs.',
    tags: ['JavaScript', 'HTML/CSS', 'REST APIs', 'Chart.js'],
    link: 'https://github.com/abhishekhs-23/weather',
    icon: <CloudSun size={16} />
  }
];

export const ProjectsResponse = ({ isDark }: { isDark: boolean }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const bgCard = isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200';
  const textPrimary = isDark ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-500';
  const tagBg = isDark ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' : 'bg-amber-50 text-amber-700 border-amber-200';

  return (
    <div className="flex flex-col gap-3 mt-2 w-[280px] sm:w-[320px]">
      <p className={`text-sm mb-1 ${textPrimary}`}>Here are some of my featured projects:</p>
      {projects.map((p) => (
        <div key={p.id} className={`border rounded-xl overflow-hidden transition-colors ${bgCard} hover:border-amber-500/30`}>
          <button 
            className="w-full p-3 flex items-center justify-between text-left"
            onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-white/5 text-amber-400' : 'bg-white text-amber-600 shadow-sm'}`}>
                {p.icon}
              </div>
              <div>
                <h4 className={`text-sm font-semibold ${textPrimary}`}>{p.name}</h4>
                <p className={`text-xs ${textSecondary}`}>{p.role}</p>
              </div>
            </div>
            <ChevronDown size={14} className={`${textSecondary} transition-transform duration-300 ${expandedId === p.id ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {expandedId === p.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className={`p-3 pt-0 border-t ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
                  <p className={`text-xs mt-3 mb-3 leading-relaxed ${textSecondary}`}>{p.desc}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.map(t => (
                      <span key={t} className={`text-[10px] px-2 py-0.5 rounded border ${tagBg}`}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1 text-xs font-medium transition-colors ${isDark ? 'text-amber-400 hover:text-amber-300' : 'text-amber-600 hover:text-amber-700'}`}
                  >
                    View GitHub <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
