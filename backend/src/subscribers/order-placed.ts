import type {
  SubscriberArgs,
  SubscriberConfig,
} from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"
import { orderConfirmationEmail } from "../templates/emails"

// Helper to convert BigNumberValue to number
function toNumber(value: any): number {
  if (typeof value === 'number') return value
  if (typeof value === 'string') return parseFloat(value)
  if (value && typeof value === 'object' && 'value' in value) {
    return parseFloat(value.value)
  }
  return 0
}

export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve("logger")
  const orderService = container.resolve(Modules.ORDER)
  const notificationService = container.resolve(Modules.NOTIFICATION)

  logger.info(`Order placed event received for order: ${data.id}`)

  try {
    // Retrieve full order details
    const order = await orderService.retrieveOrder(data.id, {
      relations: ["items", "shipping_address"],
    })

    if (!order.email) {
      logger.warn(`Order ${data.id} has no email, skipping notification`)
      return
    }

    // Build email data
    const emailData = {
      order_id: order.id,
      display_id: order.display_id || 0,
      email: order.email,
      customer_name: order.shipping_address?.first_name,
      items: order.items?.map((item) => ({
        title: item.title || "Product",
        quantity: item.quantity,
        unit_price: toNumber(item.unit_price),
        thumbnail: item.thumbnail || undefined,
      })) || [],
      subtotal: toNumber(order.subtotal),
      shipping_total: toNumber(order.shipping_total),
      tax_total: toNumber(order.tax_total),
      total: toNumber(order.total),
      currency_code: order.currency_code || "eur",
      shipping_address: order.shipping_address ? {
        first_name: order.shipping_address.first_name || undefined,
        last_name: order.shipping_address.last_name || undefined,
        address_1: order.shipping_address.address_1 || undefined,
        address_2: order.shipping_address.address_2 || undefined,
        city: order.shipping_address.city || undefined,
        postal_code: order.shipping_address.postal_code || undefined,
        country_code: order.shipping_address.country_code || undefined,
      } : undefined,
    }

    // Generate email content
    const { subject, html, text } = orderConfirmationEmail(emailData)

    // Send notification via notification module
    await notificationService.createNotifications({
      to: order.email,
      channel: "email",
      template: "order-confirmation",
      data: {
        subject,
        html,
        text,
      },
    })

    logger.info(`Order confirmation email sent for order: ${data.id}`)
  } catch (error) {
    logger.error(`Failed to send order confirmation email for order ${data.id}: ${error}`)
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
