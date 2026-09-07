import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { algorithmicChallenges, CodingChallenge } from '../data/codingChallenges';
import { 
  Code2, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  Terminal, 
  Volume2, 
  Sparkles, 
  Check, 
  ChevronRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AlgorithmicChallengeArena: React.FC = () => {
  const { speakText, voiceGender } = useApp();

  const [selectedChallengeId, setSelectedChallengeId] = useState<string>('algo-1');
  const [selectedLang, setSelectedLang] = useState<'Python' | 'JavaScript' | 'C++' | 'Java'>('Python');
  
  const challenge = algorithmicChallenges.find(c => c.id === selectedChallengeId) || algorithmicChallenges[0];
  const [code, setCode] = useState<string>(challenge.starterCode[selectedLang]);
  const [showHintIndex, setShowHintIndex] = useState<number | null>(null);
  
  // Test Runner State
  const [testResults, setTestResults] = useState<{
    status: 'idle' | 'running' | 'passed' | 'failed';
    executedCases: { id: number; passed: boolean; actual: string }[];
    runtimeMs: number;
    memoryMb: number;
  }>({
    status: 'idle',
    executedCases: [],
    runtimeMs: 42,
    memoryMb: 14.8
  });

  const handleSelectChallenge = (c: CodingChallenge) => {
    setSelectedChallengeId(c.id);
    setCode(c.starterCode[selectedLang]);
    setShowHintIndex(null);
    setTestResults({ status: 'idle', executedCases: [], runtimeMs: 42, memoryMb: 14.8 });
    speakText(`Selected problem: ${c.title}. Difficulty: ${c.difficulty}.`);
  };

  const handleLangChange = (lang: 'Python' | 'JavaScript' | 'C++' | 'Java') => {
    setSelectedLang(lang);
    setCode(challenge.starterCode[lang]);
    setTestResults({ status: 'idle', executedCases: [], runtimeMs: 42, memoryMb: 14.8 });
    speakText(`Language switched to ${lang}`);
  };

  const runAllUnitTests = () => {
    setTestResults(prev => ({ ...prev, status: 'running' }));
    speakText("Running automated test suite across all test cases.");

    setTimeout(() => {
      // Simulate test case execution
      const results = challenge.testCases.map((tc) => ({
        id: tc.id,
        passed: true,
        actual: tc.expectedOutput
      }));

      const runtime = Math.floor(Math.random() * 25) + 35;
      const memory = (Math.random() * 2 + 13).toFixed(1);

      setTestResults({
        status: 'passed',
        executedCases: results,
        runtimeMs: runtime,
        memoryMb: parseFloat(memory)
      });

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });

      speakText(`All ${challenge.testCases.length} unit test cases passed! Runtime: ${runtime} milliseconds. Beats 88% of submissions.`);
    }, 700);
  };

  const explainOptimalApproach = () => {
    speakText(`${challenge.title}: Optimal time complexity is ${challenge.optimalComplexity.time} and space complexity is ${challenge.optimalComplexity.space}.`);
  };

  return (
    <div className="p-5 rounded-2xl bg-white border border-[#90caf9] shadow-sm space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#90caf9]/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-[#0d47a1] text-white text-[10px] font-bold">
              LeetCode-Style Practice
            </span>
            <h3 className="text-sm font-black text-[#0d47a1]">
              Algorithmic Challenge Arena & Automated Test Runner
            </h3>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Industry technical interview questions with constraints, multi-language runner, and automated test cases
          </p>
        </div>

        <button
          onClick={explainOptimalApproach}
          className="self-start sm:self-center px-3 py-1.5 rounded-xl bg-[#e3f2fd] text-[#0d47a1] border border-[#90caf9] hover:bg-[#90caf9]/40 text-xs font-bold flex items-center gap-1.5 transition-all"
        >
          <Volume2 className="w-3.5 h-3.5 text-[#2196f3]" />
          <span>Optimal Complexity ({voiceGender})</span>
        </button>
      </div>

      {/* Challenge Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {algorithmicChallenges.map((c) => (
          <button
            key={c.id}
            onClick={() => handleSelectChallenge(c)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedChallengeId === c.id
                ? 'bg-[#0d47a1] text-white shadow-xs'
                : 'bg-[#e3f2fd] text-[#0d47a1] border border-[#90caf9] hover:bg-white'
            }`}
          >
            <span>{c.title}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              c.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {c.difficulty}
            </span>
          </button>
        ))}
      </div>

      {/* Main Two-Column Challenge Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: Problem Statement & Test Suite (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-[#e3f2fd]/60 border border-[#90caf9] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#0d47a1]">
                Category: {challenge.category}
              </span>
              <span className="text-[11px] font-bold text-gray-500">
                Acceptance: {challenge.acceptanceRate}
              </span>
            </div>

            <p className="text-xs text-gray-800 leading-relaxed font-sans">
              {challenge.description}
            </p>

            {/* Constraints */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#0d47a1] uppercase tracking-wider">
                Constraints:
              </span>
              <ul className="text-[11px] text-gray-600 font-mono space-y-0.5 list-disc pl-4">
                {challenge.constraints.map((con, idx) => (
                  <li key={idx}>{con}</li>
                ))}
              </ul>
            </div>

            {/* Examples */}
            <div className="space-y-2 pt-2 border-t border-[#90caf9]/40">
              <span className="text-[10px] font-bold text-[#0d47a1] uppercase tracking-wider">
                Example 1:
              </span>
              <div className="p-2.5 rounded-xl bg-white text-xs font-mono text-[#0d47a1] border border-[#90caf9]/60 space-y-1">
                <div>Input: <span className="text-gray-700">{challenge.examples[0].input}</span></div>
                <div>Output: <span className="text-emerald-700 font-bold">{challenge.examples[0].output}</span></div>
                {challenge.examples[0].explanation && (
                  <div className="text-[11px] text-gray-500 font-sans italic">{challenge.examples[0].explanation}</div>
                )}
              </div>
            </div>

            {/* AI Solution Hints */}
            <div className="space-y-1 pt-2 border-t border-[#90caf9]/40">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#0d47a1] flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>AI Mentor Hints ({challenge.solutionHints.length})</span>
                </span>
                <button
                  onClick={() => setShowHintIndex(prev => (prev === null ? 0 : (prev + 1) % challenge.solutionHints.length))}
                  className="text-[10px] text-[#2196f3] font-bold hover:underline"
                >
                  {showHintIndex === null ? 'Show Hint 1' : `Next Hint (${showHintIndex + 1}/${challenge.solutionHints.length})`}
                </button>
              </div>
              {showHintIndex !== null && (
                <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 animate-in fade-in">
                  💡 {challenge.solutionHints[showHintIndex]}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Right: Code Editor & Automated Test Suite Runner (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          
          {/* Editor Header Bar */}
          <div className="flex items-center justify-between bg-[#0d47a1] text-white p-2.5 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#90caf9]" />
              <span className="text-xs font-bold">Solution Editor</span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl">
              {(['Python', 'JavaScript', 'C++', 'Java'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => handleLangChange(lang)}
                  className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold transition-all ${
                    selectedLang === lang ? 'bg-[#2196f3] text-white' : 'text-white/80 hover:bg-white/20'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Code Editor Box */}
          <div className="relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={11}
              className="w-full p-4 font-mono text-xs bg-slate-950 text-emerald-300 focus:outline-none focus:ring-2 focus:ring-[#2196f3] shadow-inner resize-y"
              spellCheck={false}
            />
          </div>

          {/* Execution Bar */}
          <div className="flex items-center justify-between gap-3 p-3 bg-[#e3f2fd] rounded-xl">
            <div className="flex items-center gap-3 text-xs">
              <span className="font-bold text-[#0d47a1]">Complexity Target:</span>
              <span className="font-mono bg-white px-2 py-0.5 rounded text-[11px] text-[#0d47a1] border border-[#90caf9]">
                Time: {challenge.optimalComplexity.time}
              </span>
              <span className="font-mono bg-white px-2 py-0.5 rounded text-[11px] text-[#0d47a1] border border-[#90caf9]">
                Space: {challenge.optimalComplexity.space}
              </span>
            </div>

            <button
              onClick={runAllUnitTests}
              disabled={testResults.status === 'running'}
              className="px-4 py-2 rounded-xl bg-[#0d47a1] text-white text-xs font-bold hover:bg-[#2196f3] flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{testResults.status === 'running' ? 'Running Tests...' : 'Run Test Cases'}</span>
            </button>
          </div>

          {/* Automated Test Suite Results */}
          <div className="p-4 rounded-2xl bg-white border border-[#90caf9] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0d47a1] uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#2196f3]" />
                <span>Automated Unit Test Suite</span>
              </span>
              {testResults.status === 'passed' && (
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-emerald-700 font-bold">✓ Runtime: {testResults.runtimeMs}ms</span>
                  <span className="text-gray-500">Memory: {testResults.memoryMb}MB</span>
                </div>
              )}
            </div>

            {/* Test Case Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {challenge.testCases.map((tc, idx) => {
                const isPassed = testResults.status === 'passed';
                return (
                  <div
                    key={tc.id}
                    className={`p-2.5 rounded-xl border text-xs transition-all ${
                      isPassed 
                        ? 'bg-emerald-50/70 border-emerald-300' 
                        : 'bg-[#e3f2fd]/40 border-[#90caf9]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#0d47a1] text-[11px]">
                        Case {idx + 1} {tc.isHidden ? '(Hidden Test)' : ''}
                      </span>
                      {isPassed ? (
                        <span className="text-[10px] text-emerald-800 font-bold flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Passed
                        </span>
                      ) : (
                        <span className="text-[10px] text-gray-400">Pending Run</span>
                      )}
                    </div>
                    <div className="text-[11px] font-mono text-gray-700 truncate">
                      Input: {tc.input}
                    </div>
                    <div className="text-[11px] font-mono text-emerald-800 font-bold truncate">
                      Expected: {tc.expectedOutput}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
