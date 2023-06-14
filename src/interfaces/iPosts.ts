import { type IPet, type IPost, type IPostImage, type IProduct } from './models'

export interface IPostWithDetails extends IPost {
  postImages?: IPostImage[]
  likeCount?: number
  commentsCount?: number
  user: {
    user_id: number
    full_name: string
    user_image: string
  }
  category: { title: string }
  products?: IProduct[]
  pets?: IPet[]
}
