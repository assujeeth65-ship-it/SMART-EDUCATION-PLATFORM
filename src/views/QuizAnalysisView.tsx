import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Bot, 
  Volume2, 
  Zap, 
  RotateCcw 
} from 'lucide-react';

export const QuizAnalysisView: React.FC = () => {
  const { 
    quizAnalysis, 
    setSchoolNav, 
    speakText, 
    voiceGender 
  } = useApp();

  const handleListenDiagnosis = () => {
    speakText(`Here is your detailed AI Quiz Analysis. Overall Score: ${quizAnalysis.overallScore} percent. Concept Understanding: ${quizAnalysis.conceptUnderstanding} percent. Application: ${quizAnalysis.application} percent. Problem Solving: ${quizAnalysis.problemSolving} percent. ${quizAnalysis.aiFeedback}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#90caf9] shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e3f2fd]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e3f2fd] text-xs font-bold text-[#2196f3] border border-[#90caf9] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SIH26207 Performance AI Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0d47a1]">
              AI Quiz Diagnostic & Competency Analysis
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              "The system does not simply give marks — it reveals precisely WHY you scored this way."
            </p>
          </div>

          <button
            onClick={handleListenDiagnosis}
            className="px-4 py-2 rounded-2xl bg-[#2196f3] hover:bg-[#0d47a1] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto"
          >
            <Volume2 className="w-4 h-4" />
            <span>Hear AI Diagnosis ({voiceGender})</span>
          </button>
        </div>

        {/* 4-Metric Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white border border-[#90caf9] shadow-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Overall Score</span>
            <p className="text-3xl font-black text-[#0d47a1] mt-1">{quizAnalysis.overallScore}%</p>
            <span className="text-[10px] text-gray-500 font-semibold">Based on your completed quiz</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#90caf9] shadow-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Concept Understanding</span>
            <p className="text-3xl font-black text-[#0d47a1] mt-1">{quizAnalysis.conceptUnderstanding}%</p>
            <span className="text-[10px] text-emerald-600 font-bold">{quizAnalysis.conceptUnderstanding >= 70 ? "Strong Grasp" : "Needs Practice"}</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#90caf9] shadow-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Application</span>
            <p className="text-3xl font-black text-[#2196f3] mt-1">{quizAnalysis.application}%</p>
            <span className="text-[10px] text-[#2196f3] font-bold">{quizAnalysis.application >= 70 ? "Good Progress" : "Needs Practice"}</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-300 shadow-xs">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Problem Solving</span>
            <p className="text-3xl font-black text-amber-600 mt-1">{quizAnalysis.problemSolving}%</p>
            <span className="text-[10px] text-amber-600 font-bold">{quizAnalysis.problemSolving >= 70 ? "On Track" : "Needs Targeted Work"}</span>
          </div>
        </div>
      </div>

      {/* STRENGTHS VS IMPROVEMENT AREAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Strengths Card */}
        <div className="glass-card rounded-3xl p-6 border border-[#90caf9] space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Demonstrated Strengths</span>
          </div>

          <div className="space-y-3">
            {quizAnalysis.strengths.map((str, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs text-gray-800">
                <span className="font-bold text-emerald-900">• </span>
                {str}
              </div>
            ))}
          </div>

          <p className="text-[11px] text-gray-500 italic">
            {quizAnalysis.aiFeedback}
          </p>
        </div>

        {/* Improvement Areas Card */}
        <div className="glass-card rounded-3xl p-6 border border-[#90caf9] space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Identified Areas to Improve</span>
          </div>

          <div className="space-y-3">
            {quizAnalysis.areasToImprove.map((gap, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-gray-800">
                <span className="font-bold text-amber-900">• </span>
                {gap}
              </div>
            ))}
          </div>

          <p className="text-[11px] text-gray-500 italic">
            Repeated difficulty detected across multi-step fractional quadratic manipulations.
          </p>
        </div>

      </div>

      {/* AI REASONING BOX: WHY DID I SCORE THIS? */}
      <div className="glass-card rounded-3xl p-6 border-2 border-[#2196f3] shadow-md space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2196f3] to-[#0d47a1] flex items-center justify-center text-white">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#0d47a1]">
              Personal AI Root Cause Analysis
            </h4>
            <p className="text-[11px] text-gray-500">Synthesizing multiple assessment behaviors</p>
          </div>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed bg-[#e3f2fd]/50 p-4 rounded-2xl border border-[#90caf9]">
          "{quizAnalysis.aiFeedback}"
        </p>

        {/* Repeated Mistakes Identified */}
        <div className="p-4 rounded-2xl bg-white border border-[#90caf9] space-y-2">
          <span className="text-[11px] font-bold text-[#0d47a1] uppercase tracking-wider">
            Repeated Systematic Mistakes Detected:
          </span>
          <ul className="space-y-1 text-xs text-gray-700">
            {quizAnalysis.repeatedMistakes.map((m, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BOTTOM TRIGGER TO WEAKNESS DETECTION */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0d47a1] to-[#2196f3] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#90caf9]">Automatic AI Transition</span>
          <h4 className="text-base font-bold">Launch Weakness Detection Engine</h4>
          <p className="text-xs text-white/80">Turn this diagnosis into an actionable 5-step improvement plan and verified re-test.</p>
        </div>

        <button
          onClick={() => {
            setSchoolNav('weakness');
            speakText("Moving to the Weakness Detection Engine. Let us review the 5-step improvement plan.");
          }}
          className="px-6 py-3 rounded-2xl bg-white hover:bg-[#e3f2fd] text-[#0d47a1] text-xs font-bold transition-all shadow-md flex items-center gap-2 shrink-0"
        >
          <span>Open Weakness Engine & Plan</span>
          <ArrowRight className="w-4 h-4 text-[#2196f3]" />
        </button>
      </div>

    </div>
  );
};
