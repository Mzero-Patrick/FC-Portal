const sponsors = [
  {
    name: "Jayrutty",
    tagline: "Official Investment Partner",
    href: "https://www.jayruttyinvestment.com/index.php",
  },
  {
    name: "Bank of Kigali",
    tagline: "Official Banking Partner",
    href: "https://bk.rw/",
  },
];

export function SponsorBanner() {
  return (
    <section
      aria-label="Official club partners"
      className="border-t border-border bg-navy-deep text-navy-foreground"
    >
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-center text-xs font-bold uppercase tracking-[0.25em] text-gold">
          Official Club Partners
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-4 rounded-lg border border-navy-foreground/15 bg-navy px-6 py-6 transition-colors hover:border-gold"
            >
              <div className="text-center">
                <div className="font-display text-2xl font-bold uppercase tracking-wide transition-colors group-hover:text-gold">
                  {sponsor.name}
                </div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-foreground/60">
                  {sponsor.tagline}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
