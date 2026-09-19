import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — Rayon Sports FC" },
      {
        name: "description",
        content:
          "Choose a new password for your Rayon Sports FC supporter account.",
      },
      { property: "og:title", content: "Reset Password — Rayon Sports FC" },
      {
        property: "og:description",
        content: "Set a new password for your Rayon Sports supporter account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    navigate({ to: "/dashboard", replace: true });
  };

  return (
    <div className="grid min-h-screen place-items-center bg-background px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-sm"
      >
        <h1 className="font-display text-2xl font-bold uppercase text-foreground">
          Set a new password
        </h1>
        <div className="mt-5 space-y-3">
          <div className="relative">
            <Lock
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              autoComplete="new-password"
              className="w-full rounded-md border border-input bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
            />
          </div>
          <div className="relative">
            <Lock
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm new password"
              autoComplete="new-password"
              className="w-full rounded-md border border-input bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
            />
          </div>
        </div>
        {message && (
          <p className="mt-3 rounded-md bg-secondary px-3 py-2 text-sm text-foreground">
            {message}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          Update password
        </button>
        <Link
          to="/auth"
          search={{ mode: "login" }}
          className="mt-4 block text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
        >
          Back to sign in
        </Link>
      </form>
    </div>
  );
}
