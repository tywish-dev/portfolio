import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 380, damping: 28 },
  },
};

const stack = [
  "Astro",
  "React",
  "Vite",
  "shadcn/ui",
  "Framer Motion",
  "pnpm",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 sm:pb-28 sm:pt-36 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 grid-bg opacity-40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/25 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-accent/20 blur-[90px]"
        aria-hidden
      />

      <motion.div
        className="relative mx-auto max-w-3xl text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={item}
          className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:text-sm"
        >
          sametyilmaz.tech
        </motion.p>
        <motion.h1
          variants={item}
          className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
        >
          Hi, I&apos;m{" "}
          <span className="text-gradient">Samet Yılmaz</span>
          <span className="text-foreground">.</span>
        </motion.h1>
        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg"
        >
          I build thoughtful web experiences. This portfolio is where I share
          projects, experiments, and the stack I reach for most often.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button size="lg" asChild>
            <a href="#projects">
              View projects
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="mailto:hello@sametyilmaz.tech">
              <Mail className="size-4" aria-hidden />
              Get in touch
            </a>
          </Button>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-14 flex flex-wrap items-center justify-center gap-2"
        >
          {stack.map((label) => (
            <span
              key={label}
              className="rounded-full border border-border bg-secondary/60 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur-sm"
            >
              {label}
            </span>
          ))}
        </motion.div>

        <motion.div
          variants={item}
          className="mt-10 flex justify-center gap-4 text-muted-foreground"
        >
          <a
            href="https://github.com"
            className="transition-colors hover:text-foreground"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
          >
            <Github className="size-5" />
          </a>
          <a
            href="https://linkedin.com"
            className="transition-colors hover:text-foreground"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
          >
            <Linkedin className="size-5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
