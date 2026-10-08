export const CLUB_LOGO_SRC = "/assets/rayon-sports-logo.png";

export function ClubLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <img
      src={CLUB_LOGO_SRC}
      alt="Rayon Sports FC Logo"
      className={`shrink-0 object-contain ${className}`}
      loading="eager"
      decoding="async"
    />
  );
}
