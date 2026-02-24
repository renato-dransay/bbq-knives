import { baseLayout } from "./base-layout"

interface KnifeRequestData {
  id: string
  name: string
  email: string
  product_title: string
  steel_type?: string
  handle_material?: string
  message?: string
  created_at: string
}

export function adminKnifeRequestNotificationEmail(data: KnifeRequestData): { subject: string; html: string; text: string } {
  const subject = `Neue Messeranfrage: ${data.product_title} | BBQ Knives`

  const formattedDate = new Date(data.created_at).toLocaleString('de-DE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  const content = `
    <div style="background-color: #d97706; color: #000; padding: 15px 20px; border-radius: 8px; margin-bottom: 20px;">
      <h2 style="margin: 0; font-size: 18px; font-weight: bold;">
        🔔 Neue Messeranfrage eingegangen
      </h2>
    </div>

    <p style="margin: 0 0 20px 0; font-size: 14px; color: #9ca3af;">
      Eingegangen am: <strong style="color: #e5e5e5;">${formattedDate}</strong>
    </p>

    <!-- Customer Info -->
    <div style="background-color: #0a0a0a; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
      <h3 style="margin: 0 0 15px 0; font-size: 14px; font-weight: 600; color: #d97706; text-transform: uppercase; letter-spacing: 1px;">
        Kundendaten
      </h3>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #262626; width: 120px;">
            <span style="color: #9ca3af; font-size: 13px;">Name:</span>
          </td>
          <td style="padding: 8px 0; border-bottom: 1px solid #262626;">
            <span style="color: #e5e5e5; font-size: 14px; font-weight: 500;">${data.name}</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #262626;">
            <span style="color: #9ca3af; font-size: 13px;">E-Mail:</span>
          </td>
          <td style="padding: 8px 0; border-bottom: 1px solid #262626;">
            <a href="mailto:${data.email}" style="color: #d97706; font-size: 14px; text-decoration: none;">${data.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0;">
            <span style="color: #9ca3af; font-size: 13px;">Anfrage-ID:</span>
          </td>
          <td style="padding: 8px 0;">
            <code style="color: #6b7280; font-size: 12px; background-color: #171717; padding: 2px 6px; border-radius: 4px;">${data.id}</code>
          </td>
        </tr>
      </table>
    </div>

    <!-- Request Details -->
    <div style="background-color: #0a0a0a; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
      <h3 style="margin: 0 0 15px 0; font-size: 14px; font-weight: 600; color: #d97706; text-transform: uppercase; letter-spacing: 1px;">
        Angefragtes Produkt
      </h3>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #262626; width: 120px;">
            <span style="color: #9ca3af; font-size: 13px;">Produkt:</span>
          </td>
          <td style="padding: 8px 0; border-bottom: 1px solid #262626;">
            <span style="color: #e5e5e5; font-size: 14px; font-weight: 600;">${data.product_title}</span>
          </td>
        </tr>
        ${data.steel_type ? `
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #262626;">
            <span style="color: #9ca3af; font-size: 13px;">Stahlsorte:</span>
          </td>
          <td style="padding: 8px 0; border-bottom: 1px solid #262626;">
            <span style="color: #e5e5e5; font-size: 14px;">${data.steel_type}</span>
          </td>
        </tr>
        ` : ''}
        ${data.handle_material ? `
        <tr>
          <td style="padding: 8px 0;">
            <span style="color: #9ca3af; font-size: 13px;">Griffmaterial:</span>
          </td>
          <td style="padding: 8px 0;">
            <span style="color: #e5e5e5; font-size: 14px;">${data.handle_material}</span>
          </td>
        </tr>
        ` : ''}
      </table>
    </div>

    ${data.message ? `
    <!-- Customer Message -->
    <div style="background-color: #0a0a0a; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
      <h3 style="margin: 0 0 15px 0; font-size: 14px; font-weight: 600; color: #d97706; text-transform: uppercase; letter-spacing: 1px;">
        Kundennachricht
      </h3>
      <div style="background-color: #171717; border-radius: 8px; padding: 15px; border-left: 3px solid #d97706;">
        <p style="margin: 0; color: #e5e5e5; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
      </div>
    </div>
    ` : ''}

    <!-- Action Button -->
    <div style="text-align: center; padding-top: 10px;">
      <a href="mailto:${data.email}?subject=Ihre%20Messeranfrage%20bei%20BBQ%20Knives%20-%20${encodeURIComponent(data.product_title)}"
         style="display: inline-block; background-color: #d97706; color: #000; font-weight: 600; padding: 14px 30px; border-radius: 8px; text-decoration: none; font-size: 14px;">
        Kunden antworten →
      </a>
    </div>
  `

  const text = `
NEUE MESSERANFRAGE

Eingegangen am: ${formattedDate}

KUNDENDATEN
-----------
Name: ${data.name}
E-Mail: ${data.email}
Anfrage-ID: ${data.id}

ANGEFRAGTES PRODUKT
-------------------
Produkt: ${data.product_title}
${data.steel_type ? `Stahlsorte: ${data.steel_type}` : ''}
${data.handle_material ? `Griffmaterial: ${data.handle_material}` : ''}

${data.message ? `KUNDENNACHRICHT
---------------
${data.message}` : ''}

Bitte antworten Sie dem Kunden zeitnah per E-Mail: ${data.email}
  `.trim()

  return {
    subject,
    html: baseLayout(content),
    text,
  }
}
