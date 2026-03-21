import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";
import { KeyTerms } from "@/components/ui/KeyTerms";
import { LessonHeader } from "@/components/ui/LessonHeader";

export default function AiToolsStrategyPage() {
  return (
    <>
      <LessonHeader 
        title="AI Tools Strategy" 
        subtitle="With hundreds of AI tools releasing every week, it's easy to get overwhelmed. A pro AI engineer knows exactly which tool to use for each specific workflow." 
      />

      <h2>The Modern Dev Stack</h2>
      <p>
        Don't try to use everything at once. This is the industry-standard "Power Stack":
      </p>

      <StepCards 
        steps={[
          { icon: "💻", title: "Cursor", description: "The premier AI Code Editor. Replaces VS Code for most hackers." },
          { icon: "🎨", title: "v0 by Vercel", description: "Generates stunning UI components and Tailwind layouts from a prompt." },
          { icon: "💬", title: "ChatGPT / Claude", description: "Use for deep architectural planning and high-level logic flaws." },
          { icon: "🤖", title: "Perplexity", description: "The Google replacement for searching documentation or code errors." },
        ]}
      />

      <Callout icon="⚖️" className="bg-[#f0f9ff] border-[#bae6fd] [&>div:last-child]:text-[#0369a1]">
        <strong>The Delegation Rule:</strong> <br/>
        Never ask an AI to build a whole app in one prompt. Break it into tiny pieces. 
        Build the button. Test it. Build the header. Test it.
      </Callout>

      <Callout icon="💰" className="bg-[#f0fdf4] border-[#bbf7d0] [&>div:last-child]:text-[#166534]">
        <strong>Stop Over-Subscribing:</strong> <br/>
        You don't need every pro account. Cursor Pro actually lets you switch between 
        GPT-4o and Claude 3.5 Sonnet directly inside your editor!
      </Callout>

      <KeyTerms 
        terms={[
          { name: "Context Pollution", definition: "When you feed the AI too many files, making it confused and slow.", color: "#ef4444" },
          { name: "IDE-First", definition: "Working directly in the editor instead of copy-pasting from a browser.", color: "#10b981" },
          { name: "v0", definition: "Vercel's generative UI tool for speedrunning frontend development.", color: "#3b82f6" },
        ]}
      />
    </>
  );
}
