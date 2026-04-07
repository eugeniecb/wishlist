'use client'

import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { WishlistItem } from './types'

interface WishlistContextType {
  items: WishlistItem[]
  addItem: (item: Omit<WishlistItem, 'id' | 'dateAdded'>) => void
  removeItem: (id: string) => void
  markPurchased: (id: string, purchasedBy: string) => void
  updateItem: (id: string, data: Partial<Omit<WishlistItem, 'id' | 'dateAdded'>>) => void
}

const SAMPLE_ITEMS: WishlistItem[] = [
  {
    id: 'sample-1',
    name: 'Sony WH-1000XM5 Headphones',
    url: 'https://www.amazon.com/dp/B09XS7JWHH',
    price: 279,
    imageUrl: 'https://m.media-amazon.com/images/I/61BGLYEN-xL._AC_SY300_SX300_QL70_FMwebp_.jpg',
    category: 'Tech',
    priority: 'high',
    notes: 'Best noise cancelling on the market!',
    dateAdded: '2026-03-28T12:00:00.000Z',
    store: 'amazon.com',
  },
  {
    id: 'sample-2',
    name: 'Le Labo Santal 33',
    url: 'https://www.nordstrom.com/s/le-labo-santal-33-eau-de-parfum/3088012',
    price: 250,
    category: 'Beauty',
    priority: 'medium',
    notes: 'The 3.4oz bottle',
    dateAdded: '2026-03-25T12:00:00.000Z',
    store: 'nordstrom.com',
  },
  {
    id: 'sample-3',
    name: 'LEGO Dried Flower Centerpiece',
    url: 'https://www.lego.com/en-us/product/dried-flower-centerpiece-10314',
    price: 49,
    imageUrl: 'https://www.lego.com/cdn/cs/set/assets/bltb76f113cca5cced0/10314.png?format=webply&fit=bounds&quality=60&width=800&height=800&dpr=2',
    category: 'Home',
    priority: 'low',
    dateAdded: '2026-03-20T12:00:00.000Z',
    store: 'lego.com',
  },
  {
    id: 'sample-4',
    name: 'Kindle Paperwhite Signature Edition',
    url: 'https://www.amazon.com/dp/B09TMN58KL',
    price: 189,
    category: 'Tech',
    priority: 'high',
    notes: 'Want the 32GB version with wireless charging',
    dateAdded: '2026-04-01T12:00:00.000Z',
    store: 'amazon.com',
  },
  {
    id: 'sample-5',
    name: 'Aritzia Isabelle Sweater',
    url: 'https://www.aritzia.com/us/en/product/isabelle-sweater/134408.html?color=11420',
    price: 58,
    imageUrl: 'https://assets.aritzia.com/image/upload/c_crop,ar_1920:2623,g_south/q_auto,f_auto,dpr_auto,w_1800/s26_a03_134408_11420_on_a',
    category: 'Clothing',
    priority: 'medium',
    notes: 'Size small, black',
    dateAdded: '2026-04-03T12:00:00.000Z',
    store: 'aritzia.com',
  },
  {
    id: 'sample-6',
    name: 'The Creative Act by Rick Rubin',
    url: 'https://www.amazon.com/dp/0593652886',
    price: 18,
    imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_1734f584-ba25-4fcf-a65a-626a2fa4e7fd?wid=750&qlt=80',
    category: 'Books',
    priority: 'low',
    dateAdded: '2026-03-15T12:00:00.000Z',
    store: 'amazon.com',
    purchased: true,
    purchasedBy: 'Aunt Sarah',
  },
]

const WishlistContext = createContext<WishlistContextType | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>(SAMPLE_ITEMS)

  function addItem(data: Omit<WishlistItem, 'id' | 'dateAdded'>) {
    setItems(prev => [
      { ...data, id: crypto.randomUUID(), dateAdded: new Date().toISOString() },
      ...prev,
    ])
  }

  function removeItem(id: string) {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  function markPurchased(id: string, purchasedBy: string) {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, purchased: true, purchasedBy } : item
    ))
  }

  function updateItem(id: string, data: Partial<Omit<WishlistItem, 'id' | 'dateAdded'>>) {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, ...data } : item
    ))
  }

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, markPurchased, updateItem }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
