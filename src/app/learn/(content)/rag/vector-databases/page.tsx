import { Callout } from "@/components/ui/Callout";
import { KeyTerms } from "@/components/ui/KeyTerms";
import { StepCards } from "@/components/ui/StepCards";
import { LessonHeader } from "@/components/ui/LessonHeader";

export default function VectorDatabasesPage() {
  return (
    <>
      <LessonHeader 
        title="Vector Databases" 
        subtitle="A Vector Database is a specialized storage engine designed specifically to hold and search through massive multi-dimensional number arrays (Embeddings)." 
      />

      <h2>Why Can't I Use SQL?</h2>
      <p>
        Normal databases (like Postgres) search by exact keyword matches. Vector DBs search by <strong>meaning</strong>.
      </p>
      
      <Callout icon="🔍" className="bg-[#f0f9ff] border-[#bae6fd] [&>div:last-child]:text-[#0369a1]">
        <strong>Semantic Search:</strong> <br/>
        If a user searches for <em>"How do I reset my password?"</em>, a traditional SQL query 
        will fail if the actual document is titled <em>"Account Recovery Options"</em>. 
        A Vector DB finds both because they are mathematically similar!
      </Callout>

      <h2>The Big Three</h2>
      <StepCards 
        steps={[
          { icon: "🌲", title: "Pinecone", description: "The industry standard managed vector database. Very easy to scale." },
          { icon: "🐘", title: "pgvector", description: "An extension for PostgreSQL. Use it if you already have a Postgres DB." },
          { icon: "🧭", title: "Weaviate", description: "Open-source and highly flexible for complex AI applications." },
        ]}
      />

      <KeyTerms 
        terms={[
          { name: "Cosine Similarity", definition: "A math formula to figure out how close two vectors are in 3D space.", color: "#8b5cf6" },
          { name: "KNN Search", definition: "Finding the 'K' closest matches to your search query.", color: "#10b981" },
          { name: "Indexing", definition: "A mathematical shortcut to make searching through millions of vectors instant.", color: "#3b82f6" },
        ]}
      />
    </>
  );
}
