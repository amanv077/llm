"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, ChevronLeft, ChevronRight } from "lucide-react";
import { CHAPTERS, getLessonPath } from "@/lib/constants/chapters";
import { useEffect } from "react";

export function TopBar() {
  const pathname = usePathname();
  const router = useRouter();

  // Find all lessons in order
  const allLessons = CHAPTERS.flatMap((c) => 
    c.lessons.map(l => ({ chapter: c, lesson: l }))
  );
  
  const total = allLessons.length;
  
  // Find current
  const currentIndex = allLessons.findIndex(
    x => pathname === getLessonPath(x.chapter.slug, x.lesson.slug)
  );
  
  const current = currentIndex >= 0 ? allLessons[currentIndex] : null;

  const prev = currentIndex > 0 ? getLessonPath(allLessons[currentIndex - 1].chapter.slug, allLessons[currentIndex - 1].lesson.slug) : null;
  const next = currentIndex >= 0 && currentIndex < total - 1 ? getLessonPath(allLessons[currentIndex + 1].chapter.slug, allLessons[currentIndex + 1].lesson.slug) : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;
      
      if (e.key === "ArrowLeft" && prev) {
        router.push(prev);
      } else if (e.key === "ArrowRight" && next) {
        router.push(next);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next, router]);

  return (
    <header className="w-full h-20 bg-[#fffff] border-b border-slate-100 flex items-center justify-between px-10">
      {/* Left: Home */}
      <Link href="/" className="flex items-center gap-3 group w-48 transition-opacity hover:opacity-80">
        <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white p-2 flex-shrink-0 shadow-lg shadow-slate-900/10 transition-transform group-hover:scale-105 group-hover:rotate-3">
          <Home className="w-full h-full" />
        </div>
        <span className="font-extrabold text-slate-900 tracking-tight text-sm uppercase tracking-widest">Mastery</span>
      </Link>

      {/* Center: Current Title */}
      <div className="hidden md:flex flex-1 justify-center items-center font-black text-slate-900 text-sm tracking-tight uppercase">
        {current ? (
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
            <span className="text-xl">{current.chapter.icon}</span> 
            <span className="max-w-[200px] truncate">{current.lesson.title}</span>
          </div>
        ) : (
          <span className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Learning Path</span>
        )}
      </div>

      {/* Right: Pagination */}
      <div className="flex items-center justify-end gap-3 w-48">
        {current && (
          <div className="flex items-center bg-white rounded-xl border border-slate-100 p-1 shadow-sm">
            <Link 
              href={prev || "#"} 
              className={`p-1.5 rounded-lg transition-all ${prev ? "hover:bg-slate-50 text-slate-600 active:scale-95" : "opacity-20 pointer-events-none text-slate-300"}`}
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
            
            <span className="text-[11px] font-black text-slate-400 min-w-[44px] text-center px-2 font-mono tracking-tighter">
              {currentIndex + 1} <span className="text-slate-200">/</span> {total}
            </span>
            
            <Link 
              href={next || "#"} 
              className={`p-1.5 rounded-lg transition-all ${next ? "hover:bg-slate-50 text-slate-600 active:scale-95" : "opacity-20 pointer-events-none text-slate-300"}`}
            >
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
