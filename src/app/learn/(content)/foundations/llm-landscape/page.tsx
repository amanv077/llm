import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";
import { KeyTerms } from "@/components/ui/KeyTerms";
import { LessonHeader } from "@/components/ui/LessonHeader";

export default function LlmLandscapePage() {
  return (
    <>
      <LessonHeader 
        title="The LLM Landscape" 
        subtitle="The world of Large Language Models is moving at lightning speed. It's essentially broken down into two distinct categories: Proprietary (Closed) and Open Weights." 
      />

      <h2>1. Proprietary Models (APIs)</h2>
      <p>
        Massive, cutting-edge models locked behind a paywall. You don't own the weights, 
        and you can only access them via API calls.
      </p>

      <StepCards 
        steps={[
          { icon: "🟢", title: "OpenAI", description: "Creators of GPT-4o, o1, and the pioneers of the current boom." },
          { icon: "🟣", title: "Anthropic", description: "Creators of Claude 3.5 Sonnet, known for incredible coding ability." },
          { icon: "🟡", title: "Google", description: "Creators of Gemini 1.5 Pro, known for the 2M context window." },
        ]}
      />

      <h2>2. Open Weights (Local)</h2>
      <p>
        Models where the weights are released for free. You can download and run them on your own hardware.
      </p>

      <StepCards 
        steps={[
          { icon: "🦙", title: "Meta", description: "Llama 3 is the undisputed king of open source models." },
          { icon: "🇫🇷", title: "Mistral", description: "European startup making heavily optimized, tiny models." },
          { icon: "🐼", title: "Qwen", description: "Alibaba's extremely powerful open source LLM series." },
        ]}
      />

      <Callout icon="⚖️">
        <strong>Which should you choose?</strong> Start with <em>Claude 3.5 Sonnet</em> or <em>GPT-4o</em> 
        to build your prototype as fast as possible.
      </Callout>

      <KeyTerms 
        terms={[
          { name: "Proprietary", definition: "Models owned by companies (OpenAI, Anthropic). Closed source.", color: "#ef4444" },
          { name: "Open Weights", definition: "Models you can download and run locally (Llama, Mistral).", color: "#10b981" },
          { name: "API-First", definition: "Accessing models via cloud endpoints rather than local execution.", color: "#3b82f6" },
        ]}
      />
    </>
  );
}
