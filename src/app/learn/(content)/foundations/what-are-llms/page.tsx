import { Callout } from "@/components/ui/Callout";
import { KeyTerms } from "@/components/ui/KeyTerms";
import { StepCards } from "@/components/ui/StepCards";
import { LessonHeader } from "@/components/ui/LessonHeader";

export default function WhatAreLlmsPage() {
  return (
    <>
      <LessonHeader
        title="What Are LLMs?"
        subtitle="Autocomplete on steroids. Seriously — that's the core idea."
      />

      <Callout icon="🎯">
        <strong>TL;DR:</strong> An LLM is a neural network trained on billions of words.
        It predicts what comes next — so well it can write code, answer questions, and hold a conversation.
      </Callout>

      <h2>Your Phone Keyboard, But Way Smarter</h2>
      <p>
        Your phone suggests the next word as you type. LLMs do the same thing — except
        they trained on basically the entire internet. That&apos;s what makes the difference.
      </p>

      <h2>What Does &quot;Large&quot; Even Mean?</h2>
      <StepCards
        steps={[
          { icon: "📖", title: "Lots of data", description: "Trained on books, code, Wikipedia, the web — trillions of words." },
          { icon: "🎛️", title: "Billions of parameters", description: "Tiny adjustable dials (numbers) that learned patterns from all that data." },
          { icon: "🧠", title: "Deep neural network", description: "Many stacked layers that transform text into understanding." },
        ]}
      />

      <h2>4 Things LLMs Are NOT</h2>
      <ul>
        <li>❌ They don&apos;t browse the web in real-time</li>
        <li>❌ They don&apos;t &quot;remember&quot; past chats (without memory tools)</li>
        <li>❌ They&apos;re not always right — hallucination is real</li>
        <li>❌ They don&apos;t think — they predict, very convincingly</li>
      </ul>

      <h2>Key Terms</h2>
      <KeyTerms
        terms={[
          { name: "Token", definition: "~¾ of a word. 'Hello world' = 2 tokens.", color: "#10b981" },
          { name: "Prompt", definition: "What you send in. The LLM continues from there.", color: "#0ea5e9" },
          { name: "Context Window", definition: "How much text the model can 'see' at once.", color: "#ef4444" },
          { name: "Parameters", definition: "Learned weights. GPT-4 has ~1 trillion.", color: "#8b5cf6" },
        ]}
      />

      <Callout icon="💡">
        <strong>The mental model:</strong> Imagine someone who has read everything — but remembers none of it.
        They just have incredibly sharp instincts about language. That&apos;s an LLM.
      </Callout>
    </>
  );
}
