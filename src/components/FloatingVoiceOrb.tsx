import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mic, Volume2, VolumeX, Sparkles, X, ArrowRight, Bot, Languages } from 'lucide-react';

export const FloatingVoiceOrb: React.FC = () => {
  const { 
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
    role,
    setSchoolNav,
    setCollegeNav,
    language,
    setLanguage,
    sendStudentMessage
  } = useApp();

  const [expanded, setExpanded] = useState(false);
  const [customInput, setCustomInput] = useState('');

  const handleOrbClick = () => {
    if (expanded) {
      setExpanded(false);
    } else {
      setExpanded(true);
      if (!isSpeaking) {
        speakText("I am listening! You can ask me to explain concepts, clarify doubts, or simulate interview questions.");
      }
    }
  };

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const text = customInput;
    setCustomInput('');
    sendStudentMessage(text);
  };

  const openFullAssistant = () => {
    setExpanded(false);
    if (role === 'school') {
      setSchoolNav('ai-assistant');
    } else if (role === 'college') {
      setCollegeNav('ai-assistant');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Expanded Voice Assistant Panel */}
      {expanded && (
        <div className="mb-3 w-80 sm:w-96 glass-card rounded-3xl p-5 border border-[#90caf9] shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#90caf9]/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2196f3] to-[#0d47a1] flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-4 h-4 animate-spin-slow" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0d47a1]">Personal AI Voice Assistant</h4>
                <p className="text-[10px] text-gray-500 capitalize">{voiceGender} Voice • Learning + Career Companion</p>
              </div>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="p-1 rounded-full text-gray-400 hover:text-[#0d47a1] hover:bg-[#e3f2fd]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Voice Gender Switcher */}
          <div className="mt-3 flex items-center justify-between bg-[#e3f2fd] p-1.5 rounded-xl text-xs">
            <span className="text-[11px] font-semibold text-[#0d47a1] pl-2">Voice Style:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setVoiceGender('female');
                  speakText("Switched to Female voice. Warm, friendly, and encouraging.");
                }}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  voiceGender === 'female' 
                    ? 'bg-[#2196f3] text-white shadow-xs font-bold' 
                    : 'text-[#0d47a1] hover:bg-white/60'
                }`}
              >
                Female Voice
              </button>
              <button
                onClick={() => {
                  setVoiceGender('male');
                  speakText("Switched to Male voice. Professional, calm, and confident.");
                }}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  voiceGender === 'male' 
                    ? 'bg-[#0d47a1] text-white shadow-xs font-bold' 
                    : 'text-[#0d47a1] hover:bg-white/60'
                }`}
              >
                Male Voice
              </button>
            </div>
          </div>

          {/* Regional Language Switcher */}
          <div className="mt-2.5 flex items-center justify-between bg-[#e3f2fd] p-1.5 rounded-xl text-xs">
            <span className="text-[11px] font-semibold text-[#0d47a1] pl-2 flex items-center gap-1">
              <Languages className="w-3.5 h-3.5 text-[#2196f3]" />
              <span>Language:</span>
            </span>
            <div className="flex items-center gap-1">
              {[
                { code: 'en' as const, label: 'EN' },
                { code: 'hi' as const, label: 'हिन्दी' },
                { code: 'ta' as const, label: 'தமிழ்' },
                { code: 'te' as const, label: 'తెలుగు' }
              ].map((item) => (
                <button
                  key={item.code}
                  onClick={() => {
                    setLanguage(item.code);
                    if (item.code === 'hi') speakText("हिन्दी भाषा सक्षम है।");
                    else if (item.code === 'ta') speakText("தமிழ் மொழி தேர்ந்தெடுக்கப்பட்டது.");
                    else if (item.code === 'te') speakText("తెలుగు భాష ప్రారంభించబడింది.");
                    else speakText("Switched to English.");
                  }}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all ${
                    language === item.code
                      ? 'bg-[#0d47a1] text-white shadow-xs'
                      : 'text-[#0d47a1] hover:bg-white/60'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Audio Visualizer Waveform */}
          <div className="my-4 p-4 rounded-2xl bg-[#0d47a1] text-white flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="flex items-center justify-center gap-1.5 h-10 mb-2">
              {[4, 12, 24, 32, 18, 28, 10, 22, 30, 16, 6].map((height, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full bg-[#90caf9] transition-all duration-150 ${
                    isSpeaking || isListening ? 'voice-wave-bar' : 'h-1.5'
                  }`}
                  style={{
                    height: isSpeaking || isListening ? `${height}px` : '4px',
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>

            <p className="text-xs font-medium text-white/90">
              {isListening 
                ? "Listening to your voice... Speak now!" 
                : isSpeaking 
                ? "AI Assistant is speaking..." 
                : "Tap 'Ask AI' or speak your question"}
            </p>

            {lastVoiceText && (
              <p className="mt-2 text-[11px] text-[#90caf9] bg-white/10 p-2 rounded-xl max-h-16 overflow-y-auto italic">
                "{lastVoiceText.slice(0, 120)}..."
              </p>
            )}
          </div>

          {/* Quick Voice Interaction Buttons */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => (isListening ? stopRealtimeVoice() : startRealtimeVoice())}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-[#2196f3] text-white hover:bg-[#0d47a1]'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>{isListening ? 'Stop Listening' : '🎙 Start Live Voice'}</span>
            </button>

            <button
              onClick={() => {
                if (isSpeaking) {
                  stopSpeech();
                } else {
                  speakText(lastVoiceText || "I am your personal AI assistant. Let us learn together!");
                }
              }}
              className="py-2 px-3 rounded-xl text-xs font-bold bg-[#e3f2fd] text-[#0d47a1] border border-[#90caf9] hover:bg-[#90caf9]/40 flex items-center justify-center gap-2"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-red-600" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeaking ? 'Stop Audio' : 'Replay Voice'}</span>
            </button>
          </div>

          {/* Text Input Fallback */}
          <form onSubmit={handleAsk} className="flex gap-2">
            <input
              type="text"
              placeholder="Or type a question..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-white border border-[#90caf9] focus:outline-none focus:ring-1 focus:ring-[#2196f3] text-[#0d47a1]"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-[#0d47a1] text-white text-xs font-semibold hover:bg-[#2196f3] transition-colors"
            >
              Ask
            </button>
          </form>

          {/* Bottom Link to Full Screen Assistant */}
          {role !== 'landing' && (
            <button
              onClick={openFullAssistant}
              className="mt-3 w-full py-1.5 text-[11px] text-[#2196f3] font-bold hover:underline flex items-center justify-center gap-1"
            >
              <span>Open 3-in-1 Personal AI Full Screen</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}

        </div>
      )}

      {/* Floating Trigger Orb */}
      <button
        onClick={handleOrbClick}
        title="Open AI Voice Assistant"
        className="group relative flex items-center gap-3 p-3.5 rounded-full bg-gradient-to-r from-[#2196f3] to-[#0d47a1] text-white shadow-2xl hover:scale-105 active:scale-95 transition-all glow-blue"
      >
        <div className="relative">
          <Bot className="w-6 h-6 animate-pulse" />
          {(isSpeaking || isListening) && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-400"></span>
            </span>
          )}
        </div>
        
        <span className="hidden sm:inline text-xs font-bold pr-1">
          🎙 Ask AI ({voiceGender === 'female' ? 'Female' : 'Male'})
        </span>
      </button>

    </div>
  );
};
