# CCW Compare - Concealed Carry Legal Protection Comparison Tool

A trust-first comparison tool that helps users choose between concealed carry legal protection plans by reducing confusion, surfacing meaningful differences, and supporting confident decision-making.

## Features

### Core Functionality

- **Plan Comparison**: Compare 6 major concealed carry legal protection providers side-by-side
- **Smart Filtering**: Filter by state, budget, payment style, attorney choice, and family coverage needs
- **Educational Content**: Learn about key concepts like upfront vs. reimbursement, attorney choice, and coverage limits
- **Detailed Plan Views**: See full details including pricing tiers, exclusions, and "best for / not for" recommendations
- **Transparency First**: All information shows disclosure status (verified, not disclosed, unclear) and source citations

### Providers Included

1. **USCCA** - U.S. Concealed Carry Association
2. **CCW Safe** - Legal service membership with unlimited criminal defense
3. **Firearms Legal Protection (FLP)** - Budget-friendly unlimited coverage
4. **Second Call Defense** - Immediate attorney dispatch
5. **U.S. LawShield** - Lowest base price with à la carte add-ons
6. **Right to Bear** - Insurance-backed reimbursement model

### Key Decision Attributes Tracked

- Payment style (upfront vs. reimbursement)
- Attorney choice (your choice, panel only, panel preferred)
- Coverage limits (criminal, civil, bail bond)
- Family coverage options
- Exclusions and limitations
- Geographic availability
- Pricing across multiple tiers

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

### Development

```bash
# Run linting
npm run lint

# Type checking is included in build
npm run build
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Main comparison tool
│   ├── learn/page.tsx     # Educational content
│   ├── about/page.tsx     # About page
│   ├── layout.tsx         # Root layout with navigation
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ComparisonTable.tsx    # Side-by-side comparison
│   ├── ComparisonSelector.tsx # Bottom bar for selection
│   ├── DisclosureBadge.tsx    # Verified/Not disclosed badges
│   ├── EducationCard.tsx      # Expandable education topics
│   ├── FilterBar.tsx          # Filter controls
│   ├── PlanCard.tsx           # Individual plan cards
│   └── PlanDetailModal.tsx    # Full plan details modal
├── data/
│   ├── plans.ts           # Provider plan data
│   └── education.ts       # Educational content
├── lib/
│   ├── analytics.ts       # Analytics tracking utilities
│   └── filters.ts         # Filter logic and utilities
└── types/
    └── index.ts           # TypeScript type definitions
```

## Design Principles

1. **Trust-first**: Accuracy and transparency beat conversion tricks
2. **Clarity over completeness**: Better to show "not disclosed" than guess
3. **Decision-centered**: Information organized by decisions, not marketing
4. **Progressive disclosure**: Quick shortlist first; depth on demand
5. **Neutral tone**: Educational, not ideological; no legal advice

## User Outcome Tests (From PRD)

The tool is designed to pass these tests:

1. ✅ A new user can answer "What's the difference between upfront and reimbursement?" in <2 minutes
2. ✅ A user can narrow from many options to 3–5 based on constraints in <1 minute
3. ✅ A user can compare 2–4 plans and clearly articulate "why pick A over B"
4. ✅ A user can identify major exclusions/limitations quickly for any plan
5. ✅ A user can proceed to the provider with clear expectation and disclosure

## Analytics

The tool supports tracking key behaviors:

- `filter_applied` / `filter_cleared` - Constraint usage
- `plan_viewed` - Individual plan detail views
- `comparison_started` / `comparison_viewed` - Comparison engagement
- `outbound_click` - Provider website clicks
- `education_content_viewed` - Learning engagement
- `exclusion_expanded` - Risk awareness
- `source_clicked` - Source verification

Analytics are implemented as hooks that can be connected to any analytics service (Google Analytics, Mixpanel, Amplitude, etc.).

## Data Maintenance

Plan data is stored in `src/data/plans.ts` with:

- Structured attributes for each plan and tier
- Disclosure status for every attribute (confirmed, not_disclosed, unclear)
- Source citations with access dates
- Last verified dates

To update plan information:

1. Update the relevant plan object in `plans.ts`
2. Update the `lastVerified` date
3. Add/update sources as needed
4. Ensure disclosure status is accurate

## Legal Disclaimer

This tool does not provide legal advice. It provides factual comparisons of plan features based on publicly available information. Users should:

- Verify all details directly with providers before purchasing
- Consult with a licensed attorney for legal questions
- Understand that self-defense laws vary by state

## License

MIT
