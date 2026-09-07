import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ShieldCheck, Heart, Award, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setRole, setSchoolNav, setCollegeNav, setShowPrivacyModal } = useApp();

  return (
    <footer className="mt-auto border-t border-[#90caf9]/50 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Platform Branding */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2196f3] to-[#0d47a1] flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-black text-sm tracking-tight text-[#0d47a1]">
                SMART EDUCATION PLATFORM
              </span>
            </div>
            <p className="text-xs text-[#0d47a1]/80 leading-relaxed">
              SIH26207 AI-Powered Personalized Learning, Skill Development & Career Readiness Platform.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e3f2fd] border border-[#90caf9] text-[10px] font-bold text-[#0d47a1]">
              <Award className="w-3.5 h-3.5 text-[#2196f3]" />
              Smart India Hackathon 2026 Entry
            </div>
          </div>

          {/* Col 2: School Pathway */}
          <div>
            <h4 className="text-xs font-bold text-[#0d47a1] uppercase tracking-wider mb-3">
              School Pathway (CBSE Class 10)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setRole('school');
                    setSchoolNav('concept-learning');
                  }}
                  className="text-gray-600 hover:text-[#0d47a1] hover:underline text-left transition-colors"
                >
                  Interactive Parabola Visualizer
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setRole('school');
                    setSchoolNav('weakness');
                  }}
                  className="text-gray-600 hover:text-[#0d47a1] hover:underline text-left transition-colors"
                >
                  Unit Circle Trigonometry Remediation
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setRole('school');
                    setSchoolNav('retest');
                  }}
                  className="text-gray-600 hover:text-[#0d47a1] hover:underline text-left transition-colors"
                >
                  Remedial Re-Test (+23% Verified Growth)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setRole('school');
                    setSchoolNav('upload');
                  }}
                  className="text-gray-600 hover:text-[#0d47a1] hover:underline text-left transition-colors"
                >
                  Upload & Learn (AI 10-Step Pipeline)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: College & Career Pathway */}
          <div>
            <h4 className="text-xs font-bold text-[#0d47a1] uppercase tracking-wider mb-3">
              College & Career (Anna Univ CSE)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setRole('college');
                    setCollegeNav('academy');
                  }}
                  className="text-gray-600 hover:text-[#0d47a1] hover:underline text-left transition-colors"
                >
                  Network Protocol CRC & Sliding Window Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setRole('college');
                    setCollegeNav('programming');
                  }}
                  className="text-gray-600 hover:text-[#0d47a1] hover:underline text-left transition-colors"
                >
                  Programming Hub (Sorting & BST Visualizers)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setRole('college');
                    setCollegeNav('mock-interview');
                  }}
                  className="text-gray-600 hover:text-[#0d47a1] hover:underline text-left transition-colors"
                >
                  Employer AI Mock Interview Simulation
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setRole('college');
                    setCollegeNav('resume-builder');
                  }}
                  className="text-gray-600 hover:text-[#0d47a1] hover:underline text-left transition-colors"
                >
                  Zero-Hallucination ATS Resume Builder
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Compliance */}
          <div>
            <h4 className="text-xs font-bold text-[#0d47a1] uppercase tracking-wider mb-3">
              AI Governance & Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-gray-600">
                <ShieldCheck className="w-4 h-4 text-[#2196f3] shrink-0" />
                <span>Zero-Hallucination Resume Policy</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <ShieldCheck className="w-4 h-4 text-[#2196f3] shrink-0" />
                <span>Educational Disclaimers on Interview AI</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <ShieldCheck className="w-4 h-4 text-[#2196f3] shrink-0" />
                <span>AI Chat Support & 4 Indian Languages (EN, HI, TA, TE)</span>
              </li>
              <li>
                <button
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-[#2196f3] hover:text-[#0d47a1] font-semibold hover:underline inline-flex items-center gap-1 mt-1"
                >
                  <span>Student Privacy & DPDP Act Policy</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#90caf9]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div className="flex items-center gap-2">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current inline" />
            <span>for Smart India Hackathon (SIH26207)</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[#0d47a1] bg-[#e3f2fd] px-2 py-0.5 rounded border border-[#90caf9]/50">
              Palette: #e3f2fd • #90caf9 • #2196f3 • #0d47a1
            </span>
            <span>All 13 Continuous Learning Stages Implemented</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
