import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  title: "Deepak Kumar — Full Stack Builder",
  description:
    "Software engineer who ships. Node.js, TypeScript, React, AWS, LLMs and automation, from idea to production.",
  openGraph: {
    title: "Deepak Kumar — Full Stack Builder",
    description: "Software engineer who ships. Messy problems in, running software out.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfcfa" },
    { media: "(prefers-color-scheme: dark)", color: "#14181c" },
  ],
};

// Picks a saved theme, otherwise matches the visitor's local time of day.
// Runs before first paint so there is no flash.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="day"&&t!=="dusk"&&t!=="night"){var h=new Date().getHours();t=h>=6&&h<17?"day":h>=17&&h<20?"dusk":"night"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="day"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">
        <SmoothScroll>{children}</SmoothScroll>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
