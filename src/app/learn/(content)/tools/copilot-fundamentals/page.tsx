import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";

export default function CopilotFundamentalsPage() {
  return (
    <>
      <p className="text-lg">
        AI Coding Assistants (like GitHub Copilot, Cursor, and Windsurf) have changed software engineering forever. 
        Learning how to effectively "pair program" with these tools is arguably the single most important skill 
        you can learn this decade.
      </p>

      <h2>The Three Types of AI Assistance</h2>
      <p>
        AI in your IDE generally takes three distinct forms:
      </p>

      <StepCards 
        steps={[
          { icon: "⌨️", title: "Autocomplete", description: "Ghost text that predicts the rest of your line or function as you type." },
          { icon: "💬", title: "Chat / Sidebar", description: "A conversational interface where you can ask questions about your open files." },
          { icon: "⚡", title: "Agents (Cmd+K)", description: "In-line edits where the AI physically rewrites your code files for you." },
        ]}
      />

      <Callout icon="🧠" className="bg-[#f3e8ff] border-[#e9d5ff] [&>div:last-child]:text-[#7e22ce]">
        <strong>The "Context" Secret:</strong> Copilot Autocomplete is brilliant, but it is effectively blind. 
        It usually only "sees" the file you are currently editing and a few files you recently had open in other tabs. 
        If you want it to use a specific utility function from another folder, <strong>open that file in a split tab</strong>.
      </Callout>

      <h2>When NOT to use Copilot</h2>
      <p>
        AI creates code incredibly fast. This is dangerous if you are working in an unfamiliar legacy codebase. 
        If you blindly accept a 50-line suggestion without understanding it, you have just introduced Technical Debt 
        at the speed of light.
      </p>
    </>
  );
}
