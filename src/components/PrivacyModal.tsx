import React from 'react';
import { useApp } from '../context/AppContext';
import { X, ShieldCheck, Lock, EyeOff, FileCheck2, Database, Sparkles } from 'lucide-react';

export const PrivacyModal: React.FC = () => {
  const { showPrivacyModal, setShowPrivacyModal } = useApp();

  if (!showPrivacyModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#90caf9] overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0d47a1] to-[#2196f3] px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-[#90caf9]" />
            <div>
              <h3 className="font-bold text-base">Privacy-First Architecture & AI Reliability</h3>
              <p className="text-[11px] text-[#e3f2fd]">SIH26207 Source-Grounded Governance</p>
            </div>
          </div>
          <button 
            onClick={() => setShowPrivacyModal(false)}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-[#0d47a1]">
          
          {/* Section 1: Privacy Flow */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-4 h-4 text-[#2196f3]" />
              <h4 className="font-bold text-sm">Privacy-First Design Workflow</h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-[#e3f2fd] border border-[#90caf9]">
                <p className="font-bold text-[11px]">1. Collect Only</p>
                <p className="text-[10px] text-gray-600 mt-1">Necessary educational data</p>
              </div>
              <div className="p-3 rounded-xl bg-[#e3f2fd] border border-[#90caf9]">
                <p className="font-bold text-[11px]">2. Secure</p>
                <p className="text-[10px] text-gray-600 mt-1">Encrypted state & storage</p>
              </div>
              <div className="p-3 rounded-xl bg-[#e3f2fd] border border-[#90caf9]">
                <p className="font-bold text-[11px]">3. Role-Based</p>
                <p className="text-[10px] text-gray-600 mt-1">School vs College vs Admin</p>
              </div>
              <div className="p-3 rounded-xl bg-[#e3f2fd] border border-[#90caf9]">
                <p className="font-bold text-[11px]">4. Limited</p>
                <p className="text-[10px] text-gray-600 mt-1">Private chats protected</p>
              </div>
              <div className="p-3 rounded-xl bg-[#e3f2fd] border border-[#90caf9]">
                <p className="font-bold text-[11px]">5. Aggregated</p>
                <p className="text-[10px] text-gray-600 mt-1">Anonymized analytics</p>
              </div>
            </div>

            <p className="text-xs text-gray-600 mt-3 leading-relaxed bg-[#e3f2fd]/50 p-3 rounded-xl border border-[#90caf9]/50">
              <EyeOff className="w-3.5 h-3.5 inline mr-1.5 text-[#2196f3]" />
              <strong>Administrator Boundary:</strong> Admin users never inspect individual private conversations or tutoring logs. Platform admins only view aggregated cohort metrics and manage verified educational assets.
            </p>
          </div>

          {/* Section 2: AI Safety & Source-Grounded Learning */}
          <div className="border-t border-[#90caf9]/40 pt-5">
            <div className="flex items-center gap-2 mb-3">
              <FileCheck2 className="w-4 h-4 text-[#2196f3]" />
              <h4 className="font-bold text-sm">Handling AI Hallucination: Source-Grounded Learning</h4>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#e3f2fd] to-white border border-[#90caf9] space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="px-2.5 py-1 rounded-lg bg-[#2196f3] text-white">Trusted Curriculum / Uploaded PDF</span>
                <span>➔</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#0d47a1] text-white">AI Processing</span>
                <span>➔</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#2196f3] text-white">Validation Layer</span>
                <span>➔</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white">Student</span>
              </div>

              <div className="space-y-1.5 text-xs text-gray-700 pt-2">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2196f3]" />
                  Curriculum-aligned explanations prioritize official CBSE, State Board & University syllabi.
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2196f3]" />
                  Uploaded documents undergo structure validation before generating interactive lessons.
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2196f3]" />
                  <strong>Zero-Hallucination Resume Builder:</strong> The AI never invents certificates, marks, or projects; student retains 100% edit and export control.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Student Control */}
          <div className="border-t border-[#90caf9]/40 pt-4 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Compliant with SIH26207 Educational Integrity Standards
            </span>
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="px-5 py-2 rounded-xl bg-[#0d47a1] hover:bg-[#2196f3] text-white text-xs font-bold transition-colors"
            >
              Understood
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
