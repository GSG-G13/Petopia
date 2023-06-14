import { type IPost, type ICategory, type IPostImage } from './models'

export interface IPostWithDetails extends IPost {
  postImages?: IPostImage[]
  likeCount?: number
  commentsCount?: number
  user: {
    user_id: number
    full_name: string
    user_image: string
  }
  category: ICategory
}
