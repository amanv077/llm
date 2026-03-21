import { CodeBlock } from "@/components/code/CodeBlock";
import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";
import { KeyTerms } from "@/components/ui/KeyTerms";
import { LessonHeader } from "@/components/ui/LessonHeader";

export default function FirstApiCallPage() {
  const codeParams = `
const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: \`Bearer \${process.env.OPENAI_API_KEY}\`,
  },
  body: JSON.stringify({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Write a haiku about programming." }
    ],
    temperature: 0.7,
  }),
});

const data = await response.json();
console.log(data.choices[0].message.content);
  `;

  return (
    <>
      <LessonHeader 
        title="Your First API Call" 
        subtitle="Most developers interact with LLMs via a REST API. You send a structured prompt, and the server responds with a completion — essentially a remote brain you can query from code." 
      />

      <CodeBlock 
        code={codeParams} 
        language="typescript" 
        filename="api/chat/route.ts" 
      />

      <h2>The Required Fields</h2>
      <p>
        To get a successful response, your request must contain these core building blocks:
      </p>

      <StepCards 
        steps={[
          { icon: "🤖", title: "model", description: "The foundation model you want to use (e.g., 'gpt-4o', 'claude-3-5')." },
          { icon: "📜", title: "messages", description: "An array of conversation turns including system, user, and assistant roles." },
          { icon: "🌡️", title: "temperature", description: "A number between 0 and 2 that controls the creativity of the output." },
        ]}
      />

      <Callout icon="⚖️">
        <strong>LLMs are Stateless:</strong> <br/>
        An LLM does not remember your previous questions. If you ask <em>"What is my name?"</em> 
        in a second request, it will forget unless you send the <strong>entire</strong> history 
        back in the <code>messages</code> array!
      </Callout>

      <h2>The Standard Response</h2>
      <p>
        The API typically returns a large JSON object containing token usage stats and the actual response text.
      </p>

      <KeyTerms 
        terms={[
          { name: "Choices", definition: "An array of possible completions (usually just one, called index 0).", color: "#8b5cf6" },
          { name: "Usage", definition: "The total points (tokens) used for your prompt and the reply.", color: "#10b981" },
          { name: "Finish Reason", definition: "Why the model stopped (e.g. 'stop' or 'length').", color: "#3b82f6" },
        ]}
      />
    </>
  );
}
