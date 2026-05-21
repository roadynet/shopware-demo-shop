# Case Study: Shopware Demo Shop

## Overview

Atelier Supply is a compact demo shop for portfolio use. It presents a realistic e-commerce flow without using production customer data or payment providers.

## Goal

The project adds an e-commerce example to the portfolio and demonstrates the kind of UI and state handling needed before connecting a frontend to Shopware.

## Implemented Scope

- product catalogue
- category filtering
- search
- cart state
- quantity changes
- checkout summary
- responsive layout

## Shopware-Relevance

The data model maps cleanly to a future Shopware setup:

- products can come from the Store API
- category filters can map to Shopware category/navigation data
- cart actions can map to line item endpoints
- checkout state can later use Shopware customer, shipping and payment flows

## Next Production Steps

1. Install Shopware 6 CE locally with Docker.
2. Seed demo products and categories in Shopware Admin.
3. Replace local product data with Store API reads.
4. Replace local cart state with Store API cart operations.
5. Add quality checks and portfolio screenshots.
