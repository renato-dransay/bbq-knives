import { Metadata } from "next"

export const metadata: Metadata = {
  title: "AGB | BBQ Knives",
  description:
    "Allgemeine Geschäftsbedingungen von BBQ Knives für den Online-Shop.",
}

export default function AGBPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-ui-fg-base mb-8">
          Allgemeine Geschäftsbedingungen
        </h1>

        <div className="space-y-8 text-ui-fg-muted">
          {/* § 1 Geltungsbereich */}
          <section className="bg-ui-bg-subtle rounded-xl p-6 border border-ui-border-base">
            <h2 className="text-xl font-semibold text-ui-fg-base mb-4">
              § 1 Geltungsbereich
            </h2>
            <p className="mb-4">
              (1) Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB")
              gelten für alle Verträge, die zwischen
            </p>
            <address className="not-italic mb-4 pl-4 border-l-2 border-amber-600">
              <p className="font-semibold text-ui-fg-base">BBQ Knives</p>
              <p>Max Mustermann</p>
              <p>Musterstraße 123</p>
              <p>12345 Musterstadt</p>
            </address>
            <p className="mb-4">
              (nachfolgend „Verkäufer") und dem Kunden (nachfolgend „Käufer")
              über den Online-Shop des Verkäufers geschlossen werden.
            </p>
            <p className="mb-4">
              (2) Verbraucher im Sinne dieser AGB ist jede natürliche Person,
              die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend
              weder ihrer gewerblichen noch ihrer selbständigen beruflichen
              Tätigkeit zugerechnet werden können.
            </p>
            <p>
              (3) Unternehmer im Sinne dieser AGB ist eine natürliche oder
              juristische Person oder eine rechtsfähige Personengesellschaft,
              die bei Abschluss eines Rechtsgeschäfts in Ausübung ihrer
              gewerblichen oder selbständigen beruflichen Tätigkeit handelt.
            </p>
          </section>

          {/* § 2 Vertragsschluss */}
          <section className="bg-ui-bg-subtle rounded-xl p-6 border border-ui-border-base">
            <h2 className="text-xl font-semibold text-ui-fg-base mb-4">
              § 2 Vertragsschluss
            </h2>
            <p className="mb-4">
              (1) Die im Online-Shop des Verkäufers enthaltenen
              Produktbeschreibungen stellen keine verbindlichen Angebote
              seitens des Verkäufers dar, sondern dienen zur Abgabe eines
              verbindlichen Angebots durch den Käufer.
            </p>
            <p className="mb-4">
              (2) Der Käufer kann das Angebot über das in den Online-Shop des
              Verkäufers integrierte Online-Bestellformular abgeben. Dabei gibt
              der Käufer, nachdem er die ausgewählten Waren in den virtuellen
              Warenkorb gelegt und den elektronischen Bestellprozess durchlaufen
              hat, durch Klicken des den Bestellvorgang abschließenden Buttons
              ein rechtlich verbindliches Vertragsangebot in Bezug auf die im
              Warenkorb enthaltenen Waren ab.
            </p>
            <p className="mb-4">
              (3) Der Verkäufer kann das Angebot des Käufers innerhalb von fünf
              Tagen annehmen, indem er dem Käufer eine schriftliche
              Auftragsbestätigung oder eine Auftragsbestätigung in Textform
              (Fax oder E-Mail) übermittelt, wobei insoweit der Zugang der
              Auftragsbestätigung beim Käufer maßgeblich ist, oder indem er dem
              Käufer die bestellte Ware liefert, wobei insoweit der Zugang der
              Ware beim Käufer maßgeblich ist.
            </p>
            <p>
              (4) Der Vertragstext wird vom Verkäufer gespeichert und dem Käufer
              nach Absendung seiner Bestellung nebst den vorliegenden AGB per
              E-Mail zugeschickt.
            </p>
          </section>

          {/* § 3 Preise und Zahlung */}
          <section className="bg-ui-bg-subtle rounded-xl p-6 border border-ui-border-base">
            <h2 className="text-xl font-semibold text-ui-fg-base mb-4">
              § 3 Preise und Zahlung
            </h2>
            <p className="mb-4">
              (1) Die vom Verkäufer angegebenen Preise sind Endpreise und
              enthalten die gesetzliche Umsatzsteuer. Gegebenenfalls zusätzlich
              anfallende Liefer- und Versandkosten werden in der jeweiligen
              Produktbeschreibung gesondert angegeben.
            </p>
            <p className="mb-4">
              (2) Bei Lieferungen in Länder außerhalb der Europäischen Union
              können im Einzelfall weitere Kosten anfallen, die der Verkäufer
              nicht zu vertreten hat und die vom Käufer zu tragen sind. Hierzu
              zählen beispielsweise Kosten für die Geldübermittlung durch
              Kreditinstitute oder Einfuhrabgaben (Zölle, Einfuhrumsatzsteuer).
            </p>
            <p className="mb-4">
              (3) Der Käufer hat folgende Zahlungsmöglichkeiten:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Kreditkarte (Visa, Mastercard, American Express)</li>
              <li>PayPal</li>
              <li>Sofortüberweisung</li>
            </ul>
            <p>
              (4) Ist Vorauskasse vereinbart, ist die Zahlung sofort nach
              Vertragsabschluss fällig.
            </p>
          </section>

          {/* § 4 Lieferung */}
          <section className="bg-ui-bg-subtle rounded-xl p-6 border border-ui-border-base">
            <h2 className="text-xl font-semibold text-ui-fg-base mb-4">
              § 4 Lieferung
            </h2>
            <p className="mb-4">
              (1) Die Lieferung erfolgt an die vom Käufer angegebene
              Lieferadresse.
            </p>
            <p className="mb-4">
              (2) Lieferungen sind derzeit nur nach Deutschland möglich.
            </p>
            <p className="mb-4">
              (3) Die vom Verkäufer angegebene Lieferzeit berechnet sich, sofern
              im Einzelfall keine abweichenden Angaben gemacht werden, vom Tag
              nach Zahlungseingang.
            </p>
            <p className="mb-4">
              (4) Bei handgefertigten Messern kann die Lieferzeit aufgrund der
              individuellen Fertigung länger sein. Der Käufer wird über die
              voraussichtliche Lieferzeit informiert.
            </p>
            <p>
              (5) Sollte die bestellte Ware nicht verfügbar sein, ist der
              Verkäufer zu Teillieferungen berechtigt, sofern dies für den
              Käufer zumutbar ist.
            </p>
          </section>

          {/* § 5 Eigentumsvorbehalt */}
          <section className="bg-ui-bg-subtle rounded-xl p-6 border border-ui-border-base">
            <h2 className="text-xl font-semibold text-ui-fg-base mb-4">
              § 5 Eigentumsvorbehalt
            </h2>
            <p>
              Die gelieferte Ware bleibt bis zur vollständigen Bezahlung
              Eigentum des Verkäufers.
            </p>
          </section>

          {/* § 6 Gewährleistung */}
          <section className="bg-ui-bg-subtle rounded-xl p-6 border border-ui-border-base">
            <h2 className="text-xl font-semibold text-ui-fg-base mb-4">
              § 6 Gewährleistung
            </h2>
            <p className="mb-4">
              (1) Für die Gewährleistung gelten die gesetzlichen Bestimmungen.
            </p>
            <p className="mb-4">
              (2) Bei Unternehmern beträgt die Verjährungsfrist für
              Gewährleistungsansprüche ein Jahr ab Gefahrübergang.
            </p>
            <p>
              (3) Hinweis: Verfärbungen (Patina) auf Kohlenstoffstahl- und
              Damaststahlklingen sind normal und stellen keinen Mangel dar.
              Bitte beachten Sie unsere Pflegehinweise.
            </p>
          </section>

          {/* § 7 Haftungsbeschränkung */}
          <section className="bg-ui-bg-subtle rounded-xl p-6 border border-ui-border-base">
            <h2 className="text-xl font-semibold text-ui-fg-base mb-4">
              § 7 Haftungsbeschränkung
            </h2>
            <p className="mb-4">
              (1) Der Verkäufer haftet unbeschränkt für Vorsatz und grobe
              Fahrlässigkeit.
            </p>
            <p className="mb-4">
              (2) Bei leichter Fahrlässigkeit haftet der Verkäufer nur bei
              Verletzung wesentlicher Vertragspflichten.
            </p>
            <p>
              (3) Die vorstehenden Haftungsbeschränkungen gelten nicht bei
              Verletzung von Leben, Körper oder Gesundheit.
            </p>
          </section>

          {/* § 8 Widerrufsrecht */}
          <section className="bg-ui-bg-subtle rounded-xl p-6 border border-ui-border-base">
            <h2 className="text-xl font-semibold text-ui-fg-base mb-4">
              § 8 Widerrufsrecht
            </h2>
            <p className="mb-4">
              Verbrauchern steht ein Widerrufsrecht nach Maßgabe der
              Widerrufsbelehrung zu, die unter{" "}
              <a
                href="/widerruf"
                className="text-amber-600 hover:text-amber-500"
              >
                Widerrufsbelehrung
              </a>{" "}
              abrufbar ist.
            </p>
          </section>

          {/* § 9 Streitbeilegung */}
          <section className="bg-ui-bg-subtle rounded-xl p-6 border border-ui-border-base">
            <h2 className="text-xl font-semibold text-ui-fg-base mb-4">
              § 9 Streitbeilegung
            </h2>
            <p className="mb-4">
              Die EU-Kommission stellt eine Plattform zur
              Online-Streitbeilegung bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 hover:text-amber-500"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p>
              Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          </section>

          {/* § 10 Schlussbestimmungen */}
          <section className="bg-ui-bg-subtle rounded-xl p-6 border border-ui-border-base">
            <h2 className="text-xl font-semibold text-ui-fg-base mb-4">
              § 10 Schlussbestimmungen
            </h2>
            <p className="mb-4">
              (1) Es gilt das Recht der Bundesrepublik Deutschland unter
              Ausschluss des UN-Kaufrechts.
            </p>
            <p className="mb-4">
              (2) Ist der Käufer Kaufmann, juristische Person des öffentlichen
              Rechts oder öffentlich-rechtliches Sondervermögen, ist
              ausschließlicher Gerichtsstand für alle Streitigkeiten aus diesem
              Vertrag der Geschäftssitz des Verkäufers.
            </p>
            <p>
              (3) Sollten einzelne Bestimmungen dieses Vertrages unwirksam sein
              oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen
              unberührt.
            </p>
          </section>

          {/* Stand */}
          <p className="text-sm text-ui-fg-muted text-center mt-8">
            Stand: Februar 2026
          </p>
        </div>
      </div>
    </div>
  )
}
