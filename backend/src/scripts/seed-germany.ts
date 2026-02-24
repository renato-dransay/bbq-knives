import { ExecArgs } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

export default async function seedGermany({ container }: ExecArgs) {
  const regionService = container.resolve(Modules.REGION)

  console.log("Checking for existing Germany region...")

  // Check if region already exists
  const existingRegions = await regionService.listRegions({
    name: "Germany",
  })

  if (existingRegions.length > 0) {
    console.log("Germany region already exists, skipping creation.")
    return
  }

  console.log("Creating Germany region...")

  // Create region
  const [region] = await regionService.createRegions([
    {
      name: "Germany",
      currency_code: "eur",
      countries: ["de"],
      automatic_taxes: true,
    },
  ])

  console.log(`Created region: ${region.id}`)
  console.log("Region setup complete. Configure shipping in Admin dashboard.")
}
