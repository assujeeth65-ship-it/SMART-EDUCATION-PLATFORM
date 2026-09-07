import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { conceptQuizData } from '../data/mockData';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizView: React.FC = () => {
  const { 
    setSchoolNav, 
    speakText, 
    stopSpeech, 
    isSpeaking, 
    voiceGender,
    recordQuizResult
  } = useApp();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);

  const currentQ = conceptQuizData.questions[currentIndex];
  const totalQ = conceptQuizData.questions.length;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswered(true);
    setUserAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = selectedOption;
      return next;
    });

    const isCorrect = selectedOption === currentQ.correctIndex;
    if (isCorrect) {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
      speakText("Correct! " + currentQ.explanation);
    } else {
      speakText("Incorrect. " + currentQ.explanation);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < totalQ - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      // Finished quiz -> calculate and store the real result before navigating.
      const completedAnswers = [...userAnswers];
      if (completedAnswers.length < totalQ && selectedOption !== null) {
        completedAnswers[currentIndex] = selectedOption;
      }
      recordQuizResult(completedAnswers);
      setSchoolNav('quiz-analysis');
      speakText("Quiz completed! Analyzing your concept understanding, application skills, and error patterns now.");
    }
  };

  const handleVoiceReadout = () => {
    if (isSpeaking) {
      stopSpeech();
    } else {
      const textToRead = `Question ${currentIndex + 1} of ${totalQ}. Difficulty: ${currentQ.type}. ${currentQ.question}. Options: ${currentQ.options.join(', ')}.`;
      speakText(textToRead);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      
      {/* Quiz Top Navigation Bar */}
      <div className="glass-card rounded-3xl p-6 border border-[#90caf9] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#2196f3] uppercase tracking-wider">
              {conceptQuizData.subjectTitle} • {conceptQuizData.chapterTitle}
            </span>
            <h2 className="text-xl font-black text-[#0d47a1] mt-0.5">
              {conceptQuizData.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-black text-[#0d47a1] bg-[#e3f2fd] px-3 py-1.5 rounded-xl border border-[#90caf9]">
              Question {currentIndex + 1} / {totalQ}
            </span>
          </div>
        </div>

        {/* Question Progress Bar */}
        <div className="w-full h-2 rounded-full bg-[#e3f2fd] overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#2196f3] to-[#0d47a1] transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQ) * 100}%` }}
          />
        </div>
      </div>

      {/* QUESTION CARD */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#90caf9] shadow-lg space-y-6">
        
        {/* Question Meta Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
              currentQ.type === 'Basic' ? 'bg-blue-50 text-blue-700 border-blue-200' :
              currentQ.type === 'Conceptual' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
              currentQ.type === 'Application' ? 'bg-amber-50 text-amber-700 border-amber-200' :
              'bg-purple-50 text-purple-700 border-purple-200'
            }`}>
              {currentQ.type} Question
            </span>
            <span className="text-xs text-gray-500">SIH Adaptive Engine</span>
          </div>

          {/* Voice Readout Button */}
          <button
            onClick={handleVoiceReadout}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isSpeaking ? 'bg-amber-100 text-amber-800 animate-pulse' : 'text-[#0d47a1] hover:bg-[#e3f2fd]'
            }`}
            title="Listen to question"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#2196f3]" />}
            <span className="text-[11px] font-bold">Listen ({voiceGender})</span>
          </button>
        </div>

        {/* Question Statement */}
        <h3 className="text-lg font-bold text-[#0d47a1] leading-snug">
          {currentQ.question}
        </h3>

        {/* Options List */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;
            
            let btnClass = "bg-white border-[#90caf9]/70 text-[#0d47a1] hover:border-[#2196f3] hover:bg-[#e3f2fd]/30";
            if (isSelected && !isAnswered) {
              btnClass = "bg-[#e3f2fd] border-2 border-[#2196f3] text-[#0d47a1] font-bold shadow-sm";
            } else if (isAnswered) {
              if (isCorrect) {
                btnClass = "bg-emerald-50 border-2 border-emerald-500 text-emerald-900 font-bold";
              } else if (isSelected && !isCorrect) {
                btnClass = "bg-red-50 border-2 border-red-500 text-red-900 font-bold";
              } else {
                btnClass = "opacity-50 bg-white border-gray-200 text-gray-400";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnClass}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-xl bg-[#e3f2fd] text-[#0d47a1] font-black text-xs flex items-center justify-center shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>

                {isAnswered && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* AI Hint Drawer */}
        {currentQ.aiHint && (
          <div>
            {!showHint ? (
              <button
                onClick={() => setShowHint(true)}
                className="text-xs text-[#2196f3] font-bold hover:underline flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Need a hint? Ask AI</span>
              </button>
            ) : (
              <div className="p-3.5 rounded-2xl bg-[#e3f2fd] border border-[#90caf9] text-xs text-[#0d47a1] animate-in fade-in">
                <span className="font-bold">AI Hint: </span>
                <span>{currentQ.aiHint}</span>
              </div>
            )}
          </div>
        )}

        {/* Explanation revealed upon answering */}
        {isAnswered && (
          <div className="p-4 rounded-2xl bg-white border-2 border-[#90caf9] space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0d47a1]">
              <Sparkles className="w-4 h-4 text-[#2196f3]" />
              <span>Step-by-Step AI Explanation</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Action Controls: Submit / Next */}
        <div className="pt-4 border-t border-[#e3f2fd] flex items-center justify-between">
          <button
            onClick={() => {
              if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
                setIsAnswered(false);
                setSelectedOption(null);
              }
            }}
            disabled={currentIndex === 0}
            className="text-xs text-gray-400 hover:text-[#0d47a1] disabled:opacity-40"
          >
            ← Previous Question
          </button>

          {!isAnswered ? (
            <button
              onClick={handleCheckAnswer}
              disabled={selectedOption === null}
              className="px-6 py-2.5 rounded-xl bg-[#2196f3] hover:bg-[#0d47a1] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <span>Submit Answer</span>
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-2.5 rounded-xl bg-[#0d47a1] hover:bg-[#2196f3] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <span>{currentIndex === totalQ - 1 ? 'View AI Quiz Analysis' : 'Next Question'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
