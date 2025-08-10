import data from "@/../content/playground/index.json";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-static";

export default async function PlaygroundItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = data.items.find((i) => i.slug === slug);
  if (!item) {
    return <div className="py-8">Not found</div>;
  }
  return (
    <div className="py-8 flex flex-col gap-4">
      <div className="text-sm opacity-80"><Link href="/playground" className="underline">UI Playground</Link> / <span>{item.title}</span></div>
      <h1 className="text-2xl font-bold">{item.title}</h1>
      <p className="opacity-80 max-w-3xl">{item.description}</p>
      {item.type === "demo" ? (
        <div className="border rounded-lg overflow-hidden bg-white/50 dark:bg-white/5 backdrop-blur">
          <div className="relative aspect-video">
            <Image src={item.gif} alt={item.title} fill className="object-cover" />
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-6 bg-white/50 dark:bg-white/5 backdrop-blur">Challenge brief above. Implement a solution.</div>
      )}
    </div>
  );
}

export function generateStaticParams() {
  return data.items.map((i) => ({ slug: i.slug }));
}
