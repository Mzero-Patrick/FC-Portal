import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
  Smartphone,
  Ticket as TicketIcon,
  Trash2,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import {
  formatRwf,
  rowLabel,
  seatLabel,
  sectors,
  toneClass,
  ticketMatches,
  type CartSeat,
  type MatchOption,
  type Sector,
} from "@/lib/ticketing-data";
import { getTakenSeats, purchaseTickets } from "@/lib/ticketing.functions";
import { SpinWheelModal } from "@/components/ticketing/spin-wheel";

const paymentMethods = [
  { id: "mtn-momo", label: "MTN Mobile Money", icon: Smartphone },
  { id: "airtel-money", label: "Airtel Money", icon: Smartphone },
  { id: "card", label: "Visa / Mastercard", icon: CreditCard },
];

export function BookingFlow() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated, user, loading } = useAuth();

  const [match, setMatch] = useState<MatchOption>(ticketMatches[0]!);
  const [termsOpen, setTermsOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [agree, setAgree] = useState(false);
  const [activeSector, setActiveSector] = useState<Sector | null>(null);
  const [pendingSeat, setPendingSeat] = useState<{ sector: Sector; seat: string } | null>(
    null,
  );
  const [holderName, setHolderName] = useState("");
  const [holderEmail, setHolderEmail] = useState("");
  const [cart, setCart] = useState<CartSeat[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [payment, setPayment] = useState(paymentMethods[0]!.id);
  const [phone, setPhone] = useState("");
  const [spinOrderId, setSpinOrderId] = useState<string | null>(null);
  const [spinOpen, setSpinOpen] = useState(false);
  const [confirmation, setConfirmation] = useState<{ count: number; total: number } | null>(
    null,
  );

  const fetchTaken = useServerFn(getTakenSeats);
  const { data: takenSeats = [] } = useQuery({
    queryKey: ["taken-seats", match.id],
    queryFn: () => fetchTaken({ data: { matchId: match.id } }),
    enabled: isAuthenticated,
  });

  const buy = useServerFn(purchaseTickets);
  const purchase = useMutation({
    mutationFn: () =>
      buy({
        data: {
          matchId: match.id,
          matchLabel: match.label,
          matchDate: `${match.date} · ${match.kickoff}`,
          venue: match.venue,
          paymentMethod: paymentMethods.find((p) => p.id === payment)!.label,
          seats: cart.map((s) => ({
            sectorId: s.sectorId,
            sectorName: s.sectorName,
            seatLabel: s.seatLabel,
            priceRwf: s.priceRwf,
            holderName: s.holderName,
            holderEmail: s.holderEmail,
          })),
        },
      }),
    onSuccess: (result) => {
      setConfirmation({ count: result.seatCount, total: result.totalRwf });
      setSpinOrderId(result.orderId);
      setCart([]);
      setCheckoutOpen(false);
      setCartOpen(false);
      setSpinOpen(true);
      queryClient.invalidateQueries({ queryKey: ["taken-seats", match.id] });
      queryClient.invalidateQueries({ queryKey: ["my-tickets"] });
    },
  });

  const total = useMemo(
    () => cart.reduce((sum, s) => sum + s.priceRwf, 0),
    [cart],
  );

  const requireLogin = () => {
    navigate({ to: "/auth", search: { mode: "login", redirect: "/tickets" } });
  };

  const startBooking = () => {
    if (!isAuthenticated) {
      requireLogin();
      return;
    }
    if (termsAccepted) {
      document.getElementById("stadium-map")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setTermsOpen(true);
  };

  const openSector = (sector: Sector) => {
    if (!isAuthenticated) {
      requireLogin();
      return;
    }
    if (!termsAccepted) {
      setTermsOpen(true);
      return;
    }
    setActiveSector(sector);
  };

  const toggleSeat = (sector: Sector, seat: string) => {
    const existing = cart.find(
      (s) => s.sectorId === sector.id && s.seatLabel === seat,
    );
    if (existing) {
      setCart((c) => c.filter((s) => !(s.sectorId === sector.id && s.seatLabel === seat)));
      return;
    }
    setHolderName(user?.user_metadata?.["full_name"] ?? "");
    setHolderEmail(user?.email ?? "");
    setPendingSeat({ sector, seat });
  };

  const confirmHolder = () => {
    if (!pendingSeat || !holderName.trim() || !holderEmail.trim()) return;
    setCart((c) => [
      ...c,
      {
        sectorId: pendingSeat.sector.id,
        sectorName: pendingSeat.sector.name,
        seatLabel: pendingSeat.seat,
        priceRwf: pendingSeat.sector.priceRwf,
        holderName: holderName.trim(),
        holderEmail: holderEmail.trim(),
      },
    ]);
    setPendingSeat(null);
    setCartOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Match picker + CTA */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-[240px] flex-1">
            <label
              htmlFor="match"
              className="mb-1.5 block text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground"
            >
              Choose a match
            </label>
            <select
              id="match"
              value={match.id}
              onChange={(e) => {
                const next = ticketMatches.find((m) => m.id === e.target.value);
                if (next) {
                  setMatch(next);
                  setCart([]);
                  setActiveSector(null);
                }
              }}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
            >
              {ticketMatches.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label} — {m.date}, {m.kickoff}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-muted-foreground">
              {match.competition} · {match.venue}
            </p>
          </div>

          <button
            type="button"
            onClick={startBooking}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <TicketIcon size={16} />
            Buy Tickets
          </button>
        </div>

        {!loading && !isAuthenticated && (
          <p className="mt-4 flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-xs text-muted-foreground">
            <Lock size={13} /> You need a supporter account to buy tickets — we&apos;ll
            take you to sign in.
          </p>
        )}
      </div>

      {/* Stadium map */}
      <div id="stadium-map" className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h3 className="font-display text-2xl font-bold uppercase text-foreground">
          Stadium map
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick a section to open the seat map.
        </p>

        {/* Legend */}
        <ul className="mt-4 flex flex-wrap gap-3 text-xs">
          {(
            [
              ["lower", "Lower Bowl — RWF 3,000"],
              ["upper", "Upper Bowl — RWF 2,000"],
              ["vip", "VIP — RWF 20,000"],
              ["cip", "CIP — RWF 45,000"],
              ["exec", "Executive — RWF 100,000"],
            ] as const
          ).map(([tone, label]) => (
            <li key={tone} className="flex items-center gap-2 text-muted-foreground">
              <span className={`h-3 w-3 rounded-sm ${toneClass[tone].split(" ")[0]}`} />
              {label}
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-2">
          <SectorButton id="ub-west" onOpen={openSector} full />
          <SectorButton id="vip-west" onOpen={openSector} full />
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] gap-2">
            <SectorButton id="lb-north" onOpen={openSector} vertical />
            <div className="grid place-items-center rounded-lg border-2 border-dashed border-border bg-win/10 py-10 text-center">
              <span className="font-display text-xl font-bold uppercase tracking-widest text-muted-foreground">
                Pitch
              </span>
            </div>
            <SectorButton id="lb-south" onOpen={openSector} vertical />
          </div>
          <SectorButton id="cip-central" onOpen={openSector} full />
          <SectorButton id="ub-east" onOpen={openSector} full />
          <SectorButton id="exec-boxes" onOpen={openSector} full />
        </div>
      </div>

      {/* Floating cart button */}
      {cart.length > 0 && (
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="fixed bottom-24 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-navy-deep px-5 py-3 text-sm font-bold text-navy-foreground shadow-lg"
        >
          <TicketIcon size={16} />
          {cart.length} seat{cart.length > 1 ? "s" : ""} · {formatRwf(total)}
        </button>
      )}

      {/* Terms modal */}
      <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl uppercase">
              Terms &amp; Conditions
            </DialogTitle>
            <DialogDescription>
              Please confirm before selecting your seats.
            </DialogDescription>
          </DialogHeader>
          <ul className="max-h-56 space-y-2 overflow-y-auto text-sm text-muted-foreground">
            <li>• Tickets are non-refundable once the match has kicked off.</li>
            <li>• Every seat must carry the full name and email of its holder.</li>
            <li>• Entry requires a valid ticket QR code and matching ID.</li>
            <li>• Resale above face value is prohibited by the club.</li>
            <li>• Gates open two hours before kick-off at {match.venue}.</li>
            <li>• The club may relocate seats for safety or broadcast reasons.</li>
          </ul>
          <label className="flex items-start gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-input accent-[var(--primary)]"
            />
            I have read and accept the matchday terms and conditions.
          </label>
          <DialogFooter>
            <button
              type="button"
              onClick={() => setTermsOpen(false)}
              className="rounded-md border border-border px-4 py-2.5 text-sm font-semibold text-foreground"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!agree}
              onClick={() => {
                setTermsAccepted(true);
                setTermsOpen(false);
                document
                  .getElementById("stadium-map")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-md bg-primary px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-primary-foreground disabled:opacity-50"
            >
              Continue to seats
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Seat matrix */}
      <Dialog
        open={!!activeSector}
        onOpenChange={(open) => !open && setActiveSector(null)}
      >
        <DialogContent className="max-w-2xl">
          {activeSector && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl uppercase">
                  {activeSector.name}
                </DialogTitle>
                <DialogDescription>
                  {formatRwf(activeSector.priceRwf)} per seat · tap a seat to add a
                  holder.
                </DialogDescription>
              </DialogHeader>

              <div className="rounded-md bg-secondary py-1.5 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                Pitch this way
              </div>

              <div className="mt-3 overflow-x-auto">
                <div className="inline-block space-y-1.5">
                  {Array.from({ length: activeSector.rows }).map((_, row) => (
                    <div key={row} className="flex items-center gap-1.5">
                      <span className="w-5 text-xs font-bold text-muted-foreground">
                        {rowLabel(row)}
                      </span>
                      {Array.from({ length: activeSector.seatsPerRow }).map((__, seat) => {
                        const label = seatLabel(row, seat);
                        const key = `${activeSector.id}:${label}`;
                        const taken = takenSeats.includes(key);
                        const selected = cart.some(
                          (s) => s.sectorId === activeSector.id && s.seatLabel === label,
                        );
                        return (
                          <button
                            key={label}
                            type="button"
                            disabled={taken}
                            onClick={() => toggleSeat(activeSector, label)}
                            aria-label={`Seat ${label}${taken ? " (sold)" : ""}`}
                            className={`h-7 w-7 rounded text-[10px] font-bold transition-colors ${
                              taken
                                ? "cursor-not-allowed bg-muted text-muted-foreground/50"
                                : selected
                                  ? "bg-win text-navy-foreground"
                                  : `${toneClass[activeSector.tone]} hover:opacity-80`
                            }`}
                          >
                            {seat + 1}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-sm bg-win" /> Selected
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-sm bg-muted" /> Sold
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveSector(null);
                    if (cart.length) setCartOpen(true);
                  }}
                  className="rounded-md bg-primary px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-primary-foreground"
                >
                  Done
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Holder modal */}
      <Dialog open={!!pendingSeat} onOpenChange={(open) => !open && setPendingSeat(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl uppercase">
              Ticket holder
            </DialogTitle>
            <DialogDescription>
              {pendingSeat
                ? `${pendingSeat.sector.name} · seat ${pendingSeat.seat} · ${formatRwf(pendingSeat.sector.priceRwf)}`
                : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label
                htmlFor="holderName"
                className="mb-1.5 block text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground"
              >
                Full name
              </label>
              <input
                id="holderName"
                value={holderName}
                onChange={(e) => setHolderName(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <div>
              <label
                htmlFor="holderEmail"
                className="mb-1.5 block text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground"
              >
                Email address
              </label>
              <input
                id="holderEmail"
                type="email"
                value={holderEmail}
                onChange={(e) => setHolderEmail(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
            </div>
          </div>
          <DialogFooter>
            <button
              type="button"
              onClick={() => setPendingSeat(null)}
              className="rounded-md border border-border px-4 py-2.5 text-sm font-semibold text-foreground"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmHolder}
              disabled={!holderName.trim() || !holderEmail.trim()}
              className="rounded-md bg-primary px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-primary-foreground disabled:opacity-50"
            >
              Add to cart
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cart drawer */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="flex w-full flex-col sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="font-display text-2xl uppercase">
              Your basket
            </SheetTitle>
            <SheetDescription>
              {match.label} · {match.date}, {match.kickoff}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-3 overflow-y-auto px-4">
            {cart.length === 0 && (
              <p className="py-10 text-center text-sm text-muted-foreground">
                No seats selected yet.
              </p>
            )}
            {cart.map((seat) => (
              <div
                key={`${seat.sectorId}-${seat.seatLabel}`}
                className="flex items-start justify-between gap-3 rounded-lg border border-border p-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {seat.sectorName} · {seat.seatLabel}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {seat.holderName} · {seat.holderEmail}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-sm font-bold text-foreground">
                    {formatRwf(seat.priceRwf)}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove seat ${seat.seatLabel}`}
                    onClick={() =>
                      setCart((c) =>
                        c.filter(
                          (s) =>
                            !(
                              s.sectorId === seat.sectorId &&
                              s.seatLabel === seat.seatLabel
                            ),
                        ),
                      )
                    }
                    className="text-muted-foreground hover:text-loss"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 border-t border-border p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Total
              </span>
              <span className="font-display text-2xl font-bold text-foreground">
                {formatRwf(total)}
              </span>
            </div>
            <button
              type="button"
              disabled={cart.length === 0}
              onClick={() => setCheckoutOpen(true)}
              className="w-full rounded-md bg-primary py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground disabled:opacity-50"
            >
              Checkout
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Checkout modal */}
      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl uppercase">
              Payment
            </DialogTitle>
            <DialogDescription>
              {cart.length} seat{cart.length === 1 ? "" : "s"} · {formatRwf(total)}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            {paymentMethods.map(({ id, label, icon: Icon }) => (
              <label
                key={id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm ${
                  payment === id ? "border-primary bg-secondary" : "border-border"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={id}
                  checked={payment === id}
                  onChange={() => setPayment(id)}
                  className="h-4 w-4 accent-[var(--primary)]"
                />
                <Icon size={16} className="text-primary" />
                <span className="font-semibold text-foreground">{label}</span>
              </label>
            ))}
          </div>

          <div>
            <label
              htmlFor="payref"
              className="mb-1.5 block text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground"
            >
              {payment === "card" ? "Card number" : "Mobile money number"}
            </label>
            <input
              id="payref"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={payment === "card" ? "4242 4242 4242 4242" : "+250 7xx xxx xxx"}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Demo checkout — no money is taken and no card details are stored.
            </p>
          </div>

          {purchase.isError && (
            <p className="text-sm text-loss">
              {purchase.error instanceof Error
                ? purchase.error.message
                : "Payment could not be completed."}
            </p>
          )}

          <DialogFooter>
            <button
              type="button"
              onClick={() => setCheckoutOpen(false)}
              className="rounded-md border border-border px-4 py-2.5 text-sm font-semibold text-foreground"
            >
              Back
            </button>
            <button
              type="button"
              disabled={purchase.isPending || !phone.trim()}
              onClick={() => purchase.mutate()}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-primary-foreground disabled:opacity-50"
            >
              {purchase.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Pay {formatRwf(total)}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Spin wheel unlocked by a successful purchase */}
      <SpinWheelModal
        open={spinOpen}
        orderId={spinOrderId}
        onOpenChange={(open) => {
          setSpinOpen(open);
          if (!open) queryClient.invalidateQueries({ queryKey: ["my-tickets"] });
        }}
      />

      {confirmation && !spinOpen && (
        <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-win" />
          <div className="text-sm">
            <p className="font-semibold text-foreground">
              {confirmation.count} ticket{confirmation.count === 1 ? "" : "s"} confirmed —{" "}
              {formatRwf(confirmation.total)}
            </p>
            <p className="text-muted-foreground">
              Your QR codes are waiting in My Tickets.
            </p>
          </div>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setConfirmation(null)}
            className="ml-auto text-muted-foreground hover:text-foreground"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

function SectorButton({
  id,
  onOpen,
  full,
  vertical,
}: {
  id: string;
  onOpen: (sector: Sector) => void;
  full?: boolean;
  vertical?: boolean;
}) {
  const sector = sectors.find((s) => s.id === id)!;
  return (
    <button
      type="button"
      onClick={() => onOpen(sector)}
      className={`${toneClass[sector.tone]} ${full ? "w-full py-4" : ""} ${
        vertical ? "flex h-full flex-col items-center justify-center py-6" : ""
      } rounded-lg px-3 text-center text-xs font-bold uppercase tracking-wide transition-opacity hover:opacity-85`}
    >
      {sector.name}
      <span className="mt-1 block text-[10px] font-semibold opacity-80">
        {formatRwf(sector.priceRwf)}
      </span>
    </button>
  );
}
