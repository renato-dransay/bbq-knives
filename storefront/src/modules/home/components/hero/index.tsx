import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="h-[80vh] w-full border-b border-border relative bg-gradient-to-b from-background to-card">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6 px-4">
        <span>
          <Heading
            level="h1"
            className="text-4xl md:text-6xl lg:text-7xl leading-tight text-foreground font-bold tracking-tight"
          >
            Handcrafted BBQ Knives
          </Heading>
          <Heading
            level="h2"
            className="text-xl md:text-2xl leading-relaxed text-muted font-normal mt-4 max-w-2xl mx-auto"
          >
            Forged with passion in Germany. Each blade tells a story of craftsmanship, designed for the serious pitmaster.
          </Heading>
        </span>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <LocalizedClientLink
            href="/collections/damascus"
            className="btn-primary text-center"
          >
            Shop Damascus
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/store"
            className="btn-secondary text-center"
          >
            View All Knives
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default Hero
