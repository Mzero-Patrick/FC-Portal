import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SponsorBanner } from "@/components/sponsor-banner";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>{children}</main>
      <SponsorBanner />
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="bg-navy-deep py-10 text-navy-foreground sm:py-14">
      <div className="mx-auto max-w-7xl px-4">
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
          {eyebrow}
        </span>
        <h1 className="mt-2 font-display text-4xl font-bold uppercase leading-none sm:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-navy-foreground/70 sm:text-base">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
