"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { CHAPTERS, getLessonPath } from "@/lib/constants/chapters";
import { cn } from "@/lib/utils";
import { ChevronDown, CheckCircle2, Circle, GraduationCap } from "lucide-react";

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
    <aside className="fixed top-0 left-0 h-screen w-72 bg-[#fffdf7] border-r border-slate-100 flex flex-col z-20 overflow-hidden shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      {/* Logo Area */}
      <div className="flex-shrink-0 px-8 py-8 border-b border-slate-50">
        <Link href="/" className="flex flex-col gap-2 group">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105 group-hover:rotate-3">
               <GraduationCap className="w-6 h-6" />
             </div>
             <div className="font-black text-slate-900 text-lg tracking-tighter uppercase italic">Mastery</div>
          </div>
          <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mt-2">Technical Academy</div>
        </Link>
      </div>

      {/* Modern Progress Tracking */}
      <div className="flex-shrink-0 px-8 py-6 bg-white/50 border-b border-slate-50">
        <div className="flex items-end justify-between mb-3 px-0.5">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Your Rank</span>
          <span className="text-[12px] font-black text-blue-600 leading-none">
            {completedCount} <span className="text-slate-300">/</span> {totalLessons}
          </span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden p-0.5 ring-1 ring-slate-50">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Sharp Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
        {CHAPTERS.map((chapter) => {
          const chapterDone = chapter.lessons.filter((l) => progress[`${chapter.slug}/${l.slug}`]).length;
          const isOpen = openChapters[chapter.slug] ?? false;

          return (
            <div key={chapter.id} className="mb-2">
              <button
                onClick={() => toggleChapter(chapter.slug)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group",
                  isOpen ? "bg-white shadow-sm ring-1 ring-slate-100" : "hover:bg-white/50"
                )}
              >
                <span className="text-lg flex-shrink-0 grayscale group-hover:grayscale-0 transition-all">{chapter.icon}</span>
                <span className="flex-1 text-left text-[13px] font-black text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                  {chapter.title}
                </span>
                <ChevronDown
                  className={cn("w-3.5 h-3.5 text-slate-300 flex-shrink-0 transition-transform duration-300", isOpen && "rotate-180")}
                />
              </button>

              {isOpen && (
                <div className="ml-6 mt-2 space-y-1 border-l-2 border-slate-50 pl-4 py-1">
                  {chapter.lessons.map((lesson) => {
                    const href = getLessonPath(chapter.slug, lesson.slug);
                    const isActive = pathname === href;
                    const isDone = progress[`${chapter.slug}/${lesson.slug}`];

                    return (
                      <Link
                        key={lesson.id}
                        href={href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-[12px] transition-all group/lesson",
                          isActive
                            ? "bg-blue-50 text-blue-700 font-black shadow-sm"
                            : "text-slate-400 font-bold hover:bg-white hover:text-slate-900"
                        )}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-emerald-500" />
                        ) : (
                          <div className={cn("w-1.5 h-1.5 rounded-full", isActive ? "bg-blue-600" : "bg-slate-200")} />
                        )}
                        <span className="flex-1 leading-tight">{lesson.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer Branding */}
      <div className="flex-shrink-0 px-8 py-6 border-t border-slate-50 bg-white/30 backdrop-blur-sm">
        <p className="text-[9px] font-black text-slate-300 text-center uppercase tracking-[0.4em]">
           Engineering First
        </p>
      </div>
    </aside>
  );
}
