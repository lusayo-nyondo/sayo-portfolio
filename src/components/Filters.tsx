"use client";

import React, { useMemo, useState } from "react";
import { TechIcon } from "./TechIcon";

type Project = {
  id: string;
  title: string;
  description: string;
  url?: string;
  repoUrl?: string;
  categories: string[];
  technologies: string[];
  libraries?: string[];
};

export type FiltersProps = {
  projects: Project[];
  onFilter: (filtered: Project[]) => void;
};

const CATEGORY_OPTIONS = [
  "Software Engineering",
  "Data Engineering",
  "Workflow Automation",
];

export function Filters({ projects, onFilter }: FiltersProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const allTech = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.technologies.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  function toggle<T>(arr: T[], value: T): T[] {
    return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
  }

  function applyFilters() {
    const filtered = projects.filter((p) => {
      const matchCategory =
        selectedCategories.length === 0 ||
        p.categories.some((c) => selectedCategories.includes(c));
      const matchTech =
        selectedTech.length === 0 ||
        p.technologies.some((t) => selectedTech.includes(t));
      const matchQuery =
        query.trim().length === 0 ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
      return matchCategory && matchTech && matchQuery;
    });
    onFilter(filtered);
  }

  // Apply automatically on change
  React.useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories, selectedTech, query, projects]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="border rounded-md px-3 py-2 text-sm min-w-[240px] bg-white/70 dark:bg-black/30 backdrop-blur"
          />
        </div>
        <button onClick={() => { setSelectedCategories([]); setSelectedTech([]); setQuery(""); onFilter(projects); }} className="text-sm underline">Reset</button>
      </div>

      <div className="flex flex-col gap-1">
        <div className="text-sm font-medium">Categories</div>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="accent-black dark:accent-white w-4 h-4 rounded-md border border-black/30 dark:border-white/30"
                checked={selectedCategories.includes(c)}
                onChange={() => setSelectedCategories((prev) => toggle(prev, c))}
              />
              <span className="rounded-full border px-2 py-0.5">{c}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="text-sm font-medium">Technologies</div>
        <div className="flex flex-wrap gap-2">
          {allTech.map((t) => (
            <label key={t} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="accent-black dark:accent-white w-4 h-4 rounded-md border border-black/30 dark:border-white/30"
                checked={selectedTech.includes(t)}
                onChange={() => setSelectedTech((prev) => toggle(prev, t))}
              />
              <span className="inline-flex items-center gap-1 rounded-full bg-black/5 dark:bg-white/10 px-2 py-0.5">
                <TechIcon name={t} />
                {t}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
