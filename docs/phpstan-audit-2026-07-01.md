# PHPStan Audit - 2026-07-01

## Scope

This repository is a Storefront/demo evidence repository, not the full Symfony
backend. It therefore does not currently claim PHPStan coverage.

## Current State

Current repeatable gates:

```text
php -l examples/**/*.php
node --check src/main.js
Markdown link check
public wording consistency check
no-sale demo guardrail check
environment file policy check
secret-token pattern check
GitHub Actions Portfolio Audit
```

Recorded result:

```text
Portfolio Audit: success
Live demo: HTTP 200
```

## Why No PHPStan Baseline Is Published Here

The PHP code in this repository is representative example code. The real
Shopware Admin API write path belongs to the server-side SkillBuilder/Backend
context. Running PHPStan on disconnected examples would not provide the same
value as a backend PHPStan setup.

## Next Step

If the backend integration is moved into this repository, add:

```text
composer.json
phpstan.neon
vendor/bin/phpstan analyse examples src
```

## Audit Position

For the current repository shape, syntax, no-sale guardrails and secret checks
are the correct public quality gates. PHPStan belongs in the backend context.
