import { RagInteractive } from "@/features/rag/RagInteractive";

export default function RagPipelinePage() {
  return (
    <>
      <p>
        The biggest flaw of LLMs is that they are frozen in time. They don't know what happened yesterday, 
        and they certainly don't know the specifics of your company's proprietary database.
      </p>

      <h2>The Solution: Retrieval-Augmented Generation</h2>
      <p>
        RAG is a technique that gives an LLM access to external knowledge. Instead of relying purely on its 
        pre-trained memory, we dynamically <strong>retrieve</strong> relevant facts and insert them into the 
        prompt before asking it to <strong>generate</strong> an answer.
      </p>

      <RagInteractive />

      <h2>The Three Phases of RAG</h2>
      <ol>
        <li>
          <strong>Ingestion (Data Prep):</strong> This happens behind the scenes. You take all your company's PDFs, 
          Confluence pages, and database records, split them into paragraphs (chunks), create embeddings for each 
          chunk, and store them in a Vector Database.
        </li>
        <li>
          <strong>Retrieval (The Search):</strong> When a user asks "What is our refund policy?", you embed that query 
          into a vector. You then search the Vector Database for the nearest neighbors (the most mathematically similar chunks).
        </li>
        <li>
          <strong>Generation (The Synthesis):</strong> You take the top 5 chunks returned from the search, paste them 
          into a large prompt alongside the user's original query, and tell the LLM: <em>"Base your answer ONLY on the context provided."</em>
        </li>
      </ol>

      <blockquote>
        <p>
          <strong>Why not just fine-tune?</strong> Fine-tuning is for teaching an LLM <em>how</em> to act (tone, format). 
          RAG is for giving an LLM <em>what to know</em> (facts, proprietary data). RAG is cheaper, faster to update, and 
          vastly reduces hallucinations.
        </p>
      </blockquote>
    </>
  );
}
