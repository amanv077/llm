"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, ChevronRight, BookOpen, Stars, Zap, Shield, Target, Award, Layers, Sparkles, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen text-[#0f172a] selection:bg-blue-50">
      <TopBar />
      
      <main className="py-24">
        <div className="max-w-[1400px] mx-auto px-10">
          
          {/* Sharp Hero Section */}
          <header className="mb-32">
            <div className="grid lg:grid-cols-[1fr_400px] gap-20 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">
                  Technical Curriculum V1.0
                </div>
                <h1 className="text-[120px] font-normal tracking-tighter mb-12 text-slate-900 leading-[0.8] font-display">
                  The LLM <br />
                  <span className="text-blue-600">Masterclass.</span>
                </h1>
                <p className="text-xl text-slate-500 max-w-xl leading-relaxed font-medium mb-12">
                  A precise, high-trust guide for engineers building the next generation of AI-native software. No hype, just the core primitives.
                </p>
                
                <Link 
                  href="/learn/foundations/what-are-llms"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 border border-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-slate-900 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
                >
                  Start Learning <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Minimal Progress Dashboard */}
              {mounted && (
                <div className="bg-slate-50 border border-slate-100 p-8 rounded-[32px] shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-1">Status</h3>
                      <p className="text-2xl font-black text-slate-900">{progressPercent}% Mastery</p>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-blue-600 shadow-sm">
                      <Target className="w-6 h-6" />
                    </div>
                  </div>
                  
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-4">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-1000"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>{completedCount} Completed</span>
                    <span>{totalLessons} Total Lessons</span>
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* Curriculum List */}
          <div className="space-y-32">
            {CHAPTERS.map((chapter) => {
              const chapterCompleted = chapter.lessons.filter(l => progress[`${chapter.slug}/${l.slug}`]).length;
              const isChapterDone = chapterCompleted === chapter.lessons.length;

              return (
                <section key={chapter.id}>
                  <div className="flex items-center gap-6 mb-12">
                    <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center text-xl shadow-lg">
                      {chapter.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-black tracking-tight text-slate-900 italic">
                        {chapter.title}
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="h-1 w-8 bg-blue-600 rounded-full" />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{chapter.lessons.length} Modules</span>
                      </div>
                    </div>
                    {isChapterDone && mounted && (
                      <div className="ml-auto flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                        <CheckCircle2 className="w-4 h-4" /> Finished
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {chapter.lessons.map((lesson) => {
                      const isCompleted = progress[`${chapter.slug}/${lesson.slug}`];
                      const href = getLessonPath(chapter.slug, lesson.slug);
                      const isInteractive = lesson.hasInteractive;
                      
                      return (
                        <Link 
                          key={lesson.id} 
                          href={href}
                          className="group relative flex flex-col p-8 bg-white border border-slate-100 rounded-3xl transition-all hover:border-blue-600 hover:shadow-[0_20px_40px_rgba(37,99,235,0.05)]"
                        >
                          <div className="flex justify-between items-start mb-6">
                            <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                              {(lesson as any).icon || <Sparkles className="w-5 h-5" />}
                            </div>
                            {mounted && isCompleted && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            )}
                          </div>

                          <h3 className="text-lg font-black text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                            {lesson.title}
                          </h3>
                          
                          <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 line-clamp-3">
                            {lesson.description}
                          </p>

                          <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{lesson.duration}</span>
                            {isInteractive && (
                              <div className="flex items-center gap-1 text-blue-600 text-[9px] font-black uppercase tracking-widest italic bg-blue-50 px-2 py-1 rounded">
                                Interactive Lab
                              </div>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          <footer className="mt-40 pt-20 border-t border-slate-100 text-center">
             <div className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-8">Build with Trust</div>
             <div className="flex justify-center gap-8 mb-12">
               {["Engineers", "Students", "Founders"].map((role) => (
                 <span key={role} className="text-sm font-bold text-slate-400">{role}</span>
               ))}
             </div>
             <p className="text-xs text-slate-300">© 2026 LLM Masterclass. All rights reserved.</p>
          </footer>

        </div>
      </main>
    </div>
  );
}
