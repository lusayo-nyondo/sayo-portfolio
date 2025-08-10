import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-black/10 dark:border-white/10 no-print">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold">Lusayo Nyondo</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/projects" className="hover:underline">Projects</Link>
          <Link href="/publications" className="hover:underline">Publications</Link>
          <Link href="/resume" className="hover:underline">Resume</Link>
        </nav>
      </div>
    </header>
  );
}