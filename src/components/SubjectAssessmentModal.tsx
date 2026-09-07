import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  X, 
  Sparkles, 
  Trophy, 
  AlertTriangle, 
  BarChart3, 
  ArrowRight, 
  Volume2, 
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SubjectAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubjectAssessmentModal: React.FC<SubjectAssessmentModalProps> = ({ isOpen, onClose }) => {
  const { speakText, voiceGender, setSchoolNav } = useApp();

  const [activeStep, setActiveStep] = useState<'prompt' | 'evaluating' | 'report'>('prompt');

  if (!isOpen) return null;

  const performanceMetrics = [
    { domain: 'Algebra', score: activeStep === 'report' ? 82 : 0, status: activeStep === 'report' ? 'Assessed' : 'Not assessed', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { domain: 'Geometry', score: activeStep === 'report' ? 78 : 0, status: activeStep === 'report' ? 'Assessed' : 'Not assessed', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { domain: 'Trigonometry', score: activeStep === 'report' ? 65 : 0, status: activeStep === 'report' ? 'Needs Improvement' : 'Not assessed', color: 'text-amber-800 bg-amber-50 border-amber-300' },
    { domain: 'Statistics', score: activeStep === 'report' ? 75 : 0, status: activeStep === 'report' ? 'Assessed' : 'Not assessed', color: 'text-[#0d47a1] bg-[#e3f2fd] border-[#90caf9]' }
  ];

  const handleStartExam = () => {
    setActiveStep('evaluating');
    speakText("Starting Mathematics Subject Overall Assessment. Evaluating questions across Algebra, Geometry, Trigonometry, and Statistics.");
    setTimeout(() => {
      setActiveStep('report');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      speakText("Assessment complete! Review the domain results and continue with the recommended practice.");
    }, 1200);
  };

  const handleGoToImprovement = () => {
    onClose();
    setSchoolNav('weakness');
    speakText("Navigating to your targeted Trigonometry and Quadratic improvement plan.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#90caf9] overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0d47a1] to-[#2196f3] px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-[#90caf9]" />
            <div>
              <h3 className="font-bold text-sm sm:text-base">Subject Overall Assessment & Analysis</h3>
              <p className="text-[11px] text-[#e3f2fd]">Section 19 & 20 • Multi-Chapter Comprehensive Evaluation</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-[#0d47a1]">
          
          {/* Status banner */}
          <div className="p-4 rounded-2xl bg-[#e3f2fd]/60 border border-[#90caf9] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2196f3] text-white flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-[#0d47a1]">Mathematics (Current School Grade)</h4>
                <p className="text-xs text-gray-600">{activeStep === 'report' ? 'Assessment completed for available curriculum data.' : 'No overall assessment completed yet.'}</p>
              </div>
            </div>

            <button
              onClick={handleStartExam}
              className="px-4 py-2 rounded-xl bg-[#0d47a1] hover:bg-[#2196f3] text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Re-Run Overall Assessment</span>
            </button>
          </div>

          {/* Performance Report */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#2196f3] uppercase tracking-wider">
                  Mathematics Performance Diagnostic
                </span>
                <h3 className="text-lg font-black text-[#0d47a1]">Comprehensive Domain Breakdown</h3>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-[#0d47a1]">{activeStep === 'report' ? '75%' : '0%'}</span>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Overall Score</p>
              </div>
            </div>

            {/* 4 Domains Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {performanceMetrics.map((m) => (
                <div key={m.domain} className={`p-3.5 rounded-2xl border ${m.color}`}>
                  <span className="text-[10px] font-bold uppercase">{m.domain}</span>
                  <p className="text-2xl font-black mt-1">{m.score}%</p>
                  <span className="text-[10px] font-semibold block mt-0.5">{m.status}</span>
                </div>
              ))}
            </div>

            {/* Strong vs Improvement Area Callout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Strong Areas</span>
                </div>
                <p className="text-gray-700">• Algebra (82%)</p>
                <p className="text-gray-700">• Geometry (78%)</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Improvement Area</span>
                </div>
                <p className="text-gray-700 font-bold">• Trigonometry (65%)</p>
                <p className="text-gray-600 text-[11px]">Weak Concepts: Trigonometric Ratios & Applications</p>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2 border-t border-[#e3f2fd] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-gray-500">
              The AI automatically generates a personalized improvement path.
            </span>
            <button
              onClick={handleGoToImprovement}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#2196f3] hover:bg-[#0d47a1] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Go to Personalized Improvement Path</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
