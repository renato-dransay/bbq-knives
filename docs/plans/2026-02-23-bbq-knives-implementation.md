# BBQ Knives E-Commerce Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a production-ready e-commerce platform for handmade BBQ knives using MedusaJS v2 and Next.js 15.

**Architecture:** Docker Compose orchestrates PostgreSQL, Redis, Medusa backend (with Admin), and Next.js storefront. Standard Medusa variant system handles steel/handle combinations. Custom API route for knife request form.

**Tech Stack:** MedusaJS v2, Next.js 15, PostgreSQL 16, Redis 7, Docker, Tailwind CSS, Stripe, PayPal

---

## Phase 1: Project Scaffolding & Docker Setup

### Task 1.1: Create Project Structure

**Files:**
- Create: `docker-compose.yml`
- Create: `.gitignore`
- Create: `.env.example`

**Step 1: Create docker-compose.yml**

```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: bbq_postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: medusa-bbq
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - bbq_network

  redis:
    image: redis:7-alpine
    container_name: bbq_redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - bbq_network

volumes:
  postgres_data:
  redis_data:

networks:
  bbq_network:
    driver: bridge
```

**Step 2: Create .gitignore**

```
# Dependencies
node_modules/
.pnp/
.pnp.js

# Build
dist/
build/
.next/
out/

# Environment
.env
.env.local
.env.*.local

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS
.DS_Store
Thumbs.db

# IDE
.idea/
.vscode/
*.swp
*.swo

# Docker
postgres_data/
redis_data/
```

**Step 3: Create .env.example**

```bash
# Database
DATABASE_URL=postgres://postgres:postgres@localhost:5432/medusa-bbq

# Redis
REDIS_URL=redis://localhost:6379

# Medusa
MEDUSA_ADMIN_ONBOARDING_TYPE=default
STORE_CORS=http://localhost:8000
ADMIN_CORS=http://localhost:9000

# Stripe
STRIPE_API_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# PayPal
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_SANDBOX=true
```

**Step 4: Start database services**

Run: `docker-compose up -d postgres redis`
Expected: Both containers running

**Step 5: Verify services**

Run: `docker-compose ps`
Expected: postgres and redis show "Up"

**Step 6: Commit**

```bash
git add docker-compose.yml .gitignore .env.example
git commit -m "chore: add Docker Compose setup for postgres and redis"
```

---

### Task 1.2: Initialize Medusa Backend

**Files:**
- Create: `backend/` (via CLI)
- Modify: `backend/.env`
- Modify: `backend/medusa-config.ts`

**Step 1: Create Medusa application**

Run from project root:
```bash
npx create-medusa-app@latest backend --skip-db --no-browser
```

When prompted:
- PostgreSQL database URL: `postgres://postgres:postgres@localhost:5432/medusa-bbq`
- Skip admin user creation: Yes (we'll create later)

**Step 2: Configure environment variables**

Create `backend/.env`:
```bash
DATABASE_URL=postgres://postgres:postgres@localhost:5432/medusa-bbq
REDIS_URL=redis://localhost:6379
STORE_CORS=http://localhost:8000
ADMIN_CORS=http://localhost:9000,http://localhost:5173
JWT_SECRET=your-super-secret-jwt-key-change-in-production
COOKIE_SECRET=your-super-secret-cookie-key-change-in-production
```

**Step 3: Run database migrations**

Run: `cd backend && npx medusa db:migrate`
Expected: Migrations complete successfully

**Step 4: Create admin user**

Run: `npx medusa user -e admin@bbq-knives.de -p supersecret123`
Expected: Admin user created

**Step 5: Start Medusa in development mode**

Run: `npm run dev`
Expected: Server running on http://localhost:9000, Admin on http://localhost:5173

**Step 6: Verify API is running**

Run: `curl http://localhost:9000/health`
Expected: `{"status":"ok"}`

**Step 7: Commit**

```bash
cd .. && git add backend/
git commit -m "feat: initialize Medusa backend with database config"
```

---

### Task 1.3: Initialize Next.js Storefront

**Files:**
- Create: `storefront/` (via CLI)
- Modify: `storefront/.env.local`

**Step 1: Create Next.js project**

Run from project root:
```bash
npx create-next-app@latest storefront --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

**Step 2: Install Medusa dependencies**

```bash
cd storefront
npm install @medusajs/js-sdk @medusajs/types
```

**Step 3: Create environment file**

Create `storefront/.env.local`:
```bash
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_DEFAULT_REGION=de
```

**Step 4: Create Medusa SDK client**

Create `storefront/src/lib/sdk.ts`:
```typescript
import Medusa from "@medusajs/js-sdk"

export const sdk = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  debug: process.env.NODE_ENV === "development",
})
```

**Step 5: Start storefront**

Run: `npm run dev`
Expected: Next.js running on http://localhost:3000

**Step 6: Commit**

```bash
cd .. && git add storefront/
git commit -m "feat: initialize Next.js storefront with Medusa SDK"
```

---

### Task 1.4: Dockerize Backend

**Files:**
- Create: `backend/Dockerfile`
- Create: `backend/start.sh`
- Modify: `docker-compose.yml`

**Step 1: Create backend Dockerfile**

Create `backend/Dockerfile`:
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN chmod +x start.sh

EXPOSE 9000 5173

CMD ["./start.sh"]
```

