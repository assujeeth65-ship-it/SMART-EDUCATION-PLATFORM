import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrendingUp, 
  CheckCircle2, 
  XCircle,
  ArrowRight, 
  Sparkles, 
  Volume2, 
  Trophy,
  Calendar,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RemedialQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const RetestView: React.FC = () => {
  const { 
    retestData, 
    triggerRetestSubmission, 
    speakText, 
    voiceGender,
    setSchoolNav 
  } = useApp();

  const [activeTestSim, setActiveTestSim] = useState(false);
  const [selectedScore, setSelectedScore] = useState<number>(0);

  // Live 5-Question Re-Test state
  const [isLiveReTest, setIsLiveReTest] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const remedialQuestions: RemedialQuestion[] = [
    {
      id: 1,
      question: "A train travels 360 km at a uniform speed. If speed had been 5 km/h more, it would take 1 hr less for the same journey. What is the original speed of the train?",
      options: ["35 km/h", "40 km/h", "45 km/h", "50 km/h"],
      correctIndex: 1,
      explanation: "360/s - 360/(s+5) = 1 => 360(s+5) - 360s = s(s+5) => 1800 = s² + 5s => s² + 5s - 1800 = 0. Solving gives (s + 45)(s - 40) = 0 => s = 40 km/h."
    },
    {
      id: 2,
      question: "For what value of k does the quadratic equation kx(x - 2) + 6 = 0 have two equal real roots?",
      options: ["k = 4", "k = 6", "k = 8", "k = 12"],
      correctIndex: 1,
      explanation: "Rewrite in standard form: kx² - 2kx + 6 = 0. For equal real roots, D = b² - 4ac = 0 => (-2k)² - 4(k)(6) = 0 => 4k² - 24k = 0 => 4k(k - 6) = 0. Since k ≠ 0 for a quadratic equation, k = 6."
    },
    {
      id: 3,
      question: "The altitude of a right-angled triangle is 7 cm less than its base. If the hypotenuse is 13 cm, find the base of the triangle.",
      options: ["10 cm", "12 cm", "14 cm", "15 cm"],
      correctIndex: 1,
      explanation: "Let base be b. Altitude = b - 7. By Pythagoras: b² + (b - 7)² = 13² => b² + b² - 14b + 49 = 169 => 2b² - 14b - 120 = 0 => b² - 7b - 60 = 0. Factors of -60 that add to -7 are -12 and 5: (b - 12)(b + 5) = 0. Since dimensions must be positive, base = 12 cm."
    },
    {
      id: 4,
      question: "What is the discriminant of the quadratic equation 3x² - 2x + 1/3 = 0, and what does it reveal about its roots?",
      options: [
        "D = -4, no real roots",
        "D = 0, two equal real roots",
        "D = 4, two distinct real roots",
        "D = 1, rational roots"
      ],
      correctIndex: 1,
      explanation: "Here a = 3, b = -2, c = 1/3. D = b² - 4ac = (-2)² - 4(3)(1/3) = 4 - 4 = 0. Since D = 0, the equation has two equal real roots: x = -b/(2a) = 2/6 = 1/3."
    },
    {
      id: 5,
      question: "Solve the algebraic equation for x: 1/x - 1/(x - 2) = 3 (where x ≠ 0, 2).",
      options: [
        "x = (3 ± √3) / 3",
        "x = (2 ± √5) / 2",
        "x = (1 ± √3) / 2",
        "x = 3 ± √2"
      ],
      correctIndex: 0,
      explanation: "LHS: [(x - 2) - x] / [x(x - 2)] = -2 / (x² - 2x) = 3 => 3(x² - 2x) = -2 => 3x² - 6x + 2 = 0. Using formula: x = [6 ± √(36 - 24)] / 6 = (6 ± √12) / 6 = (6 ± 2√3) / 6 = (3 ± √3) / 3."
    }
  ];

  const handleStartLiveTest = () => {
    if (retestData.beforeScore <= 0) return;
    setIsLiveReTest(true);
    setCurrentQIndex(0);
    setSelectedOpt(null);
    setAnswers([]);
    setIsAnswerSubmitted(false);
    speakText("Starting the Live Remedial Re-Test. 5 targeted questions to measure your verified progress.");
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOpt(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOpt === null) return;
    setIsAnswerSubmitted(true);
    const updated = [...answers, selectedOpt];
    setAnswers(updated);

    const isCorrect = selectedOpt === remedialQuestions[currentQIndex].correctIndex;
    if (isCorrect) {
      confetti({ particleCount: 35, spread: 45, origin: { y: 0.8 } });
      speakText("Correct answer! " + remedialQuestions[currentQIndex].explanation);
    } else {
      speakText("Incorrect. " + remedialQuestions[currentQIndex].explanation);
    }
  };

  const handleNextLiveQ = () => {
    if (currentQIndex < remedialQuestions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedOpt(null);
      setIsAnswerSubmitted(false);
    } else {
      // Calculate final score, including the answer just submitted.
      const completedAnswers = [...answers];
      if (selectedOpt !== null) completedAnswers[currentQIndex] = selectedOpt;
      let correctCount = 0;
      remedialQuestions.forEach((q, i) => {
        if (completedAnswers[i] === q.correctIndex) correctCount++;
      });
      const calculatedScore = Math.round((correctCount / remedialQuestions.length) * 100);
      triggerRetestSubmission(calculatedScore);
      setIsLiveReTest(false);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      speakText(`Live Re-Test complete! You scored ${calculatedScore}% (${correctCount} of 5 correct). Verified score growth recorded!`);
    }
  };

  const handleSimulateRetest = () => {
    if (retestData.beforeScore <= 0) return;
    triggerRetestSubmission(selectedScore);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });
    speakText(`Re-Test score updated to ${selectedScore}%! Your measurable improvement is verified at plus ${selectedScore - retestData.beforeScore} percent.`);
    setActiveTestSim(false);
  };

  const handleListenReport = () => {
    speakText(`Re-Test Performance Report: Baseline score was ${retestData.beforeScore} percent. Verified new score is ${retestData.afterScore} percent. Demonstrating a measurable improvement of plus ${retestData.improvement} percent.`);
  };

  const currentRemedialQ = remedialQuestions[currentQIndex];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#90caf9] shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e3f2fd]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>SIH26207 Measurable Progress Verification</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0d47a1]">
              Re-Test Verification System
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              "Demonstrating continuous, measurable improvement rather than static one-time marks."
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleListenReport}
              className="px-4 py-2 rounded-2xl bg-[#2196f3] hover:bg-[#0d47a1] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              <span>Hear Report ({voiceGender})</span>
            </button>
          </div>
        </div>

        {/* Verification Flow Diagram */}
        <div className="mt-6 p-4 rounded-2xl bg-[#e3f2fd]/60 border border-[#90caf9]">
          <span className="text-[10px] font-bold text-[#0d47a1] uppercase tracking-wider block mb-2">
            The Closed Learning Loop:
          </span>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
            <span className="p-2.5 rounded-xl bg-white border border-[#90caf9] text-gray-700">Previous Performance (55%)</span>
            <span className="text-[#2196f3] font-bold">➔</span>
            <span className="p-2.5 rounded-xl bg-white border border-[#90caf9] text-gray-700">Targeted Practice Plan</span>
            <span className="text-[#2196f3] font-bold">➔</span>
            <span className="p-2.5 rounded-xl bg-white border border-[#90caf9] text-[#2196f3] font-bold">Re-Test Attempt</span>
            <span className="text-[#2196f3] font-bold">➔</span>
            <span className="p-2.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold">New Performance (78%)</span>
          </div>
        </div>
      </div>

      {/* LIVE 5-QUESTION RE-TEST QUIZ MODAL/ROOM */}
      {isLiveReTest ? (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-[#2196f3] shadow-2xl space-y-6 animate-in zoom-in-95">
          <div className="flex items-center justify-between pb-4 border-b border-[#e3f2fd]">
            <div>
              <span className="text-[10px] font-bold text-[#2196f3] uppercase tracking-wider">
                Live Remedial Re-Test
              </span>
              <h3 className="text-base font-black text-[#0d47a1] mt-0.5">
                Targeted Remedial Question {currentQIndex + 1} of {remedialQuestions.length}
              </h3>
            </div>
            <span className="px-3 py-1 rounded-xl bg-[#e3f2fd] text-[#0d47a1] font-bold text-xs border border-[#90caf9]">
              Focus: Word Problems & Fractions
            </span>
          </div>

          <p className="text-sm font-bold text-[#0d47a1] leading-relaxed">
            {currentRemedialQ.question}
          </p>

          <div className="space-y-2.5 text-xs">
            {currentRemedialQ.options.map((opt, idx) => {
              const isSelected = selectedOpt === idx;
              const isCorrect = idx === currentRemedialQ.correctIndex;
              let style = "bg-white border-[#90caf9] text-gray-800 hover:border-[#2196f3]";
              if (isAnswerSubmitted) {
                if (isCorrect) style = "bg-emerald-100 border-2 border-emerald-600 text-emerald-950 font-bold";
                else if (isSelected && !isCorrect) style = "bg-red-100 border-2 border-red-500 text-red-950 font-bold";
                else style = "opacity-40 bg-white border-gray-200 text-gray-400";
              } else if (isSelected) {
                style = "bg-[#2196f3] text-white font-bold";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${style}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-black">{String.fromCharCode(65 + idx)}.</span>
                    <span>{opt}</span>
                  </div>
                  {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />}
                  {isAnswerSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {isAnswerSubmitted && (
            <div className="p-4 rounded-2xl bg-white border-2 border-[#90caf9] text-xs text-gray-700 leading-relaxed animate-in fade-in">
              <strong className="text-[#0d47a1]">AI Step-by-Step Solution: </strong>
              {currentRemedialQ.explanation}
            </div>
          )}

          <div className="pt-3 border-t border-[#e3f2fd] flex justify-between items-center">
            <button
              onClick={() => setIsLiveReTest(false)}
              className="text-xs text-gray-500 hover:text-[#0d47a1]"
            >
              Exit Live Test
            </button>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOpt === null}
                className="px-6 py-2.5 rounded-xl bg-[#2196f3] hover:bg-[#0d47a1] disabled:opacity-40 text-white text-xs font-bold shadow-md transition-all"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextLiveQ}
                className="px-6 py-2.5 rounded-xl bg-[#0d47a1] hover:bg-[#2196f3] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <span>{currentQIndex === remedialQuestions.length - 1 ? 'Finish & Record Score' : 'Next Question'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* CORE COMPARISON VISUALIZATION: BEFORE VS AFTER */
        <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-[#2196f3] shadow-xl space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold text-[#2196f3] uppercase tracking-wider">Concept Benchmark</span>
              <h3 className="text-lg font-black text-[#0d47a1] mt-0.5">{retestData.concept}</h3>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleStartLiveTest}
                disabled={retestData.beforeScore <= 0}
                className="px-5 py-2 rounded-xl bg-[#2196f3] hover:bg-[#0d47a1] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Take Live 5-Question Re-Test</span>
              </button>

              <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 font-black border border-emerald-200">
                {retestData.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            
            {/* Before */}
            <div className="p-6 rounded-3xl bg-white border border-[#90caf9] shadow-sm space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-gray-500 uppercase">
                <Calendar className="w-3.5 h-3.5" />
                <span>Initial Score ({retestData.dateBefore})</span>
              </div>
              <p className="text-5xl font-black text-gray-500 mt-2">{retestData.beforeScore}%</p>
              <p className="text-xs text-red-500 font-semibold">Struggled with multi-step word problems</p>
            </div>

            {/* Improvement Arrow */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#e3f2fd] to-white border-2 border-emerald-400 shadow-md flex flex-col items-center justify-center space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">
                Verified Growth Delta
              </span>
              <p className="text-5xl font-black text-emerald-600">+{retestData.improvement}%</p>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs">
                <TrendingUp className="w-4 h-4" />
                <span>Measurable Improvement</span>
              </div>
            </div>

            {/* After */}
            <div className="p-6 rounded-3xl bg-white border-2 border-[#0d47a1] shadow-md space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#0d47a1] uppercase">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>Re-Test Score ({retestData.dateAfter})</span>
              </div>
              <p className="text-5xl font-black text-[#0d47a1] mt-2">{retestData.afterScore}%</p>
              <p className="text-xs text-emerald-600 font-bold">Mastery Validated Across Word Problems</p>
            </div>

          </div>

          {/* Progress Bar Visualization */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-gray-500">Baseline ({retestData.beforeScore}%)</span>
              <span className="text-[#0d47a1]">Current Re-Test ({retestData.afterScore}%)</span>
              <span className="text-emerald-700 font-black">Target (80%+)</span>
            </div>
            <div className="h-4 rounded-full bg-[#e3f2fd] p-0.5 overflow-hidden border border-[#90caf9]">
              <div 
                className="h-full bg-gradient-to-r from-gray-400 via-[#2196f3] to-emerald-500 rounded-full transition-all duration-700"
                style={{ width: `${retestData.afterScore}%` }}
              />
            </div>
          </div>

        </div>
      )}

      {/* QUICK SCORE ADJUSTMENT SANDBOX */}
      {!isLiveReTest && (
        <div className="glass-card rounded-3xl p-6 border border-[#90caf9] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-[#0d47a1]">Manual Score Benchmark Sandbox</h4>
              <p className="text-xs text-gray-500">Preset score targets to simulate various progress outcomes.</p>
            </div>
            <button
              onClick={() => setActiveTestSim(!activeTestSim)}
              className="px-4 py-2 rounded-xl bg-[#e3f2fd] text-[#0d47a1] hover:bg-[#2196f3] hover:text-white text-xs font-bold transition-all"
            >
              {activeTestSim ? 'Hide Sandbox' : 'Show Score Sandbox'}
            </button>
          </div>

          {activeTestSim && (
            <div className="p-4 rounded-2xl bg-white border-2 border-[#2196f3] space-y-4 animate-in fade-in duration-200">
              <p className="text-xs text-gray-700 font-medium">
                Select target benchmark:
              </p>

              <div className="flex flex-wrap gap-3">
                {[70, 78, 85, 92].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedScore(s)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedScore === s 
                        ? 'bg-[#0d47a1] text-white shadow-sm' 
                        : 'bg-[#e3f2fd] text-[#0d47a1] hover:bg-[#90caf9]/40'
                    }`}
                  >
                    {s}% Score
                  </button>
                ))}
              </div>

              <button
                onClick={handleSimulateRetest}
                className="px-6 py-2.5 rounded-xl bg-[#2196f3] hover:bg-[#0d47a1] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Benchmark Score</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* FOOTER CTA */}
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={() => setSchoolNav('academy')}
          className="text-xs text-gray-600 hover:text-[#0d47a1] font-medium"
        >
          ← Return to Academy Curriculum
        </button>

        <button
          onClick={() => {
            setSchoolNav('dashboard');
            speakText("Returning to your dashboard. Your verified mastery improvement is recorded.");
          }}
          className="px-6 py-2.5 rounded-xl bg-[#0d47a1] hover:bg-[#2196f3] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
        >
          <span>Back to Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
