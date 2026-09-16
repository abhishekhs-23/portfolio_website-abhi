import { Brain, Server, Layout, Database } from 'lucide-react';

const categories = [
  {
    title: 'AI & Generative AI',
    icon: <Brain size={14} />,
    skills: ['LLMs', 'RAG', 'NLP', 'Machine Learning', 'Generative AI', 'Prompt Engineering']
  },
  {
    title: 'Backend',
    icon: <Server size={14} />,
    skills: ['Python', 'FastAPI', 'Flask', 'REST APIs']
  },
  {
    title: 'Frontend',
    icon: <Layout size={14} />,
    skills: ['React', 'JavaScript', 'TypeScript', 'Vite', 'Tailwind CSS']
  },
  {
    title: 'Database & Tools',
    icon: <Database size={14} />,
    skills: ['SQL', 'MySQL', 'PostgreSQL', 'Supabase', 'Git', 'GitHub', 'Docker']
  }
];

export const SkillsResponse = ({ isDark }: { isDark: boolean }) => {
  const bgCard = isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200';
  const textPrimary = isDark ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-500';
  const tagBg = isDark ? 'bg-white/5 text-gray-300 border-white/10' : 'bg-white text-gray-700 border-gray-200 shadow-sm';

  return (
    <div className="flex flex-col gap-3 mt-2 w-[280px] sm:w-[320px]">
      <p className={`text-sm mb-2 ${textPrimary}`}>My technical expertise is divided into these core areas:</p>
      
      {categories.map((cat, i) => (
        <div key={i} className={`p-3 border rounded-xl ${bgCard}`}>
          <div className="flex items-center gap-2 mb-2.5">
            <span className={isDark ? 'text-amber-400' : 'text-amber-600'}>{cat.icon}</span>
            <h4 className={`text-xs font-semibold uppercase tracking-wider ${textPrimary}`}>{cat.title}</h4>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cat.skills.map(skill => (
              <span key={skill} className={`text-[10px] px-2 py-0.5 rounded-md border ${tagBg}`}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
