import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";
import { KeyTerms } from "@/components/ui/KeyTerms";
import { CodeBlock } from "@/components/code/CodeBlock";
import { LessonHeader } from "@/components/ui/LessonHeader";

export default function OutputControlPage() {
  const codeEx = `
import { generateObject } from 'ai';
import { z } from 'zod';

const { object } = await generateObject({
  model: openai('gpt-4o'),
  schema: z.object({
    recipeName: z.string(),
    ingredients: z.array(z.object({
      name: z.string(),
      amount: z.string()
    })),
  }),
  prompt: 'Give me a recipe for chocolate chip cookies.'
});
  `;

  return (
    <>
      <LessonHeader 
        title="Output Control" 
        subtitle="If you ask an LLM for data, it will usually wrap it in conversational filler. Structured outputs ensure the model returns exactly the JSON format your code expects." 
      />

      <h2>Structured Outputs</h2>
      <p>
        Modern APIs allow you to pass a strict <strong>JSON Schema</strong>. 
        The model is mathematically guaranteed to output exactly the format you requested.
      </p>

      <CodeBlock 
        code={codeEx} 
        language="typescript" 
        filename="app/api/recipe/route.ts" 
      />

      <StepCards 
        steps={[
          { icon: "🛡️", title: "Type Safety", description: "Guaranteed JSON format that perfectly matches your TypeScript types." },
          { icon: "🚫", title: "No Filler", description: "No 'Sure! Here is the JSON' conversational text." },
          { icon: "✨", title: "Zod Schema", description: "Define your output format once and use it everywhere." },
        ]}
      />

      <Callout icon="⭐" className="bg-[#f0fdfa] border-[#5eead4] [&>div:last-child]:text-[#0f766e]">
        <strong>Zod + Vercel AI SDK:</strong> <br/>
        This is the modern way to handle outputs. You get flawless, 
        type-safe data extraction every single time!
      </Callout>

      <KeyTerms 
        terms={[
          { name: "JSON Mode", definition: "A model setting that ensures the output is valid JSON.", color: "#8b5cf6" },
          { name: "Structured Output", definition: "A stricter constraint that follows a specific schema.", color: "#10b981" },
          { name: "Zod", definition: "A TypeScript validation library for defining schemas.", color: "#3b82f6" },
        ]}
      />
    </>
  );
}
