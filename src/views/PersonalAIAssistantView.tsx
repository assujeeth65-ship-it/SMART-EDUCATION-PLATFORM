import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bot, 
  Send, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  Zap, 
  BookOpen, 
  Code2, 
  Trophy, 
  HelpCircle,
  MessageSquare
} from 'lucide-react';

export const PersonalAIAssistantView: React.FC = () => {
  const { 
    chatMessages, 
    sendStudentMessage, 
    currentSubject,
    currentChapter,
    currentConcept,
    learningLevel,
    recentPerformance,
    recommendedNextStep,
    role
  } = useApp();

  const [inputVal, setInputVal] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'tutor' | 'performance' | 'career'>('all');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendStudentMessage(inputVal);
    setInputVal('');
  };

  const quickPrompts = [
    "Explain the quadratic formula with a simple example.",
    "Why did I get question 4 wrong in the quiz?",
    "How do I prepare for a technical interview at Microsoft?",
    "Explain the difference between TCP and UDP in Computer Networks.",
    "How can I fix my weakness in application-based word problems?"
  ];

  return (
    <div className="h-[calc(100vh-6.5rem)] flex flex-col lg:flex-row gap-6 pb-2">
      
      {/* LEFT COLUMN: CONVERSATION THREADS & MODES */}
      <div className="lg:w-64 glass-card rounded-3xl p-5 border border-[#90caf9] flex flex-col justify-between shrink-0 hidden md:flex">
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#e3f2fd]">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2196f3] to-[#0d47a1] flex items-center justify-center text-white">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#0d47a1]">Personal AI</h3>
              <p className="text-[10px] text-gray-500">Unified 3-in-1 Companion</p>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#0d47a1]/70 uppercase tracking-wider px-2">
              Capabilities Active
            </span>
            <div className="p-2.5 rounded-xl bg-[#e3f2fd]/60 border border-[#90caf9] text-xs space-y-1 text-gray-700">
              <div className="flex items-center gap-1.5 font-semibold text-[#0d47a1]">
                <Sparkles className="w-3.5 h-3.5 text-[#2196f3]" />
                <span>Learning AI</span>
              </div>
              <p className="text-[10px] text-gray-500 pl-5">Tutor & Concept Simplifier</p>
            </div>

            <div className="p-2.5 rounded-xl bg-[#e3f2fd]/60 border border-[#90caf9] text-xs space-y-1 text-gray-700">
              <div className="flex items-center gap-1.5 font-semibold text-[#0d47a1]">
                <Zap className="w-3.5 h-3.5 text-[#2196f3]" />
                <span>Performance AI</span>
              </div>
              <p className="text-[10px] text-gray-500 pl-5">Diagnostic & Weakness Engine</p>
            </div>

            <div className="p-2.5 rounded-xl bg-[#e3f2fd]/60 border border-[#90caf9] text-xs space-y-1 text-gray-700">
              <div className="flex items-center gap-1.5 font-semibold text-[#0d47a1]">
                <Trophy className="w-3.5 h-3.5 text-[#2196f3]" />
                <span>Career AI</span>
              </div>
              <p className="text-[10px] text-gray-500 pl-5">Code Mentor & Mock Interviewer</p>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-[10px] font-bold text-[#0d47a1]/70 uppercase tracking-wider px-2">
              Sample Inquiries
            </span>
            <div className="space-y-1 mt-1">
              {quickPrompts.slice(0, 3).map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => sendStudentMessage(prompt)}
                  className="w-full text-left p-2 rounded-xl text-[11px] text-gray-700 hover:bg-[#e3f2fd] transition-colors line-clamp-1"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CENTER COLUMN: LIVE CONVERSATION INTERFACE */}
      <div className="flex-1 glass-card rounded-3xl border border-[#90caf9] flex flex-col justify-between overflow-hidden shadow-xl">
        
        {/* Chat Header */}
        <div className="p-4 sm:p-5 bg-white/90 border-b border-[#e3f2fd] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0d47a1] text-white flex items-center justify-center font-bold">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-[#0d47a1]">Personal AI Assistant</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <p className="text-[11px] text-gray-500">
                Context-Aware: {currentSubject} • {currentChapter}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-[#e3f2fd] border border-[#90caf9] text-[11px] font-bold text-[#0d47a1] flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              Chat Mode
            </span>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {chatMessages.map((msg) => {
            const isAi = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${isAi ? 'self-start' : 'ml-auto flex-row-reverse'}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                  isAi ? 'bg-[#0d47a1] text-white' : 'bg-[#2196f3] text-white'
                }`}>
                  {isAi ? <Bot className="w-4 h-4" /> : 'You'}
                </div>

                <div className={`p-4 rounded-3xl text-xs leading-relaxed space-y-1 shadow-sm ${
                  isAi 
                    ? 'bg-white border border-[#90caf9] text-gray-800' 
                    : 'bg-gradient-to-r from-[#2196f3] to-[#0d47a1] text-white font-medium'
                }`}>
                  <p>{msg.text}</p>
                  <div className={`flex items-center justify-between text-[10px] pt-1 ${
                    isAi ? 'text-gray-400' : 'text-white/75'
                  }`}>
                    <span>{msg.roleContext || 'General'}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Prompts Bar */}
        <div className="px-4 py-2 bg-white/70 border-t border-[#e3f2fd] flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] font-bold text-gray-400 uppercase shrink-0">Try:</span>
          {quickPrompts.map((q, i) => (
            <button
              key={i}
              onClick={() => sendStudentMessage(q)}
              className="px-3 py-1 rounded-xl bg-[#e3f2fd]/70 hover:bg-[#e3f2fd] text-[11px] font-medium text-[#0d47a1] shrink-0 border border-[#90caf9]/50 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
        {/* Bottom Input - Chat Only */}
        <div className="p-4 bg-white border-t border-[#90caf9]/40">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask a doubt, request a quiz question, or simulate an interview..."
              className="flex-1 px-4 py-3 text-xs rounded-2xl bg-[#e3f2fd]/30 border border-[#90caf9] focus:outline-none focus:ring-2 focus:ring-[#2196f3] text-[#0d47a1]"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="px-5 py-3 rounded-2xl bg-[#2196f3] hover:bg-[#0d47a1] disabled:opacity-40 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

      {/* RIGHT COLUMN: PERMITTED LEARNING CONTEXT DRAWER */}
      <div className="lg:w-80 glass-card rounded-3xl p-5 border border-[#90caf9] space-y-4 shrink-0 hidden xl:block">
        <div className="pb-3 border-b border-[#e3f2fd]">
          <span className="text-[10px] font-bold text-[#2196f3] uppercase tracking-wider">
            Context-Aware AI
          </span>
          <h4 className="text-xs font-black text-[#0d47a1] mt-0.5">
            Active Student Learning Profile
          </h4>
          <p className="text-[11px] text-gray-500">
            "The AI uses permitted learning context rather than giving generic responses."
          </p>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="p-3 rounded-2xl bg-white border border-[#90caf9]">
            <span className="text-[10px] text-gray-400 font-bold uppercase">Current Subject</span>
            <p className="font-bold text-[#0d47a1] mt-0.5">{currentSubject}</p>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-[#90caf9]">
            <span className="text-[10px] text-gray-400 font-bold uppercase">Current Chapter</span>
            <p className="font-bold text-[#0d47a1] mt-0.5">{currentChapter}</p>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-[#90caf9]">
            <span className="text-[10px] text-gray-400 font-bold uppercase">Current Concept</span>
            <p className="font-bold text-[#0d47a1] mt-0.5">{currentConcept}</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-2xl bg-white border border-[#90caf9]">
              <span className="text-[10px] text-gray-400 font-bold uppercase">Level</span>
              <p className="font-bold text-[#0d47a1] mt-0.5">{learningLevel}</p>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-[#90caf9]">
              <span className="text-[10px] text-gray-400 font-bold uppercase">Recent Score</span>
              <p className="font-bold text-[#2196f3] mt-0.5">{recentPerformance}</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200">
            <span className="text-[10px] text-amber-800 font-bold uppercase">Recommended Next Step</span>
            <p className="font-bold text-amber-900 mt-0.5 text-[11px] leading-snug">
              {recommendedNextStep}
            </p>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-[#e3f2fd]/60 border border-[#90caf9] text-[11px] text-gray-600 space-y-1">
          <p className="font-bold text-[#0d47a1]">Data Privacy Notice:</p>
          <p>Context is strictly bound to curriculum mastery; no third-party telemetry is shared.</p>
        </div>
      </div>

    </div>
  );
};
