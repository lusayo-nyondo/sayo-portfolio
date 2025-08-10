export function Footer() {
  return (
    <footer className="mt-16 border-t border-black/10 dark:border-white/10 no-print">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm flex items-center justify-between">
        <p className="opacity-70">© {new Date().getFullYear()} Lusayo Nyondo</p>
        <div className="opacity-70">Built with Next.js • Tailwind</div>
      </div>
    </footer>
  );
}
