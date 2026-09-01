import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { PageShell, PageHero } from "@/components/page-shell";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Club Partners & Sponsors | Rayon Sports FC" },
      {
        name: "description",
        content:
          "The commercial partners and sponsors supporting Rayon Sports FC, including Jayrutty Investment, Bank of Kigali and Rayon Plus.",
      },
      { property: "og:title", content: "Club Partners & Sponsors | Rayon Sports FC" },
      {
        property: "og:description",
        content:
          "Meet the partners and sponsors who support Rayon Sports FC on and off the pitch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PartnersPage,
});

const partners = [
  {
    name: "Jayrutty Investment",
    href: "https://www.jayruttyinvestment.com/index.php",
    tier: "Principal Partner",
    body: "Front-of-shirt partner supporting the first team and the club's long-term infrastructure projects.",
  },
  {
    name: "Bank of Kigali",
    href: "https://bk.rw/",
    tier: "Official Bank",
    body: "Banking partner powering membership payments, matchday ticketing and the club's financial operations.",
  },
  {
    name: "Rayon Plus",
    href: "https://www.rayonplus.rw/",
    tier: "Official Media Platform",
    body: "Streaming and content home for match highlights, interviews and behind-the-scenes access.",
  },
];

function PartnersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About the Club"
        title="Club Partners"
        intro="Our partners help Rayon Sports compete at the highest level while investing in youth football and community programmes across Rwanda."
      />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="grid gap-4 lg:grid-cols-3">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
                {partner.tier}
              </span>
              <h2 className="mt-2 flex items-center gap-2 font-display text-3xl font-bold uppercase leading-none text-foreground group-hover:text-primary">
                {partner.name}
                <ExternalLink size={16} />
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {partner.body}
              </p>
            </a>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-border bg-secondary p-6">
          <h2 className="font-display text-2xl font-bold uppercase leading-none text-foreground">
            Partner with Rayon Sports
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Reach one of the largest and most passionate supporter bases in East
            Africa. Our commercial team will build a package around your
            objectives.
          </p>
          <a
            href="mailto:commercial@rayonsports.rw"
            className="mt-4 inline-block rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            commercial@rayonsports.rw
          </a>
        </div>
      </section>
    </PageShell>
  );
}
