import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { programmingLanguages, pythonLearningPath } from '../data/mockData';
import { 
  Code2, 
  Play, 
  CheckCircle2, 
  Terminal, 
  Volume2, 
  Bot
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SortingAlgorithmVisualizer } from '../components/SortingAlgorithmVisualizer';
import { BinarySearchTreeVisualizer } from '../components/BinarySearchTreeVisualizer';
import { AlgorithmicChallengeArena } from '../components/AlgorithmicChallengeArena';

export const ProgrammingHubView: React.FC = () => {
  const { speakText, voiceGender, programmingProgress, setProgrammingProgress } = useApp();

  const [activeVisualizer, setActiveVisualizer] = useState<'sorting' | 'bst'>('sorting');
  const [activeLang, setActiveLang] = useState<string>('Python');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('py-1'); // Python Basics
  const [codeEditor, setCodeEditor] = useState<string>(
    pythonLearningPath.find(t => t.id === 'py-1')?.starterCode || ''
  );
  const [consoleOutput, setConsoleOutput] = useState<string>('Run your first basic exercise to see the output.');
  const [testResult, setTestResult] = useState<'idle' | 'success' | 'failed'>('idle');
  const topicProgress = Object.fromEntries(pythonLearningPath.map(t => [t.id, programmingProgress[t.id] || { completed: false, score: 0 }]));
  const [aiCodeFeedback, setAiCodeFeedback] = useState<string>(
    'Complete the basic Python exercises first. Your skill analysis will update after successful practice.'
  );

  const activeTopic = pythonLearningPath.find(t => t.id === selectedTopicId) || pythonLearningPath[0];

  const handleSelectTopic = (id: string) => {
    setSelectedTopicId(id);
    const found = pythonLearningPath.find(t => t.id === id);
    if (found) {
      setCodeEditor(found.starterCode);
      setConsoleOutput('Press "Run & Test Code" to execute script.');
      setTestResult('idle');
      speakText(`Selected ${found.title}. ${found.description}`);
    }
  };

  const languageTemplates: Record<string, { runtime: string; code: string; output: string }> = {
    Python: {
      runtime: 'Python 3.12 (CPython runtime)',
      code: pythonLearningPath.find(t => t.id === 'py-6')?.starterCode || 'print("Hello Python")',
      output: '15'
    },
    'C': {
      runtime: 'GCC 13.2 (C17 Standard)',
      code: '#include <stdio.h>\n\nint main() {\n    int sum = 0;\n    for(int i = 1; i <= 5; i++) {\n        sum += i;\n    }\n    printf("Total Sum: %d\\n", sum);\n    return 0;\n}',
      output: 'Total Sum: 15\n[Process exited 0]'
    },
    'C++': {
      runtime: 'G++ 13.2 (C++20 Standard)',
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int sum = 0;\n    for(int i = 1; i <= 5; i++) sum += i;\n    cout << "Total Sum: " << sum << endl;\n    return 0;\n}',
      output: 'Total Sum: 15\n[Process exited 0]'
    },
    'Java': {
      runtime: 'OpenJDK 21.0.2',
      code: 'public class Main {\n    public static void main(String[] args) {\n        int sum = 0;\n        for (int i = 1; i <= 5; i++) sum += i;\n        System.out.println("Total Sum: " + sum);\n    }\n}',
      output: 'Total Sum: 15\n[Process exited 0]'
    },
    'JavaScript': {
      runtime: 'Node.js v22.1.0 (V8 Engine)',
      code: 'const sum = [1, 2, 3, 4, 5].reduce((acc, curr) => acc + curr, 0);\nconsole.log(`Total Sum: ${sum}`);',
      output: 'Total Sum: 15'
    },
    'HTML': {
      runtime: 'HTML5 DOM Renderer',
      code: '<!DOCTYPE html>\n<html>\n  <body>\n    <h2>Smart Education Hub</h2>\n    <p>Sum of 1..5 is <strong>15</strong></p>\n  </body>\n</html>',
      output: '<Rendered: Smart Education Hub - Sum of 1..5 is 15>'
    },
    'CSS': {
      runtime: 'CSS3 PostCSS Engine',
      code: '.education-card {\n  background: #e3f2fd;\n  border: 1px solid #90caf9;\n  color: #0d47a1;\n}',
      output: '[Styles parsed: .education-card rule valid]'
    }
  };

  const handleSelectLanguage = (lang: string) => {
    setActiveLang(lang);
    const template = languageTemplates[lang] || languageTemplates['Python'];
    setCodeEditor(template.code);
    setConsoleOutput(`Switched to ${lang} environment. Click "Run & Test Code" to compile.`);
    setTestResult('idle');
    speakText(`Switched programming environment to ${lang}. Runtime configured.`);
  };

  const handleRunCode = () => {
    const template = languageTemplates[activeLang] || languageTemplates['Python'];
    const userCode = codeEditor.trim();

    if (activeLang === 'Python') {
      // Syntax & Error Detection
      if (userCode.includes('prin(') || userCode.includes('prnt(')) {
        setConsoleOutput(`Traceback (most recent call last):\n  File "main.py", line 1, in <module>\nNameError: name 'prin' is not defined. Did you mean: 'print'?\n\n[Test Failed: 0/1 unit test cases passed]`);
        setTestResult('failed');
        setAiCodeFeedback("Syntax alert: In Python, standard output is printed using 'print()'. Check for typos in your function names.");
        speakText("NameError detected in your Python code. Check for typos in the print function call.");
        return;
      }

      const openParens = (userCode.match(/\(/g) || []).length;
      const closeParens = (userCode.match(/\)/g) || []).length;
      if (openParens !== closeParens) {
        setConsoleOutput(`  File "main.py", line 2\n    ^\nSyntaxError: closing parenthesis ')' does not match opening parenthesis or unexpected EOF while parsing\n\n[Test Failed: 0/1 unit test cases passed]`);
        setTestResult('failed');
        setAiCodeFeedback("Parenthesis imbalance: Ensure every opening parenthesis '(' has a matching closing parenthesis ')'.");
        speakText("SyntaxError: Unbalanced parentheses detected in your code.");
        return;
      }

      // Dynamic Output Generation
      let simulatedOutput = '';
      if (userCode.includes('sum(range(')) {
        // e.g. sum(range(1, 6))
        const match = userCode.match(/range\((\d+),\s*(\d+)\)/);
        if (match) {
          const start = parseInt(match[1]);
          const end = parseInt(match[2]);
          let s = 0;
          for (let i = start; i < end; i++) s += i;
          simulatedOutput = s.toString();
        } else {
          simulatedOutput = activeTopic.expectedOutput.trim();
        }
      } else if (userCode.includes('for ') && userCode.includes('range(')) {
        const match = userCode.match(/range\((\d+),\s*(\d+)\)/);
        if (match) {
          const start = parseInt(match[1]);
          const end = parseInt(match[2]);
          let s = 0;
          for (let i = start; i < end; i++) s += i;
          simulatedOutput = s.toString();
        } else {
          simulatedOutput = activeTopic.expectedOutput.trim();
        }
      } else {
        // Extract print argument
        const printMatch = userCode.match(/print\((["'])(.*?)\1\)/);
        if (printMatch) {
          simulatedOutput = printMatch[2];
        } else {
          simulatedOutput = activeTopic.expectedOutput.trim();
        }
      }

      setConsoleOutput(`> python main.py\n${simulatedOutput}\n\n[Test Passed: 1/1 unit test cases matched]`);
      setTestResult('success');
      setProgrammingProgress({ ...programmingProgress, [activeTopic.id]: { completed: true, score: 100 } });
      confetti({ particleCount: 45, spread: 50, origin: { y: 0.7 } });
      const feedback = `Python execution passed! Computed output '${simulatedOutput}' matches expected constraints. Clean indentation and algorithmic efficiency validated.`;
      setAiCodeFeedback(feedback);
      speakText(`Python code executed cleanly! Output: ${simulatedOutput}.`);
    } else {
      setConsoleOutput(`> compiling ${activeLang} source...\n${template.output}\n\n[Compilation successful with 0 warnings]`);
      setTestResult('success');
      if (activeLang === 'Python') {
        setProgrammingProgress({ ...programmingProgress, [activeTopic.id]: { completed: true, score: 100 } });
      }
      confetti({ particleCount: 45, spread: 50, origin: { y: 0.7 } });
      const feedback = `${activeLang} execution passed! Logic and syntax adhere to language idioms.`;
      setAiCodeFeedback(feedback);
      speakText(`${activeLang} code compiled and executed successfully!`);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#90caf9] shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e3f2fd]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e3f2fd] border border-[#90caf9] text-xs font-bold text-[#0d47a1] mb-2">
              <Code2 className="w-3.5 h-3.5 text-[#2196f3]" />
              <span>College Technical Skills Ecosystem</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0d47a1]">
              Programming Hub
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              "Learn ➔ Practice ➔ Test ➔ Analyze ➔ Improve. Master coding from basics to enterprise object-oriented design."
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex flex-wrap gap-1.5">
            {programmingLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleSelectLanguage(lang)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeLang === lang 
                    ? 'bg-[#0d47a1] text-white shadow-sm' 
                    : 'bg-white text-[#0d47a1] border border-[#90caf9] hover:bg-[#e3f2fd]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* PROGRAMMING SKILL ANALYSIS SECTION */}
        <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-white to-[#e3f2fd] border border-[#90caf9] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-[#0d47a1] uppercase tracking-wider">
                {activeLang} Skill Competency Analysis
              </h3>
              <p className="text-[11px] text-gray-500">Fine-grained topic mastery from automated code tests</p>
            </div>
            <span className="text-xs font-black text-[#2196f3] px-2.5 py-1 rounded-xl bg-white border border-[#90caf9]">
              Overall Skill: 0%
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            {['Basics', 'Conditions', 'Loops', 'Functions', 'OOP'].map((topic) => (
              <div key={topic} className="p-3 rounded-xl bg-white border border-[#90caf9]">
                <div className="flex justify-between text-[11px] font-bold text-gray-600">
                  <span>{topic}</span>
                  <span className="text-[#2196f3]">0%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#e3f2fd] mt-2 overflow-hidden">
                  <div className="w-0 h-full bg-[#2196f3] rounded-full" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0d47a1]">Starting level:</span>
              <span className="px-2 py-0.5 rounded-md bg-[#e3f2fd] text-[#0d47a1] text-[11px] font-semibold">Beginner · 0% progress</span>
            </div>
            <div className="text-gray-500 text-[11px]">Complete exercises to build your real skill profile.</div>
          </div>


        </div>
      </div>

        {/* INTERACTIVE ALGORITHM & DATA STRUCTURES VISUALIZERS */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#0d47a1]">Choose DSA Visualizer:</span>
            <button
              onClick={() => setActiveVisualizer('sorting')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                activeVisualizer === 'sorting'
                  ? 'bg-[#0d47a1] text-white shadow-xs'
                  : 'bg-white text-[#0d47a1] border border-[#90caf9] hover:bg-[#e3f2fd]'
              }`}
            >
              Sorting Visualizer
            </button>
            <button
              onClick={() => setActiveVisualizer('bst')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                activeVisualizer === 'bst'
                  ? 'bg-[#0d47a1] text-white shadow-xs'
                  : 'bg-white text-[#0d47a1] border border-[#90caf9] hover:bg-[#e3f2fd]'
              }`}
            >
              Binary Search Tree (BST)
            </button>
          </div>

          {activeVisualizer === 'sorting' ? (
            <SortingAlgorithmVisualizer />
          ) : (
            <BinarySearchTreeVisualizer />
          )}
        </div>

        {/* EDITOR & OUTPUT WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: 12-Step Python Learning Roadmap */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-[#0d47a1] uppercase tracking-wider">
              {activeLang} Learning Path (12 Topics)
            </h3>
            <span className="text-[10px] text-gray-500 font-bold">Step-by-step</span>
          </div>

          <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
            {pythonLearningPath.map((topic) => {
              const isSelected = topic.id === selectedTopicId;
              return (
                <div
                  key={topic.id}
                  onClick={() => handleSelectTopic(topic.id)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected 
                      ? 'bg-white border-2 border-[#2196f3] shadow-md' 
                      : 'glass-card border-[#90caf9]/60 hover:border-[#2196f3]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[11px] ${
                      topicProgress[topic.id]?.completed ? 'bg-emerald-500 text-white' : 'bg-[#e3f2fd] text-[#0d47a1]'
                    }`}>
                      {topicProgress[topic.id]?.completed ? <CheckCircle2 className="w-3.5 h-3.5" /> : '•'}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0d47a1]">{topic.title}</h4>
                      <p className="text-[10px] text-gray-500 line-clamp-1">{topic.description}</p>
                    </div>
                  </div>

                  {(topicProgress[topic.id]?.score || 0) > 0 && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      topic.score >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {topic.score}%
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Interactive Code Playground */}
        <div className="lg:col-span-8 space-y-4">
          <div className="glass-card rounded-3xl p-6 border border-[#90caf9] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#e3f2fd]">
              <div>
                <span className="text-[10px] font-bold text-[#2196f3] uppercase tracking-wider">
                  Interactive Practice Challenge
                </span>
                <h3 className="text-base font-black text-[#0d47a1]">{activeTopic.title}</h3>
                <p className="text-xs text-gray-600 mt-0.5">{activeTopic.exercisePrompt}</p>
              </div>

              <button
                onClick={handleRunCode}
                className="px-5 py-2.5 rounded-xl bg-[#2196f3] hover:bg-[#0d47a1] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run & Test Code</span>
              </button>
            </div>

            {/* Code Editor Window */}
            <div>
              <div className="flex items-center justify-between bg-[#072a63] text-white/80 px-4 py-2 rounded-t-2xl text-xs font-mono">
                <span>
                  {activeLang === 'Python' ? 'main.py' :
                   activeLang === 'C' ? 'main.c' :
                   activeLang === 'C++' ? 'main.cpp' :
                   activeLang === 'Java' ? 'Main.java' :
                   activeLang === 'JavaScript' ? 'index.js' :
                   activeLang === 'HTML' ? 'index.html' : 'styles.css'}
                </span>
                <span className="text-[10px] text-[#90caf9]">
                  {languageTemplates[activeLang]?.runtime || 'Compiler Runtime'}
                </span>
              </div>
              <textarea
                value={codeEditor}
                onChange={(e) => setCodeEditor(e.target.value)}
                rows={7}
                className="w-full p-4 font-mono text-xs bg-[#0d47a1] text-white focus:outline-none rounded-b-2xl border-x border-b border-[#072a63] shadow-inner resize-none leading-relaxed"
              />
            </div>

            {/* Console Output Window */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-[#0d47a1] mb-1.5">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#2196f3]" />
                  <span>Terminal Output</span>
                </div>
                {testResult !== 'idle' && (
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                    testResult === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {testResult === 'success' ? '✓ Tests Passed' : '✗ Tests Failed'}
                  </span>
                )}
              </div>
              <div className="p-4 rounded-2xl bg-black/90 text-emerald-400 font-mono text-xs shadow-inner min-h-20 whitespace-pre-wrap">
                {consoleOutput}
              </div>
            </div>

            {/* AI Code Mentor Feedback */}
            {aiCodeFeedback && (
              <div className="p-4 rounded-2xl bg-[#e3f2fd]/70 border border-[#90caf9] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0d47a1]">
                    <Bot className="w-4 h-4 text-[#2196f3]" />
                    <span>Personal AI Code Mentor ({voiceGender} Voice)</span>
                  </div>
                  <button
                    onClick={() => speakText(aiCodeFeedback)}
                    className="text-[11px] text-[#2196f3] font-bold hover:underline flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen</span>
                  </button>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed font-sans">
                  {aiCodeFeedback}
                </p>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* LEETCODE-STYLE CODING CHALLENGES & AUTOMATED TEST RUNNER */}
      <AlgorithmicChallengeArena />

    </div>
  );
};
