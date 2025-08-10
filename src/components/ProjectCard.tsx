import React from "react";
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
  highlights?: string[];
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="border rounded-md p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <div className="flex gap-2 text-sm">
          {project.url && (
            <a className="underline" href={project.url} target="_blank" rel="noreferrer">Live</a>
          )}
          {project.repoUrl && (
            <a className="underline" href={project.repoUrl} target="_blank" rel="noreferrer">Code</a>
          )}
        </div>
      </div>
      <p className="text-sm opacity-80">{project.description}</p>
      <div className="flex flex-wrap gap-2 text-xs">
        {project.categories.map((c) => (
          <span key={c} className="rounded-full border px-2 py-0.5">{c}</span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        {project.technologies.map((t) => (
          <span key={t} className="inline-flex items-center gap-1 rounded-full bg-black/5 dark:bg-white/10 px-2 py-0.5">
            <TechIcon name={t} />
            {t}
          </span>
        ))}
      </div>
      {project.highlights && project.highlights.length > 0 && (
        <ul className="list-disc ms-5 text-sm">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
