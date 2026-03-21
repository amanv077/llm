export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function estimateTokens(text: string): number {
  // Rough approximation: ~4 chars per token
  return Math.ceil(text.length / 4);
}

export function estimateCost(tokens: number, model: "gpt-4o" | "gpt-4o-mini" | "claude-3-5-sonnet" | "gemini-2"): number {
  const prices: Record<string, number> = {
    "gpt-4o": 0.0025 / 1000,
    "gpt-4o-mini": 0.00015 / 1000,
    "claude-3-5-sonnet": 0.003 / 1000,
    "gemini-2": 0.00125 / 1000,
  };
  return tokens * (prices[model] ?? 0.001 / 1000);
}

export function formatCost(dollars: number): string {
  if (dollars < 0.001) return `$${(dollars * 100000).toFixed(2)} per 100K`;
  if (dollars < 0.01) return `$${dollars.toFixed(4)}`;
  return `$${dollars.toFixed(3)}`;
}
