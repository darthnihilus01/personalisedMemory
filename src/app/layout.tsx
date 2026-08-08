import type { Metadata } from "next";
import { Inter, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-serif-editorial",
  subsets: ["latin"],
  style: ["italic", "normal"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Personal Memory Engine — Never Lose the Thread of Your Life",
  description:
    "Never lose the thread of your life. A personal memory engine that connects the people, moments, decisions, and stories that make up your life.",
  keywords: [
    "Personal Memory Engine",
    "Memory",
    "Context",
    "Personal AI",
    "Living Memory",
    "Identity",
    "Relationships",
  ],
  openGraph: {
    title: "Personal Memory Engine — Never Lose the Thread of Your Life",
    description:
      "Never lose the thread of your life. A personal memory engine that connects the people, moments, decisions, and stories that make up your life.",
    type: "website",
    siteName: "Personal Memory Engine",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Memory Engine",
    description: "Never lose the thread of your life.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${newsreader.variable} dark antialiased scroll-smooth`}
    >
      <body className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans bg-noise selection:bg-blue-500/30 selection:text-white" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
