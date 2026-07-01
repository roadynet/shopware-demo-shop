# OPERATIONS.md - Shopware Demo Storefront

Dieses Runbook beschreibt den sicheren Betrieb der öffentlichen Shopware-
Storefront-Demo. Die Demo ist bewusst ein No-Sale-System: sichtbar, klickbar,
aber ohne echte Bestellungen, Zahlungen oder Kundendaten.

Live-Demo: [sw.mcmonaco.de](https://sw.mcmonaco.de)

## Umgebung und Serverpfade

| Bereich | Konzept |
| --- | --- |
| Live-Demo | `https://sw.mcmonaco.de` |
| Repository | öffentliche Storefront-/Integrationsevidence |
| Datenquelle | SkillBuilder-Backend über serverseitige Shopware Admin API |
| produktive Pfade | nicht öffentlich dokumentiert |
| Secrets | nicht im Storefront-Repo, nur serverseitig im Backend |

Die eigentliche Admin-API-Kommunikation liegt im SkillBuilder-Backend. Dieses
Repo dokumentiert Storefront, Demo-Schutz und Integrationsgrenze.

## Deployment-Ablauf

1. Storefront-/Dokumentationsänderungen prüfen.
2. statische Assets oder Demo-Dateien deployen.
3. Cache/CDN/Browsercache bei sichtbaren UI-Änderungen berücksichtigen.
4. Live-Smoke-Check:

   ```text
   Startseite
   Produktliste
   Produktdetail
   Demo-Warenkorb
   Hinweis "Kauf/Zahlung deaktiviert"
   ```

5. Shopware-Sync aus SkillBuilder nur serverseitig auslösen.

## Env- und Secrets-Konzept

- keine Shopware Admin API Credentials im Frontend
- keine Admin Tokens in JavaScript
- `.env.example` enthält nur Platzhalter
- echte API-Zugangsdaten liegen im SkillBuilder-Backend oder serverseitig

Typische Konfiguration:

```text
SHOPWARE_ADMIN_BASE_URL
SHOPWARE_ADMIN_CLIENT_ID
SHOPWARE_ADMIN_CLIENT_SECRET
SHOPWARE_SYNC_CATEGORY_NAME
SHOPWARE_SYNC_PRODUCT_PREFIX
```

## Datenbankmigrationen

Dieses Repo enthält keine eigene produktive Datenbankmigration. Shopware selbst
wird als Zielsystem betrachtet. Relevante Datenprozesse:

- SkillBuilder-Lesson wird veröffentlicht
- Importservice erzeugt stabilen Product-Upsert
- Shopware zeigt Produkt in der Demo-Storefront

## Rollback-Idee

1. vorherige Storefront-Version deployen
2. Demo-Hinweise und deaktivierten Checkout zuerst prüfen
3. bei fehlerhaften Produktdaten: Sync im Backend pausieren
4. fehlerhafte Produkte per stabiler Produktnummer korrigieren statt Duplikate
   erzeugen

## Typische Fehlerfälle

| Fehlerbild | Ursache | Prüfung / Fix |
| --- | --- | --- |
| Demo wirkt kaufbar | Hinweis/Checkout-Sperre fehlt | Storefront-Konfiguration prüfen |
| Produkt fehlt | Lesson nicht veröffentlicht oder Sync fehlgeschlagen | SkillBuilder-Sync prüfen |
| Produkt doppelt | instabile Produktnummer | Mapping `SB-COURSE-{id}` prüfen |
| Bild/Listing alt | Cache oder Shopware-Indexierung | Cache/Index prüfen |
| API-Fehler | Backend-Credentials oder Shopware erreichbar? | Backend-Logs prüfen, nicht im Frontend debuggen |

## Logs und Debugging

Debugging-Schwerpunkt liegt im Backend, nicht in der Storefront:

```text
SkillBuilder Admin Sync
Shopware Admin API Response
stabile Produktnummer
Storefront-Sichtbarkeit
Demo-Checkout-Sperre
```

Frontend-seitig wird geprüft:

```text
Browser-Konsole
Netzwerkfehler
sichtbare Demo-Hinweise
Produkt-URL
```

## Monitoring-Ansatz

- GitHub Actions Portfolio Audit
- Live-Smoke-Check der Storefront
- manuelle Kontrolle der Demo-Checkout-Sperre
- Prüfung, dass keine Registrierungs-/Payment-Flows aktiv sind
- Sync-Ergebnis über SkillBuilder/Shopware kontrollieren

## Praxisnachweis

- [Production Evidence](docs/production-evidence.md)
- [Demo Script](docs/demo-script.md)
- [Case Study](docs/case-study.md)
- [SkillBuilder Showcase](https://github.com/roadynet/skillbuilder-showcase)
