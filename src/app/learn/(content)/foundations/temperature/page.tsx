import { TemperatureInteractive } from "@/features/temperature/TemperatureInteractive";

export default function TemperaturePage() {
  return (
    <>
      <p>
        Language models don't just pick the single "best" next word; they generate a list of all 
        possible next words and assign a probability to each. <strong>Temperature</strong> controls 
        how the model selects from that list.
      </p>

      <TemperatureInteractive />

      <h2>How it Work under the Hood</h2>
      <p>
        When a model calculates the next token, it outputs logits (raw unnormalized scores). These logits are then passed 
        through a softmax function to turn them into probabilities (adding up to 100%).
      </p>
      <ul>
        <li>
          <strong>Temperature = 0:</strong> The model ALWAYS picks the token with the highest probability. 
          This makes the output completely deterministic and repetitive. Best for data extraction and coding.
        </li>
        <li>
          <strong>Temperature = 0.5:</strong> The model sometimes picks lower probability tokens. 
          This is a balanced setting, great for general writing and chat bots.
        </li>
        <li>
          <strong>Temperature = 1.0 (or higher):</strong> The model frequently picks low probability tokens. 
          This makes the output highly creative, chaotic, or even hallucinatory. Good for brainstorming.
        </li>
      </ul>

      <blockquote>
        <p>
          <strong>Rule of Thumb:</strong> Use Temperature 0 for structural/factual tasks (JSON extraction, math). 
          Use Temperature 0.7 for creative tasks (writing emails, generating ideas).
        </p>
      </blockquote>
    </>
  );
}