**Step 2: Create start script**

Create `backend/start.sh`:
```bash
#!/bin/sh
set -e

echo "Running database migrations..."
npx medusa db:migrate

echo "Starting Medusa server..."
npm run dev
```

**Step 3: Update docker-compose.yml**

Add medusa service to `docker-compose.yml`:
```yaml
  medusa:
    build: ./backend
    container_name: bbq_medusa
    restart: unless-stopped
    depends_on:
      - postgres
      - redis
    ports:
      - "9000:9000"
      - "5173:5173"
    environment:
      DATABASE_URL: postgres://postgres:postgres@postgres:5432/medusa-bbq
      REDIS_URL: redis://redis:6379
      STORE_CORS: http://localhost:8000
      ADMIN_CORS: http://localhost:9000,http://localhost:5173
      JWT_SECRET: your-super-secret-jwt-key-change-in-production
      COOKIE_SECRET: your-super-secret-cookie-key-change-in-production
    volumes:
      - ./backend:/app
      - /app/node_modules
    networks:
      - bbq_network
```

**Step 4: Test Docker build**

Run: `docker-compose build medusa`
Expected: Build completes successfully

**Step 5: Test full stack**

Run: `docker-compose up -d`
Expected: All services running

**Step 6: Verify Medusa in Docker**

Run: `curl http://localhost:9000/health`
Expected: `{"status":"ok"}`

**Step 7: Commit**

```bash
git add backend/Dockerfile backend/start.sh docker-compose.yml
git commit -m "feat: dockerize Medusa backend"
```

---

### Task 1.5: Dockerize Storefront

**Files:**
- Create: `storefront/Dockerfile`
- Modify: `docker-compose.yml`

**Step 1: Create storefront Dockerfile**

Create `storefront/Dockerfile`:
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

**Step 2: Add storefront to docker-compose.yml**

Add service:
```yaml
  storefront:
    build: ./storefront
    container_name: bbq_storefront
    restart: unless-stopped
    depends_on:
      - medusa
    ports:
      - "8000:3000"
    environment:
      NEXT_PUBLIC_MEDUSA_BACKEND_URL: http://medusa:9000
      NEXT_PUBLIC_DEFAULT_REGION: de
    volumes:
      - ./storefront:/app
      - /app/node_modules
      - /app/.next
    networks:
      - bbq_network
```

**Step 3: Update CORS for internal Docker network**

Update medusa service environment:
```yaml
      STORE_CORS: http://localhost:8000,http://storefront:3000
```

**Step 4: Test full stack**

Run: `docker-compose down && docker-compose up -d --build`
Expected: All 4 services running

**Step 5: Verify storefront**

Open: http://localhost:8000
Expected: Next.js default page loads

**Step 6: Commit**

```bash
git add storefront/Dockerfile docker-compose.yml
git commit -m "feat: dockerize Next.js storefront"
```

---

## Phase 2: Medusa Configuration

