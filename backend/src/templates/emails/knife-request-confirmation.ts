import { baseLayout } from "./base-layout"

interface KnifeRequestData {
  name: string
  email: string
  product_title: string
  steel_type?: string
  handle_material?: string
  message?: string
  request_id?: string
}

export function knifeRequestConfirmationEmail(data: KnifeRequestData): { subject: string; html: string; text: string } {
  const subject = `Ihre Messeranfrage wurde empfangen | BBQ Knives`

  const content = `
    <h2 style="margin: 0 0 10px 0; font-size: 24px; font-weight: bold; color: #e5e5e5;">
      Danke für Ihre Anfrage!
    </h2>
    <p style="margin: 0 0 30px 0; font-size: 16px; color: #9ca3af; line-height: 1.6;">
      Hallo ${data.name},<br><br>
      Vielen Dank für Ihr Interesse an unseren handgefertigten Messern.
      Wir haben Ihre Anfrage erhalten und werden uns zeitnah bei Ihnen melden.
    </p>

    <!-- Request Details -->
    <div style="background-color: #0a0a0a; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
      <h3 style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #e5e5e5; text-transform: uppercase; letter-spacing: 1px;">
        Ihre Anfrage
      </h3>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #262626;">
            <span style="color: #9ca3af; font-size: 14px;">Produkt:</span>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #262626;" align="right">
            <span style="color: #e5e5e5; font-size: 14px; font-weight: 500;">${data.product_title}</span>
          </td>
        </tr>
        ${data.steel_type ? `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #262626;">
            <span style="color: #9ca3af; font-size: 14px;">Stahlsorte:</span>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #262626;" align="right">
            <span style="color: #d97706; font-size: 14px;">${data.steel_type}</span>
          </td>
        </tr>
        ` : ''}
        ${data.handle_material ? `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #262626;">
            <span style="color: #9ca3af; font-size: 14px;">Griffmaterial:</span>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #262626;" align="right">
            <span style="color: #d97706; font-size: 14px;">${data.handle_material}</span>
          </td>
        </tr>
        ` : ''}
      </table>
      ${data.message ? `
      <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #262626;">
        <p style="margin: 0 0 8px 0; color: #9ca3af; font-size: 14px;">Ihre Nachricht:</p>
        <p style="margin: 0; color: #e5e5e5; font-size: 14px; line-height: 1.6; font-style: italic;">"${data.message}"</p>
      </div>
      ` : ''}
    </div>

    <!-- What Happens Next -->
    <div style="background-color: #1c1917; border-left: 4px solid #d97706; padding: 20px; border-radius: 0 8px 8px 0;">
      <h3 style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600; color: #e5e5e5;">
        Wie geht es weiter?
      </h3>
      <ol style="margin: 0; padding-left: 20px; color: #9ca3af; font-size: 14px; line-height: 1.8;">
        <li>Wir prüfen Ihre Anfrage und die Verfügbarkeit der gewünschten Materialien.</li>
        <li>Innerhalb von 1-2 Werktagen erhalten Sie ein individuelles Angebot.</li>
        <li>Nach Ihrer Bestätigung beginnen wir mit der Fertigung Ihres Messers.</li>
      </ol>
    </div>

    <!-- Note -->
    <p style="margin: 30px 0 0 0; font-size: 14px; color: #9ca3af; text-align: center; line-height: 1.6;">
      Jedes unserer Messer ist ein Unikat und wird mit größter Sorgfalt für Sie gefertigt.
    </p>
  `

  const text = `
Danke für Ihre Anfrage bei BBQ Knives!

Hallo ${data.name},

Vielen Dank für Ihr Interesse an unseren handgefertigten Messern.
Wir haben Ihre Anfrage erhalten und werden uns zeitnah bei Ihnen melden.

Ihre Anfrage:
- Produkt: ${data.product_title}
${data.steel_type ? `- Stahlsorte: ${data.steel_type}` : ''}
${data.handle_material ? `- Griffmaterial: ${data.handle_material}` : ''}
${data.message ? `\nIhre Nachricht:\n"${data.message}"` : ''}

Wie geht es weiter?
1. Wir prüfen Ihre Anfrage und die Verfügbarkeit der gewünschten Materialien.
2. Innerhalb von 1-2 Werktagen erhalten Sie ein individuelles Angebot.
3. Nach Ihrer Bestätigung beginnen wir mit der Fertigung Ihres Messers.

Bei Fragen stehen wir Ihnen gerne zur Verfügung: info@bbq-knives.de

BBQ Knives
Max Mustermann
Musterstraße 123
12345 Musterstadt
  `.trim()

  return {
    subject,
    html: baseLayout(content, `Vielen Dank für Ihre Messeranfrage - ${data.product_title}`),
    text,
  }
}
