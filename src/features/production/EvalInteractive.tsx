"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type TestResult = "pass" | "fail" | "warn";

const PROMPTS = [
  { id: 1, text: "Write me an email to cancel my gym membership." },
  { id: 2, text: "Write a polite email to cancel my gym membership. It must be under 50 words, include my name (John), and ask for a confirmation receipt. Output ONLY the email." }
];

const TESTS = [
  { id: "len", name: "Length < 50 words" },
  { id: "tone", name: "Polite Tone" },
  { id: "name", name: "Includes 'John'" },
  { id: "receipt", name: "Asks for receipt" },
  { id: "format", name: "No conversational filler" },
];

export function EvalInteractive() {
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [results, setResults] = useState<Record<string, TestResult>>({});

  const output1 = "Sure! Here is an email you can use:\n\nDear Gym Manager,\n\nI am writing this email to inform you that I would like to cancel my membership immediately. I have moved to a different city and will no longer be able to attend your facilities. Please let me know what the next steps are.\n\nThanks,\nJohn";
  const output2 = "Dear Manager,\n\nPlease cancel my gym membership effective immediately. Please reply with a confirmation receipt.\n\nBest,\nJohn";

  const runEval = () => {
    setIsEvaluating(true);
    setResults({});
    
    setTimeout(() => {
      if (selectedPrompt === 0) {
        setResults({ len: "fail", tone: "pass", name: "pass", receipt: "fail", format: "fail" });
      } else {
        setResults({ len: "pass", tone: "pass", name: "pass", receipt: "pass", format: "pass" });
      }
      setIsEvaluating(false);
    }, 1200);
  };

  const currentOutput = selectedPrompt === 0 ? output1 : output2;

  const passedCount = Object.values(results).filter(r => r === "pass").length;
  const score = Object.keys(results).length > 0 ? (passedCount / TESTS.length) * 100 : 0;

  return (
    <div className="rounded-2xl border border-[#e2e8f0] overflow-hidden bg-white shadow-sm my-8">
      <div className="px-6 py-4 bg-gradient-to-r from-[#fef2f2] to-[#f8fafc] border-b border-[#e2e8f0]">
        <h3 className="font-bold text-[#0f172a] text-base flex items-center gap-2">
          🧪 Prompt Evaluation Simulator
        </h3>
        <p className="text-[13px] text-[#475569] mt-0.5">
          See how structured tests catch regressions across different prompt versions
        </p>
      </div>

      <div className="p-6 md:flex gap-6">
        {/* Left Col */}
        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <h4 className="text-[12px] font-semibold text-[#64748b] uppercase tracking-wide">Select Prompt Version</h4>
            {PROMPTS.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => { setSelectedPrompt(idx); setResults({}); }}
                className={cn(
                  "w-full text-left p-3 rounded-xl border transition-all",
                  selectedPrompt === idx ? "border-[#ef4444] bg-[#fef2f2] shadow-sm" : "border-[#e2e8f0] hover:bg-[#f8fafc]"
                )}
              >
                <div className="text-[10px] font-bold text-[#ef4444] mb-1">V{idx + 1} {idx === 0 ? "(vague)" : "(strict constraints)"}</div>
                <div className="text-[13px] text-[#0f172a]">{p.text}</div>
              </button>
            ))}
          </div>

          <button
            onClick={runEval}
            disabled={isEvaluating}
            className="w-full py-3 bg-[#1e293b] text-white rounded-xl font-semibold text-sm transition-all hover:bg-[#0f172a] disabled:opacity-50"
          >
            {isEvaluating ? "Evaluating..." : "Run Evals"}
          </button>
        </div>

        {/* Right Col */}
        <div className="flex-1 space-y-4">
          <div>
            <h4 className="text-[12px] font-semibold text-[#64748b] uppercase tracking-wide mb-2">LLM Output</h4>
            <div className="p-4 bg-[#f8fafc] rounded-xl border border-[#e2e8f0] text-[13px] text-[#475569] font-mono whitespace-pre-wrap min-h-[140px]">
              {currentOutput}
            </div>
          </div>

          <div>
             <div className="flex justify-between items-end mb-2">
                <h4 className="text-[12px] font-semibold text-[#64748b] uppercase tracking-wide">Test Suite Results</h4>
                {Object.keys(results).length > 0 && (
                  <div className={cn("text-lg font-black", score === 100 ? "text-[#10b981]" : "text-[#ef4444]")}>
                    {score}% Score
                  </div>
                )}
             </div>
             
             <div className="space-y-2">
                {TESTS.map(t => {
                  const res = results[t.id];
                  return (
                    <div key={t.id} className="flex items-center justify-between p-2 rounded-lg border border-[#f1f5f9] bg-white">
                      <span className="text-[13px] text-[#0f172a] font-medium">{t.name}</span>
                      {res === "pass" && <CheckCircle2 className="w-4 h-4 text-[#10b981]" />}
                      {res === "fail" && <XCircle className="w-4 h-4 text-[#ef4444]" />}
                      {res === "warn" && <AlertTriangle className="w-4 h-4 text-[#f59e0b]" />}
                      {!res && <div className="w-4 h-4 rounded-full border-2 border-[#e2e8f0]" />}
                    </div>
                  );
                })}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
