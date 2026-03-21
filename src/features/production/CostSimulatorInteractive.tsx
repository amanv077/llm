"use client";

import { useState } from "react";
import { DollarSign, BarChart3, DatabaseZap } from "lucide-react";
import { estimateTokens, estimateCost, formatCost, cn } from "@/lib/utils";

const MODELS = [
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", type: "Flagship" },
  { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic", type: "Flagship" },
  { id: "gpt-4o-mini", name: "GPT-4o-Mini", provider: "OpenAI", type: "Fast/Cheap" },
  { id: "gemini-2", name: "Gemini 2.0 Flash", provider: "Google", type: "Fast/Cheap" },
] as const;

export function CostSimulatorInteractive() {
  const [prompt, setPrompt] = useState("Summarize this 10-page document into 3 bullet points.");
  const [dailyUsers, setDailyUsers] = useState(1000);
  const [reqsPerUser, setReqsPerUser] = useState(5);

  const tokensPerReq = estimateTokens(prompt) + 500; // Adding dummy output tokens
  const totalTokensDay = tokensPerReq * dailyUsers * reqsPerUser;
  const totalTokensMonth = totalTokensDay * 30;

  return (
    <div className="rounded-2xl border border-[#e2e8f0] overflow-hidden bg-white shadow-sm my-8">
      <div className="px-6 py-4 bg-gradient-to-r from-[#ecfdf5] to-[#f8fafc] border-b border-[#e2e8f0]">
        <h3 className="font-bold text-[#0f172a] text-base flex items-center gap-2">
          💰 LLM Cost Simulator
        </h3>
        <p className="text-[13px] text-[#475569] mt-0.5">
          See how prompt length, models, and scale affect your monthly API bill
        </p>
      </div>

      <div className="p-6 md:flex gap-8">
        {/* Controls */}
        <div className="flex-1 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#0f172a] mb-2">Average Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-xl border border-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#10b981]"
            />
            <div className="text-[11px] text-[#94a3b8] mt-1 text-right">
              Est. {estimateTokens(prompt)} input tokens + 500 output tokens
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-semibold text-[#0f172a]">Daily Active Users</label>
              <span className="text-sm font-bold text-[#10b981]">{dailyUsers.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="100"
              max="100000"
              step="100"
              value={dailyUsers}
              onChange={(e) => setDailyUsers(parseInt(e.target.value))}
              className="w-full h-2 rounded-full cursor-pointer accent-[#10b981]"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-semibold text-[#0f172a]">Requests / User / Day</label>
              <span className="text-sm font-bold text-[#10b981]">{reqsPerUser}</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={reqsPerUser}
              onChange={(e) => setReqsPerUser(parseInt(e.target.value))}
              className="w-full h-2 rounded-full cursor-pointer accent-[#10b981]"
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 mt-8 md:mt-0 bg-[#f8fafc] p-5 rounded-xl border border-[#e2e8f0]">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-[#64748b]" />
            <h4 className="font-semibold text-sm text-[#0f172a]">Est. Monthly Cost</h4>
          </div>

          <div className="text-[11px] text-[#475569] mb-4 bg-white p-2 rounded-lg border border-[#e2e8f0]">
            Scale: <strong className="text-[#0f172a]">{(totalTokensMonth / 1000000).toFixed(1)}M</strong> tokens/month
          </div>

          <div className="space-y-3">
            {MODELS.map((m) => {
              const cost = estimateCost(totalTokensMonth, m.id as any);
              return (
                <div key={m.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#e2e8f0] shadow-sm">
                  <div>
                    <div className="font-semibold text-[13px] text-[#0f172a]">{m.name}</div>
                    <div className="text-[10px] text-[#94a3b8]">{m.type}</div>
                  </div>
                  <div className={cn("text-base font-bold", cost > 1000 ? "text-[#f87171]" : "text-[#10b981]")}>
                    ${cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    <span className="text-[11px] font-normal text-[#94a3b8] ml-1">/mo</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
