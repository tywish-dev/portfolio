import { motion } from "framer-motion";
import { ArrowRight, Layers } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projects } from "@/data/projects";

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
            Full-stack apps, mobile clients, and real-time products—each with
            its own case page, repo links, and stack notes.
          </p>
        </div>

        <motion.ul
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {projects.map((project) => {
            const multiRepo = project.repos.length > 1;
            return (
              <motion.li key={project.slug} variants={cardVariants}>
                <Card className="group flex h-full flex-col border-border/80 bg-card/80 transition-colors hover:border-primary/40">
                  <CardHeader className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      {multiRepo ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          <Layers className="size-3" aria-hidden />
                          Frontend + backend
                        </span>
                      ) : null}
                    </div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription>{project.summary}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={`/projects/${project.slug}`}
                      data-astro-prefetch
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      View project
                      <ArrowRight
                        className="size-3.5 opacity-70 transition-opacity group-hover:opacity-100"
                        aria-hidden
                      />
                    </a>
                  </CardContent>
                </Card>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
