import { Callout } from "@/components/ui/Callout";
import { KeyTerms } from "@/components/ui/KeyTerms";
import { StepCards } from "@/components/ui/StepCards";
import { LessonHeader } from "@/components/ui/LessonHeader";

export default function CopilotMasteryPage() {
  return (
    <>
      <LessonHeader 
        title="Copilot Mastery" 
        subtitle="Mastering tools like Cursor or Windsurf requires a mindset shift. You are no longer just a 'Coder'—you are a professional 'Reviewer' and 'Director'." 
      />

      <h2>The Power of Context</h2>
      <p>
        Modern AI IDEs use the <code>@</code> symbol to target specific data sources. 
        Use it carefully to avoid "Context Pollution."
      </p>

      <StepCards 
        steps={[
          { icon: "📄", title: "@Files", description: "Manually attach the exact files the AI needs to read. Fixes 90% of bugs." },
          { icon: "📂", title: "@Folders", description: "Give the AI the whole context of a feature or module." },
          { icon: "🌐", title: "@Web", description: "Force the AI to search the internet for the absolute latest docs." },
        ]}
      />

      <Callout icon="⭐" className="bg-[#fffbeb] border-[#fde68a] [&>div:last-child]:text-[#92400e]">
        <strong>Write Comments FIRST:</strong> <br/>
        Write a detailed comment describing the function you want. Press Enter. 
        The AI will write the code perfectly based on your description.
      </Callout>

      <KeyTerms 
        terms={[
          { name: "Agentic Mode", definition: "When the AI can run terminal commands and edit multiple files automatically.", color: "#8b5cf6" },
          { name: "Diff View", definition: "The red/green visualization of changes before you 'Accept' them.", color: "#10b981" },
          { name: "Context limit", definition: "The max tokens the AI can process from your folder.", color: "#ef4444" },
        ]}
      />
    </>
  );
}
