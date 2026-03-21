import { TokenizerInteractive } from "@/features/tokenizer/TokenizerInteractive";

export default function TokensPage() {
  return (
    <>
      <p>
        Models do not read actual letters or words. They read <strong>tokens</strong>. 
        A token can be a single character, a part of a word, an entire word, or 
        even a common phrase depending on the tokenizer used.
      </p>

      <TokenizerInteractive />

      <h2>Why Tokens Matter</h2>
      <p>
        Tokens are the fundamental unit of an LLM. Everything you do as an AI engineer 
        revolves around counting and managing tokens:
      </p>
      <ul>
        <li><strong>Cost:</strong> LLM APIs charge you per 1,000 tokens (both input and output).</li>
        <li><strong>Context Window:</strong> Models have a maximum limit of tokens they can "read" at once (e.g., 128k tokens for GPT-4o).</li>
        <li><strong>Latency:</strong> Outputting tokens is the slowest part of generation. The more tokens generated, the longer the user waits.</li>
      </ul>

      <h2>The "Strawberry" Problem</h2>
      <p>
        Because LLMs read tokens instead of letters, they notoriously struggle with character-level 
        tasks (like counting the number of R's in the word "strawberry"). 
      </p>
      <p>
        To the model, the word "strawberry" might just be a single token (e.g., Token ID: <code>45672</code>). 
        It has no inherent understanding that this token is made of 10 letters unless it has been explicitly 
        trained on that specific mapping or uses advanced reasoning steps (like OpenAI's o1 models).
      </p>
    </>
  );
}
