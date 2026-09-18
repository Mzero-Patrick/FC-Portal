import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Crown, Gift, Shirt, Sparkles } from "lucide-react";
import { PageShell, PageHero } from "@/components/page-shell";
import { BookingFlow } from "@/components/ticketing/booking";
import {
  formatRwf,
  hospitalityPackages,
  seasonPerks,
} from "@/lib/ticketing-data";

export const Route = createFileRoute("/tickets")({
  head: () => ({
    meta: [
      { title: "Tickets & Hospitality | Rayon Sports FC" },
      {
        name: "description",
        content:
          "Buy Rayon Sports FC matchday tickets at Amahoro Stadium — pick your seat on the stadium map, book VIP, CIP and Executive hospitality, and spin for a free stadium drink.",
      },
      { property: "og:title", content: "Tickets & Hospitality | Rayon Sports FC" },
      {
        property: "og:description",
        content:
          "Pick your seat, book VIP hospitality and claim matchday perks with Rayon Sports FC.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TicketsPage,
});

function TicketsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Matchday"
        title="Tickets & Hospitality"
        intro="Choose your match, pick your exact seat on the Amahoro Stadium map and pay with MTN MoMo, Airtel Money or card. Every completed purchase unlocks a spin for a free stadium drink."
      />

      <section className="mx-auto max-w-5xl px-4 py-10">
        <BookingFlow />
      </section>

      {/* Hospitality */}
      <section className="bg-secondary/50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
            Premium
          </span>
          <h2 className="mt-1 font-display text-3xl font-bold uppercase text-foreground sm:text-4xl">
            Matchday Hospitality
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Lounge packages, seasonal reserved seating and exclusive perks for
            supporters and partners.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {hospitalityPackages.map((pkg) => (
              <article
                key={pkg.id}
                className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <Crown className="h-6 w-6 text-gold" />
                <h3 className="mt-3 font-display text-xl font-bold uppercase text-foreground">
                  {pkg.name}
                </h3>
                <p className="mt-1 font-display text-2xl font-bold text-primary">
                  {formatRwf(pkg.priceRwf)}
                  <span className="ml-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {pkg.per}
                  </span>
                </p>
                <ul className="mt-4 flex-1 space-y-2 text-sm text-muted-foreground">
                  {pkg.perks.map((perk) => (
                    <li key={perk} className="flex gap-2">
                      <Check size={15} className="mt-0.5 shrink-0 text-win" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <a
                  href="#stadium-map"
                  className="mt-5 rounded-md bg-primary py-2.5 text-center text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Book this package
                </a>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <Shirt className="h-6 w-6 text-primary" />
              <h3 className="mt-3 font-display text-xl font-bold uppercase text-foreground">
                Seasonal perks
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {seasonPerks.map((perk) => (
                  <li key={perk} className="flex gap-2">
                    <Sparkles size={15} className="mt-0.5 shrink-0 text-gold" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-navy-deep p-5 text-navy-foreground">
              <Gift className="h-6 w-6 text-gold" />
              <h3 className="mt-3 font-display text-xl font-bold uppercase">
                Free stadium drink spin
              </h3>
              <p className="mt-2 text-sm text-navy-foreground/70">
                Complete any ticket purchase on this page and the spin wheel unlocks
                straight away. Your voucher lands in My Tickets &amp; Rewards.
              </p>
              <Link
                to="/dashboard"
                className="mt-4 inline-block rounded-md bg-gold px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-gold-foreground"
              >
                View my tickets
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
