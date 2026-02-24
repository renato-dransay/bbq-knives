import ResendNotificationService from "./service"
import { Module } from "@medusajs/framework/utils"

export default Module("resend-notification", {
  service: ResendNotificationService,
})
