import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Nav } from "@/components/nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Memory Comparison",
  description:
    "Compare AI memory systems for developer tools and user-facing agents. Interactive tables with filtering, sorting, and side-by-side comparison.",
  alternates: {
    types: {
      "text/markdown": "/llm.txt",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Nav />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
