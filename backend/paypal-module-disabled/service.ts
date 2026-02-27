import {
  AbstractPaymentProvider,
  PaymentProviderError,
  PaymentProviderSessionResponse,
  PaymentSessionStatus,
} from "@medusajs/framework/utils"
import {
  CreatePaymentProviderSession,
  UpdatePaymentProviderSession,
  ProviderWebhookPayload,
  WebhookActionResult,
  Logger,
} from "@medusajs/framework/types"
import {
  Client,
  Environment,
  OrdersController,
  PaymentsController,
  CheckoutPaymentIntent,
  OrderRequest,
} from "@paypal/paypal-server-sdk"

type Options = {
  client_id: string
  client_secret: string
  environment?: "sandbox" | "production"
  autoCapture?: boolean
  webhook_id?: string
}

type InjectedDependencies = {
  logger: Logger
}

class PayPalPaymentProviderService extends AbstractPaymentProvider<Options> {
  static identifier = "paypal"

  protected logger_: Logger
  protected options_: Options
  protected client_: Client
  protected ordersController_: OrdersController
  protected paymentsController_: PaymentsController

  constructor(container: InjectedDependencies, options: Options) {
    super(container, options)

    this.logger_ = container.logger
    this.options_ = {
      environment: "sandbox",
      autoCapture: false,
      ...options,
    }

    // Initialize PayPal client
    this.client_ = new Client({
      environment:
        this.options_.environment === "production"
          ? Environment.Production
          : Environment.Sandbox,
      clientCredentialsAuthCredentials: {
        oAuthClientId: this.options_.client_id,
        oAuthClientSecret: this.options_.client_secret,
      },
    })

    this.ordersController_ = new OrdersController(this.client_)
    this.paymentsController_ = new PaymentsController(this.client_)
  }

