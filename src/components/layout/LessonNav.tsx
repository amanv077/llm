"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getLessonPath } from "@/lib/constants/chapters";
import { useEffect, useState } from "react";

type AdjacentLesson = { chapter: { slug: string; title: string; icon: string }; lesson: { title: string; slug: string } } | null;

type LessonNavProps = {
  chapterSlug: string;
  lessonSlug: string;
  next: AdjacentLesson;
};

export function LessonNav({ chapterSlug, lessonSlug, next }: LessonNavProps) {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const key = `${chapterSlug}/${lessonSlug}`;
    const p = JSON.parse(localStorage.getItem("llm-progress") ?? "{}");
    setIsDone(!!p[key]);
  }, [chapterSlug, lessonSlug]);

  const markDone = () => {
    const key = `${chapterSlug}/${lessonSlug}`;
    const p = JSON.parse(localStorage.getItem("llm-progress") ?? "{}");
    p[key] = true;
    localStorage.setItem("llm-progress", JSON.stringify(p));
    setIsDone(true);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="mt-16 pt-12 pb-24 border-t-2 border-dashed border-[#f1f5f9]">
      <div className="flex flex-col items-center justify-center text-center">
        <h3 className="text-xl font-black text-[#0f172a] mb-6">Ready to move on?</h3>
        
        {/* Next Topic Button */}
        {next ? (
          <Link
            href={getLessonPath(next.chapter.slug, next.lesson.slug)}
            onClick={markDone}
            className="group relative inline-flex items-center justify-center gap-4 bg-[#0f172a] text-white px-8 py-5 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(15,23,42,0.2)] hover:bg-[#1e293b]"
          >
            <div className="flex flex-col text-left">
              <span className="text-[12px] text-[#94a3b8] uppercase tracking-wider font-semibold mb-0.5 group-hover:text-white transition-colors">
                Next Topic: {next.chapter.title}
              </span>
              <span>{next.lesson.title}</span>
            </div>
            
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ) : (
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#10b981] to-[#047857] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-[0_20px_40px_rgba(16,185,129,0.3)]">
            <CheckCircle2 className="w-6 h-6" />
            🎉 You have completed the entire course!
          </div>
        )}
      </div>
    </div>
  );
}
