import React from "react";
import superResume from "@/../content/resume/super.json";
import projects from "@/../content/projects.json";

export type RoleFilter = {
  label: string;
  includeCategories?: string[];
  includeTechnologies?: string[];
  summaryNote?: string;
};

export function ResumeView({ role }: { role?: RoleFilter }) {
  const projectById = new Map(projects.map((p) => [p.id, p] as const));

  const filteredProjectRefs = (() => {
    if (!role) return superResume.projects;
    return superResume.projects.filter((ref) => {
      const p = projectById.get(ref.refId);
      if (!p) return false;
      const matchCat = !role.includeCategories || role.includeCategories.some((c) => p.categories.includes(c));
      const matchTech = !role.includeTechnologies || role.includeTechnologies.some((t) => p.technologies.includes(t));
      return matchCat && matchTech;
    });
  })();

  return (
    <div className="prose max-w-none dark:prose-invert print:prose-md">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">{superResume.profile.name}</h1>
        <div className="opacity-80">{superResume.profile.title}</div>
        <p className="mt-2">{superResume.profile.summary}</p>
        {role?.summaryNote && <p className="mt-1 italic opacity-80">{role.summaryNote}</p>}
      </header>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="flex flex-wrap gap-2 text-sm">
          {superResume.skills.map((s) => (
            <span key={s} className="rounded-full border px-2 py-0.5">{s}</span>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">Experience</h2>
        <div className="flex flex-col gap-2">
          {superResume.experience.map((e) => (
            <div key={e.company} className="border rounded-md p-3">
              <div className="flex items-center justify-between">
                <div className="font-medium">{e.company} — {e.role}</div>
                <div className="text-sm opacity-70">{e.period}</div>
              </div>
              {e.highlights && (
                <ul className="list-disc ms-5 text-sm mt-2">
                  {e.highlights.map((h: string) => <li key={h}>{h}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredProjectRefs.map((ref) => {
            const p = projectById.get(ref.refId);
            if (!p) return null;
            return (
              <div key={p.id} className="border rounded-md p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{p.title}</div>
                  <div className="text-xs opacity-60">{p.categories.join(", ")}</div>
                </div>
                <p className="text-sm mt-1 opacity-80">{p.description}</p>
                <div className="flex flex-wrap gap-1 mt-2 text-xs">
                  {p.technologies.map((t: string) => (
                    <span key={t} className="border rounded px-1 py-0.5">{t}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold">Education</h2>
        <ul className="list-disc ms-5">
          {superResume.education.map((ed) => (
            <li key={ed.degree + ed.institution} className="text-sm">
              {ed.degree}, {ed.institution} ({ed.year})
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
