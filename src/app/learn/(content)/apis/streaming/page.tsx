import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";
import { KeyTerms } from "@/components/ui/KeyTerms";
import { CodeBlock } from "@/components/code/CodeBlock";
import { LessonHeader } from "@/components/ui/LessonHeader";

export default function StreamingPage() {
  const codeEx = `
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

const result = await streamText({
  model: openai('gpt-4o'),
  prompt: 'Write a 100-word story about a robot.',
});

// Stream the response back to the client!
for await (const textPart of result.textStream) {
  process.stdout.write(textPart);
}
  `;

  return (
    <>
      <LessonHeader 
        title="Streaming Responses" 
        subtitle="LLMs are slow. Waiting 10 seconds for a full paragraph feels like an eternity. Streaming fixes this by sending text as it's being born, word by word." 
      />

      <Callout icon="🌊" className="bg-[#f0fdfa] border-[#5eead4] [&>div:last-child]:text-[#0f766e]">
        <strong>Don't wait for the full birth.</strong> <br/>
        The first word appears in ~200ms. The user sees it "typing" in real-time, 
        which feels 10x faster than waiting for the whole paragraph!
      </Callout>

      <h2>The UX Speed Test</h2>
      <StepCards 
        steps={[
          { icon: "🐢", title: "Blocking", description: "Wait 10s... Get everything at once. Frustrating & slow." },
          { icon: "🐇", title: "Streaming", description: "See first word in 0.2s. Smooth & interactive." },
        ]}
      />

      <CodeBlock 
        code={codeEx} 
        language="typescript" 
        filename="app/api/chat/route.ts" 
      />

      <Callout icon="🔌" className="bg-[#fffbeb] border-[#fde68a] [&>div:last-child]:text-[#92400e]">
        <strong>The "Garden Hose" Metaphor:</strong> <br/>
        Traditional APIs are like a bucket of water. Streaming is like a garden hose. 
        The water starts flowing immediately, token by token!
      </Callout>

      <KeyTerms 
        terms={[
          { name: "Chunks", definition: "Individual parts of the stream containing one or more tokens.", color: "#8b5cf6" },
          { name: "TTFT", definition: "Time To First Token. The most important metric for UX.", color: "#10b981" },
          { name: "Finish Reason", definition: "Why the stream ended (e.g., 'stop' or 'length').", color: "#3b82f6" },
        ]}
      />
    </>
  );
}
