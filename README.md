# Shopware Demo Shop

Portfolio-Projekt fur einen Shopware-orientierten Demo-Shop mit direkter SkillBuilder-Anbindung.

**Kernidee:** SkillBuilder pflegt veroeffentlichte Kurse automatisch als Produkte in Shopware ein. Ein Admin-Button in SkillBuilder exportiert Lessons als Shopware-Produkte und Kapitel als Shopware-Kategorien. Der Shop ist damit nicht nur ein statischer Demo-Shop, sondern zeigt die Verbindung zwischen Lernplattform und E-Commerce.

Der lokale Prototyp zeigt einen kleinen Concept Store mit Produktkatalog, Suche, Kategorie-Filter, Warenkorb, Versandkostenlogik und Checkout-Simulation. Er ist bewusst ohne echte Kundendaten, Zahlungen oder produktive Shopware-Zugangsdaten gebaut.

## Warum dieses Projekt existiert

Das Projekt erweitert das Portfolio neben SkillBuilder um ein E-Commerce-Beispiel. Es zeigt, wie Inhalte aus SkillBuilder direkt in einen Shopware-Shop uebertragen werden koennen:

- SkillBuilder-Kurs = Shopware-Produkt
- SkillBuilder-Kapitel = Shopware-Kategorie
- nur veroeffentlichte SkillBuilder-Kurse werden im Shop sichtbar
- nicht mehr veroeffentlichte Kurse werden im Shop deaktiviert beziehungsweise ausgeblendet

Damit ist der Shop ein sichtbares Zielsystem fuer SkillBuilder-Inhalte und demonstriert eine realistische Admin-Automation statt nur ein isoliertes Frontend.

## Features

- Produktlisting mit Bildern, Kategorien, Preisen und Badges
- Suche und Kategorie-Filter
- Warenkorb mit Mengensteuerung
- Zwischensumme, Versandkosten und Gesamtbetrag
- Checkout-nahe Demo-Strecke ohne echte Zahlung
- responsive UI fur Desktop und Mobile
- dokumentierte SkillBuilder-zu-Shopware-Produktpipeline

## SkillBuilder Integration

In SkillBuilder gibt es im Admin-Bereich einen Button **Shopware Demo-Produkte**. Dieser Button stoesst den Import in Shopware an:

1. SkillBuilder liest alle Lessons mit Status `published`.
2. Fuer jede veroeffentlichte Lesson wird ein Shopware-Produkt mit der Produktnummer `SB-COURSE-{id}` erzeugt oder aktualisiert.
3. Die Kapitel der Lesson werden als Kategorien unterhalb von `SkillBuilder Kurse` angelegt.
4. Produkte und Kurs-Kategorien, die nicht mehr zu veroeffentlichten Lessons gehoeren, werden in Shopware deaktiviert beziehungsweise ausgeblendet.

Die Zugangsdaten zur Shopware Admin API liegen nicht in diesem Repository. Sie werden in der produktiven Umgebung ueber Environment-Variablen gesetzt.

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

- Import-Ergebnis im SkillBuilder Admin mit Detailprotokoll anzeigen
- Produktbilder und Preise aus SkillBuilder-Metadaten ableiten
- Warenkorb- und Checkout-Aktionen gegen Shopware-Endpunkte verdrahten
- Screenshots und Case Study wie im SkillBuilder-Showcase ergaenzen

## Hinweis zur lokalen Shopware-Installation

Die produktive Demo laeuft in einer echten Shopware-Installation. Dieses Repository dokumentiert und visualisiert den Shop-Auftritt und die SkillBuilder-Integration, enthaelt aber bewusst keine produktiven Shopware-Zugangsdaten, Datenbankdaten oder Server-Konfigurationen.
