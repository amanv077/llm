import { Callout } from "@/components/ui/Callout";
import { KeyTerms } from "@/components/ui/KeyTerms";

export default function VectorDatabasesPage() {
  return (
    <>
      <p className="text-lg">
        A Vector Database is a specialized storage engine designed specifically to hold and search through massive 
        multi-dimensional number arrays (Embeddings). Normal databases (like Postgres) search by exact keyword matches. 
        Vector DBs search by <strong>meaning</strong>.
      </p>

      <h2>Why Can't I Use SQL?</h2>
      <p>
        If a user searches for <em>"How do I reset my password?"</em>, a traditional SQL query 
        <code>WHERE document == "How do I reset my password?"</code> will fail if the actual document 
        is titled <em>"Account Recovery Options"</em>.
      </p>
      
      <p>
        A Vector Database uses <strong>Cosine Similarity</strong> math to instantly calculate that the vector for 
        "Reset password" is mathematically almost identical to the vector for "Account recovery", returning the correct record.
      </p>

      <Callout icon="⚡" className="bg-[#f0f9ff] border-[#bae6fd] [&>div:last-child]:text-[#0369a1]">
        <strong>The Big Three:</strong> The most popular dedicated Vector DBs in production right now are 
        <strong>Pinecone</strong>, <strong>Milvus</strong>, and <strong>Weaviate</strong>. However, if you already have a 
        PostgreSQL database, you can simply install the <code>pgvector</code> extension!
      </Callout>

      <KeyTerms 
        terms={[
          { name: "Cosine Similarity", definition: "The math formula used to figure out how close two vectors are in 3D space.", color: "#8b5cf6" },
          { name: "K-Nearest Neighbors (KNN)", definition: "An algorithm that finds the 'K' (e.g. 5) closest embedding matches to your search query.", color: "#10b981" },
          { name: "Chunks", definition: "You don't embed a whole book at once. You chop it into paragraphs (chunks) and embed each chunk.", color: "#f59e0b" },
        ]}
      />
    </>
  );
}
