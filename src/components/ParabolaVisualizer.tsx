import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, TrendingUp } from 'lucide-react';

export const ParabolaVisualizer: React.FC = () => {
  const { speakText, voiceGender } = useApp();

  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-5);
  const [c, setC] = useState<number>(6);

  // Compute Discriminant
  const discriminant = b * b - 4 * a * c;

  // Compute Roots
  let root1: number | null = null;
  let root2: number | null = null;
  let rootType = '';

  if (a !== 0) {
    if (discriminant > 0) {
      root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      rootType = 'Two Distinct Real Roots (Crosses x-axis twice)';
    } else if (discriminant === 0) {
      root1 = -b / (2 * a);
      root2 = root1;
      rootType = 'Two Equal Real Roots (Touches x-axis at vertex)';
    } else {
      rootType = 'No Real Roots (Curve never touches x-axis)';
    }
  }

  // Vertex
  const vertexX = a !== 0 ? -b / (2 * a) : 0;
  const vertexY = a !== 0 ? a * vertexX * vertexX + b * vertexX + c : 0;

  // SVG coordinate transformation
  // SVG dimensions 400x260, origin at (200, 130), scale 14px per unit
  const svgWidth = 400;
  const svgHeight = 260;
  const originX = 200;
  const originY = 130;
  const scale = 14;

  const toSvgX = (xVal: number) => originX + xVal * scale;
  const toSvgY = (yVal: number) => originY - yVal * scale;

  // Generate SVG path for parabola curve from x = -10 to x = 10
  const points: string[] = [];
  for (let x = -10; x <= 10; x += 0.25) {
    const y = a * x * x + b * x + c;
    const sx = toSvgX(x);
    const sy = toSvgY(y);
    if (sy >= -50 && sy <= svgHeight + 50) {
      points.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
    }
  }
  const pathD = points.length > 0 ? `M ${points.join(' L ')}` : '';

  const handlePreset = (presetA: number, presetB: number, presetC: number, label: string) => {
    setA(presetA);
    setB(presetB);
    setC(presetC);
    speakText(`Loaded preset: ${label}. Notice how the graph and discriminant update in real-time.`);
  };

  const handleExplain = () => {
    const dVal = discriminant;
    let message = `Currently, a is ${a}, b is ${b}, and c is ${c}. The discriminant D is b squared minus 4 a c, which equals ${dVal}. `;
    if (dVal > 0) {
      message += `Because D is positive, the parabola intersects the x-axis at two distinct real points: x equals ${root1?.toFixed(2)} and ${root2?.toFixed(2)}.`;
    } else if (dVal === 0) {
      message += `Because D is exactly zero, the parabola's vertex touches the x-axis at a single coincident point x equals ${root1?.toFixed(2)}.`;
    } else {
      message += `Because D is negative, the curve floats entirely away from the x-axis, meaning there are no real solutions!`;
    }
    speakText(message);
  };

  return (
    <div className="glass-card rounded-3xl p-6 border border-[#90caf9] space-y-6 shadow-md">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e3f2fd]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#2196f3] uppercase tracking-wider">
            <TrendingUp className="w-4 h-4" />
            <span>Interactive Visualizer • Concept 6</span>
          </div>
          <h3 className="text-base font-black text-[#0d47a1] mt-0.5">
            Parabola Graph & Discriminant Dynamics
          </h3>
          <p className="text-xs text-gray-500">
            See how coefficients <strong>a, b, c</strong> dictate the parabola vertex and roots ($x$-intercepts).
          </p>
        </div>

        <button
          onClick={handleExplain}
          className="px-4 py-1.5 rounded-xl bg-[#2196f3] hover:bg-[#0d47a1] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Explain Dynamics ({voiceGender})</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left: Controls & Sliders */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Active Equation Display */}
          <div className="p-3 rounded-2xl bg-[#e3f2fd] border border-[#90caf9] text-center">
            <span className="text-[10px] font-bold text-gray-500 uppercase">Live Equation</span>
            <p className="text-lg font-black text-[#0d47a1] font-mono mt-0.5">
              {a}x² {b >= 0 ? `+ ${b}x` : `- ${Math.abs(b)}x`} {c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`} = 0
            </p>
          </div>

          {/* Slider for a */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-[#0d47a1]">
              <span>Coefficient a (Curvature & Direction)</span>
              <span className="font-mono px-2 py-0.5 bg-white rounded-md border border-[#90caf9]">{a}</span>
            </div>
            <input
              type="range"
              min={-4}
              max={4}
              step={1}
              value={a}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setA(val === 0 ? 1 : val); // prevent a=0
              }}
              className="w-full accent-[#2196f3] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>Opens Down (a &lt; 0)</span>
              <span>Opens Up (a &gt; 0)</span>
            </div>
          </div>

          {/* Slider for b */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-[#0d47a1]">
              <span>Coefficient b (Horizontal Shift)</span>
              <span className="font-mono px-2 py-0.5 bg-white rounded-md border border-[#90caf9]">{b}</span>
            </div>
            <input
              type="range"
              min={-8}
              max={8}
              step={1}
              value={b}
              onChange={(e) => setB(parseInt(e.target.value))}
              className="w-full accent-[#2196f3] cursor-pointer"
            />
          </div>

          {/* Slider for c */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-[#0d47a1]">
              <span>Constant c (y-intercept)</span>
              <span className="font-mono px-2 py-0.5 bg-white rounded-md border border-[#90caf9]">{c}</span>
            </div>
            <input
              type="range"
              min={-10}
              max={10}
              step={1}
              value={c}
              onChange={(e) => setC(parseInt(e.target.value))}
              className="w-full accent-[#2196f3] cursor-pointer"
            />
          </div>

          {/* Quick Preset Buttons */}
          <div className="pt-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
              Quick Concept Presets:
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <button
                onClick={() => handlePreset(1, -5, 6, "Two Distinct Roots")}
                className="p-1.5 rounded-lg bg-white hover:bg-[#e3f2fd] border border-[#90caf9] text-[11px] font-bold text-[#0d47a1] transition-colors truncate"
              >
                D &gt; 0 (2 Roots)
              </button>
              <button
                onClick={() => handlePreset(1, -4, 4, "Equal Real Roots")}
                className="p-1.5 rounded-lg bg-white hover:bg-[#e3f2fd] border border-[#90caf9] text-[11px] font-bold text-[#0d47a1] transition-colors truncate"
              >
                D = 0 (1 Root)
              </button>
              <button
                onClick={() => handlePreset(1, 2, 5, "No Real Roots")}
                className="p-1.5 rounded-lg bg-white hover:bg-[#e3f2fd] border border-[#90caf9] text-[11px] font-bold text-[#0d47a1] transition-colors truncate"
              >
                D &lt; 0 (0 Real Roots)
              </button>
              <button
                onClick={() => handlePreset(-1, 4, -3, "Inverted Parabola")}
                className="p-1.5 rounded-lg bg-white hover:bg-[#e3f2fd] border border-[#90caf9] text-[11px] font-bold text-[#0d47a1] transition-colors truncate"
              >
                Inverted (a &lt; 0)
              </button>
            </div>
          </div>

        </div>

        {/* Right: SVG Canvas & Discriminant Dashboard */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Real-time Math Diagnostics Banner */}
          <div className="p-4 rounded-2xl bg-white border border-[#90caf9] grid grid-cols-2 sm:grid-cols-3 gap-3 text-center text-xs">
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Discriminant (D)</span>
              <p className={`text-base font-black font-mono mt-0.5 ${
                discriminant > 0 ? 'text-[#0d47a1]' : discriminant === 0 ? 'text-[#2196f3]' : 'text-amber-600'
              }`}>
                D = {discriminant}
              </p>
              <span className="text-[10px] text-gray-500 font-semibold">b² - 4ac</span>
            </div>

            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Root Values</span>
              <p className="text-base font-black text-[#0d47a1] font-mono mt-0.5">
                {discriminant > 0 
                  ? `x₁=${root1?.toFixed(1)}, x₂=${root2?.toFixed(1)}` 
                  : discriminant === 0 
                  ? `x = ${root1?.toFixed(1)}` 
                  : 'Non-real roots'}
              </p>
              <span className="text-[10px] text-gray-500 font-semibold">x-intercepts</span>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] text-gray-400 font-bold uppercase">Vertex Point</span>
              <p className="text-base font-black text-[#2196f3] font-mono mt-0.5">
                ({vertexX.toFixed(1)}, {vertexY.toFixed(1)})
              </p>
              <span className="text-[10px] text-gray-500 font-semibold">(-b/2a, y)</span>
            </div>
          </div>

          {/* SVG Graph Canvas */}
          <div className="rounded-2xl bg-[#0a2540] p-2 shadow-inner border border-[#90caf9]/50 relative overflow-hidden">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-56 sm:h-64 select-none"
            >
              {/* Grid Lines */}
              <defs>
                <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
                  <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(144, 202, 249, 0.12)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width={svgWidth} height={svgHeight} fill="url(#grid)" />

              {/* X Axis */}
              <line
                x1={0}
                y1={originY}
                x2={svgWidth}
                y2={originY}
                stroke="#90caf9"
                strokeWidth="1.5"
                opacity={0.8}
              />
              <text x={svgWidth - 16} y={originY - 6} fill="#90caf9" fontSize="10" fontWeight="bold">X</text>

              {/* Y Axis */}
              <line
                x1={originX}
                y1={0}
                x2={originX}
                y2={svgHeight}
                stroke="#90caf9"
                strokeWidth="1.5"
                opacity={0.8}
              />
              <text x={originX + 8} y={14} fill="#90caf9" fontSize="10" fontWeight="bold">Y</text>

              {/* Plotted Parabola Path */}
              {pathD && (
                <path
                  d={pathD}
                  fill="none"
                  stroke="#2196f3"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              )}

              {/* Mark Roots (x-intercepts) if real */}
              {discriminant >= 0 && root1 !== null && (
                <g>
                  <circle
                    cx={toSvgX(root1)}
                    cy={originY}
                    r="5"
                    fill="#e3f2fd"
                    stroke="#2196f3"
                    strokeWidth="2"
                  />
                  <text
                    x={toSvgX(root1)}
                    y={originY + 16}
                    fill="#e3f2fd"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    x={root1.toFixed(1)}
                  </text>
                </g>
              )}

              {discriminant > 0 && root2 !== null && root2 !== root1 && (
                <g>
                  <circle
                    cx={toSvgX(root2)}
                    cy={originY}
                    r="5"
                    fill="#e3f2fd"
                    stroke="#2196f3"
                    strokeWidth="2"
                  />
                  <text
                    x={toSvgX(root2)}
                    y={originY + 16}
                    fill="#e3f2fd"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    x={root2.toFixed(1)}
                  </text>
                </g>
              )}

              {/* Mark Vertex */}
              <circle
                cx={toSvgX(vertexX)}
                cy={toSvgY(vertexY)}
                r="4"
                fill="#ffffff"
                stroke="#0d47a1"
                strokeWidth="2"
              />
            </svg>

            {/* Sub-label overlay */}
            <div className="absolute bottom-2 left-3 text-[10px] text-[#90caf9] font-mono">
              Status: {rootType}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
