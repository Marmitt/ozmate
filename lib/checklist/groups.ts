export interface ChecklistGroupMeta {
  key: string;
  label: string;
}

export const GROUP_ORDER: ChecklistGroupMeta[] = [
  { key: "documents", label: "Documents" },
  { key: "money", label: "Money" },
  { key: "phone", label: "Phone" },
  { key: "transport", label: "Transport" },
  { key: "health", label: "Health" },
];
