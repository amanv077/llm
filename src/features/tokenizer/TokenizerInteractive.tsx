"use client";

import { useState } from "react";

const COLORS = [
  "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16",
  "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#3b82f6",
  "#6366f1", "#8b5cf6", "#a855f7", "#ec4899",
];

function simpleTokenize(text: string): string[] {
  // Simplified BPE-like tokenization approximation
  if (!text) return [];
  const tokens: string[] = [];
  let i = 0;

  while (i < text.length) {
    // Common bigrams/words first
    const remaining = text.slice(i);

    // Try word boundary
    const wordMatch = remaining.match(/^[a-zA-Z]+/);
    if (wordMatch) {
      const word = wordMatch[0];
      if (word.length > 5) {
        // Split longer words into sub-tokens
        tokens.push(word.slice(0, Math.ceil(word.length / 2)));
        if (word.length > Math.ceil(word.length / 2)) {
          tokens.push(word.slice(Math.ceil(word.length / 2)));
        }
      } else {
        tokens.push(word);
      }
      i += word.length;
      continue;
    }

    // Whitespace
    const spaceMatch = remaining.match(/^ +/);
    if (spaceMatch) {
      tokens.push("▁".repeat(spaceMatch[0].length));
      i += spaceMatch[0].length;
      continue;
    }

    // Number
    const numMatch = remaining.match(/^\d+/);
    if (numMatch) {
      tokens.push(numMatch[0]);
      i += numMatch[0].length;
      continue;
    }

    // Single char
    tokens.push(text[i]);
    i++;
  }

  return tokens;
}

export function TokenizerInteractive() {
  const [text, setText] = useState("Hello! I am learning about LLMs and tokenization.");

  const tokens = simpleTokenize(text);

  return (
    <div className="rounded-2xl border border-[#e2e8f0] overflow-hidden bg-white shadow-sm my-8">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-[#f0f7ff] to-[#f8fafc] border-b border-[#e2e8f0]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-[#0f172a] text-base flex items-center gap-2">
              ⚡ Interactive Tokenizer
            </h3>
            <p className="text-[13px] text-[#475569] mt-0.5">
              Type any text and see how it breaks into tokens
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-[#0d7cf2]">{tokens.length}</div>
            <div className="text-[11px] text-[#94a3b8]">tokens</div>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-b border-[#f1f5f9]">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 rounded-lg border border-[#e2e8f0] text-sm text-[#0f172a] resize-none focus:outline-none focus:ring-2 focus:ring-[#0d7cf2] focus:border-transparent placeholder:text-[#94a3b8]"
          rows={3}
          placeholder="Type something here..."
        />
      </div>

      {/* Tokens visualization */}
      <div className="px-6 py-4">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tokens.map((token, i) => (
            <span
              key={i}
              className="inline-flex items-center px-2 py-1 rounded text-[12px] font-mono font-medium text-white"
              style={{ backgroundColor: COLORS[i % COLORS.length] + "cc" }}
              title={`Token ${i + 1}: "${token}"`}
            >
              {token.replace(/▁/g, "·")}
            </span>
          ))}
          {tokens.length === 0 && (
            <span className="text-[13px] text-[#94a3b8] italic">Start typing to see tokens...</span>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#f1f5f9]">
          <div className="text-center">
            <div className="text-xl font-black text-[#0f172a]">{text.length}</div>
            <div className="text-[11px] text-[#94a3b8]">characters</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-black text-[#0d7cf2]">{tokens.length}</div>
            <div className="text-[11px] text-[#94a3b8]">tokens</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-black text-[#8b5cf6]">
              {tokens.length > 0 ? (text.length / tokens.length).toFixed(1) : "—"}
            </div>
            <div className="text-[11px] text-[#94a3b8]">chars/token</div>
          </div>
        </div>
      </div>
    </div>
  );
}
