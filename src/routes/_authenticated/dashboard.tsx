import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  CalendarDays,
  Gift,
  Loader2,
  LogOut,
  MapPin,
  Ticket as TicketIcon,
} from "lucide-react";
import { PageShell, PageHero } from "@/components/page-shell";
import { TicketQr } from "@/components/ticketing/ticket-qr";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { formatRwf } from "@/lib/ticketing-data";
import { getMyTickets } from "@/lib/ticketing.functions";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "My Account | Rayon Sports FC" },
      {
        name: "description",
        content:
          "Your Rayon Sports FC supporter dashboard — active and past matchday tickets with entry QR codes, plus your stadium drink vouchers.",
      },
      { property: "og:title", content: "My Account | Rayon Sports FC" },
      {
        property: "og:description",
        content: "Manage your Rayon Sports tickets, QR codes and rewards.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

type Tab = "tickets" | "rewards";

function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<Tab>("tickets");

  const fetchMine = useServerFn(getMyTickets);
  const { data, isPending, isError } = useQuery({
    queryKey: ["my-tickets"],
    queryFn: () => fetchMine(),
  });

  const active = (data?.tickets ?? []).filter((t) => t.status === "active");
  const past = (data?.tickets ?? []).filter((t) => t.status !== "active");
  const rewards = data?.rewards ?? [];

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Supporter account"
        title="My Account"
        intro={user?.email ? `Signed in as ${user.email}` : undefined}
      />

      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1 rounded-lg bg-secondary p-1" role="tablist">
            {(
              [
                ["tickets", "My Tickets"],
                ["rewards", "Rewards"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`rounded-md px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors ${
                  tab === id
                    ? "bg-card text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary"
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>

        {isPending && (
          <div className="mt-8 flex items-center justify-center gap-3 rounded-xl border border-border bg-card py-16 text-sm text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin text-primary" /> Loading your
            tickets…
          </div>
        )}

        {isError && (
          <p className="mt-8 rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
            We couldn&apos;t load your tickets right now. Please refresh the page.
          </p>
        )}

        {data && tab === "tickets" && (
          <div className="mt-8 space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold uppercase text-foreground">
                Active &amp; reserved tickets
              </h2>
              {active.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {active.map((t) => (
                    <TicketCard key={t.id} ticket={t} />
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold uppercase text-foreground">
                Past tickets
              </h2>
              {past.length === 0 ? (
                <p className="mt-3 rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
                  No past matchday tickets yet.
                </p>
              ) : (
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {past.map((t) => (
                    <TicketCard key={t.id} ticket={t} past />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {data && tab === "rewards" && (
          <div className="mt-8">
            <h2 className="font-display text-2xl font-bold uppercase text-foreground">
              Stadium drink vouchers
            </h2>
            {rewards.length === 0 ? (
              <p className="mt-3 rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
                No vouchers yet — buy a ticket and spin the wheel to win a free
                stadium drink.
              </p>
            ) : (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {rewards.map((r) => (
                  <article
                    key={r.id}
                    className="rounded-xl border border-border bg-card p-5 shadow-sm"
                  >
                    <Gift className="h-5 w-5 text-gold" />
                    <h3 className="mt-2 font-display text-xl font-bold uppercase text-foreground">
                      {r.prize}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Code <span className="font-bold text-foreground">{r.code}</span>
                    </p>
                    <span className="mt-3 inline-block rounded-full bg-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                      {r.status}
                    </span>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </PageShell>
  );
}

function EmptyState() {
  return (
    <div className="mt-3 rounded-xl border border-border bg-card p-6 text-center">
      <TicketIcon className="mx-auto h-6 w-6 text-primary" />
      <p className="mt-2 text-sm text-muted-foreground">
        You have no active tickets.
      </p>
      <Link
        to="/tickets"
        className="mt-4 inline-block rounded-md bg-primary px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-primary-foreground"
      >
        Buy tickets
      </Link>
    </div>
  );
}

type TicketRow = {
  id: string;
  match_label: string;
  match_date: string;
  venue: string;
  sector_name: string;
  seat_label: string;
  price_rwf: number;
  holder_name: string;
  reference: string;
};

function TicketCard({ ticket, past }: { ticket: TicketRow; past?: boolean }) {
  return (
    <article
      className={`flex gap-4 rounded-xl border border-border bg-card p-4 shadow-sm ${
        past ? "opacity-70" : ""
      }`}
    >
      <TicketQr value={ticket.reference} />
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-display text-lg font-bold uppercase text-foreground">
          {ticket.match_label}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays size={13} /> {ticket.match_date}
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin size={13} /> {ticket.venue}
        </p>
        <p className="mt-2 text-sm font-semibold text-foreground">
          {ticket.sector_name} · Seat {ticket.seat_label}
        </p>
        <p className="text-xs text-muted-foreground">
          {ticket.holder_name} · {formatRwf(ticket.price_rwf)}
        </p>
        <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-primary">
          {ticket.reference}
        </p>
      </div>
    </article>
  );
}
