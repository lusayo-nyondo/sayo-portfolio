// Prefer colorful public icons via Devicon CDN where available
// See: https://github.com/devicons/devicon

function mapToDevicon(name: string): string | null {
  const key = name.trim().toLowerCase();
  const map: Record<string, string> = {
    "typescript": "typescript/typescript-original.svg",
    "javascript": "javascript/javascript-original.svg",
    "next.js": "nextjs/nextjs-original.svg",
    "nextjs": "nextjs/nextjs-original.svg",
    "react": "react/react-original.svg",
    "node.js": "nodejs/nodejs-original.svg",
    "nodejs": "nodejs/nodejs-original.svg",
    "python": "python/python-original.svg",
    "django": "django/django-plain.svg",
    "drf": "django/django-plain.svg",
    "fastapi": "fastapi/fastapi-original.svg",
    "dart": "dart/dart-original.svg",
    "flutter": "flutter/flutter-original.svg",
    "java": "java/java-original.svg",
    "apache kafka": "apachekafka/apachekafka-original.svg",
    "kafka": "apachekafka/apachekafka-original.svg",
    "apache flink": "apacheflink/apacheflink-original.svg",
    "flink": "apacheflink/apacheflink-original.svg",
    "apache airflow": "apacheairflow/apacheairflow-original.svg",
    "airflow": "apacheairflow/apacheairflow-original.svg",
    "tailwindcss": "tailwindcss/tailwindcss-original.svg",
    "tailwind": "tailwindcss/tailwindcss-original.svg",
  };
  const path = map[key];
  return path ? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}` : null;
}

function mapToSimpleIcons(name: string): string | null {
  // Use simpleicons CDN; slugs are lowercase without spaces/punctuation typically
  const key = name.trim().toLowerCase();
  const explicit: Record<string, string> = {
    "apache flink": "apacheflink",
    "flink": "apacheflink",
    "apache kafka": "apachekafka",
    "kafka": "apachekafka",
    "apache airflow": "apacheairflow",
    "airflow": "apacheairflow",
    "next.js": "nextdotjs",
    "nextjs": "nextdotjs",
    "node.js": "nodedotjs",
    "nodejs": "nodedotjs",
  };
  const slug = explicit[key] || key.replace(/\s+/g, "");
  return `https://cdn.simpleicons.org/${slug}`;
}

export function TechIcon({ name, size = 16 }: { name: string; size?: number }) {
  const devicon = mapToDevicon(name);
  const src = devicon || mapToSimpleIcons(name);
  if (!src) return <span className="inline-block" style={{ width: size, height: size }} />;
  return (
    <img
      alt={name}
      src={src}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className="inline-block align-text-bottom"
      loading="lazy"
    />
  );
}
