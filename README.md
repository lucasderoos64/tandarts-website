# Tandartspraktijk Lissane Schoots

Professionele Nederlandstalige website met patiëntenportaal en adminomgeving voor een nieuwe tandartspraktijk in Huizen.

## Wat zit erin

- Publieke site met home, behandelingen, tarieven/portaaluitleg, spoed, inschrijven en afspraak maken.
- Patiëntenportaal met profiel, MFA-status, afspraken, dossier, toestemmingen en facturen.
- Adminomgeving voor agenda, patiënten, dossierbeheer, facturen en auditlog.
- Prisma datamodel voor PostgreSQL met `User`, `PatientProfile`, `StaffProfile`, `Appointment`, `TreatmentType`, `MedicalRecordEntry`, `Invoice`, `Document`, `Consent` en `AuditLog`.
- API-routes voor afspraakverzoeken, wijzigingsregels, documentdownload-autorisatie en auditlogging.

## Lokaal starten

Installeer eerst dependencies:

```powershell
npm install
```

Maak daarna een `.env` op basis van `.env.example` en start PostgreSQL. Vervolgens:

```powershell
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

Open daarna `http://localhost:3000`.

## Belangrijke routes

- `/` publieke website
- `/afspraak` online afspraak maken
- `/inschrijven` nieuwe patiënt
- `/spoed` spoedinformatie
- `/portal` demo patiëntenportaal
- `/admin` demo adminomgeving

## Productiechecklist

Voor echte medische gegevens is dit nog niet klaar om blind live te zetten. Rond minimaal dit af:

- Auth vervangen door echte provider of eigen magic-link/wachtwoord flow met verplichte MFA.
- Prisma client aansluiten op alle API-routes en demo-data vervangen door databasequeries.
- Private object storage aansluiten voor facturen, röntgenfoto's en documenten.
- Auditlog afdwingen in middleware/service-laag bij elke dossierinzage en download.
- DPIA uitvoeren en verwerkersovereenkomsten vastleggen.
- NEN 7510/NEN 7512/NEN 7513-toets laten doen waar passend.
- Backups, bewaartermijnen, loggingretentie en incidentprocedure documenteren.
- Penetratietest of securityreview uitvoeren voor productie.

## Ontwerpkeuze

De eerste versie gebruikt een rustige premium uitstraling: veel witruimte, warme accenten, duidelijke navigatie en compacte portaal/adminschermen die geschikt zijn voor herhaald gebruik door patiënten en praktijkteam.
