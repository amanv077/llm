export type Chapter = {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
};

export type Lesson = {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  hasInteractive?: boolean;
};

export const CHAPTERS: Chapter[] = [
  {
    id: "foundations",
    title: "Foundations",
    slug: "foundations",
    description: "Understand how LLMs actually work under the hood",
    icon: "🏗️",
    color: "#6366f1",
    lessons: [
      { id: "f1", title: "What Are LLMs?", slug: "what-are-llms", description: "A clear, developer-friendly intro to large language models", duration: "6 min" },
      { id: "f2", title: "How LLMs Work", slug: "how-llms-work", description: "Transformers and attention mechanisms, simplified", duration: "8 min" },
      { id: "f3", title: "Tokens & Tokenization", slug: "tokens", description: "How text becomes numbers — interactive tokenizer included", duration: "7 min", hasInteractive: true },
      { id: "f4", title: "Temperature & Sampling", slug: "temperature", description: "Control randomness and creativity in model outputs", duration: "6 min", hasInteractive: true },
      { id: "f5", title: "Context Window", slug: "context-window", description: "The most critical limit every developer must understand", duration: "5 min" },
      { id: "f6", title: "The LLM Landscape", slug: "llm-landscape", description: "GPT, Gemini, Claude, Llama — when to use which", duration: "7 min" },
    ],
  },
  {
    id: "apis",
    title: "Working with APIs",
    slug: "apis",
    description: "Make your first real API calls and handle responses",
    icon: "🔌",
    color: "#0d9488",
    lessons: [
      { id: "a1", title: "Your First API Call", slug: "first-api-call", description: "Send a real request, get a real response", duration: "8 min" },
      { id: "a2", title: "Messages & Roles", slug: "messages-roles", description: "System, user, assistant — how conversations are structured", duration: "6 min" },
      { id: "a3", title: "Streaming Responses", slug: "streaming", description: "Real-time token streaming for better UX", duration: "7 min" },
    ],
  },
  {
    id: "prompting",
    title: "Prompt Engineering",
    slug: "prompting",
    description: "Master the art of writing precise, effective prompts",
    icon: "✍️",
    color: "#f59e0b",
    lessons: [
      { id: "p1", title: "Prompt Engineering Basics", slug: "basics", description: "Core principles every developer should know", duration: "7 min" },
      { id: "p2", title: "Advanced Prompting", slug: "advanced", description: "Chain-of-thought, few-shot, structured outputs", duration: "9 min" },
      { id: "p3", title: "Output Control", slug: "output-control", description: "JSON mode, constraints, and formatting guarantees", duration: "6 min" },
    ],
  },
  {
    id: "tools",
    title: "AI Tools",
    slug: "tools",
    description: "Master Copilot, ChatGPT, Claude and build a personal AI workflow",
    icon: "🤖",
    color: "#8b5cf6",
    lessons: [
      { id: "t1", title: "Copilot Fundamentals", slug: "copilot-fundamentals", description: "How AI coding assistants work and how to use them", duration: "8 min", hasInteractive: true },
      { id: "t2", title: "Copilot Mastery", slug: "copilot-mastery", description: "Instructions, context engineering, and custom rules", duration: "8 min" },
      { id: "t3", title: "AI Tools Strategy", slug: "ai-tools-strategy", description: "Copilot vs ChatGPT vs Claude — free vs premium", duration: "7 min" },
    ],
  },
  {
    id: "rag",
    title: "RAG Systems",
    slug: "rag",
    description: "Build retrieval-augmented generation pipelines from scratch",
    icon: "📚",
    color: "#ef4444",
    lessons: [
      { id: "r1", title: "Embeddings & Vectors", slug: "embeddings", description: "Turn text into meaning — visualize in 2D space", duration: "8 min", hasInteractive: true },
      { id: "r2", title: "Vector Databases", slug: "vector-databases", description: "Store, index, and query semantic embeddings", duration: "7 min", hasInteractive: true },
      { id: "r3", title: "Introduction to RAG", slug: "intro-rag", description: "Why LLMs need external memory and how to provide it", duration: "7 min", hasInteractive: true },
      { id: "r4", title: "RAG Pipeline", slug: "rag-pipeline", description: "Step-by-step: ingest → embed → retrieve → generate", duration: "9 min" },
      { id: "r5", title: "Advanced RAG", slug: "advanced-rag", description: "Reranking, hybrid search, and production patterns", duration: "10 min" },
    ],
  },
  {
    id: "production",
    title: "Production Systems",
    slug: "production",
    description: "Ship AI apps that are fast, cheap, safe, and reliable",
    icon: "🚀",
    color: "#10b981",
    lessons: [
      { id: "pr1", title: "Using LLMs Efficiently", slug: "efficiency", description: "Cost, latency, caching, and prompt optimization", duration: "9 min", hasInteractive: true },
      { id: "pr2", title: "Evaluation & Testing", slug: "evaluation", description: "Measure quality and test prompts systematically", duration: "8 min", hasInteractive: true },
      { id: "pr3", title: "System Architecture", slug: "architecture", description: "Frontend → API → LLM → DB → Cache flows", duration: "8 min" },
      { id: "pr4", title: "Guardrails & Safety", slug: "guardrails", description: "Prevent hallucinations, validate outputs, stay safe", duration: "7 min" },
    ],
  },
];

export const TOTAL_LESSONS = CHAPTERS.reduce((acc, ch) => acc + ch.lessons.length, 0);

export function getLessonPath(chapterSlug: string, lessonSlug: string): string {
  return `/learn/${chapterSlug}/${lessonSlug}`;
}

export function getChapterBySlug(slug: string): Chapter | undefined {
  return CHAPTERS.find((ch) => ch.slug === slug);
}

export function getLessonBySlug(chapterSlug: string, lessonSlug: string): { chapter: Chapter; lesson: Lesson } | undefined {
  const chapter = getChapterBySlug(chapterSlug);
  if (!chapter) return undefined;
  const lesson = chapter.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return undefined;
  return { chapter, lesson };
}

export function getAdjacentLessons(chapterSlug: string, lessonSlug: string) {
  const allLessons: { chapter: Chapter; lesson: Lesson }[] = [];
  for (const ch of CHAPTERS) {
    for (const l of ch.lessons) {
      allLessons.push({ chapter: ch, lesson: l });
    }
  }
  const idx = allLessons.findIndex((x) => x.chapter.slug === chapterSlug && x.lesson.slug === lessonSlug);
  return {
    prev: idx > 0 ? allLessons[idx - 1] : null,
    next: idx < allLessons.length - 1 ? allLessons[idx + 1] : null,
  };
}
