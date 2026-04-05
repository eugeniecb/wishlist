import type { WishlistItem } from '@/lib/types'

const styles: Record<WishlistItem['priority'], string> = {
  high: 'bg-fuchsia-100 text-fuchsia-600 border border-fuchsia-200',
  medium: 'bg-amber-100 text-amber-600 border border-amber-200',
  low: 'bg-gray-100 text-gray-500 border border-gray-200',
}

export default function PriorityBadge({ priority }: { priority: WishlistItem['priority'] }) {
  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${styles[priority]}`}>
      {priority}
    </span>
  )
}
