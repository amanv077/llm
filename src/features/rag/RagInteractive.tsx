"use client";

import { useState } from "react";
import { Search, Database, FileText, Cpu, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const DOCUMENTS = [
  "Next.js App Router relies on React Server Components by default.",
  "Tailwind CSS v4 introduces a new engine and drops the config file.",
  "RAG (Retrieval-Augmented Generation) gives LLMs access to custom data.",
  "Embeddings are high-dimensional vectors representing semantic meaning.",
  "Temperature controls the randomness of an LLM's output."
];

export function RagInteractive() {
  const [query, setQuery] = useState("What is RAG?");
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [retrieved, setRetrieved] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const runFlow = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setStep(0);
    setRetrieved([]);

    // Step 1: Embed Query
    await new Promise(r => setTimeout(r, 600));
    setStep(1);

    // Step 2: Retrieve
    await new Promise(r => setTimeout(r, 1000));
    const lowerQ = query.toLowerCase();
    const scored = DOCUMENTS.map(d => {
      let score = 0;
      if (lowerQ.includes("rag") && d.toLowerCase().includes("rag")) score += 0.9;
      if (lowerQ.includes("next") && d.toLowerCase().includes("next")) score += 0.8;
      if (lowerQ.includes("tailwind") && d.toLowerCase().includes("tailwind")) score += 0.8;
      if (lowerQ.includes("embed") && d.toLowerCase().includes("embed")) score += 0.8;
      if (lowerQ.includes("temperature") && d.toLowerCase().includes("temperature")) score += 0.8;
      if (score === 0) score = Math.random() * 0.3; // Random low score
      return { text: d, score };
    }).sort((a, b) => b.score - a.score).slice(0, 2);
    
    setRetrieved(scored.map(s => s.text));
    setStep(2);

    // Step 3: Generate
    await new Promise(r => setTimeout(r, 1200));
    setStep(3);
    setIsAnimating(false);
  };

  return (
    <div className="rounded-2xl border border-[#e2e8f0] overflow-hidden bg-white shadow-sm my-8">
      <div className="px-6 py-4 bg-gradient-to-r from-[#eff6ff] to-[#f8fafc] border-b border-[#e2e8f0]">
        <h3 className="font-bold text-[#0f172a] text-base flex items-center gap-2">
          📚 RAG Pipeline Visualizer
        </h3>
        <p className="text-[13px] text-[#475569] mt-0.5">
          See how retrieval-augmented generation works step by step
        </p>
      </div>

      <div className="p-6">
        {/* Input */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isAnimating}
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#0d7cf2] disabled:opacity-60 disabled:bg-[#f8fafc]"
            placeholder="Ask a question..."
          />
          <button
            onClick={runFlow}
            disabled={isAnimating || !query.trim()}
            className="px-6 py-2.5 bg-[#0d7cf2] font-semibold text-white rounded-xl text-sm transition-all hover:bg-[#005fd4] disabled:opacity-50 flex items-center gap-2"
          >
            {isAnimating ? "Running..." : "Run Pipeline"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Pipeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {/* Step 1: Embed */}
          <div className={cn("p-5 rounded-xl border transition-all duration-500", step >= 1 ? "border-[#0d7cf2] bg-[#f0f7ff]" : "border-[#e2e8f0] bg-[#f8fafc] opacity-50")}>
            <div className="flex items-center gap-2 mb-3">
              <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-bold transition-colors", step >= 1 ? "bg-[#0d7cf2]" : "bg-[#94a3b8]")}>1</div>
              <h4 className="font-semibold text-sm text-[#0f172a]">Embed Query</h4>
            </div>
            <Search className={cn("w-8 h-8 mb-3 transition-colors", step >= 1 ? "text-[#0d7cf2]" : "text-[#cbd5e1]")} />
            <p className="text-[12px] text-[#475569]">Turn the user's question into a mathematical vector representation.</p>
            {step >= 1 && (
              <div className="mt-3 p-2 bg-white rounded border border-[#e2e8f0] text-[10px] text-[#94a3b8] font-mono break-all animate-fade-in-up">
                [0.024, -0.153, 0.892, 0.051, ...]
              </div>
            )}
          </div>

          {/* Step 2: Retrieve */}
          <div className={cn("p-5 rounded-xl border transition-all duration-500 relative", step >= 2 ? "border-[#10b981] bg-[#f0fdf4]" : "border-[#e2e8f0] bg-[#f8fafc] opacity-50")}>
            {step >= 2 && (
              <div className="absolute top-1/2 -left-6 w-6 h-0.5 bg-[#10b981] hidden md:block" />
            )}
            <div className="flex items-center gap-2 mb-3">
              <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-bold transition-colors", step >= 2 ? "bg-[#10b981]" : "bg-[#94a3b8]")}>2</div>
              <h4 className="font-semibold text-sm text-[#0f172a]">Retrieve Context</h4>
            </div>
            <Database className={cn("w-8 h-8 mb-3 transition-colors", step >= 2 ? "text-[#10b981]" : "text-[#cbd5e1]")} />
            <p className="text-[12px] text-[#475569]">Search the Vector DB for documents mathematically similar to the query.</p>
            {step >= 2 && retrieved.length > 0 && (
              <div className="mt-3 space-y-1.5 animate-fade-in-up">
                {retrieved.map((text, i) => (
                  <div key={i} className="p-2 bg-white rounded border border-[#86efac] text-[11px] text-[#0f172a] shadow-sm">
                    {text}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Step 3: Generate */}
          <div className={cn("p-5 rounded-xl border transition-all duration-500 relative", step >= 3 ? "border-[#8b5cf6] bg-[#faf5ff]" : "border-[#e2e8f0] bg-[#f8fafc] opacity-50")}>
            {step >= 3 && (
              <div className="absolute top-1/2 -left-6 w-6 h-0.5 bg-[#8b5cf6] hidden md:block" />
            )}
            <div className="flex items-center gap-2 mb-3">
              <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-bold transition-colors", step >= 3 ? "bg-[#8b5cf6]" : "bg-[#94a3b8]")}>3</div>
              <h4 className="font-semibold text-sm text-[#0f172a]">Generate Answer</h4>
            </div>
            <Cpu className={cn("w-8 h-8 mb-3 transition-colors", step >= 3 ? "text-[#8b5cf6]" : "text-[#cbd5e1]")} />
            <p className="text-[12px] text-[#475569]">Pass original query + retrieved context to the LLM to get a grounded answer.</p>
            {step >= 3 && (
              <div className="mt-3 p-2 bg-white rounded border border-[#c4b5fd] text-[12px] text-[#0f172a] shadow-sm font-medium animate-fade-in-up relative">
                <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8b5cf6] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#8b5cf6]"></span>
                </span>
                Based on the provided context, {retrieved.length > 0 ? "here is the answer derived from the retrieved documents." : "I don't have enough information in my database to answer this accurately."}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
