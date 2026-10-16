import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ibadat AI — Portfolio Assistant",
  description:
    "An evidence-first portfolio assistant for Ibadat Ali, AI Engineer and AI Agent Developer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col font-sans bg-[#07080d] text-[#f0ede8]">{children}</body>
    </html>
  );
}
