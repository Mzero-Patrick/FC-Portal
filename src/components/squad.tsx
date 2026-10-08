import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { CLUB_LOGO_SRC } from "@/components/club-logo";
import { positionOrder, type Player, type Squad } from "@/lib/squad-data";

function PlayerPortrait({
  player,
  className = "",
}: {
  player: Player;
  className?: string;
}) {
  const initials = player.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className={`relative grid place-items-center overflow-hidden bg-gradient-to-b from-navy to-navy-deep text-navy-foreground ${className}`}
      aria-hidden="true"
    >
      <img
        src={CLUB_LOGO_SRC}
        alt=""
        className="absolute h-32 w-32 object-contain opacity-10"
      />
      <span className="relative font-display text-4xl font-bold tracking-wide">
        {initials}
      </span>
      <span className="absolute bottom-1 right-2 font-display text-5xl font-bold leading-none text-gold/25">
        {player.number}
      </span>
    </div>
  );
}

function PlayerCard({
  player,
  onSelect,
}: {
  player: Player;
  onSelect: (player: Player) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(player)}
      className="group overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
    >
      <PlayerPortrait
        player={player}
        className="aspect-[4/5] w-full transition-transform group-hover:scale-105"
      />
      <div className="border-t-2 border-gold p-3">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-xl font-bold text-primary">
            {player.number}
          </span>
          <span className="truncate text-sm font-semibold text-foreground">
            {player.name}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          <span>{player.position}</span>
          <span>{player.nationality}</span>
        </div>
      </div>
    </button>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg bg-secondary p-3 text-center">
      <div className="font-display text-2xl font-bold text-foreground">
        {value}
      </div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

export function PlayerModal({
  player,
  onClose,
}: {
  player: Player | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!player) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [player, onClose]);

  if (!player) return null;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-navy-deep/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${player.name} profile`}
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close player profile"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-navy-deep/60 text-navy-foreground transition-colors hover:bg-navy-deep"
        >
          <X size={18} />
        </button>

        <PlayerPortrait player={player} className="h-56 w-full" />

        <div className="p-5 sm:p-6">
          <span className="inline-block rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-foreground">
            {player.position}
          </span>
          <h3 className="mt-3 font-display text-3xl font-bold uppercase leading-none text-foreground">
            <span className="text-primary">{player.number}</span> {player.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {player.nationality} · {player.age} years old
          </p>
          <p className="mt-4 text-sm leading-relaxed text-foreground/80">
            {player.bio}
          </p>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <Stat label="Apps" value={player.appearances} />
            <Stat label="Goals" value={player.goals} />
            <Stat label="Assists" value={player.assists} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SquadCarousel({
  players,
  onSelect,
}: {
  players: Player[];
  onSelect: (player: Player) => void;
}) {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    railRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="bg-navy py-10 text-navy-foreground sm:py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
              Featured
            </span>
            <h2 className="font-display text-3xl font-bold uppercase leading-none sm:text-4xl">
              Key Players
            </h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="grid h-10 w-10 place-items-center rounded-full border border-navy-foreground/25 transition-colors hover:bg-navy-foreground/10"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="grid h-10 w-10 place-items-center rounded-full border border-navy-foreground/25 transition-colors hover:bg-navy-foreground/10"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        >
          {players.map((player) => (
            <button
              key={player.id}
              type="button"
              onClick={() => onSelect(player)}
              className="group w-[240px] shrink-0 snap-start overflow-hidden rounded-xl bg-navy-deep text-left ring-1 ring-navy-foreground/10 transition-transform hover:-translate-y-1"
            >
              <PlayerPortrait
                player={player}
                className="aspect-[4/5] w-full transition-transform group-hover:scale-105"
              />
              <div className="border-t-2 border-gold p-3">
                <div className="font-display text-xl font-bold uppercase leading-none">
                  {player.name}
                </div>
                <div className="mt-1 flex justify-between text-[11px] font-medium uppercase tracking-wide text-navy-foreground/60">
                  <span>{player.position}</span>
                  <span className="text-gold">#{player.number}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SquadSection({ squad }: { squad: Squad }) {
  const [selected, setSelected] = useState<Player | null>(null);
  const [filter, setFilter] = useState<"All" | Player["position"]>("All");

  const featured = squad.players.filter((p) => p.featured);
  const visible =
    filter === "All"
      ? squad.players
      : squad.players.filter((p) => p.position === filter);

  return (
    <>
      <section className="bg-navy-deep py-10 text-navy-foreground sm:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
            {squad.competition}
          </span>
          <h1 className="mt-2 font-display text-4xl font-bold uppercase leading-none sm:text-6xl">
            {squad.name}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-navy-foreground/70 sm:text-base">
            {squad.tagline}
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-navy-foreground/60">
            Head Coach · <span className="text-gold">{squad.coach}</span>
          </p>
        </div>
      </section>

      <SquadCarousel players={featured} onSelect={setSelected} />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-3xl font-bold uppercase leading-none text-foreground">
            Squad Roster
          </h2>
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {(["All", ...positionOrder] as const).map((pos) => (
              <button
                key={pos}
                type="button"
                onClick={() => setFilter(pos)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                  filter === pos
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-primary"
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {visible.map((player) => (
            <PlayerCard key={player.id} player={player} onSelect={setSelected} />
          ))}
        </div>
      </section>

      <PlayerModal player={selected} onClose={() => setSelected(null)} />
    </>
  );
}
