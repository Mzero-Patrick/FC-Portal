import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  Ticket,
  X,
} from "lucide-react";
import { socialLinks } from "@/lib/social-links";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { ClubLogo } from "@/components/club-logo";


type NavLink = { label: string; href: string; external?: boolean };

const primaryNav: NavLink[] = [
  { label: "News", href: "/#news" },
  {
    label: "Rayon Plus",
    href: "https://www.rayonplus.rw/",
    external: true,
  },
];

type TeamRoute = "/teams/men" | "/teams/women" | "/teams/juniors" | "/matches";

type TeamsEntry =
  | { label: string; to: TeamRoute }
  | { label: string; children: { label: string; to: TeamRoute }[] };

const teamsNav: TeamsEntry[] = [
  { label: "Men's Team", to: "/teams/men" },
  { label: "Women's Team", to: "/teams/women" },
  {
    label: "Junior Teams",
    children: [
      { label: "Men U20 Team", to: "/teams/juniors" },
      { label: "Men U17 Team", to: "/teams/juniors" },
    ],
  },
  {
    label: "Players Profile",
    children: [
      { label: "Men", to: "/teams/men" },
      { label: "Women", to: "/teams/women" },
      { label: "Juniors", to: "/teams/juniors" },
    ],
  },
  { label: "Fixtures & Standings", to: "/matches" },
];

type MoreRoute = "/about" | "/partners" | "/careers" | "/contact" | "/fans" | "/history";

type MoreEntry =
  | { label: string; to: MoreRoute }
  | { label: string; children: { label: string; to: MoreRoute }[] };

