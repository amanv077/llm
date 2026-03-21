"use client";

import { useState, useRef, useEffect } from "react";

type Point = { x: number; y: number; label: string; color: string; category: string };

const WORDS: Point[] = [
  // Animals
  { x: 15, y: 70, label: "cat", color: "#ef4444", category: "Animals" },
  { x: 20, y: 65, label: "dog", color: "#ef4444", category: "Animals" },
  { x: 12, y: 75, label: "kitten", color: "#ef4444", category: "Animals" },
  { x: 25, y: 60, label: "puppy", color: "#ef4444", category: "Animals" },
  { x: 8, y: 80, label: "lion", color: "#f97316", category: "Animals" },

  // Programming
  { x: 70, y: 30, label: "Python", color: "#3b82f6", category: "Tech" },
  { x: 75, y: 25, label: "JavaScript", color: "#3b82f6", category: "Tech" },
  { x: 80, y: 28, label: "TypeScript", color: "#6366f1", category: "Tech" },
  { x: 78, y: 35, label: "coding", color: "#3b82f6", category: "Tech" },
  { x: 72, y: 38, label: "function", color: "#8b5cf6", category: "Tech" },

  // Food
  { x: 50, y: 75, label: "pizza", color: "#10b981", category: "Food" },
  { x: 55, y: 70, label: "burger", color: "#10b981", category: "Food" },
  { x: 45, y: 78, label: "pasta", color: "#10b981", category: "Food" },
  { x: 58, y: 80, label: "sushi", color: "#14b8a6", category: "Food" },

  // Space
  { x: 40, y: 20, label: "galaxy", color: "#a855f7", category: "Space" },
  { x: 45, y: 15, label: "star", color: "#a855f7", category: "Space" },
  { x: 38, y: 25, label: "planet", color: "#8b5cf6", category: "Space" },
  { x: 50, y: 18, label: "cosmos", color: "#a855f7", category: "Space" },

  // Emotions
  { x: 85, y: 70, label: "happy", color: "#f59e0b", category: "Emotions" },
  { x: 88, y: 75, label: "joy", color: "#f59e0b", category: "Emotions" },
  { x: 82, y: 65, label: "sad", color: "#64748b", category: "Emotions" },
  { x: 90, y: 60, label: "love", color: "#ec4899", category: "Emotions" },
];

const CATEGORIES = ["All", "Animals", "Tech", "Food", "Space", "Emotions"];
const CATEGORY_COLORS: Record<string, string> = {
  Animals: "#ef4444",
  Tech: "#3b82f6",
  Food: "#10b981",
  Space: "#a855f7",
  Emotions: "#f59e0b",
};

export function EmbeddingsInteractive() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState<Point | null>(null);
  const [query, setQuery] = useState("");

  const filtered = filter === "All" ? WORDS : WORDS.filter((w) => w.category === filter);

  const queryMatch = query.trim()
    ? WORDS.find((w) => w.label.toLowerCase().includes(query.toLowerCase()))
    : null;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Grid lines
    ctx.strokeStyle = "#f1f5f9";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = (i / 10) * W;
      const y = (i / 10) * H;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Draw axes labels
    ctx.fillStyle = "#94a3b8";
    ctx.font = "10px Inter, sans-serif";
    ctx.fillText("Dimension 1 →", 5, H - 5);

    // Draw points
    for (const pt of filtered) {
      const px = (pt.x / 100) * W;
      const py = (pt.y / 100) * H;
      const isHov = hovered?.label === pt.label;
      const isMatch = queryMatch?.label === pt.label;
      const r = isHov || isMatch ? 8 : 5;

      if (isMatch) {
        // Glow effect
        ctx.beginPath();
        ctx.arc(px, py, 14, 0, Math.PI * 2);
        ctx.fillStyle = pt.color + "25";
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fillStyle = pt.color;
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label
      if (isHov || isMatch || r >= 7) {
        ctx.font = `${isHov || isMatch ? "bold " : ""}11px Inter, sans-serif`;
        ctx.fillStyle = "#0f172a";
        ctx.fillText(pt.label, px + 9, py + 4);
      }
    }
  }, [filtered, hovered, queryMatch]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;

    const closest = WORDS.reduce((best, pt) => {
      const d = Math.hypot(pt.x - mx, pt.y - my);
      return !best || d < best.dist ? { pt, dist: d } : best;
    }, null as { pt: Point; dist: number } | null);

    setHovered(closest && closest.dist < 5 ? closest.pt : null);
  };

  return (
    <div className="rounded-2xl border border-[#e2e8f0] overflow-hidden bg-white shadow-sm my-8">
      <div className="px-6 py-4 bg-gradient-to-r from-[#faf5ff] to-[#f8fafc] border-b border-[#e2e8f0]">
        <h3 className="font-bold text-[#0f172a] text-base flex items-center gap-2">
          🧭 Embedding Space Visualizer
        </h3>
        <p className="text-[13px] text-[#475569] mt-0.5">Semantically similar words cluster together in vector space</p>
      </div>

      {/* Search */}
      <div className="px-6 py-3 border-b border-[#f1f5f9] flex gap-3 flex-wrap">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a word (e.g. cat, Python, joy)..."
          className="flex-1 min-w-48 px-3 py-1.5 border border-[#e2e8f0] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent"
        />
        <div className="flex gap-1.5 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-3 py-1 rounded-full text-[12px] font-medium transition-all"
              style={{
                backgroundColor: filter === cat ? (CATEGORY_COLORS[cat] ?? "#0d7cf2") + "20" : "#f8fafc",
                color: filter === cat ? (CATEGORY_COLORS[cat] ?? "#0d7cf2") : "#475569",
                border: `1px solid ${filter === cat ? (CATEGORY_COLORS[cat] ?? "#0d7cf2") + "50" : "#e2e8f0"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div className="px-6 py-4">
        <div className="relative bg-[#fafafa] rounded-xl overflow-hidden border border-[#f1f5f9]">
          <canvas
            ref={canvasRef}
            width={560}
            height={300}
            className="w-full cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHovered(null)}
          />
          {hovered && (
            <div className="absolute top-2 left-2 bg-white border border-[#e2e8f0] rounded-lg px-3 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: hovered.color }} />
                <span className="text-sm font-bold text-[#0f172a]">{hovered.label}</span>
                <span className="text-[11px] text-[#94a3b8]">{hovered.category}</span>
              </div>
              <div className="text-[10px] text-[#94a3b8] mt-1 font-mono">
                vec: [{(hovered.x / 100).toFixed(2)}, {(hovered.y / 100).toFixed(2)}, ...]
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap gap-3">
          {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[11px] text-[#475569]">{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
