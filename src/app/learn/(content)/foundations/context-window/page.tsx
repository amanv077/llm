import { Callout } from "@/components/ui/Callout";
import { KeyTerms } from "@/components/ui/KeyTerms";
import { StepCards } from "@/components/ui/StepCards";
import { LessonHeader } from "@/components/ui/LessonHeader";

export default function ContextWindowPage() {
  return (
    <>
      <LessonHeader 
        title="Context Window" 
        subtitle="The Context Window is the short-term memory of an LLM. It is the absolute maximum amount of text (both prompt and response) the model can process at once." 
      />

      <Callout icon="🧠" className="bg-[#f0f9ff] border-[#bae6fd] [&>div:last-child]:text-[#0369a1]">
        <strong>The Book Analogy:</strong> <br/>
        If an LLM was a human, the Context Window is how many pages of a book they can read 
        before they start forgetting the plot of chapter 1.
      </Callout>

      <h2>Memory Size Over Time</h2>
      <p>
        Context windows have grown exponentially, transforming what we can use LLMs for. 
        It's basically a race for who can handle the most "memory".
      </p>

      <StepCards 
        steps={[
          { icon: "📜", title: "GPT-3 (2,048 tokens)", description: "~1.5 pages of text. Purely for short chat completions." },
          { icon: "📘", title: "GPT-4 (128k tokens)", description: "~300 pages of text. Can read entire books at once." },
          { icon: "🏛️", title: "Gemini 1.5 (2M tokens)", description: "~1,500 pages. Can process hours of video or massive codebases." },
        ]}
      />

      <Callout icon="⚠️" className="bg-[#fef2f2] border-[#fecaca] [&>div:last-child]:text-[#991b1b]">
        <strong>Lost in the Middle:</strong> <br/>
        Even with a 128k context window, models are most accurate at the <strong>beginning</strong> and <strong>end</strong> 
        of a prompt. They often "forget" details hidden in the middle of a massive block of text.
      </Callout>

      <KeyTerms 
        terms={[
          { name: "Context Window", definition: "Maximum total tokens (Input + Output) a model can handle.", color: "#10b981" },
          { name: "Needle in a Haystack", definition: "A test used to see if an LLM can find a specific fact hidden inside a massive context window.", color: "#0ea5e9" },
          { name: "System Hard Limit", definition: "Exceeding the window results in a 'context overflow' error.", color: "#ef4444" }
        ]}
      />
    </>
  );
}
