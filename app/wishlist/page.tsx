'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useWishlist } from '@/lib/context'
import ItemCard from '@/components/ItemCard'

const CATEGORIES = ['All', 'Clothing', 'Tech', 'Home', 'Beauty', 'Books', 'Other'] as const

export default function WishlistPage() {
  const { items } = useWishlist()
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filtered = activeCategory === 'All'
    ? items
    : items.filter(i => i.category === activeCategory)

  return (
    <main className="flex-1 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-20 right-0 w-72 h-72 bg-fuchsia-600/15 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            All Items
          </h1>
          <Link
            href="/add"
            className="text-sm bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity font-medium"
          >
            + Add Item
          </Link>
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white border-transparent'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            {items.length === 0 ? 'No items yet. ' : 'No items in this category. '}
            <Link href="/add" className="text-fuchsia-400 hover:text-fuchsia-300">Add one →</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
