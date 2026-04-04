'use client'

import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { WishlistItem } from './types'

interface WishlistContextType {
  items: WishlistItem[]
  addItem: (item: Omit<WishlistItem, 'id' | 'dateAdded'>) => void
  removeItem: (id: string) => void
}

const WishlistContext = createContext<WishlistContextType | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  function addItem(data: Omit<WishlistItem, 'id' | 'dateAdded'>) {
    setItems(prev => [
      { ...data, id: crypto.randomUUID(), dateAdded: new Date().toISOString() },
      ...prev,
    ])
  }

  function removeItem(id: string) {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
