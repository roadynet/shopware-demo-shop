# SkillBuilder Shopware API Integration

**Live Demo (Portfolio): [https://sw.mcmonaco.de](https://sw.mcmonaco.de)**

Funktionsfaehige Shopware-Demo mit realer Synchronisation veroeffentlichter SkillBuilder-Kurse ueber die Shopware Admin API.

**Kurz gesagt:** SkillBuilder pflegt veroeffentlichte Kurse per Admin-Button direkt als Produkte in einen echten Shopware-Shop ein. Lessons werden Produkte, Kapitel werden Kategorien, nicht mehr veroeffentlichte Kurse werden im Shop wieder deaktiviert oder ausgeblendet.

**Eigenstaendig konzipiert und umgesetzt:** Shopware Admin API Integration, Produkt- und Kategorie-Synchronisation, Statussteuerung ueber `published`, Admin-Workflow per Button, Storefront-Demo und Demo-Shoplogik.

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

- reale Shopware Admin API Synchronisation
- SkillBuilder-Import: veroeffentlichte Kurse werden als Shopware-Produkte erzeugt
- Kapitel aus SkillBuilder werden als Shopware-Kategorien abgebildet
- Statussteuerung ueber `published`
- automatische Aktivierung und Deaktivierung von Produkten
- alte Kurs-Kategorien werden ausgeblendet
- Admin-Workflow per Button
- Environment-basierte API-Konfiguration
- Produktkatalog
- Suche und Filter
- Warenkorb-Ansicht
- Checkout-nahe Demo ohne echte Zahlung
- sichtbarer Demo-Hinweis: keine Bestellung, keine Zahlung, kein Verkauf

## Tech Stack

- PHP / Symfony im SkillBuilder Backend
- Shopware 6
- Shopware Admin API
- API-basierter Produkt- und Kategorieimport
- JavaScript
- HTML / CSS
- Git / GitHub

## API-basierte Produktsynchronisation

In SkillBuilder gibt es im Admin-Bereich den Button **Shopware Demo-Produkte**. Dieser Button stoesst den Import in Shopware an:

1. SkillBuilder liest alle Lessons mit Status `published`.
2. Fuer jede veroeffentlichte Lesson wird ein Shopware-Produkt mit der Produktnummer `SB-COURSE-{id}` erzeugt oder aktualisiert.
3. Die Kapitel der Lesson werden als Kategorien unterhalb von `SkillBuilder Kurse` angelegt.
4. Produkte und Kurs-Kategorien, die nicht mehr zu veroeffentlichten Lessons gehoeren, werden in Shopware deaktiviert beziehungsweise ausgeblendet.

Die Zugangsdaten zur Shopware Admin API liegen nicht in diesem Repository. Sie werden in der produktiven Umgebung ueber Environment-Variablen gesetzt.

Diese Integration laeuft gegen eine echte Shopware-Installation. Der oeffentliche Code-Auszug ist bereinigt, damit keine produktiven Zugangsdaten oder Serverdetails veroeffentlicht werden.

### Code-Auszug

Der relevante Import-Code ist als bereinigtes Beispiel im Repository enthalten:

- [Symfony Admin Controller](examples/skillbuilder-shopware-import/AdminShopwareDemoProductController.php)
- [Shopware Admin API Import Service](examples/skillbuilder-shopware-import/ShopwareDemoProductImporter.php)

Das Beispiel zeigt die eigentliche Bridge-Logik ohne produktive Zugangsdaten.

## Business-Nutzen

Dieses Projekt zeigt einen realen Workflow fuer Anbieter digitaler Inhalte:

- Kursinhalte muessen nicht doppelt in Lernplattform und Shop gepflegt werden.
- Nur freigegebene Inhalte erscheinen automatisch im Shop.
- Der Shop wird zum sichtbaren Verkaufskanal fuer SkillBuilder-Inhalte.
- Admins koennen Produkte und Kategorien per Button synchronisieren.
- Die Integration verbindet Lernplattform, E-Commerce und Content-Automation.
- Produktpflege wird von manueller Shop-Administration zu einem wiederholbaren Datenprozess.

## Warum dieses Projekt existiert

Das Projekt erweitert SkillBuilder um eine produktionsnahe E-Commerce-Integration. Es zeigt nicht nur ein Frontend, sondern eine konkrete Verbindung zwischen Lernplattform, Shopware Admin API und Storefront.

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
