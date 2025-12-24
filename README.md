# Concealed Carry Legal Protection Comparison (MVP)

This repo contains a **trust-first decision tool MVP** for comparing concealed carry legal protection plans **without giving legal advice**.

## What’s in the MVP

- **Learn**: Plain-language explanations (e.g. **up-front vs reimbursement**, **attorney choice**, common “gotchas”), with explicit “known vs unknown.”
- **Narrow**: Fast filtering by constraints (state, budget, payment model, attorney choice, family coverage).
- **Compare**: Side-by-side comparison for **2–4 plans**, grouped by decision themes (cost, coverage, attorney, exclusions, support, transparency).
- **Act**: Clear outbound actions with “what happens next” labeling and **sponsored/affiliate** disclosure where applicable.
- **Measure**: Lightweight event logging (stored locally) for constraint usage, comparison behavior, and outbound intent.

## Run locally

This is a **no-build** static site. You just need a local HTTP server (file:// won’t allow `fetch()` in most browsers).

```bash
python3 -m http.server 8000 --directory site
```

Then open `http://localhost:8000`.

## Edit / maintain plan data

- **Plan data**: `site/data/plans.json`
- **Data validation**: `tools/validate_plans.py`

Run validation:

```bash
python3 tools/validate_plans.py site/data/plans.json
```

## Compliance / trust notes (MVP)

- **No legal advice**: This tool provides educational comparisons only.
- **Unknowns are explicit**: Fields support `unknown` / `not_disclosed` statuses rather than guessing.
- **Sources + last verified**: Each decision-relevant field can include sources and a last-verified date.
- **Sponsored/affiliate disclosure**: Plans/actions can be marked sponsored; labels show in the UI.