### Task 2.1: Configure Germany Region & Shipping

**Files:**
- Create: `backend/src/scripts/seed-germany.ts`

**Step 1: Create seed script for Germany region**

Create `backend/src/scripts/seed-germany.ts`:
```typescript
import { ExecArgs } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

export default async function seedGermany({ container }: ExecArgs) {
  const regionService = container.resolve(Modules.REGION)
  const fulfillmentService = container.resolve(Modules.FULFILLMENT)

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

  // Create shipping options via Admin API (requires fulfillment provider setup)
  console.log("Region setup complete. Configure shipping in Admin dashboard.")
}
```

**Step 2: Run seed script**

Run: `cd backend && npx medusa exec src/scripts/seed-germany.ts`
Expected: Germany region created

**Step 3: Verify in Admin**

Open: http://localhost:5173
Login and navigate to Settings > Regions
Expected: Germany region visible

**Step 4: Commit**

```bash
git add backend/src/scripts/seed-germany.ts
git commit -m "feat: add Germany region seed script"
```

---

### Task 2.2: Configure Payment Providers (Stripe)

**Files:**
- Modify: `backend/medusa-config.ts`
- Modify: `backend/.env`

**Step 1: Install Stripe provider (if not included)**

Run: `cd backend && npm install @medusajs/stripe`

**Step 2: Add Stripe to medusa-config.ts**

Add to modules array in `backend/medusa-config.ts`:
```typescript
{
  resolve: "@medusajs/medusa/payment",
  options: {
    providers: [
      {
        resolve: "@medusajs/stripe",
        id: "stripe",
        options: {
          apiKey: process.env.STRIPE_API_KEY,
        },
      },
    ],
  },
},
```

**Step 3: Add Stripe keys to .env**

Add to `backend/.env`:
```bash
STRIPE_API_KEY=sk_test_your_stripe_secret_key
```

**Step 4: Restart Medusa**

Run: `docker-compose restart medusa`
Expected: Medusa restarts without errors

**Step 5: Enable Stripe in Admin**

Open Admin > Settings > Regions > Germany > Payment Providers
Enable: Stripe

**Step 6: Commit**

```bash
git add backend/medusa-config.ts
git commit -m "feat: configure Stripe payment provider"
```

---

### Task 2.3: Configure PayPal Provider

**Files:**
- Modify: `backend/medusa-config.ts`
- Modify: `backend/.env`

**Step 1: Install PayPal provider**

Run: `cd backend && npm install @medusajs/paypal`

**Step 2: Add PayPal to medusa-config.ts**

Add to payment providers array:
```typescript
{
  resolve: "@medusajs/paypal",
  id: "paypal",
  options: {
    clientId: process.env.PAYPAL_CLIENT_ID,
    clientSecret: process.env.PAYPAL_CLIENT_SECRET,
    sandbox: process.env.PAYPAL_SANDBOX === "true",
  },
},
```

**Step 3: Add PayPal keys to .env**

Add to `backend/.env`:
```bash
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_SANDBOX=true
```

**Step 4: Restart and enable in Admin**

Run: `docker-compose restart medusa`
Enable PayPal in Admin > Settings > Regions > Germany

**Step 5: Commit**

```bash
git add backend/medusa-config.ts
git commit -m "feat: configure PayPal payment provider"
```

---

## Phase 3: Product Data Model

### Task 3.1: Create Sample Products with Variants

**Files:**
- Create: `backend/src/scripts/seed-products.ts`

**Step 1: Create product seed script**

