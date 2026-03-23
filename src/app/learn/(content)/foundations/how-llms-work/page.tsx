import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";
import { KeyTerms } from "@/components/ui/KeyTerms";
import { LessonHeader } from "@/components/ui/LessonHeader";

export default function HowLlmsWorkPage() {
  return (
    <>
      <LessonHeader
        title="How LLMs Work"
        subtitle="Under the hood, every LLM is a Transformer — a specific neural network architecture. Let's trace exactly what happens from the moment you hit send to the moment text appears."
      />

      <Callout icon="🏗️">
        <strong>The star of the show:</strong> The <em>Transformer</em> architecture (2017,
        Google Brain). Every major LLM — GPT, Gemini, Claude, Llama — is built on it.
        &quot;Attention is all you need&quot; wasn&apos;t just a paper title, it was a prophecy.
      </Callout>

      <h2>From Keypress to Response — Step by Step</h2>
      <StepCards
        steps={[
          { icon: "🔤", title: "Tokenization", description: "Your text is split into tokens. \"ChatGPT is cool\" → [\"Chat\", \"G\", \"PT\", \" is\", \" cool\"] — ~4 tokens." },
          { icon: "🔢", title: "Embedding", description: "Each token is mapped to a vector — a list of ~1,000+ numbers that encodes its meaning in multi-dimensional space." },
          { icon: "🔍", title: "Attention", description: "The model asks: which other tokens matter for understanding this token? It scores every pair and builds a 'web of relevance'." },
          { icon: "🔁", title: "Many Layers", description: "Attention + feed-forward networks are stacked 96 times (in GPT-4). Each layer refines the understanding." },
          { icon: "🎲", title: "Predict Next Token", description: "The final layer outputs a probability for every token in the vocabulary (~100K). The most likely one is sampled." },
        ]}
      />

      <h2>Attention — The Secret Sauce</h2>
      <p>
        Attention is what makes Transformers special. Before it, models read text
        left-to-right and forgot earlier words quickly. Attention lets the model look at
        the <em>entire context at once</em> and decide what&apos;s relevant to what.
      </p>
      <Callout icon="🔍">
        In the sentence <em>&quot;The trophy didn&apos;t fit in the suitcase because it was too big&quot;</em> —
        what does &quot;it&quot; refer to? The trophy. Attention figures this out by scoring
        how much &quot;it&quot; relates to every other word. The trophy wins. 🏆
      </Callout>

      <h2>Training vs Inference</h2>
      <KeyTerms
        terms={[
          { name: "Training", definition: "Feeding billions of text examples and nudging parameters to minimize prediction error. Takes months + millions of dollars.", color: "#ef4444" },
          { name: "Fine-tuning", definition: "Further training on specific data (e.g., customer support chats) to specialize the model's behavior.", color: "#f59e0b" },
          { name: "RLHF", definition: "Reinforcement Learning from Human Feedback — how models learn to be helpful and safe (not just accurate).", color: "#8b5cf6" },
          { name: "Inference", definition: "Running the already-trained model to generate your response. This is what happens every time you chat.", color: "#10b981" },
        ]}
      />

      <Callout icon="⚡">
        <strong>Key insight:</strong> Once trained, the model is frozen. It doesn&apos;t learn
        from your conversations (unless fine-tuned again). Every response is pure inference
        — pattern matching at massive scale.
      </Callout>
    </>
  );
}
