export interface WishlistItem {
  id: string
  name: string
  url: string
  price?: number
  imageUrl?: string
  category: 'Clothing' | 'Tech' | 'Home' | 'Beauty' | 'Books' | 'Other'
  priority: 'high' | 'medium' | 'low'
  notes?: string
  dateAdded: string
  store: string
}