Create `backend/src/scripts/seed-products.ts`:
```typescript
import { ExecArgs } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

export default async function seedProducts({ container }: ExecArgs) {
  const productService = container.resolve(Modules.PRODUCT)
  const salesChannelService = container.resolve(Modules.SALES_CHANNEL)
  const pricingService = container.resolve(Modules.PRICING)

  // Get default sales channel
  const [salesChannel] = await salesChannelService.listSalesChannels({})

  console.log("Creating BBQ knife products...")

  // Steel options
  const steelOptions = ["Damascus", "1095 Carbon", "O1 Tool Steel"]
  // Handle options
  const handleOptions = ["Walnut", "Micarta", "Olive Wood"]

  // Create first product: Pitmaster Slicer
  const [pitmaster] = await productService.createProducts([
    {
      title: "Pitmaster Slicer",
      handle: "pitmaster-slicer",
      description: "A 30cm slicing knife designed for brisket and large cuts. The long, thin blade glides through meat with minimal resistance.",
      status: "published",
      metadata: {
        blade_length_cm: 30,
        total_length_cm: 45,
        hardness_hrc: "58-60",
        artisan_notes: "Inspired by traditional German butcher knives, optimized for American BBQ.",
        care_instructions: "Hand wash immediately after use. Dry thoroughly. Apply food-safe mineral oil monthly.",
      },
      options: [
        { title: "Steel Type", values: steelOptions },
        { title: "Handle Material", values: handleOptions },
      ],
      variants: generateVariants(steelOptions, handleOptions, {
        basePrice: 22900, // €229.00 in cents
        damascusPremium: 6000, // €60 extra for Damascus
      }),
    },
  ])

  console.log(`Created product: ${pitmaster.title}`)

  // Create second product: Trimming Knife
  const [trimmer] = await productService.createProducts([
    {
      title: "Trimming Knife",
      handle: "trimming-knife",
      description: "A nimble 15cm knife for trimming fat and detailed work. Essential for competition BBQ prep.",
      status: "published",
      metadata: {
        blade_length_cm: 15,
        total_length_cm: 28,
        hardness_hrc: "59-61",
        artisan_notes: "Compact and agile, perfect for intricate trimming work.",
        care_instructions: "Hand wash immediately after use. Dry thoroughly. Apply food-safe mineral oil monthly.",
      },
      options: [
        { title: "Steel Type", values: steelOptions },
        { title: "Handle Material", values: handleOptions },
      ],
      variants: generateVariants(steelOptions, handleOptions, {
        basePrice: 17900,
        damascusPremium: 5000,
      }),
    },
  ])

  console.log(`Created product: ${trimmer.title}`)

  console.log("Product seeding complete!")
}

function generateVariants(
  steels: string[],
  handles: string[],
  pricing: { basePrice: number; damascusPremium: number }
) {
  const variants = []
  let skuCounter = 1

  for (const steel of steels) {
    for (const handle of handles) {
      const isDamascus = steel === "Damascus"
      const price = pricing.basePrice + (isDamascus ? pricing.damascusPremium : 0)

      variants.push({
        title: `${steel} / ${handle}`,
        sku: `BBQ-${String(skuCounter++).padStart(3, "0")}`,
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
```

**Step 2: Run seed script**

Run: `cd backend && npx medusa exec src/scripts/seed-products.ts`
Expected: Products created successfully

**Step 3: Verify in Admin**

Open Admin > Products
Expected: 2 products with 9 variants each

**Step 4: Commit**

```bash
git add backend/src/scripts/seed-products.ts
git commit -m "feat: add BBQ knife product seed script"
```

---

### Task 3.2: Create Steel Collections

**Files:**
- Create: `backend/src/scripts/seed-collections.ts`

**Step 1: Create collections seed script**

Create `backend/src/scripts/seed-collections.ts`:
```typescript
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
```

**Step 2: Run seed script**

Run: `cd backend && npx medusa exec src/scripts/seed-collections.ts`
Expected: Collections created

**Step 3: Assign products to collections in Admin**

Open Admin > Products > Edit each product
Assign to appropriate collection based on available variants

**Step 4: Commit**

```bash
git add backend/src/scripts/seed-collections.ts
git commit -m "feat: add steel collections seed script"
```

---

## Phase 4: Custom Request Form API

### Task 4.1: Create Request Form API Route

**Files:**
- Create: `backend/src/api/store/knife-requests/route.ts`
- Create: `backend/src/api/middlewares.ts`

**Step 1: Create knife request API route**

