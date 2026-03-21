import { Callout } from "@/components/ui/Callout";
import { KeyTerms } from "@/components/ui/KeyTerms";

export default function ContextWindowPage() {
  return (
    <>
      <p className="text-lg">
        The Context Window is the <strong>short-term memory</strong> of a Large Language Model. 
        It is the absolute maximum amount of text (prompt + response) the model can process at one time.
      </p>

      <Callout icon="🧠">
        If an LLM was a human, the Context Window is how many pages of a book they can read 
        before they start forgetting the plot of chapter 1.
      </Callout>

      <h2>The Hard Limit</h2>
      <p>
        Unlike a hard drive where you can just add more storage, the context window is a fixed, 
        fundamental limitation of the model's architecture (specifically, the Attention Mechanism). 
        If you exceed this limit, the API will throw a hard error.
      </p>

      <h2>The Evolution of Memory</h2>
      <p>
        Context windows have grown exponentially, transforming what we can use LLMs for:
      </p>
      <ul>
        <li><strong>2020 (GPT-3): </strong> 2,048 tokens (~1.5 pages of text)</li>
        <li><strong>2023 (GPT-4): </strong> 8,192 tokens (~6 pages of text)</li>
        <li><strong>2024 (Gemini 1.5 Pro): </strong> 2,000,000 tokens (~1,500 pages of text, or a 2-hour long video!)</li>
      </ul>

      <Callout icon="⚠️" className="bg-[#fef2f2] border-[#fecaca] [&>div:last-child]:text-[#991b1b]">
        <strong>The "Lost in the Middle" Problem:</strong> Even if a model has a 128k context window, 
        it doesn't pay equal attention to everything. Models are highly accurate at retrieving facts from 
        the very beginning and very end of a prompt, but they often "forget" or hallucinate details 
        hidden in the middle of a massive block of text.
      </Callout>

      <KeyTerms 
        terms={[
          { name: "Context Window", definition: "Maximum total tokens (Input + Output) a model can handle.", color: "#10b981" },
          { name: "Attention Span", definition: "The mathematical mechanism that allows context tracking.", color: "#8b5cf6" },
          { name: "Needle in a Haystack", definition: "A test used to measure if an LLM can actually find a specific fact hidden inside a massive context window.", color: "#0ea5e9" }
        ]}
      />
    </>
  );
}
