import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";
import { KeyTerms } from "@/components/ui/KeyTerms";
import { LessonHeader } from "@/components/ui/LessonHeader";

export default function IntroRagPage() {
  return (
    <>
      <LessonHeader 
        title="Introduction to RAG" 
        subtitle="LLMs are smart, but they are frozen in time. They don't know about your private files or today's news. RAG solves this by giving the AI an 'Open Book' to read from." 
      />

      <Callout icon="📚" className="bg-[#f0f9ff] border-[#bae6fd] [&>div:last-child]:text-[#0369a1]">
        <strong>RAG = Retrieval Augmented Generation.</strong> <br/>
        Instead of relying on its memory, the model <strong>retrieves</strong> relevant facts 
        from your docs and <strong>generates</strong> an answer based on them.
      </Callout>

      <h2>The 3 Steps of RAG</h2>
      <p>
        RAG follows a very specific three-part workflow that turns a model from a "knower" into a "researcher".
      </p>

      <StepCards 
        steps={[
          { icon: "🔍", title: "Retrieve", description: "Find the needle in the haystack (your private data)." },
          { icon: "🏗️", title: "Augment", description: "Combine those facts with the user's question." },
          { icon: "✨", title: "Generate", description: "The LLM writes the answer using the provided context." },
        ]}
      />

      <Callout icon="⚖️">
        <strong>Fine-Tuning vs RAG:</strong> <br/>
        Fine-tuning is like teaching a student for months (expensive, slow). <br/>
        RAG is like giving the student an open textbook during an exam (cheap, fast, accurate).
      </Callout>

      <KeyTerms 
        terms={[
          { name: "Hallucination", definition: "When a model makes up a fact. RAG reduces this by providing real context.", color: "#ef4444" },
          { name: "Ground Truth", definition: "The verified documents the AI is allowed to read from.", color: "#10b981" },
          { name: "Retrieval", definition: "The act of searching and finding the right info.", color: "#3b82f6" },
        ]}
      />
    </>
  );
}
