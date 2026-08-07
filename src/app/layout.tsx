import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
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
  title: "Personal Memory Engine — Never Lose Context Again",
  description:
    "The world's first AI system that continuously builds a living world model of your life. Not an AI journal. Not a note-taking app. Not a chatbot.",
  keywords: [
    "Personal Memory Engine",
    "World Model",
    "Context Engine",
    "Personal AI",
    "Living Memory",
    "Identity",
    "Relationships",
  ],
  openGraph: {
    title: "Personal Memory Engine — Never Lose Context Again",
    description:
      "Humans don't lose memories. They lose context. The first AI system that remembers your world.",
    type: "website",
    siteName: "Personal Memory Engine",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Memory Engine",
    description: "Never lose context again.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} dark antialiased scroll-smooth`}
    >
      <body className="bg-[#060709] text-gray-100 min-h-screen flex flex-col font-sans bg-noise selection:bg-purple-900/40 selection:text-purple-200">
        {children}
      </body>
    </html>
  );
}
