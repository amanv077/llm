import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";
import { KeyTerms } from "@/components/ui/KeyTerms";

export default function WhatAreLlmsPage() {
  return (
    <>
      <p className="text-lg">
        Large Language Models are neural networks trained on massive text data. 
        They predict <strong>what comes next</strong> — so well that they can write code, essays, and reason through complex problems.
      </p>

      <Callout icon="✨">
        Think of an LLM as a super-powered autocomplete. It doesn't "know" things — it predicts the most likely next token based on math.
      </Callout>

      <StepCards 
        steps={[
          { icon: "📝", title: "Input", description: "Text → tokens" },
          { icon: "🔢", title: "Encode", description: "Tokens → vectors" },
          { icon: "🧠", title: "Process", description: "Attention layers" },
          { icon: "✨", title: "Output", description: "Predict next token" },
        ]}
      />

      <KeyTerms 
        terms={[
          { name: "Token", definition: "~¾ of a word. LLMs think in tokens.", color: "#10b981" },
          { name: "Prompt", definition: "Your input text to the model.", color: "#0ea5e9" },
          { name: "Context Window", definition: "Max tokens the model handles at once.", color: "#ef4444" },
          { name: "Parameters", definition: "Learned weights. More = smarter & slower.", color: "#8b5cf6" },
        ]}
      />
    </>
  );
}
