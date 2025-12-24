# Concealed Carry Legal Protection Comparison Tool

A trustworthy product that helps people choose between concealed carry legal protection plans by reducing confusion, surfacing meaningful differences, and supporting confident action.

## Features

### Primary Jobs to be Done (JTBD)

1. **Help me understand what I'm buying** - Educational content explaining payment models, attorney choice, exclusions, and disclosure status
2. **Help me narrow options fast** - Interactive filtering by budget, payment style, attorney choice, family coverage, and coverage limits
3. **Show me meaningful differences** - Side-by-side comparison of 2-4 plans with structured attributes
4. **Help me avoid regret** - Clear display of exclusions, limitations, and "not ideal for" scenarios
5. **Let me take the next step** - Transparent provider links with clear disclosure of sponsored content

### Key Features

- **Filtering System**: Narrow plans by price, payment style, attorney choice, family coverage, and coverage limits
- **Comparison View**: Compare up to 4 plans side-by-side with detailed attribute breakdowns
- **Educational Content**: Learn about payment models (upfront vs reimbursement), attorney choice, and common exclusions
- **Transparency Indicators**: Clear badges showing what's disclosed, not disclosed, or unclear
- **Mobile Responsive**: Works well on mobile devices for comparing and filtering
- **Analytics Ready**: Built-in event tracking hooks for measuring user behavior

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
/workspace
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/             # React components
│   ├── Header.tsx         # Site header
│   ├── PlanCard.tsx      # Individual plan card
│   ├── FilterPanel.tsx    # Filtering interface
│   ├── ComparisonView.tsx # Side-by-side comparison
│   └── EducationalContent.tsx # Educational content
├── data/                  # Data files
│   └── plans.ts          # Plan data (sample)
├── lib/                   # Utility libraries
│   ├── types.ts          # TypeScript types
│   ├── filters.ts        # Filtering logic
│   └── analytics.ts      # Analytics hooks
└── public/                # Static assets
```

## Data Model

Plans are represented with structured attributes including:
- Pricing (monthly/annual)
- Payment style (upfront/reimbursement/hybrid)
- Attorney choice (network/choice/hybrid)
- Coverage details (limits, waiting periods, coverage types)
- Exclusions and limitations
- Disclosure status for each attribute
- Source and verification dates

## Product Principles

1. **Trust-first**: Accuracy and transparency beat conversion tricks
2. **Clarity over completeness**: Better to show "not disclosed" than guess
3. **Decision-centered**: Organize information by decisions, not marketing categories
4. **Progressive disclosure**: Quick shortlist first; depth on demand
5. **Neutral tone**: Educational, not ideological; no legal advice

## Legal Disclaimer

This tool is for informational purposes only and does not constitute legal advice. Always consult with a qualified attorney for legal matters. Information is based on publicly available sources and may not reflect the most current plan details. Verify all information directly with providers before making decisions.

## License

ISC
