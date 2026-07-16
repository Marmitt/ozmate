import type { Metadata } from "next";
import { ChecklistPage } from "@/components/checklist/ChecklistPage";

export const metadata: Metadata = {
  title: "First 30 Days Checklist | OZMate",
  description:
    "A checklist of the essential things to sort out in your first 30 days in Australia — documents, money, phone, transport, and health.",
};

export default function StartPage() {
  return <ChecklistPage />;
}
