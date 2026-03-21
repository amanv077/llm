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
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-[#f1f5f9] z-50 flex items-center justify-between px-6 shadow-sm">
      {/* Left: Home */}
      <Link href="/" className="flex items-center gap-2.5 group w-48 transition-opacity hover:opacity-80">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#10b981] to-[#047857] flex items-center justify-center text-white p-1.5 flex-shrink-0 shadow-sm transition-transform group-hover:scale-105">
          <Home className="w-full h-full" />
        </div>
        <span className="font-semibold text-[#0f172a] tracking-tight">All Topics</span>
      </Link>

      {/* Center: Current Title */}
      <div className="hidden md:flex flex-1 justify-center items-center font-bold text-[#0f172a] text-[15px]">
        {current ? (
          <span className="flex items-center gap-2">
            <span>{current.chapter.icon}</span> 
            {current.lesson.title}
          </span>
        ) : (
          "Learn LLMs"
        )}
      </div>

      {/* Right: Pagination */}
      <div className="flex items-center justify-end gap-3 w-48">
        {current && (
          <div className="flex items-center bg-[#f8fafc] rounded-full border border-[#f1f5f9] p-1 shadow-sm">
            <Link 
              href={prev || "#"} 
              className={`p-1.5 rounded-full transition-colors ${prev ? "hover:bg-white hover:shadow-sm text-[#475569]" : "opacity-30 pointer-events-none text-[#cbd5e1]"}`}
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
            
            <span className="text-[12px] font-bold text-[#475569] min-w-[36px] text-center px-1 font-mono">
              {currentIndex + 1}/{total}
            </span>
            
            <Link 
              href={next || "#"} 
              className={`p-1.5 rounded-full transition-colors ${next ? "hover:bg-white hover:shadow-sm text-[#475569]" : "opacity-30 pointer-events-none text-[#cbd5e1]"}`}
            >
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
