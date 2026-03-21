import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";

export default function LlmLandscapePage() {
  return (
    <>
      <p className="text-lg">
        The ecosystem of Large Language Models is moving at lightning speed. It's essentially 
        broken down into two completely different worlds: <strong>Proprietary</strong> and <strong>Open Source</strong>.
      </p>

      <h2>1. Proprietary Models (APIs)</h2>
      <p>
        These are massive, cutting-edge models locked behind a paywall. You don't own the weights, 
        and you can only access them via API calls. They are the smartest models on the planet.
      </p>

      <StepCards 
        steps={[
          { icon: "🟢", title: "OpenAI", description: "Creators of GPT-4o, o1, and the pioneers of the current boom." },
          { icon: "🟣", title: "Anthropic", description: "Creators of Claude 3.5 Sonnet, known for incredible coding ability and safety." },
          { icon: "🟡", title: "Google", description: "Creators of Gemini 1.5 Pro, known for the 2M context window." },
        ]}
      />

      <h2>2. Open Weights (Local)</h2>
      <p>
        These are models where the creator has released the neural network weights for free. 
        You can download them, modify them, and run them on your own laptop or server.
      </p>

      <StepCards 
        steps={[
          { icon: "🦙", title: "Meta", description: "Llama 3 is the undisputed king of open source models." },
          { icon: "🇫🇷", title: "Mistral", description: "European startup making heavily optimized, tiny models." },
          { icon: "🐼", title: "Qwen", description: "Alibaba's extremely powerful open source LLM series." },
        ]}
      />

      <Callout icon="⚖️">
        <strong>Which should you choose?</strong> Start with <em>Claude 3.5 Sonnet</em> or <em>GPT-4o</em> 
        to build your prototype as fast as possible. Once you have a working product and want to reduce costs or 
        increase privacy, try swapping it out for an open-source model like <em>Llama 3</em>!
      </Callout>
    </>
  );
}
