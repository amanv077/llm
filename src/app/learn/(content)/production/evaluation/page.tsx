import { EvalInteractive } from "@/features/production/EvalInteractive";

export default function EvaluationPage() {
  return (
    <>
      <p>
        If you change a line of traditional code, you run unit tests to ensure it still works. 
        But how do you test a prompt? When output is non-deterministic natural language, writing 
        <code>assert(output === "expected")</code> is impossible.
      </p>

      <h2>The Challenge of Prompt Regressions</h2>
      <p>
        Imagine you tweak your prompt to make the AI sound more polite. Suddenly, it stops 
        following the "keep it under 50 words" constraint. You just introduced a prompt regression.
      </p>

      <EvalInteractive />

      <h2>Evals (Evaluations)</h2>
      <p>
        To solve this, we use <strong>Evals</strong>. Evals are essentially unit tests for LLMs.
        Instead of exact string matching, we use deterministic tests (regex, length checks) 
        and "LLM-as-a-Judge" (using a powerful model like GPT-4o to grade the output of a cheaper model).
      </p>

      <ol>
        <li><strong>Deterministic Evals:</strong> Is the output valid JSON? Is it under 500 characters? Does it contain forbidden words?</li>
        <li><strong>Semantic Evals:</strong> Does the output answer the user's question? Is the tone correct? Is it hallucinating facts from outside the context?</li>
      </ol>

      <blockquote>
        <p>
          <strong>The Golden Rule:</strong> Never deploy a prompt change to production without running it 
          against a golden dataset of 50-100 edge-case user queries to see if your overall score goes up or down.
        </p>
      </blockquote>
    </>
  );
}
