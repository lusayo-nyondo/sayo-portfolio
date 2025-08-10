"use client";

import projectsData from "@/../content/projects.json";
import { ProjectCard } from "@/components/ProjectCard";
import { Filters } from "@/components/Filters";
import React from "react";

export const dynamic = "force-static";

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

export default function ProjectsPage() {
  const initialProjects = projectsData as unknown as Project[];
  const [filtered, setFiltered] = React.useState<Project[]>(initialProjects);

  return (
    <div className="py-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Project Showcase</h1>
      <Filters projects={initialProjects} onFilter={(items) => setFiltered(items)} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}
