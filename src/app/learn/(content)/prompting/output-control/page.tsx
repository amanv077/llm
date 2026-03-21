import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/code/CodeBlock";

export default function OutputControlPage() {
  const codeEx = `
import { generateObject } from 'ai';
import { z } from 'zod';
import { openai } from '@ai-sdk/openai';

const { object } = await generateObject({
  model: openai('gpt-4o'),
  schema: z.object({
    recipeName: z.string(),
    ingredients: z.array(z.object({
      name: z.string(),
      amount: z.string()
    })),
    steps: z.array(z.string())
  }),
  prompt: 'Give me a recipe for chocolate chip cookies.'
});

console.log(object.recipeName); // Guaranteed to be a string
  `;

  return (
    <>
      <p className="text-lg">
        If you ask an LLM to give you data, by default, it will wrap it in chatty conversational filler: 
        <em>"Sure! I can help with that. Here is the JSON you requested: ..."</em>. 
        This will immediately crash your <code>JSON.parse()</code>.
      </p>

      <h2>Structured Outputs</h2>
      <p>
        The most important breakthrough in AI application development is <strong>Structured Outputs</strong>. 
        Instead of begging the model to "only output valid JSON", modern APIs allow you to pass a strict 
        JSON Schema. The model is mathematically guaranteed to output exactly the format you requested, 
        with zero conversational filler.
      </p>

      <CodeBlock 
        code={codeEx} 
        language="typescript" 
        filename="app/api/recipe/route.ts" 
      />

      <Callout icon="🛡️" className="bg-[#f0fdfa] border-[#5eead4] [&>div:last-child]:text-[#0f766e]">
        <strong>Zod + Vercel AI SDK:</strong> The modern way to handle outputs is by defining your schema 
        with <strong>Zod</strong> (a TypeScript validation library) and passing it to the <code>generateObject</code> function. 
        You get flawless, type-safe data extraction every single time!
      </Callout>
    </>
  );
}
