# BBQ Knives E-Commerce Platform Design

**Date:** 2026-02-23
**Status:** Approved
**Stack:** MedusaJS v2 + Next.js 15 + PostgreSQL + Redis + Docker

---

## Overview

A direct-to-consumer e-commerce platform for a single artisan selling handmade barbecue knives. Customers purchase in-stock knives or submit requests for out-of-stock combinations.

---

## Requirements Summary

| Aspect | Decision |
|--------|----------|
| Business model | Single artisan, D2C |
| Product type | Barbecue knives only |
| Catalog size | Small (<20 designs), few variants each |
| Order flow | Buy in-stock variants; request out-of-stock |
| Payments | Stripe + PayPal |
| Shipping | Germany only (from Germany) |
| Aesthetic | Dark/premium + rustic warmth |
| Content | Brand story, care guides, materials info |
| Inventory | Track stock per variant |
| Launch scope | Full polished experience |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         DOCKER COMPOSE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐ │
│  │  PostgreSQL │    │    Redis    │    │      S3/Spaces      │ │
│  │   (Data)    │    │  (Events)   │    │  (Knife Images)     │ │
│  └──────┬──────┘    └──────┬──────┘    └──────────┬──────────┘ │
│         │                  │                      │            │
│         └────────┬─────────┴──────────────────────┘            │
│                  │                                              │
│         ┌────────▼────────┐                                    │
│         │  Medusa Server  │                                    │
│         │  (API + Admin)  │                                    │
│         │   Port 9000     │                                    │
│         └────────┬────────┘                                    │
│                  │                                              │
│         ┌────────▼────────┐                                    │
│         │ Next.js Store   │                                    │
│         │   Port 8000     │                                    │
│         └─────────────────┘                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Components:**
- **PostgreSQL** — All product, order, customer, and content data
- **Redis** — Event bus for Medusa's pub/sub (order events, notifications)
- **Medusa Server** — Backend API + bundled Admin dashboard (Vite/React)
- **Next.js Storefront** — Customer-facing store with Tailwind CSS
- **S3/Spaces** — High-resolution knife photography storage

---

## Data Model

### Products & Variants

Each knife design is a **Product**. Each steel + handle combination is a **Variant** with its own SKU, price, and inventory count.

```
Product: "Pitmaster Slicer"
├── Variant: Damascus + Walnut      → €289 (stock: 2)
├── Variant: Damascus + Micarta     → €309 (stock: 0)
├── Variant: 1095 Carbon + Walnut   → €229 (stock: 1)
└── Variant: 1095 Carbon + Micarta  → €249 (stock: 3)
```

### Product Options

| Option | Values |
|--------|--------|
| Steel Type | Damascus, 1095 Carbon, O1 Tool Steel, etc. |
| Handle Material | Walnut, Micarta, Olive Wood, Stabilized Burl, etc. |

### Custom Metadata Fields (per Product)

| Field | Type | Example |
|-------|------|---------|
| `blade_length_cm` | number | 30 |
| `total_length_cm` | number | 45 |
| `hardness_hrc` | string | "58-60" |
| `artisan_notes` | text | "Designed for slicing brisket..." |
| `care_instructions` | text | "Hand wash, dry immediately, oil regularly..." |

### Collections

Group products by steel type:
- Damascus Collection
- Carbon Steel Collection
- Tool Steel Collection

---

## Order Flows

### Standard Flow (Primary) — Buy In-Stock

```
1. Browse Collection (e.g., "Damascus Collection")
           │
           ▼
2. Select Knife Design (e.g., "Pitmaster Slicer")
           │
           ▼
3. Select Options (only in-stock variants enabled)
   ┌─────────────────────────────────┐
   │  Steel Type:    [Damascus ▼]   │
   │  Handle:        [Walnut ▼]     │
   │                                 │
   │  Price:         €289            │
   │  In Stock:      ✓ Available     │
   └─────────────────────────────────┘
           │
           ▼
4. Add to Cart → Checkout → Pay
           │
           ▼
5. Order Confirmation → Ships within X days
```

### Request Flow (Secondary) — Out-of-Stock

