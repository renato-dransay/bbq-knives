import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Knife Care Instructions | BBQ Knives",
  description:
    "Learn how to properly care for your BBQ knife. Essential tips for cleaning, storage, and maintenance to keep your blade in perfect condition.",
}

export default function CarePage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-ui-fg-base mb-6">
            Knife Care Guide
          </h1>
          <p className="text-xl text-ui-fg-muted max-w-2xl mx-auto">
            A well-cared-for knife will serve you for generations. Follow these
            guidelines to keep your BBQ Knife in peak condition.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Important Warning */}
          <section className="bg-amber-600/10 border border-amber-600/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-amber-600 mb-2">
                  Important: Never Use a Dishwasher
                </h2>
                <p className="text-ui-fg-muted">
                  High-carbon steel and Damascus steel are susceptible to rust
                  and discoloration. The harsh detergents and high heat of
                  dishwashers will damage your knife irreversibly. Always hand
                  wash your knife immediately after use.
                </p>
              </div>
            </div>
          </section>

          {/* Daily Care */}
          <section className="bg-ui-bg-subtle rounded-xl p-8 border border-ui-border-base">
            <h2 className="text-2xl font-semibold text-ui-fg-base mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>
              Daily Care
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-ui-fg-base mb-2">
                  After Each Use
                </h3>
                <ul className="list-disc list-inside text-ui-fg-muted space-y-2">
                  <li>
                    Wash immediately with warm water and mild dish soap
                  </li>
                  <li>
                    Use a soft sponge - never use abrasive scrubbers or steel
                    wool
                  </li>
                  <li>
                    Dry completely with a clean towel - do not air dry
                  </li>
                  <li>
                    Store in a knife block, on a magnetic strip, or in a
                    protective sheath
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-ui-fg-base mb-2">
                  Acidic Foods
                </h3>
                <p className="text-ui-fg-muted">
                  When cutting acidic foods (citrus, tomatoes, onions), wash
                  your knife immediately afterward. Acids can cause
                  discoloration and affect the patina on carbon steel blades.
                </p>
              </div>
            </div>
          </section>

          {/* Monthly Maintenance */}
          <section className="bg-ui-bg-subtle rounded-xl p-8 border border-ui-border-base">
            <h2 className="text-2xl font-semibold text-ui-fg-base mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </span>
              Monthly Maintenance
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-ui-fg-base mb-2">
                  Oil the Blade
                </h3>
                <p className="text-ui-fg-muted mb-2">
                  Apply a thin layer of food-safe mineral oil to the blade once
                  a month, or whenever the blade looks dry. This prevents rust
                  and helps maintain the steel.
                </p>
                <ol className="list-decimal list-inside text-ui-fg-muted space-y-1">
                  <li>Ensure the blade is clean and completely dry</li>
                  <li>Apply a few drops of food-safe mineral oil</li>
                  <li>Spread evenly with a soft cloth</li>
                  <li>Wipe off excess oil before storage</li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold text-ui-fg-base mb-2">
                  Handle Care
                </h3>
                <p className="text-ui-fg-muted">
                  For wooden handles (Walnut, Olive Wood), apply a small amount
                  of food-safe wood oil or beeswax to keep the wood hydrated and
                  prevent cracking. Micarta handles require no special
                  treatment.
                </p>
              </div>
            </div>
          </section>

          {/* Sharpening */}
          <section className="bg-ui-bg-subtle rounded-xl p-8 border border-ui-border-base">
            <h2 className="text-2xl font-semibold text-ui-fg-base mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </span>
              Sharpening
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-ui-fg-base mb-2">
                  When to Sharpen
                </h3>
                <p className="text-ui-fg-muted">
                  A sharp knife is a safe knife. If your blade struggles to
                  slice cleanly through paper or tomato skin, it&apos;s time to
                  sharpen. Typically, this is every 2-3 months with regular use.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-ui-fg-base mb-2">
                  Recommended Method
                </h3>
                <p className="text-ui-fg-muted mb-2">
                  We recommend using Japanese whetstones for the best results:
                </p>
                <ul className="list-disc list-inside text-ui-fg-muted space-y-1">
                  <li>1000 grit stone for regular sharpening</li>
                  <li>3000-6000 grit stone for polishing the edge</li>
                  <li>Maintain a 15-17° angle per side</li>
                  <li>
                    Use light pressure and consistent strokes
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-ui-fg-base mb-2">
                  What to Avoid
                </h3>
                <ul className="list-disc list-inside text-ui-fg-muted space-y-1">
                  <li>
                    Pull-through sharpeners - they remove too much material and
                    can damage the blade
                  </li>
                  <li>Electric sharpeners - generate heat that affects the temper</li>
                  <li>
                    Honing steels - can chip high-hardness blades (use ceramic
                    honing rods instead)
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Storage */}
          <section className="bg-ui-bg-subtle rounded-xl p-8 border border-ui-border-base">
            <h2 className="text-2xl font-semibold text-ui-fg-base mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                4
              </span>
              Proper Storage
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-ui-fg-base mb-2">
                  ✓ Recommended
                </h3>
                <ul className="text-ui-fg-muted space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    Magnetic knife strip (blade up)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    Individual blade guards/sheaths
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    Dedicated knife block
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    In-drawer knife organizer
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-ui-fg-base mb-2">
                  ✗ Avoid
                </h3>
                <ul className="text-ui-fg-muted space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    Loose in a drawer with other utensils
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    Wet or humid environments
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    Near the sink or dishwasher
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    In contact with other metals
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Patina */}
          <section className="bg-ui-bg-subtle rounded-xl p-8 border border-ui-border-base">
            <h2 className="text-2xl font-semibold text-ui-fg-base mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                5
              </span>
              Understanding Patina
            </h2>
            <p className="text-ui-fg-muted mb-4">
              Over time, your carbon steel or Damascus blade will develop a
              natural patina - a dark, often bluish-gray discoloration. This is
              completely normal and desirable! Patina:
            </p>
            <ul className="list-disc list-inside text-ui-fg-muted space-y-2">
              <li>
                Is a form of controlled oxidation that actually protects the
                steel from rust
              </li>
              <li>
                Creates unique, beautiful patterns that make your knife truly
                one-of-a-kind
              </li>
              <li>
                Develops faster when cutting acidic, sulfuric, or protein-rich
                foods
              </li>
              <li>
                Does not affect cutting performance in any way
              </li>
            </ul>
            <p className="text-ui-fg-muted mt-4 text-sm italic">
              Embrace the patina - it&apos;s a sign that your knife is being
              well-used and is developing character.
            </p>
          </section>

          {/* Quick Reference Card */}
          <section className="bg-ui-bg-base rounded-xl p-8 border-2 border-amber-600/30">
            <h2 className="text-xl font-semibold text-ui-fg-base mb-4 text-center">
              Quick Reference Card
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-amber-600 font-semibold mb-1">Daily</div>
                <p className="text-ui-fg-muted text-sm">
                  Hand wash, dry completely, store safely
                </p>
              </div>
              <div>
                <div className="text-amber-600 font-semibold mb-1">Monthly</div>
                <p className="text-ui-fg-muted text-sm">
                  Oil the blade, condition wooden handles
                </p>
              </div>
              <div>
                <div className="text-amber-600 font-semibold mb-1">
                  As Needed
                </div>
                <p className="text-ui-fg-muted text-sm">
                  Sharpen with whetstones (every 2-3 months)
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
