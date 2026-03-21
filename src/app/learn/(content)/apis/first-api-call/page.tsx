import { CodeBlock } from "@/components/code/CodeBlock";

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
      <p>
        Most developers interacting with LLMs use an API. You send a <strong>prompt</strong>, and 
        the server responds with a <strong>completion</strong>. Let's look at the standard JSON payload.
      </p>

      <CodeBlock 
        code={codeParams} 
        language="typescript" 
        filename="api/chat/route.ts" 
      />

      <h2>The Required Fields</h2>
      <ul>
        <li>
          <code>model</code>: The foundation model you want the provider to use (e.g., <code>"gpt-4o"</code>, <code>"claude-3-5-sonnet-20240620"</code>).
        </li>
        <li>
          <code>messages</code>: A structured array of previous conversation turns. This is required because LLMs are 
          <strong>stateless</strong>. You must send the entire conversation history every time.
        </li>
      </ul>

      <h2>The Standard Response</h2>
      <p>
        The API typically returns a large JSON object containing token usage stats and the actual response text, 
        nested inside a <code>choices</code> array.
      </p>
    </>
  );
}
