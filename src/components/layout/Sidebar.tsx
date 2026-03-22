"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { CHAPTERS, getLessonPath } from "@/lib/constants/chapters";
import { cn } from "@/lib/utils";
import { ChevronDown, CheckCircle2, Circle, GraduationCap, X } from "lucide-react";
import { useSidebar } from "./SidebarContext";

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
  const sidebarContext = useSidebar();
  const isOpen = sidebarContext?.isOpen ?? false;
  const closeSidebar = sidebarContext?.closeSidebar ?? (() => {});
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setProgress(getProgress());
    const segs = pathname.split("/");
    const chSlug = segs[2];
    if (chSlug) setOpenChapters((prev) => ({ ...prev, [chSlug]: true }));
  }, [pathname]);

  useEffect(() => {
    const handleStorage = () => setProgress(getProgress());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleChapter = (slug: string) => {
    setOpenChapters((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const completedCount = Object.values(progress).filter(Boolean).length;
  const totalLessons = CHAPTERS.reduce((a, c) => a + c.lessons.length, 0);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-[#fffdf7] border-r border-slate-100 flex flex-col overflow-hidden shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:shrink-0",
          isOpen ? "translate-x-0 lg:w-72 lg:opacity-100" : "-translate-x-full lg:w-0 lg:opacity-0 lg:border-r-0"
        )}
      >
        {/* Header */}
        <div className="h-20 flex-shrink-0 px-8 border-b border-slate-50 flex items-center justify-between">
          <span className="font-extrabold text-slate-900 tracking-tight uppercase tracking-widest text-sm">Learning Path</span>
          <button 
            onClick={closeSidebar}
            className="p-2 -mr-4 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors lg:hidden active:scale-95"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
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
          const isCurrentChapter = pathname.split("/")[2] === chapter.slug;

          return (
            <div key={chapter.id} className="mb-2">
              <button
                onClick={() => toggleChapter(chapter.slug)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group",
                  isOpen ? "bg-white shadow-sm ring-1 ring-slate-100" : "hover:bg-white/50",
                  isCurrentChapter && !isOpen ? "bg-blue-50/50" : ""
                )}
              >
                <span className={cn("text-lg flex-shrink-0 grayscale transition-all", isCurrentChapter || isOpen ? "grayscale-0" : "group-hover:grayscale-0")}>{chapter.icon}</span>
                <span className={cn(
                  "flex-1 text-left text-[13px] font-black transition-colors truncate",
                  isCurrentChapter ? "text-blue-600" : "text-slate-900 group-hover:text-blue-600"
                )}>
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
                        onClick={() => { if (window.innerWidth < 1024) closeSidebar() }}
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
    </>
  );
}
