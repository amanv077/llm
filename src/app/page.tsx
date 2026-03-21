"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, ChevronRight, BookOpen } from "lucide-react";
import { CHAPTERS, getLessonPath } from "@/lib/constants/chapters";
import { TopBar } from "@/components/layout/TopBar";

export default function Home() {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const p = JSON.parse(localStorage.getItem("llm-progress") ?? "{}");
    setProgress(p);

    const handleStorage = () => {
      setProgress(JSON.parse(localStorage.getItem("llm-progress") ?? "{}"));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const totalLessons = CHAPTERS.reduce((acc, c) => acc + c.lessons.length, 0);
  const completedCount = Object.keys(progress).length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100) || 0;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <TopBar />
      
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-[800px] mx-auto px-6">
          
          {/* Header */}
          <header className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#047857] text-white shadow-lg mb-6 transform transition-transform hover:scale-105">
              <BookOpen className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight mb-4">
              LLM Learning Platform
            </h1>
            <p className="text-lg text-[#64748b] max-w-lg mx-auto">
              Master Large Language Models, Prompt Engineering, RAG, and AI Production Systems from scratch.
            </p>
            
            {/* Progress Bar */}
            {mounted && (
              <div className="mt-8 max-w-md mx-auto bg-white p-4 rounded-2xl border border-[#f1f5f9] shadow-sm">
                <div className="flex justify-between text-sm font-bold text-[#0f172a] mb-2">
                  <span>Course Progress</span>
                  <span className="text-[#10b981]">{progressPercent}%</span>
                </div>
                <div className="h-3 bg-[#f1f5f9] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#10b981] to-[#34d399] transition-all duration-1000 ease-out rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="text-[12px] text-[#94a3b8] mt-2 font-medium">
                  {completedCount} of {totalLessons} lessons completed
                </div>
              </div>
            )}
          </header>

          {/* Curriculum */}
          <div className="space-y-12">
            {CHAPTERS.map((chapter) => {
              const chapterCompleted = chapter.lessons.filter(l => progress[`${chapter.slug}/${l.slug}`]).length;

              return (
              <div key={chapter.id}>
                <div className="flex items-end justify-between mb-4 px-2">
                  <h2 className="text-[18px] font-bold flex items-center gap-3 text-[#0f172a]">
                    <span className="text-2xl drop-shadow-sm">{chapter.icon}</span> 
                    {chapter.title} 
                    <span className="text-[14px] font-semibold text-[#94a3b8] ml-2">{chapterCompleted}/{chapter.lessons.length}</span>
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {chapter.lessons.map((lesson) => {
                    const isCompleted = progress[`${chapter.slug}/${lesson.slug}`];
                    const href = getLessonPath(chapter.slug, lesson.slug);
                    
                    // Logic to detect which ones we built interactive features for
                    const interactiveLessons = ["Tokens & Tokenization", "Temperature & Sampling", "Embeddings & Vectors", "Vector Databases", "Introduction to RAG", "RAG Pipeline", "Using LLMs Efficiently", "Evaluation & Testing", "Copilot Fundamentals"];
                    const isInteractive = interactiveLessons.includes(lesson.title);
                    
                    return (
                      <Link 
                        key={lesson.id} 
                        href={href}
                        className="relative flex flex-col p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] group min-h-[140px]"
                        style={{
                           backgroundColor: `${chapter.color}08`, 
                           borderColor: `${chapter.color}30`
                        }}
                      >
                        {mounted && isCompleted && (
                          <div className="absolute top-4 right-4 bg-[#10b981] text-white rounded-full p-0.5 shadow-sm">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        )}
                        
                        <div className="flex items-start gap-4 mb-2">
                          <div className="text-2xl opacity-90 group-hover:scale-110 transition-transform">
                            {/* fallback icon if lesson.icon isn't present in chapters.ts */}
                            {(lesson as any).icon || ["🧠", "📝", "⚙️", "💬", "🤖", "🚀"][Math.floor(Math.random() * 6)]}
                          </div>
                          <div className="flex-1 pr-6">
                            <h3 className="text-[14px] font-bold text-[#0f172a] leading-tight mb-1 group-hover:text-[#0d7cf2] transition-colors">
                              {lesson.title}
                            </h3>
                            <p className="text-[12px] text-[#64748b] leading-snug line-clamp-2">
                              {lesson.description}
                            </p>
                          </div>
                        </div>

                        {/* Spacer pushing interactive badge to bottom */}
                        <div className="flex-1" />

                        {isInteractive && (
                          <div className="mt-4 flex justify-end">
                            <span 
                              className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase px-2 py-1 rounded-md tracking-wider"
                              style={{ color: chapter.color, backgroundColor: `${chapter.color}15` }}
                            >
                              🎮 Interactive
                            </span>
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )})}
          </div>

        </div>
      </main>
    </div>
  );
}
