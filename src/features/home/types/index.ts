export interface ProductItem {
  id: string
  name: string
  nameAr?: string
  price: string
  image: string
  colors?: string[]
  badge?: string
  rating?: string
  reviewsCount?: string
  category?: string
}

export interface CategoryItem {
  id: string
  title: string
  titleAr?: string
  count: string
  countAr?: string
  image: string
}

export interface PillarItem {
  id: string
  title: string
  description: string
}

export interface ReviewItem {
  id: string
  author: string
  location: string
  quote: string
  rating: string
}

export interface InstagramPostItem {
  id: string
  likes: string
  comments: string
  image: string
}
