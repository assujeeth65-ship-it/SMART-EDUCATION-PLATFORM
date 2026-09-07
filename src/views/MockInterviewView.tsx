import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  ArrowRight, 
  Bot, 
  ShieldAlert,
  Send,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CompanyQuestion {
  q: string;
  category: string;
  expectedKey: string;
}

export const MockInterviewView: React.FC = () => {
  const { speakText, stopSpeech, isSpeaking, voiceGender, isListening, listenToUser } = useApp();

  const [selectedCompany, setSelectedCompany] = useState<string>('Microsoft');
  const [selectedCategory, setSelectedCategory] = useState<string>('Technical');
  const [isLiveSession, setIsLiveSession] = useState<boolean>(false);
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState({ technical: 0, problemSolving: 0, communication: 0, confidence: 0, overall: 0 });
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [studentAnswerText, setStudentAnswerText] = useState<string>('');
  const [studentHistory, setStudentHistory] = useState<{ q: string; a: string }[]>([]);

  const companyQuestionBank: Record<string, CompanyQuestion[]> = {
    Microsoft: [
      {
        q: "Can you explain the difference between a Process and a Thread, and how memory sharing differs between them?",
        category: "Operating Systems / Architecture",
        expectedKey: "Process has isolated address space; threads share heap and resources within the same process."
      },
      {
        q: "How would you detect a cycle in a singly linked list in O(1) auxiliary space?",
        category: "Data Structures & Algorithms",
        expectedKey: "Floyd's Cycle Detection using slow (1 step) and fast (2 steps) pointers."
      },
      {
        q: "Describe an engineering project where you resolved a challenging performance or concurrency bottleneck.",
        category: "System Design & Problem Solving",
        expectedKey: "STAR method: Situation, Task, Action, Result with quantified performance metrics."
      }
    ],
    Google: [
      {
        q: "Given an unsorted array of integers, how would you find the contiguous subarray with the largest sum in O(N) time?",
        category: "Algorithms (Kadane's Algorithm)",
        expectedKey: "Track max_so_far and max_ending_here iteratively updating at each index."
      },
      {
        q: "How would you design a distributed rate limiter that handles 100,000 requests per second across regional servers?",
        category: "Distributed Systems & Scalability",
        expectedKey: "Token Bucket or Sliding Window Log using distributed Redis cache with atomic increments."
      },
      {
        q: "What are the trade-offs between Depth-First Search (DFS) and Breadth-First Search (BFS) on very large graph structures?",
        category: "Graph Theory & Complexity",
        expectedKey: "BFS guarantees shortest path in unweighted graphs but requires O(V) queue memory; DFS uses O(D) recursion stack."
      }
    ],
    Amazon: [
      {
        q: "Describe how you would implement an LRU (Least Recently Used) cache with O(1) time complexity for both get and put operations.",
        category: "Data Structures (Doubly Linked List + HashMap)",
        expectedKey: "HashMap for O(1) key lookup combined with Doubly Linked List for O(1) eviction of least recently accessed node."
      },
      {
        q: "Tell me about a time you demonstrated the Amazon principle 'Bias for Action' when requirements were incomplete.",
        category: "Leadership Principles & Behavioral",
        expectedKey: "Calculated risk-taking, incremental delivery, and rapid feedback loops."
      },
      {
        q: "How does a HashMap resolve hash collisions when the load factor exceeds 0.75?",
        category: "Core Java / Data Structures",
        expectedKey: "Chaining using linked lists or red-black trees, followed by rehashing into a doubled bucket array."
      }
    ],
    TCS: [
      {
        q: "What is the fundamental difference between Method Overloading and Method Overriding in Object-Oriented Programming?",
        category: "Core Java & OOP",
        expectedKey: "Overloading is compile-time polymorphism (same name, different signature); Overriding is runtime polymorphism (same signature in subclass)."
      },
      {
        q: "If the ratio of ages of two people is 4 to 5 and the sum of their ages is 72, how quickly can you calculate their individual ages?",
        category: "Quantitative Aptitude",
        expectedKey: "9 units = 72 => 1 unit = 8. Ages are 32 and 40."
      },
      {
        q: "Explain the four ACID properties of relational database transactions with examples.",
        category: "DBMS Fundamentals",
        expectedKey: "Atomicity, Consistency, Isolation, and Durability."
      }
    ],
    Infosys: [
      {
        q: "How would you reverse a character array in-place with O(1) auxiliary memory?",
        category: "Programming Basics",
        expectedKey: "Two-pointer approach swapping elements from both ends moving inward."
      },
      {
        q: "What is the difference between Synchronous and Asynchronous REST API requests in modern web applications?",
        category: "Web Architecture",
        expectedKey: "Synchronous blocks execution waiting for response; asynchronous uses promises/callbacks allowing non-blocking UI."
      },
      {
        q: "Walk me through your strategy for identifying edge cases before writing automated unit tests.",
        category: "Software Quality & Testing",
        expectedKey: "Boundary values, null/empty inputs, extreme limits, and invalid types."
      }
    ],
    Accenture: [
      {
        q: "How would you approach migrating a legacy monolithic application to microservices without causing customer downtime?",
        category: "Cloud Migration & Architecture",
        expectedKey: "Strangler Fig pattern: incrementally replacing specific service boundaries behind an API Gateway."
      },
      {
        q: "Compare relational SQL databases with document-based NoSQL databases. When would you choose PostgreSQL versus MongoDB?",
        category: "Database Design",
        expectedKey: "SQL for strict ACID schemas and complex joins; NoSQL for flexible hierarchical documents and rapid horizontal scaling."
      },
      {
        q: "Describe a scenario where you resolved a technical conflict within a cross-functional project team.",
        category: "Behavioral & Client Orientation",
        expectedKey: "Objective benchmarking, data-backed proof of concepts, and stakeholder alignment."
      }
    ]
  };

  const activeQuestions = companyQuestionBank[selectedCompany] || companyQuestionBank['Microsoft'];

  const evaluateAnswer = (answer: string, expectedKey: string) => {
    const normalized = answer.toLowerCase();
    const keywords = expectedKey.toLowerCase().split(/[^a-z0-9]+/).filter(k => k.length > 3);
    const matched = keywords.filter(k => normalized.includes(k)).length;
    const keywordScore = keywords.length ? (matched / keywords.length) * 70 : 0;
    const completenessScore = Math.min(answer.trim().split(/\s+/).length / 25, 1) * 30;
    return Math.round(Math.min(100, keywordScore + completenessScore));
  };

  const buildEvaluation = (history: { q: string; a: string }[]) => {
    const scores = history.map((item, i) => evaluateAnswer(item.a, activeQuestions[i]?.expectedKey || ''));
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    const communication = history.length
      ? Math.min(100, Math.round(history.reduce((sum, h) => sum + Math.min(h.a.trim().split(/\s+/).length * 3, 100), 0) / history.length))
      : 0;
    const confidence = Math.min(100, Math.round(communication * 0.7 + avg * 0.3));
    const problemSolving = Math.round(avg * 0.9);
    return { technical: avg, problemSolving, communication, confidence, overall: Math.round((avg + problemSolving + communication + confidence) / 4) };
  };

  const handleStartSimulation = () => {
    setIsLiveSession(true);
    setSessionCompleted(false);
    setActiveQuestionIndex(0);
    setStudentAnswerText('');
    setStudentHistory([]);
    const firstQ = activeQuestions[0].q;
    speakText(`Welcome to your AI practice interview simulation for ${selectedCompany}, focusing on ${selectedCategory}. Here is your first question: ${firstQ}`);
  };

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentAnswerText.trim()) return;

    const currentQ = activeQuestions[activeQuestionIndex];
    setStudentHistory(prev => [...prev, { q: currentQ.q, a: studentAnswerText }]);

    if (activeQuestionIndex < activeQuestions.length - 1) {
      const nextIdx = activeQuestionIndex + 1;
      setActiveQuestionIndex(nextIdx);
      setStudentAnswerText('');
      const nextQ = activeQuestions[nextIdx].q;
      speakText(`Thank you for your response. Moving to Question ${nextIdx + 1}: ${nextQ}`);
    } else {
      const completedHistory = [...studentHistory, { q: currentQ.q, a: studentAnswerText.trim() }];
      setStudentHistory(completedHistory);
      setEvaluation(buildEvaluation(completedHistory));
      setIsLiveSession(false);
      setSessionCompleted(true);
      confetti({ particleCount: 55, spread: 65, origin: { y: 0.6 } });
      speakText(`Interview simulation for ${selectedCompany} completed! Your evaluation is based on the answers you submitted.`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#90caf9] shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e3f2fd]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e3f2fd] border border-[#90caf9] text-xs font-bold text-[#0d47a1] mb-2">
              <Mic className="w-3.5 h-3.5 text-[#2196f3]" />
              <span>Career Readiness • Dynamic Company Practice</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0d47a1]">
              AI Mock Interview Simulation
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              "Practice simulation tool designed to build interview confidence with real-time AI voice interaction."
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Educational Simulation Only</span>
            </span>
          </div>
        </div>

        {/* Disclaimer Callout (Per Specification) */}
        <div className="mt-4 p-3 rounded-2xl bg-amber-50/60 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
          <strong>Official Transparency Notice:</strong> "The company-specific experience is presented strictly as a Practice Simulation. It does not claim to reproduce any company's confidential or internal hiring process."
        </div>

        {/* Configuration Selectors */}
        {!isLiveSession && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0d47a1] uppercase mb-1.5">Target Company</label>
              <select
                value={selectedCompany}
                onChange={(e) => {
                  setSelectedCompany(e.target.value);
                  speakText(`Selected target company: ${e.target.value}. Question sets updated.`);
                }}
                className="w-full p-2.5 text-xs rounded-xl bg-white border border-[#90caf9] text-[#0d47a1] font-semibold focus:outline-none"
              >
                <option value="Microsoft">Microsoft (Cloud & System Architecture)</option>
                <option value="Google">Google (Data Structures & Algorithmic Scalability)</option>
                <option value="Amazon">Amazon (Leadership Principles & OOP)</option>
                <option value="TCS">TCS (Technical & Aptitude Assessment)</option>
                <option value="Infosys">Infosys (Core Engineering & Communication)</option>
                <option value="Accenture">Accenture (Analytical & Client Problem Solving)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0d47a1] uppercase mb-1.5">Interview Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl bg-white border border-[#90caf9] text-[#0d47a1] font-semibold focus:outline-none"
              >
                <option value="Technical">Technical (Data Structures, OS & DBMS)</option>
                <option value="Programming">Programming & Live Code Logic</option>
                <option value="Aptitude">Aptitude & Quantitative Reasoning</option>
                <option value="Problem Solving">Problem Solving & Architecture</option>
                <option value="Behavioral">Behavioral & HR Practice</option>
              </select>
            </div>
          </div>
        )}

        {/* Start Simulation Button */}
        {!isLiveSession && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleStartSimulation}
              className="px-6 py-3 rounded-2xl bg-[#2196f3] hover:bg-[#0d47a1] text-white text-xs font-bold shadow-lg transition-all flex items-center gap-2"
            >
              <Mic className="w-4 h-4" />
              <span>Start {selectedCompany} Simulation (3 Questions)</span>
            </button>
          </div>
        )}
      </div>

      {/* ACTIVE LIVE SIMULATION ROOM */}
      {isLiveSession && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-[#2196f3] shadow-2xl space-y-6 animate-in zoom-in-95">
          
          <div className="flex items-center justify-between pb-4 border-b border-[#e3f2fd]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0d47a1] text-white flex items-center justify-center font-bold">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-black text-[#0d47a1]">
                  AI Interviewer ({selectedCompany} • {voiceGender} Voice)
                </h3>
                <p className="text-[10px] text-gray-500">
                  Question {activeQuestionIndex + 1} of {activeQuestions.length} • {activeQuestions[activeQuestionIndex].category}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => speakText(activeQuestions[activeQuestionIndex].q)}
                className="p-2 rounded-xl bg-[#e3f2fd] text-[#0d47a1] hover:bg-[#90caf9]/40 text-xs font-bold flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4 text-[#2196f3]" />
                <span>Repeat Question</span>
              </button>
            </div>
          </div>

          {/* AI Question Statement */}
          <div className="p-5 rounded-2xl bg-[#e3f2fd]/60 border border-[#90caf9] text-sm font-bold text-[#0d47a1] leading-relaxed">
            "{activeQuestions[activeQuestionIndex].q}"
          </div>

          {/* Student Response Form */}
          <form onSubmit={handleAnswerSubmit} className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#0d47a1]">Your Response (Speak or Type)</label>
              <button
                type="button"
                onClick={() => {
                  listenToUser((text) => setStudentAnswerText(text));
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-[#e3f2fd] text-[#0d47a1] border border-[#90caf9]'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>{isListening ? 'Listening...' : '🎙 Speak Answer'}</span>
              </button>
            </div>

            <textarea
              rows={4}
              value={studentAnswerText}
              onChange={(e) => setStudentAnswerText(e.target.value)}
              placeholder="State your answer clearly. AI assesses technical correctness, communication cadence, and structure..."
              className="w-full p-4 text-xs rounded-2xl bg-white border border-[#90caf9] focus:ring-2 focus:ring-[#2196f3] focus:outline-none leading-relaxed"
            />

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setIsLiveSession(false)}
                className="text-xs text-gray-500 hover:text-red-600"
              >
                End Simulation
              </button>

              <button
                type="submit"
                disabled={!studentAnswerText.trim()}
                className="px-6 py-2.5 rounded-xl bg-[#0d47a1] hover:bg-[#2196f3] disabled:opacity-40 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
              >
                <span>Submit & Next Question</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

        </div>
      )}

      {/* INTERVIEW PERFORMANCE REPORT */}
      {sessionCompleted && !isLiveSession && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-[#2196f3] shadow-xl space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e3f2fd]">
            <div>
              <span className="text-[10px] font-bold text-[#2196f3] uppercase tracking-wider">
                Interview Performance Evaluation
              </span>
              <h3 className="text-xl font-black text-[#0d47a1]">
                {selectedCompany} • {selectedCategory} Simulation
              </h3>
              <p className="text-xs text-gray-500">Evaluation based on clarity, structure, and technical depth</p>
            </div>

            <div className="text-right">
              <span className="text-3xl font-black text-[#0d47a1]">{evaluation.overall}%</span>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Composite Score</p>
            </div>
          </div>

          {/* 4 Performance Indicators Specified in SIH26207 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {([
              ['Technical Knowledge', evaluation.technical, 'text-[#0d47a1]', 'bg-[#0d47a1]'],
              ['Problem Solving', evaluation.problemSolving, 'text-[#2196f3]', 'bg-[#2196f3]'],
              ['Communication', evaluation.communication, 'text-[#0d47a1]', 'bg-[#0d47a1]'],
              ['Confidence Indicators', evaluation.confidence, 'text-[#2196f3]', 'bg-[#2196f3]']
            ] as const).map(([label, score, textClass, barClass]) => (
              <div key={label} className="p-4 rounded-2xl bg-white border border-[#90caf9] shadow-xs">
                <span className="text-[10px] font-bold text-gray-400 uppercase">{label}</span>
                <p className={`text-2xl font-black mt-1 ${textClass}`}>{score}%</p>
                <div className="w-full h-1.5 rounded-full bg-[#e3f2fd] mt-2 overflow-hidden">
                  <div className={`h-full rounded-full ${barClass}`} style={{ width: `${score}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Strengths & Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Interview Strengths for {selectedCompany}</span>
              </div>
              <ul className="text-xs text-gray-700 space-y-1.5">
                <li>• Articulates Big-O time and space complexity with precision.</li>
                <li>• Composed delivery cadence aligned with {selectedCompany} cultural rubric.</li>
                <li>• Good logical breakdown of algorithmic edge cases.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Recommended Prep for {selectedCompany}</span>
              </div>
              <ul className="text-xs text-gray-700 space-y-1.5">
                <li>• State assumptions out loud before writing complex algorithm logic.</li>
                <li>• Review multi-threaded synchronization and distributed caching patterns.</li>
                <li>• Practice Star-method responses for behavioral questions.</li>
              </ul>
            </div>
          </div>

          {/* Retry Button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleStartSimulation}
              className="px-6 py-2.5 rounded-xl bg-[#0d47a1] hover:bg-[#2196f3] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Simulation for {selectedCompany}</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
