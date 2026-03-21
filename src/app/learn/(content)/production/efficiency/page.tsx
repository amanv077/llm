import { CostSimulatorInteractive } from "@/features/production/CostSimulatorInteractive";
import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";
import { KeyTerms } from "@/components/ui/KeyTerms";
import { LessonHeader } from "@/components/ui/LessonHeader";

export default function EfficiencyPage() {
  return (
    <>
      <LessonHeader 
        title="Using LLMs Efficiently" 
        subtitle="Building a prototype with an LLM is easy. Scaling it to millions of users without bankrupting your startup is the hard part. Welcome to the world of LLMOps." 
      />

      <CostSimulatorInteractive />

      <Callout icon="📉" className="bg-[#f0fdfa] border-[#5eead4] [&>div:last-child]:text-[#0f766e]">
        <strong>The Efficiency Rule:</strong> <br/>
        Always start with the most expensive, smartest model during development. Once your product 
        works, try to <strong>downgrade</strong> to a cheaper model to save 90% in costs!
      </Callout>

      <h2>The Routing Strategy</h2>
      <p>
        Don't use a massive model for everything. Route your tasks dynamically:
      </p>

      <StepCards 
        steps={[
          { icon: "✂️", title: "Format & Polish", description: "Use GPT-4o-Mini or Llama-3-8B. Fast and practically free." },
          { icon: "🏎️", title: "Summarization", description: "Use Gemini 1.5 Flash. Massive context for low cost." },
          { icon: "🧠", title: "Reasoning", description: "Use GPT-4o or Claude 3.5 Sonnet. Best for code and complex logic." },
        ]}
      />

      <Callout icon="⚡" className="bg-[#fffbeb] border-[#fde68a] [&>div:last-child]:text-[#92400e]">
        <strong>Semantic Caching:</strong> <br/>
        The fastest and cheapest LLM call is the one you <strong>never make</strong>. 
        Cache identical questions and serve them from your database instantly.
      </Callout>

      <KeyTerms 
        terms={[
          { name: "TTFT", definition: "Time To First Token. How fast the AI starts talking.", color: "#8b5cf6" },
          { name: "Tokens/sec", definition: "The generation speed of the model.", color: "#10b981" },
          { name: "Semantic Cache", definition: "Storing previous AI answers to reuse them for similar questions.", color: "#3b82f6" },
        ]}
      />
    </>
  );
}
