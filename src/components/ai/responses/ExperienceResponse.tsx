import { Briefcase } from 'lucide-react';

const bullets = [
  'LLM workflows',
  'Prompt engineering',
  'Speech-to-text',
  'NLP',
  'Chatbot integration',
  'REST APIs',
  'Data validation/testing',
  'Debugging',
  'Rapid prototyping'
];

export const ExperienceResponse = ({ isDark }: { isDark: boolean }) => {
  const bgCard = isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200';
  const textPrimary = isDark ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-500';
  
  return (
    <div className="flex flex-col gap-3 mt-2 w-[280px] sm:w-[320px]">
      <p className={`text-sm mb-1 ${textPrimary}`}>My recent professional experience:</p>
      
      <div className={`p-4 border rounded-xl ${bgCard}`}>
        <div className="flex items-start gap-3 mb-4">
          <div className={`p-2 rounded-lg mt-0.5 ${isDark ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-600 shadow-sm border border-amber-100'}`}>
            <Briefcase size={16} />
          </div>
          <div>
            <h4 className={`text-sm font-bold ${textPrimary}`}>AI Product Intern</h4>
            <p className={`text-xs font-medium ${isDark ? 'text-amber-400/90' : 'text-amber-700'}`}>Innerverse Technologies</p>
            <p className={`text-[10px] font-mono mt-1 ${textSecondary}`}>Feb 2026 – May 2026</p>
          </div>
        </div>
        
        <ul className="space-y-1.5 ml-1">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex items-center gap-2 text-xs">
              <span className={`w-1 h-1 rounded-full ${isDark ? 'bg-amber-500/50' : 'bg-amber-500'}`} />
              <span className={textSecondary}>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
