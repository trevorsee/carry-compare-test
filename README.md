# CarryCoverage (MVP scaffold)

Trusted, data-driven comparison site for concealed carry legal protection plans.

## Tech

- Next.js (App Router) + TypeScript + Tailwind
- Prisma ORM (default DB: SQLite via `DATABASE_URL`)

## Getting started

1. Install deps:

```bash
cd /workspace
npm install
```

2. Configure env:

```bash
cp .env.example .env
```

3. Initialize DB + seed sample data:

```bash
npx prisma migrate dev --name init
npm run seed
```

4. Run the app:

```bash
npm run dev
```

Open:

- `/compare` — filterable comparison table + compare tray
- `/compare/side-by-side?ids=<id1>,<id2>` — shareable compare view (use tray to build URL)
- `/plans/[slug]` — plan detail pages
- `/guides` — MDX-backed guides
- `/methodology`, `/disclosures`

## Admin (token auth)

Set `ADMIN_TOKEN` in `.env`, then:

- `/admin` — enter token
- `/admin/providers` — CRUD providers
- `/admin/plans` — CRUD plans + featured/sponsored flags
- `/admin/sources` — attach citations to plans

## Event tracking

Events are stored in the `Event` table via:

- `POST /api/events/track`
- `POST /api/events/outbound-click`

Outbound click payload includes:
`provider_id`, `plan_id`, `placement`, `page_path`, `position_index`, `cta_label`.

