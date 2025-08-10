import settings from "@/../content/settings.json";
import extraPublications from "@/../content/publications.json";
import { PublicationCard } from "@/components/PublicationCard";

type HashnodePost = {
  id: string;
  type: "article";
  title: string;
  url: string;
  date?: string;
  platform?: string;
  brief?: string;
};

export const dynamic = "force-static";

async function getHashnodePosts(): Promise<HashnodePost[]> {
  const host = settings.hashnodeHost;
  if (!host || host.includes("your-hashnode")) return [] as HashnodePost[];

  const query = `#graphql
    query GetPosts($host: String!) {
      publication(host: $host) {
        posts(first: 20) {
          edges { node { id title brief slug url publishedAt coverImage { url } } }
        }
      }
    }
  `;
  try {
    const res = await fetch("https://gql.hashnode.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { host } }),
      // ensure build-time static
      next: { revalidate: 86400 },
    });
    const data = (await res.json()) as {
      data?: {
        publication?: {
          posts?: { edges?: { node: { id: string; title: string; url: string; publishedAt?: string; brief?: string } }[] };
        };
      };
    };
    const edges = data?.data?.publication?.posts?.edges ?? [];
    return edges.map((e) => ({
      id: e.node.id,
      type: "article" as const,
      title: e.node.title,
      url: e.node.url,
      date: e.node.publishedAt,
      platform: "Hashnode",
      brief: e.node.brief,
    }));
  } catch {
    return [];
  }
}

export default async function PublicationsPage() {
  const hashnode = await getHashnodePosts();
  const combined = [...hashnode, ...extraPublications];

  return (
    <div className="py-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Publications</h1>
      {hashnode.length === 0 && (
        <p className="text-sm opacity-70">Add your Hashnode subdomain to <code>content/settings.json</code> to auto-list blog posts.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {combined.map((pub) => (
          <PublicationCard key={pub.id} pub={pub as HashnodePost} />
        ))}
      </div>
    </div>
  );
}
