import { CostSimulatorInteractive } from "@/features/production/CostSimulatorInteractive";

export default function EfficiencyPage() {
  return (
    <>
      <p>
        Building a prototype with an LLM is easy. Scaling it to millions of users without bankrupting 
        your startup is the hard part. Welcome to LLMOps.
      </p>

      <h2>The Triangle of Tradeoffs</h2>
      <p>
        In production, you are always balancing three opposing forces:
      </p>
      <ul>
        <li><strong>Quality (Intelligence):</strong> How smart and capable is the model?</li>
        <li><strong>Cost:</strong> How much do you pay per 1,000 tokens?</li>
        <li><strong>Latency:</strong> How fast does the first token appear (TTFT), and how many tokens stream per second?</li>
      </ul>

      <CostSimulatorInteractive />

      <h2>Routing Strategies</h2>
      <p>
        The biggest mistake developers make is using a massive "Flagship" model (like GPT-4o or Claude 3.5 Sonnet) 
        for <b>everything</b>. 
      </p>
      <p>
        Instead, you should build a routing layer:
      </p>
      <ol>
        <li>Is the task simple formatting? Send it to <strong>GPT-4o-Mini</strong> or <strong>Llama-3-8B</strong>.</li>
        <li>Is the task basic summarization? Send it to <strong>Gemini 1.5 Flash</strong>.</li>
        <li>Is the task advanced reasoning or complex coding? Send it to <strong>GPT-4o</strong> or <strong>Claude 3.5 Sonnet</strong>.</li>
      </ol>

      <blockquote>
        <p>
          <strong>Caching:</strong> The fastest and cheapest LLM call is the one you never make. Implement Semantic Caching 
          to serve direct hits from a database instead of calling the API again for the identical question.
        </p>
      </blockquote>
    </>
  );
}
