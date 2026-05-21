# Shopware Demo Shop

Portfolio-Projekt fur einen Shopware-orientierten Demo-Shop.

Der lokale Prototyp zeigt einen kleinen Concept Store mit Produktkatalog, Suche, Kategorie-Filter, Warenkorb, Versandkostenlogik und Checkout-Simulation. Er ist bewusst ohne echte Kundendaten, Zahlungen oder produktive Shopware-Zugangsdaten gebaut.

## Warum dieses Projekt existiert

Das Projekt erweitert das Portfolio neben SkillBuilder um ein E-Commerce-Beispiel. Es zeigt, wie ein Shopware-Frontend oder eine Shopware-nahe Demo strukturiert werden kann, bevor eine echte Shopware-Installation, Store-API-Anbindung oder Theme-Entwicklung folgt.

## Features

- Produktlisting mit Bildern, Kategorien, Preisen und Badges
- Suche und Kategorie-Filter
- Warenkorb mit Mengensteuerung
- Zwischensumme, Versandkosten und Gesamtbetrag
- Checkout-nahe Demo-Strecke ohne echte Zahlung
- responsive UI fur Desktop und Mobile

## Tech Stack

- HTML
- CSS
- JavaScript
- CSS ohne externes UI-Framework

## Lokal starten

```bash
npm run dev
```

Danach ist die Demo standardmassig unter `http://127.0.0.1:5173` erreichbar.

Alternativ kann `index.html` direkt im Browser geoffnet werden.

## Shopware-Ausbaupfad

Naechste sinnvolle Schritte:

- echte Shopware 6 CE Installation mit Docker und Shopware CLI
- Produktdaten ueber die Shopware Store API laden
- Warenkorb- und Checkout-Aktionen gegen Shopware-Endpunkte verdrahten
- Admin API fur Demo-Produktpflege einrichten
- Screenshots und Case Study wie im SkillBuilder-Showcase ergaenzen

## Hinweis zur lokalen Shopware-Installation

Die offizielle Shopware-Dokumentation empfiehlt aktuell Docker mit `shopware-cli project create`. Auf diesem System ist Docker derzeit nicht installiert, daher ist dieses Repository zuerst als sofort lauffaehiger Portfolio-Prototyp angelegt.
