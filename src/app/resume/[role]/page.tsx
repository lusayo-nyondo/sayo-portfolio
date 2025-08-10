import roles from "@/../content/resume/roles.json";
import { ResumeView, type RoleFilter } from "@/components/ResumeView";
import { PrintButton } from "@/components/PrintButton";
import Link from "next/link";

export const dynamic = "force-static";

export default async function RoleResumePage({ params }: { params: Promise<{ role: string }> }) {
  const { role: roleSlug } = await params;
  const role = (roles as Record<string, RoleFilter>)[roleSlug];
  if (!role) {
    return (
      <div className="py-8">
        <h1 className="text-2xl font-bold">Not Found</h1>
        <p className="opacity-80">Unknown role. Please go back to the <Link className="underline" href="/resume/">resume</Link>.</p>
      </div>
    );
  }
  return (
    <div className="py-8 flex flex-col gap-6">
      <div className="text-sm opacity-80">
        <Link href="/resume/" className="underline">Resume</Link> / <span>{role.label}</span>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{role.label}</h1>
        <PrintButton />
      </div>
      <ResumeView role={role} />
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(roles).map((role) => ({ role }));
}
