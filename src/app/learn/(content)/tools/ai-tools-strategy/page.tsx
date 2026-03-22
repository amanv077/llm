import { Callout } from "@/components/ui/Callout";
import { StepCards } from "@/components/ui/StepCards";
import { KeyTerms } from "@/components/ui/KeyTerms";
import { LessonHeader } from "@/components/ui/LessonHeader";

export default function AiToolsStrategyPage() {
  return (
    <>
      <LessonHeader
        title="Your Team's Copilot Playbook"
        subtitle="A clear playbook for when to use Copilot, how to structure requests for maximum output, and how to budget 300 Premium Requests across a sprint so your whole team benefits."
      />

      <h2>The 300 Premium Request Budget</h2>
      <p>
        With 300 Premium Requests per seat per month, you&apos;re working with roughly{" "}
        <strong>10 high-power AI interactions per working day</strong>. That sounds like a lot until
        you realize a single Copilot Workspace session or a long multi-file edit can consume 5-10
        of them. The key is intentionality.
      </p>

      <Callout icon="📊" className="bg-[#eff6ff] border-[#bfdbfe] [&>div:last-child]:text-[#1e40af]">
        <strong>The Sprint Budget Rule:</strong> <br />
        Agree as a team: <strong>free models for daily development</strong>, premium models
        only at defined &quot;gates&quot; — code review, debugging a hard issue, planning a new
        feature. This gives everyone predictable access without one person burning the budget early
        in the month.
      </Callout>

      <h2>The Copilot Request Hierarchy</h2>
      <p>
        Think of this as an escalation ladder. Start at the bottom. Only move up when the task
        genuinely requires more reasoning power.
      </p>

      <StepCards
        steps={[
          {
            icon: "💨",
            title: "Level 1 — Autocomplete (Free, Always On)",
            description:
              "Tab-to-accept inline suggestions as you type. Zero cost. Use this for everything: writing functions, filling out boilerplate, completing patterns. Should be your default mode 80% of the day.",
          },
          {
            icon: "💬",
            title: "Level 2 — Inline Chat, Free Model (Free)",
            description:
              "Open the chat panel with the default model. Use for: explaining code, renaming things, small refactors, asking 'what does this function do?' No premium budget spent.",
          },
          {
            icon: "🧠",
            title: "Level 3 — GPT-4o / Claude Sonnet (Premium ⭐)",
            description:
              "Switch the model picker to a premium model. Use for: hard bugs you can't figure out, architectural questions, reviewing security-sensitive code, explaining complex legacy systems.",
          },
          {
            icon: "🚀",
            title: "Level 4 — Copilot Workspace (Premium ⭐⭐)",
            description:
              "End-to-end feature planning from a GitHub Issue. Copilot reads the issue, designs a plan, writes the code. Use only when building a meaningful new feature — not for patches or tweaks.",
          },
        ]}
      />

      <h2>5 Prompts Worth a Premium Request</h2>
      <p>
        Not all prompts deserve a premium model. Here are five that consistently deliver enough
        value to justify the cost. Copy and adapt these for your team.
      </p>

      <StepCards
        steps={[
          {
            icon: "🔐",
            title: "Security PR Review",
            description:
              '"Review this PR diff for security vulnerabilities, edge cases, and anything I might have missed. Here is the diff: [paste diff]"',
          },
          {
            icon: "🐛",
            title: "Root Cause from Stack Trace",
            description:
              '"I have this error: [paste error]. Here is the relevant code: [paste files]. What is the root cause and what is the fix?"',
          },
          {
            icon: "🏗️",
            title: "Feature Architecture Design",
            description:
              '"Design the database schema and API structure for [feature]. Constraints: [list your tech stack and limits]. Give me a step-by-step implementation plan."',
          },
          {
            icon: "🔄",
            title: "SOLID Refactor",
            description:
              '"Refactor this class to follow SOLID principles and improve testability. Explain each change you make: [paste class]"',
          },
          {
            icon: "🧪",
            title: "Edge-Case Unit Tests",
            description:
              '"Write unit tests for this function, covering all happy paths and edge cases. Use [Jest/Vitest/etc]: [paste function]"',
          },
        ]}
      />

      <h2>The Context Rule — Get More from Every Request</h2>
      <p>
        The biggest waste of a Premium Request is giving the model too little context and getting a
        generic answer back. Prime it correctly every time.
      </p>

      <Callout icon="🎯" className="bg-[#f0fdf4] border-[#bbf7d0] [&>div:last-child]:text-[#166534]">
        <strong>Always start a Premium chat with three things:</strong> <br />
        <br />
        <strong>1. What you&apos;re building</strong> — &quot;This is a Next.js 14 e-commerce app
        with a Postgres database.&quot; <br />
        <strong>2. The specific file or feature</strong> — &quot;I&apos;m working on the checkout
        flow in <code>src/features/checkout/CheckoutForm.tsx</code>.&quot; <br />
        <strong>3. Your exact goal or problem</strong> — &quot;I need to handle payment failures
        gracefully without losing cart state.&quot; <br />
        <br />
        This three-line primer will consistently cut the number of follow-up turns you need — which
        directly saves Premium Requests.
      </Callout>

      <h2>Establishing Team &quot;Premium Gates&quot;</h2>
      <p>
        A Premium Gate is a defined point in your team&apos;s workflow where using GPT-4o or Claude
        is expected, budgeted, and justified. Without agreed gates, usage becomes unpredictable and
        one person can exhaust the team&apos;s shared focus.
      </p>

      <StepCards
        steps={[
          {
            icon: "✅",
            title: "Gate 1 — Before Opening a PR",
            description:
              "Every developer pastes their diff into a premium chat and asks for a review before requesting human review. Catches 60-80% of review comments before they happen.",
          },
          {
            icon: "🔥",
            title: "Gate 2 — When You're Stuck > 30 Minutes",
            description:
              "If a bug or design problem has taken more than 30 minutes with no clear path forward, escalate to a premium model. Time saved far outweighs the request cost.",
          },
          {
            icon: "📐",
            title: "Gate 3 — Before Starting a New Feature",
            description:
              "Use Copilot Workspace or a Claude architecture session to plan the feature before writing a single line of code. Catches design mistakes before they're expensive.",
          },
        ]}
      />

      <Callout icon="⚖️" className="bg-[#fefce8] border-[#fde68a] [&>div:last-child]:text-[#92400e]">
        <strong>Don&apos;t Over-Optimize:</strong> <br />
        If you find yourself spending more time thinking about whether to use a premium model than
        actually using it, you&apos;ve gone too far. The 300/month limit resets monthly — if you
        consistently have leftover requests, you should be using the tool more, not less.
      </Callout>

      <KeyTerms
        terms={[
          {
            name: "Premium Gate",
            definition:
              "A defined point in the team's workflow where using a premium model is agreed-upon, expected, and justified — e.g., before every PR, or when stuck for 30+ minutes.",
            color: "#6366f1",
          },
          {
            name: "Context Priming",
            definition:
              "Starting a chat with your tech stack, the specific file, and the exact problem before asking your question — dramatically improves response quality and reduces back-and-forth.",
            color: "#10b981",
          },
          {
            name: "Model Cascade",
            definition:
              "The escalation pattern: autocomplete → free chat → premium chat → Workspace. Start cheap, escalate only when the simpler model fails.",
            color: "#3b82f6",
          },
          {
            name: "Copilot Workspace",
            definition:
              "GitHub's end-to-end feature tool: takes an Issue, plans an implementation, writes the code. Costs multiple premium requests — use for real features, not bug fixes.",
            color: "#f59e0b",
          },
        ]}
      />
    </>
  );
}
