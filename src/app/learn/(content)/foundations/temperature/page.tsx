import { TemperatureInteractive } from "@/features/temperature/TemperatureInteractive";
import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";
import { KeyTerms } from "@/components/ui/KeyTerms";
import { LessonHeader } from "@/components/ui/LessonHeader";

export default function TemperaturePage() {
  return (
    <>
      <LessonHeader 
        title="Temperature & Sampling" 
        subtitle="Language models don't just pick the single 'best' next word; they generate a list of possibilities. Temperature is the dial that controls how the model selects from that list." 
      />

      <TemperatureInteractive />

      <Callout icon="🌡️" className="bg-[#f0f9ff] border-[#bae6fd] [&>div:last-child]:text-[#0369a1]">
        <strong>Think of it like a slider for Creativity.</strong> <br/>
        Low temperature = Factual and Boring. <br/>
        High temperature = Creative and Chaotic.
      </Callout>

      <h2>The Temperature Spectrum</h2>
      <p>
        Depending on the task, you will want to adjust your temperature setting. 
        There is no "perfect" number, only the right one for your goal.
      </p>

      <StepCards 
        steps={[
          { icon: "🧊", title: "Temp = 0", description: "The safe bet. Always picks the top choice. Ideal for code and math." },
          { icon: "🍃", title: "Temp = 0.7", description: "The sweet spot. Balanced and human-like. Great for emails and chat." },
          { icon: "🔥", title: "Temp = 1.0+", description: "Pure chaos. High risk of hallucinations, but great for brainstorming." },
        ]}
      />

      <Callout icon="📜" className="bg-[#f0fdf4] border-[#bbf7d0] [&>div:last-child]:text-[#166534]">
        <strong>Rule of Thumb:</strong> <br/>
        Structural tasks (JSON, Fact-checking) - <strong>0.0</strong> <br/>
        General Purpose - <strong>0.7</strong>
      </Callout>

      <KeyTerms 
        terms={[
          { name: "Logits", definition: "Raw numerical scores the model outputs for each token.", color: "#8b5cf6" },
          { name: "Softmax", definition: "The math that turns raw scores into percentage probabilities.", color: "#10b981" },
          { name: "Top-P", definition: "A companion to temperature that limits choices to the top X% of words.", color: "#3b82f6" },
        ]}
      />
    </>
  );
}