Create `backend/src/api/store/knife-requests/route.ts`:
```typescript
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

type KnifeRequestBody = {
  name: string
  email: string
  product_title: string
  steel_type: string
  handle_material: string
  message?: string
}

export async function POST(
  req: MedusaRequest<KnifeRequestBody>,
  res: MedusaResponse
) {
  const { name, email, product_title, steel_type, handle_material, message } = req.body

  // Validate required fields
  if (!name || !email || !product_title || !steel_type || !handle_material) {
    return res.status(400).json({
      message: "Missing required fields: name, email, product_title, steel_type, handle_material",
    })
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    })
  }

  // Store the request (using notification module or custom storage)
  // For now, log and return success - will integrate with email later
  console.log("Knife request received:", {
    name,
    email,
    product_title,
    steel_type,
    handle_material,
    message,
    timestamp: new Date().toISOString(),
  })

  // TODO: Send email notification to artisan
  // TODO: Store in database for tracking

  return res.status(201).json({
    message: "Request submitted successfully. We will contact you soon.",
    data: {
      name,
      email,
      product_title,
      steel_type,
      handle_material,
    },
  })
}
```

**Step 2: Add request validation middleware**

Create `backend/src/api/middlewares.ts`:
```typescript
import { defineMiddlewares } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"

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
```

**Step 3: Test the API endpoint**

Run:
```bash
curl -X POST http://localhost:9000/store/knife-requests \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Max Mustermann",
    "email": "max@example.com",
    "product_title": "Pitmaster Slicer",
    "steel_type": "Damascus",
    "handle_material": "Ebony",
    "message": "Looking for this combination"
  }'
```
Expected: 201 response with success message

**Step 4: Commit**

```bash
git add backend/src/api/
git commit -m "feat: add knife request API endpoint"
```

---

## Phase 5: Storefront Core Pages

### Task 5.1: Create Layout and Theme

**Files:**
- Modify: `storefront/src/app/layout.tsx`
- Modify: `storefront/tailwind.config.ts`
- Create: `storefront/src/app/globals.css`

**Step 1: Configure dark theme in Tailwind**

Update `storefront/tailwind.config.ts`:
```typescript
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#fafafa",
        card: "#1a1a1a",
        border: "#2a2a2a",
        accent: {
          DEFAULT: "#d97706", // amber-600
          light: "#f59e0b",   // amber-500
          dark: "#b45309",    // amber-700
        },
        muted: "#737373",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}

export default config
```

**Step 2: Update global styles**

Replace `storefront/src/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-foreground antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-display font-semibold tracking-tight;
  }
}

@layer components {
  .btn-primary {
    @apply bg-accent hover:bg-accent-light text-white font-medium py-3 px-6 rounded-lg transition-colors;
  }

  .btn-secondary {
    @apply bg-card hover:bg-border text-foreground font-medium py-3 px-6 rounded-lg border border-border transition-colors;
  }

  .card {
    @apply bg-card rounded-xl border border-border p-6;
  }
}
```

**Step 3: Update root layout**

Update `storefront/src/app/layout.tsx`:
```typescript
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BBQ Knives | Handmade in Germany",
  description: "Premium handmade barbecue knives crafted with passion in Germany.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

**Step 4: Verify styling**

Open: http://localhost:8000
Expected: Dark background visible

**Step 5: Commit**

```bash
git add storefront/src/app/ storefront/tailwind.config.ts
git commit -m "feat: configure dark theme and global styles"
```

---

### Task 5.2: Create Header Component

**Files:**
- Create: `storefront/src/components/layout/Header.tsx`
- Modify: `storefront/src/app/layout.tsx`

**Step 1: Create Header component**

Create `storefront/src/components/layout/Header.tsx`:
```typescript
import Link from "next/link"

export function Header() {
  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-foreground">
          BBQ Knives
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/collections/damascus" className="text-muted hover:text-foreground transition-colors">
            Damascus
          </Link>
          <Link href="/collections/carbon-steel" className="text-muted hover:text-foreground transition-colors">
            Carbon Steel
          </Link>
          <Link href="/about" className="text-muted hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/care" className="text-muted hover:text-foreground transition-colors">
            Care
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="text-muted hover:text-foreground transition-colors">
            Cart (0)
          </Link>
        </div>
      </div>
    </header>
  )
}
```

**Step 2: Add Header to layout**

Update `storefront/src/app/layout.tsx`:
```typescript
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/Header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BBQ Knives | Handmade in Germany",
  description: "Premium handmade barbecue knives crafted with passion in Germany.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
