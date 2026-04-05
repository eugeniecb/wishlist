'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { useWishlist } from '@/lib/context'
import PriorityBadge from '@/components/PriorityBadge'

export default function ItemPage() {
  const { id } = useParams<{ id: string }>()
  const { items, removeItem, markPurchased } = useWishlist()
  const router = useRouter()
  const [showPurchaseForm, setShowPurchaseForm] = useState(false)
  const [purchaserName, setPurchaserName] = useState('')

  const item = items.find(i => i.id === id)

  if (!item) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-500 mb-4">Item not found.</p>
          <Link href="/wishlist" className="text-fuchsia-400 hover:underline text-sm">
            ← Back to wishlist
          </Link>
        </div>
      </main>
    )
  }

  function handleDelete() {
    removeItem(item!.id)
    router.push('/wishlist')
  }

  function handleConfirmPurchase() {
    if (!purchaserName.trim()) return
    markPurchased(item!.id, purchaserName.trim())
    setShowPurchaseForm(false)
  }

  return (
    <main className="flex-1 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-20 right-0 w-72 h-72 bg-fuchsia-600/15 rounded-full blur-3xl" />

      <div className="relative max-w-2xl mx-auto px-4 py-12">
        <Link href="/wishlist" className="text-sm text-zinc-500 hover:text-white mb-6 inline-block transition-colors">
          ← Back to wishlist
        </Link>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          {item.imageUrl ? (
            <div className="aspect-video overflow-hidden bg-zinc-800">
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="aspect-video bg-zinc-800 flex items-center justify-center text-7xl">
              🛍️
            </div>
          )}

          <div className="p-6">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <p className="text-sm text-zinc-500 mb-1">{item.store}</p>
                <h1 className="text-2xl font-bold text-white">{item.name}</h1>
              </div>
              <PriorityBadge priority={item.priority} />
            </div>

            {item.price !== undefined && (
              <p className="text-3xl font-bold bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent mt-3 mb-4">
                ${item.price.toFixed(2)}
              </p>
            )}

            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full border border-zinc-700">
                {item.category}
              </span>
              <span className="text-xs text-zinc-500">
                Added {new Date(item.dateAdded).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            {item.notes && (
              <div className="bg-zinc-800 rounded-xl p-4 mb-6 border border-zinc-700">
                <p className="text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wide">Notes</p>
                <p className="text-sm text-zinc-300">{item.notes}</p>
              </div>
            )}

            <div className="flex gap-3 mb-4">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity text-sm"
              >
                View on {item.store} →
              </a>
              <button
                onClick={handleDelete}
                className="px-5 py-3 border border-zinc-700 text-zinc-500 rounded-xl hover:border-red-500/50 hover:text-red-400 transition-colors text-sm"
              >
                Remove
              </button>
            </div>

            {item.purchased ? (
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl px-4 py-3 text-sm font-medium">
                <span>✓</span>
                <span>Purchased by {item.purchasedBy}</span>
              </div>
            ) : showPurchaseForm ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Your name"
                  value={purchaserName}
                  onChange={e => setPurchaserName(e.target.value)}
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition"
                />
                <button
                  onClick={handleConfirmPurchase}
                  disabled={!purchaserName.trim()}
                  className="px-5 py-3 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition-colors disabled:opacity-40"
                >
                  Confirm
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowPurchaseForm(true)}
                className="w-full py-3 border border-emerald-500/40 text-emerald-400 rounded-xl text-sm font-medium hover:bg-emerald-500/10 transition-colors"
              >
                Mark as purchased
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
