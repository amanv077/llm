import { TokenizerInteractive } from "@/features/tokenizer/TokenizerInteractive";
import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";
import { KeyTerms } from "@/components/ui/KeyTerms";
import { LessonHeader } from "@/components/ui/LessonHeader";

export default function TokensPage() {
  return (
    <>
      <LessonHeader 
        title="Tokens & Tokenization" 
        subtitle="Models do not read actual letters or words. They read tokens — the fundamental 'atoms' of language that the model can actually process." 
      />

      <TokenizerInteractive />

      <Callout icon="💡" className="bg-[#fffbeb] border-[#fde68a] [&>div:last-child]:text-[#92400e]">
        <strong>Pro Tip:</strong> Open the interactive tokenizer above. Notice how "the" is one token, but "tokenization" is broken into three parts: <em>"token"</em>, <em>"iz"</em>, and <em>"ation"</em>.
      </Callout>

      <h2>Why Tokens Matter</h2>
      <p>
        Everything you do as an AI engineer revolves around counting and managing these tokens. 
        They are the <strong>fundamental unit</strong> of information for Large Language Models.
      </p>

      <StepCards 
        steps={[
          { icon: "💸", title: "Cost", description: "LLM APIs charge you per 1,000 tokens (both input and output)." },
          { icon: "📦", title: "Context Window", description: "Models have a maximum limit of tokens they can 'read' at once." },
          { icon: "⏱️", title: "Latency", description: "The more tokens generated, the longer the user waits for the reply." },
        ]}
      />

      <h2>The "Strawberry" Problem</h2>
      <Callout icon="🍓" className="bg-[#fef2f2] border-[#fecaca] [&>div:last-child]:text-[#991b1b]">
        <strong>Counting is hard for AI.</strong> <br/>
        Because LLMs read <strong>tokens</strong> instead of letters, they struggle to count how many R's are in "strawberry". 
        To the model, "strawberry" is just one or two token IDs, not a string of 10 letters!
      </Callout>

      <KeyTerms 
        terms={[
          { name: "Token ID", definition: "The unique number assigned to every token in the vocabulary.", color: "#8b5cf6" },
          { name: "Vocabulary", definition: "The total number of unique tokens a model knows (usually 32k to 128k).", color: "#10b981" },
          { name: "Compression", definition: "How many letters fit in one token (usually ~4 characters).", color: "#3b82f6" },
        ]}
      />
    </>
  );
}
