export interface IPost {
  id: number
  title: string
  body: string
  description: string
  imageUrl: string
  thumbnailUrl: string
  tags: string | string[]
  readTime: number
  published: string
  featured: boolean
  user: {
    id: number
    email: string
  }
}
