import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageShell, PageHero } from "@/components/page-shell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Rayon Sports FC" },
      {
        name: "description",
        content:
          "Get in touch with Rayon Sports FC — club office, ticketing, membership, media and commercial contact details.",
      },
      { property: "og:title", content: "Contact Us | Rayon Sports FC" },
      {
        property: "og:description",
        content:
          "Club office, ticketing, membership, media and commercial contacts for Rayon Sports FC.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const departments = [
  { name: "Club Office", email: "info@rayonsports.rw", phone: "+250 788 000 100" },
  { name: "Ticketing", email: "tickets@rayonsports.rw", phone: "+250 788 000 200" },
  { name: "Membership", email: "members@rayonsports.rw", phone: "+250 788 000 300" },
  { name: "Media Enquiries", email: "media@rayonsports.rw", phone: "+250 788 000 400" },
  { name: "Commercial", email: "commercial@rayonsports.rw", phone: "+250 788 000 500" },
];

function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About the Club"
        title="Contact Us"
        intro="Our supporter services team is available Monday to Friday, 09:00–17:00 CAT, and on every matchday from three hours before kick-off."
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.2fr_1fr] sm:py-14">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase leading-none text-foreground">
            Departments
          </h2>
          <div className="mt-6 space-y-3">
            {departments.map((dept) => (
              <div
                key={dept.name}
                className="rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <h3 className="font-semibold text-foreground">{dept.name}</h3>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                  <a
                    href={`mailto:${dept.email}`}
                    className="flex items-center gap-1.5 hover:text-primary"
                  >
                    <Mail size={14} /> {dept.email}
                  </a>
                  <a
                    href={`tel:${dept.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-1.5 hover:text-primary"
                  >
                    <Phone size={14} /> {dept.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-xl border border-border bg-secondary p-6">
          <h2 className="font-display text-2xl font-bold uppercase leading-none text-foreground">
            Club Address
          </h2>
          <p className="mt-3 flex gap-2 text-sm leading-relaxed text-muted-foreground">
            <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
            <span>
              Rayon Sports FC
              <br />
              Nyarugunga, Kicukiro District
              <br />
              Kigali, Rwanda
            </span>
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            For lost property and matchday accessibility support, please visit
            the supporter services desk at the main stand.
          </p>
        </aside>
      </section>
    </PageShell>
  );
}
