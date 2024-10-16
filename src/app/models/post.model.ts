import { IComment } from './comment.model'

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
  comments: IComment[]
  user: {
    id: number
    email: string
  }
}
