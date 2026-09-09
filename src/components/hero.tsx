import { ArrowRight, ArrowUpRight } from "lucide-react";
import heroImg from "@/assets/hero-stadium.jpg";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden" aria-label="Featured news">
      <div className="relative h-[68vh] max-h-[720px] min-h-[520px]">
        <img
          src={heroImg}
          alt="Packed stadium under floodlights on a match night"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy/60 to-navy/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/85 via-navy-deep/20 to-transparent" />

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12 sm:pb-16">
          <span className="inline-flex w-fit items-center gap-2 bg-gold px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-gold-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-foreground" />
            Latest Club News
          </span>

          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-[1.02] text-navy-foreground sm:text-6xl">
            Late winner seals dramatic comeback under the lights
          </h1>

          <p className="mt-3 max-w-2xl text-sm text-navy-foreground/80 sm:text-base">
            A stoppage-time strike capped a second-half turnaround as the Blues
            roared back in front of a sold-out crowd at Amahoro Stadium.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#news"
              className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Read full story
              <ArrowRight size={16} />
            </a>
            <a
              href="#news"
              className="inline-flex items-center gap-1.5 border border-navy-foreground/30 px-5 py-2.5 text-sm font-semibold text-navy-foreground transition-colors hover:bg-navy-foreground/10"
            >
              All news
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
