import type { Metadata } from "next";
import { GroupsPage } from "@/components/groups/GroupsPage";

export const metadata: Metadata = {
  title: "Groups | OZMate",
  description:
    "Vetted Sydney WhatsApp, Telegram, and Facebook groups for newcomers looking for hospo, cleaning, construction, warehouse, aged care, and general jobs.",
};

export default function Page() {
  return <GroupsPage />;
}
