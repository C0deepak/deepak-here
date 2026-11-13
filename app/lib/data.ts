export const profile = {
  name: "Deepak Kumar",
  role: "Software Engineer · Full Stack Builder",
  location: "Bangalore, India",
  email: "deepakkumarkasyap12@gmail.com",
  linkedin: "https://www.linkedin.com/in/kumardeepak12",
  github: "https://github.com/C0deepak",
  resume: "/deepak-kumar-resume.pdf",
  blurb:
    "2+ years taking messy, ambiguous problems from idea to production and owning them end to end. I like small teams, tight loops, and work that ends in something running.",
};

export const stats = [
  { value: 64, suffix: "%", label: "lift in visa order completion", meter: 64 },
  { value: 48, prefix: "~", suffix: "%", label: "cut from monthly AWS spend", meter: 48 },
  { value: 2, prefix: "$", suffix: "k/mo", label: "saved by retiring a dedicated GPU", meter: 100 },
  { value: 90, prefix: "~", suffix: "%", label: "accuracy on the LLM visa assistant", meter: 90 },
];

export type Job = {
  company: string;
  role: string;
  period: string;
  place: string;
  points: string[];
  stack: string[];
};

export const jobs: Job[] = [
  {
    company: "StampMyVisa",
    role: "Software Engineer",
    period: "Mar 2025 — Present",
    place: "Bangalore, India",
    points: [
      "Rebuilt visa document collection into a guided, step-by-step flow with dynamic traveller management and real-time validation across 25+ countries, lifting order completion by 64%. Shipped it as a reusable React SDK.",
      "Turned repeated integration work into reusable modules for insurance, notifications and partner APIs. New providers now onboard with a fraction of the code.",
      "Built a document quality and auto-correction system (Python, OpenCV, scikit-learn). Flagged 5,000+ issues, auto-fixed 64%, and retired a dedicated GPU (~$2,000/month).",
      "Owned a production AWS audit that cut cloud spend ~48%: right-sized RDS, cleared idle EC2 and Elastic IPs, moved CI/CD to GitHub Actions.",
      "Kept visa automation alive across 20+ country workflows, reverse-engineering shifting government portals with Puppeteer and async job queues.",
      "Shipped an LLM-powered visa assistant (eligibility, plans, pricing, timelines) at ~90% accuracy, plus a Claude-powered PR-review bot the whole team uses.",
    ],
    stack: ["Next.js", "NestJS", "PostgreSQL", "Redis", "BullMQ", "Puppeteer", "AWS", "OpenCV", "LangChain"],
  },
  {
    company: "Breezo.AI",
    role: "Full Stack Developer Intern",
    period: "Oct 2023 — Jan 2024",
    place: "Remote",
    points: [
      "Built the full frontend for a real-time AI WhatsApp marketing platform: chat, conversation management, message actions, file sharing and live status.",
      "Wrote backend messaging, auth and the ElevenLabs voice integration.",
    ],
    stack: ["Next.js", "Tailwind", "shadcn/ui", "Node.js", "Socket.IO", "ElevenLabs"],
  },
];

export type Work = {
  no: string;
  title: string;
  tag: string;
  dek: string;
  metric: string;
  metricLabel: string;
  stack: string[];
  href?: string;
  visual: "sdk" | "cv" | "cost" | "chat" | "resume";
};

