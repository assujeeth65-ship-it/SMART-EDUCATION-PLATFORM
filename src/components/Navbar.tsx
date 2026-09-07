import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ShieldCheck, 
  Bell, 
  Search, 
  ChevronDown, 
  UserCheck, 
  School, 
  GraduationCap, 
  ShieldAlert,
  Home,
  Trophy,
  Play,
  X,
  Languages
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    role, 
    setRole, 
    schoolProfile,
    collegeProfile,
    setShowPrivacyModal,
    setShowAuthModal,
    setShowAdminLogin,
    setSchoolNav,
    setCollegeNav,
    language,
    setLanguage,
    t,
    userId,
    logout
  } = useApp();

  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDemoTour, setShowDemoTour] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const demoTourSteps = [
    {
      num: 1,
      title: "Landing Page & Core Loop",
      role: 'landing',
      desc: "13-stage continuous improvement cycle & 3-in-1 AI engine overview.",
      action: () => {
        setRole('landing');
        setShowDemoTour(false);
      }
    },
    {
      num: 2,
      title: "School Student Dashboard",
      role: 'school',
      desc: "CBSE Class 10 auto-mapping with progress starting from 0%.",
      action: () => {
        setRole('school');
        setSchoolNav('dashboard');
        setShowDemoTour(false);
      }
    },
    {
      num: 3,
      title: "AI Concept Learning & Parabola",
      role: 'school',
      desc: "10-step model with interactive SVG parabola graph and roots simulator.",
      action: () => {
        setRole('school');
        setSchoolNav('concept-learning');
        setShowDemoTour(false);
      }
    },
    {
      num: 4,
      title: "Weakness Detection & Unit Circle",
      role: 'school',
      desc: "Cross-assessment pattern engine and interactive trigonometric ratio simulator.",
      action: () => {
        setRole('school');
        setSchoolNav('weakness');
        setShowDemoTour(false);
      }
    },
    {
      num: 5,
      title: "Remedial Re-Test (+23% Verified)",
      role: 'school',
      desc: "Progress is measured after the student completes assessments.",
      action: () => {
        setRole('school');
        setSchoolNav('retest');
        setShowDemoTour(false);
      }
    },
    {
      num: 6,
      title: "College Pathway & Network Lab",
      role: 'college',
      desc: "Anna University B.Tech CSE Semester 5 courses & CRC noise injection simulator.",
      action: () => {
        setRole('college');
        setCollegeNav('academy');
        setShowDemoTour(false);
      }
    },
    {
      num: 7,
      title: "Programming Hub & DSA Visualizer",
      role: 'college',
      desc: "7 languages with live compiler, syntax diagnostics, and interactive Sorting Algorithm visualizer.",
      action: () => {
        setRole('college');
        setCollegeNav('programming');
        setShowDemoTour(false);
      }
    },
    {
      num: 8,
      title: "AI Mock Interview Simulation",
      role: 'college',
      desc: "Top employer interviews (Microsoft, Google, TCS) with AI chat & STAR scoring.",
      action: () => {
        setRole('college');
        setCollegeNav('mock-interview');
        setShowDemoTour(false);
      }
    },
    {
      num: 9,
      title: "Zero-Hallucination ATS Resume",
      role: 'college',
      desc: "5-step ATS workflow strictly prohibiting invented certifications.",
      action: () => {
        setRole('college');
        setCollegeNav('resume-builder');
        setShowDemoTour(false);
      }
    },
    {
      num: 10,
      title: "Central Admin Portal & Governance",
      role: 'admin',
      desc: "12,540 student analytics, +Add Node curriculum creator, and verified hackathons.",
      action: () => {
        setShowAdminLogin(true);
        setShowDemoTour(false);
      }
    }
  ];


  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-[#90caf9]/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setRole('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2196f3] to-[#0d47a1] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-lg text-[#0d47a1]">
                SMART EDUCATION
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#e3f2fd] text-[#0d47a1] border border-[#90caf9]">
                AI OS
              </span>
            </div>
            <p className="text-[11px] text-[#2196f3] font-medium leading-none">
              Personal AI Learning Companion
            </p>
          </div>
        </div>

        {/* Global Search with Smart Jump */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!searchQuery.trim()) return;
              const q = searchQuery.toLowerCase();
              if (q.includes('parabola') || q.includes('quad') || q.includes('math')) {
                setRole('school');
                setSchoolNav('concept-learning');
              } else if (q.includes('trig') || q.includes('weakness')) {
                setRole('school');
                setSchoolNav('weakness');
              } else if (q.includes('sort') || q.includes('code') || q.includes('python') || q.includes('program')) {
                setRole('college');
                setCollegeNav('programming');
              } else if (q.includes('interview') || q.includes('mock')) {
                setRole('college');
                setCollegeNav('mock-interview');
              } else if (q.includes('resume')) {
                setRole('college');
                setCollegeNav('resume-builder');
              } else if (q.includes('hackathon')) {
                setRole('college');
                setCollegeNav('hackathons');
              } else {
                setRole('school');
                setSchoolNav('academy');
              }
              setSearchQuery('');
            }}
            className="w-full relative"
          >
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-[#2196f3]" />
            <input
              type="text"
              placeholder="Search concepts, formulas, code, hackathons... (Press Enter)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-full bg-[#e3f2fd]/60 border border-[#90caf9] focus:outline-none focus:ring-2 focus:ring-[#2196f3] text-[#0d47a1] placeholder-[#0d47a1]/50 shadow-xs"
            />
          </form>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Multi-Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="px-2.5 py-1.5 rounded-xl bg-[#e3f2fd] border border-[#90caf9] hover:bg-[#90caf9]/30 text-xs font-bold text-[#0d47a1] flex items-center gap-1.5 transition-all shadow-xs"
              title="Select interface language"
            >
              <Languages className="w-4 h-4 text-[#2196f3]" />
              <span className="uppercase text-[11px] font-black">{language}</span>
              <ChevronDown className="w-3 h-3 text-[#0d47a1]" />
            </button>

            {showLangDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#90caf9] p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-2 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-[#e3f2fd] mb-1">
                  Language
                </div>
                {[
                  { code: 'en' as const, label: 'English (Indian)', native: 'English', flag: '🇮🇳' },
                  { code: 'hi' as const, label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
                  { code: 'ta' as const, label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
                  { code: 'te' as const, label: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' }
                ].map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLanguage(item.code);
                      setShowLangDropdown(false);
                      }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      language === item.code
                        ? 'bg-[#2196f3] text-white font-bold'
                        : 'text-[#0d47a1] hover:bg-[#e3f2fd]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{item.flag}</span>
                      <span>{item.label}</span>
                    </div>
                    <span className="text-[11px] opacity-80">{item.native}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Jury Demo Tour Trigger */}
          <button
            onClick={() => setShowDemoTour(true)}
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#0d47a1] to-[#2196f3] text-white text-xs font-black shadow-sm flex items-center gap-1.5 hover:scale-105 transition-transform"
            title="Open 10-Step SIH Hackathon Jury Presentation Playbook"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden lg:inline">{t('juryDemoTour')}</span>
          </button>

          {/* Privacy & Trust Badge */}
          <button
            onClick={() => setShowPrivacyModal(true)}
            className="p-2 rounded-xl text-[#0d47a1] hover:bg-[#e3f2fd] border border-transparent hover:border-[#90caf9] transition-colors"
            title="AI Reliability & Privacy Governance"
          >
            <ShieldCheck className="w-5 h-5 text-[#2196f3]" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-[#0d47a1] hover:bg-[#e3f2fd] border border-transparent hover:border-[#90caf9] transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#2196f3] ring-2 ring-white" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#90caf9] p-3 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 border-b border-[#e3f2fd]">
                  <span className="text-xs font-bold text-[#0d47a1]">Recent AI Alerts</span>
                  <span className="text-[10px] text-[#2196f3] font-medium">3 New</span>
                </div>
                <div className="mt-2 space-y-2 text-xs">
                  <div 
                    onClick={() => {
                      if (role === 'school') setSchoolNav('weakness');
                      setShowNotifications(false);
                    }}
                    className="p-2 rounded-lg bg-[#e3f2fd]/60 hover:bg-[#e3f2fd] cursor-pointer"
                  >
                    <p className="font-semibold text-[#0d47a1]">Weakness Pattern Detected</p>
                    <p className="text-[11px] text-gray-600 mt-0.5">Trigonometric Ratios & Quadratic word problems require review.</p>
                  </div>
                  <div 
                    onClick={() => {
                      if (role === 'college') setCollegeNav('hackathons');
                      setShowNotifications(false);
                    }}
                    className="p-2 rounded-lg bg-[#e3f2fd]/40 hover:bg-[#e3f2fd] cursor-pointer"
                  >
                    <p className="font-semibold text-[#0d47a1]">Hackathon Verified</p>
                    <p className="text-[11px] text-gray-600 mt-0.5">XYZ Innovation Challenge 2026 published by ABC College.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Role / Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-gradient-to-r from-[#e3f2fd] to-white border border-[#90caf9] text-xs font-medium text-[#0d47a1] hover:border-[#2196f3] transition-all"
            >
              <div className="w-6 h-6 rounded-lg bg-[#2196f3] text-white flex items-center justify-center font-bold text-xs">
                {role === 'school' ? 'S' : role === 'college' ? 'C' : role === 'admin' ? 'A' : '✦'}
              </div>
              <div className="text-left hidden sm:block leading-tight">
                <p className="font-bold text-[11px]">
                  {role === 'school' 
                    ? schoolProfile.studentName 
                    : role === 'college' 
                    ? collegeProfile.studentName 
                    : role === 'admin' 
                    ? 'Admin Portal' 
                    : 'Get Started'}
                </p>
                <p className="text-[10px] text-[#2196f3] font-semibold uppercase">
                  {role === 'school' ? 'School Student' : role === 'college' ? 'College Student' : role === 'admin' ? 'Platform Admin' : 'Welcome'}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#0d47a1]" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-[#90caf9] p-2 z-50">
                <div className="px-3 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Switch Experience
                </div>

                <button
                  onClick={() => {
                    setRole('school');
                    setShowRoleDropdown(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                    role === 'school' ? 'bg-[#e3f2fd] text-[#0d47a1] font-bold' : 'text-gray-700 hover:bg-[#e3f2fd]/50'
                  }`}
                >
                  <School className="w-4 h-4 text-[#2196f3]" />
                  <div>
                    <p>School Student</p>
                    <p className="text-[10px] text-gray-500 font-normal">{schoolProfile.board} • {schoolProfile.grade} • {schoolProfile.studentName}</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setRole('college');
                    setShowRoleDropdown(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                    role === 'college' ? 'bg-[#e3f2fd] text-[#0d47a1] font-bold' : 'text-gray-700 hover:bg-[#e3f2fd]/50'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-[#2196f3]" />
                  <div>
                    <p>College Student</p>
                    <p className="text-[10px] text-gray-500 font-normal">B.Tech CSE • {collegeProfile.studentName}</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setShowAdminLogin(true);
                    setShowRoleDropdown(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                    role === 'admin' ? 'bg-[#e3f2fd] text-[#0d47a1] font-bold' : 'text-gray-700 hover:bg-[#e3f2fd]/50'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4 text-[#0d47a1]" />
                  <div>
                    <p>Admin Dashboard</p>
                    <p className="text-[10px] text-gray-500 font-normal">Curriculum & Event Verification</p>
                  </div>
                </button>

                <div className="border-t border-gray-100 my-1"></div>

                <button
                  onClick={() => {
                    setRole('landing');
                    setShowRoleDropdown(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-gray-600 hover:bg-[#e3f2fd]/50 transition-colors"
                >
                  <Home className="w-4 h-4 text-gray-500" />
                  <span>Landing Overview</span>
                </button>

                {userId ? (
                  <button
                    onClick={() => { logout(); setShowRoleDropdown(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-red-600 font-semibold hover:bg-red-50 transition-colors"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Logout ({userId})</span>
                  </button>
                ) : (
                  <button
                    onClick={() => { setShowAuthModal(true); setShowRoleDropdown(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#0d47a1] font-semibold hover:bg-[#e3f2fd] transition-colors"
                  >
                    <UserCheck className="w-4 h-4 text-[#2196f3]" />
                    <span>Register / Login</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* JURY DEMO TOUR MODAL */}
      {showDemoTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-2xl glass-card rounded-3xl p-6 sm:p-8 border border-[#90caf9] shadow-2xl bg-white/95 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e3f2fd]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#0d47a1] text-white">
                  <Trophy className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#0d47a1]">
                    SIH Hackathon Jury Presentation Playbook
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    Click any step to instantly transition role, load curriculum context & trigger AI explanation
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDemoTour(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {demoTourSteps.map((step) => (
                <div
                  key={step.num}
                  onClick={step.action}
                  className="p-3.5 rounded-2xl bg-white border border-[#90caf9] hover:border-[#2196f3] hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e3f2fd] text-[#0d47a1] uppercase">
                        Step {step.num} • {step.role}
                      </span>
                      <Play className="w-3.5 h-3.5 text-[#2196f3] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h4 className="text-xs font-bold text-[#0d47a1] group-hover:text-[#2196f3] transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-gray-600 mt-1 leading-snug">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#e3f2fd] flex items-center justify-between text-[10px] text-[#2196f3] font-bold">
                    <span>Click to Launch Step</span>
                    <span>➔</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
