"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, ChevronRight, BookOpen, Stars, Zap, Shield, Target, Award, Layers, Sparkles } from "lucide-react";
import { CHAPTERS, getLessonPath } from "@/lib/constants/chapters";
import { TopBar } from "@/components/layout/TopBar";

// Map some better icons for a premium feel
const ICON_MAP: Record<string, React.ReactNode> = {
  "What Are LLMs?": <Zap className="w-5 h-5" />,
  "How LLMs Work": <Layers size={20} />,
  "Tokens & Tokenization": <Shield size={20} />,
  "Temperature & Sampling": <Stars size={20} />,
  "Context Window": <Target size={20} />,
  "The LLM Landscape": <Award size={20} />,
};

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
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] selection:bg-[#10b98120]">
      <TopBar />
      
      <main className="pt-32 pb-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          {/* Dashboard-Style Hero */}
          <div className="relative mb-32 p-12 md:p-20 rounded-[48px] overflow-hidden bg-slate-900 border border-slate-800 shadow-[0_40px_100px_rgba(0,0,0,0.2)]">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest mb-8">
                  <Stars className="w-3 h-3" /> Professional Curriculum
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 leading-[1.05]">
                  Become an <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-400">
                    AI Architect
                  </span>
                </h1>
                <p className="text-xl text-slate-400 max-w-xl leading-relaxed font-medium mb-0">
                  Master the science of Large Language Models. A comprehensive, engineering-first guide to the next era of software development.
                </p>
              </div>

              {/* Progress Card */}
              {mounted && (
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] shadow-2xl">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">Learning Pulse</p>
                      <h3 className="text-4xl font-black text-white">{progressPercent}% <span className="text-slate-600 text-xl font-medium">Done</span></h3>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                      <Zap className="w-8 h-8" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="h-4 bg-slate-800 rounded-full overflow-hidden p-1 shadow-inner">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 transition-all duration-[1.5s] ease-[cubic-bezier(0.34,1.56,0.64,1)] rounded-full relative"
                        style={{ width: `${progressPercent}%` }}
                      >
                        <div className="absolute top-0 right-0 w-8 h-full bg-white/20 blur-sm" />
                      </div>
                    </div>
                    <div className="flex justify-between text-sm font-bold">
                      <span className="text-slate-400">{completedCount} Lessons Mastered</span>
                      <span className="text-emerald-400">{totalLessons - completedCount} Remaining</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Chapters Section */}
          <div className="space-y-32">
            {CHAPTERS.map((chapter) => {
              const chapterCompleted = chapter.lessons.filter(l => progress[`${chapter.slug}/${l.slug}`]).length;
              const isChapterDone = chapterCompleted === chapter.lessons.length;

              return (
                <section key={chapter.id} className="relative">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 px-2">
                    <div>
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-4xl filter drop-shadow-md">{chapter.icon}</span>
                        <h2 className="text-4xl font-black tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                          {chapter.title}
                        </h2>
                      </div>
                      <p className="text-slate-500 text-lg font-medium max-w-xl">
                        {chapter.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
                      <div className="flex -space-x-2">
                         {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white" style={{ backgroundColor: `${chapter.color}${i}0` }} />)}
                      </div>
                      <span className="text-sm font-black text-slate-400 ml-2">
                        {chapterCompleted} / {chapter.lessons.length}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {chapter.lessons.map((lesson) => {
                      const isCompleted = progress[`${chapter.slug}/${lesson.slug}`];
                      const href = getLessonPath(chapter.slug, lesson.slug);
                      const isInteractive = lesson.hasInteractive;
                      
                      return (
                        <Link 
                          key={lesson.id} 
                          href={href}
                          className="group relative flex flex-col p-1 bg-white rounded-[32px] border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] hover:-translate-y-3 active:scale-[0.98] overflow-hidden"
                        >
                          <div className="p-8 pb-10 flex-1 flex flex-col items-start relative z-10">
                            {/* Completion Indicator */}
                            {mounted && isCompleted && (
                              <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-tighter shadow-sm animate-in fade-in zoom-in duration-500">
                                <CheckCircle2 className="w-3 h-3" /> Mastered
                              </div>
                            )}

                            <div 
                              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-8 shadow-sm transition-all group-hover:scale-110 group-hover:rotate-6 bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:border-transparent group-hover:shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
                              style={{ color: chapter.color }}
                            >
                              {(lesson as any).icon || "📝"}
                            </div>

                            <h3 className="text-xl font-black text-slate-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors">
                              {lesson.title}
                            </h3>

                            <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-3 mb-10 group-hover:text-slate-600 transition-colors">
                              {lesson.description}
                            </p>

                            <div className="mt-auto flex items-center justify-between w-full pt-6 border-t border-slate-50">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lesson.duration || "5 min"}</span>
                                {isInteractive && (
                                   <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-50 text-blue-500 text-[9px] font-black uppercase tracking-widest">
                                     <Sparkles className="w-2.5 h-2.5" /> Lab
                                   </span>
                                )}
                              </div>
                              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-blue-50 transition-all -translate-x-4 group-hover:translate-x-0">
                                <ChevronRight className="w-4 h-4 text-blue-500" />
                              </div>
                            </div>
                          </div>
                          
                          {/* Animated Border/Glow on Hover */}
                          <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/10 rounded-[32px] transition-colors pointer-events-none" />
                        </Link>
                      );
                    })}
                  </div>
                </section>
              )
            })}
          </div>

          <footer className="mt-60 pb-32 border-t border-slate-200/60 pt-20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="flex flex-col items-center md:items-start gap-4">
                <div className="flex gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                </div>
                <h4 className="text-xl font-black tracking-tight text-slate-900">LLM Masterclass</h4>
                <p className="text-slate-400 font-medium text-sm">Crafted for the next generation of engineers.</p>
              </div>
              
              <div className="flex gap-12 text-sm font-black text-slate-400 uppercase tracking-widest">
                <a href="#" className="hover:text-slate-900 transition-colors">Curriculum</a>
                <a href="#" className="hover:text-slate-900 transition-colors">Interactive Labs</a>
                <a href="#" className="hover:text-slate-900 transition-colors">Resources</a>
              </div>
            </div>
          </footer>

        </div>
      </main>
    </div>
  );
}
