# Demo Script

## Goal

Show the Shopware demo as the visible storefront for the SkillBuilder integration. The key message is that published SkillBuilder lessons are synchronized as Shopware products through the Shopware Admin API.

## 2-Minute Demo

1. Open the Shopware demo storefront.
2. Point out the no-sale banner: no orders, no payment, no real sale.
3. Show the product list.
4. Explain that the visible products come from published SkillBuilder lessons.
5. Open the cart drawer or demo cart section and show that ordering is disabled.
6. Name the integration path:

```text
SkillBuilder Admin -> Symfony Import Service -> Shopware Admin API -> Shopware products -> Storefront
```

7. State the boundary clearly: chapters are not synchronized as Shopware categories.

## 5-Minute Demo

1. Start with the business problem: digital learning content should not be copied manually into a shop.
2. Explain SkillBuilder as the source system for lessons.
3. Explain the admin import:
   - only `published` lessons are read
   - products use stable product numbers
   - existing products are updated
   - products for unpublished lessons are deactivated
4. Show the storefront:
   - product listing
   - search/filter behavior
   - product cards
   - cart preview
5. Show the demo guardrails:
   - no checkout completion
   - no registration
   - no contact form
   - no payment provider
6. Mention that credentials and production details are configured outside GitHub.
7. Close with the portfolio value: Symfony integration work, Shopware Admin API, storefront presentation, and safe public documentation.

## Key Sentences

- "This is a real Shopware Admin API integration, not only a static frontend idea."
- "Published SkillBuilder lessons become Shopware products."
- "Chapters do not become categories."
- "The shop is intentionally demo-only and does not process orders or customer data."
- "The public code is sanitized and contains no credentials."

## Questions To Expect

### Is the storefront allowed to sell products?

No. The storefront is explicitly a portfolio demo. Orders, payments, registration, contact forms, and checkout completion are disabled.

### Why does the shop still have a cart view?

The cart is a UX demonstration. It shows a familiar e-commerce flow without allowing an order to be placed.

### What is synchronized?

Published SkillBuilder lessons are synchronized as Shopware products. Product visibility follows the SkillBuilder publication status.

### What is not synchronized?

Chapters are not synchronized as Shopware categories. They remain learning-structure data inside SkillBuilder.

### What would be next for production?

Better product metadata, richer product detail pages, stronger sync logs, automated scheduled syncs, and extended monitoring.
