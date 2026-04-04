import Link from 'next/link'
import type { WishlistItem } from '@/lib/types'
import PriorityBadge from './PriorityBadge'

export default function ItemCard({ item }: { item: WishlistItem }) {
  return (
    <Link
      href={`/item/${item.id}`}
      className="group block bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01] overflow-hidden"
    >
      {item.imageUrl ? (
        <div className="aspect-square overflow-hidden bg-gray-50">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-square bg-gray-50 flex items-center justify-center text-5xl">
          🛍️
        </div>
      )}
      <div className="p-4">
        <p className="text-xs text-gray-400 mb-1">{item.store}</p>
        <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
        {item.price !== undefined && (
          <p className="text-rose-500 font-semibold mt-1">${item.price.toFixed(2)}</p>
        )}
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-400">{item.category}</span>
          <PriorityBadge priority={item.priority} />
        </div>
      </div>
    </Link>
  )
}
