"use client";

import React from "react";

export function PrintButton({ label = "Download PDF" }: { label?: string }) {
  return (
    <button
      onClick={() => window.print()}
      className="rounded-md bg-foreground text-background px-4 py-2 text-sm hover:opacity-90"
    >
      {label}
    </button>
  );
}
