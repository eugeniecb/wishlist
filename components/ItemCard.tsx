import Link from 'next/link'
import type { WishlistItem } from '@/lib/types'
import PriorityBadge from './PriorityBadge'

export default function ItemCard({ item }: { item: WishlistItem }) {
  return (
    <Link
      href={`/item/${item.id}`}
      className={`group block bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-fuchsia-500/50 hover:shadow-lg hover:shadow-fuchsia-500/10 transition-all duration-200 hover:scale-[1.01] overflow-hidden${item.purchased ? ' opacity-50' : ''}`}
    >
      <div className="relative">
        {item.imageUrl ? (
          <div className="aspect-square overflow-hidden bg-zinc-800">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="aspect-square bg-zinc-800 flex items-center justify-center text-5xl">
            🛍️
          </div>
        )}
        {item.purchased && (
          <span className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            ✓ Purchased
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-zinc-500 mb-1">{item.store}</p>
        <h3 className="font-medium text-white truncate">{item.name}</h3>
        {item.price !== undefined && (
          <p className="bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent font-semibold mt-1">${item.price.toFixed(2)}</p>
        )}
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-zinc-500">{item.category}</span>
          <PriorityBadge priority={item.priority} />
        </div>
      </div>
    </Link>
  )
}
