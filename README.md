# CarryCoverage - CCW Legal Protection Comparison Site

A modern, data-driven comparison site for concealed carry legal protection plans. Built with Next.js 16, TypeScript, Tailwind CSS, and Prisma.

## Features

### Public Site
- **Comparison Table**: Filter, sort, and compare CCW legal protection plans
- **Side-by-Side Comparison**: Compare up to 4 plans in detail
- **Plan Detail Pages**: Comprehensive information with pros/cons, coverage breakdowns, and sources
- **Educational Guides**: Articles explaining key concepts like up-front vs reimbursement coverage
- **Methodology & Disclosure**: Transparent ranking methodology and affiliate disclosures

### Admin Dashboard
- Manage providers and plans
- Track verification dates and sources
- View change logs
- Featured/sponsored placement controls

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: SQLite (via Prisma) - easily switchable to PostgreSQL
- **State Management**: Zustand
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up the database
npx prisma migrate dev

# Seed the database with sample data
npm run db:seed

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Variables

Create a `.env` file with:

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="CarryCoverage"
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/              # Admin dashboard
│   ├── compare/            # Comparison table and side-by-side
│   ├── guides/             # Educational articles
│   ├── plans/              # Plan detail pages
│   └── ...                 # Other pages (methodology, about, etc.)
├── components/
│   ├── compare/            # Comparison-specific components
│   ├── layout/             # Header, footer
│   ├── seo/                # Structured data components
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── analytics.ts        # Event tracking
│   ├── db.ts               # Prisma client
│   ├── store.ts            # Zustand stores
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Utility functions
└── generated/              # Prisma client output
```

## Database Schema

### Main Entities
- **Provider**: Companies offering plans (USCCA, CCW Safe, etc.)
- **Plan**: Individual plans with pricing, coverage details, limits
- **Source**: Citations for plan data
- **ChangeLog**: Track changes to plans
- **Guide**: Educational articles

## Key Features Implementation

### Comparison Table
- Client-side filtering with Zustand state management
- Preset filters ("Best for Families", "Best Budget", etc.)
- Responsive design with table view (desktop) and card view (mobile)

### Compare Tray
- Persistent selection stored in localStorage
- Compare up to 4 plans side-by-side
- Shareable comparison URLs

### Analytics
- Event tracking for filters, comparisons, and outbound clicks
- `navigator.sendBeacon` for reliable outbound click tracking
- Development logging and production API endpoint

### SEO
- Dynamic sitemap generation
- Structured data (JSON-LD) for products, articles, FAQs
- Meta tags and Open Graph support

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:seed      # Seed database
npm run db:reset     # Reset database
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy

For production, switch to PostgreSQL:
1. Update `prisma/schema.prisma` provider to `postgresql`
2. Update `DATABASE_URL` to PostgreSQL connection string
3. Run `npx prisma migrate deploy`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT

## Disclaimer

This project is for educational and demonstration purposes. The plan data included is sample data and should not be used for actual purchase decisions. Always verify current terms directly with providers.
