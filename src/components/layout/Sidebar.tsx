"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { CHAPTERS, getLessonPath } from "@/lib/constants/chapters";
import { cn } from "@/lib/utils";
import { ChevronDown, CheckCircle2, Circle } from "lucide-react";

function getProgress(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("llm-progress") ?? "{}");
  } catch {
    return {};
  }
}

export function Sidebar() {
  const pathname = usePathname();
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setProgress(getProgress());
    // Auto-open current chapter
    const segs = pathname.split("/");
    const chSlug = segs[2];
    if (chSlug) setOpenChapters((prev) => ({ ...prev, [chSlug]: true }));
  }, [pathname]);

  const toggleChapter = (slug: string) => {
    setOpenChapters((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const completedCount = Object.values(progress).filter(Boolean).length;
  const totalLessons = CHAPTERS.reduce((a, c) => a + c.lessons.length, 0);

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-[#e2e8f0] flex flex-col z-20 overflow-hidden">
      {/* Logo */}
      <div className="flex-shrink-0 px-5 py-4 border-b border-[#e2e8f0]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0d7cf2] to-[#6366f1] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            L
          </div>
          <div>
            <div className="font-bold text-[#0f172a] text-sm leading-tight">LearnLLMs</div>
            <div className="text-[10px] text-[#94a3b8]">Master AI Development</div>
          </div>
        </Link>
      </div>

      {/* Progress bar */}
      <div className="flex-shrink-0 px-5 py-3 border-b border-[#f1f5f9]">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-medium text-[#475569]">Your Progress</span>
          <span className="text-[11px] font-semibold text-[#0d7cf2]">
            {completedCount}/{totalLessons}
          </span>
        </div>
        <div className="h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#0d7cf2] to-[#6366f1] rounded-full transition-all duration-500"
            style={{ width: `${totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {CHAPTERS.map((chapter) => {
          const chapterDone = chapter.lessons.filter((l) => progress[`${chapter.slug}/${l.slug}`]).length;
          const isOpen = openChapters[chapter.slug] ?? false;

          return (
            <div key={chapter.id} className="mb-1">
              {/* Chapter header */}
              <button
                onClick={() => toggleChapter(chapter.slug)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#f8fafc] transition-colors group"
              >
                <span className="text-base flex-shrink-0">{chapter.icon}</span>
                <span className="flex-1 text-left text-[13px] font-semibold text-[#0f172a] group-hover:text-[#0d7cf2] transition-colors truncate">
                  {chapter.title}
                </span>
                <span className="text-[10px] text-[#94a3b8] flex-shrink-0">
                  {chapterDone}/{chapter.lessons.length}
                </span>
                <ChevronDown
                  className={cn("w-3.5 h-3.5 text-[#94a3b8] flex-shrink-0 transition-transform duration-200", isOpen && "rotate-180")}
                />
              </button>

              {/* Lessons */}
              {isOpen && (
                <div className="ml-4 mt-0.5 space-y-0.5 border-l border-[#e2e8f0] pl-3">
                  {chapter.lessons.map((lesson, idx) => {
                    const href = getLessonPath(chapter.slug, lesson.slug);
                    const isActive = pathname === href;
                    const isDone = progress[`${chapter.slug}/${lesson.slug}`];

                    return (
                      <Link
                        key={lesson.id}
                        href={href}
                        className={cn(
                          "flex items-center gap-2 px-2 py-1.5 rounded-md text-[12px] transition-all group/lesson",
                          isActive
                            ? "bg-[#e0efff] text-[#005fd4] font-semibold"
                            : "text-[#475569] hover:bg-[#f8fafc] hover:text-[#0f172a]"
                        )}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-[#10b981]" />
                        ) : (
                          <Circle className={cn("w-3.5 h-3.5 flex-shrink-0", isActive ? "text-[#0d7cf2]" : "text-[#cbd5e1]")} />
                        )}
                        <span className="flex-1 leading-tight">{lesson.title}</span>
                        {lesson.hasInteractive && (
                          <span className="text-[9px] bg-[#f0f7ff] text-[#0d7cf2] px-1.5 py-0.5 rounded font-medium flex-shrink-0">
                            ⚡
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="flex-shrink-0 px-5 py-3 border-t border-[#f1f5f9]">
        <p className="text-[10px] text-[#94a3b8] text-center">
          Learn what matters · Build what works
        </p>
      </div>
    </aside>
  );
}
