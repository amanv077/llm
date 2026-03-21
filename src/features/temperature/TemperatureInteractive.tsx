"use client";

import { useState } from "react";
import { Thermometer } from "lucide-react";

type SampleOutput = { temp: number; output: string };

const PROMPT = "Complete this sentence: The best way to learn programming is...";

const SAMPLES: Record<string, string[]> = {
  "0.0": [
    "...to practice every day with consistent, structured exercises.",
    "...to practice every day with consistent, structured exercises.",
    "...to practice every day with consistent, structured exercises.",
  ],
  "0.3": [
    "...to practice every day with structured exercises and real projects.",
    "...to build real projects and learn from your mistakes systematically.",
    "...to practice consistently and read others' code to understand patterns.",
  ],
  "0.7": [
    "...to build something you actually want to use and learn as you go.",
    "...to embrace failure, ship small projects, and never stop being curious.",
    "...to write messy code that works, then make it elegant over time.",
  ],
  "1.0": [
    "...to dance with uncertainty and let your neurons rewire in code-flavored chaos.",
    "...to throw spaghetti at the compiler until something beautiful emerges from the stack.",
    "...to forget sleep, befriend stack overflow, and question every variable name.",
  ],
};

function getOutputForTemp(temp: number, variantIdx: number): string {
  const key = temp <= 0.15 ? "0.0" : temp <= 0.5 ? "0.3" : temp <= 0.85 ? "0.7" : "1.0";
  const arr = SAMPLES[key];
  return arr[variantIdx % arr.length];
}

function getTempLabel(temp: number): { label: string; color: string; emoji: string } {
  if (temp <= 0.2) return { label: "Deterministic", color: "#6366f1", emoji: "🎯" };
  if (temp <= 0.5) return { label: "Focused", color: "#0d7cf2", emoji: "🔍" };
  if (temp <= 0.8) return { label: "Creative", color: "#f59e0b", emoji: "✨" };
  return { label: "Wild", color: "#ef4444", emoji: "🔥" };
}

export function TemperatureInteractive() {
  const [temp, setTemp] = useState(0.7);
  const [variants, setVariants] = useState([0, 1, 2]);

  const regenerate = () => {
    setVariants(prev => prev.map(v => v + 3));
  };

  const { label, color, emoji } = getTempLabel(temp);

  return (
    <div className="rounded-2xl border border-[#e2e8f0] overflow-hidden bg-white shadow-sm my-8">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-[#fff7ed] to-[#f8fafc] border-b border-[#e2e8f0]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-[#0f172a] text-base flex items-center gap-2">
              🌡️ Temperature Simulator
            </h3>
            <p className="text-[13px] text-[#475569] mt-0.5">
              Same prompt, different temperatures → different outputs
            </p>
          </div>
          <div
            className="text-right px-4 py-2 rounded-xl"
            style={{ backgroundColor: color + "15" }}
          >
            <div className="text-2xl font-black" style={{ color }}>{temp.toFixed(1)}</div>
            <div className="text-[11px]" style={{ color }}>{emoji} {label}</div>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="px-6 py-4 border-b border-[#f1f5f9]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] text-[#94a3b8]">0.0 — Deterministic</span>
          <span className="text-[12px] text-[#94a3b8]">1.0 — Wild</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={temp}
          onChange={(e) => setTemp(parseFloat(e.target.value))}
          className="w-full h-2 rounded-full cursor-pointer accent-[#0d7cf2]"
          style={{
            background: `linear-gradient(to right, #0d7cf2 0%, #0d7cf2 ${temp * 100}%, #e2e8f0 ${temp * 100}%, #e2e8f0 100%)`,
          }}
        />
        <div className="flex justify-between mt-1">
          {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].map((v) => (
            <button
              key={v}
              onClick={() => setTemp(v)}
              className="w-1 h-1 rounded-full transition-all"
              style={{ backgroundColor: temp === v ? color : "#e2e8f0", transform: temp === v ? "scale(2)" : "none" }}
            />
          ))}
        </div>
      </div>

      {/* Prompt */}
      <div className="px-6 py-3 bg-[#f8fafc] border-b border-[#f1f5f9]">
        <div className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wide mb-1">Prompt</div>
        <p className="text-[13px] text-[#475569] font-mono">{PROMPT}</p>
      </div>

      {/* Outputs */}
      <div className="px-6 py-4 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[12px] font-semibold text-[#475569]">3 Sample Outputs</div>
          <button
            onClick={regenerate}
            className="text-[12px] text-[#0d7cf2] hover:underline flex items-center gap-1"
          >
            ↻ Regenerate
          </button>
        </div>
        {variants.map((v, i) => (
          <div
            key={i}
            className="p-3 rounded-lg border text-[13px] text-[#0f172a] leading-relaxed"
            style={{ borderColor: color + "33", backgroundColor: color + "05" }}
          >
            <span className="text-[10px] font-semibold uppercase tracking-wide mr-2 opacity-50">#{i + 1}</span>
            {getOutputForTemp(temp, v)}
          </div>
        ))}
      </div>
    </div>
  );
}
