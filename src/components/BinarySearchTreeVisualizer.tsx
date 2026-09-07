import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Play, RotateCcw, Volume2, Search, Plus, Sparkles } from 'lucide-react';

interface TreeNode {
  val: number;
  left?: TreeNode;
  right?: TreeNode;
  x: number;
  y: number;
}

export const BinarySearchTreeVisualizer: React.FC = () => {
  const { speakText, voiceGender, language } = useApp();

  const [inputVal, setInputVal] = useState<string>('35');
  const [highlightedVal, setHighlightedVal] = useState<number | null>(null);
  const [visitedPath, setVisitedPath] = useState<number[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>('BST initialized with 7 balance nodes. Try inserting or searching.');

  // Preset balanced tree coordinates (SVG viewbox 0 0 500 240)
  // Root: 50 (250, 40)
  // Level 1: 30 (130, 100), 70 (370, 100)
  // Level 2: 20 (70, 180), 40 (190, 180), 60 (310, 180), 80 (430, 180)
  const defaultNodes = [
    { val: 50, x: 250, y: 40, parent: null },
    { val: 30, x: 130, y: 100, parent: 50 },
    { val: 70, x: 370, y: 100, parent: 50 },
    { val: 20, x: 70, y: 180, parent: 30 },
    { val: 40, x: 190, y: 180, parent: 30 },
    { val: 60, x: 310, y: 180, parent: 70 },
    { val: 80, x: 430, y: 180, parent: 70 },
  ];

  const [treeNodes, setTreeNodes] = useState(defaultNodes);

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSearch = async () => {
    const target = parseInt(inputVal, 10);
    if (isNaN(target)) return;

    setStatusMessage(`Searching for key ${target} using BST property: left < root < right`);
    speakText(`Searching for key ${target} in binary search tree.`);
    setVisitedPath([]);

    const path: number[] = [];
    let currVal: number | null = 50;

    // Simulate search traversal
    while (currVal !== null) {
      path.push(currVal);
      setVisitedPath([...path]);
      setHighlightedVal(currVal);
      await delay(600);

      if (target === currVal) {
        setStatusMessage(`✓ Key ${target} found! Traversal depth: ${path.length} steps. Time Complexity: O(log N).`);
        speakText(`Key ${target} found successfully in ${path.length} comparisons.`);
        return;
      } else if (target < currVal) {
        if (currVal === 50) currVal = 30;
        else if (currVal === 30) currVal = 20;
        else if (currVal === 70) currVal = 60;
        else currVal = null;
      } else {
        if (currVal === 50) currVal = 70;
        else if (currVal === 30) currVal = 40;
        else if (currVal === 70) currVal = 80;
        else currVal = null;
      }
    }

    setStatusMessage(`✗ Key ${target} not in tree. Reached null leaf node.`);
    speakText(`Key ${target} not found in binary search tree.`);
  };

  const handleReset = () => {
    setHighlightedVal(null);
    setVisitedPath([]);
    setStatusMessage('BST reset to default balanced state.');
  };

  const explainBST = () => {
    speakText("In a Binary Search Tree, for every node, keys in the left subtree are smaller, and keys in the right subtree are larger. Average search and insertion time is O of log N.");
  };

  return (
    <div className="p-5 rounded-2xl bg-white border border-[#90caf9] shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#90caf9]/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-[#0d47a1] text-white text-[10px] font-bold">
              Data Structures Lab
            </span>
            <h3 className="text-sm font-black text-[#0d47a1]">
              Binary Search Tree (BST) Traversal Visualizer
            </h3>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Logarithmic search property: Left Subtree &lt; Node &lt; Right Subtree
          </p>
        </div>

        <button
          onClick={explainBST}
          className="self-start sm:self-center px-3 py-1.5 rounded-xl bg-[#e3f2fd] text-[#0d47a1] border border-[#90caf9] hover:bg-[#90caf9]/40 text-xs font-bold flex items-center gap-1.5 transition-all"
        >
          <Volume2 className="w-3.5 h-3.5 text-[#2196f3]" />
          <span>Explain BST ({voiceGender})</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#e3f2fd] p-2.5 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#0d47a1]">Target Value:</span>
          <input
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-20 px-2.5 py-1 text-xs rounded-lg bg-white border border-[#90caf9] font-bold text-[#0d47a1] focus:outline-none focus:ring-1 focus:ring-[#2196f3]"
          />
          <button
            onClick={handleSearch}
            className="px-3 py-1 rounded-lg bg-[#2196f3] text-white text-xs font-bold hover:bg-[#0d47a1] flex items-center gap-1 shadow-xs transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search Node</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-600 font-medium">
            Try: <button onClick={() => setInputVal('40')} className="underline font-bold text-[#0d47a1]">40</button>, <button onClick={() => setInputVal('70')} className="underline font-bold text-[#0d47a1]">70</button>, <button onClick={() => setInputVal('99')} className="underline font-bold text-[#0d47a1]">99</button>
          </span>
          <button
            onClick={handleReset}
            className="p-1 rounded-lg bg-white text-[#0d47a1] border border-[#90caf9] hover:bg-gray-50"
            title="Reset Visualizer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="p-4 rounded-2xl bg-[#0d47a1] flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
        <svg viewBox="0 0 500 240" className="w-full max-w-xl h-56">
          {/* Tree Edges */}
          <line x1="250" y1="40" x2="130" y2="100" stroke="#90caf9" strokeWidth="2.5" />
          <line x1="250" y1="40" x2="370" y2="100" stroke="#90caf9" strokeWidth="2.5" />
          
          <line x1="130" y1="100" x2="70" y2="180" stroke="#90caf9" strokeWidth="2" />
          <line x1="130" y1="100" x2="190" y2="180" stroke="#90caf9" strokeWidth="2" />

          <line x1="370" y1="100" x2="310" y2="180" stroke="#90caf9" strokeWidth="2" />
          <line x1="370" y1="100" x2="430" y2="180" stroke="#90caf9" strokeWidth="2" />

          {/* Tree Nodes */}
          {treeNodes.map((node) => {
            const isHighlighted = highlightedVal === node.val;
            const isVisited = visitedPath.includes(node.val);

            return (
              <g key={node.val} className="transition-all duration-200">
                {/* Outer Glow on Highlight */}
                {isHighlighted && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="3"
                    className="animate-ping"
                  />
                )}
                {/* Node Body */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="18"
                  fill={isHighlighted ? '#ffffff' : isVisited ? '#2196f3' : '#0d47a1'}
                  stroke={isHighlighted ? '#ffffff' : '#90caf9'}
                  strokeWidth="2.5"
                  className="transition-colors duration-200"
                />
                {/* Value Text */}
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  fill={isHighlighted ? '#0d47a1' : '#ffffff'}
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {node.val}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Live Traversal Status Banner */}
        <div className="w-full mt-2 p-2 rounded-xl bg-white/10 backdrop-blur-xs text-white text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{statusMessage}</span>
          </div>
          <span className="text-[10px] text-[#90caf9] font-bold">
            Search Complexity: O(log N)
          </span>
        </div>
      </div>

      {/* Educational Properties Footnotes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-2.5 rounded-xl bg-[#e3f2fd] border border-[#90caf9]/50">
          <span className="text-[10px] font-bold text-gray-500 uppercase">BST Invariant</span>
          <p className="font-bold text-[#0d47a1] text-xs mt-0.5">Left &lt; Root &lt; Right</p>
        </div>
        <div className="p-2.5 rounded-xl bg-[#e3f2fd] border border-[#90caf9]/50">
          <span className="text-[10px] font-bold text-gray-500 uppercase">Average Search Time</span>
          <p className="font-bold text-[#0d47a1] text-xs mt-0.5">O(log N) Balanced</p>
        </div>
        <div className="p-2.5 rounded-xl bg-[#e3f2fd] border border-[#90caf9]/50">
          <span className="text-[10px] font-bold text-gray-500 uppercase">Inorder Traversal</span>
          <p className="font-bold text-[#0d47a1] text-xs mt-0.5">Yields Ascending Order</p>
        </div>
      </div>
    </div>
  );
};
