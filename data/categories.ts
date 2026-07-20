export type CategoryKey =
  | "arrival"
  | "visas"
  | "jobs"
  | "shopping"
  | "transport"
  | "housing"
  | "daily-life";

export interface Category {
  key: CategoryKey;
  name: string;
  description: string;
  order: number;
}

export const categories: Category[] = [
  {
    key: "arrival",
    name: "Arrival essentials",
    description: "The first things to sort out when you land.",
    order: 1,
  },
  {
    key: "visas",
    name: "Visas & work rights",
    description: "Plain-English visa info — never advice.",
    order: 2,
  },
  {
    key: "jobs",
    name: "Jobs & income",
    description: "Finding work and understanding pay in Australia.",
    order: 3,
  },
  {
    key: "shopping",
    name: "Shopping & saving",
    description: "Where to shop cheap and stretch your budget.",
    order: 4,
  },
  {
    key: "transport",
    name: "Transport",
    description: "Getting around — public transport, cars, and cards.",
    order: 5,
  },
  {
    key: "housing",
    name: "Housing",
    description: "Finding a place to live, short and long term.",
    order: 6,
  },
  {
    key: "daily-life",
    name: "Daily life & culture",
    description: "Everyday essentials and settling into Aussie life.",
    order: 7,
  },
];

export const CATEGORY_KEYS: CategoryKey[] = categories.map((c) => c.key);

export function getCategory(key: string): Category | undefined {
  return categories.find((c) => c.key === key);
}

export function isCategoryKey(value: string): value is CategoryKey {
  return CATEGORY_KEYS.includes(value as CategoryKey);
}
