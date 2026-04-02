import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const placeholders = [
  {
    title: "Project one",
    description:
      "Replace this card with a real project: problem, stack, and outcome.",
    href: "#",
  },
  {
    title: "Project two",
    description:
      "Link to the live site, GitHub, or a case study—whatever tells the story best.",
    href: "#",
  },
  {
    title: "Project three",
    description:
      "Use Astro for speed and sprinkle React islands where you need motion or interactivity.",
    href: "#",
  },
];

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 320, damping: 26 },
  },
};

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="scroll-mt-20 border-t border-border bg-card/30 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Showcase
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Selected work
          </h2>
          <p className="mt-3 text-muted-foreground">
            Swap these placeholders for your shipped products, open source, or
            freelance builds.
          </p>
        </div>

        <motion.ul
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {placeholders.map((project) => (
            <motion.li key={project.title} variants={cardVariants}>
              <Card className="group h-full border-border/80 bg-card/80 transition-colors hover:border-primary/40">
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href={project.href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Details
                    <ExternalLink
                      className="size-3.5 opacity-70 transition-opacity group-hover:opacity-100"
                      aria-hidden
                    />
                  </a>
                </CardContent>
              </Card>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
