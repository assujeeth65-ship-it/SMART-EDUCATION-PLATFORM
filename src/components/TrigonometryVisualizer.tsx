import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, Compass, CheckCircle2 } from 'lucide-react';

export const TrigonometryVisualizer: React.FC = () => {
  const { speakText } = useApp();

  // Angle in degrees: 0 to 360
  const [angleDeg, setAngleDeg] = useState<number>(30);

  const angleRad = (angleDeg * Math.PI) / 180;
  const sinVal = Math.sin(angleRad);
  const cosVal = Math.cos(angleRad);
  const tanVal = Math.abs(cosVal) < 0.0001 ? null : sinVal / cosVal;

  // Quadrant determination
  let quadrant = 'Quadrant I (All ratios positive)';
  if (angleDeg > 90 && angleDeg < 180) quadrant = 'Quadrant II (Sine is positive)';
  else if (angleDeg > 180 && angleDeg < 270) quadrant = 'Quadrant III (Tangent is positive)';
  else if (angleDeg > 270 && angleDeg < 360) quadrant = 'Quadrant IV (Cosine is positive)';
  else if (angleDeg === 0 || angleDeg === 360) quadrant = 'Positive X-axis';
  else if (angleDeg === 90) quadrant = 'Positive Y-axis';
  else if (angleDeg === 180) quadrant = 'Negative X-axis';
  else if (angleDeg === 270) quadrant = 'Negative Y-axis';

  // SVG dimensions: 320x320, center (160, 160), radius R = 110px
  const center = 160;
  const R = 110;

  const pointX = center + R * cosVal;
  const pointY = center - R * sinVal;

  // Arc path for angle
  const arcRadius = 32;
  const arcEndX = center + arcRadius * Math.cos(-angleRad);
  const arcEndY = center + arcRadius * Math.sin(-angleRad);
  const largeArcFlag = angleDeg > 180 ? 1 : 0;
  const arcD = angleDeg > 0 
    ? `M ${center + arcRadius} ${center} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} 0 ${arcEndX.toFixed(1)} ${arcEndY.toFixed(1)}` 
    : '';

  const handlePreset = (deg: number, _label?: string) => {
    setAngleDeg(deg);
    speakText(`Angle set to ${deg} degrees. Sine is ${Math.sin((deg * Math.PI) / 180).toFixed(3)}, Cosine is ${Math.cos((deg * Math.PI) / 180).toFixed(3)}.`);
  };

  const handleExplain = () => {
    const s = sinVal.toFixed(3);
    const c = cosVal.toFixed(3);
    const t = tanVal !== null ? tanVal.toFixed(3) : 'Undefined (vertical asymptote)';
    const text = `At an angle of ${angleDeg} degrees, the unit circle coordinates are cosine equals ${c} on the horizontal axis and sine equals ${s} on the vertical axis. Tangent, which is sine divided by cosine, equals ${t}. Notice that sine squared plus cosine squared always equals exactly 1.`;
    speakText(text);
  };

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-6 border border-[#90caf9] space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e3f2fd]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#e3f2fd] text-[#0d47a1]">
            <Compass className="w-5 h-5 text-[#2196f3]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-black text-[#0d47a1]">
                Interactive Unit Circle & Trigonometric Ratio Simulator
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e3f2fd] text-[#0d47a1] font-bold border border-[#90caf9]">
                Live Canvas
              </span>
            </div>
            <p className="text-[11px] text-gray-500">
              Visual proof of sin(θ), cos(θ), tan(θ) and the Pythagorean Identity sin²θ + cos²θ = 1
            </p>
          </div>
        </div>

        <button
          onClick={handleExplain}
          className="px-3.5 py-1.5 rounded-xl bg-[#0d47a1] hover:bg-[#2196f3] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Explain with AI Voice</span>
        </button>
      </div>

      {/* Main Grid: SVG Canvas + Control Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* SVG Canvas */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-[#90caf9] shadow-inner">
          <svg width="320" height="320" viewBox="0 0 320 320" className="overflow-visible">
            {/* Background Grid */}
            <circle cx={center} cy={center} r={R} fill="#e3f2fd" fillOpacity="0.4" stroke="#90caf9" strokeWidth="1.5" strokeDasharray="4 4" />
            
            {/* Coordinate Axes */}
            <line x1="20" y1={center} x2="300" y2={center} stroke="#0d47a1" strokeWidth="1.5" />
            <line x1={center} y1="20" x2={center} y2="300" stroke="#0d47a1" strokeWidth="1.5" />
            
            {/* Axis Labels */}
            <text x="305" y={center + 4} fill="#0d47a1" fontSize="10" fontWeight="bold">X (cos)</text>
            <text x={center - 5} y="15" fill="#0d47a1" fontSize="10" fontWeight="bold">Y (sin)</text>
            <text x={center + R + 3} y={center + 14} fill="#64748b" fontSize="9">+1</text>
            <text x={center - R - 14} y={center + 14} fill="#64748b" fontSize="9">-1</text>
            <text x={center + 4} y={center - R - 4} fill="#64748b" fontSize="9">+1</text>
            <text x={center + 4} y={center + R + 12} fill="#64748b" fontSize="9">-1</text>

            {/* Angle Sector Arc */}
            {arcD && (
              <path d={arcD} fill="none" stroke="#2196f3" strokeWidth="2.5" />
            )}

            {/* Triangle Base: Adjacent Side (cos θ) */}
            <line
              x1={center}
              y1={center}
              x2={pointX}
              y2={center}
              stroke="#0d47a1"
              strokeWidth="3.5"
            />

            {/* Triangle Height: Opposite Side (sin θ) */}
            <line
              x1={pointX}
              y1={center}
              x2={pointX}
              y2={pointY}
              stroke="#2196f3"
              strokeWidth="3.5"
              strokeDasharray={sinVal === 0 ? 'none' : 'none'}
            />

            {/* Hypotenuse: Radius (length 1) */}
            <line
              x1={center}
              y1={center}
              x2={pointX}
              y2={pointY}
              stroke="#0d47a1"
              strokeWidth="2"
            />

            {/* Point on Circle */}
            <circle cx={pointX} cy={pointY} r="6" fill="#0d47a1" stroke="#ffffff" strokeWidth="2" />

            {/* Labels on Triangle Sides */}
            {Math.abs(cosVal) > 0.25 && (
              <text
                x={center + (R * cosVal) / 2}
                y={center + (sinVal >= 0 ? 15 : -6)}
                fill="#0d47a1"
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
              >
                cos={cosVal.toFixed(2)}
              </text>
            )}

            {Math.abs(sinVal) > 0.25 && (
              <text
                x={pointX + (cosVal >= 0 ? 8 : -32)}
                y={center - (R * sinVal) / 2}
                fill="#2196f3"
                fontSize="10"
                fontWeight="bold"
              >
                sin={sinVal.toFixed(2)}
              </text>
            )}
          </svg>

          {/* Current Angle Display */}
          <div className="mt-2 text-center">
            <span className="text-xs font-bold text-[#0d47a1]">
              θ = {angleDeg}° ({((angleDeg * Math.PI) / 180).toFixed(2)} rad)
            </span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-[11px] font-semibold text-[#2196f3]">{quadrant}</span>
          </div>
        </div>

        {/* Sliders & Computations */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Angle Slider */}
          <div className="p-4 rounded-2xl bg-white border border-[#90caf9] space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-[#0d47a1]">Rotation Angle (θ)</label>
              <span className="font-black text-sm text-[#2196f3]">{angleDeg}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={angleDeg}
              onChange={(e) => setAngleDeg(parseInt(e.target.value))}
              className="w-full h-2 bg-[#e3f2fd] rounded-lg appearance-none cursor-pointer accent-[#2196f3]"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-bold">
              <span>0°</span>
              <span>90°</span>
              <span>180°</span>
              <span>270°</span>
              <span>360°</span>
            </div>
          </div>

          {/* Standard Angle Presets */}
          <div>
            <span className="text-[10px] font-bold text-[#0d47a1] uppercase tracking-wider block mb-1.5">
              Standard NCERT / Board Angles:
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[
                { deg: 0, label: '0°' },
                { deg: 30, label: '30° (π/6)' },
                { deg: 45, label: '45° (π/4)' },
                { deg: 60, label: '60° (π/3)' },
                { deg: 90, label: '90° (π/2)' },
                { deg: 180, label: '180° (π)' }
              ].map((p) => (
                <button
                  key={p.deg}
                  onClick={() => handlePreset(p.deg, p.label)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
                    angleDeg === p.deg 
                      ? 'bg-[#0d47a1] text-white border-[#0d47a1] shadow-xs' 
                      : 'bg-white text-[#0d47a1] border-[#90caf9] hover:bg-[#e3f2fd]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Computed Values */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="p-3 rounded-2xl bg-[#e3f2fd]/60 border border-[#90caf9]">
              <span className="text-[10px] font-bold text-[#0d47a1] uppercase">sin(θ)</span>
              <p className="text-base font-black text-[#2196f3] mt-0.5">{sinVal.toFixed(3)}</p>
              <span className="text-[9px] text-gray-500 font-semibold">Opp / Hyp</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#e3f2fd]/60 border border-[#90caf9]">
              <span className="text-[10px] font-bold text-[#0d47a1] uppercase">cos(θ)</span>
              <p className="text-base font-black text-[#0d47a1] mt-0.5">{cosVal.toFixed(3)}</p>
              <span className="text-[9px] text-gray-500 font-semibold">Adj / Hyp</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#e3f2fd]/60 border border-[#90caf9]">
              <span className="text-[10px] font-bold text-[#0d47a1] uppercase">tan(θ)</span>
              <p className="text-base font-black text-[#0d47a1] mt-0.5">
                {tanVal !== null ? tanVal.toFixed(3) : 'Undefined'}
              </p>
              <span className="text-[9px] text-gray-500 font-semibold">sin / cos</span>
            </div>
          </div>

          {/* Pythagorean Identity Card */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#90caf9] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2196f3]" />
              <div>
                <span className="font-bold text-[#0d47a1]">Pythagorean Identity:</span>
                <p className="text-[11px] text-gray-500 font-mono">
                  ({sinVal.toFixed(2)})² + ({cosVal.toFixed(2)})² = 1.000
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
              Verified
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
