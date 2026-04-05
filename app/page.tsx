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
    <main className="flex-1 relative overflow-hidden">
      {/* background blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-20 right-0 w-80 h-80 bg-pink-600/15 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 py-14">
        <div className="mb-12">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-fuchsia-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
            My Wishlist ✨
          </h1>
          <p className="text-zinc-400 mt-3 text-lg">Things I love, all in one place.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-14">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-3xl font-bold text-white">{items.length}</p>
            <p className="text-sm text-zinc-500 mt-1">Items saved</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-3xl font-bold text-emerald-400">{purchasedCount}</p>
            <p className="text-sm text-zinc-500 mt-1">Purchased</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 col-span-2 sm:col-span-1">
            <p className="text-3xl font-bold text-fuchsia-400">{highPriority}</p>
            <p className="text-sm text-zinc-500 mt-1">High priority</p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-5">🛍️</p>
            <h2 className="text-2xl font-bold text-white mb-2">Nothing saved yet</h2>
            <p className="text-zinc-400 mb-8">Start adding items you love.</p>
            <Link
              href="/add"
              className="inline-block bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white px-7 py-3 rounded-full hover:opacity-90 transition-opacity font-medium"
            >
              + Add your first item
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recently added</h2>
              <Link href="/wishlist" className="text-sm text-fuchsia-400 hover:text-fuchsia-300 transition-colors">
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
