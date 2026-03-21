import React from "react";

interface LessonHeaderProps {
  title: string;
  subtitle: string;
}

export function LessonHeader({ title, subtitle }: LessonHeaderProps) {
  return (
    <div className="mb-20">
      <div className="flex items-center gap-4 mb-6">
        <span className="h-[2px] w-12 bg-blue-600 rounded-full" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Detailed Module</span>
      </div>
      <h1 className="text-[72px] font-normal text-slate-900 tracking-tighter mb-8 leading-[0.8] font-display">
        {title}
      </h1>
      <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl border-l-[3px] border-slate-100 pl-8">
        {subtitle}
      </p>
    </div>
  );
}
