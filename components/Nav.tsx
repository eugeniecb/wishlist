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
    <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-gray-900 tracking-tight">
          ✦ Wishlist
        </Link>
        <div className="flex items-center gap-6">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/add"
            className="text-sm bg-rose-500 text-white px-4 py-1.5 rounded-full hover:bg-rose-600 transition-colors font-medium"
          >
            + Add Item
          </Link>
        </div>
      </div>
    </nav>
  )
}
