import { Callout } from "@/components/ui/Callout";
import { KeyTerms } from "@/components/ui/KeyTerms";
import { StepCards } from "@/components/ui/StepCards";
import { LessonHeader } from "@/components/ui/LessonHeader";

export default function AdvancedPromptingPage() {
  return (
    <>
      <LessonHeader 
        title="Advanced Prompting" 
        subtitle="Once you master the basics, it's time to teach the model how to think. Techniques like Chain of Thought force the model to slow down and reason before answering." 
      />

      <h2>Advanced Techniques</h2>
      <p>
        These proven strategies force the model to slow down and use its "System 2" reasoning.
      </p>

      <StepCards 
        steps={[
          { icon: "🧠", title: "Chain of Thought", description: "Adding 'Let's think step by step' forces the model to reason before answering." },
          { icon: "📑", title: "XML Tags", description: "Use tags like <context> or <instructions> to organize complex data." },
          { icon: "🛡️", title: "Escape Hatch", description: "Tell the AI: 'If you don't know, say I don't know' to kill hallucinations." },
        ]}
      />

      <Callout icon="🔍" className="bg-[#f0f9ff] border-[#bae6fd] [&>div:last-child]:text-[#0369a1]">
        <strong>Give the LLM a Scratchpad:</strong> <br/>
        By forcing the model to generate intermediate steps <em>before</em> the final answer, 
        you give it extra "compute-time" via tokens. It uses its own output as a brain!
      </Callout>

      <h2>Structure for Success</h2>
      <p>
        The smartest models (like Claude 3.5 Sonnet) absolutely love XML tags for separating 
        your data from your instructions. It's the cleanest way to prevent prompt injection.
      </p>

      <KeyTerms 
        terms={[
          { name: "CoT", definition: "Chain of Thought. The #1 way to improve complex reasoning.", color: "#8b5cf6" },
          { name: "XML Tagging", definition: "Grouping input data to keep it separate from the core instructions.", color: "#10b981" },
          { name: "Few-Shot", definition: "Providing 1-3 examples to radically improve accuracy.", color: "#3b82f6" },
        ]}
      />
    </>
  );
}
