import React from "react";

type Step = {
  icon: string | React.ReactNode;
  title: string;
  description: string;
};

export function StepCards({ steps }: { steps: Step[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 my-8">
      {steps.map((s, idx) => (
        <div 
          key={idx} 
          className="bg-white rounded-3xl p-6 text-center border border-[#f1f5f9] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="text-4xl mb-4">{s.icon}</div>
          <h4 className="font-bold text-[#0f172a] mb-1">{s.title}</h4>
          <p className="text-[13px] text-[#64748b] leading-tight">{s.description}</p>
        </div>
      ))}
    </div>
  );
}
