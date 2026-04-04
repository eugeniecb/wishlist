# Wishlist App

A personal wishlist tool where you can save and organize items you want to buy from any e-commerce site — Amazon, Nordstrom, IKEA, wherever. Paste a link, add some details, and keep your wishlist in one place.

Data lives in client-side React state (no database yet — it resets on page refresh).

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React Context (`WishlistContext`) at the root — no persistence, in-memory only
- **Testing**: Playwright MCP for end-to-end verification

---

## Pages / Routes

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | **Dashboard** — stats (item count, estimated total cost), recently added items grid |
| `/wishlist` | `app/wishlist/page.tsx` | **Browse** — full grid of all items, filterable by category |
| `/add` | `app/add/page.tsx` | **Add Item** — form to add a new wishlist item |
| `/item/[id]` | `app/item/[id]/page.tsx` | **Item Detail** — dynamic route showing full details for one item |

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
}
```

State shape in context:
```typescript
const [items, setItems] = useState<WishlistItem[]>([])
```

---

## Style Guide

**Aesthetic**: Clean and minimal — white backgrounds, generous whitespace, subtle shadows. Like a modern shopping app (think Everlane or Are You Am I).

**Colors**:
- Background: `white` / `gray-50`
- Text: `gray-900` (headings), `gray-500` (metadata)
- Accent: `rose-500` — used on CTAs, priority badges, hover states
- Borders: `gray-100` / `gray-200`

**Typography**:
- Font: Inter (via `next/font`)
- Headings: bold, large (`text-3xl` or `text-4xl` on dashboard)
- Metadata: small, muted (`text-sm text-gray-500`)

**Cards**:
- `rounded-2xl`, `shadow-sm`, hover: `shadow-md` with slight `scale-[1.01]` lift
- Consistent padding: `p-4` or `p-5`

**Layout**:
- Centered container: `max-w-6xl mx-auto px-4`
- Responsive grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

**Priorities**:
- `high` → rose badge
- `medium` → amber badge
- `low` → gray badge

---

## Component Structure

```
app/
  layout.tsx              # Root layout — nav + WishlistProvider
  page.tsx                # Dashboard (home)
  wishlist/
    page.tsx              # Browse all items
  add/
    page.tsx              # Add item form
  item/
    [id]/
      page.tsx            # Item detail (dynamic route)
components/
  Nav.tsx                 # Top navigation bar
  ItemCard.tsx            # Card used in grid views
  PriorityBadge.tsx       # Colored badge for priority
lib/
  context.tsx             # WishlistContext + WishlistProvider
  types.ts                # WishlistItem TypeScript interface
```

---

## Playwright MCP

Configure Playwright MCP to verify at least one user interaction, e.g.:
- Navigate to `/add`, fill in the form, submit, and confirm the item appears on `/wishlist`
- Navigate to `/wishlist`, click an item card, and confirm the detail page loads with correct data
