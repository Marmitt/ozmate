import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "OZMate — Survival Guide for Newcomers to Australia",
  description:
    "A practical survival guide for newcomers to Australia: your first 30 days, cheap living tips, and vetted job groups.",
};

export default function Page() {
  return <HomePage />;
}
