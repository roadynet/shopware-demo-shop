# Case Study: SkillBuilder to Shopware Admin API Integration

## Overview

The Shopware demo is the visible e-commerce target for SkillBuilder. Published SkillBuilder courses are synchronized into a real Shopware installation through the Shopware Admin API. Lessons become products, lesson chapters become categories, and unpublished content is removed from storefront visibility again.

The repository also contains a compact storefront prototype for portfolio use. It presents a realistic e-commerce flow without using production customer data or payment providers.

This is explicitly a demo shop: no real orders, no real payment, no sale. Storefront purchase and checkout actions are marked or blocked so the project can be evaluated without creating commercial transactions.

## Goal

The project demonstrates a working automation path from a Symfony learning platform into Shopware.

The important integration is:

- SkillBuilder admin clicks the Shopware import button
- SkillBuilder reads published lessons
- Shopware products are created or updated via Admin API
- unpublished course products are deactivated
- orphaned course categories are hidden again
- API credentials are configured through environment variables

## Business Value

The business idea is simple: digital course providers should not maintain the same catalogue twice.

- SkillBuilder remains the source of truth for course content.
- Shopware becomes the public commerce surface.
- Only approved and published lessons become visible products.
- Product and category maintenance becomes an admin workflow instead of manual copy-paste work.
- Publication status in SkillBuilder controls storefront visibility in Shopware.

## Implemented Scope

- product catalogue
- category filtering
- search
- cart state
- quantity changes
- checkout summary
- responsive layout
- Shopware Admin API product import example
- product activation/deactivation based on SkillBuilder status
- category synchronization for lesson sections
- visible no-sales demo disclaimer

## Shopware-Relevance

The SkillBuilder data model maps directly to Shopware concepts:

- lessons become products through the Admin API
- lesson sections become category and navigation data
- visibility is controlled by publication status
- cart actions can map to line item endpoints
- checkout state can later use Shopware customer, shipping and payment flows

## Next Production Steps

1. Add screenshots of the live Shopware category fed by SkillBuilder.
2. Add import logging in the SkillBuilder admin.
3. Derive product images and prices from SkillBuilder metadata.
4. Replace local cart state with Store API cart operations.
5. Add quality checks and portfolio screenshots.
