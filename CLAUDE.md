# Wishlist App

A shareable wishlist where friends and family can browse items you want and mark gifts as purchased. Paste a link, auto-fill details via OG metadata scraping, and keep everything in one place.

Data lives in client-side React state (no database yet — it resets on page refresh).

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React Context (`WishlistContext`) at the root — no persistence, in-memory only
- **Testing**: Playwright MCP for end-to-end verification
- **Deployment**: Vercel (auto-deploys from `eugeniecb/wishlist` GitHub repo)

---

## Pages / Routes

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | **Dashboard** — stats (item count, purchased count, high priority), recently added items grid |
| `/wishlist` | `app/wishlist/page.tsx` | **Browse** — full grid of all items, filterable by category |
| `/add` | `app/add/page.tsx` | **Add Item** — form with "Fetch details" URL auto-fill |
| `/item/[id]` | `app/item/[id]/page.tsx` | **Item Detail** — full details, edit, remove, mark as purchased |

### API Routes

| Route | File | Description |
|---|---|---|
| `/api/scrape` | `app/api/scrape/route.ts` | Fetches a product URL server-side and parses `og:title`, `og:image`, `og:price:amount` meta tags |

### Shared layout
`app/layout.tsx` — wraps all pages with a top nav (`Home`, `Wishlist`, `+ Add Item`) and the `WishlistProvider` context.

---

## Data Model

```typescript
interface WishlistItem {
  id: string              // crypto.randomUUID()
  name: string            // e.g. "Nike Air Max 270"
  url: string             // link to the product page
  price?: number          // numeric, e.g. 120
  imageUrl?: string       // direct image URL to display the product
  category: 'Clothing' | 'Tech' | 'Home' | 'Beauty' | 'Books' | 'Other'
  priority: 'high' | 'medium' | 'low'
  notes?: string          // personal notes
  dateAdded: string       // ISO date string, set automatically on submit
  store: string           // derived from URL hostname, e.g. "amazon.com"
  purchased?: boolean     // true when someone marks it as bought
  purchasedBy?: string    // name of the person who purchased it
}
```

State shape in context:
```typescript
const [items, setItems] = useState<WishlistItem[]>([])
```

### Context actions
- `addItem` — add a new item
- `removeItem` — delete an item by ID
- `updateItem` — edit any fields on an existing item
- `markPurchased` — mark an item as purchased with the buyer's name

---

## Style Guide

**Aesthetic**: Light mode, Partiful-inspired — white/gray-50 backgrounds with vibrant fuchsia/pink gradient accents, soft glowing blob backgrounds, and bold gradient text headings.

**Colors**:
- Background: `white` / `gray-50`
- Text: `gray-900` (headings), `gray-500` (metadata)
- Accent: fuchsia-to-pink gradient — used on CTAs, headings, prices, hover states
- Borders: `gray-100` / `gray-200`, hover: `fuchsia-300`
- Purchased: emerald accents

**Typography**:
- Font: Geist (via `next/font`)
- Headings: bold, gradient text (`bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent`)
- Dashboard title: `text-5xl` with sparkle emoji
- Metadata: small, muted (`text-sm text-gray-500`)

**Cards**:
- `rounded-2xl`, `border border-gray-100`, hover: `border-fuchsia-300 shadow-lg shadow-fuchsia-100` with slight `scale-[1.01]` lift
- Purchased items: `opacity-50` with green "✓ Purchased" badge

**Layout**:
- Centered container: `max-w-6xl mx-auto px-4`
- Responsive grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Soft fuchsia/pink gradient blobs in backgrounds (`blur-3xl`, `pointer-events-none`)

**Priorities**:
- `high` → fuchsia badge
- `medium` → amber badge
- `low` → gray badge

---

## Key Features

- **URL auto-fill**: Paste a product URL and click "Fetch details" to auto-populate name, image, and price from OG meta tags
- **Edit items**: Inline edit form on item detail page (all fields editable)
- **Mark as purchased**: Visitors enter their name to mark an item as bought — prevents duplicate gifts
- **Category filtering**: Filter items by category on the Browse page

---

## Component Structure

```
app/
  layout.tsx              # Root layout — nav + WishlistProvider
  page.tsx                # Dashboard (home)
  icon.svg                # Sparkle emoji favicon
  wishlist/
    page.tsx              # Browse all items
  add/
    page.tsx              # Add item form with URL auto-fill
  item/
    [id]/
      page.tsx            # Item detail + edit + purchased
  api/
    scrape/
      route.ts            # OG metadata scraping endpoint
components/
  Nav.tsx                 # Top navigation bar (gradient logo + CTA)
  ItemCard.tsx            # Card used in grid views
  PriorityBadge.tsx       # Colored badge for priority
lib/
  context.tsx             # WishlistContext + WishlistProvider
  types.ts                # WishlistItem TypeScript interface
```

---

## Git / Deployment

- **Main repo**: `eugeniecb/Assignments` (parent repo, wishlist is a subdirectory)
- **Wishlist repo**: `eugeniecb/wishlist` (pushed via `git subtree push --prefix=Spring26/wishlist wishlist main`)
- **Vercel**: Auto-deploys from `eugeniecb/wishlist` to `wishlist-jade-one.vercel.app`

---

## Playwright MCP

Configure Playwright MCP to verify at least one user interaction, e.g.:
- Navigate to `/add`, fill in the form, submit, and confirm the item appears on `/wishlist`
- Navigate to `/wishlist`, click an item card, and confirm the detail page loads with correct data