export const work: Work[] = [
  {
    no: "001",
    visual: "sdk",
    title: "A visa flow you can drop into any app",
    tag: "Product · SDK",
    dek: "Rebuilt a multi-country document collection flow into a guided, validated experience and packaged it as a React SDK so partners embed the whole thing.",
    metric: "+64%",
    metricLabel: "order completion",
    stack: ["React", "TypeScript", "SDK", "25+ countries"],
  },
  {
    no: "002",
    visual: "cv",
    title: "Teaching a pipeline to spot a blurry passport",
    tag: "Computer vision",
    dek: "Blur, background and size checks with OpenCV and scikit-learn that fix most problems on their own, so a GPU we were renting became unnecessary.",
    metric: "5,000+",
    metricLabel: "issues flagged, 64% auto-fixed",
    stack: ["Python", "OpenCV", "scikit-learn"],
  },
  {
    no: "003",
    visual: "cost",
    title: "Half the cloud bill, same product",
    tag: "Infra · AWS",
    dek: "A production audit that right-sized RDS, cleared idle EC2 and Elastic IPs, and moved CI/CD off self-hosted runners.",
    metric: "−48%",
    metricLabel: "monthly AWS spend",
    stack: ["AWS", "RDS", "EC2", "GitHub Actions"],
  },
  {
    no: "004",
    visual: "chat",
    title: "An assistant that actually knows visas",
    tag: "AI · LLMs",
    dek: "Answers questions, checks eligibility and drafts personalised application plans with documents, pricing and timelines.",
    metric: "~90%",
    metricLabel: "answer accuracy",
    stack: ["LLMs", "LangChain", "Node.js"],
  },
  {
    no: "005",
    visual: "resume",
    title: "GradAI: career & recruitment platform",
    tag: "Side project",
    dek: "Resume and portfolio builders with themes, inline editing and PDF export, plus recruiter workflows and AI screening that writes contextual interview questions.",
    metric: "1,000+",
    metricLabel: "users",
    stack: ["Next.js", "MongoDB", "Better Auth", "RBAC"],
    href: "https://gradai.in",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages & frameworks", items: ["TypeScript", "Node.js", "NestJS", "Express", "React", "Next.js", "Tailwind CSS", "shadcn/ui", "Ant Design"] },
  { group: "Data & tooling", items: ["PostgreSQL", "MongoDB", "Redis", "BullMQ", "Puppeteer", "OpenCV", "scikit-learn", "Postman"] },
  { group: "Cloud & automation", items: ["AWS EC2", "S3", "RDS", "Route 53", "Load Balancers", "GitHub Actions", "CI/CD"] },
  { group: "Systems & AI", items: ["REST API design", "JWT", "RBAC", "WebSockets", "Image processing", "LLM integration", "LangChain"] },
];

export const marquee = [
  "TypeScript", "Node.js", "React", "Next.js", "NestJS", "PostgreSQL", "Redis", "AWS",
  "Puppeteer", "OpenCV", "LangChain", "LLMs", "BullMQ", "GitHub Actions",
];

export const extras = [
  { title: "BIT Sindri", sub: "B.Tech, Information Technology · CGPA 8.5", meta: "2021 — 2025" },
  { title: "IETE Students' Forum", sub: "Led the Technical Dept, designed CTF challenges, ran Tech Udbhav", meta: "Leadership" },
  { title: "Smart India Hackathon 2024", sub: "Finalist: a wool-management solution for the textile industry", meta: "Finalist" },
];

export type Scene = { file: string; phrase: string; note: string };

/**
 * Illustrations for the hero sentence. The first one is "what I do",
 * the rest are "off the clock". Scenes whose file is missing from
 * /public/scenes are skipped automatically.
 */
export const scenes: Scene[] = [
  { file: "coding.webp", phrase: "write code", note: "Laptop, chai, and a bug that's about to lose." },
  { file: "travel.webp", phrase: "planning the next trip", note: "Backpack packed, camera charged, route half-planned." },
  { file: "music.webp", phrase: "playing guitar and singing", note: "Four chords and a lot of enthusiasm." },
  { file: "cooking.webp", phrase: "cooking something new", note: "Recipes are just algorithms you can eat." },
  { file: "beach.webp", phrase: "somewhere near the sea", note: "Salt air resets everything." },
  { file: "bhakti.webp", phrase: "sitting quietly in bhakti", note: "Quiet mornings, steady mind." },
  { file: "people.webp", phrase: "listening to people's stories", note: "The best products start with a good conversation." },
];

export type Mood = "dawn" | "morning" | "noon" | "afternoon" | "sunset" | "evening" | "night";

export type Chapter = {
  file: string;
  time: string;
  mood: Mood;
  /** Wrap the emphasised words in *asterisks*. */
  title: string;
  note: string;
};

/**
 * "A day with Deepak" — the scroll story in the hero, in order of the day.
 * Chapters whose illustration is missing from /public/scenes are skipped,
 * so beach / bhakti / people slot in automatically once you add them.
 */
export const story: Chapter[] = [
  { file: "bhakti.webp", time: "06:00", mood: "dawn", title: "I start the day in *bhakti.*", note: "Quiet mornings, steady mind." },
  { file: "coding.webp", time: "09:00", mood: "morning", title: "I write code that *ships.*", note: "Laptop, chai, and a bug that's about to lose." },
  { file: "travel.webp", time: "13:00", mood: "noon", title: "I plan the *next trip.*", note: "Backpack packed, camera charged, route half-planned." },
  { file: "beach.webp", time: "16:30", mood: "afternoon", title: "I chase the *sea.*", note: "Salt air resets everything." },
  { file: "music.webp", time: "18:30", mood: "sunset", title: "I play guitar and *sing.*", note: "Four chords and a lot of enthusiasm." },
  { file: "people.webp", time: "20:00", mood: "evening", title: "I listen to *people.*", note: "The best products start with a good conversation." },
  { file: "cooking.webp", time: "21:30", mood: "night", title: "I cook something *new.*", note: "Recipes are just algorithms you can eat." },
];
