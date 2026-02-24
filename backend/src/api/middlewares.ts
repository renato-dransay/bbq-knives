import { defineMiddlewares } from "@medusajs/framework/http"

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/knife-requests",
      method: ["POST"],
      bodyParser: {
        sizeLimit: "10kb",
      },
    },
  ],
})
