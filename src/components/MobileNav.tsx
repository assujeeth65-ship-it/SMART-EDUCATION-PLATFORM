import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  Sparkles, 
  Bot, 
  Code2, 
  Trophy, 
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { 
    role, 
    schoolNav, 
    setSchoolNav, 
    collegeNav, 
    setCollegeNav, 
    adminNav, 
    setAdminNav,
    speakText 
  } = useApp();

  if (role === 'landing') return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#90caf9] px-2 py-2 shadow-2xl flex items-center justify-around text-xs">
      
      {/* School Navigation Tabs */}
      {role === 'school' && (
        <>
          <button
            onClick={() => setSchoolNav('dashboard')}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
              schoolNav === 'dashboard' ? 'text-[#2196f3] font-bold' : 'text-gray-500'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-[10px]">Dashboard</span>
          </button>

          <button
            onClick={() => setSchoolNav('academy')}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
              schoolNav === 'academy' ? 'text-[#2196f3] font-bold' : 'text-gray-500'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px]">Academy</span>
          </button>

          <button
            onClick={() => {
              setSchoolNav('concept-learning');
              speakText("AI Concept Learning active.");
            }}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
              schoolNav === 'concept-learning' ? 'text-[#2196f3] font-bold' : 'text-gray-500'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px]">Learn AI</span>
          </button>

          <button
            onClick={() => setSchoolNav('retest')}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
              schoolNav === 'retest' ? 'text-[#2196f3] font-bold' : 'text-gray-500'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-[10px]">Re-Test</span>
          </button>

          <button
            onClick={() => setSchoolNav('ai-assistant')}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
              schoolNav === 'ai-assistant' ? 'text-[#0d47a1] font-bold' : 'text-gray-500'
            }`}
          >
            <Bot className="w-4 h-4 text-[#0d47a1]" />
            <span className="text-[10px]">AI OS</span>
          </button>
        </>
      )}

      {/* College Navigation Tabs */}
      {role === 'college' && (
        <>
          <button
            onClick={() => setCollegeNav('dashboard')}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
              collegeNav === 'dashboard' ? 'text-[#2196f3] font-bold' : 'text-gray-500'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-[10px]">Dashboard</span>
          </button>

          <button
            onClick={() => setCollegeNav('programming')}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
              collegeNav === 'programming' ? 'text-[#2196f3] font-bold' : 'text-gray-500'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span className="text-[10px]">Code Hub</span>
          </button>

          <button
            onClick={() => setCollegeNav('hackathons')}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
              collegeNav === 'hackathons' ? 'text-[#2196f3] font-bold' : 'text-gray-500'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span className="text-[10px]">Events</span>
          </button>

          <button
            onClick={() => setCollegeNav('mock-interview')}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
              collegeNav === 'mock-interview' ? 'text-[#2196f3] font-bold' : 'text-gray-500'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px]">Interview</span>
          </button>

          <button
            onClick={() => setCollegeNav('ai-assistant')}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
              collegeNav === 'ai-assistant' ? 'text-[#0d47a1] font-bold' : 'text-gray-500'
            }`}
          >
            <Bot className="w-4 h-4 text-[#0d47a1]" />
            <span className="text-[10px]">AI OS</span>
          </button>
        </>
      )}

      {/* Admin Navigation Tabs */}
      {role === 'admin' && (
        <>
          <button
            onClick={() => setAdminNav('dashboard')}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
              adminNav === 'dashboard' ? 'text-[#0d47a1] font-bold' : 'text-gray-500'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-[10px]">Admin</span>
          </button>

          <button
            onClick={() => setAdminNav('analytics')}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
              adminNav === 'analytics' ? 'text-[#0d47a1] font-bold' : 'text-gray-500'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px]">Analytics</span>
          </button>

          <button
            onClick={() => setAdminNav('hackathons')}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
              adminNav === 'hackathons' ? 'text-[#0d47a1] font-bold' : 'text-gray-500'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span className="text-[10px]">Verify Events</span>
          </button>

          <button
            onClick={() => setAdminNav('requests')}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
              adminNav === 'requests' ? 'text-[#0d47a1] font-bold' : 'text-gray-500'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px]">Requests</span>
          </button>
        </>
      )}

    </nav>
  );
};
