import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  BarChart3, 
  ArrowRight, 
  Layers, 
  FileCheck, 
  Zap, 
  Play, 
  Trophy 
} from 'lucide-react';
import { collegeCurriculum } from '../data/mockData';
import { SubjectAssessmentModal } from '../components/SubjectAssessmentModal';
import { NetworkProtocolVisualizer } from '../components/NetworkProtocolVisualizer';

export const AcademyView: React.FC = () => {
  const { 
    role, 
    schoolProfile, 
    collegeProfile, 
    subjects, 
    setSchoolNav, 
    setCollegeNav,
    setCurrentSubject, 
    setCurrentChapter, 
    setCurrentConcept,
    speakText 
  } = useApp();

  const isSchool = role === 'school';
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(isSchool ? 'math' : 'cn');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('math-ch4');
  const [showAssessmentModal, setShowAssessmentModal] = useState<boolean>(false);

  const activeSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];
  const activeChapter = activeSubject?.chapters.find(c => c.id === selectedChapterId) || activeSubject?.chapters[0];

  const handleOpenConcept = (conceptTitle: string) => {
    setCurrentSubject(activeSubject.name);
    setCurrentChapter(activeChapter.title);
    setCurrentConcept(conceptTitle);

    if (isSchool) {
      setSchoolNav('concept-learning');
      speakText(`Opening AI Concept Learning for ${conceptTitle}.`);
    }
  };

  const handleStartQuiz = () => {
    if (isSchool) {
      setSchoolNav('quiz');
      speakText(`Starting Concept Quiz for ${activeChapter.title}. Questions adapt based on your performance.`);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-[#90caf9]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#2196f3] uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Structured Learning Hierarchy</span>
          </div>
          <h2 className="text-2xl font-black text-[#0d47a1] mt-1">
            {isSchool ? `${schoolProfile.board} • ${schoolProfile.grade} Academy` : `${collegeProfile.university} • ${collegeProfile.degree} Curriculum`}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {isSchool 
              ? 'Board ➔ Class ➔ Subject ➔ Chapter ➔ Concept' 
              : 'University ➔ Regulation ➔ Degree ➔ Semester ➔ Subject ➔ Unit ➔ Topic ➔ Concept'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {isSchool && (
            <button
              onClick={() => {
                setShowAssessmentModal(true);
                speakText("Opening the Mathematics Subject Overall Assessment.");
              }}
              className="px-4 py-2 rounded-2xl bg-[#0d47a1] hover:bg-[#2196f3] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Subject Overall Assessment</span>
            </button>
          )}
          <div className="px-4 py-2 rounded-2xl bg-[#e3f2fd] border border-[#90caf9] text-xs text-[#0d47a1] font-bold">
            Medium: {isSchool ? schoolProfile.medium : collegeProfile.preferredLanguage}
          </div>
        </div>
      </div>

      {/* SCHOOL ACADEMY EXPERIENCE */}
      {isSchool ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Subjects Tab */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-bold text-[#0d47a1] uppercase tracking-wider px-1">
              Enrolled Subjects
            </h3>

            <div className="space-y-3">
              {subjects.map((sub) => {
                const isSelected = sub.id === selectedSubjectId;
                return (
                  <div
                    key={sub.id}
                    onClick={() => {
                      setSelectedSubjectId(sub.id);
                      if (sub.chapters.length > 0) {
                        setSelectedChapterId(sub.chapters[0].id);
                      }
                    }}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                      isSelected 
                        ? 'bg-white border-2 border-[#2196f3] shadow-md' 
                        : 'glass-card border-[#90caf9]/70 hover:border-[#2196f3]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                          isSelected ? 'bg-[#2196f3] text-white' : 'bg-[#e3f2fd] text-[#0d47a1]'
                        }`}>
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#0d47a1]">{sub.name}</h4>
                          <p className="text-[11px] text-gray-500">{sub.chaptersCount} Chapters</p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-[#2196f3]">{sub.completedPercentage}%</span>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-[#e3f2fd] mt-3 overflow-hidden">
                      <div 
                        className="h-full bg-[#2196f3] rounded-full transition-all"
                        style={{ width: `${sub.completedPercentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Chapters & Concept Units */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Subject Overview Card */}
            <div className="glass-card rounded-3xl p-6 border border-[#90caf9] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#e3f2fd]">
                <div>
                  <span className="text-[10px] font-bold text-[#2196f3] uppercase">Selected Subject</span>
                  <h3 className="text-xl font-black text-[#0d47a1]">{activeSubject.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-[#e3f2fd] border border-[#90caf9] text-xs font-bold text-[#0d47a1]">
                    Overall Mastery: {activeSubject.completedPercentage}%
                  </span>
                </div>
              </div>

              {/* Chapters List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#0d47a1] uppercase tracking-wider">
                  Chapters in {activeSubject.name}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeSubject.chapters.map((ch) => {
                    const isChSelected = ch.id === selectedChapterId;
                    return (
                      <div
                        key={ch.id}
                        onClick={() => setSelectedChapterId(ch.id)}
                        className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                          isChSelected 
                            ? 'bg-gradient-to-br from-white to-[#e3f2fd] border-2 border-[#0d47a1] shadow-md' 
                            : 'bg-white/80 border-[#90caf9]/60 hover:border-[#2196f3]'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <h5 className="text-xs font-bold text-[#0d47a1]">{ch.title}</h5>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            ch.quizStatus === 'Completed' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {ch.quizStatus}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-[11px] text-gray-600">
                          <span>{ch.completedConcepts} / {ch.conceptsCount} Concepts</span>
                          <span className="font-bold text-[#2196f3]">Score: {ch.score}%</span>
                        </div>

                        <div className="w-full h-1.5 rounded-full bg-[#e3f2fd] mt-2 overflow-hidden">
                          <div 
                            className="h-full bg-[#0d47a1]"
                            style={{ width: `${(ch.completedConcepts / ch.conceptsCount) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Concepts breakdown for selected chapter */}
              {activeChapter && activeChapter.concepts && activeChapter.concepts.length > 0 && (
                <div className="pt-4 border-t border-[#e3f2fd] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#0d47a1] uppercase tracking-wider">
                        Concepts in {activeChapter.title}
                      </h4>
                      <p className="text-[11px] text-gray-500">
                        Click any concept to open the AI Concept Learning step-by-step transformer.
                      </p>
                    </div>
                    <button
                      onClick={handleStartQuiz}
                      className="px-4 py-1.5 rounded-xl bg-[#2196f3] hover:bg-[#0d47a1] text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Take Concept Quiz</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {activeChapter.concepts.map((concept) => (
                      <div
                        key={concept.id}
                        className="p-3.5 rounded-2xl bg-white border border-[#90caf9] hover:border-[#2196f3] transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            concept.completed ? 'bg-emerald-500 text-white' : 'bg-[#e3f2fd] text-[#0d47a1]'
                          }`}>
                            {concept.completed ? <CheckCircle2 className="w-4 h-4" /> : '•'}
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-[#0d47a1] group-hover:text-[#2196f3] transition-colors">
                              {concept.title}
                            </h5>
                            <p className="text-[11px] text-gray-500 line-clamp-1">{concept.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {concept.score ? (
                            <span className="text-[11px] font-bold text-gray-600 mr-2">
                              {concept.score}%
                            </span>
                          ) : null}
                          <button
                            onClick={() => handleOpenConcept(concept.title)}
                            className="px-3 py-1 rounded-xl bg-[#e3f2fd] text-[#0d47a1] text-xs font-bold hover:bg-[#2196f3] hover:text-white transition-colors flex items-center gap-1"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Learn with AI</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>
      ) : (
        /* COLLEGE ACADEMIC EXPERIENCE */
        <div className="space-y-6">
          {/* Engineering Lab Simulator for CS8591 Unit 2 */}
          <NetworkProtocolVisualizer />

          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-xs font-bold text-[#0d47a1] uppercase tracking-wider">
                Enrolled Engineering Courses (Regulation 2021)
              </h3>
              <span className="text-[11px] text-gray-500 font-semibold">Semester 5</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collegeCurriculum.map((subj) => (
              <div key={subj.id} className="glass-card rounded-3xl p-6 border border-[#90caf9] space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#2196f3] uppercase">{subj.code} • {subj.semester}</span>
                    <h3 className="text-base font-black text-[#0d47a1] mt-0.5">{subj.title}</h3>
                  </div>
                  <span className="text-xs font-black text-[#2196f3] bg-[#e3f2fd] px-2.5 py-1 rounded-xl border border-[#90caf9]">
                    {subj.progress}%
                  </span>
                </div>

                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-gray-600 uppercase tracking-wider">Units & Syllabi</h5>
                  <div className="space-y-1.5">
                    {subj.units.map((unit) => (
                      <div key={unit.id} className="p-2.5 rounded-xl bg-white border border-[#90caf9]/60 text-xs">
                        <p className="font-bold text-[#0d47a1]">{unit.title}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{unit.topics.join(' • ')}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCurrentSubject(subj.title);
                    setCollegeNav('upload');
                    speakText(`You can upload additional university notes or question banks for ${subj.title}. The AI will structure it automatically.`);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#e3f2fd] hover:bg-[#0d47a1] hover:text-white text-[#0d47a1] text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Upload & Learn Additional Notes</span>
                </button>
              </div>
            ))}
            </div>
          </div>
        </div>
      )}

      {/* Subject Overall Assessment Modal */}
      <SubjectAssessmentModal
        isOpen={showAssessmentModal}
        onClose={() => setShowAssessmentModal(false)}
      />

    </div>
  );
};
