import React from "react";

interface LessonHeaderProps {
  title: string;
  subtitle: string;
}

export function LessonHeader({ title, subtitle }: LessonHeaderProps) {
  return (
    <div className="mb-16 relative">
      <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full opacity-50" />
      <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
        {title}
      </h1>
      <div className="h-1 w-20 bg-slate-100 mb-8 rounded-full" />
      <p className="text-xl text-slate-500 font-medium leading-[1.6] max-w-3xl">
        {subtitle}
      </p>
    </div>
  );
}
