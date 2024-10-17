export interface IComment {
  id: number
  body: string
  user_id: number
  post_id: number
  user_email: string
  parent_comment_id: number
  created_at: string
  updated_at: string
  replies: IComment[]
}
