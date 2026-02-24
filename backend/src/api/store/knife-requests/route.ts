import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import {
  knifeRequestConfirmationEmail,
  adminKnifeRequestNotificationEmail,
} from "../../../templates/emails"
import { randomUUID } from "crypto"

type KnifeRequestBody = {
  name: string
  email: string
  product_title: string
  steel_type: string
  handle_material: string
  message?: string
}

export async function POST(
  req: MedusaRequest<KnifeRequestBody>,
  res: MedusaResponse
) {
  const { name, email, product_title, steel_type, handle_material, message } = req.body
  const logger = req.scope.resolve("logger")

  // Validate required fields
  if (!name || !email || !product_title) {
    return res.status(400).json({
      message: "Missing required fields: name, email, product_title",
    })
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    })
  }

  // Generate unique request ID
  const requestId = randomUUID()
  const createdAt = new Date().toISOString()

  // Log the request
  logger.info(`Knife request received: ${requestId} - ${product_title} from ${name} (${email})`)

  // Try to send email notifications
  try {
    const notificationService = req.scope.resolve(Modules.NOTIFICATION)

    // Prepare request data for emails
    const requestData = {
      id: requestId,
      name,
      email,
      product_title,
      steel_type,
      handle_material,
      message,
      created_at: createdAt,
    }

    // Send confirmation email to customer
    const customerEmail = knifeRequestConfirmationEmail(requestData)
    await notificationService.createNotifications({
      to: email,
      channel: "email",
      template: "knife-request-confirmation",
      data: {
        subject: customerEmail.subject,
        html: customerEmail.html,
        text: customerEmail.text,
      },
    })
    logger.info(`Confirmation email sent to customer: ${email}`)

    // Send notification email to admin
    const adminEmailAddress = process.env.ADMIN_EMAIL || "info@bbq-knives.de"
    const adminEmail = adminKnifeRequestNotificationEmail(requestData)
    await notificationService.createNotifications({
      to: adminEmailAddress,
      channel: "email",
      template: "admin-knife-request-notification",
      data: {
        subject: adminEmail.subject,
        html: adminEmail.html,
        text: adminEmail.text,
      },
    })
    logger.info(`Admin notification email sent to: ${adminEmailAddress}`)
  } catch (error) {
    // Log error but don't fail the request - the request was received
    logger.error(`Failed to send email notifications: ${error}`)
  }

  return res.status(201).json({
    message: "Request submitted successfully. We will contact you soon.",
    data: {
      id: requestId,
      name,
      email,
      product_title,
      steel_type,
      handle_material,
    },
  })
}
