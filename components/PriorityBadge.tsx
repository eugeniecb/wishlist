import type { WishlistItem } from '@/lib/types'

const styles: Record<WishlistItem['priority'], string> = {
  high: 'bg-rose-50 text-rose-600',
  medium: 'bg-amber-50 text-amber-600',
  low: 'bg-gray-100 text-gray-500',
}

export default function PriorityBadge({ priority }: { priority: WishlistItem['priority'] }) {
  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${styles[priority]}`}>
      {priority}
    </span>
  )
}
