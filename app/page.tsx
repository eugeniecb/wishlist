'use client'

import Link from 'next/link'
import { useWishlist } from '@/lib/context'
import ItemCard from '@/components/ItemCard'

export default function HomePage() {
  const { items } = useWishlist()

  const purchasedCount = items.filter(i => i.purchased).length
  const highPriority = items.filter(i => i.priority === 'high').length
  const recent = items.slice(0, 6)

  return (
    <main className="flex-1">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">My Wishlist</h1>
          <p className="text-gray-500 mt-2">Save things you love from anywhere on the internet.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-3xl font-bold text-gray-900">{items.length}</p>
            <p className="text-sm text-gray-500 mt-1">Items saved</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-3xl font-bold text-green-500">{purchasedCount}</p>
            <p className="text-sm text-gray-500 mt-1">Purchased</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm col-span-2 sm:col-span-1">
            <p className="text-3xl font-bold text-gray-900">{highPriority}</p>
            <p className="text-sm text-gray-500 mt-1">High priority</p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🛍️</p>
            <h2 className="text-xl font-semibold text-gray-700">Nothing saved yet</h2>
            <p className="text-gray-400 mt-2 mb-6">Start adding items you love.</p>
            <Link
              href="/add"
              className="inline-block bg-rose-500 text-white px-6 py-2.5 rounded-full hover:bg-rose-600 transition-colors text-sm font-medium"
            >
              + Add your first item
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-gray-900">Recently added</h2>
              <Link href="/wishlist" className="text-sm text-rose-500 hover:text-rose-600 transition-colors">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {recent.map(item => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
