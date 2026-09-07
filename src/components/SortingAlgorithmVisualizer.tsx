import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Play, RotateCcw, Volume2, Sparkles, ChevronRight } from 'lucide-react';

export const SortingAlgorithmVisualizer: React.FC = () => {
  const { speakText, voiceGender } = useApp();

  const initialArray = [42, 17, 89, 33, 56, 12, 74, 25];
  const [array, setArray] = useState<number[]>(initialArray);
  const [algorithm, setAlgorithm] = useState<'bubble' | 'selection' | 'insertion'>('bubble');
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [stepCount, setStepCount] = useState<number>(0);
  const [comparisons, setComparisons] = useState<number>(0);

  const resetArray = () => {
    setIsSorting(false);
    setArray([...initialArray]);
    setActiveIndices([]);
    setSortedIndices([]);
    setStepCount(0);
    setComparisons(0);
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const runBubbleSort = async () => {
    setIsSorting(true);
    speakText(`Running Bubble Sort simulation. Watch adjacent elements compare and swap into ascending order.`);
    const arr = [...array];
    const n = arr.length;
    let comps = 0;
    let steps = 0;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        comps++;
        setComparisons(comps);
        await delay(250);

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          steps++;
          setStepCount(steps);
          setArray([...arr]);
          await delay(250);
        }
      }
      setSortedIndices((prev) => [...prev, n - i - 1]);
    }
    setSortedIndices([0, 1, 2, 3, 4, 5, 6, 7]);
    setActiveIndices([]);
    setIsSorting(false);
    speakText("Bubble sort complete. Time complexity is O of N squared.");
  };

  const runSelectionSort = async () => {
    setIsSorting(true);
    speakText(`Running Selection Sort simulation. Finding the minimum element in each pass.`);
    const arr = [...array];
    const n = arr.length;
    let comps = 0;
    let steps = 0;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        setActiveIndices([minIdx, j]);
        comps++;
        setComparisons(comps);
        await delay(200);

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        const temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        steps++;
        setStepCount(steps);
        setArray([...arr]);
        await delay(250);
      }
      setSortedIndices((prev) => [...prev, i]);
    }
    setSortedIndices([0, 1, 2, 3, 4, 5, 6, 7]);
    setActiveIndices([]);
    setIsSorting(false);
    speakText("Selection sort complete. Exactly N passes executed.");
  };

  const explainComplexity = () => {
    if (algorithm === 'bubble') {
      speakText("Bubble sort compares adjacent pairs and swaps them. Worst and average time complexity is O of N squared, with O of 1 auxiliary space.");
    } else if (algorithm === 'selection') {
      speakText("Selection sort repeatedly finds the minimum element and places it at the beginning. Time complexity is always O of N squared.");
    } else {
      speakText("Insertion sort builds the sorted array one element at a time, performing well on nearly sorted sequences with best case O of N.");
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-white border border-[#90caf9] shadow-sm space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#90caf9]/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-[#0d47a1] text-white text-[10px] font-bold">
              Interactive Lab
            </span>
            <h3 className="text-sm font-black text-[#0d47a1]">
              Data Structures & Algorithms: Sorting Visualizer
            </h3>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Step-by-step visual execution of array sorting algorithms with live comparison counters
          </p>
        </div>

        {/* Audio explain */}
        <button
          onClick={explainComplexity}
          className="self-start sm:self-center px-3 py-1.5 rounded-xl bg-[#e3f2fd] text-[#0d47a1] border border-[#90caf9] hover:bg-[#90caf9]/40 text-xs font-bold flex items-center gap-1.5 transition-all"
        >
          <Volume2 className="w-3.5 h-3.5 text-[#2196f3]" />
          <span>Explain ({voiceGender})</span>
        </button>
      </div>

      {/* Algorithm Selector & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-[#e3f2fd] p-1 rounded-xl">
          <button
            onClick={() => { setAlgorithm('bubble'); resetArray(); }}
            disabled={isSorting}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              algorithm === 'bubble' ? 'bg-[#2196f3] text-white shadow-xs' : 'text-[#0d47a1] hover:bg-white/60'
            }`}
          >
            Bubble Sort
          </button>
          <button
            onClick={() => { setAlgorithm('selection'); resetArray(); }}
            disabled={isSorting}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              algorithm === 'selection' ? 'bg-[#2196f3] text-white shadow-xs' : 'text-[#0d47a1] hover:bg-white/60'
            }`}
          >
            Selection Sort
          </button>
        </div>

        {/* Execution Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (algorithm === 'bubble') runBubbleSort();
              else runSelectionSort();
            }}
            disabled={isSorting}
            className="px-4 py-1.5 rounded-xl bg-[#0d47a1] text-white text-xs font-bold hover:bg-[#2196f3] disabled:opacity-50 flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isSorting ? 'Sorting...' : 'Start Sorting Simulation'}</span>
          </button>

          <button
            onClick={resetArray}
            disabled={isSorting}
            className="p-1.5 rounded-xl bg-[#e3f2fd] text-[#0d47a1] border border-[#90caf9] hover:bg-[#90caf9]/40 disabled:opacity-50"
            title="Reset Array"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bar Chart Visualization Canvas */}
      <div className="p-6 rounded-2xl bg-[#0d47a1] text-white flex flex-col items-center justify-end h-56 relative overflow-hidden">
        
        {/* Metric Overlay */}
        <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-xs text-[#90caf9]">
          <div className="flex items-center gap-3 font-mono">
            <span>Comparisons: <strong className="text-white">{comparisons}</strong></span>
            <span>Swaps: <strong className="text-white">{stepCount}</strong></span>
          </div>
          <span className="font-bold uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded text-[10px] text-white">
            {algorithm.toUpperCase()} • O(N²)
          </span>
        </div>

        {/* Array Bars */}
        <div className="w-full flex items-end justify-center gap-3 sm:gap-4 h-36">
          {array.map((val, idx) => {
            const isActive = activeIndices.includes(idx);
            const isSorted = sortedIndices.includes(idx);

            let barColor = 'bg-[#90caf9]';
            if (isActive) barColor = 'bg-white shadow-lg ring-2 ring-white scale-105';
            else if (isSorted) barColor = 'bg-[#2196f3]';

            return (
              <div key={idx} className="flex-1 max-w-10 flex flex-col items-center gap-1.5 transition-all duration-150">
                <span className="text-[10px] font-bold font-mono text-white/90">
                  {val}
                </span>
                <div
                  className={`w-full rounded-t-lg transition-all duration-150 ${barColor}`}
                  style={{ height: `${(val / 95) * 110}px` }}
                />
                <span className="text-[9px] text-[#90caf9]/70 font-mono">
                  [{idx}]
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Algorithm Characteristics Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-2.5 rounded-xl bg-[#e3f2fd] border border-[#90caf9]/50">
          <span className="text-[10px] font-bold text-gray-500 uppercase">Time Complexity</span>
          <p className="font-black text-[#0d47a1] text-xs mt-0.5">O(N²) Worst / Average</p>
        </div>
        <div className="p-2.5 rounded-xl bg-[#e3f2fd] border border-[#90caf9]/50">
          <span className="text-[10px] font-bold text-gray-500 uppercase">Space Complexity</span>
          <p className="font-black text-[#0d47a1] text-xs mt-0.5">O(1) Auxiliary Memory</p>
        </div>
        <div className="p-2.5 rounded-xl bg-[#e3f2fd] border border-[#90caf9]/50">
          <span className="text-[10px] font-bold text-gray-500 uppercase">Stability</span>
          <p className="font-black text-[#0d47a1] text-xs mt-0.5">
            {algorithm === 'bubble' ? 'Stable Sort' : 'Unstable Sort'}
          </p>
        </div>
      </div>

    </div>
  );
};
