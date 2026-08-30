import { ArrowUpRight } from "lucide-react";
import { newsItems } from "@/lib/club-data";
import newsCelebration from "@/assets/news-celebration.jpg";
import newsAcademy from "@/assets/news-academy.jpg";
import newsTrophy from "@/assets/news-trophy.jpg";

const images: Record<string, { src: string; alt: string }> = {
  n1: {
    src: newsCelebration,
    alt: "Player in blue celebrating a goal under stadium lights",
  },
  n2: {
    src: newsAcademy,
    alt: "Academy players training on the pitch at sunrise",
  },
  n3: {
    src: newsTrophy,
    alt: "Players lifting a trophy amid blue and gold confetti",
  },
};

export function NewsGrid() {
  return (
    <section id="news" className="py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Club News
            </p>
            <h2 className="mt-1 font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl">
              Latest News
            </h2>
          </div>
          <a
            href="#"
            className="hidden items-center gap-1.5 text-sm font-semibold text-primary hover:underline sm:inline-flex"
          >
            View all news
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => {
            const image = images[item.id] ?? {
              src: newsCelebration,
              alt: item.title,
            };
            return (
              <article
                key={item.id}
                className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                <a href="#" className="block">
                  <div className="overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="font-bold uppercase tracking-wide text-primary">
                        {item.category}
                      </span>
                      <span className="text-muted-foreground">{item.date}</span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold uppercase leading-snug text-foreground transition-colors group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Read more
                      <ArrowUpRight
                        size={15}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
