"use client"

import { HttpTypes } from "@medusajs/types"
import { Button, clx } from "@medusajs/ui"
import { useState } from "react"
import { X } from "@medusajs/icons"

type KnifeRequestFormProps = {
  product: HttpTypes.StoreProduct
  selectedOptions: Record<string, string | undefined>
  isOpen: boolean
  onClose: () => void
}

type FormData = {
  name: string
  email: string
  message: string
}

type FormStatus = "idle" | "submitting" | "success" | "error"

export default function KnifeRequestForm({
  product,
  selectedOptions,
  isOpen,
  onClose,
}: KnifeRequestFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Get option titles from product options
  const getOptionTitle = (optionId: string) => {
    const option = product.options?.find((o) => o.id === optionId)
    return option?.title || optionId
  }

  // Format selected options for display
  const formattedOptions = Object.entries(selectedOptions)
    .filter(([_, value]) => value)
    .map(([optionId, value]) => ({
      title: getOptionTitle(optionId),
      value: value as string,
    }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    setErrorMessage("")

    // Build request payload
    const steelType =
      formattedOptions.find(
        (o) => o.title.toLowerCase().includes("steel") || o.title === "Steel Type"
      )?.value || ""
    const handleMaterial =
      formattedOptions.find(
        (o) =>
          o.title.toLowerCase().includes("handle") ||
          o.title === "Handle Material"
      )?.value || ""

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/knife-requests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            product_title: product.title,
            steel_type: steelType,
            handle_material: handleMaterial,
            message: formData.message,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit request")
      }

      setStatus("success")
      setFormData({ name: "", email: "", message: "" })

      // Close modal after 3 seconds on success
      setTimeout(() => {
        onClose()
        setStatus("idle")
      }, 3000)
    } catch (error) {
      setStatus("error")
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      )
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-ui-bg-base border border-ui-border-base rounded-xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-ui-border-base">
          <h2 className="text-xl font-semibold text-ui-fg-base">
            Request This Knife
          </h2>
          <button
            onClick={onClose}
            className="text-ui-fg-muted hover:text-ui-fg-base transition-colors p-1"
            aria-label="Close"
          >
            <X />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-ui-fg-base mb-2">
                Request Submitted!
              </h3>
              <p className="text-ui-fg-muted">
                We&apos;ll contact you soon about your custom knife request.
              </p>
            </div>
          ) : (
            <>
              {/* Product Info */}
              <div className="bg-ui-bg-subtle rounded-lg p-4 mb-6 border border-ui-border-base">
                <p className="text-sm text-ui-fg-muted mb-1">Requesting</p>
                <p className="font-semibold text-ui-fg-base">{product.title}</p>
                {formattedOptions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formattedOptions.map((opt) => (
                      <span
                        key={opt.title}
                        className="inline-flex items-center text-xs bg-ui-bg-base border border-ui-border-base rounded-full px-3 py-1 text-ui-fg-subtle"
                      >
                        {opt.title}: {opt.value}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-ui-fg-base mb-1"
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full bg-ui-bg-field border border-ui-border-base rounded-lg px-4 py-2.5 text-ui-fg-base placeholder:text-ui-fg-muted focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
                    placeholder="Max Mustermann"
                    disabled={status === "submitting"}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-ui-fg-base mb-1"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full bg-ui-bg-field border border-ui-border-base rounded-lg px-4 py-2.5 text-ui-fg-base placeholder:text-ui-fg-muted focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
                    placeholder="max@example.com"
                    disabled={status === "submitting"}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-ui-fg-base mb-1"
                  >
                    Additional Notes{" "}
                    <span className="text-ui-fg-muted">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    className="w-full bg-ui-bg-field border border-ui-border-base rounded-lg px-4 py-2.5 text-ui-fg-base placeholder:text-ui-fg-muted focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all resize-none"
                    placeholder="Any special requests or questions about this knife..."
                    disabled={status === "submitting"}
                  />
                </div>

                {status === "error" && (
                  <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-3">
                    <p className="text-sm text-red-500">{errorMessage}</p>
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full h-12 bg-amber-600 hover:bg-amber-500 text-white font-medium"
                    disabled={status === "submitting"}
                    isLoading={status === "submitting"}
                  >
                    {status === "submitting" ? "Submitting..." : "Submit Request"}
                  </Button>
                </div>

                <p className="text-xs text-ui-fg-muted text-center">
                  We typically respond within 1-2 business days. Each knife is
                  handcrafted to order.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
