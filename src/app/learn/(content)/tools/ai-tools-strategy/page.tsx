import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";

export default function AiToolsStrategyPage() {
  return (
    <>
      <p className="text-lg">
        With hundreds of AI tools releasing every week, it's easy to get overwhelmed. 
        A strong AI engineering strategy means knowing exactly which tool to use for the job, 
        rather than trying to use everything at once.
      </p>

      <h2>The Engineering Stack</h2>
      <p>
        Here is the industry-standard developer stack as of mid-2024:
      </p>

      <StepCards 
        steps={[
          { icon: "💻", title: "Cursor", description: "The premier AI Code Editor. Replaces VS Code." },
          { icon: "🎨", title: "v0 by Vercel", description: "Generates stunning UI components and Tailwind designs from text." },
          { icon: "💬", title: "ChatGPT", description: "Used strictly for brainstorming architecture and debugging deep logic flaws." },
          { icon: "🤖", title: "Perplexity", description: "Replaces Google for instantly searching up documentation or dev errors." },
        ]}
      />

      <Callout icon="⚖️">
        <strong>The Rule of Delegation:</strong> Never ask an AI to design, build, and deploy an entire app in one prompt. 
        Break the system into microscopic chunks. Ask the AI to build the Login Button, test it. Then ask it to build the Header.
      </Callout>

      <h2>Stop Paying for Everything</h2>
      <p>
        You do not need subscriptions to ChatGPT Plus, Claude Pro, GitHub Copilot, and Cursor all at once. 
        Cursor Pro actually includes the ability to toggle between GPT-4o and Claude 3.5 Sonnet directly in your editor!
      </p>
    </>
  );
}
