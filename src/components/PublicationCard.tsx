import React from "react";

type Publication = {
  id: string;
  type: "youtube" | "article";
  title: string;
  url: string;
  date?: string;
  platform?: string;
  brief?: string;
};

export function PublicationCard({ pub }: { pub: Publication }) {
  return (
    <div className="border rounded-md p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{pub.title}</h3>
        <span className="text-xs opacity-60">{pub.platform ?? pub.type}</span>
      </div>
      {pub.brief && <p className="text-sm opacity-80">{pub.brief}</p>}
      <div className="flex items-center justify-between text-sm">
        <a className="underline" href={pub.url} target="_blank" rel="noreferrer">Open</a>
        {pub.date && <span className="opacity-60">{new Date(pub.date).toLocaleDateString()}</span>}
      </div>
    </div>
  );
}
