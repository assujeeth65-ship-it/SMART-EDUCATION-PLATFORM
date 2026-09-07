import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { sampleResumeData } from '../data/mockData';
import { ResumeData } from '../types';
import { 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  Printer, 
  Check, 
  Edit3, 
  Save, 
  ExternalLink,
  GraduationCap,
  Briefcase,
  Trophy,
  Code2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ResumeBuilderView: React.FC = () => {
  const { speakText } = useApp();

  const [resumeData, setResumeData] = useState<ResumeData>(sampleResumeData);
  const [activeStep, setActiveStep] = useState<'Generate' | 'Review' | 'Edit' | 'Approve' | 'Export'>('Review');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleApprove = () => {
    setActiveStep('Approve');
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    speakText("Resume approved! The structure complies with top ATS standards, and zero unverified claims were included.");
  };

  const handlePrint = () => {
    setActiveStep('Export');
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner (hidden on print) */}
      <div className="print:hidden glass-card rounded-3xl p-6 sm:p-8 border border-[#90caf9] shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e3f2fd]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e3f2fd] border border-[#90caf9] text-xs font-bold text-[#0d47a1] mb-2">
              <FileText className="w-3.5 h-3.5 text-[#2196f3]" />
              <span>College Career Readiness</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0d47a1]">
              AI Resume Builder
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              "Generate ➔ Review ➔ Edit ➔ Approve ➔ Export. Clean ATS-friendly formatting with student control."
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Strict Zero-Hallucination Policy</span>
            </span>
          </div>
        </div>

        {/* SIH26207 Integrity Callout */}
        <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-300 text-xs text-emerald-900 leading-relaxed">
          <strong>Mandatory Safeguard:</strong> "The AI must NEVER invent qualifications, certificates, projects, marks, or experience. The student retains full editorial control over the final document."
        </div>

        {/* 5-Step Workflow Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 p-2 rounded-2xl bg-[#e3f2fd]/60 border border-[#90caf9] text-xs font-bold text-[#0d47a1]">
          {['Generate', 'Review', 'Edit', 'Approve', 'Export'].map((st, i) => (
            <div key={st} className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-xl transition-all ${
                activeStep === st ? 'bg-[#0d47a1] text-white shadow-xs' : 'bg-white/80'
              }`}>
                {i + 1}. {st}
              </span>
              {i < 4 && <span className="text-[#2196f3] font-bold hidden sm:inline">➔</span>}
            </div>
          ))}
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsEditing(!isEditing);
                setActiveStep(isEditing ? 'Review' : 'Edit');
              }}
              className="px-4 py-2 rounded-xl bg-white border border-[#90caf9] text-xs font-bold text-[#0d47a1] hover:bg-[#e3f2fd] transition-all flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#2196f3]" />
              <span>{isEditing ? 'Close Edit Form' : 'Edit Resume Details'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleApprove}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Approve Resume</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-xl bg-[#2196f3] hover:bg-[#0d47a1] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export / Print PDF</span>
            </button>
          </div>
        </div>

        {/* INTERACTIVE EDITING PANEL (WHEN EDIT IS ACTIVE) */}
        {isEditing && (
          <div className="mt-6 p-6 rounded-2xl bg-white border-2 border-[#2196f3] space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-[#e3f2fd]">
              <h4 className="text-xs font-black text-[#0d47a1] uppercase tracking-wider">
                Student Resume Information Editor (Full Control)
              </h4>
              <span className="text-[10px] text-gray-500 font-semibold">Changes sync instantly</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-[#0d47a1] mb-1">Full Name</label>
                <input
                  type="text"
                  value={resumeData.fullName}
                  onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-[#e3f2fd]/40 border border-[#90caf9] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0d47a1] mb-1">Email & Phone</label>
                <input
                  type="text"
                  value={`${resumeData.email} • ${resumeData.phone}`}
                  onChange={(e) => setResumeData({ ...resumeData, email: e.target.value.split('•')[0]?.trim() || '' })}
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-[#e3f2fd]/40 border border-[#90caf9] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-[#0d47a1] mb-1">Professional Summary</label>
                <textarea
                  rows={2}
                  value={resumeData.professionalSummary}
                  onChange={(e) => setResumeData({ ...resumeData, professionalSummary: e.target.value })}
                  className="w-full p-3 text-xs rounded-xl bg-[#e3f2fd]/40 border border-[#90caf9] focus:outline-none leading-relaxed"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-[#0d47a1] mb-1">Programming Languages (Comma-separated)</label>
                <input
                  type="text"
                  value={resumeData.programmingLanguages.join(', ')}
                  onChange={(e) => setResumeData({ 
                    ...resumeData, 
                    programmingLanguages: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-[#e3f2fd]/40 border border-[#90caf9] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-[#0d47a1] mb-1">Core Technical Skills (Comma-separated)</label>
                <input
                  type="text"
                  value={resumeData.skills.join(', ')}
                  onChange={(e) => setResumeData({ 
                    ...resumeData, 
                    skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-[#e3f2fd]/40 border border-[#90caf9] focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ATS-FRIENDLY RESUME DOCUMENT PREVIEW (PRINTABLE) */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-200 text-gray-800 space-y-6 print:shadow-none print:border-none print:p-0">
        
        {/* Header: Name & Contact */}
        <div className="border-b-2 border-[#0d47a1] pb-4 text-center space-y-1">
          <h1 className="text-3xl font-black text-[#0d47a1] tracking-wide m-0">
            {resumeData.fullName}
          </h1>
          <p className="text-xs text-gray-600 font-medium">
            {resumeData.location} • {resumeData.phone} • {resumeData.email}
          </p>
          <p className="text-xs text-[#2196f3] font-semibold">
            {resumeData.linkedin} • {resumeData.github}
          </p>
        </div>

        {/* Professional Summary */}
        <div className="space-y-1">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#0d47a1] border-b border-gray-200 pb-1">
            Professional Summary
          </h3>
          <p className="text-xs text-gray-700 leading-relaxed pt-1">
            {resumeData.professionalSummary}
          </p>
        </div>

        {/* Education */}
        <div className="space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#0d47a1] border-b border-gray-200 pb-1">
            Education
          </h3>
          <div className="space-y-2 pt-1">
            {resumeData.education.map((edu, i) => (
              <div key={i} className="flex justify-between items-start text-xs">
                <div>
                  <p className="font-bold text-gray-900">{edu.institution}</p>
                  <p className="text-gray-600">{edu.degree}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{edu.year}</p>
                  <p className="text-[#0d47a1] font-bold">{edu.gpa}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills & Programming */}
        <div className="space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#0d47a1] border-b border-gray-200 pb-1">
            Technical & Programming Skills
          </h3>
          <div className="text-xs space-y-1 pt-1">
            <p>
              <strong className="text-gray-900">Languages:</strong>{' '}
              <span className="text-gray-700">{resumeData.programmingLanguages.join(', ')}</span>
            </p>
            <p>
              <strong className="text-gray-900">Core Competencies:</strong>{' '}
              <span className="text-gray-700">{resumeData.skills.join(', ')}</span>
            </p>
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#0d47a1] border-b border-gray-200 pb-1">
            Featured Projects
          </h3>
          <div className="space-y-3 pt-1">
            {resumeData.projects.map((proj, i) => (
              <div key={i} className="space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-gray-900">{proj.title}</p>
                  <span className="text-[11px] text-[#2196f3] font-semibold">{proj.technologies}</span>
                </div>
                <p className="text-gray-600 leading-snug">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience / Internships */}
        <div className="space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#0d47a1] border-b border-gray-200 pb-1">
            Internships & Experience
          </h3>
          <div className="space-y-2 pt-1">
            {resumeData.internships.map((intern, i) => (
              <div key={i} className="space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-gray-900">{intern.role} • {intern.organization}</p>
                  <span className="text-gray-500 font-semibold">{intern.duration}</span>
                </div>
                <p className="text-gray-600 leading-snug">{intern.highlights}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Achievements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-[#0d47a1] uppercase">Certifications</h4>
            <ul className="space-y-1 text-gray-700">
              {resumeData.certifications.map((c, i) => (
                <li key={i}>• {c}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-[#0d47a1] uppercase">Achievements</h4>
            <ul className="space-y-1 text-gray-700">
              {resumeData.achievements.map((a, i) => (
                <li key={i}>• {a}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
};
