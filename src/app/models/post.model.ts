import { IComment } from './comment.model'

export interface IPost {
  id: number
  title: string
  body: string
  description: string
  image_url: string
  thumbnail_url: string
  tags: string | string[]
  read_time: number
  published: string
  featured: boolean
  comments: IComment[]
  user: {
    id: number
    email: string
  }
}
