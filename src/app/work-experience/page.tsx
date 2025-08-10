"use client";

import experiences from "@/../content/experience.json";
import { TechIcon } from "@/components/TechIcon";
import React from "react";

import type { Experience } from "@/types";

const CATEGORY_OPTIONS = [
  "Software Engineering",
  "Data Engineering",
  "Workflow Automation",
];

export default function WorkExperiencePage() {
  const initial = experiences as unknown as Experience[];
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [selectedTech, setSelectedTech] = React.useState<string[]>([]);
  const [query, setQuery] = React.useState("");

  const allTech = React.useMemo(() => {
    const set = new Set<string>();
    initial.forEach((e) => e.technologies.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [initial]);

  function toggle<T>(arr: T[], value: T): T[] {
    return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
  }

  const filtered = initial.filter((e) => {
    const matchCategory = selectedCategories.length === 0 || e.categories.some((c) => selectedCategories.includes(c));
    const matchTech = selectedTech.length === 0 || e.technologies.some((t) => selectedTech.includes(t));
    const q = query.toLowerCase();
    const matchQuery = q.length === 0 || e.company.toLowerCase().includes(q) || e.role.toLowerCase().includes(q) || (e.description?.toLowerCase().includes(q) ?? false);
    return matchCategory && matchTech && matchQuery;
  });

  return (
    <div className="py-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Work Experience</h1>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2 items-center">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="border rounded-md px-3 py-2 text-sm min-w-[240px] bg-white/70 dark:bg-black/30 backdrop-blur" />
          <button onClick={() => { setSelectedCategories([]); setSelectedTech([]); setQuery(""); }} className="text-sm underline">Reset</button>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium">Categories</div>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((c) => (
              <label key={c} className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-black dark:accent-white w-4 h-4 rounded-md border border-black/30 dark:border-white/30" checked={selectedCategories.includes(c)} onChange={() => setSelectedCategories((prev) => toggle(prev, c))} />
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
                <input type="checkbox" className="accent-black dark:accent-white w-4 h-4 rounded-md border border-black/30 dark:border-white/30" checked={selectedTech.includes(t)} onChange={() => setSelectedTech((prev) => toggle(prev, t))} />
                <span className="rounded-full bg-black/5 dark:bg-white/10 px-2 py-0.5">{t}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((e) => (
          <div key={e.id} className="border rounded-lg p-4 bg-white/50 dark:bg-white/5 backdrop-blur">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{e.company} — {e.role}</div>
              <div className="text-sm opacity-70">{e.period}</div>
            </div>
            <p className="text-sm opacity-80 mt-1">{e.description}</p>
            <div className="flex flex-wrap gap-2 text-xs mt-2">
              {e.technologies.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 rounded-full bg-black/5 dark:bg-white/10 px-2 py-0.5">
                  <TechIcon name={t} />
                  {t}
                </span>
              ))}
            </div>
            {e.highlights && (
              <ul className="list-disc ms-5 text-sm mt-2">
                {e.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
