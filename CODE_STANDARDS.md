# Code Standards

## 1. Ziel

Diese Code Standards definieren gemeinsame Regeln für die Entwicklung im Gruppenprojekt. Ziel ist es, den Code sauber, verständlich, wartbar und konsistent zu halten.

Die Regeln gelten für alle Teammitglieder und sollen unabhängig davon eingehalten werden, wer welchen Teil des Projekts entwickelt.


## 2. Code Formatting & Linting

* Der gesamte Code wird vor dem Commit formatiert und gelintet.
* Für die automatische Formatierung wird Prettier verwendet.
* Linting-Regeln werden über das im Projekt konfigurierte Linting-Tool umgesetzt.
* Formatierungs- und Linting-Fehler sollen vor dem Commit behoben werden.
* Es werden keine individuellen Formatierungsstile innerhalb einzelner Dateien verwendet.
* IDE-Einstellungen sollen möglichst mit der Projektkonfiguration übereinstimmen.



## 3. Naming Conventions

Namen sollen eindeutig und verständlich sein.

### Allgemein

* Variablen, Funktionen und Methoden sollen aussagekräftige Namen haben.
* Abkürzungen werden vermieden, sofern sie nicht allgemein etabliert sind.

### Dateien

Dateinamen folgen der im jeweiligen Framework bzw. Projekt verwendeten Konvention.
Neue Dateien sollen keine unnötig komplizierten oder uneinheitlichen Namensschemata einführen.


## 4. YAGNI: You Aren't Gonna Need It

Wir orientieren uns am **YAGNI-Prinzip**.

> Implementiere nur, was aktuell benötigt wird.

Das bedeutet:

* Keine Features "für später" implementieren.
* Keine unnötigen Abstraktionen erstellen.
* Keine Frameworks oder Libraries hinzufügen, wenn die bestehende Lösung ausreicht.
* Code nicht unnötig verallgemeinern.
* Erst dann abstrahieren, wenn ein konkreter Bedarf besteht.

**Einfacher Code ist bevorzugt gegenüber unnötig komplexem Code.**



## 5. DRY: Don't Repeat Yourself

Code soll nicht unnötig dupliziert werden.

Dabei gilt jedoch:

* Nicht jede ähnliche Codezeile muss sofort abstrahiert werden.
* Abstraktionen müssen einen tatsächlichen Mehrwert bieten.
* YAGNI und Lesbarkeit haben Vorrang vor erzwungenen Abstraktionen.

Eine kleine, verständliche Duplizierung kann besser sein als eine komplizierte Abstraktion.


## 6. Lesbarkeit

Code wird lesbar verfasst, damit jedes Gruppenmitglied diesen verstehen kann.

Daher:

* Funktionen und Methoden sollen möglichst eine klar erkennbare Aufgabe haben.
* Komplexe Logik soll nachvollziehbar strukturiert sein.
* Verschachtelungen sollen möglichst gering gehalten werden.
* Nicht verwendete Variablen, Imports und Funktionen werden entfernt.




## 7. Conventional Commits

Für Commit-Nachrichten verwenden wir Conventional Commits.

### Format

```text
<type>: <description> (#ticket_number)
```

### Beispiele

```text
feat: add login validation (#32)
fix: handle missing user response (#51)
docs: update setup instructions (#67)
```

### Häufig verwendete Types

| Type   | Verwendung     |
|--------|----------------|
| `feat` | Neues Feature  |
| `fix`  | Fehlerbehebung |
| `docs` | Dokumentation  |

Commit-Nachrichten sollen:

* kurz und verständlich sein,
* im Imperativ formuliert werden,
* eine konkrete Änderung beschreiben,
* keine unnötigen Informationen enthalten.

---

## 8. Branches

Branches werden von den Issues aus erstellt und übernehmen das automatisch generierte Naming.
Ein Branch ist auf je ein Issue beschränkt und behandelt somit nur ein Feature.


## 9. Pull Requests 

Vor dem Mergen wird jeder Pull Request überprüft.

- Klare Beschreibung der Änderung
- Kleine, zusammenhängende Änderungen
- Code ist formatiert und gelintet
- Relevante Tests vorhanden
- Code Review durchgeführt

Das Review fokussiert sich auf Codequalität, Funktionalität, Tests und Einhaltung der Standards.

## 10. Testing

Vitest wird für Funktionstests und LocalStorage-Tests verwendet.
Playwright wird für UI- und E2E-Tests verwendet.
Neue Funktionalitäten sollen, soweit sinnvoll, durch Tests abgesichert werden.
Wir streben eine Function Coverage von 60% an.

## 11. Dependencies

Neue Libraries und Dependencies werden nicht ohne Grund hinzugefügt.

Vor dem Hinzufügen einer Dependency sollte geprüft werden:

* Wird sie tatsächlich benötigt?
* Kann die Funktionalität mit bereits vorhandenen Libraries umgesetzt werden?
* Ist die Dependency aktiv gepflegt?
* Entstehen zusätzliche Sicherheits- oder Wartungsrisiken?

Auch hier gilt das **YAGNI-Prinzip**.



## 12. Keine unnötigen Änderungen

Bei Änderungen am Code sollen möglichst nur die tatsächlich notwendigen Dateien und Zeilen verändert werden.

Vermeiden:

* unbeteiligten Code refactoren,
* Variablen ausserhalb des eigenen Tasks umbenennen,
* unnötige Dependency-Updates,
* Änderungen ohne Bezug zum aktuellen Feature oder Bugfix.

Das macht Reviews einfacher und reduziert das Risiko, unbeabsichtigt bestehende Funktionalität zu verändern.

---

## 13. Definition of Done

Eine Änderung gilt grundsätzlich als fertig, wenn:

- der Code formatiert ist,
- der Linter ohne relevante Fehler durchläuft,
- der Code verständlich und wartbar ist,
- unnötige Komplexität vermieden wurde,
- relevante Tests vorhanden und erfolgreich sind,
- keine Secrets oder sensiblen Daten enthalten sind,
- der Commit den Conventional Commits Regeln entspricht,
- der Branch korrekt benannt ist,
- der Pull Request nachvollziehbar beschrieben ist,
- das Code Review durchgeführt wurde.

--- 

Diese Standards sollen nicht dazu dienen, Entwicklung unnötig zu verkomplizieren. Sie sollen eine gemeinsame Grundlage schaffen, damit alle Teammitglieder den Code schnell verstehen, erweitern und warten können.
