import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  HelpCircle, 
  AlertOctagon, 
  Zap, 
  RotateCcw, 
  Lightbulb, 
  Layers, 
  CheckSquare 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ParabolaVisualizer } from '../components/ParabolaVisualizer';

export const ConceptLearningView: React.FC = () => {
  const { 
    currentSubject, 
    currentChapter, 
    currentConcept, 
    voiceGender, 
    speakText, 
    stopSpeech, 
    isSpeaking,
    setSchoolNav,
    markConceptCompleted,
    adaptiveMode,
    setAdaptiveMode,
    subjects
  } = useApp();

  const activeSubject = subjects.find((s) => s.name === currentSubject);
  const activeChapter = activeSubject?.chapters.find((c) => c.title.includes(currentChapter));
  const activeConcept = activeChapter?.concepts.find((c) => c.title === currentConcept) || activeChapter?.concepts[0];
  const [isCompleted, setIsCompleted] = useState<boolean>(activeConcept?.completed ?? false);

  const conceptData = {
    title: activeConcept?.title || currentConcept || 'Concept Learning',
    standardForm: activeConcept?.formulas[0] || 'Learn the concept step by step.',
    formula: activeConcept?.formulas.join(' • ') || '',
    simpleExplanation: activeConcept?.description || 'Build your understanding from the fundamentals before moving to assessment.',
    simplifiedAdaptiveExplanation: activeConcept?.simplifiedExplanation || activeConcept?.quickRevision || activeConcept?.description || 'Start with the core idea, then practice an example.',
    keyPoints: activeConcept?.keyPoints || [],
    formulas: activeConcept?.formulas || [],
    stepByStep: (activeConcept?.stepByStep || []).map((text, index) => ({ step: index + 1, text })),
    easyExample: activeConcept?.easyExample || { problem: 'No example is available yet.', solution: 'Complete the foundational lesson to unlock examples.' },
    applicationExample: activeConcept?.applicationExample || { problem: 'No application example is available yet.', solution: 'Complete the foundational lesson to unlock applications.' },
    realWorldExample: activeConcept?.realWorldExample || 'Real-world applications will appear after the concept is loaded.',
    commonMistakes: activeConcept?.commonMistakes || [],
    quickRevision: activeConcept?.quickRevision || 'Review the key points and formulas above.',
    misunderstoodPoints: activeConcept?.misunderstoodPoints || []
  };


  const handleListenConcept = () => {
    if (isSpeaking) {
      stopSpeech();
    } else {
      const speech = adaptiveMode 
        ? conceptData.simplifiedAdaptiveExplanation 
        : conceptData.simpleExplanation + " For example, " + conceptData.easyExample.problem;
      speakText(speech);
    }
  };

  const handleCompleteConcept = () => {
    setIsCompleted(true);
    if (activeSubject && activeChapter && activeConcept) {
      markConceptCompleted(activeSubject.id, activeChapter.id, activeConcept.id);
    }
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
    speakText("Concept marked as completed! Your learning progress has been updated in your profile. You are now ready for the Concept Quiz.");
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Header Card */}
      <div className="glass-card rounded-3xl p-6 border border-[#90caf9] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#2196f3] uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>{currentSubject} • {currentChapter}</span>
          </div>
          <h2 className="text-2xl font-black text-[#0d47a1] mt-1">
            {conceptData.title}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Pedagogical Transformation: <strong className="text-[#0d47a1]">Complex ➔ Simple ➔ Understandable ➔ Practicable</strong>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Audio Listen */}
          <button
            onClick={handleListenConcept}
            className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm ${
              isSpeaking 
                ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse' 
                : 'bg-[#2196f3] text-white hover:bg-[#0d47a1]'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSpeaking ? 'Stop Audio' : `🔊 Listen with AI (${voiceGender})`}</span>
          </button>

          {/* Mark as Completed */}
          <button
            onClick={handleCompleteConcept}
            className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
              isCompleted 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                : 'bg-white text-[#0d47a1] border-[#90caf9] hover:bg-[#e3f2fd]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{isCompleted ? '✓ Completed' : 'Mark as Completed'}</span>
          </button>

          {/* Proceed to Concept Quiz */}
          <button
            onClick={() => {
              setSchoolNav('quiz');
              speakText("Loading the Concept Quiz for Quadratic Equations. Let us test your understanding!");
            }}
            className="px-4 py-2 rounded-2xl bg-[#0d47a1] hover:bg-[#2196f3] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <span>Take Quiz</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ADAPTIVE LEARNING PANEL: DEMONSTRATING REAL-TIME PERSONALIZATION */}
      <div className="rounded-3xl bg-gradient-to-r from-white via-[#e3f2fd] to-white p-5 border-2 border-[#2196f3] shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#2196f3] text-white flex items-center justify-center shrink-0 shadow-sm">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-black text-[#0d47a1] uppercase tracking-wider">
                Adaptive Learning Engine
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2196f3] text-white font-bold">
                Dynamic
              </span>
            </div>
            <p className="text-xs text-gray-700 mt-0.5">
              "Student Performance ➔ AI Understanding ➔ Adaptive Explanation. If a student struggles, the AI simplifies the explanation."
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const next = !adaptiveMode;
            setAdaptiveMode(next);
            speakText(next 
              ? "Adaptive mode enabled. Simplifying the quadratic formula explanation and offering scaffolding examples." 
              : "Switched back to standard comprehensive curriculum mode.");
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            adaptiveMode 
              ? 'bg-[#0d47a1] text-white shadow-md' 
              : 'bg-white text-[#0d47a1] border border-[#90caf9] hover:bg-[#e3f2fd]'
          }`}
        >
          {adaptiveMode ? '✓ Simplified Adaptive Mode ON' : 'Toggle Simplified Explanation'}
        </button>
      </div>

      {/* SECTION 1: SIMPLE EXPLANATION & KEY FORMULA */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        <div className="md:col-span-8 glass-card rounded-3xl p-6 border border-[#90caf9] space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#2196f3] uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            <span>1. Simple Explanation</span>
          </div>

          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            {adaptiveMode ? conceptData.simplifiedAdaptiveExplanation : conceptData.simpleExplanation}
          </p>

          <div className="p-4 rounded-2xl bg-[#e3f2fd] border border-[#90caf9] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-500">Universal Formula</span>
              <p className="text-xl sm:text-2xl font-black text-[#0d47a1] font-mono mt-0.5">
                x = [-b ± √(b² - 4ac)] / (2a)
              </p>
            </div>
            <span className="text-xs px-3 py-1.5 rounded-xl bg-white text-[#0d47a1] font-bold border border-[#90caf9] shadow-xs">
              Works for all a ≠ 0
            </span>
          </div>
        </div>

        {/* SECTION 2: KEY POINTS */}
        <div className="md:col-span-4 glass-card rounded-3xl p-6 border border-[#90caf9] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0d47a1] uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-[#2196f3]" />
            <span>2. Key Points</span>
          </div>

          <ul className="space-y-2.5 text-xs text-gray-700">
            {conceptData.keyPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2196f3] mt-1.5 shrink-0" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* SECTION 3 & 4: IMPORTANT FORMULAS & STEP-BY-STEP EXPLANATION */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Important Formulas */}
        <div className="md:col-span-5 glass-card rounded-3xl p-6 border border-[#90caf9] space-y-3">
          <span className="text-xs font-bold text-[#0d47a1] uppercase tracking-wider">
            3. Important Formulas
          </span>
          
          <div className="space-y-2">
            {conceptData.formulas.map((form, i) => (
              <div key={i} className="p-3 rounded-2xl bg-white border border-[#90caf9]/70 font-mono text-xs text-[#0d47a1] font-bold shadow-xs">
                {form}
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Explanation */}
        <div className="md:col-span-7 glass-card rounded-3xl p-6 border border-[#90caf9] space-y-3">
          <span className="text-xs font-bold text-[#0d47a1] uppercase tracking-wider">
            4. Step-by-Step Explanation
          </span>

          <div className="space-y-2.5">
            {conceptData.stepByStep.map((s) => (
              <div key={s.step} className="p-3 rounded-2xl bg-white/80 border border-[#90caf9] flex items-start gap-3">
                <span className="w-6 h-6 rounded-xl bg-[#2196f3] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {s.step}
                </span>
                <p className="text-xs text-gray-800 leading-snug">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* SECTION 5 & 6: EASY EXAMPLES & APPLICATION EXAMPLES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Easy Example */}
        <div className="glass-card rounded-3xl p-6 border border-[#90caf9] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0d47a1] uppercase tracking-wider">5. Easy Example</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e3f2fd] text-[#0d47a1] font-bold">Standard</span>
          </div>

          <p className="text-xs font-bold text-gray-800 bg-[#e3f2fd]/60 p-3 rounded-xl border border-[#90caf9]">
            {conceptData.easyExample.problem}
          </p>

          <div className="space-y-1.5 text-xs text-gray-700">
            <p className="text-xs text-gray-700 leading-relaxed">
              <span className="text-[#2196f3] font-bold mr-2">➔</span>
              {conceptData.easyExample.solution}
            </p>
          </div>
        </div>

        {/* Application Example */}
        <div className="glass-card rounded-3xl p-6 border border-[#90caf9] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0d47a1] uppercase tracking-wider">6. Application Example</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e3f2fd] text-[#0d47a1] font-bold">Word Problem</span>
          </div>

          <p className="text-xs font-bold text-gray-800 bg-[#e3f2fd]/60 p-3 rounded-xl border border-[#90caf9]">
            {conceptData.applicationExample.problem}
          </p>

          <div className="space-y-1.5 text-xs text-gray-700">
            <p className="text-xs text-gray-700 leading-relaxed">
              <span className="text-[#2196f3] font-bold mr-2">➔</span>
              {conceptData.applicationExample.solution}
            </p>
          </div>
        </div>

      </div>

      {/* INTERACTIVE PARABOLA GRAPH & DISCRIMINANT DYNAMICS */}
      <ParabolaVisualizer />

      {/* SECTION 7, 8, 9, 10: REAL WORLD, COMMON MISTAKES, QUICK REVISION & MISUNDERSTOOD POINTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Real World Example */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0d47a1] to-[#2196f3] text-white shadow-lg space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#90caf9]">7. Real-World Application</span>
          <h4 className="text-base font-bold">Trajectory Modeling & Space Launch</h4>
          <p className="text-xs text-white/90 leading-relaxed">
            {conceptData.realWorldExample}
          </p>
        </div>

        {/* Common Mistakes */}
        <div className="p-6 rounded-3xl bg-red-50/70 border border-red-200 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-red-800 uppercase tracking-wider">
            <AlertOctagon className="w-4 h-4 text-red-600" />
            <span>8. Common Student Mistakes</span>
          </div>
          <ul className="space-y-1.5 text-xs text-gray-700">
            {conceptData.commonMistakes.map((m, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Revision */}
        <div className="glass-card rounded-3xl p-6 border border-[#90caf9] space-y-2">
          <span className="text-xs font-bold text-[#0d47a1] uppercase tracking-wider">9. Quick Revision</span>
          <p className="text-xs font-mono bg-[#e3f2fd] p-3 rounded-xl border border-[#90caf9] text-[#0d47a1] font-semibold leading-relaxed">
            {conceptData.quickRevision}
          </p>
        </div>

        {/* Frequently Misunderstood Points */}
        <div className="glass-card rounded-3xl p-6 border border-[#90caf9] space-y-2">
          <span className="text-xs font-bold text-[#0d47a1] uppercase tracking-wider">10. Frequently Misunderstood Points</span>
          <ul className="space-y-1.5 text-xs text-gray-700">
            {conceptData.misunderstoodPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-[#2196f3] mt-0.5 shrink-0" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* BOTTOM ACTION BAR */}
      <div className="p-6 rounded-3xl bg-white border-2 border-[#2196f3] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <h4 className="text-sm font-black text-[#0d47a1]">Concept Ready for Assessment</h4>
          <p className="text-xs text-gray-500">Take the adaptive 10-question quiz to test Basic, Conceptual, Application, and Problem-Solving skills.</p>
        </div>
        <button
          onClick={() => {
            setSchoolNav('quiz');
            speakText("Starting the Concept Quiz for Quadratic Equations.");
          }}
          className="px-6 py-3 rounded-2xl bg-[#2196f3] hover:bg-[#0d47a1] text-white text-xs font-bold shadow-lg transition-all flex items-center gap-2 shrink-0"
        >
          <span>Start Concept Quiz (10 Questions)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
