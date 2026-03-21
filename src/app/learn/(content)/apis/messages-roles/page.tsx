import { Callout } from "@/components/ui/Callout";
import { KeyTerms } from "@/components/ui/KeyTerms";
import { CodeBlock } from "@/components/code/CodeBlock";

export default function MessagesRolesPage() {
  const codeEx = `
[
  { 
    "role": "system", 
    "content": "You are a helpful pirate assistant. Talk entirely in pirate slang." 
  },
  { 
    "role": "user", 
    "content": "Where can I find the best pizza in New York?" 
  },
  { 
    "role": "assistant", 
    "content": "Arrr matey! The best slice of pie be found hidden in the back alleys of..." 
  }
]
  `;

  return (
    <>
      <p className="text-lg">
        Unlike a normal Google Search, LLMs are designed to handle <strong>conversations</strong>. 
        But because they have no intrinsic memory, you must feed them the entire transcript 
        of the conversation every single time you talk to them.
      </p>

      <h2>The Three Roles</h2>
      <p>
        To keep the transcript organized, the API separates text into <code>Messages</code>, 
        each assigned a specific <code>Role</code>. Let's look at the standard JSON structure:
      </p>

      <CodeBlock 
        code={codeEx} 
        language="json" 
        filename="messages.json" 
      />

      <Callout icon="🎭">
        <strong>The System Prompt</strong> is the most important part of AI development. It is the "director's instructions" 
        telling the AI who to be, what rules to follow, and what format to reply in.
      </Callout>

      <KeyTerms 
        terms={[
          { name: "System", definition: "The hidden instructions that define the AI's persona and rules.", color: "#8b5cf6" },
          { name: "User", definition: "The human typing the prompt.", color: "#10b981" },
          { name: "Assistant", definition: "The LLM's previous replies.", color: "#3b82f6" },
        ]}
      />
    </>
  );
}
