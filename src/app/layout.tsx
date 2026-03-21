import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "LearnLLMs — Master AI Development",
    template: "%s | LearnLLMs",
  },
  description: "A structured, developer-first platform to learn LLMs, Prompt Engineering, RAG, and AI production systems.",
  openGraph: {
    title: "LearnLLMs — Master AI Development",
    description: "Learn LLMs, RAG, Prompt Engineering and build production AI systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
