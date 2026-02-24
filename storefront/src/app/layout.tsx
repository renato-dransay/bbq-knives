import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import "styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: "BBQ Knives | Handmade in Germany",
  description: "Premium handmade barbecue knives crafted with passion in Germany. Damascus, Carbon Steel, and Tool Steel blades for pitmasters.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="de" data-mode="dark">
      <body className={inter.className}>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
