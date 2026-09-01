import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, ExternalLink, HeartHandshake, Target, Users } from "lucide-react";
import { PageShell, PageHero } from "@/components/page-shell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Rayon Sports FC | Mission, Leadership & Partners" },
      {
        name: "description",
        content:
          "Learn about Rayon Sports FC — our club mission and values, the leadership team behind Gikundiro, and the partners who support the club.",
      },
      {
        property: "og:title",
        content: "About Rayon Sports FC | Mission, Leadership & Partners",
      },
      {
        property: "og:description",
        content:
          "Our mission and values, the club leadership team, and the partners supporting Rayon Sports FC.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: Target,
    title: "Our Mission",
    body: "To compete for every trophy we enter while developing Rwandan talent, and to be a club our supporters are proud to call their own.",
  },
  {
    icon: Users,
    title: "Our People",
    body: "From the academy pitches to the terraces, Gikundiro is built by the community that follows it home and away.",
  },
  {
    icon: HeartHandshake,
    title: "Our Values",
    body: "Integrity, ambition and belonging — on the pitch, in the boardroom and across every project we run in Rwanda.",
  },
  {
    icon: Award,
    title: "Our Ambition",
    body: "Sustained domestic dominance and consistent progress in continental competition, backed by a self-sustaining football operation.",
  },
];

const leadership = [
  { name: "Emmanuel Karenzi", role: "Club President" },
  { name: "Josiane Uwera", role: "Chief Executive Officer" },
  { name: "Patrick Bizimana", role: "Director of Football" },
  { name: "Claudine Mukamana", role: "Head of Academy" },
  { name: "Eric Habimana", role: "Commercial Director" },
  { name: "Alice Umutesi", role: "Head of Supporter Relations" },
];

const partners = [
  {
    name: "Jayrutty Investment",
    href: "https://www.jayruttyinvestment.com/index.php",
    role: "Principal Partner",
  },
  { name: "Bank of Kigali", href: "https://bk.rw/", role: "Official Bank" },
  {
    name: "Rayon Plus",
    href: "https://www.rayonplus.rw/",
    role: "Official Media Platform",
  },
];

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About the Club"
        title="About Rayon Sports"
        intro="Rayon Sports FC is one of Rwanda's most successful and best-supported football clubs. Known to supporters everywhere as Gikundiro, the club combines a proud domestic history with a modern, community-first football operation."
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="grid gap-4 sm:grid-cols-2">
          {values.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Icon size={18} />
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold uppercase leading-none text-foreground">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-display text-3xl font-bold uppercase leading-none text-foreground">
            Club Leadership
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((person) => (
              <div
                key={person.name}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy font-display text-lg font-bold text-navy-foreground">
                  {person.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="min-w-0">
                  <div className="truncate font-semibold text-foreground">
                    {person.name}
                  </div>
                  <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {person.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <h2 className="font-display text-3xl font-bold uppercase leading-none text-foreground">
          Our Partners
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
                {partner.role}
              </div>
              <div className="mt-2 flex items-center gap-2 font-display text-2xl font-bold uppercase leading-none text-foreground group-hover:text-primary">
                {partner.name}
                <ExternalLink size={16} />
              </div>
            </a>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/partners"
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            All club partners
          </Link>
          <Link
            to="/contact"
            className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
          >
            Contact us
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
