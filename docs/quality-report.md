# Quality Report

## Automated Checks

The public repository uses a GitHub Actions workflow named `Portfolio Audit`.

Current recorded status:

```text
Portfolio Audit: success
Live demo: HTTP 200
```

Workflow evidence:

```text
https://github.com/roadynet/shopware-demo-shop/actions/workflows/portfolio-audit.yml
```

## Check Coverage Areas

### PHP Example Syntax

The repository contains representative backend import examples for the
SkillBuilder-to-Shopware bridge. CI runs PHP syntax validation on these examples.

### JavaScript Syntax

The Storefront demo JavaScript is checked with:

```text
npm run check
```

### Demo Guardrail Tests

The Storefront demo has Node tests for its public safety promises:

```text
npm test
```

Covered behavior:

- no-sale messaging remains visible
- payment/order deactivation wording remains visible
- account, registration and alert-style flows are not introduced

### Markdown Links

Local Markdown links are checked to avoid broken portfolio navigation.

### No-Sale Demo Guardrails

CI checks for visible no-sale wording and disabled purchase behavior:

- no real orders
- no active payment
- demo-shop messaging
- no registration/contact/payment flows

### Secret and Environment Policy

CI checks that real environment files are not committed and scans public text/code
for obvious leaked token patterns.

## Manual / Tool Checks

Performed checks:

- live demo HTTP check
- GitHub Actions status check
- Node demo guardrail tests
- PHP example syntax
- JavaScript syntax
- local Markdown link check
- secret-token pattern scan

## Important Findings Fixed

- The demo storefront is clearly marked as no-sale/no-payment.
- Admin API credentials are not exposed in frontend JavaScript.
- Product sync is documented as server-side SkillBuilder logic rather than a
  browser-side integration.

## Evidence

- [Portfolio Audit Report](audit-report-2026-07-01.md)
- [Production Evidence](production-evidence.md)
- [Operations Runbook](../OPERATIONS.md)
- [PHPStan Audit](phpstan-audit-2026-07-01.md)
- [Static Analysis Audit](static-analysis-audit-2026-07-01.md)
- [Evidence Index](evidence/README.md)
