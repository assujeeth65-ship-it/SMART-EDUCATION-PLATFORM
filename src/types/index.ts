export type UserRole = 'landing' | 'school' | 'college' | 'admin';

export type SchoolNav = 
  | 'dashboard' 
  | 'academy' 
  | 'concept-learning' 
  | 'quiz' 
  | 'quiz-analysis' 
  | 'weakness' 
  | 'retest' 
  | 'upload' 
  | 'ai-assistant';

export type CollegeNav = 
  | 'dashboard' 
  | 'academy' 
  | 'upload' 
  | 'programming' 
  | 'hackathons' 
  | 'mock-interview' 
  | 'resume-builder' 
  | 'ai-assistant';

export type AdminNav = 
  | 'dashboard' 
  | 'curriculum' 
  | 'content' 
  | 'hackathons' 
  | 'requests' 
  | 'analytics' 
  | 'privacy';

export type VoiceGender = 'female' | 'male';

export interface SchoolProfile {
  studentName: string;
  schoolName: string;
  board: 'CBSE' | 'ICSE' | 'Tamil Nadu State Board' | 'Other State Board';
  grade: string;
  academicYear: string;
  medium: string;
  preferredLanguage: string;
}

export interface CollegeProfile {
  studentName: string;
  collegeName: string;
  university: string;
  degree: string;
  department: string;
  year: string;
  semester: string;
  regulation: string;
  preferredLanguage: string;
}

export interface ConceptItem {
  id: string;
  title: string;
  completed: boolean;
  score?: number;
  description: string;
  formulas: string[];
  keyPoints: string[];
  stepByStep: string[];
  easyExample: { problem: string; solution: string };
  applicationExample: { problem: string; solution: string };
  realWorldExample: string;
  commonMistakes: string[];
  quickRevision: string;
  misunderstoodPoints: string[];
  simplifiedExplanation?: string;
}

export interface ChapterItem {
  id: string;
  title: string;
  conceptsCount: number;
  completedConcepts: number;
  quizStatus: 'Not Started' | 'Completed' | 'Needs Practice';
  score: number;
  recommendedTopics: string[];
  concepts: ConceptItem[];
}

export interface SubjectItem {
  id: string;
  name: string;
  iconName: string;
  chaptersCount: number;
  completedPercentage: number;
  chapters: ChapterItem[];
}

export interface QuizQuestion {
  id: number;
  type: 'Basic' | 'Conceptual' | 'Application' | 'Problem-Solving' | 'Higher-Difficulty';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  aiHint?: string;
}

export interface QuizData {
  id: string;
  title: string;
  conceptTitle: string;
  chapterTitle: string;
  subjectTitle: string;
  questions: QuizQuestion[];
}

export interface QuizAnalysisResult {
  overallScore: number;
  conceptUnderstanding: number;
  application: number;
  problemSolving: number;
  strengths: string[];
  areasToImprove: string[];
  aiFeedback: string;
  topic: string;
  repeatedMistakes: string[];
}

export interface WeaknessImprovementPlan {
  detectedDate: string;
  topic: string;
  weakConcepts: string[];
  steps: {
    step: number;
    title: string;
    description: string;
    done: boolean;
  }[];
}

export interface RetestComparison {
  topic: string;
  concept: string;
  beforeScore: number;
  afterScore: number;
  improvement: number;
  dateBefore: string;
  dateAfter: string;
  status: 'Improved' | 'Mastered' | 'Needs Attention';
}

export interface ProgrammingTopic {
  id: string;
  title: string;
  completed: boolean;
  score: number;
  description: string;
  codeSnippet: string;
  exercisePrompt: string;
  expectedOutput: string;
  starterCode: string;
  testCases: { input: string; expected: string }[];
}

export interface HackathonEvent {
  id: string;
  type: 'institution' | 'company';
  name: string;
  organizer: string;
  companyName?: string;
  description: string;
  date: string;
  time: string;
  location: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  registrationFee: string;
  eligibility: string;
  teamSize: string;
  roundsCount: number;
  rounds: { roundNumber: number; title: string; detail: string }[];
  deadline: string;
  problemStatement: string;
  rules: string[];
  verified: boolean;
  registrationOpen: boolean;
}

export interface MockInterviewSession {
  id: string;
  company: string;
  category: 'Technical' | 'Programming' | 'Aptitude' | 'Problem Solving' | 'Behavioral' | 'HR-style practice';
  date: string;
  technicalScore: number;
  problemSolvingScore: number;
  communicationScore: number;
  confidenceScore: number;
  overallScore: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  questions: {
    question: string;
    studentAnswer: string;
    aiFeedback: string;
    rating: number;
  }[];
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  professionalSummary: string;
  education: {
    degree: string;
    institution: string;
    year: string;
    gpa: string;
  }[];
  skills: string[];
  programmingLanguages: string[];
  projects: {
    title: string;
    technologies: string;
    description: string;
    link?: string;
  }[];
  certifications: string[];
  internships: {
    role: string;
    organization: string;
    duration: string;
    highlights: string;
  }[];
  achievements: string[];
  careerInterests: string[];
}

export interface AdminRequestItem {
  id: string;
  organizationName: string;
  organizationType: 'School' | 'College/University' | 'Company' | 'EdTech';
  officialEmail: string;
  contactPerson: string;
  designation: string;
  website: string;
  purpose: string;
  verificationInfo: string;
  dateSubmitted: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface ChatMessage {
  id: string;
  sender: 'student' | 'ai';
  text: string;
  timestamp: string;
  voiceGender?: VoiceGender;
  roleContext?: string;
}
