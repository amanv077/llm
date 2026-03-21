import React from "react";

interface LessonHeaderProps {
  title: string;
  subtitle: string;
}

export function LessonHeader({ title, subtitle }: LessonHeaderProps) {
  return (
    <div className="mb-12 border-b border-[#eef2f6] pb-8">
      <h1 className="text-4xl font-extrabold text-[#0f172a] tracking-tight mb-4">
        {title}
      </h1>
      <p className="text-xl text-[#64748b] font-medium leading-relaxed max-w-3xl">
        {subtitle}
      </p>
    </div>
  );
}
