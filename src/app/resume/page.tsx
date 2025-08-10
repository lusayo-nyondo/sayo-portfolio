import roles from "@/../content/resume/roles.json";
import { ResumeView } from "@/components/ResumeView";
import { PrintButton } from "@/components/PrintButton";
import Link from "next/link";

export const dynamic = "force-static";

export default function ResumePage() {
  const roleEntries = Object.entries(roles);
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Resume</h1>
        <PrintButton />
      </div>

      <ResumeView />

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Role-Specific Resumes</h2>
        <ul className="list-disc ms-5">
          {roleEntries.map(([slug, role]) => (
            <li key={slug}>
              <Link href={`/resume/${slug}`} className="underline">{role.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
