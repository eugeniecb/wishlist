'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWishlist } from '@/lib/context'
import type { WishlistItem } from '@/lib/types'

const CATEGORIES: WishlistItem['category'][] = ['Clothing', 'Tech', 'Home', 'Beauty', 'Books', 'Other']

function deriveStore(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

export default function AddPage() {
  const { addItem } = useWishlist()
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    url: '',
    price: '',
    imageUrl: '',
    category: 'Other' as WishlistItem['category'],
    priority: 'medium' as WishlistItem['priority'],
    notes: '',
  })
  const [fetching, setFetching] = useState(false)
  const [fetchError, setFetchError] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleFetch() {
    if (!form.url) return
    setFetching(true)
    setFetchError('')
    try {
      const res = await fetch(`/api/scrape?url=${encodeURIComponent(form.url)}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to fetch')
      setForm(prev => ({
        ...prev,
        name: data.name ?? prev.name,
        imageUrl: data.image ?? prev.imageUrl,
        price: data.price != null ? String(data.price) : prev.price,
      }))
    } catch {
      setFetchError('Could not fetch details — fill in manually.')
    } finally {
      setFetching(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    addItem({
      name: form.name,
      url: form.url,
      price: form.price ? parseFloat(form.price) : undefined,
      imageUrl: form.imageUrl || undefined,
      category: form.category,
      priority: form.priority,
      notes: form.notes || undefined,
      store: deriveStore(form.url),
    })
    router.push('/wishlist')
  }

  return (
    <main className="flex-1">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add Item</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              Product URL <span className="text-rose-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                id="url"
                name="url"
                type="url"
                value={form.url}
                onChange={handleChange}
                required
                placeholder="https://www.amazon.com/..."
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
              />
              <button
                type="button"
                onClick={handleFetch}
                disabled={!form.url || fetching}
                className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-40 whitespace-nowrap"
              >
                {fetching ? 'Fetching…' : 'Fetch details'}
              </button>
            </div>
            {fetchError && <p className="text-xs text-rose-500 mt-1">{fetchError}</p>}
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Item name <span className="text-rose-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="e.g. Nike Air Max 270"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 transition bg-white"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">Priority</p>
            <div className="flex gap-4">
              {(['high', 'medium', 'low'] as const).map(p => (
                <label key={p} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value={p}
                    checked={form.priority === p}
                    onChange={handleChange}
                    className="accent-rose-500"
                  />
                  <span className="text-sm text-gray-700 capitalize">{p}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Size, color, why you want it..."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 transition resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-500 text-white py-3 rounded-xl font-medium hover:bg-rose-600 transition-colors"
          >
            Save to wishlist
          </button>
        </form>
      </div>
    </main>
  )
}
