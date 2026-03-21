import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";

export default function AdvancedRagPage() {
  return (
    <>
      <p className="text-lg">
        Basic RAG (Vector Search) is amazing until you put it in production. You will quickly realize 
        it fails constantly. It pulls up irrelevant chunks of text, hallucinates facts, or completely 
        misses the specific answer buried in a table. Welcome to Advanced RAG.
      </p>

      <h2>The Problems with Naive RAG</h2>
      <p>
        If a user asks "Who is the CEO of Apple?", the keywords match "CEO" and "Apple". But if the chunk 
        simply says, "The CEO stood by the Apple logo," the vector distance is incredibly close, but it doesn't 
        answer the question.
      </p>

      <h2>Advanced RAG Techniques</h2>

      <StepCards 
        steps={[
          { icon: "🔄", title: "Query Expansion", description: "Asking an LLM to rewrite the user's sloppy query into 3 perfect queries before searching the Vector DB." },
          { icon: "⚖️", title: "Hybrid Search", description: "Combining modern Vector Search (meaning) with old-school Keyword Search (BM25) to get the best of both worlds." },
          { icon: "🏆", title: "Reranking", description: "Fetching the top 50 chunks quickly, then using a very slow, highly accurate 'Cross-Encoder' model to grade and sort the top 5." },
        ]}
      />

      <Callout icon="📝">
        <strong>Metadata Filtering:</strong> The easiest way to fix RAG is to not rely solely on vectors. 
        When you upload a PDF for a specific user, tag it with their <code>userId</code>. Then, when searching, 
        add a hard SQL-like filter: <code>{`{ userId: "123" }`}</code>. This prevents the LLM from accidentally 
        reading another user's private data!
      </Callout>
    </>
  );
}
