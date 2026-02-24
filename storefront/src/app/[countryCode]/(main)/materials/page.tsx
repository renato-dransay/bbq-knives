import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Materials Guide | BBQ Knives",
  description:
    "Learn about the premium steels and handle materials we use in our handmade BBQ knives. Damascus, Carbon Steel, and premium wood handles explained.",
}

export default function MaterialsPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-ui-fg-base mb-6">
            Materials Guide
          </h1>
          <p className="text-xl text-ui-fg-muted max-w-2xl mx-auto">
            Understanding what goes into your knife helps you choose the perfect
            blade. Here&apos;s everything you need to know about our premium
            materials.
          </p>
        </div>

        {/* Steel Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-ui-fg-base mb-8 text-center">
            Steel Types
          </h2>
          <div className="space-y-6">
            {/* Damascus Steel */}
            <section className="bg-ui-bg-subtle rounded-xl overflow-hidden border border-ui-border-base">
              <div className="bg-gradient-to-r from-amber-600/20 to-amber-600/5 p-6 border-b border-ui-border-base">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-ui-fg-base">
                    Damascus Steel
                  </h3>
                  <span className="bg-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Premium
                  </span>
                </div>
                <p className="text-ui-fg-muted mt-2">
                  The pinnacle of blade craftsmanship
                </p>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-ui-fg-muted">
                  Our Damascus steel is forged from multiple layers of high-carbon
                  steel, folded and hammered to create over 200 distinct layers.
                  This traditional technique results in the iconic wavy patterns
                  that make each blade unique.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-ui-fg-base mb-2">
                      Properties
                    </h4>
                    <ul className="text-ui-fg-muted text-sm space-y-1">
                      <li>• Hardness: 58-60 HRC</li>
                      <li>• Layers: 200+</li>
                      <li>• Core: VG-10 or similar</li>
                      <li>• Edge retention: Excellent</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-ui-fg-base mb-2">
                      Best For
                    </h4>
                    <ul className="text-ui-fg-muted text-sm space-y-1">
                      <li>• Collectors and enthusiasts</li>
                      <li>• Competition pitmasters</li>
                      <li>• Those who appreciate artistry</li>
                      <li>• Long-term investment pieces</li>
                    </ul>
                  </div>
                </div>
                <div className="pt-4 border-t border-ui-border-base">
                  <p className="text-sm text-ui-fg-muted italic">
                    Note: Each Damascus pattern is completely unique - no two
                    knives are ever identical.
                  </p>
                </div>
              </div>
            </section>

            {/* 1095 Carbon Steel */}
            <section className="bg-ui-bg-subtle rounded-xl overflow-hidden border border-ui-border-base">
              <div className="bg-ui-bg-base p-6 border-b border-ui-border-base">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-ui-fg-base">
                    1095 High-Carbon Steel
                  </h3>
                  <span className="bg-ui-fg-muted text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Classic
                  </span>
                </div>
                <p className="text-ui-fg-muted mt-2">
                  The workhorse of traditional blade making
                </p>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-ui-fg-muted">
                  1095 is a simple, straightforward high-carbon steel that has
                  been the backbone of American knife making for over a century.
                  Its high carbon content (0.95%) provides excellent edge retention
                  and ease of sharpening.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-ui-fg-base mb-2">
                      Properties
                    </h4>
                    <ul className="text-ui-fg-muted text-sm space-y-1">
                      <li>• Hardness: 57-59 HRC</li>
                      <li>• Carbon content: 0.95%</li>
                      <li>• Easy to sharpen</li>
                      <li>• Develops beautiful patina</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-ui-fg-base mb-2">
                      Best For
                    </h4>
                    <ul className="text-ui-fg-muted text-sm space-y-1">
                      <li>• Working professionals</li>
                      <li>• Regular heavy use</li>
                      <li>• Those who enjoy sharpening</li>
                      <li>• Budget-conscious buyers</li>
                    </ul>
                  </div>
                </div>
                <div className="pt-4 border-t border-ui-border-base">
                  <p className="text-sm text-ui-fg-muted italic">
                    Note: 1095 is reactive and will develop a patina over time,
                    which actually protects the steel.
                  </p>
                </div>
              </div>
            </section>

            {/* O1 Tool Steel */}
            <section className="bg-ui-bg-subtle rounded-xl overflow-hidden border border-ui-border-base">
              <div className="bg-ui-bg-base p-6 border-b border-ui-border-base">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-ui-fg-base">
                    O1 Tool Steel
                  </h3>
                  <span className="bg-zinc-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Professional
                  </span>
                </div>
                <p className="text-ui-fg-muted mt-2">
                  Industrial-grade performance
                </p>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-ui-fg-muted">
                  O1 (Oil-hardening) tool steel is an industrial-grade steel
                  designed for tools that require exceptional toughness and wear
                  resistance. Its balanced composition includes manganese,
                  chromium, and tungsten for superior performance.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-ui-fg-base mb-2">
                      Properties
                    </h4>
                    <ul className="text-ui-fg-muted text-sm space-y-1">
                      <li>• Hardness: 59-61 HRC</li>
                      <li>• Exceptional toughness</li>
                      <li>• Excellent wear resistance</li>
                      <li>• Takes a keen edge</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-ui-fg-base mb-2">
                      Best For
                    </h4>
                    <ul className="text-ui-fg-muted text-sm space-y-1">
                      <li>• Professional butchers</li>
                      <li>• High-volume cutting</li>
                      <li>• Demanding environments</li>
                      <li>• Maximum durability</li>
                    </ul>
                  </div>
                </div>
                <div className="pt-4 border-t border-ui-border-base">
                  <p className="text-sm text-ui-fg-muted italic">
                    Note: O1 requires slightly more care but rewards you with
                    outstanding edge retention.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Handle Materials */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-ui-fg-base mb-8 text-center">
            Handle Materials
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Walnut */}
            <section className="bg-ui-bg-subtle rounded-xl overflow-hidden border border-ui-border-base">
              <div className="h-32 bg-gradient-to-br from-amber-900 to-amber-800"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-ui-fg-base mb-2">
                  Walnut
                </h3>
                <p className="text-ui-fg-muted text-sm mb-4">
                  Classic American hardwood with rich, warm tones and excellent
                  durability. The natural grain creates unique patterns on each
                  handle.
                </p>
                <ul className="text-ui-fg-muted text-sm space-y-1">
                  <li>• Traditional appearance</li>
                  <li>• Comfortable grip</li>
                  <li>• Requires periodic oiling</li>
                </ul>
              </div>
            </section>

            {/* Olive Wood */}
            <section className="bg-ui-bg-subtle rounded-xl overflow-hidden border border-ui-border-base">
              <div className="h-32 bg-gradient-to-br from-yellow-700 to-yellow-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-ui-fg-base mb-2">
                  Olive Wood
                </h3>
                <p className="text-ui-fg-muted text-sm mb-4">
                  Mediterranean olive wood with stunning swirling grain patterns.
                  Extremely dense and naturally water-resistant.
                </p>
                <ul className="text-ui-fg-muted text-sm space-y-1">
                  <li>• Exotic appearance</li>
                  <li>• Naturally dense</li>
                  <li>• Water-resistant</li>
                </ul>
              </div>
            </section>

            {/* Micarta */}
            <section className="bg-ui-bg-subtle rounded-xl overflow-hidden border border-ui-border-base">
              <div className="h-32 bg-gradient-to-br from-zinc-700 to-zinc-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-ui-fg-base mb-2">
                  Micarta
                </h3>
                <p className="text-ui-fg-muted text-sm mb-4">
                  A composite of linen or canvas laminated with resin. Extremely
                  durable, weather-resistant, and requires zero maintenance.
                </p>
                <ul className="text-ui-fg-muted text-sm space-y-1">
                  <li>• Virtually indestructible</li>
                  <li>• No maintenance required</li>
                  <li>• Excellent wet grip</li>
                </ul>
              </div>
            </section>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-ui-fg-base mb-8 text-center">
            Steel Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-ui-bg-subtle rounded-xl overflow-hidden border border-ui-border-base">
              <thead>
                <tr className="bg-ui-bg-base">
                  <th className="p-4 text-left text-ui-fg-base font-semibold">
                    Property
                  </th>
                  <th className="p-4 text-center text-ui-fg-base font-semibold">
                    Damascus
                  </th>
                  <th className="p-4 text-center text-ui-fg-base font-semibold">
                    1095 Carbon
                  </th>
                  <th className="p-4 text-center text-ui-fg-base font-semibold">
                    O1 Tool
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ui-border-base">
                <tr>
                  <td className="p-4 text-ui-fg-muted">Hardness</td>
                  <td className="p-4 text-center text-ui-fg-base">58-60 HRC</td>
                  <td className="p-4 text-center text-ui-fg-base">57-59 HRC</td>
                  <td className="p-4 text-center text-ui-fg-base">59-61 HRC</td>
                </tr>
                <tr>
                  <td className="p-4 text-ui-fg-muted">Edge Retention</td>
                  <td className="p-4 text-center">
                    <span className="text-amber-500">★★★★★</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-amber-500">★★★★</span>
                    <span className="text-ui-fg-muted">☆</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-amber-500">★★★★★</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-ui-fg-muted">Ease of Sharpening</td>
                  <td className="p-4 text-center">
                    <span className="text-amber-500">★★★</span>
                    <span className="text-ui-fg-muted">☆☆</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-amber-500">★★★★★</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-amber-500">★★★★</span>
                    <span className="text-ui-fg-muted">☆</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-ui-fg-muted">Toughness</td>
                  <td className="p-4 text-center">
                    <span className="text-amber-500">★★★★</span>
                    <span className="text-ui-fg-muted">☆</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-amber-500">★★★★</span>
                    <span className="text-ui-fg-muted">☆</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-amber-500">★★★★★</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-ui-fg-muted">Corrosion Resistance</td>
                  <td className="p-4 text-center">
                    <span className="text-amber-500">★★★</span>
                    <span className="text-ui-fg-muted">☆☆</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-amber-500">★★</span>
                    <span className="text-ui-fg-muted">☆☆☆</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-amber-500">★★★</span>
                    <span className="text-ui-fg-muted">☆☆</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-ui-fg-muted">Aesthetics</td>
                  <td className="p-4 text-center">
                    <span className="text-amber-500">★★★★★</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-amber-500">★★★</span>
                    <span className="text-ui-fg-muted">☆☆</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-amber-500">★★★</span>
                    <span className="text-ui-fg-muted">☆☆</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-ui-fg-muted">Price Point</td>
                  <td className="p-4 text-center text-ui-fg-base">€€€</td>
                  <td className="p-4 text-center text-ui-fg-base">€</td>
                  <td className="p-4 text-center text-ui-fg-base">€€</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <section className="text-center py-8 bg-ui-bg-subtle rounded-xl border border-ui-border-base p-8">
          <h2 className="text-2xl font-semibold text-ui-fg-base mb-4">
            Not Sure Which to Choose?
          </h2>
          <p className="text-ui-fg-muted mb-6 max-w-xl mx-auto">
            Every pitmaster has different needs. Browse our collection and find
            the perfect combination of steel and handle for your BBQ journey.
          </p>
          <a
            href="/store"
            className="inline-block bg-amber-600 hover:bg-amber-500 text-white font-medium py-3 px-8 rounded-lg transition-colors"
          >
            Browse Our Collection
          </a>
        </section>
      </div>
    </div>
  )
}
