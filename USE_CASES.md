# Fachliche Use Cases

In dieser Dokumentation werden alle fachlichen Use Cases für die Webapplikation SaveYourTiers beschrieben.
Es geht dabei darum, klarzustellen, welche Funktionalitäten die Applikation bieten soll und wie diese von
den Nutzern verwendet werden können. Es ist ausserdem wichtig klarzustellen, welche Benutzerinteraktionen relevant sind.

## Funktionen

Alle Funktionen der Applikation sind in Use Cases unterteilt. Jeder Use Case beschreibt **eine** spezifische Funktionalität.

### Use Case 1 (UC1): Neue Tierlist erstellen

Es muss eine neue Tierlist über die Startseite erstellt werden können. Dies soll über einen Button erfolgen. Beim klick auf den Button
erscheint ein Eingabefenster, in welchem der Benutzer einen Titel sowie optional eine Beschreibung und ein Bild einfügen kann. Die erstellte
Tierlist wird direkt geöffnet und wird anschliessend auf der Startseite in einer Kachel angezeigt.

Fazit:
- Button
- Eingabemaske
- Angaben: *Titel, Beschreibung, Bild
- Anzeigen der erstellten Tierlist in einer Kachel

## Use Case 2 (UC2): Tierlist bearbeiten

Sobald eine Tierlist erstellt wurde, ist sie bereit, bearbeitet / befüllt zu werden. Sie wird direkt nach dem Erstellen geöffnet oder von der
Startseite aufgerufen. Initial ist ein leers "Board" zu sehen mit den bereits vorhandenen Tiers **S, A, B, D und F**. Diese sind standardmässig
gegeben, können jedoch über einen editier-Button bearbeitet werden. Es öffnet sich ein neues Fenster, wo man die Tiers per Drag'n Drop in der Reihe
verschieben, ihre Namen ändern und die Hintergrundfarbe anpassen kann. Diese Einstellungen kann man speichern oder verwerfen.

In der unteren Leiste ist ein Plus-Icon ersichtlich, mit welchem man die Elemente erstellen kann. Es öffnet sich wieder ein neues Fenster, bei welchem
man eine Bezeichnung und Hintergrundfarbe oder nur ein Bild angeben kann. Die erstellten Elemente werden als Kachel im unteren Bereich angezeigt und
können per Drag n' drop in die jeweilige Tier gezogen werden. Diese Elemente können im Nachhinein auch noch bearbeitet werden. Beim Erstellen dieser
Elemente wird automatisch ein nächstes "Erstellen-Fenster" geöffnet. Dies bedeutet, dass man den Prozess manuell beenden muss. Dies ist aus UX-Sicht
angenehm, da typischerweise mehrere Elemente auf einmal erstellt werden.

Fazit:
- Initial leeres Board mit preset Tiers
- Tiers
- Elemente auswahlboard
- Eingabemaske
- Angaben bei Tiers: *Name, Hintergrundfarbe
- Angaben bei Elementen: *Bild oder Text, Hintergrundfarbe


## Use Case 3 (UC3): Tierlist exportieren

Wenn der Benutzer eine Tierlist erstellt hat, kann er mithilfe eines Export-Icons am Rand die Tierliste als PNG exportieren.
Die Liste wird auf den Desktop heruntergeladen. Das Export-Icon soll immer ersichtlich sein und eine kurze bestätigung einfordern,
ob der Benutzer wirklich einen Export erstellen möchte.

Fazit:
- Button
- Export to PNG-Funktion


## User Experience

Die Anwendung soll einfach und übersichtlich bedienbar sein. Das Design ist deshalb minimalistisch und auf die wichtigsten Funktionen
ausgerichtet. Buttons und Icons sollen klar erkennbar und verständlich beschriftet sein.

### Orientierung und Navigation

- Die Startseite zeigt die Tierlists als Kacheln.
- Eine neue Tierlist kann über einen gut sichtbaren Button erstellt werden.
- Nach dem Erstellen wird die Tierlist direkt geöffnet.
- Die wichtigsten Funktionen im Editor (Tiers bearbeiten, Elemente hinzufügen und Exportieren) sollen schnell erreichbar sein.

### Interaktionen und Rückmeldungen

- Pflichtfelder werden klar gekennzeichnet und Fehlermeldungen verständlich angezeigt.
- Elemente und Tiers können per Drag-and-drop verschoben werden.
- Beim Speichern, Verwerfen und Exportieren erhält der Benutzer eine Rückmeldung oder Bestätigung.
- Nach dem Erstellen eines Elements öffnet sich direkt das nächste Eingabefenster. So können mehrere Elemente nacheinander erstellt werden.

### Darstellung und Zugänglichkeit

- Die Tierlist steht im Mittelpunkt und das Auswahlboard befindet sich unten.
- Die Anwendung soll auch auf kleineren Bildschirmen gut bedienbar sein.
- Farben dürfen nicht die einzige Möglichkeit sein, Tiers zu unterscheiden.

### Speicherung und Vertrauen

Die Tierlists werden lokal im Browser gespeichert. Deshalb ist kein Login nötig. Beim Export wird die Tierlist als PNG auf das Gerät
heruntergeladen und kann danach einfach geteilt werden.
