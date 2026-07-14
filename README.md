# Entity Visualization

Entity Visualization is a professional organization-chart application I built
while working as a Solutions Engineer at Bitwise Industries / Stria. It turns
ownership data into an interactive, automatically laid-out graph with
relationship tracing, ownership and distribution summaries, document links,
chart selection, minimap navigation, and print output.

The public repository contains anonymized demonstration data. Environment-
specific Cognito identifiers and document URLs are intentionally excluded.

## Stack

- React 17 and React Flow
- Dagre graph layout
- Amazon Cognito authentication
- Chart.js ownership summaries
- Vite build tooling

## Run locally

```bash
npm ci
npm start
```

With no environment variables, the application opens directly in demo mode
using the anonymized local dataset. To enable authentication, copy
`.env.example` to `.env.local` and supply a Cognito user-pool ID and app
client ID:

```text
VITE_COGNITO_USER_POOL_ID=...
VITE_COGNITO_CLIENT_ID=...
```

These browser identifiers are configuration rather than secrets, but keeping
them outside source prevents a portfolio build from depending on a specific
professional environment.

## Verification

```bash
npm run audit
npm test
npm run build
```

GitHub Actions runs the same security, test, and production-build checks on
every push and pull request.