const moreNav: MoreEntry[] = [
  {
    label: "About the Club",
    children: [
      { label: "About Rayon Sports", to: "/about" },
      { label: "Club Partners", to: "/partners" },
      { label: "Careers", to: "/careers" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
  { label: "Fans", to: "/fans" },
  { label: "Our History", to: "/history" },
];

const topBarLinks = ["Club Charter", "Contact Us", "Shop", "My Account"];


export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [mobileTeamsOpen, setMobileTeamsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", search: { mode: "login" }, replace: true });
  };

  return (
    <header id="top" className="sticky top-0 z-50">
      {/* Top bar — secondary links */}
      <div className="hidden bg-navy-deep text-navy-foreground sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-[11px] font-medium tracking-wide">
          <nav className="flex items-center gap-5" aria-label="Secondary">
            {topBarLinks.map((label) => (
              <a
                key={label}
                href="#"
                className="text-navy-foreground/70 transition-colors hover:text-gold"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-navy-foreground/70">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="hover:text-gold"
                >
                  <Icon size={12} />
                </a>
              ))}
            </div>

            <span className="h-3 w-px bg-navy-foreground/20" />
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="font-semibold text-gold hover:text-gold/80"
                >
                  My Tickets
                </Link>
                <button
                  type="button"
                  onClick={signOut}
                  className="text-navy-foreground/70 hover:text-gold"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  search={{ mode: "login" }}
                  className="text-navy-foreground/70 hover:text-gold"
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  search={{ mode: "register" }}
                  className="font-semibold text-gold hover:text-gold/80"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/90">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:flex sm:justify-between">
          {/* Club crest */}
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <ClubLogo className="h-11 w-11" />
            <div className="min-w-0 leading-none">
              <div className="truncate font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                Rayon Sports
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">
                Football Club
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            <Link
              to="/"
              activeOptions={{ exact: true }}
              activeProps={{ className: "border-gold text-primary" }}
              className="border-b-2 border-transparent px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-gold hover:text-primary"
            >
              Home
            </Link>


            {/* Teams dropdown */}
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 border-b-2 border-transparent px-3 py-2 text-sm font-semibold text-foreground transition-colors group-hover:border-gold group-hover:text-primary"
                aria-haspopup="true"
              >
                Teams
                <ChevronDown
                  size={16}
                  className="transition-transform group-hover:rotate-180"
                />
              </button>
              <div className="invisible absolute left-0 top-full z-50 w-56 translate-y-1 rounded-lg border border-border bg-popover py-2 opacity-0 shadow-lg transition-all group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {teamsNav.map((entry) =>
                  "children" in entry ? (
                    <div key={entry.label} className="group/sub relative">
                      <span className="flex cursor-default items-center justify-between px-4 py-2 text-sm font-medium text-popover-foreground transition-colors hover:bg-secondary hover:text-primary">
                        {entry.label}
                        <ChevronRight size={14} />
                      </span>
                      <div className="invisible absolute left-full top-0 z-50 w-48 -translate-x-1 rounded-lg border border-border bg-popover py-2 opacity-0 shadow-lg transition-all group-hover/sub:visible group-hover/sub:translate-x-0 group-hover/sub:opacity-100">
                        {entry.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.to}
                            className="block px-4 py-2 text-sm font-medium text-popover-foreground transition-colors hover:bg-secondary hover:text-primary"
                          >
                            {child.label}
                          </Link>
                        ))}

                      </div>
                    </div>
                  ) : (
                    <Link
                      key={entry.label}
                      to={entry.to}
                      className="block px-4 py-2 text-sm font-medium text-popover-foreground transition-colors hover:bg-secondary hover:text-primary"
                    >
                      {entry.label}
                    </Link>
                  ),
                )}
              </div>
            </div>

            <Link
              to="/tickets"
              activeProps={{ className: "border-gold text-primary" }}
              className="border-b-2 border-transparent px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-gold hover:text-primary"
            >
              Tickets &amp; Hospitality
            </Link>

            {primaryNav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="border-b-2 border-transparent px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-gold hover:text-primary"
              >
                {item.label}
              </a>
            ))}

            {/* More dropdown */}
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 border-b-2 border-transparent px-3 py-2 text-sm font-semibold text-foreground transition-colors group-hover:border-gold group-hover:text-primary"
                aria-haspopup="true"
              >
                More
                <ChevronDown
                  size={16}
                  className="transition-transform group-hover:rotate-180"
                />
              </button>
              <div className="invisible absolute right-0 top-full z-50 w-56 translate-y-1 rounded-lg border border-border bg-popover py-2 opacity-0 shadow-lg transition-all group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {moreNav.map((entry) =>
                  "children" in entry ? (
                    <div key={entry.label} className="group/sub relative">
                      <span className="flex cursor-default items-center justify-between px-4 py-2 text-sm font-medium text-popover-foreground transition-colors hover:bg-secondary hover:text-primary">
                        {entry.label}
                        <ChevronRight size={14} />
                      </span>
                      <div className="invisible absolute right-full top-0 z-50 w-52 translate-x-1 rounded-lg border border-border bg-popover py-2 opacity-0 shadow-lg transition-all group-hover/sub:visible group-hover/sub:translate-x-0 group-hover/sub:opacity-100">
                        {entry.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.to}
                            className="block px-4 py-2 text-sm font-medium text-popover-foreground transition-colors hover:bg-secondary hover:text-primary"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={entry.label}
                      to={entry.to}
                      className="block px-4 py-2 text-sm font-medium text-popover-foreground transition-colors hover:bg-secondary hover:text-primary"
                    >
                      {entry.label}
                    </Link>
                  ),
                )}
              </div>
            </div>

          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/tickets"
              className="hidden items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 md:inline-flex"
            >
              <Ticket size={16} />
              Buy Tickets
            </Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-md border border-border text-foreground lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav
            className="border-t border-border bg-card px-4 pb-4 pt-2 lg:hidden"
            aria-label="Mobile"
          >
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="block border-b border-border/60 py-3 text-sm font-semibold text-foreground"
            >
              Home
            </Link>

            {/* Teams accordion */}
            <button
              type="button"
              className="flex w-full items-center justify-between border-b border-border/60 py-3 text-sm font-semibold text-foreground"
              onClick={() => setMobileTeamsOpen((v) => !v)}
              aria-expanded={mobileTeamsOpen}
            >
              Teams
              <ChevronDown
                size={16}
                className={mobileTeamsOpen ? "rotate-180 transition-transform" : "transition-transform"}
              />
            </button>
            {mobileTeamsOpen && (
              <div className="py-1 pl-4">
                {teamsNav.map((entry) =>
                  "children" in entry ? (
                    <div key={entry.label} className="py-1">
                      <span className="block py-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        {entry.label}
                      </span>
                      <div className="pl-3">
                        {entry.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.to}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2 text-sm font-medium text-muted-foreground"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={entry.label}
                      to={entry.to}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-sm font-medium text-muted-foreground"
                    >
                      {entry.label}
                    </Link>
                  ),
                )}
              </div>
            )}

            <Link
              to="/tickets"
              onClick={() => setMobileOpen(false)}
              className="block border-b border-border/60 py-3 text-sm font-semibold text-foreground"
            >
              Tickets &amp; Hospitality
            </Link>

            {primaryNav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                onClick={() => setMobileOpen(false)}
                className="block border-b border-border/60 py-3 text-sm font-semibold text-foreground"
              >
                {item.label}
              </a>
            ))}

            <button
              type="button"
              className="flex w-full items-center justify-between border-b border-border/60 py-3 text-sm font-semibold text-foreground"
              onClick={() => setMobileMoreOpen((v) => !v)}
              aria-expanded={mobileMoreOpen}
            >
              More
              <ChevronDown
                size={16}
                className={mobileMoreOpen ? "rotate-180 transition-transform" : "transition-transform"}
              />
            </button>
            {mobileMoreOpen && (
              <div className="py-1 pl-4">
                {moreNav.map((entry) =>
                  "children" in entry ? (
                    <div key={entry.label} className="py-1">
                      <span className="block py-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        {entry.label}
                      </span>
                      <div className="pl-3">
                        {entry.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.to}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2 text-sm font-medium text-muted-foreground"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={entry.label}
                      to={entry.to}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-sm font-medium text-muted-foreground"
                    >
                      {entry.label}
                    </Link>
                  ),
                )}
              </div>
            )}

            <Link
              to="/tickets"
              onClick={() => setMobileOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Ticket size={16} />
              Buy Tickets
            </Link>

            <div className="mt-3 grid grid-cols-2 gap-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md border border-border py-3 text-center text-sm font-semibold text-foreground"
                  >
                    My Tickets
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      void signOut();
                    }}
                    className="rounded-md bg-navy-deep py-3 text-center text-sm font-semibold text-navy-foreground"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    search={{ mode: "login" }}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md border border-border py-3 text-center text-sm font-semibold text-foreground"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth"
                    search={{ mode: "register" }}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md bg-navy-deep py-3 text-center text-sm font-semibold text-navy-foreground"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
