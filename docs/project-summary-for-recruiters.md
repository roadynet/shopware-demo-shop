# Project Summary for Recruiters

## One-Sentence Summary

This repository documents a working Shopware Admin API integration for SkillBuilder: published lessons are synchronized from a Symfony learning platform into Shopware as products.

## What This Demonstrates

- Shopware 6 Admin API usage
- Symfony-to-Shopware integration workflow
- product creation and update logic
- status-based product activation and deactivation
- environment-based API configuration
- demo-safe storefront operation without customer-data collection
- public documentation of a private production-style integration

## My Technical Contribution

I implemented the SkillBuilder-to-Shopware workflow and prepared a public portfolio repository around it. The private SkillBuilder application owns the admin workflow and import service. This public repository contains the storefront demo, documentation, screenshots, and sanitized example code for the integration.

The operational flow is:

```text
SkillBuilder Admin -> Symfony Import Service -> Shopware Admin API -> Product catalogue -> Storefront
```

## Integration Scope

- SkillBuilder reads lessons with status `published`.
- Published lessons are created or updated as Shopware products.
- Product numbers use a stable `SB-COURSE-*` pattern.
- Products are assigned to the shop category `SkillBuilder Kurse`.
- Products for unpublished lessons are deactivated.
- Old child-category remnants from earlier demo experiments are hidden from navigation.
- API credentials are configured outside the repository through environment variables.

The repository includes [.env.example](../.env.example) with placeholder names only. Real Shopware Admin API credentials are configured outside GitHub.

## Important Mapping Boundary

Lessons become products.

Chapters do not become categories. Chapters stay learning-structure data inside SkillBuilder and are not synchronized to Shopware.

## Demo Protection

The public storefront is intentionally not a sales channel. It shows the integration result without collecting customer data:

- no real orders
- no payment
- no registration
- no contact form
- no checkout completion
- visible demo notices in the storefront

Admin API credentials belong only on the server side. The storefront JavaScript must not contain credentials, tokens, or private API keys.

## Why This Is Relevant

This project shows a practical integration pattern for digital-content businesses: content can be maintained in one system and exposed in another system through an API workflow. For PHP/Symfony and Shopware roles, it demonstrates API integration, data mapping, status synchronization, and careful separation of public demo code from private credentials.
