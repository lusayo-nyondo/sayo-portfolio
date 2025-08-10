This is a Next.js portfolio statically exported for GitHub Pages. Content lives under `content/` as JSON.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

Edit `content/settings.json`, `content/projects.json`, `content/publications.json`, or `content/resume/*` to update content. The UI is in `src/app/*`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on GitHub Pages

1. Set `NEXT_BASE_PATH` to `/<repo-name>` when exporting for Pages if your project is not at the root domain.
2. Run `npm run build` to produce `out/`.
3. Publish `out/` as your Pages artifact.
