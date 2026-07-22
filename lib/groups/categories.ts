export type GroupCategory =
  | "hospo"
  | "cleaning"
  | "construction"
  | "warehouse"
  | "aged-care"
  | "jobs-general"
  | "community";

export interface GroupCategoryOption {
  key: GroupCategory;
  label: string;
}

export const groupCategories: GroupCategoryOption[] = [
  { key: "hospo", label: "Hospitality" },
  { key: "cleaning", label: "Cleaning" },
  { key: "construction", label: "Construction" },
  { key: "warehouse", label: "Warehouse" },
  { key: "aged-care", label: "Aged Care" },
  { key: "jobs-general", label: "General Jobs" },
  { key: "community", label: "Community" },
];

export function getCategoryLabel(key: GroupCategory): string {
  return groupCategories.find((c) => c.key === key)?.label ?? key;
}
