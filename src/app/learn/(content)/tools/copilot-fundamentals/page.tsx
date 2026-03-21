import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";
import { KeyTerms } from "@/components/ui/KeyTerms";
import { LessonHeader } from "@/components/ui/LessonHeader";

export default function CopilotFundamentalsPage() {
  return (
    <>
      <LessonHeader 
        title="Copilot Fundamentals" 
        subtitle="AI coding assistants have changed software engineering forever. Learning to 'pair program' with these tools is the #1 skill for the modern developer." 
      />

      <h2>The Three AI Powers</h2>
      <p>
        AI in your code editor generally takes three distinct forms:
      </p>

      <StepCards 
        steps={[
          { icon: "⌨️", title: "Autocomplete", description: "Predicts the rest of your line as you type. Fast and fluid." },
          { icon: "💬", title: "Chat / Workspace", description: "Conversational interface to ask questions about your whole project." },
          { icon: "🪄", title: "Edit / Agent", description: "In-line edits where the AI physically rewrites your code files for you." },
        ]}
      />

      <Callout icon="🧠" className="bg-[#f3e8ff] border-[#e9d5ff] [&>div:last-child]:text-[#7e22ce]">
        <strong>The "Open Tab" Context:</strong> <br/>
        Copilot is effectively blind. It mostly only "sees" the file you are currently editing. 
        If you want it to know about a specific helper, <strong>open that file in a split tab</strong>.
      </Callout>

      <Callout icon="⚠️" className="bg-[#fef2f2] border-[#fecaca] [&>div:last-child]:text-[#991b1b]">
        <strong>The speed trap:</strong> <br/>
        Bluntly accepting 50-line suggestions without reading them is how you introduce 
        bugs at the speed of light. Always <strong>Review before you Accept</strong>.
      </Callout>

      <KeyTerms 
        terms={[
          { name: "Ghost Text", definition: "The greyed-out suggestions that appear as you are typing.", color: "#8b5cf6" },
          { name: "Context", definition: "The limited set of files the AI is allowed to read from.", color: "#10b981" },
          { name: "Deterministic", definition: "Unlike AI, normal code is predictable. AI is probabilistic (it guesses).", color: "#3b82f6" },
        ]}
      />
    </>
  );
}
