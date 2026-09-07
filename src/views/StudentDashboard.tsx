import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  BookOpen, 
  Trophy, 
  Code2, 
  Zap, 
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { 
    role, 
    schoolProfile, 
    collegeProfile, 
    setSchoolNav, 
    setCollegeNav, 
    quizAnalysis,
    subjects,
    currentSubject,
    currentChapter
  } = useApp();

  const isSchool = role === 'school';
  const studentName = isSchool ? schoolProfile.studentName : collegeProfile.studentName;
  const gradeOrDegree = isSchool ? `${schoolProfile.board} • ${schoolProfile.grade}` : `${collegeProfile.university} • ${collegeProfile.department}`;
  const activeSubject = subjects.find((subject) => subject.name === currentSubject);
  const activeChapter = activeSubject?.chapters.find((chapter) => chapter.title.includes(currentChapter)) || activeSubject?.chapters[0];
  const mastery = isSchool ? 0 : 0;
  const completedConcepts = isSchool ? (activeChapter?.completedConcepts ?? 0) : 0;
  const totalConcepts = isSchool ? (activeChapter?.conceptsCount ?? 0) : 0;

  const handleStartContinueLearning = () => {
    if (isSchool) {
      setSchoolNav('concept-learning');
    } else {
      setCollegeNav('academy');
    }
  };

  const handleOpenWeaknessPlan = () => {
    if (isSchool) {
      setSchoolNav('weakness');
    } else {
      setCollegeNav('programming');
    }
  };

  const handleOpenRetest = () => {
    if (isSchool) {
      setSchoolNav('retest');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* WELCOME BANNER */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#0d47a1] via-[#2196f3] to-[#90caf9] p-6 sm:p-8 text-white shadow-xl overflow-hidden">
        {/* Glow pattern */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personal AI Learning Companion Active</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white m-0">
              Welcome back, {studentName}
            </h1>
            <p className="text-xs sm:text-sm text-white/85 mt-2 max-w-xl font-medium">
              <span className="font-bold text-white underline decoration-white/40 mr-1.5">{gradeOrDegree}</span>
              {isSchool 
                ? `• CBSE academic curriculum synchronized. ${completedConcepts} out of ${totalConcepts} concepts completed in ${currentChapter}.` 
                : `• Semester curriculum & career preparation tools are fully active.`}
            </p>
          </div>

          {/* Personal AI Chat Status */}
          <div className="glass-card-light text-[#0d47a1] p-4 rounded-2xl sm:w-80 shrink-0 border border-white/60 shadow-lg">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#2196f3]">Personal AI Chat</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e3f2fd] font-bold text-[#0d47a1]">Ready</span>
            </div>
            <p className="text-xs font-semibold leading-snug">
              Start with the first basic lesson. Your dashboard will update as you learn and complete activities.
            </p>
          </div>
        </div>
      </div>

      {/* CORE TOP ROW: MASTERY, CONTINUE LEARNING, & WEAKNESS ALERT */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Card 1: Learning Progress */}
        <div className="md:col-span-4 glass-card rounded-3xl p-6 border border-[#90caf9] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0d47a1] uppercase tracking-wider">Learning Progress</span>
              <span className="text-xs font-extrabold text-[#2196f3] px-2 py-0.5 rounded-full bg-[#e3f2fd] border border-[#90caf9]">
                Active Term
              </span>
            </div>
            
            <div className="mt-6 flex items-center justify-center">
              <div className="relative w-36 h-36 rounded-full border-8 border-[#e3f2fd] flex items-center justify-center bg-white shadow-inner">
                {/* Simulated circle stroke */}
                <div 
                  className="absolute inset-0 rounded-full border-8 border-[#2196f3]"
                  style={{ clipPath: mastery > 0 ? `polygon(0 0, 100% 0, 100% ${mastery}%, 0 ${mastery}%)` : 'polygon(0 0, 0 0, 0 0, 0 0)' }}
                />
                <div className="text-center z-10">
                  <span className="text-3xl font-black text-[#0d47a1]">{mastery}%</span>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">Mastery</p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center space-y-1">
              <h4 className="text-sm font-bold text-[#0d47a1]">{completedConcepts} / {totalConcepts} Concepts Completed</h4>
              <p className="text-xs text-gray-500">Subject: {currentSubject} • {currentChapter}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#e3f2fd] flex items-center justify-between text-xs font-semibold text-[#2196f3]">
            <span>Next milestone: 100% Chapter Mastery</span>
            <span>{Math.max(0, 100 - mastery)}% remaining</span>
          </div>
        </div>

        {/* Card 2: Continue Learning */}
        <div className="md:col-span-4 glass-card rounded-3xl p-6 border border-[#90caf9] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#2196f3] uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Continue Learning</span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#e3f2fd]/60 border border-[#90caf9]">
                <span className="text-[10px] font-bold text-gray-500 uppercase">Current Unit</span>
                <h4 className="text-sm font-black text-[#0d47a1] mt-0.5">
                  {isSchool ? 'Chapter 4: Quadratic Equations' : 'Unit 2: Data Link Layer & Framing'}
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  {isSchool ? 'Concept 1: Introduction to Quadratics' : 'Topic: CRC Error Detection & Sliding Window'}
                </p>
              </div>

              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Estimated Time:</span>
                  <span className="font-bold text-[#0d47a1]">15 mins</span>
                </div>
                <div className="flex justify-between">
                  <span>AI Tutor Readiness:</span>
                  <span className="font-bold text-emerald-600">Chat + Practice Ready</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleStartContinueLearning}
            className="mt-6 w-full py-3 rounded-2xl bg-[#2196f3] hover:bg-[#0d47a1] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Start Basic Learning</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 3: Recommended Next Step (Repeated difficulty detected) */}
        <div className="md:col-span-4 rounded-3xl bg-gradient-to-br from-white via-[#e3f2fd] to-white p-6 border-2 border-[#2196f3] shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-700">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Recommended Next Step</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold">
                Action Required
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-base font-black text-[#0d47a1]">
                Start with the Basics
              </h3>
              <p className="text-xs text-gray-700 mt-1.5 font-medium">
                <strong>Reason:</strong> No weakness has been detected yet. Complete a lesson and quiz to unlock AI recommendations.
              </p>
            </div>

            <div className="mt-4 p-3 rounded-2xl bg-white border border-[#90caf9] text-xs space-y-1">
              <p className="font-bold text-[#0d47a1]">Weakness Detection Trace:</p>
              <p className="text-[11px] text-gray-600">
                • Complete your first lesson to generate learning signals
              </p>
              <p className="text-[11px] text-gray-600">
                • AI will identify strengths and weaknesses after assessment
              </p>
            </div>
          </div>

          <button
            onClick={handleStartContinueLearning}
            className="mt-6 w-full py-3 rounded-2xl bg-[#0d47a1] hover:bg-[#2196f3] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Start Basic Learning</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* ROW 2: DETAILED PERFORMANCE BREAKDOWN & WEAKNESS -> ACTION -> IMPROVEMENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Performance Breakdown */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-[#90caf9] space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#e3f2fd]">
            <div>
              <h3 className="text-base font-bold text-[#0d47a1]">AI Performance Diagnostic</h3>
              <p className="text-xs text-gray-500">Multi-dimensional assessment across problem categories</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-[#2196f3]">{quizAnalysis.overallScore}%</span>
              <p className="text-[10px] text-gray-500 font-bold uppercase">Overall Score</p>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-3.5">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#0d47a1]">Concept Understanding</span>
                <span className="font-bold text-[#0d47a1]">{quizAnalysis.conceptUnderstanding}%</span>
              </div>
              <div className="h-2 rounded-full bg-[#e3f2fd] overflow-hidden">
                <div 
                  className="h-full bg-[#0d47a1] rounded-full transition-all duration-500"
                  style={{ width: `${quizAnalysis.conceptUnderstanding}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#0d47a1]">Application Questions</span>
                <span className="font-bold text-[#2196f3]">{quizAnalysis.application}%</span>
              </div>
              <div className="h-2 rounded-full bg-[#e3f2fd] overflow-hidden">
                <div 
                  className="h-full bg-[#2196f3] rounded-full transition-all duration-500"
                  style={{ width: `${quizAnalysis.application}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#0d47a1]">Problem Solving & Multi-Step</span>
                <span className="font-bold text-amber-600">{quizAnalysis.problemSolving}%</span>
              </div>
              <div className="h-2 rounded-full bg-[#e3f2fd] overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${quizAnalysis.problemSolving}%` }}
                />
              </div>
            </div>
          </div>

          {/* Strengths and Improvement areas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Identified Strengths</span>
              </div>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• Formula recall & definition</li>
                <li>• Concept identification in standard form</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Improvement Areas</span>
              </div>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• Application-based questions</li>
                <li>• Multi-step speed / distance problems</li>
              </ul>
            </div>

          </div>

        </div>

        {/* AI RECOMMENDATION: WEAKNESS -> ACTION -> IMPROVEMENT */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 border border-[#90caf9] flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#0d47a1] uppercase tracking-wider">
              <Zap className="w-4 h-4 text-[#2196f3]" />
              <span>AI Recommendation Loop</span>
            </div>

            <div className="mt-4 space-y-3">
              {/* Box 1: Weakness */}
              <div className="p-3.5 rounded-2xl bg-[#e3f2fd]/80 border border-[#90caf9] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#0d47a1] uppercase">1. Weakness Detected</span>
                  <p className="text-xs font-bold text-gray-800 mt-0.5">No weakness detected yet</p>
                </div>
                <span className="text-xs font-black text-red-600">{quizAnalysis.overallScore}%</span>
              </div>

              {/* Arrow */}
              <div className="text-center text-[#2196f3] font-bold text-xs">↓</div>

              {/* Box 2: Action */}
              <div className="p-3.5 rounded-2xl bg-[#2196f3] text-white shadow-md flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-white/80 uppercase">2. Targeted Action</span>
                  <p className="text-xs font-bold text-white mt-0.5">Complete the first basic lesson and quiz</p>
                </div>
                <span className="text-xs font-black text-white">Start</span>
              </div>

              {/* Arrow */}
              <div className="text-center text-[#2196f3] font-bold text-xs">↓</div>

              {/* Box 3: Improvement */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase">3. Measured Improvement</span>
                  <p className="text-xs font-bold text-emerald-900 mt-0.5">Complete an assessment to measure improvement</p>
                </div>
                <span className="text-xs font-black text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">0%</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              onClick={handleOpenWeaknessPlan}
              className="flex-1 py-2.5 rounded-xl bg-[#e3f2fd] hover:bg-[#90caf9]/40 text-[#0d47a1] font-bold text-xs transition-colors"
            >
              Action Plan
            </button>
            <button
              onClick={handleOpenRetest}
              className="flex-1 py-2.5 rounded-xl bg-[#0d47a1] hover:bg-[#2196f3] text-white font-bold text-xs transition-colors shadow-md flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Open Re-Test</span>
            </button>
          </div>

        </div>

      </div>

      {/* IF COLLEGE STUDENT: CAREER HUB HIGHLIGHTS */}
      {!isSchool && (
        <div className="pt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#0d47a1]">Career Readiness & Technical Skills</h3>
            <span className="text-xs text-[#2196f3] font-bold">College Exclusive Ecosystem</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Programming Hub Card */}
            <div className="glass-card rounded-3xl p-5 border border-[#90caf9] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-[#2196f3]" />
                  <h4 className="text-xs font-bold text-[#0d47a1]">Python Programming Hub</h4>
                </div>
                <span className="text-xs font-bold text-[#2196f3]">0% Mastered</span>
              </div>
              <p className="text-xs text-gray-600">
                Start from Python Basics. Your skill scores will appear after you complete coding tasks.
              </p>
              <button
                onClick={() => setCollegeNav('programming')}
                className="w-full py-2 rounded-xl bg-[#e3f2fd] hover:bg-[#2196f3] hover:text-white text-[#0d47a1] text-xs font-bold transition-colors"
              >
                Open Code Playground →
              </button>
            </div>

            {/* Hackathons Card */}
            <div className="glass-card rounded-3xl p-5 border border-[#90caf9] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <h4 className="text-xs font-bold text-[#0d47a1]">Verified Hackathons</h4>
                </div>
                <span className="text-xs font-bold text-emerald-600">Admin Verified</span>
              </div>
              <p className="text-xs text-gray-600">
                XYZ Innovation Challenge 2026 deadline in 24 days. Team size: 2-4 members.
              </p>
              <button
                onClick={() => setCollegeNav('hackathons')}
                className="w-full py-2 rounded-xl bg-[#e3f2fd] hover:bg-[#0d47a1] hover:text-white text-[#0d47a1] text-xs font-bold transition-colors"
              >
                Browse Events →
              </button>
            </div>

            {/* AI Mock Interview Card */}
            <div className="glass-card rounded-3xl p-5 border border-[#90caf9] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-[#0d47a1]" />
                  <h4 className="text-xs font-bold text-[#0d47a1]">AI Mock Interview</h4>
                </div>
                <span className="text-xs font-bold text-[#0d47a1]">0% Ready</span>
              </div>
              <p className="text-xs text-gray-600">
                Practice realistic technical and behavioral simulations for top tech companies.
              </p>
              <button
                onClick={() => setCollegeNav('mock-interview')}
                className="w-full py-2 rounded-xl bg-[#e3f2fd] hover:bg-[#2196f3] hover:text-white text-[#0d47a1] text-xs font-bold transition-colors"
              >
                Start Text Simulation →
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
