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
          <p className="text-gray-400 mb-4">Item not found.</p>
          <Link href="/wishlist" className="text-rose-500 hover:underline text-sm">
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
    <main className="flex-1">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link href="/wishlist" className="text-sm text-gray-500 hover:text-gray-900 mb-6 inline-block transition-colors">
          ← Back to wishlist
        </Link>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {item.imageUrl ? (
            <div className="aspect-video overflow-hidden bg-gray-50">
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="aspect-video bg-gray-50 flex items-center justify-center text-7xl">
              🛍️
            </div>
          )}

          <div className="p-6">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <p className="text-sm text-gray-400 mb-1">{item.store}</p>
                <h1 className="text-2xl font-bold text-gray-900">{item.name}</h1>
              </div>
              <PriorityBadge priority={item.priority} />
            </div>

            {item.price !== undefined && (
              <p className="text-3xl font-bold text-rose-500 mt-3 mb-4">${item.price.toFixed(2)}</p>
            )}

            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                {item.category}
              </span>
              <span className="text-xs text-gray-400">
                Added {new Date(item.dateAdded).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            {item.notes && (
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Notes</p>
                <p className="text-sm text-gray-700">{item.notes}</p>
              </div>
            )}

            <div className="flex gap-3 mb-4">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-rose-500 text-white py-3 rounded-xl font-medium hover:bg-rose-600 transition-colors text-sm"
              >
                View on {item.store} →
              </a>
              <button
                onClick={handleDelete}
                className="px-5 py-3 border border-gray-200 text-gray-500 rounded-xl hover:border-red-300 hover:text-red-500 transition-colors text-sm"
              >
                Remove
              </button>
            </div>

            {item.purchased ? (
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-medium">
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
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-400"
                />
                <button
                  onClick={handleConfirmPurchase}
                  disabled={!purchaserName.trim()}
                  className="px-5 py-3 bg-green-500 text-white rounded-xl text-sm font-medium hover:bg-green-600 transition-colors disabled:opacity-40"
                >
                  Confirm
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowPurchaseForm(true)}
                className="w-full py-3 border border-green-300 text-green-600 rounded-xl text-sm font-medium hover:bg-green-50 transition-colors"
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
