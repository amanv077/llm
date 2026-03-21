"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type CodeBlockProps = {
  code: string;
  language?: string;
  filename?: string;
  title?: string;
};

const THEME: Record<string, string> = {
  keyword: "#f59e0b",
  string: "#10b981",
  comment: "#6b7280",
  function: "#60a5fa",
  number: "#f87171",
  operator: "#94a3b8",
  variable: "#e2e8f0",
  default: "#e2e8f0",
};

function tokenize(code: string, lang: string): Array<{ type: string; value: string }> {
  // Simple tokenizer for highlighting
  if (lang === "bash") {
    return code.split(/(\s+)/).map((v) => ({
      type: v.startsWith("#") ? "comment" : v.startsWith("$") ? "keyword" : "default",
      value: v,
    }));
  }

  const tokens: Array<{ type: string; value: string }> = [];
  const patterns: Array<[RegExp, string]> = [
    [/\/\/[^\n]*/g, "comment"],
    [/#[^\n]*/g, "comment"],
    [/"(?:[^"\\]|\\.)*"/g, "string"],
    [/'(?:[^'\\]|\\.)*'/g, "string"],
    [/`(?:[^`\\]|\\.)*`/g, "string"],
    [/\b(const|let|var|function|async|await|return|import|from|export|default|if|else|for|of|in|class|extends|new|this|type|interface|true|false|null|undefined|void|fetch|then|catch|throw|try)\b/g, "keyword"],
    [/\b\d+(\.\d+)?\b/g, "number"],
    [/[+\-*\/=<>!&|?:]+/g, "operator"],
  ];

  let remaining = code;
  while (remaining.length > 0) {
    let matched = false;
    for (const [pattern, type] of patterns) {
      pattern.lastIndex = 0;
      const m = pattern.exec(remaining);
      if (m && m.index === 0) {
        tokens.push({ type, value: m[0] });
        remaining = remaining.slice(m[0].length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      tokens.push({ type: "default", value: remaining[0] });
      remaining = remaining.slice(1);
    }
  }
  return tokens;
}

export function CodeBlock({ code, language = "typescript", filename, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tokens = tokenize(code.trim(), language);
  const lines = code.trim().split("\n");

  return (
    <div className="rounded-xl overflow-hidden border border-[#e2e8f0] my-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1e293b] border-b border-[#334155]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ef4444] opacity-80" />
            <div className="w-3 h-3 rounded-full bg-[#f59e0b] opacity-80" />
            <div className="w-3 h-3 rounded-full bg-[#10b981] opacity-80" />
          </div>
          {(filename ?? title) && (
            <span className="text-[12px] text-[#94a3b8] font-mono">{filename ?? title}</span>
          )}
          {!filename && !title && (
            <span className="text-[12px] text-[#475569] font-mono">{language}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[11px] text-[#94a3b8] hover:text-white transition-colors px-2 py-1 rounded hover:bg-[#334155]"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#10b981]" />
              <span className="text-[#10b981]">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="bg-[#0f172a] overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="hover:bg-[#1e293b]/50 transition-colors">
                <td className="pl-4 pr-3 py-0 text-right select-none text-[#475569] text-[12px] font-mono w-10 align-top leading-6 pt-0.5">
                  {i + 1}
                </td>
                <td className="px-4 py-0 font-mono text-[13px] leading-6 whitespace-pre">
                  <HighlightedLine line={line} language={language} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HighlightedLine({ line, language }: { line: string; language: string }) {
  const patterns: Array<[RegExp, string]> = [
    [/(\/\/[^\n]*)/g, "comment"],
    [/(#[^\n]*)/g, "comment"],
    [/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, "string"],
    [/\b(const|let|var|function|async|await|return|import|from|export|default|if|else|for|of|in|class|extends|new|this|type|interface|true|false|null|undefined|void|fetch|then|catch|throw|try)\b/g, "keyword"],
    [/\b(\d+(?:\.\d+)?)\b/g, "number"],
  ];

  const parts: Array<{ text: string; type: string }> = [];
  let rest = line;

  while (rest.length > 0) {
    let earliest: { index: number; match: string; type: string } | null = null;

    for (const [pattern, type] of patterns) {
      const re = new RegExp(pattern.source, "g");
      const m = re.exec(rest);
      if (m && (earliest === null || m.index < earliest.index)) {
        earliest = { index: m.index, match: m[0], type };
      }
    }

    if (!earliest) {
      parts.push({ text: rest, type: "default" });
      break;
    }

    if (earliest.index > 0) {
      parts.push({ text: rest.slice(0, earliest.index), type: "default" });
    }
    parts.push({ text: earliest.match, type: earliest.type });
    rest = rest.slice(earliest.index + earliest.match.length);
  }

  const colors: Record<string, string> = {
    keyword: "#f59e0b",
    string: "#34d399",
    comment: "#6b7280",
    number: "#f87171",
    default: "#e2e8f0",
  };

  return (
    <>
      {parts.map((p, i) => (
        <span key={i} style={{ color: colors[p.type] ?? colors.default }}>
          {p.text}
        </span>
      ))}
    </>
  );
}
