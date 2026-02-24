import { ExecArgs } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

export default async function seedCollections({ container }: ExecArgs) {
  const productService = container.resolve(Modules.PRODUCT)

  console.log("Creating steel collections...")

  const collections = [
    {
      title: "Damascus Collection",
      handle: "damascus",
      metadata: {
        description: "Our premium Damascus steel knives feature stunning patterns and exceptional edge retention.",
      },
    },
    {
      title: "Carbon Steel Collection",
      handle: "carbon-steel",
      metadata: {
        description: "Classic high-carbon steel for those who appreciate traditional craftsmanship.",
      },
    },
    {
      title: "Tool Steel Collection",
      handle: "tool-steel",
      metadata: {
        description: "Industrial-grade O1 tool steel for maximum durability and toughness.",
      },
    },
  ]

  for (const collection of collections) {
    const [created] = await productService.createProductCollections([collection])
    console.log(`Created collection: ${created.title}`)
  }

  console.log("Collections seeding complete!")
}