  async initiatePayment(
    input: CreatePaymentProviderSession
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse> {
    const { amount, currency_code, context } = input

    try {
      const orderRequest: OrderRequest = {
        intent: this.options_.autoCapture
          ? CheckoutPaymentIntent.Capture
          : CheckoutPaymentIntent.Authorize,
        purchaseUnits: [
          {
            amount: {
              currencyCode: currency_code.toUpperCase(),
              value: (amount / 100).toFixed(2), // Convert from cents
            },
            referenceId: context?.session_id || undefined,
          },
        ],
      }

      const { result } = await this.ordersController_.createOrder({
        body: orderRequest,
      })

      return {
        data: {
          id: result.id,
          status: result.status,
        },
      }
    } catch (error: any) {
      this.logger_.error("PayPal initiatePayment error:", error)
      return {
        error: error.message || "Failed to create PayPal order",
        code: "PAYPAL_ORDER_CREATE_ERROR",
      }
    }
  }

  async authorizePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<
    | PaymentProviderError
    | {
        status: PaymentSessionStatus
        data: PaymentProviderSessionResponse["data"]
      }
  > {
    const orderId = paymentSessionData.id as string

    try {
      const { result } = await this.ordersController_.authorizeOrder({
        id: orderId,
      })

      return {
        status: PaymentSessionStatus.AUTHORIZED,
        data: {
          id: result.id,
          status: result.status,
          authorization_id:
            result.purchaseUnits?.[0]?.payments?.authorizations?.[0]?.id,
        },
      }
    } catch (error: any) {
      this.logger_.error("PayPal authorizePayment error:", error)
      return {
        error: error.message || "Failed to authorize PayPal payment",
        code: "PAYPAL_AUTHORIZE_ERROR",
      }
    }
  }

  async capturePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse["data"]> {
    const orderId = paymentSessionData.id as string

    try {
      const { result } = await this.ordersController_.captureOrder({
        id: orderId,
      })

      return {
        id: result.id,
        status: result.status,
        capture_id: result.purchaseUnits?.[0]?.payments?.captures?.[0]?.id,
      }
    } catch (error: any) {
      this.logger_.error("PayPal capturePayment error:", error)
      return {
        error: error.message || "Failed to capture PayPal payment",
        code: "PAYPAL_CAPTURE_ERROR",
      }
    }
  }

  async refundPayment(
    paymentSessionData: Record<string, unknown>,
    refundAmount: number
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse["data"]> {
    const captureId = paymentSessionData.capture_id as string

    if (!captureId) {
      return {
        error: "No capture ID found for refund",
        code: "PAYPAL_REFUND_NO_CAPTURE",
      }
    }

    try {
      const { result } = await this.paymentsController_.refundCapturedPayment({
        captureId,
        body: {
          amount: {
            currencyCode: (paymentSessionData.currency_code as string) || "EUR",
            value: (refundAmount / 100).toFixed(2),
          },
        },
      })

      return {
        ...paymentSessionData,
        refund_id: result.id,
        refund_status: result.status,
      }
    } catch (error: any) {
      this.logger_.error("PayPal refundPayment error:", error)
      return {
        error: error.message || "Failed to refund PayPal payment",
        code: "PAYPAL_REFUND_ERROR",
      }
    }
  }

  async cancelPayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse["data"]> {
    // PayPal orders can't be explicitly cancelled - they expire after 3 days
    // We just return the session data as-is
    return {
      ...paymentSessionData,
      status: "CANCELLED",
    }
  }

  async deletePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse["data"]> {
    return paymentSessionData
  }

  async getPaymentStatus(
    paymentSessionData: Record<string, unknown>
  ): Promise<PaymentSessionStatus> {
    const status = paymentSessionData.status as string

    switch (status) {
      case "CREATED":
      case "SAVED":
        return PaymentSessionStatus.PENDING
      case "APPROVED":
        return PaymentSessionStatus.REQUIRES_MORE
      case "PAYER_ACTION_REQUIRED":
        return PaymentSessionStatus.REQUIRES_MORE
      case "COMPLETED":
        return PaymentSessionStatus.AUTHORIZED
      case "VOIDED":
        return PaymentSessionStatus.CANCELED
      default:
        return PaymentSessionStatus.PENDING
    }
  }

  async retrievePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse["data"]> {
    const orderId = paymentSessionData.id as string

    try {
      const { result } = await this.ordersController_.getOrder({
        id: orderId,
      })

      return {
        ...paymentSessionData,
        id: result.id,
        status: result.status,
      }
    } catch (error: any) {
      this.logger_.error("PayPal retrievePayment error:", error)
      return {
        error: error.message || "Failed to retrieve PayPal payment",
        code: "PAYPAL_RETRIEVE_ERROR",
      }
    }
  }

  async updatePayment(
    input: UpdatePaymentProviderSession
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse> {
    // PayPal orders can be updated by patching the order
    // For simplicity, we create a new order with updated amount
    const { amount, currency_code, data } = input

    try {
      // Create new order with updated amount
      const orderRequest: OrderRequest = {
        intent: this.options_.autoCapture
          ? CheckoutPaymentIntent.Capture
          : CheckoutPaymentIntent.Authorize,
        purchaseUnits: [
          {
            amount: {
              currencyCode: currency_code.toUpperCase(),
              value: (amount / 100).toFixed(2),
            },
          },
        ],
      }

      const { result } = await this.ordersController_.createOrder({
        body: orderRequest,
      })

      return {
        data: {
          ...data,
          id: result.id,
          status: result.status,
        },
      }
    } catch (error: any) {
      this.logger_.error("PayPal updatePayment error:", error)
      return {
        error: error.message || "Failed to update PayPal payment",
        code: "PAYPAL_UPDATE_ERROR",
      }
    }
  }

  async getWebhookActionAndData(
    payload: ProviderWebhookPayload["payload"]
  ): Promise<WebhookActionResult> {
    const event = payload.data as Record<string, unknown>
    const eventType = event.event_type as string

    switch (eventType) {
      case "PAYMENT.CAPTURE.COMPLETED":
        return {
          action: "captured",
          data: {
            session_id: (event.resource as Record<string, unknown>)?.id as string,
            amount: {
              raw: parseFloat(
                ((event.resource as Record<string, unknown>)?.amount as Record<string, unknown>)
                  ?.value as string
              ) * 100,
              value:
                ((event.resource as Record<string, unknown>)?.amount as Record<string, unknown>)
                  ?.value as string,
            },
          },
        }
      case "PAYMENT.CAPTURE.REFUNDED":
        return {
          action: "refunded",
          data: {
            session_id: (event.resource as Record<string, unknown>)?.id as string,
            amount: {
              raw: parseFloat(
                ((event.resource as Record<string, unknown>)?.amount as Record<string, unknown>)
                  ?.value as string
              ) * 100,
              value:
                ((event.resource as Record<string, unknown>)?.amount as Record<string, unknown>)
                  ?.value as string,
            },
          },
        }
      default:
        return {
          action: "not_supported",
        }
    }
  }
}

export default PayPalPaymentProviderService
