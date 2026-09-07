import React from 'react';
import { useApp } from '../context/AppContext';
import { SchoolNav } from '../types';
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  CheckSquare,
  BarChart3,
  AlertTriangle,
  RotateCcw,
  UploadCloud,
  Bot,
  Code2,
  Trophy,
  Mic,
  FileText,
  Layers,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { 
    role, 
    schoolNav, 
    setSchoolNav, 
    collegeNav, 
    setCollegeNav, 
    adminNav, 
    setAdminNav,
    schoolProfile,
  } = useApp();

  if (role === 'landing') return null;

  return (
    <aside className="w-64 bg-white/95 backdrop-blur-md border-r border-[#90caf9]/50 flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 shrink-0 shadow-sm hidden md:flex">
      
      {/* Navigation Group */}
      <div className="p-4 space-y-6 overflow-y-auto">
        
        {/* Active Ecosystem Tag */}
        <div className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#e3f2fd] to-white border border-[#90caf9]">
          <p className="text-[10px] font-bold tracking-wider text-[#2196f3] uppercase">
            {role === 'school' ? 'School Academic Journey' : role === 'college' ? 'College & Career Ecosystem' : 'Administrative Governance'}
          </p>
          <p className="text-xs font-bold text-[#0d47a1] mt-0.5 truncate">
            {role === 'school' ? 'CBSE Class 10 Syllabus' : role === 'college' ? 'Anna Univ • B.Tech CSE' : 'Central Platform Admin'}
          </p>
        </div>

        {/* School Student Navigation */}
        {role === 'school' && (
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-[#0d47a1]/70 px-3 uppercase tracking-wider mb-2">
              Core Learning Loop
            </div>

            <NavItem
              icon={<LayoutDashboard className="w-4 h-4" />}
              label="Dashboard"
              active={schoolNav === 'dashboard'}
              onClick={() => setSchoolNav('dashboard')}
            />

            <NavItem
              icon={<BookOpen className="w-4 h-4" />}
              label="Academy (Syllabus)"
              badge={schoolProfile.grade.replace('Class ', 'Grade ')}
              active={schoolNav === 'academy'}
              onClick={() => setSchoolNav('academy')}
            />

            <NavItem
              icon={<Sparkles className="w-4 h-4 text-[#2196f3]" />}
              label="AI Concept Learning"
              badge="Quadratic"
              active={schoolNav === 'concept-learning'}
              onClick={() => setSchoolNav('concept-learning')}
            />

            <NavItem
              icon={<CheckSquare className="w-4 h-4" />}
              label="Concept Quiz"
              active={schoolNav === 'quiz'}
              onClick={() => setSchoolNav('quiz')}
            />

            <NavItem
              icon={<BarChart3 className="w-4 h-4" />}
              label="AI Quiz Analysis"
              active={schoolNav === 'quiz-analysis'}
              onClick={() => setSchoolNav('quiz-analysis')}
            />

            <NavItem
              icon={<AlertTriangle className="w-4 h-4 text-amber-500" />}
              label="Weakness Detection"
              badge="Action Plan"
              active={schoolNav === 'weakness'}
              onClick={() => setSchoolNav('weakness')}
            />

            <NavItem
              icon={<RotateCcw className="w-4 h-4 text-[#2196f3]" />}
              label="Re-Test System"
              badge="+23%"
              active={schoolNav === 'retest'}
              onClick={() => setSchoolNav('retest')}
            />

            <div className="pt-4 text-[11px] font-bold text-[#0d47a1]/70 px-3 uppercase tracking-wider mb-1">
              Personal Tools
            </div>

            <NavItem
              icon={<UploadCloud className="w-4 h-4" />}
              label="Upload & Learn"
              badge="AI Parsing"
              active={schoolNav === 'upload'}
              onClick={() => setSchoolNav('upload')}
            />

            <NavItem
              icon={<Bot className="w-4 h-4 text-[#2196f3]" />}
              label="Personal AI Assistant"
              badge="3-in-1"
              active={schoolNav === 'ai-assistant'}
              onClick={() => setSchoolNav('ai-assistant')}
            />
          </div>
        )}

        {/* College Student Navigation */}
        {role === 'college' && (
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-[#0d47a1]/70 px-3 uppercase tracking-wider mb-2">
              Academics & Skills
            </div>

            <NavItem
              icon={<LayoutDashboard className="w-4 h-4" />}
              label="Dashboard"
              active={collegeNav === 'dashboard'}
              onClick={() => setCollegeNav('dashboard')}
            />

            <NavItem
              icon={<BookOpen className="w-4 h-4" />}
              label="Academy & Regulation"
              badge="Networks"
              active={collegeNav === 'academy'}
              onClick={() => setCollegeNav('academy')}
            />

            <NavItem
              icon={<UploadCloud className="w-4 h-4" />}
              label="Upload & Learn"
              badge="Syllabus"
              active={collegeNav === 'upload'}
              onClick={() => setCollegeNav('upload')}
            />

            <NavItem
              icon={<Code2 className="w-4 h-4 text-[#2196f3]" />}
              label="Programming Hub"
              badge="Python"
              active={collegeNav === 'programming'}
              onClick={() => setCollegeNav('programming')}
            />

            <div className="pt-4 text-[11px] font-bold text-[#0d47a1]/70 px-3 uppercase tracking-wider mb-1">
              Career Readiness
            </div>

            <NavItem
              icon={<Trophy className="w-4 h-4 text-amber-500" />}
              label="Hackathons & Events"
              badge="Verified"
              active={collegeNav === 'hackathons'}
              onClick={() => setCollegeNav('hackathons')}
            />

            <NavItem
              icon={<Mic className="w-4 h-4 text-[#2196f3]" />}
              label="AI Mock Interview"
              badge="Simulation"
              active={collegeNav === 'mock-interview'}
              onClick={() => setCollegeNav('mock-interview')}
            />

            <NavItem
              icon={<FileText className="w-4 h-4" />}
              label="AI Resume Builder"
              badge="No Fake Data"
              active={collegeNav === 'resume-builder'}
              onClick={() => setCollegeNav('resume-builder')}
            />

            <NavItem
              icon={<Bot className="w-4 h-4 text-[#2196f3]" />}
              label="Personal AI Assistant"
              badge="3-in-1"
              active={collegeNav === 'ai-assistant'}
              onClick={() => setCollegeNav('ai-assistant')}
            />
          </div>
        )}

        {/* Admin Navigation — hackathon circulation only */}
        {role === 'admin' && (
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-[#0d47a1]/70 px-3 uppercase tracking-wider mb-2">
              Hackathon Operations
            </div>
            <NavItem
              icon={<Trophy className="w-4 h-4 text-amber-500" />}
              label="Hackathon Circulation"
              badge="Admin"
              active
              onClick={() => setAdminNav('dashboard')}
            />
          </div>
        )}

      </div>

      {/* Bottom AI Status Box */}
      <div className="p-4 border-t border-[#90caf9]/40 bg-[#e3f2fd]/30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2196f3] to-[#0d47a1] flex items-center justify-center text-white shadow-xs">
            <Bot className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#0d47a1]">Personal AI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </div>
            <p className="text-[11px] text-gray-500 truncate capitalize">
              Chat Assistant Active
            </p>
          </div>
        </div>
      </div>

    </aside>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, badge, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
      active
        ? 'bg-[#2196f3] text-white font-bold shadow-md shadow-blue-500/20'
        : 'text-[#0d47a1] hover:bg-[#e3f2fd] hover:text-[#0d47a1]'
    }`}
  >
    <div className="flex items-center gap-2.5 truncate">
      <span className={active ? 'text-white' : 'text-[#2196f3]'}>{icon}</span>
      <span className="truncate">{label}</span>
    </div>
    {badge && (
      <span
        className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
          active ? 'bg-white/20 text-white' : 'bg-[#e3f2fd] text-[#0d47a1] border border-[#90caf9]'
        }`}
      >
        {badge}
      </span>
    )}
  </button>
);
