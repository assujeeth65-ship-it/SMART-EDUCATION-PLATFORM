import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  Cpu, 
  Bot, 
  Trophy, 
  Mic, 
  FileText, 
  BarChart3, 
  School, 
  GraduationCap, 
  ShieldCheck, 
  Play, 
  Layers, 
  Activity,
  Zap,
  TrendingUp,
  Volume2
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { 
    setRole, 
    setShowAuthModal,
    setShowAdminLogin, 
    voiceGender, 
    setVoiceGender, 
    speakText,
    setSchoolNav,
    setCollegeNav 
  } = useApp();

  const handleStartLearning = () => {
    setShowAuthModal(true);
  };

  const handleExploreSchool = () => {
    setRole('school');
    setSchoolNav('dashboard');
    speakText("Welcome to the School Student experience! Explore Mathematics Chapter 4 Quadratic Equations and our AI Concept Learning.");
  };

  const handleExploreCollege = () => {
    setRole('college');
    setCollegeNav('dashboard');
    speakText("Welcome to the College Student experience! Explore the Programming Hub, Hackathons, and AI Mock Interviews.");
  };

  const handleExploreAdmin = () => {
    setShowAdminLogin(true);
    speakText("Admin login opens the secure Hackathon Circulation portal.");
  };

  const workflowStages = [
    { title: "Understand", desc: "Student profile, board/university & goals" },
    { title: "Personalize", desc: "Automatic curriculum & syllabus mapping" },
    { title: "Learn", desc: "Step-by-step AI concept transformation" },
    { title: "Practice", desc: "Interactive examples & code playground" },
    { title: "Test", desc: "Adaptive multi-difficulty concept quizzes" },
    { title: "Analyze", desc: "Multi-factor competency & error diagnosis" },
    { title: "Detect Weakness", desc: "Cross-quiz pattern detection engine" },
    { title: "Recommend", desc: "Actionable 5-step improvement plans" },
    { title: "Improve", desc: "Targeted remedial exercises & guidance" },
    { title: "Re-Test", desc: "Measurable Before vs After verification" },
    { title: "Track Progress", desc: "Unified mastery learning profile" },
    { title: "Build Skills", desc: "Coding roadmaps & verified hackathons" },
    { title: "Prepare Career", desc: "Voice mock interviews & ATS resumes" }
  ];

  return (
    <div className="min-h-screen bg-[#e3f2fd]/60 text-[#0d47a1]">
      
      {/* Top Banner / Announcement */}
      <div className="bg-[#0d47a1] text-white py-2 px-4 text-center text-xs font-semibold flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#90caf9] animate-ping" />
        <span>SIH26207 Innovation: Complete AI-Powered Personalized Learning & Career Ecosystem</span>
        <span className="hidden sm:inline text-[#90caf9]">• Strictly Adheres to Official Specification</span>
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        
        {/* Glow backdrop circles using strict blue palette */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#90caf9]/35 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-[#2196f3]/20 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#90caf9] shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-[#2196f3]" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#0d47a1]">
              SMART EDUCATION • ONE UNIFIED PERSONAL AI COMPANION
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0d47a1] leading-[1.15]">
            Your Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2196f3] to-[#0d47a1]">AI Learning Companion</span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-base sm:text-lg text-slate-700 font-medium leading-relaxed max-w-2xl mx-auto">
            Understand what to learn. Practice what you need. Improve where you struggle. Build skills. Prepare for your career.
          </p>

          {/* Dual CTAs & Voice Switcher */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleStartLearning}
              className="px-7 py-3.5 rounded-2xl bg-[#2196f3] hover:bg-[#0d47a1] text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition-all hover:scale-105 flex items-center gap-2"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('ecosystem-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-7 py-3.5 rounded-2xl bg-white hover:bg-[#e3f2fd] text-[#0d47a1] border border-[#90caf9] font-bold text-sm shadow-sm transition-all hover:scale-105 flex items-center gap-2"
            >
              <span>Explore Platform</span>
              <Play className="w-4 h-4 text-[#2196f3]" />
            </button>

            {/* Voice Audio Preview Pill */}
            <div className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-white/90 border border-[#90caf9] shadow-sm text-xs">
              <span className="text-gray-500 font-medium">Assistant Voice:</span>
              <button
                onClick={() => {
                  setVoiceGender('female');
                  speakText("Hi, I am your Personal AI Assistant with a warm, encouraging female voice.");
                }}
                className={`px-2.5 py-1 rounded-xl font-bold transition-all ${
                  voiceGender === 'female' ? 'bg-[#2196f3] text-white' : 'text-[#0d47a1] hover:bg-[#e3f2fd]'
                }`}
              >
                Female
              </button>
              <button
                onClick={() => {
                  setVoiceGender('male');
                  speakText("Hello, I am your Personal AI Assistant with a calm, professional male voice.");
                }}
                className={`px-2.5 py-1 rounded-xl font-bold transition-all ${
                  voiceGender === 'male' ? 'bg-[#0d47a1] text-white' : 'text-[#0d47a1] hover:bg-[#e3f2fd]'
                }`}
              >
                Male
              </button>
              <Volume2 className="w-4 h-4 text-[#2196f3]" />
            </div>

          </div>

        </div>

        {/* HERO VISUAL: FUTURISTIC EDUCATION DASHBOARD MOCKUP */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          
          <div className="glass-card rounded-3xl p-4 sm:p-6 border-2 border-[#90caf9] shadow-2xl overflow-hidden">
            
            {/* Mockup Top Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#90caf9]/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-bold text-[#0d47a1]">
                  Smart Education OS • Live Student Environment
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-[#e3f2fd] text-[#0d47a1] font-bold border border-[#90caf9]">
                  CBSE Class 10 & B.Tech Multi-Track
                </span>
              </div>
            </div>

            {/* Dashboard Content Grid */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-4">
              
              {/* Left Column: Progress & Active Concept */}
              <div className="md:col-span-4 space-y-4">
                
                {/* 0% Concept Mastery Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#e3f2fd] to-white border border-[#90caf9]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0d47a1]">Concept Mastery</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2196f3] text-white font-bold">In Progress</span>
                  </div>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full border-4 border-[#90caf9] flex items-center justify-center bg-white shadow-inner">
                      <span className="text-sm font-black text-[#0d47a1]">0%</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0d47a1]">0 / 6 Concepts</p>
                      <p className="text-[11px] text-gray-500">Quadratic Equations</p>
                      <div className="w-28 h-2 rounded-full bg-white mt-1.5 overflow-hidden border border-[#90caf9]/50">
                        <div className="w-0 h-full bg-[#2196f3]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Continue Learning card */}
                <div className="p-4 rounded-2xl bg-white border border-[#90caf9] space-y-2">
                  <span className="text-[10px] uppercase font-bold text-[#2196f3]">Continue Learning</span>
                  <h4 className="text-xs font-bold text-[#0d47a1]">Mathematics • Chapter 4</h4>
                  <p className="text-[11px] text-gray-600">Quadratic Formula & Nature of Roots</p>
                  <button 
                    onClick={handleExploreSchool}
                    className="mt-2 w-full py-2 rounded-xl bg-[#e3f2fd] hover:bg-[#2196f3] hover:text-white text-[#0d47a1] text-xs font-bold transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Resume Learning</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

              </div>

              {/* Center Column: Weakness Alert & Next Step */}
              <div className="md:col-span-5 space-y-4">
                
                {/* Recommended Next Step (Repeated difficulty detected) */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-white to-[#e3f2fd] border-2 border-[#2196f3] shadow-md">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-700">
                    <Zap className="w-4 h-4 text-[#2196f3]" />
                    <span>Recommended Next Step</span>
                  </div>
                  <h4 className="text-sm font-black text-[#0d47a1] mt-1.5">
                    Practice Trigonometric Ratios & Word Problems
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-1">
                    <strong>Reason:</strong> Repeated difficulty detected across 2 previous quizzes.
                  </p>
                  
                  {/* Weakness -> Action -> Improvement Preview */}
                  <div className="mt-3 p-2.5 rounded-xl bg-white border border-[#90caf9] text-[11px] flex items-center justify-between">
                    <span className="font-semibold text-gray-700">Weakness: Fractional Equations</span>
                    <span className="text-[#2196f3] font-bold">➔ 5 Step Plan</span>
                  </div>
                </div>

                {/* Quiz Performance Multi-Dimensional Breakdown */}
                <div className="p-4 rounded-2xl bg-white border border-[#90caf9] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0d47a1]">Quiz Competency Analysis</span>
                    <span className="text-xs font-black text-[#2196f3]">0% Overall</span>
                  </div>

                  <div className="space-y-1.5 text-[11px]">
                    <div>
                      <div className="flex justify-between text-gray-600 mb-0.5">
                        <span>Concept Understanding</span>
                        <span className="font-bold text-[#0d47a1]">80%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[#e3f2fd] overflow-hidden">
                        <div className="w-[80%] h-full bg-[#0d47a1]"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-gray-600 mb-0.5">
                        <span>Application</span>
                        <span className="font-bold text-[#0d47a1]">65%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[#e3f2fd] overflow-hidden">
                        <div className="w-[65%] h-full bg-[#2196f3]"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-gray-600 mb-0.5">
                        <span>Problem Solving</span>
                        <span className="font-bold text-[#0d47a1]">0%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[#e3f2fd] overflow-hidden">
                        <div className="w-0 h-full bg-[#90caf9]"></div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Right Column: Skills & Career Readiness Preview */}
              <div className="md:col-span-3 space-y-4">
                
                {/* College Skills: Python */}
                <div className="p-4 rounded-2xl bg-[#0d47a1] text-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-[#90caf9]">Programming Skill</span>
                    <span className="text-xs font-bold text-white">Python Hub</span>
                  </div>
                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-white/80">Basics</span>
                      <span className="font-bold text-white">0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">OOP</span>
                      <span className="font-bold text-white">0%</span>
                    </div>
                    <div className="flex justify-between text-amber-300">
                      <span>Loops (Needs Practice)</span>
                      <span className="font-bold">0%</span>
                    </div>
                  </div>
                </div>

                {/* AI Mock Interview & Re-Test Result */}
                <div className="p-4 rounded-2xl bg-white border border-[#90caf9] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-[#2196f3]">Measurable Re-Test</span>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">+23%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="text-center">
                      <p className="text-[10px] text-gray-500">Before</p>
                      <p className="font-bold text-gray-700">0%</p>
                    </div>
                    <span className="text-[#2196f3] font-bold">➔</span>
                    <div className="text-center">
                      <p className="text-[10px] text-gray-500">After</p>
                      <p className="font-bold text-[#0d47a1]">0%</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CORE PLATFORM WORKFLOW: THE 13-STAGE CONTINUOUS IMPROVEMENT CYCLE */}
      <section className="py-16 bg-white border-y border-[#90caf9]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#2196f3]">
              The Core Differentiator
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0d47a1] mt-1">
              The Complete Continuous Learning Loop
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Unlike traditional "Study → Exam → Score" platforms, Smart Education constantly diagnoses, recommends, and verifies tangible improvement.
            </p>
          </div>

          {/* Workflow Diagram Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {workflowStages.map((stage, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-2xl bg-[#e3f2fd]/50 border border-[#90caf9] flex flex-col justify-between hover:bg-[#e3f2fd] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-5 h-5 rounded-full bg-[#2196f3] text-white text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    {idx < workflowStages.length - 1 && (
                      <span className="text-[#2196f3] font-bold text-xs opacity-60 group-hover:opacity-100">→</span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-[#0d47a1] leading-tight">{stage.title}</h4>
                </div>
                <p className="text-[10px] text-gray-600 mt-2 leading-tight">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* THE THREE AI ENGINES: UNIFIED INTO ONE PERSONAL AI ASSISTANT */}
      <section id="ecosystem-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e3f2fd] text-[#0d47a1] text-xs font-bold border border-[#90caf9] mb-3">
            <Bot className="w-4 h-4 text-[#2196f3]" />
            <span>UNIFIED AI ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl font-black text-[#0d47a1]">
            One Personal AI Assistant • Three Powerful Engines
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Students experience everything as a single friendly companion across academics, performance analytics, and career preparedness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Engine 1: Learning AI */}
          <div className="glass-card rounded-3xl p-6 border border-[#90caf9] hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#e3f2fd] border border-[#90caf9] text-[#2196f3] flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0d47a1]">1. Learning AI</h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Transforms complex textbooks into clear, structured, actionable learning formats.
              </p>
              
              <ul className="mt-4 space-y-2 text-xs text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2196f3]" />
                  <span>Syllabus & Document Analysis (PDF / Word)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2196f3]" />
                  <span>Concept Extraction & Summarization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2196f3]" />
                  <span>Simple Step-by-Step & Real World Examples</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2196f3]" />
                  <span>Interactive Doubt Solving & Concept Quizzes</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleExploreSchool}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#e3f2fd] hover:bg-[#2196f3] hover:text-white text-[#0d47a1] text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore AI Concept Learning</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Engine 2: Performance AI */}
          <div className="glass-card rounded-3xl p-6 border-2 border-[#2196f3] shadow-lg hover:shadow-xl transition-all flex flex-col justify-between relative">
            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#2196f3] text-white text-[10px] font-bold uppercase tracking-wider">
              Core USP
            </div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#2196f3] text-white flex items-center justify-center mb-4 shadow-md">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0d47a1]">2. Performance AI</h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Diagnoses root causes behind quiz mistakes and detects cross-assessment weakness patterns.
              </p>
              
              <ul className="mt-4 space-y-2 text-xs text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2196f3]" />
                  <span>Multi-factor Quiz Competency Breakdown</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2196f3]" />
                  <span>Cross-Quiz Pattern Weakness Detection</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2196f3]" />
                  <span>Adaptive Explanations for Struggling Learners</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2196f3]" />
                  <span>Re-Test Verification (Measurable Score Delta)</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                setRole('school');
                setSchoolNav('weakness');
              }}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#2196f3] hover:bg-[#0d47a1] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <span>View Weakness Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Engine 3: Career AI */}
          <div className="glass-card rounded-3xl p-6 border border-[#90caf9] hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#e3f2fd] border border-[#90caf9] text-[#0d47a1] flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0d47a1]">3. Career AI</h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Empowers college learners with coding paths, verified hackathons, and mock interview practice.
              </p>
              
              <ul className="mt-4 space-y-2 text-xs text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2196f3]" />
                  <span>Programming Hub (Python, C++, Java, Web)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2196f3]" />
                  <span>Admin-Verified Institution & Company Hackathons</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2196f3]" />
                  <span>AI Voice Mock Interview Simulation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2196f3]" />
                  <span>Zero-Hallucination Verified Resume Builder</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleExploreCollege}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#e3f2fd] hover:bg-[#0d47a1] hover:text-white text-[#0d47a1] text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore College & Career Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </section>

      {/* QUICK ROLE DEMO LAUNCHER CARDS */}
      <section className="py-14 bg-gradient-to-b from-white to-[#e3f2fd]/60 border-t border-[#90caf9]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <h3 className="text-xl font-black text-[#0d47a1]">
              Explore Tailored Environments
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Select an experience to launch into a fully interactive prototype.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            
            {/* School Card */}
            <div 
              onClick={handleExploreSchool}
              className="p-6 rounded-3xl glass-card hover:border-[#2196f3] cursor-pointer group transition-all text-center flex flex-col items-center justify-between"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#2196f3] text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                <School className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-base text-[#0d47a1]">School Student</h4>
                <p className="text-xs text-gray-500 mt-1">
                  CBSE Class 10 • Mathematics & Science • AI Concept Explanations • Adaptive Quizzes • Weakness Engine
                </p>
              </div>
              <button className="mt-5 px-5 py-2 rounded-xl bg-[#2196f3] text-white text-xs font-bold w-full group-hover:bg-[#0d47a1] transition-colors">
                Launch School Dashboard →
              </button>
            </div>

            {/* College Card */}
            <div 
              onClick={handleExploreCollege}
              className="p-6 rounded-3xl glass-card hover:border-[#0d47a1] cursor-pointer group transition-all text-center flex flex-col items-center justify-between"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#0d47a1] text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-base text-[#0d47a1]">College Student</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Anna University B.Tech • Computer Networks • Python Hub • Verified Hackathons • AI Voice Mock Interview
                </p>
              </div>
              <button className="mt-5 px-5 py-2 rounded-xl bg-[#0d47a1] text-white text-xs font-bold w-full group-hover:bg-[#2196f3] transition-colors">
                Launch College Dashboard →
              </button>
            </div>

            {/* Admin Card */}
            <div 
              onClick={handleExploreAdmin}
              className="p-6 rounded-3xl glass-card hover:border-[#072a63] cursor-pointer group transition-all text-center flex flex-col items-center justify-between"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#072a63] text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-base text-[#0d47a1]">Platform Admin</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Curriculum Hierarchy • Content Validation • Hackathon Publishing Verification • Aggregated Platform Analytics
                </p>
              </div>
              <button className="mt-5 px-5 py-2 rounded-xl bg-[#072a63] text-white text-xs font-bold w-full group-hover:bg-[#2196f3] transition-colors">
                Launch Admin Portal →
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-white border-t border-[#90caf9]/50 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#0d47a1]">SMART EDUCATION</span>
            <span>•</span>
            <span>SIH26207 Innovation Prototype</span>
          </div>
          <p>Strict Blue Palette: #e3f2fd, #90caf9, #2196f3, #0d47a1</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowAuthModal(true)} className="hover:text-[#2196f3]">Register / Login</button>
            <button onClick={handleExploreAdmin} className="hover:text-[#2196f3]">Admin Portal</button>
          </div>
        </div>
      </footer>

    </div>
  );
};
