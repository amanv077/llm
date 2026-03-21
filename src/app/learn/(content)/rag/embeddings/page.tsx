import { EmbeddingsInteractive } from "@/features/embeddings/EmbeddingsInteractive";
import { LessonHeader } from "@/components/ui/LessonHeader";
import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";
import { KeyTerms } from "@/components/ui/KeyTerms";

export default function EmbeddingsPage() {
  return (
    <>
      <LessonHeader 
        title="Embeddings & Vectors" 
        subtitle="How does a computer understand that 'cat' and 'kitten' mean basically the same thing? The answer is Embeddings — the bridge between language and machine math." 
      />

      <EmbeddingsInteractive />

      <Callout icon="🔢" className="bg-[#f0f9ff] border-[#bae6fd] [&>div:last-child]:text-[#0369a1]">
        <strong>The Math of Meaning:</strong> <br/>
        An embedding model takes any text and converts it into a long list of numbers—a <strong>Vector</strong>. 
        Think of it as a 3D coordinate for the "vibe" of a word!
      </Callout>

      <h2>Why Are Vectors Useful?</h2>
      <StepCards 
        steps={[
          { icon: "🔍", title: "Semantic Search", description: "Search for 'canine companion' and find 'dog' instantly." },
          { icon: "📂", title: "Clustering", description: "Automatically group thousands of documents by their actual meaning." },
          { icon: "🚨", title: "Anomalies", description: "Quickly spot the one document that doesn't fit the rest of the gang." },
        ]}
      />

      <Callout icon="💎" className="bg-[#f3e8ff] border-[#e9d5ff] [&>div:last-child]:text-[#7e22ce]">
        <strong>The Core of Modern AI:</strong> <br/>
        Embeddings are why RAG (Retrieval-Augmented Generation) works. 
        Instead of matching exact keywords, the AI finds the <strong>Closest Neighbor</strong> 
        in a vast mathematical space!
      </Callout>

      <KeyTerms 
        terms={[
          { name: "Vector", definition: "A list of numbers that represents the 'meaning' of text.", color: "#8b5cf6" },
          { name: "Dimensions", definition: "The number of coordinates in a vector (OpenAI uses ~1,536).", color: "#10b981" },
          { name: "Similarity", definition: "How close two vectors are in space (usually measured by Cosine distance).", color: "#3b82f6" },
        ]}
      />
    </>
  );
}
