'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/wishlist', label: 'Wishlist' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold tracking-tight bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
          ✦ Wishlist
        </Link>
        <div className="flex items-center gap-6">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? 'text-white font-medium'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/add"
            className="text-sm bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity font-medium"
          >
            + Add Item
          </Link>
        </div>
      </div>
    </nav>
  )
}
