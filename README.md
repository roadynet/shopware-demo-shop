# SkillBuilder Shopware Admin API Integration

[![Portfolio Audit](https://github.com/roadynet/shopware-demo-shop/actions/workflows/portfolio-audit.yml/badge.svg)](https://github.com/roadynet/shopware-demo-shop/actions/workflows/portfolio-audit.yml)

Live demo: [https://sw.mcmonaco.de](https://sw.mcmonaco.de)

Connected SkillBuilder showcase: [roadynet/skillbuilder-showcase](https://github.com/roadynet/skillbuilder-showcase)

## Auf einen Blick

- **Was ist es?** Eine öffentliche Shopware-Storefront-Demo für veröffentlichte SkillBuilder-Lessons.
- **Tech-Stack:** Shopware 6, Shopware Admin API, Symfony-Importservice im SkillBuilder-Backend, HTML/CSS/JavaScript.
- **Warum interessant?** Das Projekt zeigt einen echten E-Commerce-Integrationspfad: Lernplattform-Inhalte werden serverseitig als Shopware-Produkte synchronisiert.
- **Demo-Schutz:** keine echten Bestellungen, keine Zahlung, keine Registrierung, kein Kontaktformular, keine Kundendaten.

## Senior-Level Review-Pfad

| Frage | Einstieg |
| --- | --- |
| Was wird demonstriert? | serverseitige Shopware Admin API Produktsynchronisation |
| Was macht die Demo sicher? | Storefront ohne Checkout, Zahlung, Registrierung und Kontaktformular |
| Was ist die wichtigste Integrationsentscheidung? | Lessons werden stabile Produkte, Updates ersetzen Duplikate |
| Was ist bewusst außerhalb des Scopes? | echte Bestellungen, Payment Capture, Kundenkonten, produktive Secrets |

Senior-Signale:

- Admin API Credentials liegen nicht im Frontend.
- Produktnummern sind stabil, damit Syncs idempotent bleiben.
- Veröffentlichungsstatus in SkillBuilder steuert Sichtbarkeit in Shopware.
- Die Storefront ist ein Portfolio-Demo-Shop, kein Verkaufssystem.

## Kleine Codebeispiele

Synchronisationspfad:

```text
SkillBuilder Admin -> Import Service -> Shopware Admin API -> Product Upsert -> Storefront
```

Statuslogik:

```text
published -> product active
draft     -> product hidden
archived  -> product deactivated
```

Mapping:

```text
Lesson title       -> product name
Lesson summary     -> product description
Stable lesson id   -> product number SB-COURSE-{id}
```

## Was gebaut wurde

- Admin-ausgelöster Produkt-Sync aus SkillBuilder
- Shopware Admin API Import für veröffentlichte Lessons
- stabile Produktnummern mit Update statt Duplikaten
- Aktivierung/Deaktivierung anhand des SkillBuilder-Status
- visuell an SkillBuilder angelehnte Storefront
- Demo-Warenkorb ohne Verkauf
- deaktivierte Registrierung, Login-Formulare und Kontaktformulare

## Architektur

![SkillBuilder to Shopware architecture](docs/architecture-flow.svg)

Der relevante Weg:

```text
SkillBuilder Admin -> Symfony Import Service -> Shopware Admin API -> Shopware Products -> Storefront
```

Lessons werden Produkte. Kapitel werden in dieser Demo nicht als Shopware-Kategorien synchronisiert. Die Produkte werden gesammelt der Kategorie `SkillBuilder Kurse` zugeordnet.

## Screenshots

### Storefront

![Shopware Demo Startseite](docs/screenshots/shop-home.png)

### Produktliste

![Shopware Produktliste](docs/screenshots/product-listing.png)

### SkillBuilder-Kurse in Shopware

![SkillBuilder Kurse als Shopware-Produkte](docs/screenshots/skillbuilder-category.png)

### Demo-Warenkorb ohne Verkauf

![Demo-Warenkorb ohne Verkauf](docs/screenshots/demo-cart.png)

## Sicherheit und Betrieb

- `.env.example` enthält nur Platzhalter.
- echte Shopware Admin API Zugangsdaten werden nicht committet.
- die eigentliche Admin API Integration läuft serverseitig im SkillBuilder-Backend.
- Storefront-JavaScript enthält keine Admin API Credentials.
- der öffentliche Shop ist sichtbar als Demo markiert und verarbeitet keine echten Bestellungen.

Kleine Config-Form:

```env
SHOPWARE_ADMIN_BASE_URL=
SHOPWARE_SYNC_CATEGORY_NAME=SkillBuilder Kurse
SHOPWARE_SYNC_PRODUCT_PREFIX=SB-COURSE-
```

## Business-Nutzen

- Lerninhalte müssen nicht doppelt in Lernplattform und Shop gepflegt werden.
- Nur freigegebene Inhalte erscheinen automatisch im Shop.
- Der Shop wird zur sichtbaren Commerce-Oberfläche für SkillBuilder-Inhalte.
- Produktpflege wird von manueller Shop-Administration zu einem wiederholbaren Datenprozess.

## Lokal starten

```bash
npm run dev
```

Danach ist die lokale Demo standardmäßig unter `http://127.0.0.1:5173` erreichbar.

## Grenzen

Dieses Projekt ist eine Integrations- und Storefront-Demo. Es ersetzt keine produktive Shopware-Installation mit Checkout, Payment, Kundendaten oder Bestellabwicklung.
