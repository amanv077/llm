import { CodeBlock } from "@/components/code/CodeBlock";

export default function StreamingPage() {
  const codeEx = `
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
  });

  return result.toDataStreamResponse();
}
  `;

  return (
    <>
      <p>
        Because LLMs generate text token-by-token, a long response can take 10-20 seconds to fully complete. 
        If users stare at a loading spinner for that long, they will think your app is broken.
      </p>

      <h2>The Solution: Server-Sent Events (SSE)</h2>
      <p>
        Instead of waiting for the entire generation to finish, we can stream tokens to the frontend 
        <strong>as soon as they are generated</strong>. This reduces perceived latency to mere milliseconds.
      </p>

      <h2>Vercel AI SDK</h2>
      <p>
        The standard way to implement streaming in Next.js is using the Vercel AI SDK. It handles the complex 
        <code>ReadableStream</code> and SSE parsing logic for you.
      </p>

      <CodeBlock 
        code={codeEx} 
        language="typescript" 
        filename="app/api/chat/route.ts" 
      />

      <blockquote>
        <p>
          <strong>UX Best Practice:</strong> Always use streaming for chat interfaces or long document generation. 
          Use blocking requests (no streaming) for background tasks, structured data extraction (JSON), or fast models.
        </p>
      </blockquote>
    </>
  );
}
