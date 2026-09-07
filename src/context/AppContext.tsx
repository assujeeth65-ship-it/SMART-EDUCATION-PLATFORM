import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  SchoolNav, 
  CollegeNav, 
  AdminNav, 
  VoiceGender, 
  SchoolProfile, 
  CollegeProfile,
  SubjectItem,
  QuizAnalysisResult,
  WeaknessImprovementPlan,
  RetestComparison,
  ChatMessage,
  HackathonEvent,
  AdminRequestItem
} from '../types';
import { 
  schoolSubjects as initialSubjects, 
  conceptQuizData,
  hackathonEvents as initialHackathons,
  initialAdminRequests
} from '../data/mockData';
import { voiceEngine } from '../utils/voiceAssistant';
import { SupportedLanguage, translations } from '../utils/i18n';

interface AppContextType {
  userId: string | null;
  authReady: boolean;
  login: (loginId: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (data: { role: 'school' | 'college'; fullName: string; emailOrMobile: string; password: string; profile: any }) => Promise<{ ok: boolean; userId?: string; error?: string }>;
  logout: () => Promise<void>;
  role: UserRole;
  setRole: (role: UserRole) => void;
  adminAuthReady: boolean;
  adminAuthenticated: boolean;
  adminLogin: (loginId: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  adminLogout: () => Promise<void>;
  showAdminLogin: boolean;
  setShowAdminLogin: (show: boolean) => void;
  schoolNav: SchoolNav;
  setSchoolNav: (nav: SchoolNav) => void;
  collegeNav: CollegeNav;
  setCollegeNav: (nav: CollegeNav) => void;
  adminNav: AdminNav;
  setAdminNav: (nav: AdminNav) => void;
  
  // Profiles
  schoolProfile: SchoolProfile;
  setSchoolProfile: (profile: SchoolProfile) => void;
  collegeProfile: CollegeProfile;
  setCollegeProfile: (profile: CollegeProfile) => void;
  
  // Localization / i18n
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;

  // Voice Assistant
  voiceGender: VoiceGender;
  setVoiceGender: (gender: VoiceGender) => void;
  isSpeaking: boolean;
  isListening: boolean;
  lastVoiceText: string;
  speakText: (text: string) => void;
  stopSpeech: () => void;
  listenToUser: (onTranscript?: (text: string) => void) => void;
  startRealtimeVoice: () => void;
  stopRealtimeVoice: () => void;
  
  // Context-Aware State
  currentSubject: string;
  setCurrentSubject: (subj: string) => void;
  currentChapter: string;
  setCurrentChapter: (ch: string) => void;
  currentConcept: string;
  setCurrentConcept: (concept: string) => void;
  learningLevel: string;
  recentPerformance: string;
  recommendedNextStep: string;
  adaptiveMode: boolean;
  setAdaptiveMode: (val: boolean | ((prev: boolean) => boolean)) => void;

  // Learning Progress
  subjects: SubjectItem[];
  markConceptCompleted: (subjectId: string, chapterId: string, conceptId: string) => void;
  addSubject: (newSubject: SubjectItem) => void;
  quizAnalysis: QuizAnalysisResult;
  recordQuizResult: (answers: number[]) => void;
  weaknessPlan: WeaknessImprovementPlan;
  toggleWeaknessStep: (stepNumber: number) => void;
  retestData: RetestComparison;
  triggerRetestSubmission: (newScore: number) => void;
  programmingProgress: Record<string, { completed: boolean; score: number }>;
  setProgrammingProgress: (progress: Record<string, { completed: boolean; score: number }>) => void;
  
  // Chat / Personal AI Assistant
  chatMessages: ChatMessage[];
  sendStudentMessage: (msg: string) => void;
  
  // Hackathons & Admin
  hackathons: HackathonEvent[];
  addHackathonEvent: (event: HackathonEvent) => void;
  updateHackathonEvent: (event: HackathonEvent) => void;
  deleteHackathonEvent: (id: string) => void;
  toggleEventPublish: (id: string) => void;
  adminRequests: AdminRequestItem[];
  updateRequestStatus: (id: string, status: 'Approved' | 'Rejected') => void;

  // Global Modals
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  showPrivacyModal: boolean;
  setShowPrivacyModal: (show: boolean) => void;
  showVoiceOrbModal: boolean;
  setShowVoiceOrbModal: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('landing');
  const [adminAuthenticated, setAdminAuthenticated] = useState(() => Boolean(localStorage.getItem('sep_admin_token')));
  const [adminAuthReady, setAdminAuthReady] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [userId, setUserId] = useState<string | null>(() => localStorage.getItem('sep_auth_token') ? localStorage.getItem('sep_user_id') : null);
  const [authReady, setAuthReady] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [schoolNav, setSchoolNav] = useState<SchoolNav>('dashboard');
  const [collegeNav, setCollegeNav] = useState<CollegeNav>('dashboard');
  const [adminNav, setAdminNav] = useState<AdminNav>('dashboard');

  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile>({
    studentName: '',
    schoolName: '',
    board: 'CBSE',
    grade: 'Class 10',
    academicYear: '2026–2027',
    medium: 'English',
    preferredLanguage: 'English'
  });

  const [collegeProfile, setCollegeProfile] = useState<CollegeProfile>({
    studentName: '',
    collegeName: '',
    university: 'Anna University',
    degree: 'B.Tech',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    semester: 'Semester 5',
    regulation: 'Regulation 2021',
    preferredLanguage: 'English'
  });

  const resetLearningState = () => {
    setSubjects(createFreshSubjects());
    setQuizAnalysis(freshQuizAnalysis);
    setWeaknessPlan({ detectedDate: '', topic: '', weakConcepts: [], steps: [] });
    setRetestData({ topic: '', concept: '', beforeScore: 0, afterScore: 0, improvement: 0, dateBefore: '', dateAfter: '', status: 'Needs Attention' });
    setChatMessages([{ id: 'msg-1', sender: 'ai', text: 'Hello! I am your Personal AI Learning Companion. I am ready to help you learn, practice, and understand your current topic. What would you like to learn today?', timestamp: '10:00 AM', voiceGender: 'female', roleContext: 'Mathematics > Quadratic Equations' }]);
  };

  const hydrateUser = (payload: any) => {
    const state = payload?.state || {};
    if (payload?.user?.role) setRole(payload.user.role as UserRole);
    if (payload?.user?.userId) setUserId(payload.user.userId);
    if (payload?.user?.profile) {
      if (payload.user.role === 'school') setSchoolProfile((prev) => ({ ...prev, ...payload.user.profile }));
      if (payload.user.role === 'college') setCollegeProfile((prev) => ({ ...prev, ...payload.user.profile }));
    }
    if (state.subjects) setSubjects(state.subjects);
    else setSubjects(createFreshSubjects());
    if (state.quizAnalysis) setQuizAnalysis(state.quizAnalysis);
    if (state.weaknessPlan) setWeaknessPlan(state.weaknessPlan);
    if (state.retestData) setRetestData(state.retestData);
    if (state.programmingProgress) setProgrammingProgress(state.programmingProgress);
    if (state.chatMessages) setChatMessages(state.chatMessages);
    if (state.language) setLanguage(state.language);
    if (state.currentSubject) setCurrentSubject(state.currentSubject);
    if (state.currentChapter) setCurrentChapter(state.currentChapter);
    if (state.currentConcept) setCurrentConcept(state.currentConcept);
    if (typeof state.adaptiveMode === 'boolean') setAdaptiveMode(state.adaptiveMode);
    if (state.hackathons) setHackathons(state.hackathons);
    setHydrated(true);
  };

  const login = async (loginId: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ login: loginId, password }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) return { ok: false, error: data?.error || 'Login failed.' };
      localStorage.setItem('sep_auth_token', data.token);
      localStorage.setItem('sep_user_id', data.user?.userId || '');
      hydrateUser(data);
      return { ok: true };
    } catch { return { ok: false, error: 'Cannot reach the server. Start the backend with npm run server.' }; }
  };

  const register = async (data: { role: 'school' | 'college'; fullName: string; emailOrMobile: string; password: string; profile: any }) => {
    try {
      const response = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) return { ok: false, error: result?.error || 'Registration failed.' };
      return { ok: true, userId: result.user?.userId };
    } catch { return { ok: false, error: 'Cannot reach the server. Start the backend with npm run server.' }; }
  };

  const logout = async () => {
    const token = localStorage.getItem('sep_auth_token');
    try { if (token) await fetch('/api/auth/logout', { method: 'POST', headers: { Authorization: `Bearer ${token}` } }); } catch {}
    localStorage.removeItem('sep_auth_token');
    localStorage.removeItem('sep_user_id');
    setUserId(null); setRole('landing'); setHydrated(false); resetLearningState();
  };

  // Voice engine state
  const [voiceGender, setVoiceGender] = useState<VoiceGender>('female');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [lastVoiceText, setLastVoiceText] = useState<string>('');

  // Context-aware variables
  const [currentSubject, setCurrentSubject] = useState<string>('Mathematics');
  const [currentChapter, setCurrentChapter] = useState<string>('Quadratic Equations');
  const [currentConcept, setCurrentConcept] = useState<string>('Introduction to Quadratics');
  const [learningLevel] = useState<string>('Beginner');
  const [recentPerformance] = useState<string>('0%');
  const [recommendedNextStep] = useState<string>('Start with the first basic lesson');
  const [adaptiveMode, setAdaptiveMode] = useState<boolean>(false);

  const createFreshSubjects = (): SubjectItem[] =>
    JSON.parse(JSON.stringify(initialSubjects)).map((subject: SubjectItem) => ({
      ...subject,
      completedPercentage: 0,
      chapters: subject.chapters.map((chapter) => ({
        ...chapter,
        completedConcepts: 0,
        quizStatus: 'Not Started' as const,
        score: 0,
        concepts: chapter.concepts.map((concept) => ({
          ...concept,
          completed: false,
          score: 0
        }))
      }))
    }));

  const [subjects, setSubjects] = useState<SubjectItem[]>(createFreshSubjects());

  const freshQuizAnalysis: QuizAnalysisResult = {
    overallScore: 0,
    conceptUnderstanding: 0,
    application: 0,
    problemSolving: 0,
    strengths: [],
    areasToImprove: [],
    aiFeedback: 'Complete your first lesson and quiz to generate your personalized analysis.',
    topic: 'Not assessed yet',
    repeatedMistakes: []
  };
  const [quizAnalysis, setQuizAnalysis] = useState<QuizAnalysisResult>(freshQuizAnalysis);

  const [weaknessPlan, setWeaknessPlan] = useState<WeaknessImprovementPlan>({
    detectedDate: '',
    topic: '',
    weakConcepts: [],
    steps: []
  });

  const [programmingProgress, setProgrammingProgress] = useState<Record<string, { completed: boolean; score: number }>>({});

  const [retestData, setRetestData] = useState<RetestComparison>({
    topic: '',
    concept: '',
    beforeScore: 0,
    afterScore: 0,
    improvement: 0,
    dateBefore: '',
    dateAfter: '',
    status: 'Needs Attention'
  });

  const [hackathons, setHackathons] = useState<HackathonEvent[]>(() => {
    try {
      const saved = localStorage.getItem('sep_hackathons');
      return saved ? JSON.parse(saved) : initialHackathons;
    } catch {
      return initialHackathons;
    }
  });
  const [adminRequests, setAdminRequests] = useState<AdminRequestItem[]>(initialAdminRequests);

  // Global Modals
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);
  const [showVoiceOrbModal, setShowVoiceOrbModal] = useState<boolean>(false);

  // Chat conversation
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: "Hello! I am your Personal AI Learning Companion. I am ready to help you learn, practice, and understand your current topic. What would you like to learn today?",
      timestamp: '10:00 AM',
      voiceGender: 'female',
      roleContext: 'Mathematics > Quadratic Equations'
    }
  ]);

  // Localization
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  const t = (key: string): string => {
    const dict = translations[language]?.translations || translations['en'].translations;
    return dict[key] || translations['en'].translations[key] || key;
  };

  // Voice was intentionally disabled for this build. The platform is chat-only.
  const speakText = (_text: string) => {
    setIsSpeaking(false);
    setIsListening(false);
  };

  const stopSpeech = () => {
    voiceEngine.stop();
    setIsSpeaking(false);
  };

  const listenToUser = (onTranscript?: (text: string) => void) => {
    const speechLang = translations[language]?.speechLang || 'en-IN';
    voiceEngine.listen(
      (transcript) => {
        setIsListening(false);
        (onTranscript || sendStudentMessage)(transcript);
      },
      speechLang,
      () => setIsListening(true),
      () => setIsListening(false),
      (err) => { console.warn('Voice error:', err); setIsListening(false); setLastVoiceText(err); }
    );
  };

  const sendStudentMessage = async (msg: string) => {
    const question = msg.trim();
    if (!question) return;
    const studentMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'student',
      text: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      roleContext: `${currentSubject} > ${currentChapter}`
    };
    const history = chatMessages.slice(-12);
    setChatMessages((prev) => [...prev, studentMsg]);
    setLastVoiceText(question);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: question,
          history,
          context: { subject: currentSubject, chapter: currentChapter, concept: currentConcept, level: learningLevel }
        })
      });
      let data: any = null;
      try { data = await response.json(); } catch { /* handled below */ }
      if (!response.ok) throw new Error(data?.error || `AI server returned HTTP ${response.status}`);
      const reply = String(data?.answer || '').trim();
      if (!reply) throw new Error('AI returned an empty response.');

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        voiceGender,
        roleContext: `${currentSubject} > ${currentChapter}`
      };
      setChatMessages((prev) => [...prev, aiMsg]);
    } catch (error: any) {
      console.error('AI request failed:', error);
      const errorMessage = `I could not answer that right now. ${error?.message || 'Please make sure the AI server is running.'}`;
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: errorMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        voiceGender,
        roleContext: `${currentSubject} > ${currentChapter}`
      };
      setChatMessages((prev) => [...prev, aiMsg]);
    }
  };

  const startRealtimeVoice = () => {
    if (isListening) return;
    stopSpeech();
    const speechLang = translations[language]?.speechLang || 'en-IN';
    voiceEngine.startRealtime(
      async (transcript) => {
        setIsListening(false);
        voiceEngine.stopListening();
        await sendStudentMessage(transcript);
        // speakText owns the speaking state; restart listening after speech finishes.
      },
      speechLang,
      () => setIsListening(true),
      (err) => { setIsListening(false); setLastVoiceText(err); console.warn(err); }
    );
  };

  const stopRealtimeVoice = () => {
    voiceEngine.stopRealtime();
    setIsListening(false);
    stopSpeech();
  };

  const markConceptCompleted = (subjectId: string, chapterId: string, conceptId: string) => {
    setSubjects((prev) =>
      prev.map((subj) => {
        if (subj.id !== subjectId) return subj;

        const updatedChapters = subj.chapters.map((ch) => {
          if (ch.id !== chapterId) return ch;
          const updatedConcepts = ch.concepts.map((c) =>
            c.id === conceptId ? { ...c, completed: true } : c
          );
          const compCount = updatedConcepts.filter((c) => c.completed).length;
          return {
            ...ch,
            concepts: updatedConcepts,
            completedConcepts: compCount,
            completedPercentage: ch.conceptsCount > 0 ? Math.round((compCount / ch.conceptsCount) * 100) : 0,
          };
        });

        const totalConcepts = updatedChapters.reduce((sum, ch) => sum + ch.conceptsCount, 0);
        const completedConcepts = updatedChapters.reduce((sum, ch) => sum + ch.completedConcepts, 0);
        return {
          ...subj,
          chapters: updatedChapters,
          completedPercentage: totalConcepts > 0 ? Math.round((completedConcepts / totalConcepts) * 100) : 0
        };
      })
    );
  };

  const recordQuizResult = (answers: number[]) => {
    const questions = conceptQuizData.questions;
    if (answers.length !== questions.length) return;

    const correct = answers.reduce((count, answer, index) =>
      count + (answer === questions[index].correctIndex ? 1 : 0), 0
    );
    const score = Math.round((correct / questions.length) * 100);

    const categoryScore = (types: string[]) => {
      const indices = questions
        .map((q, i) => types.includes(q.type) ? i : -1)
        .filter(i => i >= 0);
      if (!indices.length) return 0;
      const categoryCorrect = indices.filter(i => answers[i] === questions[i].correctIndex).length;
      return Math.round((categoryCorrect / indices.length) * 100);
    };

    const conceptUnderstanding = categoryScore(['Basic', 'Conceptual']);
    const application = categoryScore(['Application']);
    const problemSolving = categoryScore(['Problem-Solving', 'Higher-Difficulty']);
    const incorrect = questions.filter((q, i) => answers[i] !== q.correctIndex);

    const strengths = [
      conceptUnderstanding >= 70 ? 'Strong basic and conceptual understanding.' : '',
      application >= 70 ? 'Good performance on application questions.' : '',
      problemSolving >= 70 ? 'Good multi-step problem-solving performance.' : ''
    ].filter(Boolean);

    const areasToImprove = [
      conceptUnderstanding < 70 ? 'Basic and conceptual understanding needs more practice.' : '',
      application < 70 ? 'Application-based questions need more practice.' : '',
      problemSolving < 70 ? 'Multi-step problem solving needs targeted practice.' : ''
    ].filter(Boolean);

    setQuizAnalysis({
      overallScore: score,
      conceptUnderstanding,
      application,
      problemSolving,
      strengths,
      areasToImprove,
      aiFeedback: score >= 80
        ? 'Strong performance. Continue with targeted practice to reach full mastery.'
        : 'Review the identified weak areas, then take the remedial re-test to measure improvement.',
      topic: conceptQuizData.chapterTitle,
      repeatedMistakes: incorrect.map(q => `${q.type}: ${q.question}`)
    });

    const today = new Date().toLocaleDateString();
    const weakConcepts = [...new Set(incorrect.map(q => q.type))];
    setWeaknessPlan({
      detectedDate: today,
      topic: conceptQuizData.chapterTitle,
      weakConcepts,
      steps: weakConcepts.length
        ? weakConcepts.map((type, i) => ({
            step: i + 1,
            title: `Practice ${type} questions`,
            description: `Review the ${type.toLowerCase()} questions you missed and retry similar problems.`,
            done: false
          }))
        : [{
            step: 1,
            title: 'Maintain mastery',
            description: 'Attempt a mixed practice set to keep your understanding strong.',
            done: false
          }]
    });

    setRetestData({
      topic: conceptQuizData.chapterTitle,
      concept: conceptQuizData.conceptTitle,
      beforeScore: score,
      afterScore: 0,
      improvement: 0,
      dateBefore: today,
      dateAfter: '',
      status: 'Needs Attention'
    });
  };

  const toggleWeaknessStep = (stepNumber: number) => {
    setWeaknessPlan((prev) => ({
      ...prev,
      steps: prev.steps.map((s) => (s.step === stepNumber ? { ...s, done: !s.done } : s))
    }));
  };

  const triggerRetestSubmission = (newScore: number) => {
    setRetestData((prev) => ({
      ...prev,
      afterScore: newScore,
      improvement: newScore - prev.beforeScore,
      dateAfter: 'Today',
      status: newScore >= 75 ? 'Improved' : 'Needs Attention'
    }));
  };

  const addSubject = (newSubject: SubjectItem) => {
    setSubjects((prev) => [newSubject, ...prev]);
  };

  const adminRequest = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('sep_admin_token');
    if (!token) throw new Error('Admin session is missing.');
    const response = await fetch(url, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}), Authorization: `Bearer ${token}` }
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data?.error || 'Admin request failed.');
    return data;
  };

  const addHackathonEvent = (event: HackathonEvent) => {
    setHackathons((prev) => [event, ...prev.filter((ev) => ev.id !== event.id)]);
    void adminRequest('/api/admin/hackathons', { method: 'POST', body: JSON.stringify(event) }).catch((error) => console.warn('Hackathon save failed:', error));
  };

  const updateHackathonEvent = (event: HackathonEvent) => {
    setHackathons((prev) => prev.map((ev) => ev.id === event.id ? event : ev));
    void adminRequest(`/api/admin/hackathons/${encodeURIComponent(event.id)}`, { method: 'PUT', body: JSON.stringify(event) }).catch((error) => console.warn('Hackathon update failed:', error));
  };

  const deleteHackathonEvent = (id: string) => {
    setHackathons((prev) => prev.filter((ev) => ev.id !== id));
    void adminRequest(`/api/admin/hackathons/${encodeURIComponent(id)}`, { method: 'DELETE' }).catch((error) => console.warn('Hackathon delete failed:', error));
  };

  const toggleEventPublish = (id: string) => {
    const current = hackathons.find((ev) => ev.id === id);
    if (!current) return;
    const updated = { ...current, registrationOpen: !current.registrationOpen };
    setHackathons((prev) => prev.map((ev) => ev.id === id ? updated : ev));
    void adminRequest(`/api/admin/hackathons/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(updated) }).catch((error) => console.warn('Hackathon circulation update failed:', error));
  };

  const adminLogin = async (loginId: string, password: string) => {
    try {
      const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ login: loginId, password }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) return { ok: false, error: data?.error || 'Invalid admin credentials.' };
      localStorage.setItem('sep_admin_token', data.token);
      setAdminAuthenticated(true);
      setShowAdminLogin(false);
      setRole('admin');
      const adminEvents = await fetch('/api/admin/hackathons', { headers: { Authorization: `Bearer ${data.token}` } });
      const adminData = await adminEvents.json().catch(() => ({}));
      if (adminEvents.ok && Array.isArray(adminData?.hackathons)) setHackathons(adminData.hackathons);
      return { ok: true };
    } catch (error: any) {
      return { ok: false, error: error?.message || 'Could not reach the admin server.' };
    }
  };

  const adminLogout = async () => {
    const token = localStorage.getItem('sep_admin_token');
    if (token) await fetch('/api/admin/logout', { method: 'POST', headers: { Authorization: `Bearer ${token}` } }).catch(() => undefined);
    localStorage.removeItem('sep_admin_token');
    setAdminAuthenticated(false);
    setRole('landing');
  };

  const updateRequestStatus = (id: string, status: 'Approved' | 'Rejected') => {
    setAdminRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status } : req))
    );
  };

  useEffect(() => {
    const token = localStorage.getItem('sep_auth_token');
    if (!token) setAuthReady(true);
    else fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data?.error || 'Session expired');
        hydrateUser(data);
      })
      .catch(() => {
        localStorage.removeItem('sep_auth_token');
        localStorage.removeItem('sep_user_id');
        setUserId(null); setRole('landing'); setHydrated(false);
      })
      .finally(() => setAuthReady(true));

    const adminToken = localStorage.getItem('sep_admin_token');
    if (!adminToken) {
      setAdminAuthReady(true);
      return;
    }
    fetch('/api/admin/me', { headers: { Authorization: `Bearer ${adminToken}` } })
      .then(async (response) => {
        if (!response.ok) throw new Error('Admin session expired');
        setAdminAuthenticated(true);
        setRole('admin');
        const data = await fetch('/api/admin/hackathons', { headers: { Authorization: `Bearer ${adminToken}` } }).then(r => r.json());
        if (Array.isArray(data?.hackathons)) setHackathons(data.hackathons);
      })
      .catch(() => {
        localStorage.removeItem('sep_admin_token');
        setAdminAuthenticated(false);
      })
      .finally(() => setAdminAuthReady(true));
  }, []);

  // Student-facing circulation feed: only published hackathons are returned by the server.
  useEffect(() => {
    if (role === 'admin' || !authReady || !adminAuthReady) return;
    fetch('/api/hackathons')
      .then(async (response) => {
        if (!response.ok) throw new Error('Could not load hackathons');
        const data = await response.json();
        if (Array.isArray(data?.hackathons)) setHackathons(data.hackathons);
      })
      .catch(() => { /* bundled seed remains available if the API is offline */ });
  }, [role, authReady, adminAuthReady]);

  // Server-backed persistence: every logged-in user's learning state is saved under that user's account.
  useEffect(() => {
    if (!hydrated || !userId) return;
    const timer = window.setTimeout(() => {
      const token = localStorage.getItem('sep_auth_token');
      if (!token) return;
      fetch('/api/user/state', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          profile: role === 'school' ? schoolProfile : role === 'college' ? collegeProfile : {},
          state: { subjects, quizAnalysis, weaknessPlan, retestData, programmingProgress, chatMessages, language, currentSubject, currentChapter, currentConcept, adaptiveMode, hackathons }
        })
      }).catch((error) => console.warn('Progress sync failed:', error));
    }, 600);
    return () => window.clearTimeout(timer);
  }, [hydrated, userId, role, schoolProfile, collegeProfile, subjects, quizAnalysis, weaknessPlan, retestData, programmingProgress, chatMessages, language, currentSubject, currentChapter, currentConcept, adaptiveMode, hackathons]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      voiceEngine.stop();
      voiceEngine.stopListening();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        userId,
        authReady,
        login,
        register,
        logout,
        role,
        setRole,
        adminAuthReady,
        adminAuthenticated,
        adminLogin,
        adminLogout,
        showAdminLogin,
        setShowAdminLogin,
        schoolNav,
        setSchoolNav,
        collegeNav,
        setCollegeNav,
        adminNav,
        setAdminNav,
        schoolProfile,
        setSchoolProfile,
        collegeProfile,
        setCollegeProfile,
        language,
        setLanguage,
        t,
        voiceGender,
        setVoiceGender,
        isSpeaking,
        isListening,
        lastVoiceText,
        speakText,
        stopSpeech,
        listenToUser,
        startRealtimeVoice,
        stopRealtimeVoice,
        currentSubject,
        setCurrentSubject,
        currentChapter,
        setCurrentChapter,
        currentConcept,
        setCurrentConcept,
        learningLevel,
        recentPerformance,
        recommendedNextStep,
        adaptiveMode,
        setAdaptiveMode,
        subjects,
        markConceptCompleted,
        addSubject,
        quizAnalysis,
        recordQuizResult,
        weaknessPlan,
        toggleWeaknessStep,
        retestData,
        triggerRetestSubmission,
        programmingProgress,
        setProgrammingProgress,
        chatMessages,
        sendStudentMessage,
        hackathons,
        addHackathonEvent,
        updateHackathonEvent,
        deleteHackathonEvent,
        toggleEventPublish,
        adminRequests,
        updateRequestStatus,
        showAuthModal,
        setShowAuthModal,
        showPrivacyModal,
        setShowPrivacyModal,
        showVoiceOrbModal,
        setShowVoiceOrbModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
