import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";
import { KeyTerms } from "@/components/ui/KeyTerms";
import { LessonHeader } from "@/components/ui/LessonHeader";

export default function AdvancedRagPage() {
  return (
    <>
      <LessonHeader 
        title="Advanced RAG" 
        subtitle="Basic RAG is amazing until you put it in production. You will quickly realize it fails constantly. Advanced RAG techniques are built to handle messy, real-world data at scale." 
      />

      <h2>The Problems with Naive RAG</h2>
      <Callout icon="⚠️" className="bg-[#fef2f2] border-[#fecaca] [&>div:last-child]:text-[#991b1b]">
        <strong>Keywords vs Meaning:</strong> <br/>
        If a user asks "Who is the CEO?", vectors find "CEO". But if the chunk 
        simply says "The CEO walked by," it doesn't actually answer the question!
      </Callout>

      <h2>Advanced Techniques</h2>
      <StepCards 
        steps={[
          { icon: "🔄", title: "Query Expansion", description: "Asking an LLM to rewrite a user's sloppy query into 3 perfect ones." },
          { icon: "⚖️", title: "Hybrid Search", description: "Combining Vector Search (meaning) with Keyword Search (BM25)." },
          { icon: "🏆", title: "Reranking", description: "Fetching top 50 chunks, then using a slow, accurate model to sort the top 5." },
        ]}
      />

      <Callout icon="📝">
        <strong>Metadata Filtering:</strong> <br/>
        Don't rely solely on vectors. Tag documents with <code>userId</code> or <code>source</code> 
        and add hard SQL filters to your search for 100% accuracy.
      </Callout>

      <KeyTerms 
        terms={[
          { name: "Reranker", definition: "A secondary model that grades and sorts the top search results.", color: "#8b5cf6" },
          { name: "Query Expansion", definition: "Rewriting the user prompt to improve search accuracy.", color: "#10b981" },
          { name: "BM25", definition: "The classic keyword search algorithm used in Hybrid Search.", color: "#3b82f6" },
        ]}
      />
    </>
  );
}
