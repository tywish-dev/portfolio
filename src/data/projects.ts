export type ProjectRepo = {
  label: string;
  url: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tech: string[];
  repos: ProjectRepo[];
  liveUrl?: string;
  highlights: string[];
};

export const projects: Project[] = [
  {
    slug: "jobtrackr",
    title: "JobTrackr",
    summary:
      "Full-stack job application tracker with AI auto-fill from posting URLs, stats, and JWT auth.",
    description:
      "JobTrackr helps you track every application in one place. Paste a job posting URL and the stack pulls company, role, salary, and notes using an LLM-backed extraction API. The dashboard surfaces pipeline stats, filters, and a full applications table with a clean, editorial UI.",
    tech: [
      "React 18",
      "Spring Boot 3",
      "PostgreSQL",
      "JWT",
      "Axios",
      "Recharts",
      "Vercel",
      "Render",
      "Groq / LLaMA 3.1",
    ],
    repos: [
      {
        label: "Frontend",
        url: "https://github.com/tywish-dev/jobtrackr-frontend",
      },
      {
        label: "Backend",
        url: "https://github.com/tywish-dev/jobtrackr",
      },
    ],
    liveUrl: "https://jobtrackr-sy.vercel.app",
    highlights: [
      "Split into dedicated frontend and API repositories for clear ownership and deploys.",
      "AI auto-fill: paste a careers URL and populate structured fields via the backend extractor.",
      "Stats dashboard with pipeline breakdown, response rate, and status filters.",
      "Secure register/login with BCrypt and stateless JWT sessions.",
    ],
  },
  {
    slug: "chat-with-gpt",
    title: "Chat With GPT",
    summary:
      "Cross-platform Flutter client for conversational chat powered by the GPT-3 API.",
    description:
      "A Flutter application focused on a simple chat experience against GPT-3. It runs across mobile and desktop targets supported by Flutter, with a single Dart codebase for UI and API integration.",
    tech: ["Flutter", "Dart", "OpenAI GPT-3"],
    repos: [
      {
        label: "Repository",
        url: "https://github.com/tywish-dev/Chat_With_GPT",
      },
    ],
    highlights: [
      "Flutter multi-platform layout (mobile, web, and desktop scaffolding).",
      "Chat-oriented UX built for quick iteration on prompts and responses.",
    ],
  },
  {
    slug: "qrave",
    title: "QRave",
    summary:
      "QR menu system with payments and real-time updates over WebSockets.",
    description:
      "QRave is a modern QR-based menu experience: customers scan, browse, and pay from their devices. The stack pairs a Next.js client with a NestJS API, PostgreSQL persistence, and Socket.io for live order and menu updates so front-of-house and guests stay in sync.",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "NestJS",
      "PostgreSQL",
      "TypeORM",
      "Socket.io",
      "Axios",
    ],
    repos: [
      {
        label: "Frontend",
        url: "https://github.com/tywish-dev/qrave-frontend",
      },
      {
        label: "Backend",
        url: "https://github.com/tywish-dev/qrave-backend",
      },
    ],
    highlights: [
      "Split frontend and backend repos: Next.js UI plus NestJS services and data layer.",
      "Real-time channel via Socket.io for instant menu and order feedback.",
      "Payment-capable QR menu flow designed for venues and hospitality use cases.",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
