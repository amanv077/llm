import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";

export default function PromptingBasicsPage() {
  return (
    <>
      <p className="text-lg">
        Many developers treat LLMs like humans, expecting them to implicitly understand what they want. 
        But LLMs aren't humans; they are highly literal pattern matchers. If you ask a vague question, 
        you will get a vague (and often bad) answer.
      </p>

      <h2>The Three Golden Pillars</h2>
      <p>
        Every single prompt you write should contain these three structural elements:
      </p>

      <StepCards 
        steps={[
          { icon: "🎭", title: "Role", description: "Who is the AI? (e.g., 'You are a senior frontend engineer')" },
          { icon: "🎯", title: "Task", description: "What exactly do you want? (e.g., 'Write a React component')" },
          { icon: "📜", title: "Format", description: "How should it be output? (e.g., 'Only output valid code')" },
        ]}
      />

      <Callout icon="💡" className="bg-[#fffbeb] border-[#fde68a] [&>div:last-child]:text-[#92400e]">
        <strong>Pro Tip: Zero-Shot vs Few-Shot</strong> <br/>
        Giving the model an example of exactly the input/output pairs you want (Few-Shot) is mathematically 
        proven to increase accuracy by up to 30%. Don't just tell it what to do—<em>show it</em>.
      </Callout>

      <h2>Stop Using "Please"</h2>
      <p>
        Politeness literally wastes tokens. Saying, "<em>Could you please maybe write me a little function that might do X...</em>" 
        makes the model's attention scatter across those unnecessary filler words.
      </p>
      
      <p>
        Instead, be extremely direct: "<strong>Write a function that does X.</strong>"
      </p>
    </>
  );
}
