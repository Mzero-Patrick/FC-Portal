import { Shield } from "lucide-react";
import { socialLinks } from "@/lib/social-links";

const usefulLinks = ["Official App", "FAQs", "Contact Us", "Website Feedback"];

const clubLinks = [
  "Club History",
  "Stadium Tours",
  "Academy",
  "Foundation",
  "Careers",
];

const supportLinks = ["Contact Us", "FAQs", "Ticketing Policy", "Accessibility"];

const legalLinks = [
  "Privacy Policy",
  "Terms & Conditions",
  "Cookie Policy",
  "Modern Slavery Statement",
];


function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <nav aria-label={title}>
      <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((label) => (
          <li key={label}>
            <a
              href="#"
              className="text-sm text-navy-foreground/70 transition-colors hover:text-navy-foreground"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold text-gold-foreground">
              <Shield className="h-5 w-5" fill="currentColor" strokeWidth={1} />
            </div>
            <div className="leading-none">
              <div className="font-display text-2xl font-bold uppercase tracking-wide">
                Rayon Sports
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold">
                Football Club
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-foreground/70">
            The official home of Rayon Sports FC. News, fixtures, tickets and
            everything matchday at Amahoro Stadium.
          </p>
          <div className="mt-5 flex items-center gap-2.5">
            {socials.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-navy-foreground/20 text-navy-foreground/70 transition-colors hover:border-gold hover:bg-gold hover:text-gold-foreground"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Useful Links" links={usefulLinks} />
        <FooterColumn title="The Club" links={clubLinks} />
        <FooterColumn title="Support" links={supportLinks} />
      </div>

      <div className="border-t border-navy-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-navy-foreground/60 sm:flex-row">
          <p>© 2026 Rayon Sports FC. All rights reserved.</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2" aria-label="Legal">
            {legalLinks.map((label) => (
              <a
                key={label}
                href="#"
                className="transition-colors hover:text-navy-foreground"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
