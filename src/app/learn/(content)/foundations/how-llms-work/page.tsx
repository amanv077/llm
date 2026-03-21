import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";

export default function HowLlmsWorkPage() {
  return (
    <>
      <StepCards 
        steps={[
          { icon: "📝", title: "You type a prompt", description: '"Write a poem about code"' },
          { icon: "🔤", title: "Text → Tokens", description: "Split into ~750 tokens per 1K words" },
          { icon: "🧮", title: "Tokens → Numbers", description: "Each token becomes a vector (list of numbers)" },
          { icon: "🔍", title: "Attention", description: "The model finds which words relate to each other" },
          { icon: "🎯", title: "Predict next token", description: "Picks the most likely next word, one at a time" },
        ]}
      />

      <Callout icon="✨">
        <strong>The key insight:</strong> LLMs don't "understand" — they predict. But they predict SO well it feels like understanding.
      </Callout>

      <Callout icon="🧠" className="bg-[#f0f9ff] border-[#bae6fd] [&>div:last-child]:text-[#0369a1]">
        <strong>Attention in one sentence:</strong> When reading <em>"The cat sat on the mat"</em>, attention helps the model know that "cat" and "sat" are strongly connected — it builds a web of relationships between every word.
      </Callout>
    </>
  );
}
