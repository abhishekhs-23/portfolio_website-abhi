import { User } from 'lucide-react';

const highlights = [
  'AI/ML',
  'Generative AI',
  'Backend Development',
  'Full Stack Development',
  'RAG Systems',
  'NLP'
];

export const AboutResponse = ({ isDark }: { isDark: boolean }) => {
  const bgCard = isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200';
  const textPrimary = isDark ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';
  const tagBg = isDark ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' : 'bg-amber-50 text-amber-700 border-amber-200';

  return (
    <div className="flex flex-col gap-3 mt-2 w-[280px] sm:w-[320px]">
      <div className={`p-4 border rounded-xl ${bgCard}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-full ${isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600'}`}>
            <User size={16} />
          </div>
          <h4 className={`text-sm font-bold ${textPrimary}`}>Abhishek H S</h4>
        </div>
        
        <p className={`text-xs leading-relaxed mb-4 ${textSecondary}`}>
          Abhishek H S is an AI/ML Engineer and Full Stack Developer focused on building practical AI-powered applications and modern software systems.
        </p>

        <div className="flex flex-wrap gap-1.5">
          {highlights.map(tag => (
            <span key={tag} className={`text-[10px] px-2 py-0.5 rounded border ${tagBg}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
