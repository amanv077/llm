import { RagInteractive } from "@/features/rag/RagInteractive";
import { LessonHeader } from "@/components/ui/LessonHeader";
import { StepCards } from "@/components/ui/StepCards";
import { Callout } from "@/components/ui/Callout";
import { KeyTerms } from "@/components/ui/KeyTerms";

export default function RagPipelinePage() {
  return (
    <>
      <LessonHeader 
        title="RAG Pipeline" 
        subtitle="The biggest flaw of LLMs is that they are frozen in time. A RAG Pipeline ensures your AI always has access to the most up-to-date and proprietary data available." 
      />

      <RagInteractive />

      <h2 className="mt-12">The Three Phases of RAG</h2>
      <StepCards 
        steps={[
          { icon: "📥", title: "Ingestion", description: "Split your docs into chunks, create embeddings, and store them in a Vector Database." },
          { icon: "🔍", title: "Retrieval", description: "Convert the user query to a vector and find the Top 5 most similar chunks from your DB." },
          { icon: "✨", title: "Generation", description: "Paste the chunks and the user's question into one big prompt for the LLM to answer." },
        ]}
      />

      <Callout icon="🤔" className="bg-[#fffbeb] border-[#fde68a] [&>div:last-child]:text-[#92400e]">
        <strong>RAG vs Fine-Tuning?</strong> <br/>
        Fine-tuning is for teaching <strong>style</strong> and tone. <br/>
        RAG is for giving <strong>facts</strong> and knowledge. <br/>
        RAG is 100x cheaper, faster, and much more accurate for business data!
      </Callout>

      <KeyTerms 
        terms={[
          { name: "Chunks", definition: "Small segments of text (like paragraphs) that are easily searchable.", color: "#8b5cf6" },
          { name: "Augmented", definition: "When we 'beef up' the user's prompt by adding facts the AI didn't know.", color: "#10b981" },
          { name: "LLM-as-a-Judge", definition: "Using a smarter model to verify if the RAG response was actually correct.", color: "#3b82f6" },
        ]}
      />
    </>
  );
}
