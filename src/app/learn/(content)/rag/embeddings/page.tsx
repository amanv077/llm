import { EmbeddingsInteractive } from "@/features/embeddings/EmbeddingsInteractive";

export default function EmbeddingsPage() {
  return (
    <>
      <p>
        How does a computer understand that "cat" and "kitten" mean basically the same thing, 
        but "cat" and "car" are completely different? The answer is <strong>Embeddings</strong>.
      </p>

      <EmbeddingsInteractive />

      <h2>The Math of Meaning</h2>
      <p>
        An embedding model (like OpenAI's <code>text-embedding-3-small</code>) takes any piece of text 
        and converts it into a long list of numbers—a vector. Often these vectors have thousands of dimensions.
      </p>
      <p>
        In high-dimensional space, the distance between two vectors represents their semantic similarity. 
        Words, sentences, or even entire documents with alike meanings will end up grouped closely together.
      </p>

      <h2>Why Are Vectors Useful?</h2>
      <ul>
        <li><strong>Search:</strong> You can search for "canine companion" and find "dog," even though the exact words don't match.</li>
        <li><strong>Clustering:</strong> You can automatically group thousands of customer support tickets by topic.</li>
        <li><strong>Anomaly Detection:</strong> You can find the one document that doesn't fit the rest of the dataset.</li>
      </ul>

      <blockquote>
        <p>
          <strong>The Core of Modern AI:</strong> Embeddings are the bridge between human language and 
          machine math. They are the engine that makes RAG (Retrieval-Augmented Generation) possible.
        </p>
      </blockquote>
    </>
  );
}
