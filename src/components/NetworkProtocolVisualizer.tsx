import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Network, 
  Play, 
  RotateCcw, 
  Volume2, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Zap,
  ArrowRight,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const NetworkProtocolVisualizer: React.FC = () => {
  const { speakText } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'crc' | 'sliding-window'>('crc');

  // CRC State
  const [dataBits, setDataBits] = useState<string>('1101011011');
  const [generatorPoly, setGeneratorPoly] = useState<string>('10011'); // CRC-4 (x^4 + x + 1)
  const [injectedErrorIndex, setInjectedErrorIndex] = useState<number | null>(null);

  // Compute CRC Modulo-2 Division
  const calculateCRC = (data: string, poly: string) => {
    const k = poly.length - 1;
    const augmented = data + '0'.repeat(k);
    const cur = augmented.split('');

    const steps: { stepNum: number; remainder: string; quotientBit: string }[] = [];

    for (let i = 0; i < data.length; i++) {
      if (cur[i] === '1') {
        steps.push({
          stepNum: i,
          remainder: cur.slice(i, i + poly.length).join(''),
          quotientBit: '1'
        });
        for (let j = 0; j < poly.length; j++) {
          cur[i + j] = cur[i + j] === poly[j] ? '0' : '1';
        }
      } else {
        steps.push({
          stepNum: i,
          remainder: cur.slice(i, i + poly.length).join(''),
          quotientBit: '0'
        });
      }
    }

    const checksum = cur.slice(data.length).join('');
    return { augmented, checksum, steps: steps.slice(0, 4) };
  };

  const crcResult = calculateCRC(dataBits, generatorPoly);
  const transmittedFrame = dataBits + crcResult.checksum;

  // Received frame with optional error
  let receivedFrame = transmittedFrame;
  if (injectedErrorIndex !== null && injectedErrorIndex < transmittedFrame.length) {
    const bits = transmittedFrame.split('');
    bits[injectedErrorIndex] = bits[injectedErrorIndex] === '1' ? '0' : '1';
    receivedFrame = bits.join('');
  }

  // Verify received frame
  const verifyCRC = (received: string, poly: string) => {
    const cur = received.split('');
    for (let i = 0; i <= received.length - poly.length; i++) {
      if (cur[i] === '1') {
        for (let j = 0; j < poly.length; j++) {
          cur[i + j] = cur[i + j] === poly[j] ? '0' : '1';
        }
      }
    }
    const remainder = cur.slice(received.length - (poly.length - 1)).join('');
    const isValid = remainder.split('').every(b => b === '0');
    return { isValid, remainder };
  };

  const verification = verifyCRC(receivedFrame, generatorPoly);

  // Sliding Window State
  const [windowSize, setWindowSize] = useState<number>(4);
  const [windowStart, setWindowStart] = useState<number>(0);
  const totalFrames = 8;

  const handleNextWindow = () => {
    if (windowStart + windowSize < totalFrames) {
      setWindowStart(prev => prev + 1);
      speakText(`Window slid forward. Frame ${windowStart} acknowledged.`);
    } else {
      setWindowStart(0);
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
      speakText("All 8 frames successfully transmitted and acknowledged via sliding window protocol.");
    }
  };

  const handleExplainCRC = () => {
    speakText(
      `In CRC modulo 2 division, we append ${generatorPoly.length - 1} zeros to the data bits, then perform sequential XOR subtraction with the generator polynomial. The remainder ${crcResult.checksum} forms the checksum appended to the transmitted frame. If even a single bit changes in transit, the receiver's remainder becomes non-zero, immediately flagging corruption.`
    );
  };

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-6 border border-[#90caf9] space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e3f2fd]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#e3f2fd] text-[#0d47a1]">
            <Network className="w-5 h-5 text-[#2196f3]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-black text-[#0d47a1]">
                Data Link Layer Protocol & Error Detection Simulator
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e3f2fd] text-[#0d47a1] font-bold border border-[#90caf9]">
                Unit 2: CS8591
              </span>
            </div>
            <p className="text-[11px] text-gray-500">
              Interactive Modulo-2 CRC Polynomial Division & Sliding Window Protocol (Go-Back-N / Selective Repeat)
            </p>
          </div>
        </div>

        {/* Sub-tab switcher */}
        <div className="flex items-center gap-2">
          <div className="flex bg-[#e3f2fd] p-1 rounded-2xl border border-[#90caf9] text-xs font-bold">
            <button
              onClick={() => setActiveSubTab('crc')}
              className={`px-3 py-1 rounded-xl transition-all ${
                activeSubTab === 'crc' ? 'bg-[#0d47a1] text-white shadow-xs' : 'text-[#0d47a1]'
              }`}
            >
              CRC Modulo-2
            </button>
            <button
              onClick={() => setActiveSubTab('sliding-window')}
              className={`px-3 py-1 rounded-xl transition-all ${
                activeSubTab === 'sliding-window' ? 'bg-[#0d47a1] text-white shadow-xs' : 'text-[#0d47a1]'
              }`}
            >
              Sliding Window
            </button>
          </div>

          <button
            onClick={handleExplainCRC}
            className="p-2 rounded-xl bg-[#0d47a1] hover:bg-[#2196f3] text-white text-xs font-bold transition-all shadow-xs"
            title="Listen to AI Explanation"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* TAB 1: CRC POLYNOMIAL DIVISION */}
      {activeSubTab === 'crc' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Input Controls */}
            <div className="p-4 rounded-2xl bg-white border border-[#90caf9] space-y-3 text-xs">
              <span className="font-bold text-[#0d47a1] uppercase tracking-wider block">
                Sender Side: Frame & Polynomial
              </span>

              <div>
                <label className="block text-gray-600 font-semibold mb-1">
                  Data Stream Bits (M)
                </label>
                <input
                  type="text"
                  value={dataBits}
                  onChange={(e) => {
                    const filtered = e.target.value.replace(/[^01]/g, '');
                    if (filtered) setDataBits(filtered);
                  }}
                  className="w-full font-mono px-3 py-1.5 rounded-xl bg-[#e3f2fd]/50 border border-[#90caf9] text-[#0d47a1] font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-semibold mb-1">
                  Generator Polynomial (G)
                </label>
                <select
                  value={generatorPoly}
                  onChange={(e) => setGeneratorPoly(e.target.value)}
                  className="w-full font-mono px-3 py-1.5 rounded-xl bg-[#e3f2fd]/50 border border-[#90caf9] text-[#0d47a1] font-bold focus:outline-none"
                >
                  <option value="10011">CRC-4: 10011 (x⁴ + x + 1)</option>
                  <option value="100000111">CRC-8: 100000111 (x⁸ + x² + x + 1)</option>
                  <option value="1101">Standard: 1101 (x³ + x² + 1)</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-[#e3f2fd]/60 border border-[#90caf9] text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Augmented Bits:</span>
                  <span className="font-mono font-bold text-[#0d47a1]">{crcResult.augmented}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Calculated FCS Checksum (R):</span>
                  <span className="font-mono font-bold text-[#2196f3]">{crcResult.checksum}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transmitted Frame (T):</span>
                  <span className="font-mono font-bold text-[#0d47a1]">{transmittedFrame}</span>
                </div>
              </div>
            </div>

            {/* Receiver Side & Error Injection */}
            <div className="p-4 rounded-2xl bg-white border border-[#90caf9] space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0d47a1] uppercase tracking-wider">
                  Receiver Verification Channel
                </span>
                <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                  verification.isValid ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}>
                  {verification.isValid ? '✓ Data Frame Valid' : '⚠ Corruption Detected!'}
                </span>
              </div>

              <div>
                <label className="block text-gray-600 font-semibold mb-1">
                  Received Bits (Click any bit to inject bit-flip noise):
                </label>
                <div className="flex flex-wrap gap-1 p-2 rounded-xl bg-[#e3f2fd]/30 border border-[#90caf9]">
                  {receivedFrame.split('').map((bit, idx) => {
                    const isCorrupted = injectedErrorIndex === idx;
                    const isFCS = idx >= dataBits.length;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if (injectedErrorIndex === idx) setInjectedErrorIndex(null);
                          else setInjectedErrorIndex(idx);
                        }}
                        className={`w-6 h-7 rounded-md font-mono font-bold text-xs flex items-center justify-center transition-all ${
                          isCorrupted 
                            ? 'bg-red-600 text-white animate-bounce' 
                            : isFCS
                              ? 'bg-[#2196f3] text-white'
                              : 'bg-white border border-[#90caf9] text-[#0d47a1] hover:bg-[#e3f2fd]'
                        }`}
                        title={isFCS ? `FCS bit (index ${idx})` : `Data bit (index ${idx})`}
                      >
                        {bit}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  Blue bits = CRC Checksum • White bits = Data Stream
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#90caf9] text-[11px] space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Receiver Modulo-2 Remainder:</span>
                  <span className={`font-mono font-bold ${
                    verification.isValid ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {verification.remainder}
                  </span>
                </div>
                <p className="text-[11px] text-gray-600">
                  {verification.isValid 
                    ? 'All syndrome remainder bits are zero. Frame accepted with 100% integrity.' 
                    : `Non-zero syndrome detected (${verification.remainder}). Frame rejected; NAK sent for automatic retransmission.`}
                </p>
              </div>

              {injectedErrorIndex !== null && (
                <button
                  onClick={() => setInjectedErrorIndex(null)}
                  className="w-full py-1.5 rounded-xl bg-[#e3f2fd] text-[#0d47a1] font-bold text-xs hover:bg-[#90caf9]/40 transition-colors"
                >
                  Clear Noise & Restore Frame
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: SLIDING WINDOW PROTOCOL */}
      {activeSubTab === 'sliding-window' && (
        <div className="p-4 rounded-2xl bg-white border border-[#90caf9] space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e3f2fd]">
            <div>
              <span className="font-bold text-[#0d47a1] uppercase tracking-wider block">
                Sliding Window Flow Control Simulation (Go-Back-N)
              </span>
              <p className="text-gray-500 text-[11px]">
                Window Size W = {windowSize}. Sender can transmit up to {windowSize} unacknowledged frames.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-gray-600 font-bold">Window Size:</label>
              <select
                value={windowSize}
                onChange={(e) => {
                  setWindowSize(parseInt(e.target.value));
                  setWindowStart(0);
                }}
                className="px-2 py-1 rounded-xl bg-[#e3f2fd] border border-[#90caf9] font-bold text-[#0d47a1]"
              >
                <option value="2">W = 2</option>
                <option value="3">W = 3</option>
                <option value="4">W = 4</option>
              </select>
            </div>
          </div>

          {/* Frames Buffer Visualizer */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-gray-500 uppercase">Frame Sequence Buffer (0 to 7):</span>
            <div className="grid grid-cols-8 gap-2">
              {Array.from({ length: totalFrames }).map((_, idx) => {
                const isAcked = idx < windowStart;
                const inWindow = idx >= windowStart && idx < windowStart + windowSize;
                const isPending = idx >= windowStart + windowSize;

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl text-center border transition-all ${
                      inWindow 
                        ? 'bg-gradient-to-b from-[#e3f2fd] to-white border-2 border-[#2196f3] shadow-md' 
                        : isAcked
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : 'bg-gray-50 border-gray-200 text-gray-400'
                    }`}
                  >
                    <span className="text-[9px] font-bold uppercase block">
                      {isAcked ? 'ACKed' : inWindow ? 'In Window' : 'Pending'}
                    </span>
                    <p className={`text-base font-black mt-1 ${
                      inWindow ? 'text-[#0d47a1]' : isAcked ? 'text-emerald-700' : 'text-gray-400'
                    }`}>
                      #{idx}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="text-[11px] text-gray-600">
              Active Sender Window: <strong className="text-[#0d47a1]">Frames [#{windowStart} ... #{Math.min(windowStart + windowSize - 1, totalFrames - 1)}]</strong>
            </div>

            <button
              onClick={handleNextWindow}
              className="px-5 py-2 rounded-xl bg-[#2196f3] hover:bg-[#0d47a1] text-white font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Slide Window (ACK Frame #{windowStart})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