```

**Step 3: Verify header**

Open: http://localhost:8000
Expected: Header with navigation visible

**Step 4: Commit**

```bash
git add storefront/src/components/ storefront/src/app/layout.tsx
git commit -m "feat: add Header component"
```

---

### Task 5.3: Create Homepage

**Files:**
- Modify: `storefront/src/app/page.tsx`
- Create: `storefront/src/components/home/Hero.tsx`
- Create: `storefront/src/components/home/FeaturedProducts.tsx`

**Step 1: Create Hero component**

Create `storefront/src/components/home/Hero.tsx`:
```typescript
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-b from-background to-card">
      <div className="text-center max-w-3xl px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Handcrafted BBQ Knives
        </h1>
        <p className="text-xl text-muted mb-8 max-w-xl mx-auto">
          Forged with passion in Germany. Each blade tells a story of craftsmanship,
          designed for the serious pitmaster.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/collections/damascus" className="btn-primary">
            Shop Damascus
          </Link>
          <Link href="/about" className="btn-secondary">
            Our Story
          </Link>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Create FeaturedProducts component**

Create `storefront/src/components/home/FeaturedProducts.tsx`:
```typescript
import Link from "next/link"
import { sdk } from "@/lib/sdk"
import { HttpTypes } from "@medusajs/types"

async function getProducts(): Promise<HttpTypes.StoreProduct[]> {
  try {
    const { products } = await sdk.store.product.list({
      limit: 4,
      fields: "id,title,handle,thumbnail,variants.prices.*",
    })
    return products || []
  } catch (error) {
    console.error("Failed to fetch products:", error)
    return []
  }
}

export async function FeaturedProducts() {
  const products = await getProducts()

  if (products.length === 0) {
    return null
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Knives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.handle}`}
              className="card group hover:border-accent transition-colors"
            >
              <div className="aspect-square bg-border rounded-lg mb-4 overflow-hidden">
                {product.thumbnail && (
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                )}
              </div>
              <h3 className="font-semibold mb-2">{product.title}</h3>
              <p className="text-accent">
                From €{((product.variants?.[0]?.prices?.[0]?.amount || 0) / 100).toFixed(2)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 3: Update homepage**

Replace `storefront/src/app/page.tsx`:
```typescript
import { Hero } from "@/components/home/Hero"
import { FeaturedProducts } from "@/components/home/FeaturedProducts"

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  )
}
```

**Step 4: Verify homepage**

Open: http://localhost:8000
Expected: Hero section and featured products visible

**Step 5: Commit**

```bash
git add storefront/src/
git commit -m "feat: add homepage with Hero and FeaturedProducts"
```

---

## Phase 6: Product Pages

### Task 6.1: Create Product Detail Page

**Files:**
- Create: `storefront/src/app/products/[handle]/page.tsx`
- Create: `storefront/src/components/product/ProductConfigurator.tsx`

**Step 1: Create product page**

Create `storefront/src/app/products/[handle]/page.tsx`:
```typescript
import { sdk } from "@/lib/sdk"
import { notFound } from "next/navigation"
import { ProductConfigurator } from "@/components/product/ProductConfigurator"

async function getProduct(handle: string) {
  try {
    const { products } = await sdk.store.product.list({
      handle,
      fields: "*variants,*variants.prices,*options,*options.values",
    })
    return products?.[0] || null
  } catch {
    return null
  }
}

export default async function ProductPage({
  params,
}: {
  params: { handle: string }
}) {
  const product = await getProduct(params.handle)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="aspect-square bg-card rounded-xl overflow-hidden">
          {product.thumbnail && (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Product Info & Configurator */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-muted mb-8">{product.description}</p>

          <ProductConfigurator product={product} />

          {/* Metadata */}
          {product.metadata && (
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="font-semibold mb-4">Specifications</h3>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                {product.metadata.blade_length_cm && (
                  <>
                    <dt className="text-muted">Blade Length</dt>
                    <dd>{product.metadata.blade_length_cm} cm</dd>
                  </>
                )}
                {product.metadata.total_length_cm && (
                  <>
                    <dt className="text-muted">Total Length</dt>
                    <dd>{product.metadata.total_length_cm} cm</dd>
                  </>
                )}
                {product.metadata.hardness_hrc && (
                  <>
                    <dt className="text-muted">Hardness</dt>
                    <dd>{product.metadata.hardness_hrc} HRC</dd>
                  </>
                )}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

**Step 2: Create ProductConfigurator component**

Create `storefront/src/components/product/ProductConfigurator.tsx`:
```typescript
"use client"

import { useState, useMemo } from "react"
import { HttpTypes } from "@medusajs/types"

type Props = {
  product: HttpTypes.StoreProduct
}

export function ProductConfigurator({ product }: Props) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})

  // Find matching variant based on selected options
  const selectedVariant = useMemo(() => {
    if (!product.variants || Object.keys(selectedOptions).length === 0) {
      return product.variants?.[0]
    }

    return product.variants.find((variant) => {
      return Object.entries(selectedOptions).every(([key, value]) => {
        const optionValue = variant.options?.find(
          (opt) => opt.option?.title === key
        )
        return optionValue?.value === value
      })
    })
  }, [product.variants, selectedOptions])

  const price = selectedVariant?.prices?.[0]?.amount || 0
  const inStock = (selectedVariant?.inventory_quantity || 0) > 0

  const handleOptionChange = (optionTitle: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionTitle]: value,
    }))
  }

  return (
    <div className="space-y-6">
      {/* Option Selectors */}
      {product.options?.map((option) => (
        <div key={option.id}>
          <label className="block text-sm font-medium mb-2">
            {option.title}
          </label>
          <select
            value={selectedOptions[option.title || ""] || ""}
            onChange={(e) => handleOptionChange(option.title || "", e.target.value)}
            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground"
          >
            <option value="">Select {option.title}</option>
            {option.values?.map((value) => (
              <option key={value.id} value={value.value}>
                {value.value}
              </option>
            ))}
          </select>
        </div>
      ))}

      {/* Price Display */}
      <div className="text-3xl font-bold text-accent">
        €{(price / 100).toFixed(2)}
      </div>

      {/* Stock Status & Action Button */}
      {inStock ? (
        <button className="btn-primary w-full">
          Add to Cart
        </button>
      ) : (
        <button className="btn-secondary w-full">
          Request This Knife
        </button>
      )}

      <p className="text-sm text-muted text-center">
        {inStock ? "✓ In Stock" : "Out of Stock - Request Available"}
      </p>
    </div>
  )
}
```

**Step 3: Verify product page**

Open: http://localhost:8000/products/pitmaster-slicer
Expected: Product detail page with configurator

**Step 4: Commit**

```bash
git add storefront/src/
git commit -m "feat: add product detail page with configurator"
```

---

## Phase 7: Cart & Checkout (Remaining Tasks)

### Task 7.1: Create Cart Context Provider

(Implementation details for cart provider, checkout flow, payment integration)

---

### Task 7.2: Create Checkout Pages

(Implementation details for checkout steps: address, shipping, payment)

---

## Phase 8: Content Pages

### Task 8.1: Create About Page

### Task 8.2: Create Care Instructions Page

### Task 8.3: Create Materials Guide Page

### Task 8.4: Create German Legal Pages

(Implementation details for /impressum, /datenschutz, /agb, /widerruf)

---

## Phase 9: Request Form Integration

### Task 9.1: Create Request Form Component

### Task 9.2: Integrate with Product Page

---

## Phase 10: Email Notifications

### Task 10.1: Configure Email Provider

### Task 10.2: Create Email Templates

---

## Phase 11: Final Integration & Testing

### Task 11.1: End-to-End Flow Testing

### Task 11.2: Mobile Responsiveness Check

### Task 11.3: Performance Optimization

---

## Execution Notes

- Run `docker-compose up -d` before starting any task
- Backend changes require `docker-compose restart medusa`
- Storefront hot-reloads automatically
- Check logs with `docker-compose logs -f [service]`
