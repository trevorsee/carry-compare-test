# CarryCoverage - Concealed Carry Legal Protection Comparison

MVP Implementation of the Concealed Carry Legal Protection Comparison Site.

## Tech Stack
- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS v4
- Prisma ORM (SQLite for MVP)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Initialize Database:
   ```bash
   npx prisma migrate dev --name init
   ```

3. Seed Database:
   ```bash
   npx tsx prisma/seed.ts
   ```

4. Run Development Server:
   ```bash
   npm run dev
   ```

## Key Pages

- **Compare (Home)**: `/compare` - Main comparison table with filters and sorting.
- **Side-by-Side**: `/compare/side-by-side` - Detailed comparison of selected plans.
- **Methodology**: `/methodology` - Explanation of ranking and data sources.
- **Admin**: `/admin` - Basic view of providers.

## Project Structure

- `src/app`: App Router pages
- `src/components`: Reusable UI components (Header, Footer)
- `src/lib`: Utilities (Prisma client)
- `prisma`: Database schema and seed script

## Notes
- Database is SQLite (`dev.db`).
- Admin area is read-only for MVP demo.
