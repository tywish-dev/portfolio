import type { Project } from "./projects";

/** Site-wide constants for SEO, JSON-LD, and contact links. */
export const SITE = {
  name: "Samet Yılmaz",
  defaultTitle: "Samet Yılmaz — Portfolio",
  defaultDescription:
    "Portfolio and projects by Samet Yılmaz — full-stack software engineer. sametyilmaz.tech",
  url: "https://sametyilmaz.tech",
  email: "sametyilmaz621@gmail.com",
  github: "https://github.com/tywish-dev",
  linkedin: "https://www.linkedin.com/in/samet-yilmaz-dev/",
  locale: "en_US",
  themeColor: "#0a0a0c",
  ogImagePath: "/og-image.png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
} as const;

export function sameAsLinks(): string[] {
  return [SITE.github, SITE.linkedin];
}

/** Breadcrumbs + SoftwareSourceCode for individual project pages */
export function buildProjectJsonLd(project: Project, pageCanonicalHref: string) {
  const primaryRepo = project.repos[0]?.url;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE.url}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${SITE.url}/#projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: pageCanonicalHref,
          },
        ],
      },
      {
        "@type": "SoftwareSourceCode",
        name: project.title,
        description: project.summary,
        url: pageCanonicalHref,
        ...(primaryRepo ? { codeRepository: primaryRepo } : {}),
        programmingLanguage: project.tech.join(", "),
      },
    ],
  };
}

export function buildDefaultJsonLd() {
  const personId = `${SITE.url}/#person`;
  const websiteId = `${SITE.url}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE.url,
        name: SITE.defaultTitle,
        alternateName: ["sametyilmaz.tech", SITE.name],
        description: SITE.defaultDescription,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: SITE.name,
        url: SITE.url,
        email: SITE.email,
        sameAs: sameAsLinks(),
        jobTitle: "Software Engineer",
      },
    ],
  };
}
