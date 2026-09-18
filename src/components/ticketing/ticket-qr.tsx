import { useEffect, useState } from "react";
import QRCode from "qrcode";

export function TicketQr({ value, size = 104 }: { value: string; size?: number }) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(value, { margin: 1, width: size * 2 })
      .then((url) => {
        if (active) setSrc(url);
      })
      .catch(() => setSrc(null));
    return () => {
      active = false;
    };
  }, [value, size]);

  return (
    <div
      className="grid shrink-0 place-items-center rounded-md border border-border bg-card p-1"
      style={{ width: size, height: size }}
    >
      {src ? (
        <img src={src} alt={`Entry QR code ${value}`} className="h-full w-full" />
      ) : (
        <span className="text-[10px] text-muted-foreground">QR</span>
      )}
    </div>
  );
}
