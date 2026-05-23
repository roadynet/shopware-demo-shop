# Interview Q&A

## Is this a real Shopware integration or only a mockup?

The integration is real. SkillBuilder uses the Shopware Admin API to synchronize published lessons as Shopware products. This repository contains the public storefront demo, documentation, screenshots, and sanitized example code without production credentials.

## What is the exact workflow?

```text
SkillBuilder Admin -> Shopware Demo-Produkte button -> Symfony Import Service -> Shopware Admin API -> Shopware products -> Storefront
```

## What becomes a Shopware product?

Published SkillBuilder lessons become Shopware products.

Chapters do not become categories. They remain internal learning-structure data inside SkillBuilder.

## Which Shopware concepts are used?

- Admin API authentication
- product create/update requests
- stable product numbers
- product category assignment
- active/inactive visibility state
- storefront display of synchronized products

## How are duplicates avoided?

Products use stable product numbers derived from SkillBuilder lesson IDs. A repeated import updates the matching product instead of creating a new duplicate product.

## What happens when a lesson is unpublished?

Products that no longer correspond to a published SkillBuilder lesson are deactivated so they no longer appear as active storefront products.

## Why is checkout disabled?

This is a portfolio demo. It proves the SkillBuilder-to-Shopware synchronization without processing real orders, payments, registrations, contact forms, or customer data.

## Are credentials included in this repository?

No. API credentials are configured through environment variables outside the repository. The example code uses placeholder names only.

## What would be the next production step?

- richer sync logs per product
- product images and prices from SkillBuilder metadata
- stronger product detail pages
- automated checks for the storefront demo
- optional webhook or scheduled sync if the admin-button workflow should become more automated
