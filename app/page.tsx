import { existsSync } from "node:fs";
import path from "node:path";
import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Nav from "./components/Nav";
import Work from "./components/Work";
import { story } from "./lib/data";

const hasScene = (file: string) => existsSync(path.join(process.cwd(), "public", "scenes", file));

export default function Home() {
  // Checked at build time: only chapters whose illustration exists are shown.
  const chapters = story.filter((c) => hasScene(c.file));

  return (
    <>
      <Nav />
      <main>
        <Hero chapters={chapters} />
        {/* the rest of the site slides up over the night sky like a sheet of paper */}
        <div className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-paper shadow-[0_-30px_60px_-30px_rgba(0,0,0,0.35)]">
          <Intro />
          <Work />
          <Experience />
          <About />
          <Contact art={hasScene("travel.webp") ? "travel.webp" : undefined} />
        </div>
      </main>
    </>
  );
}
