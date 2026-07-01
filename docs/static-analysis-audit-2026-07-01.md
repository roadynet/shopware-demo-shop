# Static Analysis Audit - 2026-07-01

## Scope

This repository is a public Shopware storefront/demo evidence repository. It is
not the full private Symfony backend that performs the Shopware Admin API write.

Static analysis therefore focuses on:

- PHP syntax of representative backend examples
- JavaScript syntax of the public Storefront demo
- documentation consistency
- no-sale guardrails
- secret leakage prevention

## Current Gates

```text
php -l examples/**/*.php
node --check src/main.js
Markdown link check
public wording consistency check
no-sale demo guardrail check
environment file policy check
secret-token pattern check
```

## Current Result

```text
Portfolio Audit: success
Live demo: HTTP 200
```

## Why PHPStan Is Not Claimed Here

This repository contains representative PHP examples, not the full Symfony
backend. Running PHPStan against small disconnected examples would not provide
the same value as running it in the backend repository where services,
dependencies and framework context exist.

The stronger evidence here is:

- Admin API credentials are not present in frontend code.
- Demo purchase/payment behavior is explicitly disabled.
- Shopware mapping and idempotent product numbers are documented.
- The connected SkillBuilder and CTC repositories contain the Symfony backend
  evidence.

## Proposed Next Step

If this repository grows into a full backend package, add:

```text
composer.json
phpstan.neon
vendor/bin/phpstan analyse examples
```

For the current storefront/demo shape, CI syntax, link, guardrail and secret
checks are the appropriate quality gates.
