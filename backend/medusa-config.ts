import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    redisUrl: process.env.REDIS_URL,
  },
  modules: [
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          // Stripe Payment Provider
          {
            resolve: "@medusajs/medusa/payment-stripe",
            id: "stripe",
            options: {
              apiKey: process.env.STRIPE_API_KEY,
            },
          },
          // PayPal Payment Provider - temporarily disabled (needs type updates for new Medusa API)
          // {
          //   resolve: "./src/modules/paypal",
          //   id: "paypal",
          //   options: {
          //     client_id: process.env.PAYPAL_CLIENT_ID,
          //     client_secret: process.env.PAYPAL_CLIENT_SECRET,
          //     environment: process.env.PAYPAL_ENVIRONMENT || "sandbox",
          //     autoCapture: process.env.PAYPAL_AUTO_CAPTURE === "true",
          //     webhook_id: process.env.PAYPAL_WEBHOOK_ID,
          //   },
          // },
        ],
      },
    },
    // Notification Module with Resend Provider
    {
      resolve: "@medusajs/medusa/notification",
      options: {
        providers: [
          {
            resolve: "./src/modules/resend-notification",
            id: "resend-notification",
            options: {
              channels: ["email"],
              api_key: process.env.RESEND_API_KEY,
              from_email: process.env.RESEND_FROM_EMAIL || "BBQ Knives <noreply@bbq-knives.de>",
            },
          },
        ],
      },
    },
  ],
})