```
1. Customer selects a variant that's OUT OF STOCK
           │
           ▼
2. "Add to Cart" replaced with "Request This Knife"
           │
           ▼
3. Request Form
   ┌─────────────────────────────────┐
   │  Name:          [___________]  │
   │  Email:         [___________]  │
   │  Knife:         Pitmaster...   │
   │  Steel:         Damascus       │
   │  Handle:        Ebony          │
   │  Message:       [___________]  │
   └─────────────────────────────────┘
           │
           ▼
4. Request submitted → Artisan receives email
           │
           ▼
5. Artisan contacts customer directly (offline)
```

### Inventory Behavior

| Variant Stock | Button | Action |
|---------------|--------|--------|
| In stock (1+) | "Add to Cart" | Standard checkout |
| Out of stock (0) | "Request This Knife" | Opens request form |

---

## Order Statuses & Fulfillment

### Order Lifecycle

```
┌──────────────┐
│   Placed     │  ← Payment confirmed
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Processing  │  ← Artisan prepares shipment
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Shipped    │  ← Tracking number added, customer notified
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Delivered   │  ← (Optional) Manual or carrier confirmation
└──────────────┘
```

### Email Notifications

| Event | Email to Customer |
|-------|-------------------|
| Order placed | Confirmation + summary |
| Order shipped | Shipping notification + tracking link |
| Request submitted | "We received your request" confirmation |

---

## Frontend Structure

### Site Map

```
/                           → Homepage
├── /collections
│   └── /[handle]           → Collection page
├── /products
│   └── /[handle]           → Product detail page
├── /cart                   → Shopping cart
├── /checkout               → Checkout flow
├── /account                → Customer account
│   ├── /orders
│   └── /profile
├── /about                  → Artisan story
├── /materials              → Steel & handle materials guide
├── /care                   → Knife care instructions
├── /contact                → Contact + request form
├── /legal
│   ├── /impressum          → German legal requirement
│   ├── /datenschutz        → Privacy policy (DSGVO)
│   └── /agb                → Terms & conditions
└── /widerruf               → Cancellation policy
```

### Homepage Sections

1. Hero — Full-width knife photography, tagline, CTA
2. Featured Knives — 3-4 highlighted products
3. Collections Preview — Cards linking to steel collections
4. Artisan Story Teaser — Photo + short text
5. Trust Signals — Handmade in Germany, materials quality

### Design Aesthetic

- **Dark backgrounds** (#0a0a0a, #1a1a1a)
- **Warm accents** (amber, copper, burnt orange)
- **Typography** — Clean sans-serif headings, readable body
- **Photography** — High-contrast, moody lighting, smoke/fire
- **Textures** — Subtle wood grain or leather patterns

---

## Payments & Shipping

### Payment Providers

| Provider | Purpose |
|----------|---------|
| Stripe | Cards, Apple Pay, Google Pay |
| PayPal | PayPal balance, Pay Later |

### Shipping Configuration

| Setting | Value |
|---------|-------|
| Region | Germany |
| Currency | EUR |
| Tax Rate | 19% (included in price) |

### Shipping Options

| Option | Price | Delivery |
|--------|-------|----------|
| Standard (DHL/DPD) | €5.90 | 2-4 business days |
| Express (DHL Express) | €12.90 | 1-2 business days |
| Free shipping | €0 | Orders over €250 |

---

## Docker Deployment

### Container Structure

```yaml
services:
  postgres:
    image: postgres:16
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  medusa:
    build: ./backend
    depends_on:
      - postgres
      - redis
    ports:
      - "9000:9000"
      - "7001:7001"

  storefront:
    build: ./storefront
    depends_on:
      - medusa
    ports:
      - "8000:8000"
```

### Project Structure

```
bbq-knives/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── medusa-config.js
│   └── src/
├── storefront/
│   ├── Dockerfile
│   ├── next.config.js
│   └── src/
└── docs/
    └── plans/
```

### Development Commands

```bash
# Start everything
docker-compose up -d

# Access points
# Storefront:  http://localhost:8000
# Admin:       http://localhost:9000/app
# API:         http://localhost:9000/store
```

---

## Technical Decisions

1. **Approach:** Standard Medusa + Variant System (simplest path for small catalog)
2. **Inventory:** Tracked per variant (not build-to-order)
3. **Request Flow:** Simple form submission + email notification (no quote system)
4. **Styling:** Tailwind CSS with dark theme customization
5. **Images:** S3/Spaces for high-resolution photography
6. **German Compliance:** Impressum, DSGVO, Widerrufsrecht pages included
