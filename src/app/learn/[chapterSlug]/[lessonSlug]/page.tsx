import { notFound } from "next/navigation";
import { getLessonBySlug, getAdjacentLessons } from "@/lib/constants/chapters";
import { LessonNav } from "@/components/layout/LessonNav";
import dynamic from "next/dynamic";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

type Props = {
  params: Promise<{ chapterSlug: string; lessonSlug: string }>;
};

// Map each chapter/lesson to its component file
// We use a predefined map to allow static analysis and avoid complex dynamic imports in App Router
const contentMap: Record<string, any> = {
  "foundations/what-are-llms": dynamic(() => import("@/app/learn/(content)/foundations/what-are-llms/page")),
  "foundations/how-llms-work": dynamic(() => import("@/app/learn/(content)/foundations/how-llms-work/page")),
  "foundations/tokens": dynamic(() => import("@/app/learn/(content)/foundations/tokens/page")),
  "foundations/temperature": dynamic(() => import("@/app/learn/(content)/foundations/temperature/page")),
  "foundations/context-window": dynamic(() => import("@/app/learn/(content)/foundations/context-window/page")),
  "foundations/llm-landscape": dynamic(() => import("@/app/learn/(content)/foundations/llm-landscape/page")),
  
  "apis/first-api-call": dynamic(() => import("@/app/learn/(content)/apis/first-api-call/page")),
  "apis/messages-roles": dynamic(() => import("@/app/learn/(content)/apis/messages-roles/page")),
  "apis/streaming": dynamic(() => import("@/app/learn/(content)/apis/streaming/page")),

  "prompting/basics": dynamic(() => import("@/app/learn/(content)/prompting/basics/page")),
  "prompting/advanced": dynamic(() => import("@/app/learn/(content)/prompting/advanced/page")),
  "prompting/output-control": dynamic(() => import("@/app/learn/(content)/prompting/output-control/page")),

  "tools/copilot-fundamentals": dynamic(() => import("@/app/learn/(content)/tools/copilot-fundamentals/page")),
  "tools/copilot-mastery": dynamic(() => import("@/app/learn/(content)/tools/copilot-mastery/page")),
  "tools/ai-tools-strategy": dynamic(() => import("@/app/learn/(content)/tools/ai-tools-strategy/page")),

  "rag/embeddings": dynamic(() => import("@/app/learn/(content)/rag/embeddings/page")),
  "rag/vector-databases": dynamic(() => import("@/app/learn/(content)/rag/vector-databases/page")),
  "rag/intro-rag": dynamic(() => import("@/app/learn/(content)/rag/intro-rag/page")),
  "rag/rag-pipeline": dynamic(() => import("@/app/learn/(content)/rag/rag-pipeline/page")),
  "rag/advanced-rag": dynamic(() => import("@/app/learn/(content)/rag/advanced-rag/page")),

  "production/efficiency": dynamic(() => import("@/app/learn/(content)/production/efficiency/page")),
  "production/evaluation": dynamic(() => import("@/app/learn/(content)/production/evaluation/page")),
  "production/architecture": dynamic(() => import("@/app/learn/(content)/production/architecture/page")),
  "production/guardrails": dynamic(() => import("@/app/learn/(content)/production/guardrails/page")),
};

export default async function LessonPage({ params }: Props) {
  const resolvedParams = await params;
  const { chapterSlug, lessonSlug } = resolvedParams;

  const data = getLessonBySlug(chapterSlug, lessonSlug);
  if (!data) notFound();

  const { chapter, lesson } = data;
  const { next } = getAdjacentLessons(chapterSlug, lessonSlug);

  const ContentComponent = contentMap[`${chapterSlug}/${lessonSlug}`];

  if (!ContentComponent) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Content Coming Soon</h1>
        <p className="text-[#475569]">The content for <strong>{lesson.title}</strong> is currently being written.</p>
      </div>
    );
  }

  return (
    <article className="pb-10 animate-fade-in-up">
      {/* Scroll to top component handles the effect without making layout client-side */}
      <ScrollToTop />
      
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-[2.5rem] font-bold text-[#0f172a] tracking-tight mb-3">
          {lesson.title}
        </h1>
        <p className="text-xl text-[#64748b] font-medium max-w-[600px] mx-auto">
          {lesson.description}
        </p>
      </header>

      {/* Main Content */}
      <div className="prose-lesson">
        <ContentComponent />
      </div>

      {/* Navigation */}
      <LessonNav 
        chapterSlug={chapterSlug} 
        lessonSlug={lessonSlug}
        next={next} 
      />
    </article>
  );
}

