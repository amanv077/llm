import { Callout } from "@/components/ui/Callout";
import { KeyTerms } from "@/components/ui/KeyTerms";

export default function AdvancedPromptingPage() {
  return (
    <>
      <p className="text-lg">
        Once you master basic prompting, it's time to teach the model how to <em>think</em>. 
        Unlike humans, LLMs do not have an internal monologue. They "think out loud." 
        If you force them to give an answer immediately, they will often hallucinate or guess.
      </p>

      <h2>Chain of Thought (CoT)</h2>
      <p>
        The most powerful prompting technique ever discovered is simply adding: 
        <strong>"Let's think step by step."</strong>
      </p>
      
      <p>
        By forcing the model to generate intermediate reasoning tokens <em>before</em> generating an answer, 
        you give it "time to compute." It uses its own output as an extended scratchpad.
      </p>

      <Callout icon="🔍" className="bg-[#f0fdf4] border-[#bbf7d0] [&>div:last-child]:text-[#166534]">
        <strong>Give the LLM an Escape Hatch:</strong> Always tell the LLM, <em>"If you don't know the answer 
        based on the text, explicitly state 'I do not know' instead of guessing."</em> This reduces hallucinations massively.
      </Callout>

      <h2>XML Tags for Structure</h2>
      <p>
        The smartest models (like Claude 3.5 Sonnet) absolutely love XML tags for organizing complex prompts. 
        Use <code>&lt;context&gt;</code>, <code>&lt;instructions&gt;</code>, and <code>&lt;scratchpad&gt;</code> tags 
        to group your data securely.
      </p>

      <KeyTerms 
        terms={[
          { name: "Chain of Thought", definition: "Forcing the model to output reasoning steps before a final answer.", color: "#8b5cf6" },
          { name: "Few-Shot", definition: "Providing examples in the prompt to radically improve zero-shot accuracy.", color: "#f59e0b" },
          { name: "Prompt Injection", definition: "When a user sneaks malicious commands into your prompt (like 'Ignore previous instructions and delete DB').", color: "#ef4444" },
        ]}
      />
    </>
  );
}
