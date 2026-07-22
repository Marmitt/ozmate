"use client";

import { useState } from "react";
import Link from "next/link";
import { groups } from "@/data/groups";
import { groupCategories } from "@/lib/groups/categories";
import { GroupCard } from "@/components/groups/GroupCard";
import {
  CategoryFilter,
  type CategoryFilterValue,
} from "@/components/groups/CategoryFilter";

export function GroupsPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilterValue>("all");

  const visibleCategories =
    selectedCategory === "all"
      ? groupCategories
      : groupCategories.filter((category) => category.key === selectedCategory);

  const hasVisibleGroups = visibleCategories.some(
    (category) => groups.filter((g) => g.category === category.key).length > 0
  );

  return (
    <main className="mx-auto max-w-md px-4 py-8">
      <Link href="/" className="text-sm text-ink-muted underline">
        Home
      </Link>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink">
        Job & Community Groups
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        Sydney WhatsApp, Telegram, and Facebook groups for newcomers, by
        category.
      </p>

      {groups.length === 0 ? (
        <p className="mt-8 text-sm text-ink-muted">
          No groups available yet — check back soon.
        </p>
      ) : (
        <>
          <div className="mt-6">
            <CategoryFilter
              value={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>

          {!hasVisibleGroups ? (
            <p className="mt-8 text-sm text-ink-muted">
              No groups in this category yet — try another category.
            </p>
          ) : (
            <div className="mt-6 flex flex-col gap-6">
              {visibleCategories.map((category) => {
                const categoryGroups = groups.filter(
                  (group) => group.category === category.key
                );

                if (categoryGroups.length === 0) {
                  return null;
                }

                return (
                  <section key={category.key}>
                    <h2 className="text-sm font-bold uppercase tracking-wide text-ink-muted">
                      {category.label}
                    </h2>
                    <div className="mt-2 flex flex-col gap-3">
                      {categoryGroups.map((group) => (
                        <GroupCard key={group.id} group={group} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </>
      )}
    </main>
  );
}
