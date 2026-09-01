import { createFileRoute } from "@tanstack/react-router";
import { Trophy } from "lucide-react";
import { PageShell, PageHero } from "@/components/page-shell";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Our History: Rayon Sports FC Since 1968 | Honours & Milestones" },
      {
        name: "description",
        content:
          "The history of Rayon Sports FC — founded in Nyanza in May 1968, nicknamed Gikundiro, with 9 Premier League titles, 11 Peace Cups, the 1998 CECAFA Cup and a 2018 CAF Confederation Cup quarter-final run.",
      },
      {
        property: "og:title",
        content: "Our History: Rayon Sports FC Since 1968 | Honours & Milestones",
      },
      {
        property: "og:description",
        content:
          "From Nyanza in 1968 to continental football: the milestones and honours of Rayon Sports FC.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HistoryPage,
});

const honours = [
  { count: "9", label: "Rwanda Premier League titles" },
  { count: "11", label: "Rwandan Peace Cups" },
  { count: "1", label: "CECAFA Clubs Cup (1998)" },
  { count: "QF", label: "CAF Confederation Cup 2018" },
];

const timeline = [
  {
    year: "May 1968",
    title: "Founded in Nyanza",
    body: "The club is founded in Nyanza, in Rwanda's Southern Province, before growing into one of the country's biggest sporting institutions and later basing itself in Kigali.",
  },
  {
    year: "1970s–1980s",
    title: "Gikundiro is born",
    body: "The team earns the nickname Gikundiro — 'the beloved one' — as its support spreads far beyond Nyanza and it establishes itself among Rwanda's leading clubs.",
  },
  {
    year: "1998",
    title: "CECAFA Clubs Cup champions",
    body: "Rayon Sports wins the CECAFA Clubs Cup, the club's landmark regional triumph and still one of the proudest nights in Rwandan club football.",
  },
  {
    year: "Domestic era",
    title: "Nine league titles, eleven Peace Cups",
    body: "Repeated success in the Rwanda Premier League and the Rwandan Peace Cup makes Rayon Sports one of the two dominant forces in the domestic game.",
  },
  {
    year: "2018",
    title: "CAF Confederation Cup quarter-finals",
    body: "The club reaches the quarter-finals of the CAF Confederation Cup, its deepest continental run and a benchmark for the modern era.",
  },
  {
    year: "Today",
    title: "A club built on its supporters",
    body: "Backed by one of the largest fan bases in East Africa, Rayon Sports continues to invest in its academy, its women's team and its community programmes.",
  },
];

function HistoryPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="More"
        title="Our History"
        intro="Founded in May 1968 in Nyanza and known everywhere as Gikundiro, Rayon Sports FC has spent more than five decades at the heart of Rwandan football."
      />

      <section className="bg-navy py-8 text-navy-foreground sm:py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 lg:grid-cols-4">
          {honours.map((h) => (
            <div
              key={h.label}
              className="rounded-xl bg-navy-deep p-5 text-center ring-1 ring-navy-foreground/10"
            >
              <Trophy className="mx-auto text-gold" size={20} />
              <div className="mt-2 font-display text-4xl font-bold leading-none">
                {h.count}
              </div>
              <div className="mt-1 text-[11px] font-bold uppercase tracking-wide text-navy-foreground/60">
                {h.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
        <h2 className="font-display text-3xl font-bold uppercase leading-none text-foreground">
          Club Timeline
        </h2>
        <ol className="mt-6 space-y-6 border-l-2 border-border pl-6">
          {timeline.map((item) => (
            <li key={item.year} className="relative">
              <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-gold ring-4 ring-background" />
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                {item.year}
              </div>
              <h3 className="mt-1 font-display text-2xl font-bold uppercase leading-none text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </PageShell>
  );
}
