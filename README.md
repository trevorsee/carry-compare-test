# CarryCoverage - Concealed Carry Legal Protection Comparison Site

A data-driven comparison site for concealed carry legal protection plans, built with Next.js, TypeScript, Prisma, and PostgreSQL.

## Features

- **Comparison Table**: Filterable, sortable table with compare tray (select up to 4 plans)
- **Plan Detail Pages**: Comprehensive information about each plan with sources and verification dates
- **Side-by-Side Compare**: Compare 2-4 plans in detail
- **Editorial Guides**: Educational content about legal protection plans
- **Methodology Page**: Transparent explanation of how we compare plans
- **Admin CMS**: Basic admin interface for managing providers and plans
- **Analytics Tracking**: Event tracking for outbound clicks, filters, sorting, and comparisons
- **SEO Optimized**: Sitemap, robots.txt, and proper meta tags

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **Authentication**: JWT-based (basic for MVP)

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd workspace
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add:
```
DATABASE_URL="postgresql://user:password@localhost:5432/carrycoverage"
JWT_SECRET="your-secret-key-change-in-production"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. (Optional) Seed sample data:
```bash
npm run db:seed
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/workspace
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin interface
│   ├── compare/           # Comparison pages
│   ├── guides/            # Editorial guides
│   ├── plans/             # Plan detail pages
│   └── ...                # Other pages
├── components/             # React components
├── lib/                    # Utilities and helpers
├── prisma/                 # Prisma schema
└── public/                 # Static assets
```

## Database Schema

- **Provider**: Company information
- **Plan**: Individual plan details (pricing, coverage, etc.)
- **Source**: Citations and sources for plan information
- **ChangeLog**: Audit trail of plan changes

## Admin Access

Access the admin interface at `/admin`:
- Default credentials (change in production):
  - Email: `admin@example.com`
  - Password: `admin123`

## Analytics

The site includes event tracking for:
- Outbound clicks (to provider websites)
- Filter changes
- Sort changes
- Compare tray interactions
- Methodology page views

To enable Google Analytics, add your tracking ID to the layout component.

## SEO

- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`
- Canonical URLs configured
- Meta tags for social sharing

## Development

### Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes
npm run db:push

# Open Prisma Studio
npm run db:studio
```

### Build for Production

```bash
npm run build
npm start
```

## MVP Status

This is an MVP implementation. Future enhancements could include:
- User authentication and saved comparisons
- Email alerts for plan changes
- Quiz/matchmaking feature
- State-specific pages
- Review system
- More sophisticated admin features

## License

ISC

## Disclaimer

This site provides informational comparisons only and does not constitute legal advice. Always verify information directly with providers and consult with qualified legal professionals.
