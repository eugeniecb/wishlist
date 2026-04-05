import type { WishlistItem } from '@/lib/types'

const styles: Record<WishlistItem['priority'], string> = {
  high: 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30',
  medium: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  low: 'bg-zinc-700/50 text-zinc-400 border border-zinc-600/30',
}

export default function PriorityBadge({ priority }: { priority: WishlistItem['priority'] }) {
  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${styles[priority]}`}>
      {priority}
    </span>
  )
}
