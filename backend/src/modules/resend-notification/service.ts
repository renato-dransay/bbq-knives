import { AbstractNotificationProviderService } from "@medusajs/framework/utils"
import { Logger, ProviderSendNotificationDTO, ProviderSendNotificationResultsDTO } from "@medusajs/framework/types"
import { Resend } from "resend"

type InjectedDependencies = {
  logger: Logger
}

interface ResendNotificationOptions {
  api_key: string
  from_email: string
}

export default class ResendNotificationService extends AbstractNotificationProviderService {
  static identifier = "resend-notification"

  protected logger_: Logger
  protected resend_: Resend
  protected fromEmail_: string

  constructor(
    { logger }: InjectedDependencies,
    options: ResendNotificationOptions
  ) {
    super()
    this.logger_ = logger
    this.resend_ = new Resend(options.api_key)
    this.fromEmail_ = options.from_email
  }

  async send(
    notification: ProviderSendNotificationDTO
  ): Promise<ProviderSendNotificationResultsDTO> {
    const { to, channel, template, data } = notification

    if (channel !== "email") {
      this.logger_.warn(`Resend provider only supports email channel, got: ${channel}`)
      return { id: "" }
    }

    try {
      const { data: result, error } = await this.resend_.emails.send({
        from: this.fromEmail_,
        to: [to],
        subject: data?.subject as string || "Notification from BBQ Knives",
        html: data?.html as string || "",
        text: data?.text as string || "",
      })

      if (error) {
        this.logger_.error(`Failed to send email: ${error.message}`)
        throw new Error(error.message)
      }

      this.logger_.info(`Email sent successfully: ${result?.id}`)
      return { id: result?.id || "" }
    } catch (error) {
      this.logger_.error(`Error sending email via Resend: ${error}`)
      throw error
    }
  }
}
