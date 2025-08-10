"use client";
import React from "react";
import data from "@/../content/playground/index.json";
import Image from "next/image";
import Link from "next/link";
import { TechIcon } from "@/components/TechIcon";

export const dynamic = "force-static";

export default function PlaygroundPage() {
  const [selected, setSelected] = React.useState<string[]>([]);
  const categories = ["HTML/CSS", "React", "Flutter"];
  const items = data.items.filter((i) =>
    selected.length === 0 || i.categories?.some((c) => selected.includes(c))
  );
  function toggle(value: string) {
    setSelected((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  }
  return (
    <div className="py-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <p className="opacity-80 max-w-3xl">{data.intro}</p>

      <div className="flex flex-wrap gap-2 items-center">
        {categories.map((c) => (
          <label key={c} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="accent-black dark:accent-white w-4 h-4 rounded-md border border-black/30 dark:border-white/30"
              checked={selected.includes(c)}
              onChange={() => toggle(c)}
            />
            <span className="inline-flex items-center gap-1 rounded-full bg-black/5 dark:bg-white/10 px-2 py-0.5">
              {c === "React" && <TechIcon name="React" />}
              {c === "Flutter" && <TechIcon name="Flutter" />}
              {c}
            </span>
          </label>
        ))}
        <button onClick={() => setSelected([])} className="text-sm underline">Reset</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <Link key={item.slug} href={`/playground/${item.slug}`} className="group border rounded-lg overflow-hidden bg-white/50 dark:bg-white/5 backdrop-blur">
            <div className="aspect-video relative">
              <Image src={item.gif} alt={item.title} fill className="object-cover" />
            </div>
            <div className="p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase opacity-60">{item.type}</div>
                <div className="flex gap-1 text-xs">
                  {item.categories?.map((cat) => (
                    <span key={cat} className="inline-flex items-center gap-1 rounded-full bg-black/5 dark:bg-white/10 px-2 py-0.5">
                      {(cat === "React" || cat === "Flutter") && <TechIcon name={cat} />}
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
              <div className="font-medium group-hover:underline">{item.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
