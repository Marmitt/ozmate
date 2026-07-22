import type { GroupCategory } from "@/lib/groups/categories";

export type GroupPlatform = "whatsapp" | "telegram" | "facebook";

export interface Group {
  id: string;
  name: string;
  platform: GroupPlatform;
  category: GroupCategory;
  city: string;
  link: string;
  description: string;
  verified: boolean;
  lastVerified: string;
}

export const groups: Group[] = [
  {
    id: "sydney-hospo-casual-jobs",
    name: "Sydney Hospo Casual Jobs",
    platform: "whatsapp",
    category: "hospo",
    city: "Sydney",
    link: "https://chat.whatsapp.com/example-hospo-sydney",
    description:
      "Casual shifts and trial-day tips for cafes, restaurants, and bars around Sydney.",
    verified: false,
    lastVerified: "2026-07-10",
  },
  {
    id: "sydney-cleaning-crew-gigs",
    name: "Sydney Cleaning Crew Gigs",
    platform: "telegram",
    category: "cleaning",
    city: "Sydney",
    link: "https://t.me/example-cleaning-sydney",
    description:
      "Residential and commercial cleaning gigs, mostly cash-in-hand and short notice.",
    verified: false,
    lastVerified: "2026-07-08",
  },
  {
    id: "sydney-construction-labourers",
    name: "Sydney Construction Labourers",
    platform: "whatsapp",
    category: "construction",
    city: "Sydney",
    link: "https://chat.whatsapp.com/example-construction-sydney",
    description:
      "Labouring and White Card work across Sydney building sites — daily call-outs posted here.",
    verified: false,
    lastVerified: "2026-07-05",
  },
  {
    id: "sydney-warehouse-pickers-packers",
    name: "Sydney Warehouse Pickers & Packers",
    platform: "facebook",
    category: "warehouse",
    city: "Sydney",
    link: "https://facebook.com/groups/example-warehouse-sydney",
    description:
      "Pick/pack and forklift shifts at Western Sydney distribution centres, posted by local agencies.",
    verified: false,
    lastVerified: "2026-06-30",
  },
  {
    id: "sydney-aged-care-support-workers",
    name: "Sydney Aged Care Support Workers",
    platform: "telegram",
    category: "aged-care",
    city: "Sydney",
    link: "https://t.me/example-agedcare-sydney",
    description:
      "Support worker and personal care shifts, plus tips on Certificate III pathways for newcomers.",
    verified: false,
    lastVerified: "2026-07-01",
  },
  {
    id: "sydney-general-jobs-board",
    name: "Sydney General Jobs Board",
    platform: "whatsapp",
    category: "jobs-general",
    city: "Sydney",
    link: "https://chat.whatsapp.com/example-generaljobs-sydney",
    description:
      "A catch-all board for one-off gigs and general job leads that don't fit a single trade.",
    verified: false,
    lastVerified: "2026-07-12",
  },
  {
    id: "sydney-newcomers-community",
    name: "Sydney Newcomers Community",
    platform: "facebook",
    category: "community",
    city: "Sydney",
    link: "https://facebook.com/groups/example-newcomers-sydney",
    description:
      "General settling-in support, flatmate/room leads, and everyday questions from other recent arrivals.",
    verified: false,
    lastVerified: "2026-06-25",
  },
];
