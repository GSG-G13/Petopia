import { type IPet, type IPost, type IPostImage, type IProduct } from './models'

interface IPetWithTypeName extends IPet {
  petType: {
    'title': string
  }
}
interface IPostWithDetails extends IPost {
  postImages?: IPostImage[]
  likeCount?: number
  commentCount?: number
  user?: {
    userId: number
    fullName: string
    userImage: string
  }
  category?: { title: string }
  products?: IProduct[]
  pets?: IPetWithTypeName[]
}
export type { IPostWithDetails, IPetWithTypeName }
