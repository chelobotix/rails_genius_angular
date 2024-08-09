export interface IPost {
  id: number
  title: string
  body: string
  imageUrl: string
  tags: string
  readTime: number
  published: string
  user: {
    id: number
    email: string
  }
}
