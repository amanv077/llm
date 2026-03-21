import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";
import { KeyTerms } from "@/components/ui/KeyTerms";
import { LessonHeader } from "@/components/ui/LessonHeader";

export default function PromptingBasicsPage() {
  return (
    <>
      <LessonHeader 
        title="Prompt Engineering Basics" 
        subtitle="LLMs are highly literal pattern matchers. If you ask a vague question, you will get a vague answer. Better Prompts = Better AI results." 
      />

      <Callout icon="🎭" className="bg-[#f0f9ff] border-[#bae6fd] [&>div:last-child]:text-[#0369a1]">
        <strong>Stop treating it like a human.</strong> <br/>
        Don't be polite. Be precise. The more specific you are, the better the result.
      </Callout>

      <h2>The Three Golden Pillars</h2>
      <p>
        Every professional prompt follows this simple 3-step formula:
      </p>

      <StepCards 
        steps={[
          { icon: "🎨", title: "Role", description: "Who is the AI? (Senior Dev, Poet, Lawyer)." },
          { icon: "🎯", title: "Task", description: "What exactly do you want? (Summarize, Code, Debug)." },
          { icon: "📜", title: "Format", description: "How should it be output? (JSON, Bullets, Table)." },
        ]}
      />

      <Callout icon="💡" className="bg-[#fffbeb] border-[#fde68a] [&>div:last-child]:text-[#92400e]">
        <strong>Show, Don't Just Tell:</strong> <br/>
        Providing even one single example (Few-Shot) is mathematically proven to 
        skyrocket common-sense reasoning and accuracy.
      </Callout>

      <KeyTerms 
        terms={[
          { name: "Zero-Shot", definition: "Asking a question with zero context or examples.", color: "#10b981" },
          { name: "Few-Shot", definition: "Providing 1-3 examples in the prompt to guide the AI.", color: "#8b5cf6" },
          { name: "Negative Prompt", definition: "Telling the AI exactly what NOT to do (e.g. 'No yapping').", color: "#ef4444" },
        ]}
      />
    </>
  );
}
