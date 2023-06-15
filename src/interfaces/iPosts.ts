import { type IPet, type IPost, type IPostImage, type IProduct } from './models'

interface IPetWithTypeName extends IPet {
  petType: {
    'title': string
  }
}
interface IPostWithDetails extends IPost {
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
  pets?: IPetWithTypeName[]
}
export type { IPostWithDetails, IPetWithTypeName }
