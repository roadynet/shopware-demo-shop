# Shopware Demo Shop

Demo eines Shopware-orientierten E-Commerce-Projekts mit automatisierter SkillBuilder-Produktintegration.

**Kurz gesagt:** SkillBuilder pflegt veroeffentlichte Kurse per Admin-Button direkt als Produkte in einen Shopware-Shop ein. Lessons werden Produkte, Kapitel werden Kategorien, nicht mehr veroeffentlichte Kurse werden im Shop wieder deaktiviert oder ausgeblendet.

**Live-Demo:** [sw.mcmonaco.de](https://sw.mcmonaco.de)

**Status:** Demo-Shop, keine echten Bestellungen, keine Zahlung, kein Verkauf.

## Screenshots

### Storefront

![Shopware Demo Startseite](docs/screenshots/shop-home.png)

### Produktliste

![Shopware Produktliste](docs/screenshots/product-listing.png)

### SkillBuilder-Kurse in Shopware

![SkillBuilder Kurse als Shopware-Produkte](docs/screenshots/skillbuilder-category.png)

### Demo-Warenkorb ohne Verkauf

![Demo-Warenkorb ohne Verkauf](docs/screenshots/demo-cart.png)

## Features

- Produktkatalog
- Suche und Filter
- Warenkorb-Ansicht
- Checkout-nahe Demo ohne echte Zahlung
- sichtbarer Demo-Hinweis: keine Bestellung, keine Zahlung, kein Verkauf
- SkillBuilder-Import: veroeffentlichte Kurse werden als Shopware-Produkte erzeugt
- Kapitel aus SkillBuilder werden als Shopware-Kategorien abgebildet
- nicht mehr veroeffentlichte Kurse werden in Shopware deaktiviert oder ausgeblendet

## Tech Stack

- PHP / Symfony im SkillBuilder Backend
- Shopware 6 Konzepte und Admin API
- API-basierter Produktimport
- JavaScript
- HTML / CSS
- Git / GitHub

## SkillBuilder Integration

In SkillBuilder gibt es im Admin-Bereich den Button **Shopware Demo-Produkte**. Dieser Button stoesst den Import in Shopware an:

1. SkillBuilder liest alle Lessons mit Status `published`.
2. Fuer jede veroeffentlichte Lesson wird ein Shopware-Produkt mit der Produktnummer `SB-COURSE-{id}` erzeugt oder aktualisiert.
3. Die Kapitel der Lesson werden als Kategorien unterhalb von `SkillBuilder Kurse` angelegt.
4. Produkte und Kurs-Kategorien, die nicht mehr zu veroeffentlichten Lessons gehoeren, werden in Shopware deaktiviert beziehungsweise ausgeblendet.

Die Zugangsdaten zur Shopware Admin API liegen nicht in diesem Repository. Sie werden in der produktiven Umgebung ueber Environment-Variablen gesetzt.

### Code-Auszug

Der relevante Import-Code ist als bereinigtes Beispiel im Repository enthalten:

- [Symfony Admin Controller](examples/skillbuilder-shopware-import/AdminShopwareDemoProductController.php)
- [Shopware Admin API Import Service](examples/skillbuilder-shopware-import/ShopwareDemoProductImporter.php)

Das Beispiel zeigt die eigentliche Bridge-Logik ohne produktive Zugangsdaten.

## Business-Nutzen

Dieses Projekt zeigt einen realistischen Workflow fuer Anbieter digitaler Inhalte:

- Kursinhalte muessen nicht doppelt in Lernplattform und Shop gepflegt werden.
- Nur freigegebene Inhalte erscheinen automatisch im Shop.
- Der Shop wird zum sichtbaren Verkaufskanal fuer SkillBuilder-Inhalte.
- Admins koennen Produkte und Kategorien per Button synchronisieren.
- Die Integration verbindet Lernplattform, E-Commerce und Content-Automation.

## Warum dieses Projekt existiert

Das Projekt erweitert SkillBuilder um ein E-Commerce-Beispiel. Es zeigt nicht nur ein Frontend, sondern eine konkrete Verbindung zwischen Lernplattform und Shopware-naher Storefront.

Der Shop ist bewusst als Demo markiert. Es werden keine echten Kundendaten, Zahlungen oder produktiven Zugangsdaten verarbeitet.

## Lokal starten

```bash
npm run dev
```

Danach ist die lokale Demo standardmaessig unter `http://127.0.0.1:5173` erreichbar.

Alternativ kann `index.html` direkt im Browser geoeffnet werden.

## Naechste Schritte

- Import-Ergebnis im SkillBuilder Admin mit Detailprotokoll anzeigen
- Produktbilder und Preise aus SkillBuilder-Metadaten ableiten
- Warenkorb- und Checkout-Aktionen gegen echte Shopware-Endpunkte verdrahten
- weitere Screenshots oder kurzes Demo-Video ergaenzen
