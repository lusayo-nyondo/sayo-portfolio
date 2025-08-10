import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-black/30 border-b border-black/10 dark:border-white/10 no-print">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">Lusayo Nyondo</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/project-showcase" className="hover:underline">Project Showcase</Link>
          <Link href="/work-experience" className="hover:underline">Work Experience</Link>
          <Link href="/publications" className="hover:underline">Publications</Link>
          <Link href="/playground" className="hover:underline">UI Playground</Link>
          <Link href="/resume" className="hover:underline">Resume</Link>
        </nav>
      </div>
    </header>
  );
}
