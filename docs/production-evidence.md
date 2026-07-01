# Production Evidence - Shopware Demo Storefront

Diese Demo zeigt den sicheren E-Commerce-Teil der SkillBuilder-Integration:
veröffentlichte Lerninhalte werden serverseitig per Shopware Admin API als
Produkte sichtbar gemacht. Die öffentliche Storefront ist bewusst als No-Sale-
Demo betrieben.

Live-Demo: [sw.mcmonaco.de](https://sw.mcmonaco.de)

## Belegbare Praxis

| Bereich | Evidence | Was es zeigt |
| --- | --- | --- |
| Shopware-Integration | Produktdaten werden aus SkillBuilder synchronisiert | reale Admin-API-Integrationslogik |
| Storefront-Sicherheit | Checkout, Zahlung, Registrierung und Kontaktformular deaktiviert | Demo-Betrieb ohne Kundendatenrisiko |
| Idempotenz | stabile Produktnummern `SB-COURSE-{id}` | Updates statt Duplikate |
| Secret-Grenze | Admin API Credentials liegen im Backend, nicht in JavaScript | sichere API-Architektur |
| Betriebsdokumentation | Demo-Skript, Architekturflow, Screenshots | prüfbare Integration |

## Betriebsfälle

### 1. Demo-Shop ohne echte Bestellungen

**Problem:** Ein öffentlich sichtbarer Shop darf im Portfolio keine echten
Bestellungen, Zahlungen oder Kundendaten erzeugen.

**Lösung:**

- Storefront öffentlich erreichbar
- Kauf- und Zahlungsfluss deaktiviert
- Demo-Hinweise sichtbar
- keine Registrierung, kein Kontaktformular, keine Kundendatenannahme

**Praxis-Signal:** Öffentliche Demos werden sicher betrieben und fachlich klar
vom echten Verkauf getrennt.

### 2. SkillBuilder-Inhalte als Shopware-Produkte

**Ziel:** Veröffentlichte Lerninhalte müssen nicht doppelt gepflegt werden.

```text
SkillBuilder Admin -> Symfony Import Service -> Shopware Admin API -> Product Upsert -> Storefront
```

**Praxis-Signal:** wiederholbarer Integrationspfad mit stabilen IDs, Statuslogik
und Zielsystem-Mapping.

### 3. Keine Admin API Credentials im Frontend

**Problem:** Storefront-JavaScript wäre für Admin-Credentials ungeeignet.

**Lösung:** Die produktive Admin API Kommunikation liegt serverseitig im
SkillBuilder-Backend; dieses Repository dokumentiert die Storefront- und
Integrationsgrenze.

**Praxis-Signal:** Security-Grundsatz für E-Commerce-Integrationen verstanden:
Admin-Schreibzugriffe gehören nicht in den Browser.

## Interview-Demo in 3 Minuten

1. Storefront öffnen: [sw.mcmonaco.de](https://sw.mcmonaco.de)
2. SkillBuilder-Kategorie und Produktliste zeigen
3. Demo-Warenkorb ohne Verkauf zeigen
4. Mapping erklären: Lesson title -> product name, stable id -> product number
5. Secret-Grenze erklären: Backend schreibt, Frontend zeigt

## Bewusst nicht veröffentlicht

- Shopware Admin API Zugangsdaten
- echte Kundendaten
- Bestellungen oder Zahlungen
- produktive Shopware-Serverkonfiguration
