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
    <main className="flex-1">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Items</h1>
          <Link
            href="/add"
            className="text-sm bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-600 transition-colors font-medium"
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
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            {items.length === 0 ? 'No items yet. ' : 'No items in this category. '}
            <Link href="/add" className="text-rose-500 hover:underline">Add one →</Link>
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
