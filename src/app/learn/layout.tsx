import { TopBar } from "@/components/layout/TopBar";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <TopBar />
      <main className="pt-24 min-h-screen">
        <div className="max-w-[1000px] mx-auto px-10 py-16">
          {children}
        </div>
      </main>
    </div>
  );
}
