import { EvalInteractive } from "@/features/production/EvalInteractive";
import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";
import { KeyTerms } from "@/components/ui/KeyTerms";
import { LessonHeader } from "@/components/ui/LessonHeader";

export default function EvaluationPage() {
  return (
    <>
      <LessonHeader 
        title="Evaluation & Testing" 
        subtitle="In traditional software, we have unit tests. In AI, we have Evaluations (Evals). How do you know if your prompt change actually made the AI smarter or just different?" 
      />

      <EvalInteractive />

      <Callout icon="🧪" className="bg-[#f3e8ff] border-[#e9d5ff] [&>div:last-child]:text-[#7e22ce]">
        <strong>Never Eyeball It:</strong> <br/>
        If you just refresh your app and say "it looks fixed", your app is going to break 
        for everyone else. You need a <strong>Test Suite</strong> of real-world queries.
      </Callout>

      <h2>The Eval Hierarchy</h2>
      <p>
        There are three ways to measure if your AI is actually working correctly.
      </p>

      <StepCards 
        steps={[
          { icon: "👨‍💻", title: "Manual Review", description: "A human looks at the output and gives it a thumbs up/down." },
          { icon: "🤖", title: "LLM-as-a-Judge", description: "Using a smarter model (GPT-4o) to grade the output of a cheaper one." },
          { icon: "📏", title: "Deterministic", description: "Hard tests (regex, length, JSON validation) that never lie." },
        ]}
      />

      <KeyTerms 
        terms={[
          { name: "Golden Dataset", definition: "The 'perfect' 50-100 answers you expect the model to give.", color: "#10b981" },
          { name: "Regression", definition: "When a tiny prompt change breaks something that was working before.", color: "#ef4444" },
          { name: "Score", definition: "The % of tests your prompt passed (e.g. 85% Accuracy).", color: "#3b82f6" },
        ]}
      />
    </>
  );
}
