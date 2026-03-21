import React from "react";

type Term = {
  name: string;
  definition: string;
  color?: string;
};

export function KeyTerms({ terms }: { terms: Term[] }) {
  return (
    <div className="my-10">
      <h3 className="flex items-center gap-2 font-bold text-lg text-[#0f172a] mb-5">
        🔑 Key Terms
      </h3>
      <div className="flex flex-col gap-3">
        {terms.map((t, idx) => (
          <div key={idx} className="flex gap-4 p-3 bg-[#fdfdfd] border border-[#f1f5f9] rounded-xl hover:bg-[#f8fafc] transition-colors">
            <div 
              className="px-2.5 py-1 rounded font-semibold text-[13px] flex-shrink-0"
              style={{
                backgroundColor: t.color ? `${t.color}20` : "#e0efff",
                color: t.color || "#005fd4"
              }}
            >
              {t.name}
            </div>
            <div className="text-[14px] text-[#475569] flex items-center">
              {t.definition}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
