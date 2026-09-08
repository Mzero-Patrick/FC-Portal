import { useState } from "react";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, Mail, Shield, User } from "lucide-react";

type AuthSearch = { mode?: "login" | "register" };

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): AuthSearch => ({
    mode: search["mode"] === "register" ? "register" : "login",
  }),
  head: () => ({
    meta: [
      { title: "Sign In or Register — Rayon Sports FC" },
      {
        name: "description",
        content:
          "Access your Rayon Sports FC supporter account to manage tickets, membership and club updates, or create a new account.",
      },
      { property: "og:title", content: "Sign In or Register — Rayon Sports FC" },
      {
        property: "og:description",
        content:
          "Sign in to your Rayon Sports supporter account or register to join the Gikundiro family.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function Field({
  id,
  label,
  type,
  placeholder,
  icon: Icon,
  value,
  onChange,
  autoComplete,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  icon: typeof Mail;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground"
      >
        {label}
      </label>
      <div className="relative">
        <Icon
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          id={id}
          name={id}
          type={isPassword && show ? "text" : type}
          required
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-input bg-background py-2.5 pl-9 pr-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}

function AuthPage() {
  const search = useSearch({ from: "/auth" });
  const [mode, setMode] = useState<"login" | "register">(search.mode ?? "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "register") {
      if (password !== confirm) {
        setMessage("Passwords do not match.");
        return;
      }
      if (!agree) {
        setMessage("Please accept the terms to continue.");
        return;
      }
      setMessage("Account details captured. Accounts go live once the club portal is connected.");
      return;
    }
    setMessage("Sign-in captured. Accounts go live once the club portal is connected.");
  };

  return (
    <div className="grid min-h-screen bg-navy-deep lg:grid-cols-2">
      {/* Brand panel */}
      <div className="hidden flex-col justify-between bg-navy p-12 text-navy-foreground lg:flex">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">
            <Shield className="h-6 w-6" fill="currentColor" strokeWidth={1} />
          </span>
          <span className="font-display text-2xl font-bold uppercase tracking-wide">
            Rayon Sports FC
          </span>
        </Link>
        <div>
          <h2 className="font-display text-5xl font-bold uppercase leading-none">
            One club.
            <br />
            One account.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-foreground/70">
            Manage tickets, membership and supporter club details from a single
            Gikundiro account.
          </p>
        </div>
        <p className="text-xs text-navy-foreground/50">
          &copy; {new Date().getFullYear()} Rayon Sports FC
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-background px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
              <Shield className="h-5 w-5" fill="currentColor" strokeWidth={1} />
            </span>
            <span className="font-display text-xl font-bold uppercase text-foreground">
              Rayon Sports FC
            </span>
          </Link>

          <div className="grid grid-cols-2 rounded-lg bg-secondary p-1">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setMessage(null);
                }}
                className={`rounded-md py-2 text-sm font-semibold transition-colors ${
                  mode === m
                    ? "bg-card text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          <h1 className="mt-8 font-display text-3xl font-bold uppercase text-foreground">
            {mode === "login" ? "Sign in to your account" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "login"
              ? "Welcome back to the Gikundiro family."
              : "Join thousands of Rayon Sports supporters."}
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "register" && (
              <Field
                id="fullName"
                label="Full name"
                type="text"
                placeholder="Your full name"
                icon={User}
                value={name}
                onChange={setName}
                autoComplete="name"
              />
            )}
            <Field
              id="email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              value={email}
              onChange={setEmail}
              autoComplete="email"
            />
            <Field
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              value={password}
              onChange={setPassword}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
            {mode === "register" && (
              <Field
                id="confirmPassword"
                label="Confirm password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                value={confirm}
                onChange={setConfirm}
                autoComplete="new-password"
              />
            )}

            {mode === "login" ? (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-input accent-[var(--primary)]"
                  />
                  Remember me
                </label>
                <a href="#" className="font-semibold text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
            ) : (
              <label className="flex items-start gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-input accent-[var(--primary)]"
                />
                I agree to the club terms of use and privacy policy.
              </label>
            )}

            {message && (
              <p className="rounded-md bg-secondary px-3 py-2 text-sm text-foreground">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-md bg-primary py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "login" ? "New to Rayon Sports?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setMessage(null);
              }}
              className="font-semibold text-primary hover:underline"
            >
              {mode === "login" ? "Register now" : "Sign in"}
            </button>
          </p>

          <Link
            to="/"
            className="mt-6 block text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
