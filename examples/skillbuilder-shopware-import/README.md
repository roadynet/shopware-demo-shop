# SkillBuilder to Shopware Import Example

This folder contains a sanitized excerpt of the SkillBuilder integration that exports published lessons into Shopware.

The example shows the relevant production idea without exposing credentials or server configuration:

- Symfony admin route with CSRF protection
- only published SkillBuilder lessons are exported
- lessons become Shopware products
- lessons are assigned to the `SkillBuilder Kurse` shop category
- chapters are not synchronized as Shopware categories
- missing or unpublished course products are deactivated
- obsolete child categories from earlier demo import attempts are hidden from navigation
- Shopware Admin API credentials are read from environment variables

Required environment variables:

```dotenv
SHOPWARE_ADMIN_BASE_URL="https://your-shop.example"
SHOPWARE_ADMIN_USERNAME="admin-user"
SHOPWARE_ADMIN_PASSWORD="admin-password"
```

No real credentials are stored in this repository.
