import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Datenschutzerklärung | BBQ Knives",
  description:
    "Datenschutzerklärung von BBQ Knives. Informationen zum Schutz Ihrer personenbezogenen Daten.",
}

export default function DatenschutzPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-ui-fg-base mb-8">
          Datenschutzerklärung
        </h1>

        <div className="space-y-8 text-ui-fg-muted">
          {/* 1. Datenschutz auf einen Blick */}
          <section className="bg-ui-bg-subtle rounded-xl p-6 border border-ui-border-base">
            <h2 className="text-xl font-semibold text-ui-fg-base mb-4">
              1. Datenschutz auf einen Blick
            </h2>
            <h3 className="font-semibold text-ui-fg-base mt-4 mb-2">
              Allgemeine Hinweise
            </h3>
            <p className="mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber,
              was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
              Website besuchen. Personenbezogene Daten sind alle Daten, mit
              denen Sie persönlich identifiziert werden können.
            </p>
            <h3 className="font-semibold text-ui-fg-base mt-4 mb-2">
              Datenerfassung auf dieser Website
            </h3>
            <p className="mb-2">
              <strong className="text-ui-fg-base">
                Wer ist verantwortlich für die Datenerfassung auf dieser
                Website?
              </strong>
            </p>
            <p className="mb-4">
              Die Datenverarbeitung auf dieser Website erfolgt durch den
              Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum
              dieser Website entnehmen.
            </p>
            <p className="mb-2">
              <strong className="text-ui-fg-base">
                Wie erfassen wir Ihre Daten?
              </strong>
            </p>
            <p className="mb-4">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
              mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in
              ein Kontaktformular eingeben oder bei einer Bestellung angeben.
            </p>
            <p className="mb-4">
              Andere Daten werden automatisch oder nach Ihrer Einwilligung beim
              Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor
              allem technische Daten (z.B. Internetbrowser, Betriebssystem oder
              Uhrzeit des Seitenaufrufs).
            </p>
            <p className="mb-2">
              <strong className="text-ui-fg-base">
                Wofür nutzen wir Ihre Daten?
              </strong>
            </p>
            <p className="mb-4">
              Ein Teil der Daten wird erhoben, um eine fehlerfreie
              Bereitstellung der Website zu gewährleisten. Andere Daten können
              zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>
          </section>

          {/* 2. Hosting */}
          <section className="bg-ui-bg-subtle rounded-xl p-6 border border-ui-border-base">
            <h2 className="text-xl font-semibold text-ui-fg-base mb-4">
              2. Hosting
            </h2>
            <p>
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
              Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Wenn
              Sie unsere Website besuchen, erfasst Vercel verschiedene
              Logfiles inklusive Ihrer IP-Adressen.
            </p>
          </section>

          {/* 3. Allgemeine Hinweise und Pflichtinformationen */}
          <section className="bg-ui-bg-subtle rounded-xl p-6 border border-ui-border-base">
            <h2 className="text-xl font-semibold text-ui-fg-base mb-4">
              3. Allgemeine Hinweise und Pflichtinformationen
            </h2>
            <h3 className="font-semibold text-ui-fg-base mt-4 mb-2">
              Datenschutz
            </h3>
            <p className="mb-4">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
              Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
              vertraulich und entsprechend der gesetzlichen
              Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <h3 className="font-semibold text-ui-fg-base mt-4 mb-2">
              Hinweis zur verantwortlichen Stelle
            </h3>
            <p className="mb-2">
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser
              Website ist:
            </p>
            <address className="not-italic mb-4">
              <p>BBQ Knives</p>
              <p>Max Mustermann</p>
              <p>Musterstraße 123</p>
              <p>12345 Musterstadt</p>
              <p>E-Mail: info@bbq-knives.de</p>
            </address>
            <h3 className="font-semibold text-ui-fg-base mt-4 mb-2">
              Speicherdauer
            </h3>
            <p className="mb-4">
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere
              Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen
              Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt.
            </p>
            <h3 className="font-semibold text-ui-fg-base mt-4 mb-2">
              Widerruf Ihrer Einwilligung zur Datenverarbeitung
            </h3>
            <p className="mb-4">
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen
              Einwilligung möglich. Sie können eine bereits erteilte
              Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum
              Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf
              unberührt.
            </p>
          </section>

          {/* 4. Datenerfassung auf dieser Website */}
          <section className="bg-ui-bg-subtle rounded-xl p-6 border border-ui-border-base">
            <h2 className="text-xl font-semibold text-ui-fg-base mb-4">
              4. Datenerfassung auf dieser Website
            </h2>
            <h3 className="font-semibold text-ui-fg-base mt-4 mb-2">Cookies</h3>
            <p className="mb-4">
              Unsere Internetseiten verwenden so genannte „Cookies". Cookies
              sind kleine Datenpakete und richten auf Ihrem Endgerät keinen
              Schaden an. Sie werden entweder vorübergehend für die Dauer einer
              Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf
              Ihrem Endgerät gespeichert.
            </p>
            <p className="mb-4">
              Session-Cookies werden nach Ende Ihres Besuchs automatisch
              gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät
              gespeichert, bis Sie diese selbst löschen oder eine automatische
              Löschung durch Ihren Webbrowser erfolgt.
            </p>
            <h3 className="font-semibold text-ui-fg-base mt-4 mb-2">
              Server-Log-Dateien
            </h3>
            <p className="mb-4">
              Der Provider der Seiten erhebt und speichert automatisch
              Informationen in so genannten Server-Log-Dateien, die Ihr Browser
              automatisch an uns übermittelt. Dies sind:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Browsertyp und Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p>
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird
              nicht vorgenommen.
            </p>
          </section>

          {/* 5. E-Commerce und Zahlungsanbieter */}
          <section className="bg-ui-bg-subtle rounded-xl p-6 border border-ui-border-base">
            <h2 className="text-xl font-semibold text-ui-fg-base mb-4">
              5. E-Commerce und Zahlungsanbieter
            </h2>
            <h3 className="font-semibold text-ui-fg-base mt-4 mb-2">
              Verarbeiten von Kunden- und Vertragsdaten
            </h3>
            <p className="mb-4">
              Wir erheben, verarbeiten und nutzen personenbezogene Kunden- und
              Vertragsdaten zur Begründung, inhaltlichen Ausgestaltung und
              Änderung unserer Vertragsbeziehungen.
            </p>
            <h3 className="font-semibold text-ui-fg-base mt-4 mb-2">
              Zahlungsdienste
            </h3>
            <p className="mb-4">
              Wir binden Zahlungsdienste von Drittunternehmen auf unserer
              Website ein. Wenn Sie einen Kauf bei uns tätigen, werden Ihre
              Zahlungsdaten (z.B. Name, Zahlungssumme, Kontoverbindung,
              Kreditkartennummer) vom Zahlungsdienstleister zum Zwecke der
              Zahlungsabwicklung verarbeitet.
            </p>
            <p className="mb-2">
              <strong className="text-ui-fg-base">Stripe:</strong> Anbieter ist
              Stripe Payments Europe Ltd, 1 Grand Canal Street Lower, Grand
              Canal Dock, Dublin, Irland.
            </p>
            <p className="mb-4">
              <strong className="text-ui-fg-base">PayPal:</strong> Anbieter
              dieses Zahlungsdienstes ist PayPal (Europe) S.à.r.l. et Cie,
              S.C.A., 22-24 Boulevard Royal, L-2449 Luxembourg.
            </p>
          </section>

          {/* 6. Ihre Rechte */}
          <section className="bg-ui-bg-subtle rounded-xl p-6 border border-ui-border-base">
            <h2 className="text-xl font-semibold text-ui-fg-base mb-4">
              6. Ihre Rechte
            </h2>
            <p className="mb-4">Sie haben jederzeit das Recht:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten
                zu erhalten
              </li>
              <li>
                Berichtigung unrichtiger personenbezogener Daten zu verlangen
              </li>
              <li>
                Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu
                verlangen
              </li>
              <li>
                Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu
                verlangen
              </li>
              <li>Widerspruch gegen die Verarbeitung Ihrer Daten einzulegen</li>
              <li>Datenübertragbarkeit zu verlangen</li>
              <li>Sich bei einer Aufsichtsbehörde zu beschweren</li>
            </ul>
          </section>

          {/* Stand der Datenschutzerklärung */}
          <p className="text-sm text-ui-fg-muted text-center mt-8">
            Stand: Februar 2026
          </p>
        </div>
      </div>
    </div>
  )
}
