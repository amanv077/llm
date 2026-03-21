import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";
import { KeyTerms } from "@/components/ui/KeyTerms";
import { LessonHeader } from "@/components/ui/LessonHeader";

export default function ArchitecturePage() {
  return (
    <>
      <LessonHeader 
        title="System Architecture" 
        subtitle="Building an AI product isn't just about calling an API once. Real-world LLM applications require a robust, multi-layered architecture to handle memory, search, and safety." 
      />

      <h2>The Standard Backend</h2>
      <p>
        A professional LLM system has heavily layered protections and processing pipelines.
      </p>

      <StepCards 
        steps={[
          { icon: "🚪", title: "API Gateway", description: "Handles rate-limiting and routing for your web frontend." },
          { icon: "🛡️", title: "Guardrail Layer", description: "Intercepts prompts to block injections and off-topic requests." },
          { icon: "🗄️", title: "RAG / Context", description: "Fetches user data and chat history from Vector Databases." },
          { icon: "🧠", title: "Orchestrator", description: "Sends the final assembled prompt to the LLM via SDK." },
        ]}
      />

      <Callout icon="🔒" className="bg-[#fef2f2] border-[#fecaca] [&>div:last-child]:text-[#991b1b]">
        <strong>Never Expose API Keys:</strong> <br/>
        Never put your keys in your React frontend. If you do, anyone can steal them and build a massive bill on your card. 
        Always call your backend first!
      </Callout>

      <h2>Microservices vs Monoliths</h2>
      <p>
        Many companies use <strong>TypeScript/Next.js</strong> for their product UI, but a dedicated 
        <strong>Python/FastAPI</strong> microservice for the RAG and AI logic.
      </p>

      <KeyTerms 
        terms={[
          { name: "Orchestrator", definition: "A library (LangChain, AI SDK) that coordinates prompt assembly.", color: "#8b5cf6" },
          { name: "Rate Limiting", definition: "Slowing down requests to prevent over-spending your API budget.", color: "#10b981" },
          { name: "Proxy", definition: "A middle-man between your app and OpenAI to monitor and cache requests.", color: "#3b82f6" },
        ]}
      />
    </>
  );
}
