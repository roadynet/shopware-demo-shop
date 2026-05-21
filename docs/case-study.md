# Case Study: Shopware Demo Shop

## Overview

The Shopware Demo Shop is the visible e-commerce target for SkillBuilder. Published SkillBuilder courses are exported directly into Shopware as products, while lesson chapters become categories.

The repository also contains a compact frontend prototype for portfolio use. It presents a realistic e-commerce flow without using production customer data or payment providers.

This is explicitly a demo shop: no real orders, no real payment, no sale. Storefront purchase and checkout actions are marked or blocked so the project can be evaluated without creating commercial transactions.

## Goal

The project adds an e-commerce example to the portfolio and demonstrates a concrete automation path from a learning platform into a Shopware shop.

The important integration is:

- SkillBuilder admin clicks the Shopware import button
- SkillBuilder reads published lessons
- Shopware products are created or updated via Admin API
- unpublished course products and categories are hidden again

## Implemented Scope

- product catalogue
- category filtering
- search
- cart state
- quantity changes
- checkout summary
- responsive layout
- SkillBuilder-to-Shopware product import documentation
- visible no-sales demo disclaimer

## Shopware-Relevance

The SkillBuilder data model maps directly to Shopware:

- lessons become products
- lesson sections become category/navigation data
- cart actions can map to line item endpoints
- checkout state can later use Shopware customer, shipping and payment flows

## Next Production Steps

1. Add screenshots of the live Shopware category fed by SkillBuilder.
2. Add import logging in the SkillBuilder admin.
3. Derive product images and prices from SkillBuilder metadata.
4. Replace local cart state with Store API cart operations.
5. Add quality checks and portfolio screenshots.
