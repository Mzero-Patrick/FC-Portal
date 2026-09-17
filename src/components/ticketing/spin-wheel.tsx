import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Gift, Loader2, PartyPopper } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { spinPrizes } from "@/lib/ticketing-data";
import { claimSpinPrize } from "@/lib/ticketing.functions";

const segmentAngle = 360 / spinPrizes.length;

export function SpinWheelModal({
  open,
  orderId,
  onOpenChange,
  onWon,
}: {
  open: boolean;
  orderId: string | null;
  onOpenChange: (open: boolean) => void;
  onWon?: () => void;
}) {
  const spin = useServerFn(claimSpinPrize);
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<{ prize: string; code: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSpin = async () => {
    if (!orderId || spinning || result) return;
    setError(null);
    setSpinning(true);
    const index = Math.floor(Math.random() * spinPrizes.length);
    const prize = spinPrizes[index]!;
    const target = 360 * 6 + (360 - index * segmentAngle - segmentAngle / 2);
    setAngle(target);

    window.setTimeout(async () => {
      try {
        const won = await spin({ data: { orderId, prize } });
        setResult(won);
        onWon?.();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not save your prize.");
      } finally {
        setSpinning(false);
      }
    }, 4200);
  };

  const gradient = spinPrizes
    .map((_, i) => {
      const color = i % 2 === 0 ? "var(--primary)" : "var(--gold)";
      return `${color} ${i * segmentAngle}deg ${(i + 1) * segmentAngle}deg`;
    })
    .join(", ");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-2xl uppercase">
            <Gift className="h-5 w-5 text-primary" /> Free stadium drink
          </DialogTitle>
          <DialogDescription>
            Your tickets are confirmed — spin once to win a free drink at Amahoro
            Stadium.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-5 py-2">
          <div className="relative">
            <div
              className="h-56 w-56 rounded-full border-4 border-navy-deep shadow-lg transition-transform duration-[4000ms] ease-out"
              style={{
                background: `conic-gradient(${gradient})`,
                transform: `rotate(${angle}deg)`,
              }}
              aria-hidden="true"
            />
            <div className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-navy-deep bg-card text-center text-[10px] font-bold uppercase leading-tight text-foreground">
              Rayon
              <br />
              Drinks
            </div>
            <div className="absolute -top-2 left-1/2 h-0 w-0 -translate-x-1/2 border-x-8 border-t-[18px] border-x-transparent border-t-navy-deep" />
          </div>

          {result ? (
            <div className="w-full rounded-lg border border-border bg-secondary p-4 text-center">
              <PartyPopper className="mx-auto h-6 w-6 text-primary" />
              <p className="mt-2 font-display text-xl font-bold uppercase text-foreground">
                {result.prize}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Voucher code <span className="font-bold text-foreground">{result.code}</span>
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Saved to My Tickets &amp; Rewards in your dashboard.
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSpin}
              disabled={spinning || !orderId}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {spinning && <Loader2 className="h-4 w-4 animate-spin" />}
              {spinning ? "Spinning…" : "Spin the wheel"}
            </button>
          )}

          {error && <p className="text-sm text-loss">{error}</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
