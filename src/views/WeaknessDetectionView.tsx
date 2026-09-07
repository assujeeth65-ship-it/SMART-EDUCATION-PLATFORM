import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  BookOpen, 
  RotateCcw, 
  Volume2, 
  ShieldCheck, 
  ListChecks, 
  Check 
} from 'lucide-react';

import { TrigonometryVisualizer } from '../components/TrigonometryVisualizer';

export const WeaknessDetectionView: React.FC = () => {
  const { 
    weaknessPlan, 
    toggleWeaknessStep, 
    setSchoolNav, 
    speakText, 
    voiceGender 
  } = useApp();

  const [showTrigVisualizer, setShowTrigVisualizer] = React.useState<boolean>(true);

  const completedStepsCount = weaknessPlan.steps.filter(s => s.done).length;
  const progressPercent = Math.round((completedStepsCount / weaknessPlan.steps.length) * 100);

  const handleListenPlan = () => {
    speakText("Weakness detection complete. We noticed repeated difficulty in Trigonometric Ratios and Quadratic word problems across multiple assessments. Your 5-step improvement plan is ready. Complete each step to unlock the Re-Test!");
  };

  const handleStepClick = (stepNum: number) => {
    toggleWeaknessStep(stepNum);
    const stepObj = weaknessPlan.steps.find(s => s.step === stepNum);
    if (stepObj && !stepObj.done) {
      speakText(`Marked step ${stepNum}: ${stepObj.title} as completed.`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#90caf9] shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e3f2fd]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800 mb-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>SIH26207 Pattern Recognition</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0d47a1]">
              AI Weakness Detection Engine
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              "The system analyzes patterns across multiple assessments. It does not label a student as weak based on a single wrong answer."
            </p>
          </div>

          <button
            onClick={handleListenPlan}
            className="px-4 py-2 rounded-2xl bg-[#2196f3] hover:bg-[#0d47a1] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto"
          >
            <Volume2 className="w-4 h-4" />
            <span>Hear AI Action Plan ({voiceGender})</span>
          </button>
        </div>

        {/* Multi-Assessment Pattern Flow Chart */}
        <div className="mt-6 p-4 rounded-2xl bg-[#e3f2fd]/60 border border-[#90caf9]">
          <span className="text-[10px] font-bold text-[#0d47a1] uppercase tracking-wider block mb-2">
            Diagnosis Pipeline:
          </span>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
            <span className="p-2 rounded-xl bg-white border border-[#90caf9] text-gray-700">Multiple Quiz Results</span>
            <span className="text-[#2196f3] font-bold">➔</span>
            <span className="p-2 rounded-xl bg-white border border-[#90caf9] text-gray-700">Performance Pattern</span>
            <span className="text-[#2196f3] font-bold">➔</span>
            <span className="p-2 rounded-xl bg-white border border-[#90caf9] text-gray-700">Concept-Level Analysis</span>
            <span className="text-[#2196f3] font-bold">➔</span>
            <span className="p-2 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 font-bold">Weakness Detection</span>
          </div>
        </div>
      </div>

      {/* DETECTED DIFFICULTY CARD */}
      <div className="glass-card rounded-3xl p-6 border-2 border-amber-300 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
            <h3 className="text-base font-black text-[#0d47a1]">
              Repeated Difficulty Detected
            </h3>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-amber-100 text-amber-800">
            Trigonometry & Quadratics
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#90caf9] space-y-2">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">Identified Weak Concepts:</p>
          <ul className="space-y-1.5 text-xs text-gray-800">
            {weaknessPlan.weakConcepts.map((c, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                <span className="font-semibold">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* INTERACTIVE REMEDIAL VISUALIZER */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#2196f3]" />
            <span className="text-xs font-bold text-[#0d47a1] uppercase tracking-wider">
              Remedial Visualizer: Trigonometric Unit Circle
            </span>
          </div>
          <button
            onClick={() => setShowTrigVisualizer(!showTrigVisualizer)}
            className="text-xs font-bold text-[#2196f3] hover:underline"
          >
            {showTrigVisualizer ? 'Collapse Simulator' : 'Expand Simulator'}
          </button>
        </div>

        {showTrigVisualizer && (
          <TrigonometryVisualizer />
        )}
      </div>

      {/* 5-STEP IMPROVEMENT PLAN: WEAKNESS -> ACTION -> IMPROVEMENT */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#90caf9] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#e3f2fd]">
          <div>
            <div className="flex items-center gap-2">
              <ListChecks className="w-5 h-5 text-[#2196f3]" />
              <h3 className="text-lg font-black text-[#0d47a1]">
                Recommended Improvement Plan
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Core Principle: <strong>Weakness ➔ Action ➔ Improvement</strong> (Never just a report)
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[#0d47a1]">
            <span>{completedStepsCount} of {weaknessPlan.steps.length} Steps Completed</span>
            <span className="px-2 py-0.5 rounded-full bg-[#e3f2fd] border border-[#90caf9]">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          {weaknessPlan.steps.map((step) => {
            return (
              <div
                key={step.step}
                onClick={() => handleStepClick(step.step)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                  step.done 
                    ? 'bg-emerald-50/70 border-emerald-300 shadow-xs' 
                    : 'bg-white border-[#90caf9]/80 hover:border-[#2196f3] hover:bg-[#e3f2fd]/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                    step.done ? 'bg-emerald-600 text-white' : 'bg-[#e3f2fd] text-[#0d47a1] border border-[#90caf9]'
                  }`}>
                    {step.done ? <Check className="w-4 h-4" /> : step.step}
                  </div>

                  <div>
                    <h4 className={`text-xs font-bold ${step.done ? 'text-emerald-900 line-through' : 'text-[#0d47a1]'}`}>
                      Step {step.step}: {step.title}
                    </h4>
                    <p className="text-[11px] text-gray-600 mt-0.5 leading-snug">
                      {step.description}
                    </p>
                  </div>
                </div>

                <span className={`text-[10px] px-2 py-1 rounded-xl font-bold uppercase shrink-0 ${
                  step.done ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {step.done ? 'Completed' : 'Click to Finish'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Re-test CTA Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0d47a1] to-[#2196f3] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold">Ready to close the learning loop?</h4>
            <p className="text-xs text-white/80 mt-0.5">
              Take the Re-Test to verify measurable improvement (+23% verified target).
            </p>
          </div>

          <button
            onClick={() => {
              setSchoolNav('retest');
              speakText("Opening the Re-Test Verification view to demonstrate measurable progress.");
            }}
            className="px-6 py-2.5 rounded-xl bg-white hover:bg-[#e3f2fd] text-[#0d47a1] text-xs font-bold shadow-md transition-all flex items-center gap-2 shrink-0"
          >
            <RotateCcw className="w-4 h-4 text-[#2196f3]" />
            <span>Launch Re-Test Verification</span>
          </button>
        </div>

      </div>

    </div>
  );
};
