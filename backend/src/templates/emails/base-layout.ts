/**
 * Base email layout for BBQ Knives
 * Dark theme with amber accents to match the storefront
 */
export function baseLayout(content: string, preheader?: string): string {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>BBQ Knives</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
  </style>
  <![endif]-->
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; padding: 10px !important; }
      .content { padding: 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  ${preheader ? `<div style="display:none;font-size:1px;color:#0a0a0a;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${preheader}</div>` : ''}

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 10px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" class="container" style="max-width: 600px; width: 100%;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #d97706; letter-spacing: 2px;">
                BBQ KNIVES
              </h1>
              <p style="margin: 8px 0 0 0; font-size: 12px; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px;">
                Handgefertigte Messer für BBQ-Liebhaber
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="content" style="background-color: #171717; border-radius: 12px; padding: 40px; border: 1px solid #262626;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top: 30px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <p style="margin: 0; font-size: 14px; color: #6b7280;">
                      Bei Fragen stehen wir Ihnen gerne zur Verfügung:
                    </p>
                    <p style="margin: 8px 0 0 0; font-size: 14px;">
                      <a href="mailto:info@bbq-knives.de" style="color: #d97706; text-decoration: none;">info@bbq-knives.de</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="border-top: 1px solid #262626; padding-top: 20px;">
                    <p style="margin: 0; font-size: 12px; color: #6b7280;">
                      BBQ Knives | Max Mustermann | Musterstraße 123 | 12345 Musterstadt
                    </p>
                    <p style="margin: 8px 0 0 0; font-size: 12px; color: #6b7280;">
                      <a href="${process.env.STORE_CORS || 'http://localhost:8000'}/impressum" style="color: #6b7280; text-decoration: underline;">Impressum</a> |
                      <a href="${process.env.STORE_CORS || 'http://localhost:8000'}/datenschutz" style="color: #6b7280; text-decoration: underline;">Datenschutz</a> |
                      <a href="${process.env.STORE_CORS || 'http://localhost:8000'}/agb" style="color: #6b7280; text-decoration: underline;">AGB</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}
