import { ExecArgs } from "@medusajs/framework/types"
import {
  createProductsWorkflow,
  createPriceListsWorkflow,
} from "@medusajs/medusa/core-flows"

export default async function seedProducts({ container }: ExecArgs) {
  console.log("Creating BBQ knife products...")

  // Steel options
  const steelOptions = ["Damascus", "1095 Carbon", "O1 Tool Steel"]
  // Handle options
  const handleOptions = ["Walnut", "Micarta", "Olive Wood"]

  // Create Pitmaster Slicer
  const pitmasterVariants = generateVariants(steelOptions, handleOptions, {
    basePrice: 22900, // €229.00 in cents
    damascusPremium: 6000, // €60 extra for Damascus
    skuPrefix: "PMS",
  })

  const { result: pitmasterResult } = await createProductsWorkflow(container).run({
    input: {
      products: [
        {
          title: "Pitmaster Slicer",
          handle: "pitmaster-slicer",
          description:
            "A 30cm slicing knife designed for brisket and large cuts. The long, thin blade glides through meat with minimal resistance.",
          status: "published",
          metadata: {
            blade_length_cm: 30,
            total_length_cm: 45,
            hardness_hrc: "58-60",
            artisan_notes:
              "Inspired by traditional German butcher knives, optimized for American BBQ.",
            care_instructions:
              "Hand wash immediately after use. Dry thoroughly. Apply food-safe mineral oil monthly.",
          },
          options: [
            { title: "Steel Type", values: steelOptions },
            { title: "Handle Material", values: handleOptions },
          ],
          variants: pitmasterVariants,
        },
      ],
    },
  })

  console.log(`Created product: Pitmaster Slicer (${pitmasterResult.length} variants)`)

  // Create Trimming Knife
  const trimmerVariants = generateVariants(steelOptions, handleOptions, {
    basePrice: 17900, // €179.00 in cents
    damascusPremium: 5000, // €50 extra for Damascus
    skuPrefix: "TRK",
  })

  const { result: trimmerResult } = await createProductsWorkflow(container).run({
    input: {
      products: [
        {
          title: "Trimming Knife",
          handle: "trimming-knife",
          description:
            "A nimble 15cm knife for trimming fat and detailed work. Essential for competition BBQ prep.",
          status: "published",
          metadata: {
            blade_length_cm: 15,
            total_length_cm: 28,
            hardness_hrc: "59-61",
            artisan_notes: "Compact and agile, perfect for intricate trimming work.",
            care_instructions:
              "Hand wash immediately after use. Dry thoroughly. Apply food-safe mineral oil monthly.",
          },
          options: [
            { title: "Steel Type", values: steelOptions },
            { title: "Handle Material", values: handleOptions },
          ],
          variants: trimmerVariants,
        },
      ],
    },
  })

  console.log(`Created product: Trimming Knife (${trimmerResult.length} variants)`)

  // Create Boning Knife
  const boningVariants = generateVariants(steelOptions, handleOptions, {
    basePrice: 19900, // €199.00 in cents
    damascusPremium: 5500, // €55 extra for Damascus
    skuPrefix: "BNK",
  })

  const { result: boningResult } = await createProductsWorkflow(container).run({
    input: {
      products: [
        {
          title: "Boning Knife",
          handle: "boning-knife",
          description:
            "A flexible 18cm boning knife for separating meat from bone. The curved blade follows contours perfectly.",
          status: "published",
          metadata: {
            blade_length_cm: 18,
            total_length_cm: 32,
            hardness_hrc: "58-60",
            artisan_notes:
              "Designed for deboning whole racks and preparing ribs with precision.",
            care_instructions:
              "Hand wash immediately after use. Dry thoroughly. Apply food-safe mineral oil monthly.",
          },
          options: [
            { title: "Steel Type", values: steelOptions },
            { title: "Handle Material", values: handleOptions },
          ],
          variants: boningVariants,
        },
      ],
    },
  })

  console.log(`Created product: Boning Knife (${boningResult.length} variants)`)

  console.log("Product seeding complete!")
}

function generateVariants(
  steels: string[],
  handles: string[],
  config: { basePrice: number; damascusPremium: number; skuPrefix: string }
) {
  const variants: any[] = []
  let counter = 1

  for (const steel of steels) {
    for (const handle of handles) {
      const isDamascus = steel === "Damascus"
      const price = config.basePrice + (isDamascus ? config.damascusPremium : 0)

      variants.push({
        title: `${steel} / ${handle}`,
        sku: `${config.skuPrefix}-${String(counter++).padStart(3, "0")}`,
        manage_inventory: true,
        options: {
          "Steel Type": steel,
          "Handle Material": handle,
        },
        prices: [
          {
            currency_code: "eur",
            amount: price,
          },
        ],
      })
    }
  }

  return variants
}
