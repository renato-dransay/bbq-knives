import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | BBQ Knives",
  description:
    "Learn about our passion for crafting premium BBQ knives in Germany. Discover the story behind our handmade blades.",
}

export default function AboutPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-ui-fg-base mb-6">
            Our Story
          </h1>
          <p className="text-xl text-ui-fg-muted max-w-2xl mx-auto">
            Forged with passion, crafted with precision. Every BBQ Knife tells a
            story of dedication to the art of blade making.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* The Beginning */}
          <section className="bg-ui-bg-subtle rounded-xl p-8 border border-ui-border-base">
            <h2 className="text-2xl font-semibold text-ui-fg-base mb-4">
              The Beginning
            </h2>
            <p className="text-ui-fg-muted leading-relaxed mb-4">
              What started as a hobby in a small workshop in Germany has grown
              into a passion project dedicated to creating the finest BBQ knives
              for pitmasters around the world. Our journey began when we
              realized that the perfect brisket deserves the perfect blade.
            </p>
            <p className="text-ui-fg-muted leading-relaxed">
              Each knife we create is a testament to the German tradition of
              precision craftsmanship, combined with the rugged requirements of
              American barbecue culture.
            </p>
          </section>

          {/* Our Philosophy */}
          <section className="bg-ui-bg-subtle rounded-xl p-8 border border-ui-border-base">
            <h2 className="text-2xl font-semibold text-ui-fg-base mb-4">
              Our Philosophy
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-ui-fg-base mb-2">Quality</h3>
                <p className="text-ui-fg-muted text-sm">
                  Only the finest materials make it into our workshop. No
                  compromises.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-ui-fg-base mb-2">Patience</h3>
                <p className="text-ui-fg-muted text-sm">
                  Great knives take time. We never rush the forging process.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-ui-fg-base mb-2">Passion</h3>
                <p className="text-ui-fg-muted text-sm">
                  Every blade is crafted with love for the craft and respect for
                  BBQ tradition.
                </p>
              </div>
            </div>
          </section>

          {/* The Craft */}
          <section className="bg-ui-bg-subtle rounded-xl p-8 border border-ui-border-base">
            <h2 className="text-2xl font-semibold text-ui-fg-base mb-4">
              The Craft
            </h2>
            <p className="text-ui-fg-muted leading-relaxed mb-4">
              Each BBQ Knife begins its journey as raw steel. Through careful
              heating, folding, and hammering, we transform this raw material
              into a precision cutting instrument. Our Damascus steel knives
              feature over 200 layers of hand-folded metal, creating the
              distinctive patterns that make each knife unique.
            </p>
            <p className="text-ui-fg-muted leading-relaxed mb-4">
              The heat treatment process is where science meets art. We
              carefully control temperatures to achieve the perfect balance of
              hardness (58-60 HRC) and flexibility, ensuring your blade holds
              its edge while remaining resilient.
            </p>
            <p className="text-ui-fg-muted leading-relaxed">
              Finally, each handle is shaped by hand from premium materials
              like walnut, olive wood, or Micarta, ergonomically designed for
              hours of comfortable use at the smoker.
            </p>
          </section>

          {/* Made in Germany */}
          <section className="bg-ui-bg-subtle rounded-xl p-8 border border-ui-border-base">
            <h2 className="text-2xl font-semibold text-ui-fg-base mb-4">
              Made in Germany
            </h2>
            <p className="text-ui-fg-muted leading-relaxed">
              Germany has a centuries-long tradition of blade making, from
              Solingen&apos;s world-famous cutlery to the hunting knives of the
              Black Forest. We are proud to continue this tradition, bringing
              German precision and quality to the world of American BBQ. Every
              knife that leaves our workshop carries with it the heritage of
              German craftsmanship.
            </p>
          </section>

          {/* CTA */}
          <section className="text-center py-8">
            <h2 className="text-2xl font-semibold text-ui-fg-base mb-4">
              Ready to Experience the Difference?
            </h2>
            <p className="text-ui-fg-muted mb-6">
              Browse our collection and find the perfect blade for your BBQ
              journey.
            </p>
            <a
              href="/store"
              className="inline-block bg-amber-600 hover:bg-amber-500 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Shop All Knives
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}
