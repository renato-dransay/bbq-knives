import { baseLayout } from "./base-layout"

interface OrderItem {
  title: string
  quantity: number
  unit_price: number
  thumbnail?: string
}

interface OrderData {
  order_id: string
  display_id: number
  email: string
  customer_name?: string
  items: OrderItem[]
  subtotal: number
  shipping_total: number
  tax_total: number
  total: number
  currency_code: string
  shipping_address?: {
    first_name?: string
    last_name?: string
    address_1?: string
    address_2?: string
    city?: string
    postal_code?: string
    country_code?: string
  }
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100)
}

export function orderConfirmationEmail(data: OrderData): { subject: string; html: string; text: string } {
  const subject = `Bestellbestätigung #${data.display_id} | BBQ Knives`

  const itemsHtml = data.items.map(item => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #262626;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td width="60" valign="top">
              ${item.thumbnail ? `<img src="${item.thumbnail}" width="50" height="50" alt="${item.title}" style="border-radius: 8px; background-color: #262626;">` : '<div style="width: 50px; height: 50px; background-color: #262626; border-radius: 8px;"></div>'}
            </td>
            <td valign="top" style="padding-left: 12px;">
              <p style="margin: 0; font-size: 14px; color: #e5e5e5; font-weight: 500;">${item.title}</p>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #9ca3af;">Menge: ${item.quantity}</p>
            </td>
            <td valign="top" align="right">
              <p style="margin: 0; font-size: 14px; color: #e5e5e5;">${formatCurrency(item.unit_price * item.quantity, data.currency_code)}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `).join('')

  const content = `
    <h2 style="margin: 0 0 10px 0; font-size: 24px; font-weight: bold; color: #e5e5e5;">
      Vielen Dank für Ihre Bestellung!
    </h2>
    <p style="margin: 0 0 30px 0; font-size: 16px; color: #9ca3af; line-height: 1.6;">
      ${data.customer_name ? `Hallo ${data.customer_name},<br><br>` : ''}
      Ihre Bestellung #${data.display_id} wurde erfolgreich aufgenommen. Da unsere Messer handgefertigt werden,
      erhalten Sie eine separate E-Mail, sobald Ihre Bestellung versandbereit ist.
    </p>

    <!-- Order Items -->
    <div style="background-color: #0a0a0a; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
      <h3 style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #e5e5e5; text-transform: uppercase; letter-spacing: 1px;">
        Bestellübersicht
      </h3>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        ${itemsHtml}
      </table>
    </div>

    <!-- Order Totals -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
      <tr>
        <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Zwischensumme</td>
        <td align="right" style="padding: 8px 0; color: #e5e5e5; font-size: 14px;">${formatCurrency(data.subtotal, data.currency_code)}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Versand</td>
        <td align="right" style="padding: 8px 0; color: #e5e5e5; font-size: 14px;">${formatCurrency(data.shipping_total, data.currency_code)}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">inkl. MwSt.</td>
        <td align="right" style="padding: 8px 0; color: #e5e5e5; font-size: 14px;">${formatCurrency(data.tax_total, data.currency_code)}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-top: 1px solid #262626; color: #e5e5e5; font-size: 16px; font-weight: bold;">Gesamtsumme</td>
        <td align="right" style="padding: 12px 0; border-top: 1px solid #262626; color: #d97706; font-size: 18px; font-weight: bold;">${formatCurrency(data.total, data.currency_code)}</td>
      </tr>
    </table>

    ${data.shipping_address ? `
    <!-- Shipping Address -->
    <div style="background-color: #0a0a0a; border-radius: 8px; padding: 20px;">
      <h3 style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #e5e5e5; text-transform: uppercase; letter-spacing: 1px;">
        Lieferadresse
      </h3>
      <p style="margin: 0; font-size: 14px; color: #9ca3af; line-height: 1.8;">
        ${data.shipping_address.first_name || ''} ${data.shipping_address.last_name || ''}<br>
        ${data.shipping_address.address_1 || ''}<br>
        ${data.shipping_address.address_2 ? data.shipping_address.address_2 + '<br>' : ''}
        ${data.shipping_address.postal_code || ''} ${data.shipping_address.city || ''}<br>
        ${data.shipping_address.country_code?.toUpperCase() || ''}
      </p>
    </div>
    ` : ''}

    <!-- CTA -->
    <div style="text-align: center; margin-top: 30px;">
      <p style="margin: 0 0 15px 0; font-size: 14px; color: #9ca3af;">
        Bestellnummer: <strong style="color: #e5e5e5;">#${data.display_id}</strong>
      </p>
    </div>
  `

  const text = `
Vielen Dank für Ihre Bestellung bei BBQ Knives!

${data.customer_name ? `Hallo ${data.customer_name},\n\n` : ''}
Ihre Bestellung #${data.display_id} wurde erfolgreich aufgenommen.

Bestellübersicht:
${data.items.map(item => `- ${item.title} (x${item.quantity}): ${formatCurrency(item.unit_price * item.quantity, data.currency_code)}`).join('\n')}

Zwischensumme: ${formatCurrency(data.subtotal, data.currency_code)}
Versand: ${formatCurrency(data.shipping_total, data.currency_code)}
inkl. MwSt.: ${formatCurrency(data.tax_total, data.currency_code)}
Gesamtsumme: ${formatCurrency(data.total, data.currency_code)}

Da unsere Messer handgefertigt werden, erhalten Sie eine separate E-Mail, sobald Ihre Bestellung versandbereit ist.

Bei Fragen stehen wir Ihnen gerne zur Verfügung: info@bbq-knives.de

BBQ Knives
Max Mustermann
Musterstraße 123
12345 Musterstadt
  `.trim()

  return {
    subject,
    html: baseLayout(content, `Vielen Dank für Ihre Bestellung #${data.display_id}`),
    text,
  }
}
