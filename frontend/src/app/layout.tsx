import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillLens | Evidence-Based Skill Verification",
  description: "SkillLens analyzes your public coding footprint to verify skills, expose gaps, and help you become truly job-ready.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${bricolage.variable} ${inter.variable} ${jetbrainsMono.variable} font-body bg-bg-deep text-gray-100 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
