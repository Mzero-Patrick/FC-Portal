import { Instagram, Twitter, Youtube, type LucideIcon } from "lucide-react";

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const socialLinks: SocialLink[] = [
  { label: "X (Twitter)", href: "https://x.com/rayon_sports", icon: Twitter },
  {
    label: "Instagram",
    href: "https://www.instagram.com/official_rayonsports/",
    icon: Instagram,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@RayonsportsPlustv",
    icon: Youtube,
  },
];
