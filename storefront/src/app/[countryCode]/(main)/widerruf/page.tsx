import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Widerrufsbelehrung | BBQ Knives",
  description:
    "Widerrufsbelehrung und Widerrufsformular für Verbraucher bei BBQ Knives.",
}

export default function WiderrufPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-ui-fg-base mb-8">
          Widerrufsbelehrung
        </h1>

        <div className="space-y-8 text-ui-fg-muted">
          {/* Widerrufsrecht */}
          <section className="bg-ui-bg-subtle rounded-xl p-6 border border-ui-border-base">
            <h2 className="text-xl font-semibold text-ui-fg-base mb-4">
              Widerrufsrecht
            </h2>
            <p className="mb-4">
              Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
              diesen Vertrag zu widerrufen.
            </p>
            <p className="mb-4">
              Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie
              oder ein von Ihnen benannter Dritter, der nicht der Beförderer
              ist, die Waren in Besitz genommen haben bzw. hat.
            </p>
            <p className="mb-4">
              Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
            </p>
            <address className="not-italic mb-4 pl-4 border-l-2 border-amber-600">
              <p className="font-semibold text-ui-fg-base">BBQ Knives</p>
              <p>Max Mustermann</p>
              <p>Musterstraße 123</p>
              <p>12345 Musterstadt</p>
              <p>E-Mail: info@bbq-knives.de</p>
              <p>Telefon: +49 (0) 123 456789</p>
            </address>
            <p className="mb-4">
              mittels einer eindeutigen Erklärung (z.B. ein mit der Post
              versandter Brief, Telefax oder E-Mail) über Ihren Entschluss,
              diesen Vertrag zu widerrufen, informieren. Sie können dafür das
              beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht
              vorgeschrieben ist.
            </p>
            <p>
              Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die
              Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der
              Widerrufsfrist absenden.
            </p>
          </section>

          {/* Folgen des Widerrufs */}
          <section className="bg-ui-bg-subtle rounded-xl p-6 border border-ui-border-base">
            <h2 className="text-xl font-semibold text-ui-fg-base mb-4">
              Folgen des Widerrufs
            </h2>
            <p className="mb-4">
              Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle
              Zahlungen, die wir von Ihnen erhalten haben, einschließlich der
              Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich
              daraus ergeben, dass Sie eine andere Art der Lieferung als die von
              uns angebotene, günstigste Standardlieferung gewählt haben),
              unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag
              zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses
              Vertrags bei uns eingegangen ist.
            </p>
            <p className="mb-4">
              Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das
              Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei
              denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in
              keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte
              berechnet.
            </p>
            <p className="mb-4">
              Wir können die Rückzahlung verweigern, bis wir die Waren wieder
              zurückerhalten haben oder bis Sie den Nachweis erbracht haben,
              dass Sie die Waren zurückgesandt haben, je nachdem, welches der
              frühere Zeitpunkt ist.
            </p>
            <p className="mb-4">
              Sie haben die Waren unverzüglich und in jedem Fall spätestens
              binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf
              dieses Vertrags unterrichten, an uns zurückzusenden oder zu
              übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf
              der Frist von vierzehn Tagen absenden.
            </p>
            <p className="mb-4">
              Sie tragen die unmittelbaren Kosten der Rücksendung der Waren.
            </p>
            <p>
              Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen,
              wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit,
              Eigenschaften und Funktionsweise der Waren nicht notwendigen
              Umgang mit ihnen zurückzuführen ist.
            </p>
          </section>

          {/* Ausschluss des Widerrufsrechts */}
          <section className="bg-amber-600/10 border border-amber-600/30 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-ui-fg-base mb-4">
              Ausschluss des Widerrufsrechts
            </h2>
            <p className="mb-4">
              Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von
              Waren, die nicht vorgefertigt sind und für deren Herstellung eine
              individuelle Auswahl oder Bestimmung durch den Verbraucher
              maßgeblich ist oder die eindeutig auf die persönlichen Bedürfnisse
              des Verbrauchers zugeschnitten sind.
            </p>
            <p className="font-semibold text-ui-fg-base">
              Hinweis: Da unsere Messer auf Bestellung handgefertigt und nach
              Ihren individuellen Wünschen (Stahlsorte, Griffmaterial)
              konfiguriert werden, kann das Widerrufsrecht bei personalisierten
              Produkten ausgeschlossen sein. Bitte kontaktieren Sie uns bei
              Fragen.
            </p>
          </section>

          {/* Muster-Widerrufsformular */}
          <section className="bg-ui-bg-subtle rounded-xl p-6 border border-ui-border-base">
            <h2 className="text-xl font-semibold text-ui-fg-base mb-4">
              Muster-Widerrufsformular
            </h2>
            <p className="mb-4 text-sm">
              (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte
              dieses Formular aus und senden Sie es zurück.)
            </p>
            <div className="bg-ui-bg-base border border-ui-border-base rounded-lg p-6 font-mono text-sm space-y-4">
              <p>
                An:
                <br />
                BBQ Knives
                <br />
                Max Mustermann
                <br />
                Musterstraße 123
                <br />
                12345 Musterstadt
                <br />
                E-Mail: info@bbq-knives.de
              </p>
              <p>
                Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*)
                abgeschlossenen Vertrag über den Kauf der folgenden Waren
                (*)/die Erbringung der folgenden Dienstleistung (*)
              </p>
              <p>
                _______________________________________________
                <br />
                (Beschreibung der Waren/Dienstleistung)
              </p>
              <p>
                Bestellt am (*)/erhalten am (*):
                <br />
                _______________________________________________
              </p>
              <p>
                Name des/der Verbraucher(s):
                <br />
                _______________________________________________
              </p>
              <p>
                Anschrift des/der Verbraucher(s):
                <br />
                _______________________________________________
              </p>
              <p>
                _______________________________________________
                <br />
                Unterschrift des/der Verbraucher(s)
                <br />
                (nur bei Mitteilung auf Papier)
              </p>
              <p>
                Datum:
                <br />
                _______________________________________________
              </p>
              <p className="text-ui-fg-muted">
                (*) Unzutreffendes streichen.
              </p>
            </div>
          </section>

          {/* Kontakt */}
          <section className="text-center py-6">
            <h2 className="text-xl font-semibold text-ui-fg-base mb-4">
              Fragen zum Widerruf?
            </h2>
            <p className="text-ui-fg-muted mb-4">
              Wir helfen Ihnen gerne weiter. Kontaktieren Sie uns per E-Mail
              oder Telefon.
            </p>
            <a
              href="mailto:info@bbq-knives.de"
              className="inline-block bg-amber-600 hover:bg-amber-500 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Kontakt aufnehmen
            </a>
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
