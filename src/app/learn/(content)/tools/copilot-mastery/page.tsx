import { Callout } from "@/components/ui/Callout";
import { KeyTerms } from "@/components/ui/KeyTerms";

export default function CopilotMasteryPage() {
  return (
    <>
      <p className="text-lg">
        Mastering an AI IDE like <strong>Cursor</strong> requires entirely changing how you approach 
        writing software. You have mutated from a "Coder" to a "Manager."
      </p>

      <h2>The \`@\` Command</h2>
      <p>
        The most powerful feature of modern coding assistants is the <code>@</code> symbol. 
        It allows you to explicitly pull exact files, folders, or even entire public documentation 
        straight into the AI's context. 
      </p>

      <ul>
        <li><code>@components/Header.tsx</code>: Pulls in the exact file so it knows the props.</li>
        <li><code>@Codebase</code>: RAG-scans your entire project (only works well on smaller apps).</li>
        <li><code>@Web</code>: Tells the AI to use Google to read the latest Next.js 15 docs instead of hallucinating outdated Next 13 code.</li>
      </ul>

      <Callout icon="⭐" className="bg-[#fffbeb] border-[#fde68a] [&>div:last-child]:text-[#92400e]">
        <strong>Write Comments FIRST:</strong> Because AI autocomplete is so fast, the best way to code 
        is to write a human-readable comment describing exactly what the function should do, then press Enter. 
        The AI will write the entire function instantly.
      </Callout>

      <KeyTerms 
        terms={[
          { name: "Composer / Agent", definition: "A feature that can edit multiple files simultaneously across your project.", color: "#10b981" },
          { name: "Context limit", definition: "Even in an IDE, the AI can only 'see' so many files at once. Don't @ include everything.", color: "#ef4444" },
          { name: "Diff", definition: "The red/green visualization showing what the AI wants to delete/add before you hit 'Accept'.", color: "#3b82f6" },
        ]}
      />
    </>
  );
}
