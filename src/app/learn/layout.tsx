import { TopBar } from "@/components/layout/TopBar";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <TopBar />
      <main className="pt-20 min-h-screen">
        <div className="max-w-[720px] mx-auto px-6 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
