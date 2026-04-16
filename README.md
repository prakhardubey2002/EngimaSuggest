# EnigmaSuggest

Official [Turborepo](https://turbo.build) layout (`create-turbo@latest`). **Next.js** (`apps/web`) and **Nest** (`apps/api`) run together via `npm run dev`.

| App | Path | Default URL |
|-----|------|----------------|
| **Web** | `apps/web` | [http://localhost:3000](http://localhost:3000) |
| **API** | `apps/api` | [http://127.0.0.1:3001](http://127.0.0.1:3001) (from `BACKENED_PORT`) |

`POST /api/parse` on the web app **proxies** to Nest `POST /parse`. Set **`BACKENED_URL`** and **`BACKENED_PORT`** in **`.env`** at this folder root (see `.env.example`).

## Setup

From **this folder** (`my-turborepo`, the Turborepo root):

```bash
npm install
```

Copy `.env.example` → `.env` and adjust ports/URLs if needed.

## Develop (web + API together)

```bash
npm run dev
```

One app only:

```bash
npx turbo run dev --filter=web
npx turbo run dev --filter=api
```

## Build / lint

```bash
npm run build
npm run lint
```

## Shared config

- `packages/eslint-config` — shared ESLint presets
- `packages/typescript-config` — shared `tsconfig` bases
