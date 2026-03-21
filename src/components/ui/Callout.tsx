import { cn } from "@/lib/utils";
import React from "react";

type CalloutProps = {
  icon?: string;
  children: React.ReactNode;
  className?: string;
};

export function Callout({ icon = "✨", children, className }: CalloutProps) {
  return (
    <div
      className={cn(
        "flex gap-4 p-5 rounded-2xl bg-[#e6f9f0] border border-[#a7f3d0] my-8 shadow-sm",
        className
      )}
    >
      <div className="text-xl flex-shrink-0 mt-0.5">{icon}</div>
      <div className="text-[15px] text-[#065f46] leading-relaxed font-medium">
        {children}
      </div>
    </div>
  );
}
