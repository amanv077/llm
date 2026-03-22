import { Callout } from "@/components/ui/Callout";
import { KeyTerms } from "@/components/ui/KeyTerms";
import { StepCards } from "@/components/ui/StepCards";
import { LessonHeader } from "@/components/ui/LessonHeader";

export default function CopilotMasteryPage() {
  return (
    <>
      <LessonHeader
        title="Mastering GitHub Copilot Pro"
        subtitle="Your team now has GitHub Copilot Pro. This is how you go from average usage to elite-level productivity — without burning your 300 Premium Requests in the first week."
      />

      <h2>Understanding the Two Request Tiers</h2>
      <p>
        Not all Copilot requests are equal. GitHub Copilot Pro runs on two distinct tiers, and
        confusing them is how teams blow their monthly budget on trivial tasks.
      </p>

      <StepCards
        steps={[
          {
            icon: "♾️",
            title: "Base Requests — Unlimited",
            description:
              "Autocomplete, inline suggestions, quick fixes, renaming, and basic chat with standard models (GPT-3.5 level). Use these freely, every day, all day.",
          },
          {
            icon: "⭐",
            title: "Premium Requests — 300/month",
            description:
              "Access to the most powerful models: GPT-4o, Claude Sonnet/Opus, Gemini Advanced. Reserved for complex reasoning, multi-file agent tasks, and architectural thinking.",
          },
        ]}
      />

      <Callout icon="💡" className="bg-[#eff6ff] border-[#bfdbfe] [&>div:last-child]:text-[#1e40af]">
        <strong>The Golden Rule:</strong> <br />
        Use free-tier models for everything you do <em>routinely</em> — writing boilerplate, renaming
        variables, quick inline fixes. Save your 300 Premium Requests for tasks where a{" "}
        <strong>smarter model will meaningfully change the outcome</strong>.
      </Callout>

      <h2>What Actually Costs a Premium Request?</h2>
      <p>
        Any time you explicitly switch the model dropdown to GPT-4o, Claude, or Gemini — or trigger
        Copilot Workspace and Copilot Edits for long multi-file tasks — you are spending Premium.
      </p>

      <StepCards
        steps={[
          {
            icon: "🔁",
            title: "Switching to GPT-4o / Claude / Gemini",
            description:
              "Any chat or inline session where you've selected a premium model from the model picker. Each turn in that conversation counts.",
          },
          {
            icon: "📂",
            title: "Copilot Edits on Multiple Files",
            description:
              "Asking Copilot to refactor or rewrite across several files at once. The more files involved, the more tokens — and the higher the model tier required.",
          },
          {
            icon: "🤖",
            title: "Copilot Workspace (Plan & Build)",
            description:
              "The end-to-end feature planning tool. It reads your issue, plans the implementation, and writes the code. Powerful, but expensive — use it for new features, not bug tweaks.",
          },
          {
            icon: "📄",
            title: "Long Codebase Explanations",
            description:
              "Asking 'explain this entire module' over hundreds of lines uses a large context window and forces a premium model to process it all.",
          },
        ]}
      />

      <h2>The 4 Highest-ROI Ways to Spend a Premium Request</h2>
      <p>
        When you do spend a Premium Request, make it count. These four workflows consistently
        deliver 10x the value of a regular autocomplete session.
      </p>

      <StepCards
        steps={[
          {
            icon: "🔍",
            title: "PR Review — Catch What You Missed",
            description:
              'Paste your full git diff into a premium chat and ask: "Review this for security issues, edge cases, and anything I might have missed." This is better than half your code review process.',
          },
          {
            icon: "🐛",
            title: "Production Debugging — Root Cause Fast",
            description:
              "Give it your full stack trace + the 2-3 most relevant files. Ask: \"What is the root cause and what is the fix?\" Saves hours of manual investigation.",
          },
          {
            icon: "🏗️",
            title: "Architecture Planning — Think Before You Code",
            description:
              'Before starting a complex feature, ask: "Design the implementation plan for [feature], considering [constraints]." Get a structured plan in 30 seconds.',
          },
          {
            icon: "📖",
            title: "Legacy Code — Onboard Instantly",
            description:
              "Drop unfamiliar legacy code and ask: \"Explain what this does, what its dependencies are, and where it could break.\" Perfect for getting up to speed on inherited systems.",
          },
        ]}
      />

      <Callout icon="⚠️" className="bg-[#fef2f2] border-[#fecaca] [&>div:last-child]:text-[#991b1b]">
        <strong>Don&apos;t Burn Premium on Boilerplate:</strong> <br />
        Writing a CRUD endpoint, generating a React component from scratch, creating a migration
        file — these tasks are well within the free Base tier. Reaching for GPT-4o for these is
        like hiring a senior architect to write a for-loop.
      </Callout>

      <KeyTerms
        terms={[
          {
            name: "Premium Request",
            definition:
              "A Copilot interaction that uses an advanced model (GPT-4o, Claude, Gemini). Limited to 300/month per seat on the Pro plan.",
            color: "#f59e0b",
          },
          {
            name: "Base Request",
            definition:
              "A standard Copilot interaction using the default model — autocomplete, inline chat, basic edits. Unlimited on all plans.",
            color: "#10b981",
          },
          {
            name: "Copilot Workspace",
            definition:
              "A feature that takes a GitHub Issue and produces a full implementation plan + code changes automatically. High premium cost, high value.",
            color: "#6366f1",
          },
          {
            name: "Agent Mode",
            definition:
              "When Copilot autonomously edits multiple files, runs tests, and iterates — like a junior developer working on your behalf.",
            color: "#8b5cf6",
          },
          {
            name: "Context Window",
            definition:
              "The amount of code/text the model can 'see' at once. Larger context = more tokens = more likely to trigger premium usage.",
            color: "#ef4444",
          },
        ]}
      />
    </>
  );
}
