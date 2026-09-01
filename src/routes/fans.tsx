import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, MapPin, Megaphone, Star, Ticket, Users } from "lucide-react";
import { PageShell, PageHero } from "@/components/page-shell";

export const Route = createFileRoute("/fans")({
  head: () => ({
    meta: [
      { title: "Fans Hub: Membership, Supporter Clubs & Events | Rayon Sports FC" },
      {
        name: "description",
        content:
          "The Rayon Sports FC fan hub — membership tiers and benefits, official supporter clubs across Rwanda, and upcoming local fan events.",
      },
      {
        property: "og:title",
        content: "Fans Hub: Membership, Supporter Clubs & Events | Rayon Sports FC",
      },
      {
        property: "og:description",
        content:
          "Membership benefits, official supporter clubs and upcoming fan events for Gikundiro supporters.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FansPage,
});

const memberships = [
  {
    name: "Gikundiro Junior",
    price: "5,000 RWF / season",
    perks: ["Membership card & scarf", "Birthday message", "Junior matchday club"],
  },
  {
    name: "Blue Member",
    price: "15,000 RWF / season",
    perks: ["Priority ticket window", "10% shop discount", "Members-only newsletter"],
    featured: true,
  },
  {
    name: "Gikundiro Gold",
    price: "45,000 RWF / season",
    perks: ["Away ticket priority", "Stadium tour for two", "Exclusive squad Q&A"],
  },
];

const supporterClubs = [
  { name: "Kigali City Blues", area: "Kigali", members: "4,200 members" },
  { name: "Nyanza Originals", area: "Nyanza", members: "1,450 members" },
  { name: "Huye Gikundiro", area: "Huye", members: "980 members" },
  { name: "Musanze Blue Wave", area: "Musanze", members: "760 members" },
  { name: "Rubavu Lakeside", area: "Rubavu", members: "610 members" },
  { name: "Diaspora Blues", area: "International", members: "2,100 members" },
];

const events = [
  {
    date: "Fri 11 Sep",
    title: "Fan Forum with the Head Coach",
    place: "Club Hall, Kicukiro",
  },
  {
    date: "Sat 19 Sep",
    title: "Family Matchday: free face painting & kids zone",
    place: "Main Stand Concourse",
  },
  {
    date: "Sun 27 Sep",
    title: "Community Clean-Up & 5-a-side Tournament",
    place: "Nyanza",
  },
  {
    date: "Sat 3 Oct",
    title: "Supporter Club Away Travel — coach convoy",
    place: "Departs Club Office 09:00",
  },
];

function FansPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="More"
        title="Fans"
        intro="Gikundiro is nothing without its supporters. Join the membership, find your local supporter club, and get involved in fan events across the country."
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="flex items-center gap-2">
          <Star className="text-gold" size={18} />
          <h2 className="font-display text-3xl font-bold uppercase leading-none text-foreground">
            Fan Membership
          </h2>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {memberships.map((tier) => (
            <article
              key={tier.name}
              className={`rounded-xl border p-6 shadow-sm ${
                tier.featured
                  ? "border-primary bg-card ring-2 ring-primary/20"
                  : "border-border bg-card"
              }`}
            >
              {tier.featured && (
                <span className="mb-2 inline-block rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-foreground">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-2xl font-bold uppercase leading-none text-foreground">
                {tier.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-primary">
                {tier.price}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {perk}
                  </li>
                ))}
              </ul>
              <a
                href="/#tickets"
                className="mt-5 flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <Ticket size={15} /> Join now
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-2">
            <Users className="text-primary" size={18} />
            <h2 className="font-display text-3xl font-bold uppercase leading-none text-foreground">
              Official Supporter Clubs
            </h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {supporterClubs.map((club) => (
              <div
                key={club.name}
                className="rounded-xl border border-border bg-card p-5"
              >
                <h3 className="font-semibold text-foreground">{club.name}</h3>
                <div className="mt-2 flex items-center justify-between text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} /> {club.area}
                  </span>
                  <span className="text-primary">{club.members}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="flex items-center gap-2">
          <Megaphone className="text-primary" size={18} />
          <h2 className="font-display text-3xl font-bold uppercase leading-none text-foreground">
            Local Fan Events
          </h2>
        </div>
        <div className="mt-6 space-y-3">
          {events.map((event) => (
            <article
              key={event.title}
              className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="grid w-20 shrink-0 place-items-center rounded-lg bg-navy px-3 py-2 text-center font-display text-lg font-bold uppercase leading-tight text-navy-foreground">
                {event.date}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground">{event.title}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                  <CalendarDays size={13} /> {event.place}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
