import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";

export default function ArchitecturePage() {
  return (
    <>
      <p className="text-lg">
        Building an AI product isn't just about calling an API. Real-world LLM applications require 
        a robust, scalable, and secure architecture. If you wire your frontend directly to OpenAI, 
        you are building a toy, not a business.
      </p>

      <h2>The Standard Backend Architecture</h2>
      <p>
        A professional LLM system has heavily layered protections and processing pipelines.
      </p>

      <StepCards 
        steps={[
          { icon: "🚪", title: "API Gateway", description: "Handles rate-limiting, authentication, and routing traffic from your web frontend." },
          { icon: "🛡️", title: "Guardrail Layer", description: "Intercepts the user prompt to block prompt-injections, profanity, and off-topic requests." },
          { icon: "🗄️", title: "RAG / Context", description: "Fetches user data, chat history, and vector embeddings from PostgreSQL/Pinecone." },
          { icon: "🧠", title: "LLM Orchestrator", description: "The actual code (LangChain, AI SDK) that sends the massive assembled prompt to the LLM." },
        ]}
      />

      <Callout icon="🔒" className="bg-[#fef2f2] border-[#fecaca] [&>div:last-child]:text-[#991b1b]">
        <strong>Never Expose API Keys:</strong> Never put your <code>OPENAI_API_KEY</code> in your React frontend. 
        If you do, anyone can open their browser's DevTools, steal your key, and rack up a $10,000 bill on your credit card. 
        Always make the frontend call your backend, and your backend calls OpenAI securely.
      </Callout>

      <h2>Microservices vs Monoliths</h2>
      <p>
        Because Python has the deepest machine learning ecosystem, many companies use an architecture where their 
        main product is a <strong>TypeScript/Next.js</strong> Monolith, but it communicates via API with a 
        small, dedicated <strong>Python/FastAPI</strong> microservice that strictly handles the AI routing and RAG pipeline.
      </p>
    </>
  );
}
