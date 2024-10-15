export interface IComment {
  id: number
  body: string
  user_id: number
  userEmail: string
  post_id: number
  parent_comment_id: number
  created_at: string
  updated_at: string
  replies: IComment[]
}
