import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, MapPin } from "lucide-react";
import { PageShell, PageHero } from "@/components/page-shell";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers & Job Vacancies | Rayon Sports FC" },
      {
        name: "description",
        content:
          "Work for Rayon Sports FC. Current vacancies across coaching, analysis, commercial, media and matchday operations in Kigali.",
      },
      { property: "og:title", content: "Careers & Job Vacancies | Rayon Sports FC" },
      {
        property: "og:description",
        content:
          "Current vacancies across coaching, commercial, media and matchday operations at Rayon Sports FC.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareersPage,
});

const roles = [
  {
    title: "Academy Goalkeeping Coach",
    dept: "Football Operations",
    location: "Kigali",
    type: "Full time",
  },
  {
    title: "Performance Analyst",
    dept: "Football Operations",
    location: "Kigali",
    type: "Full time",
  },
  {
    title: "Digital Content Producer",
    dept: "Media",
    location: "Kigali",
    type: "Full time",
  },
  {
    title: "Partnerships Executive",
    dept: "Commercial",
    location: "Kigali",
    type: "Full time",
  },
  {
    title: "Matchday Stewards",
    dept: "Operations",
    location: "Stadium",
    type: "Casual",
  },
];

function CareersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About the Club"
        title="Careers"
        intro="Join the team behind Gikundiro. We hire people who care about football, about our supporters, and about doing things properly."
      />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <h2 className="font-display text-3xl font-bold uppercase leading-none text-foreground">
          Current Vacancies
        </h2>
        <div className="mt-6 space-y-3">
          {roles.map((role) => (
            <article
              key={role.title}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="min-w-0">
                <h3 className="font-display text-2xl font-bold uppercase leading-none text-foreground">
                  {role.title}
                </h3>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Briefcase size={13} /> {role.dept}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} /> {role.location}
                  </span>
                  <span className="text-primary">{role.type}</span>
                </div>
              </div>
              <a
                href="mailto:careers@rayonsports.rw"
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Apply
              </a>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          No suitable role? Send a speculative application to{" "}
          <a
            href="mailto:careers@rayonsports.rw"
            className="font-semibold text-primary hover:underline"
          >
            careers@rayonsports.rw
          </a>
          .
        </p>
      </section>
    </PageShell>
  );
}
